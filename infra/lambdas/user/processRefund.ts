import { withMiddleware, getUserId, parseAndValidate, getPathParamUUID } from '../shared/middleware';
import { getItem, updateItem, queryItems } from '../shared/dynamodb';
import { z } from 'zod';

const refundSchema = z.object({
  purchaseId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export const handler = withMiddleware(async (event) => {
  const userId = getUserId(event);
  const body = parseAndValidate(event, refundSchema);

  // Look up the purchase
  const purchase = await getItem(`USER#${userId}`, `PURCHASE#${body.purchaseId}`);
  if (!purchase) {
    throw Object.assign(new Error('Purchase not found'), { statusCode: 404 });
  }

  if (purchase.status === 'REFUNDED') {
    throw Object.assign(new Error('Purchase already refunded'), { statusCode: 409 });
  }

  if (purchase.status !== 'COMPLETED') {
    throw Object.assign(new Error('Only completed purchases can be refunded'), { statusCode: 400 });
  }

  const now = new Date().toISOString();

  // Mark purchase as refunded
  await updateItem(`USER#${userId}`, `PURCHASE#${body.purchaseId}`, {
    status: 'REFUNDED',
    refundedAt: now,
    refundReason: body.reason ?? null,
  });

  // Revoke entitlements granted by this purchase
  const entitlements = await queryItems(`USER#${userId}`, 'ENTITLEMENT#ANALYSIS');
  const grantedEntitlement = entitlements.find(
    (e) => e.purchaseId === body.purchaseId && !e.consumed,
  );

  if (grantedEntitlement) {
    await updateItem(`USER#${userId}`, grantedEntitlement.SK as string, {
      consumed: true,
      consumedAt: now,
      revokedByRefund: true,
    });
  }

  return {
    statusCode: 200,
    body: { refunded: true, purchaseId: body.purchaseId },
  };
});
