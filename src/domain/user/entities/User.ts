import type { UserId } from '@domain/shared/types';

export interface User {
  id: UserId;
  email: string | null;
  displayName: string | null;
  authProvider: 'apple' | 'google' | 'email';
  createdAt: string;
  updatedAt: string;
}

export function createUser(
  id: UserId,
  authProvider: 'apple' | 'google' | 'email',
  email?: string,
  displayName?: string,
): User {
  const now = new Date().toISOString();
  return {
    id,
    email: email ?? null,
    displayName: displayName ?? null,
    authProvider,
    createdAt: now,
    updatedAt: now,
  };
}
