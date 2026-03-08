import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { putItem } from '../shared/dynamodb';
import { randomUUID } from 'crypto';

interface CreatePurchaseBody {
  platform: 'APPLE_IAP' | 'GOOGLE_PLAY' | 'STRIPE';
  receiptId: string;
  productId: string;
}

const REVENUECAT_API_KEY = process.env.REVENUECAT_API_KEY ?? '';

/**
 * Validates a purchase receipt with RevenueCat's REST API.
 * Returns the validated transaction or throws on invalid receipt.
 */
async function validateReceipt(
  userId: string,
  body: CreatePurchaseBody,
): Promise<{ isValid: boolean; expiresDate: string | null }> {
  if (!REVENUECAT_API_KEY) {
    // If no RevenueCat key configured, skip validation (dev mode)
    console.warn('REVENUECAT_API_KEY not set — skipping receipt validation');
    return { isValid: true, expiresDate: null };
  }

  // Check subscriber status via RevenueCat
  const response = await fetch(
    `https://api.revenuecat.com/v1/subscribers/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${REVENUECAT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw Object.assign(
      new Error('Failed to validate receipt with RevenueCat'),
      { statusCode: 502 },
    );
  }

  const data = await response.json();
  const transactions = data.subscriber?.non_subscriptions?.hazel_hue_analysis ?? [];

  // Verify the transaction exists
  const matchingTransaction = transactions.find(
    (t: { id: string }) => t.id === body.receiptId,
  );

  if (!matchingTransaction) {
    throw Object.assign(
      new Error('Invalid receipt: transaction not found'),
      { statusCode: 400 },
    );
  }

  return { isValid: true, expiresDate: null };
}

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseBody<CreatePurchaseBody>(event);

  // Validate receipt with RevenueCat
  await validateReceipt(userId, body);

  const purchaseId = randomUUID();
  const now = new Date().toISOString();

  // Create purchase record
  await putItem({
    PK: `USER#${userId}`,
    SK: `PURCHASE#${purchaseId}`,
    id: purchaseId,
    userId,
    amount: 1900,
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
