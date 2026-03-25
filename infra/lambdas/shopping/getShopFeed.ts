/**
 * Shop Feed Lambda
 *
 * Returns a curated product feed for the "Shop Your Colors" tab.
 * Products are pre-scored against seasonal palettes and cached in DynamoDB.
 * Falls back to on-demand generation if no cached feed exists.
 *
 * GET /shopping/feed?season=...&category=...
 */

import { withMiddleware, getUserId } from '../shared/middleware';
import { getItem, putItem, queryItems } from '../shared/dynamodb';
import { createSkimlinksClient, type SkimlinksClient } from './skimlinksClient';
import { createImaggaClient, type ImaggaClient } from './imaggaClient';
import { getShoppingSecrets } from '../shared/shoppingSecrets';
import {
  hexToLab,
  ciede2000,
  type Lab,
} from '../shared/colorMatcher';
import { z } from 'zod';

// ─── Validation ────────────────────────────────────────────────────

const feedParamsSchema = z.object({
  season: z.string().min(1),
  category: z.enum(['clothing', 'makeup', 'nails', 'jewelry', 'accessories', 'hair']),
  palette: z.string().min(1), // comma-separated hex values
});

// ─── Search Queries by Category + Season Temperature ───────────────

const CATEGORY_QUERIES: Record<string, Record<string, string[]>> = {
  clothing: {
    warm: ['warm tone dress', 'earth tone blouse', 'golden sweater', 'rust jacket', 'camel coat'],
    cool: ['cool tone dress', 'blue blouse', 'lavender sweater', 'gray blazer', 'navy coat'],
  },
  makeup: {
    warm: ['warm peach blush', 'coral lipstick', 'golden eyeshadow palette', 'warm foundation'],
    cool: ['cool pink blush', 'berry lipstick', 'cool tone eyeshadow', 'cool foundation'],
  },
  nails: {
    warm: ['warm nude nail polish', 'coral nail polish', 'gold shimmer nail polish'],
    cool: ['cool nude nail polish', 'mauve nail polish', 'silver shimmer nail polish'],
  },
  jewelry: {
    warm: ['gold jewelry', 'rose gold necklace', 'amber earrings', 'gold bracelet'],
    cool: ['silver jewelry', 'platinum necklace', 'sapphire earrings', 'white gold bracelet'],
  },
  accessories: {
    warm: ['cognac leather bag', 'tan suede shoes', 'warm scarf', 'tortoiseshell sunglasses'],
    cool: ['black leather bag', 'gray suede shoes', 'cool tone scarf', 'silver frame sunglasses'],
  },
  hair: {
    warm: ['warm golden hair color', 'caramel hair dye', 'honey blonde hair'],
    cool: ['cool ash blonde hair color', 'platinum hair dye', 'cool brown hair'],
  },
};

function getTemperature(season: string): 'warm' | 'cool' {
  const warmSeasons = ['LIGHT_SPRING', 'TRUE_SPRING', 'BRIGHT_SPRING', 'SOFT_AUTUMN', 'TRUE_AUTUMN', 'DEEP_AUTUMN'];
  return warmSeasons.some((s) => season.toUpperCase().includes(s.replace('_', ' ')) || season.toUpperCase().replace(' ', '_') === s)
    ? 'warm'
    : 'cool';
}

// ─── Lazy-initialized clients (created after secrets load) ─────────

let skimlinks: SkimlinksClient | null = null;
let imagga: ImaggaClient | null = null;

async function getSkimlinks() {
  if (!skimlinks) {
    const secrets = await getShoppingSecrets();
    skimlinks = createSkimlinksClient({
      publisherId: secrets.SKIMLINKS_PUBLISHER_ID,
      clientId: secrets.SKIMLINKS_CLIENT_ID,
      apiKey: secrets.SKIMLINKS_API_KEY,
    });
  }
  return skimlinks;
}

async function getImagga() {
  if (!imagga) {
    const secrets = await getShoppingSecrets();
    imagga = createImaggaClient({
      apiKey: secrets.IMAGGA_API_KEY,
      apiSecret: secrets.IMAGGA_API_SECRET,
    });
  }
  return imagga;
}

// ─── Cache Key ─────────────────────────────────────────────────────

const FEED_TTL_SECONDS = 24 * 60 * 60; // 24 hours

function feedCacheKey(season: string, category: string): { pk: string; sk: string } {
  return {
    pk: `SHOPFEED#${season.toUpperCase().replace(' ', '_')}`,
    sk: `CATEGORY#${category}`,
  };
}

// ─── Handler ───────────────────────────────────────────────────────

