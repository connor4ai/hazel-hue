import type { PurchaseId, UserId } from '@domain/shared/types';

export type PurchaseStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
export type PaymentPlatform = 'APPLE_IAP' | 'GOOGLE_PLAY' | 'STRIPE';

export interface Purchase {
  id: PurchaseId;
  userId: UserId;
  amount: number; // cents (1900 = $19.00)
  currency: string;
  status: PurchaseStatus;
  platform: PaymentPlatform;
  platformReceiptId: string | null;
  refundedAt: string | null;
  createdAt: string;
}

export const ANALYSIS_PRICE_CENTS = 1900;

export function createPurchase(
  id: PurchaseId,
  userId: UserId,
  platform: PaymentPlatform,
  platformReceiptId?: string,
): Purchase {
  return {
    id,
    userId,
    amount: ANALYSIS_PRICE_CENTS,
    currency: 'USD',
    status: 'PENDING',
    platform,
    platformReceiptId: platformReceiptId ?? null,
    refundedAt: null,
    createdAt: new Date().toISOString(),
  };
}

export function completePurchase(
  purchase: Purchase,
  platformReceiptId: string,
): Purchase {
  return {
    ...purchase,
    status: 'COMPLETED',
    platformReceiptId,
  };
}

export function refundPurchase(purchase: Purchase): Purchase {
  return {
    ...purchase,
    status: 'REFUNDED',
    refundedAt: new Date().toISOString(),
  };
}
