import { checkEntitlement } from '@application/user/CheckEntitlement';
import { createEntitlement } from '@domain/user/entities/Entitlement';
import { createUserId, createPurchaseId } from '@domain/shared/types/ValueObjects';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

const userId = createUserId('user-123');
const purchaseId = createPurchaseId('purchase-456');

function mockUserRepo(hasEntitlement = true): jest.Mocked<IUserRepository> {
  const entitlements = hasEntitlement
    ? [createEntitlement(userId, 'ANALYSIS', purchaseId)]
    : [];

  return {
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getPurchases: jest.fn(),
    createPurchase: jest.fn(),
    updatePurchase: jest.fn(),
    getEntitlements: jest.fn().mockResolvedValue(entitlements),
    createEntitlement: jest.fn(),
    updateEntitlement: jest.fn(),
  };
}

describe('CheckEntitlement use case', () => {
  it('returns true when user has valid entitlement', async () => {
    const repo = mockUserRepo(true);
    const result = await checkEntitlement(userId, 'ANALYSIS', { userRepo: repo });

    expect(result).toBe(true);
  });

  it('returns false when user has no entitlement', async () => {
    const repo = mockUserRepo(false);
    const result = await checkEntitlement(userId, 'ANALYSIS', { userRepo: repo });

    expect(result).toBe(false);
  });
});