export const handler = withMiddleware(async (event) => {
  getUserId(event); // Auth required

  const raw = event.queryStringParameters ?? {};
  const params = feedParamsSchema.parse(raw);

  const paletteHexes = params.palette
    .split(',')
    .map((h) => h.trim())
    .filter((h) => /^#[0-9a-fA-F]{6}$/.test(h));

  if (paletteHexes.length === 0) {
    throw Object.assign(new Error('At least one valid palette hex color is required'), { statusCode: 400 });
  }

  // Check cache first
  const { pk, sk } = feedCacheKey(params.season, params.category);
  const cached = await getItem(pk, sk);

  if (cached && typeof cached.expiresAt === 'number' && cached.expiresAt > Date.now() / 1000) {
    // Re-score cached products against this user's specific palette
    const products = rescore(cached.products as any[], paletteHexes);
    return {
      statusCode: 200,
      body: {
        products,
        season: params.season,
        category: params.category,
        cached: true,
      },
    };
  }

  // Generate fresh feed
  const temperature = getTemperature(params.season);
  const queries = CATEGORY_QUERIES[params.category]?.[temperature] ?? [];

  if (queries.length === 0) {
    return { statusCode: 200, body: { products: [], season: params.season, category: params.category } };
  }

  // Search across multiple queries in parallel
  const skimlinksClient = await getSkimlinks();
  const searchResults = await Promise.allSettled(
    queries.map((q) =>
      skimlinksClient.searchProducts({ query: q, limit: 10 }),
    ),
  );

  const allProducts = searchResults
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  // Deduplicate by product ID
  const uniqueProducts = new Map<string, typeof allProducts[number]>();
  for (const p of allProducts) {
    if (!uniqueProducts.has(p.id)) {
      uniqueProducts.set(p.id, p);
    }
  }

  const products = Array.from(uniqueProducts.values());

  if (products.length === 0) {
    return { statusCode: 200, body: { products: [], season: params.season, category: params.category } };
  }

  // Extract colors
  const imageUrls = products.filter((p) => p.imageUrl).map((p) => p.imageUrl);
  const imaggaClient = await getImagga();
  const colorMap = await imaggaClient.batchExtractColors(imageUrls, 3);

  // Pre-compute palette Labs
  const paletteLabs = paletteHexes.map((hex) => ({ hex, lab: hexToLab(hex) }));

  // Score products
  const scored = products
    .map((product) => {
      const extracted = colorMap.get(product.imageUrl) ?? [];
      const dominantColors = extracted.map((c) => c.hex);

      let matchScore = 0;
      let matchedPaletteHex = paletteHexes[0];

      if (dominantColors.length > 0) {
        for (const prodHex of dominantColors) {
          const prodLab = hexToLab(prodHex);
          for (const { hex, lab } of paletteLabs) {
            const dist = ciede2000(prodLab, lab);
            const score = Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - dist / 50), 1.5)));
            if (score > matchScore) {
              matchScore = score;
              matchedPaletteHex = hex;
            }
          }
        }
      } else {
        matchScore = 50;
      }

      return {
        id: product.id,
        name: product.name,
        priceInCents: Math.round(product.price * 100),
        currency: product.currency ?? 'USD',
        imageUrl: product.imageUrl,
        merchantName: product.merchantName,
        merchantUrl: product.url,
        matchScore,
        matchedPaletteHex,
        dominantColors,
        category: params.category,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);

  // Cache the feed (without user-specific palette scoring, we'll rescore on read)
  const now = Math.floor(Date.now() / 1000);
  await putItem({
    PK: pk,
    SK: sk,
    products: scored,
    season: params.season,
    category: params.category,
    generatedAt: new Date().toISOString(),
    expiresAt: now + FEED_TTL_SECONDS,
    TTL: now + FEED_TTL_SECONDS,
  }).catch((err) => {
    // Don't fail the request if caching fails
    console.warn('Failed to cache shop feed:', err);
  });

  return {
    statusCode: 200,
    body: {
      products: finalProducts,
      season: params.season,
      category: params.category,
      cached: false,
    },
  };
});

/**
 * Re-score cached products against a specific user's palette.
 */
function rescore(
  products: any[],
  paletteHexes: string[],
): any[] {
  const paletteLabs = paletteHexes.map((hex) => ({ hex, lab: hexToLab(hex) }));

  return products
    .map((p) => {
      const dominantColors: string[] = p.dominantColors ?? [];
      let matchScore = p.matchScore ?? 50;
      let matchedPaletteHex = paletteHexes[0];

      if (dominantColors.length > 0) {
        matchScore = 0;
        for (const prodHex of dominantColors) {
          const prodLab = hexToLab(prodHex);
          for (const { hex, lab } of paletteLabs) {
            const dist = ciede2000(prodLab, lab);
            const score = Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - dist / 50), 1.5)));
            if (score > matchScore) {
              matchScore = score;
              matchedPaletteHex = hex;
            }
          }
        }
      }

      return { ...p, matchScore, matchedPaletteHex };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
