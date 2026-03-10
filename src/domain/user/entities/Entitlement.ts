import type { UserId, PurchaseId } from '@domain/shared/types';

export type EntitlementType = 'ANALYSIS' | 'WARDROBE_CHECK';

export interface Entitlement {
  userId: UserId;
  type: EntitlementType;
  purchaseId: PurchaseId;
  grantedAt: string;
  expiresAt: string | null; // null = forever (one-time purchase)
  consumed: boolean;
  consumedAt: string | null;
}

export function createEntitlement(
  userId: UserId,
  type: EntitlementType,
  purchaseId: PurchaseId,
): Entitlement {
  return {
    userId,
    type,
    purchaseId,
    grantedAt: new Date().toISOString(),
    expiresAt: null,
    consumed: false,
    consumedAt: null,
  };
}

export function consumeEntitlement(entitlement: Entitlement): Entitlement {
  return {
    ...entitlement,
    consumed: true,
    consumedAt: new Date().toISOString(),
  };
}

export function isEntitlementValid(entitlement: Entitlement): boolean {
  if (entitlement.consumed) return false;
  if (entitlement.expiresAt && new Date(entitlement.expiresAt) < new Date()) {
    return false;
  }
  return true;
}
