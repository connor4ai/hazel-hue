import type { UserId } from '@domain/shared/types';
import type { IUserRepository } from '@domain/user/repositories/IUserRepository';

export interface UpdateProfileInput {
  userId: UserId;
  displayName?: string;
  email?: string;
}

export interface UpdateProfileDeps {
  userRepo: IUserRepository;
}

/**
 * Use case: Update a user's profile information.
 */
export async function updateProfile(
  input: UpdateProfileInput,
  deps: UpdateProfileDeps,
): Promise<void> {
  const user = await deps.userRepo.getUser(input.userId);
  if (!user) {
    throw new Error('User not found');
  }

  const updated = {
    ...user,
    displayName: input.displayName ?? user.displayName,
    email: input.email ?? user.email,
    updatedAt: new Date().toISOString(),
  };

  await deps.userRepo.updateUser(updated);
}
