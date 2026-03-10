import type { Entitlement, EntitlementType } from '../entities/Entitlement';
import { isEntitlementValid } from '../entities/Entitlement';

/**
 * Checks if a user has a valid (unconsumed, non-expired) entitlement
 * of the given type. Used as a gate before starting analysis processing.
 */
export function findValidEntitlement(
  entitlements: Entitlement[],
  type: EntitlementType,
): Entitlement | null {
  return (
    entitlements.find(
      (e) => e.type === type && isEntitlementValid(e),
    ) ?? null
  );
}

export function hasValidEntitlement(
  entitlements: Entitlement[],
  type: EntitlementType,
): boolean {
  return findValidEntitlement(entitlements, type) !== null;
}
