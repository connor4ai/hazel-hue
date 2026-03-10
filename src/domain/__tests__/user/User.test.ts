import { createUser } from '@domain/user/entities/User';
import { createUserId } from '@domain/shared/types/ValueObjects';

const userId = createUserId('user-123');

describe('User entity', () => {
  describe('createUser', () => {
    it('creates user with required fields', () => {
      const user = createUser(userId, 'apple');

      expect(user.id).toBe(userId);
      expect(user.authProvider).toBe('apple');
      expect(user.email).toBeNull();
      expect(user.displayName).toBeNull();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
      expect(user.createdAt).toBe(user.updatedAt);
    });

    it('accepts optional email and display name', () => {
      const user = createUser(userId, 'email', 'test@example.com', 'Jane');

      expect(user.email).toBe('test@example.com');
      expect(user.displayName).toBe('Jane');
    });

    it('supports all auth providers', () => {
      expect(createUser(userId, 'apple').authProvider).toBe('apple');
      expect(createUser(userId, 'google').authProvider).toBe('google');
      expect(createUser(userId, 'email').authProvider).toBe('email');
    });
  });
});
