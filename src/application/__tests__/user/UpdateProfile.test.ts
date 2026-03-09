import { updateProfile } from '@application/user/UpdateProfile';
import { createUser } from '@domain/user/entities/User';
import { createUserId } from '@domain/shared/types/ValueObjects';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

const userId = createUserId('user-123');

function mockUserRepo(userExists = true): jest.Mocked<IUserRepository> {
  const user = userExists
    ? createUser(userId, 'email', 'old@example.com', 'Old Name')
    : null;

  return {
    getUser: jest.fn().mockResolvedValue(user),
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

describe('UpdateProfile use case', () => {
  it('updates display name and email', async () => {
    const repo = mockUserRepo(true);

    await updateProfile(
      { userId, displayName: 'New Name', email: 'new@example.com' },
      { userRepo: repo },
    );

    expect(repo.updateUser).toHaveBeenCalledTimes(1);
    const updated = repo.updateUser.mock.calls[0][0];
    expect(updated.displayName).toBe('New Name');
    expect(updated.email).toBe('new@example.com');
  });

  it('keeps existing values when not provided', async () => {
    const repo = mockUserRepo(true);

    await updateProfile(
      { userId },
      { userRepo: repo },
    );

    const updated = repo.updateUser.mock.calls[0][0];
    expect(updated.displayName).toBe('Old Name');
    expect(updated.email).toBe('old@example.com');
  });

  it('throws when user not found', async () => {
    const repo = mockUserRepo(false);

    await expect(
      updateProfile({ userId, displayName: 'New Name' }, { userRepo: repo }),
    ).rejects.toThrow('User not found');
  });
});
