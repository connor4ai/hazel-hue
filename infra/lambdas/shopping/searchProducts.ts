/**
 * Product Search Lambda
 *
 * Searches for products matching a query, extracts colors from product images,
 * scores them against the user's palette using CIEDE2000, and returns
 * ranked results with affiliate links.
 *
 * GET /shopping/search?q=...&targetHex=...&palette=...&category=...&limit=...
 */

import { withMiddleware, getUserId } from '../shared/middleware';
import { getItem } from '../shared/dynamodb';
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

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

const searchParamsSchema = z.object({
  q: z.string().min(1).max(200),
  targetHex: z.string().regex(HEX_REGEX).optional(),
  palette: z.string().min(1), // comma-separated hex values
  category: z.enum(['clothing', 'makeup', 'nails', 'jewelry', 'accessories', 'hair']).optional(),
  limit: z.coerce.number().int().min(1).max(20).optional().default(5),
});

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

// ─── Handler ───────────────────────────────────────────────────────

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);

  // Parse query parameters
  const raw = event.queryStringParameters ?? {};
  const params = searchParamsSchema.parse(raw);

  // Parse palette hex values
  const paletteHexes = params.palette
    .split(',')
    .map((h) => h.trim())
    .filter((h) => HEX_REGEX.test(h));

  if (paletteHexes.length === 0) {
    throw Object.assign(new Error('At least one valid palette hex color is required'), { statusCode: 400 });
  }

  // Pre-compute Lab values for palette colors
  const paletteLabs: { hex: string; lab: Lab }[] = paletteHexes.map((hex) => ({
    hex,
    lab: hexToLab(hex),
  }));

  // Search for products via Skimlinks
  // If we have a target hex, include color name in the query for better relevance
  const searchQuery = params.targetHex
    ? params.q
    : params.q;

  const rawProducts = await (await getSkimlinks()).searchProducts({
    query: searchQuery,
    limit: Math.min(params.limit * 3, 60), // Fetch extra for color filtering
    category: params.category,
  });

  if (rawProducts.length === 0) {
    return { statusCode: 200, body: { products: [], query: params.q } };
  }

  // Extract colors from product images in parallel
  const imageUrls = rawProducts
    .filter((p) => p.imageUrl)
    .map((p) => p.imageUrl);

  const colorMap = await (await getImagga()).batchExtractColors(imageUrls, 3);

  // Score and rank products by palette match
  const scoredProducts = rawProducts
    .map((product) => {
      const extractedColors = colorMap.get(product.imageUrl) ?? [];
      const dominantHexes = extractedColors.map((c) => c.hex);

      // If we have a target hex, score against it specifically
      // Otherwise score against the full palette
      let matchScore = 0;
      let matchedPaletteHex = paletteHexes[0];

      if (dominantHexes.length > 0) {
        for (const productHex of dominantHexes) {
          const productLab = hexToLab(productHex);

          if (params.targetHex) {
            // Score against specific target color
            const targetLab = hexToLab(params.targetHex);
            const dist = ciede2000(productLab, targetLab);
            const score = Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - dist / 50), 1.5)));
            if (score > matchScore) {
              matchScore = score;
              matchedPaletteHex = params.targetHex;
            }
          }

          // Also check against full palette
          for (const { hex, lab } of paletteLabs) {
            const dist = ciede2000(productLab, lab);
            const score = Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - dist / 50), 1.5)));
            if (score > matchScore) {
              matchScore = score;
              matchedPaletteHex = hex;
            }
          }
        }
      } else {
        // No color data — give a neutral score so the product still shows up
        matchScore = 50;
      }

      return {
        id: product.id,
        name: product.name,
        priceInCents: Math.round(product.price * 100),
        currency: product.currency,
        imageUrl: product.imageUrl,
        merchantName: product.merchantName,
        merchantUrl: product.url,
        matchScore,
        matchedPaletteHex,
        dominantColors: dominantHexes,
        category: params.category ?? 'clothing',
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, params.limit);

  return {
    statusCode: 200,
    body: {
      products: scoredProducts,
      query: params.q,
      targetHex: params.targetHex,
      resultCount: products.length,
    },
  };
});
