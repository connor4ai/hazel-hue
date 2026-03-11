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
import { createSkimlinksClient } from './skimlinksClient';
import { createImaggaClient } from './imaggaClient';
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

// ─── Lazy-initialized clients ──────────────────────────────────────

let skimlinks: ReturnType<typeof createSkimlinksClient> | null = null;
let imagga: ReturnType<typeof createImaggaClient> | null = null;

function getSkimlinks() {
  if (!skimlinks) skimlinks = createSkimlinksClient();
  return skimlinks;
}

function getImagga() {
  if (!imagga) imagga = createImaggaClient();
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

  const rawProducts = await getSkimlinks().searchProducts({
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

  const colorMap = await getImagga().batchExtractColors(imageUrls, 3);

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
        affiliateUrl: '', // Will be populated below
        matchScore,
        matchedPaletteHex,
        dominantColors: dominantHexes,
        category: params.category ?? 'clothing',
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, params.limit);

  // Wrap URLs in affiliate links
  const merchantUrls = scoredProducts.map((p) => p.merchantUrl);
  const affiliateLinks = await getSkimlinks().getAffiliateLinks(merchantUrls);

  const products = scoredProducts.map((p) => ({
    ...p,
    affiliateUrl: affiliateLinks.get(p.merchantUrl) ?? p.merchantUrl,
  }));

  return {
    statusCode: 200,
    body: {
      products,
      query: params.q,
      targetHex: params.targetHex,
      resultCount: products.length,
    },
  };
});
