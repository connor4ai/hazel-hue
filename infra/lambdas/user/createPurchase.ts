import { withMiddleware, getUserId, parseAndValidate } from '../shared/middleware';
import { putItem } from '../shared/dynamodb';
import { randomUUID } from 'crypto';
import { z } from 'zod';

const createPurchaseSchema = z.object({
  platform: z.enum(['APPLE_IAP', 'GOOGLE_PLAY', 'STRIPE']),
  receiptId: z.string().min(1).max(512),
  productId: z.string().min(1).max(128),
});

// Product catalog — single source of truth for pricing
const PRODUCT_PRICES: Record<string, number> = {
  hazel_hue_analysis: 1900, // $19.00
};

const REVENUECAT_API_KEY = process.env.REVENUECAT_API_KEY ?? '';
const SKIP_RECEIPT_VALIDATION = process.env.SKIP_RECEIPT_VALIDATION === 'true';

/**
 * Validates a purchase receipt with RevenueCat's REST API.
 */
async function validateReceipt(
  userId: string,
  body: z.infer<typeof createPurchaseSchema>,
): Promise<void> {
  if (SKIP_RECEIPT_VALIDATION) {
    console.warn('Receipt validation skipped (SKIP_RECEIPT_VALIDATION=true)');
    return;
  }

  if (!REVENUECAT_API_KEY) {
    throw Object.assign(new Error('Payment service unavailable'), { statusCode: 503 });
  }

  const response = await fetch(
    `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`,
    {
      headers: {
        Authorization: `Bearer ${REVENUECAT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw Object.assign(
      new Error('Failed to validate receipt with payment provider'),
      { statusCode: 502 },
    );
  }

  const data = await response.json();
  const transactions = data.subscriber?.non_subscriptions?.hazel_hue_analysis ?? [];

  const matchingTransaction = transactions.find(
    (t: { id: string }) => t.id === body.receiptId,
  );

  if (!matchingTransaction) {
    throw Object.assign(
      new Error('Invalid receipt: transaction not found'),
      { statusCode: 400 },
    );
  }
}

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseAndValidate(event, createPurchaseSchema);

  // Look up price from product catalog
  const amount = PRODUCT_PRICES[body.productId];
  if (amount === undefined) {
    throw Object.assign(new Error('Unknown product'), { statusCode: 400 });
  }

  await validateReceipt(userId, body);

  const purchaseId = randomUUID();
  const now = new Date().toISOString();

  // Create purchase record
  await putItem({
    PK: `USER#${userId}`,
    SK: `PURCHASE#${purchaseId}`,
    id: purchaseId,
    userId,
    amount,
    currency: 'USD',
    status: 'COMPLETED',
    platform: body.platform,
    platformReceiptId: body.receiptId,
    productId: body.productId,
    createdAt: now,
  });

  // Grant analysis entitlement
  await putItem({
    PK: `USER#${userId}`,
    SK: `ENTITLEMENT#ANALYSIS#${purchaseId}`,
    type: 'ANALYSIS',
    purchaseId,
    grantedAt: now,
    expiresAt: null,
    consumed: false,
  });

  return {
    statusCode: 201,
    body: { purchaseId, entitlementGranted: true },
  };
});
