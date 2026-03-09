import type { PurchaseId, UserId } from '@domain/shared/types';
import { refundPurchase } from '@domain/user/entities/Purchase';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

export interface ProcessRefundInput {
  purchaseId: PurchaseId;
  userId: UserId;
  reason?: string;
}

export interface ProcessRefundDeps {
  userRepo: IUserRepository;
}

/**
 * Use case: Process a refund for a purchase.
 * Marks purchase as refunded and revokes the associated entitlement.
 */
export async function processRefund(
  input: ProcessRefundInput,
  deps: ProcessRefundDeps,
): Promise<void> {
  const purchases = await deps.userRepo.getPurchases(input.userId);
  const purchase = purchases.find((p) => p.id === input.purchaseId);

  if (!purchase) {
    throw new Error('Purchase not found');
  }

  if (purchase.status === 'REFUNDED') {
    throw new Error('Purchase already refunded');
  }

  if (purchase.status !== 'COMPLETED') {
    throw new Error('Only completed purchases can be refunded');
  }

  const refunded = refundPurchase(purchase);
  await deps.userRepo.updatePurchase(refunded);

  // Revoke any entitlements granted by this purchase
  const entitlements = await deps.userRepo.getEntitlements(input.userId);
  const grantedEntitlement = entitlements.find(
    (e) => e.purchaseId === input.purchaseId,
  );

  if (grantedEntitlement) {
    await deps.userRepo.updateEntitlement({
      ...grantedEntitlement,
      consumed: true,
      consumedAt: new Date().toISOString(),
    });
  }
}
