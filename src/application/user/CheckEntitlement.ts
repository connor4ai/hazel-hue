import type { UserId } from '@domain/shared/types';
import type { EntitlementType } from '@domain/user/entities/Entitlement';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';
import { hasValidEntitlement } from '@domain/user/services/EntitlementChecker';

export interface CheckEntitlementDeps {
  userRepo: IUserRepository;
}

/**
 * Use case: Check if a user has a valid entitlement of the given type.
 */
export async function checkEntitlement(
  userId: UserId,
  type: EntitlementType,
  deps: CheckEntitlementDeps,
): Promise<boolean> {
  const entitlements = await deps.userRepo.getEntitlements(userId);
  return hasValidEntitlement(entitlements, type);
}
