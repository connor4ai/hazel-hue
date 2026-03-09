import { createAndCompletePurchase } from '@application/user/CreatePurchase';
import { createPurchaseId, createUserId } from '@domain/shared/types/ValueObjects';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

const purchaseId = createPurchaseId('purchase-123');
const userId = createUserId('user-456');

function mockUserRepo(): jest.Mocked<IUserRepository> {
  return {
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getPurchases: jest.fn(),
    createPurchase: jest.fn(),
    updatePurchase: jest.fn(),
    getEntitlements: jest.fn(),
    createEntitlement: jest.fn(),
    updateEntitlement: jest.fn(),
  };
}

describe('CreatePurchase use case', () => {
  it('creates a completed purchase and grants entitlement', async () => {
    const repo = mockUserRepo();

    await createAndCompletePurchase(
      { purchaseId, userId, platform: 'APPLE_IAP', platformReceiptId: 'receipt_abc' },
      { userRepo: repo },
    );

    expect(repo.createPurchase).toHaveBeenCalledTimes(1);
    const purchase = repo.createPurchase.mock.calls[0][0];
    expect(purchase.status).toBe('COMPLETED');
    expect(purchase.amount).toBe(1900);

    expect(repo.createEntitlement).toHaveBeenCalledTimes(1);
    const entitlement = repo.createEntitlement.mock.calls[0][0];
    expect(entitlement.type).toBe('ANALYSIS');
    expect(entitlement.userId).toBe(userId);
  });
});
