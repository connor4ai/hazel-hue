import { withMiddleware, getUserId, parseBody } from '../shared/middleware';
import { putItem } from '../shared/dynamodb';
import { randomUUID } from 'crypto';

interface CreatePurchaseBody {
  platform: 'APPLE_IAP' | 'GOOGLE_PLAY' | 'STRIPE';
  receiptId: string;
}

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const { platform, receiptId } = parseBody<CreatePurchaseBody>(event);

  const purchaseId = randomUUID();
  const now = new Date().toISOString();

  // TODO: Validate receipt with RevenueCat/Stripe before creating records

  // Create purchase record
  await putItem({
    PK: `USER#${userId}`,
    SK: `PURCHASE#${purchaseId}`,
    id: purchaseId,
    userId,
    amount: 1900,
    currency: 'USD',
    status: 'COMPLETED',
    platform,
    platformReceiptId: receiptId,
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
