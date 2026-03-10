import type { PurchaseId, UserId } from '@domain/shared/types';
import { createPurchase, completePurchase, type PaymentPlatform } from '@domain/user/entities/Purchase';
import { createEntitlement } from '@domain/user/entities/Entitlement';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

export interface CreatePurchaseInput {
  purchaseId: PurchaseId;
  userId: UserId;
  platform: PaymentPlatform;
  platformReceiptId: string;
}

export interface CreatePurchaseDeps {
  userRepo: IUserRepository;
}

/**
 * Use case: Process a $19 one-time purchase.
 * Creates purchase record, marks it complete, and grants an analysis entitlement.
 */
export async function createAndCompletePurchase(
  input: CreatePurchaseInput,
  deps: CreatePurchaseDeps,
): Promise<void> {
  // Create and immediately complete the purchase
  const purchase = createPurchase(
    input.purchaseId,
    input.userId,
    input.platform,
    input.platformReceiptId,
  );
  const completed = completePurchase(purchase, input.platformReceiptId);
  await deps.userRepo.createPurchase(completed);

  // Grant analysis entitlement
  const entitlement = createEntitlement(
    input.userId,
    'ANALYSIS',
    input.purchaseId,
  );
  await deps.userRepo.createEntitlement(entitlement);
}
