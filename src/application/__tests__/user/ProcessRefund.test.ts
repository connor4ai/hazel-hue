import { processRefund } from '@application/user/ProcessRefund';
import { createPurchase, completePurchase } from '@domain/user/entities/Purchase';
import { createEntitlement } from '@domain/user/entities/Entitlement';
import { createPurchaseId, createUserId } from '@domain/shared/types/ValueObjects';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

const purchaseId = createPurchaseId('purchase-123');
const userId = createUserId('user-456');

function mockUserRepo(purchaseStatus: 'COMPLETED' | 'PENDING' | 'REFUNDED' = 'COMPLETED') {
  const purchase = createPurchase(purchaseId, userId, 'STRIPE', 'receipt_xyz');
  let finalPurchase = purchase;
  if (purchaseStatus === 'COMPLETED') {
    finalPurchase = completePurchase(purchase, 'receipt_xyz');
  } else if (purchaseStatus === 'REFUNDED') {
    finalPurchase = { ...completePurchase(purchase, 'receipt_xyz'), status: 'REFUNDED' as const, refundedAt: new Date().toISOString() };
  }

  const entitlement = createEntitlement(userId, 'ANALYSIS', purchaseId);

  const repo: jest.Mocked<IUserRepository> = {
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getPurchases: jest.fn().mockResolvedValue([finalPurchase]),
    createPurchase: jest.fn(),
    updatePurchase: jest.fn(),
    getEntitlements: jest.fn().mockResolvedValue([entitlement]),
    createEntitlement: jest.fn(),
    updateEntitlement: jest.fn(),
  };
  return repo;
}

describe('ProcessRefund use case', () => {
  it('refunds a completed purchase and revokes entitlement', async () => {
    const repo = mockUserRepo('COMPLETED');

    await processRefund(
      { purchaseId, userId },
      { userRepo: repo },
    );

    expect(repo.updatePurchase).toHaveBeenCalledTimes(1);
    expect(repo.updatePurchase.mock.calls[0][0].status).toBe('REFUNDED');

    expect(repo.updateEntitlement).toHaveBeenCalledTimes(1);
    expect(repo.updateEntitlement.mock.calls[0][0].consumed).toBe(true);
  });

  it('throws when purchase not found', async () => {
    const repo = mockUserRepo();
    repo.getPurchases.mockResolvedValue([]);

    await expect(
      processRefund({ purchaseId, userId }, { userRepo: repo }),
    ).rejects.toThrow('Purchase not found');
  });

  it('throws when purchase already refunded', async () => {
    const repo = mockUserRepo('REFUNDED');

    await expect(
      processRefund({ purchaseId, userId }, { userRepo: repo }),
    ).rejects.toThrow('Purchase already refunded');
  });

  it('throws when purchase is not completed', async () => {
    const repo = mockUserRepo('PENDING');

    await expect(
      processRefund({ purchaseId, userId }, { userRepo: repo }),
    ).rejects.toThrow('Only completed purchases can be refunded');
  });
});
