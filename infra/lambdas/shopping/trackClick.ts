/**
 * Click Tracking Lambda
 *
 * Records product click events for conversion analytics.
 * Tracks which sections, categories, and match scores drive the most clicks.
 *
 * POST /shopping/click
 */

import { withMiddleware, getUserId, parseAndValidate } from '../shared/middleware';
import { putItem } from '../shared/dynamodb';
import { z } from 'zod';

const clickEventSchema = z.object({
  analysisId: z.string().uuid(),
  productId: z.string().min(1).max(500),
  merchantName: z.string().min(1).max(200),
  clickSource: z.enum([
    'lookbook',
    'makeup_guide',
    'hair_guide',
    'nail_guide',
    'jewelry_guide',
    'accessory_guide',
    'shop_tab',
  ]),
  category: z.enum(['clothing', 'makeup', 'nails', 'jewelry', 'accessories', 'hair']),
  matchScore: z.number().int().min(0).max(100),
});

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseAndValidate(event, clickEventSchema);

  const now = new Date();
  const clickId = `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;

  await putItem({
    PK: `USER#${userId}`,
    SK: `CLICK#${clickId}`,
    // GSI for analytics: clicks per analysis
    GSI1PK: `ANALYSIS#${body.analysisId}`,
    GSI1SK: `CLICK#${now.toISOString()}`,
    // GSI for aggregate analytics: clicks per category per day
    GSI2PK: `CLICKS#${now.toISOString().slice(0, 10)}`,
    GSI2SK: `${body.category}#${body.clickSource}#${clickId}`,

    userId,
    analysisId: body.analysisId,
    productId: body.productId,
    merchantName: body.merchantName,
    clickSource: body.clickSource,
    category: body.category,
    matchScore: body.matchScore,
    clickedAt: now.toISOString(),

    // TTL: keep click data for 90 days
    TTL: Math.floor(now.getTime() / 1000) + 90 * 24 * 60 * 60,
  });

  return {
    statusCode: 201,
    body: { clickId, tracked: true },
  };
});
