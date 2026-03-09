import {
  findValidEntitlement,
  hasValidEntitlement,
} from '@domain/user/services/EntitlementChecker';
import { createEntitlement, consumeEntitlement } from '@domain/user/entities/Entitlement';
import { createUserId, createPurchaseId } from '@domain/shared/types/ValueObjects';

const userId = createUserId('user-123');

function makeEntitlement(overrides: Partial<ReturnType<typeof createEntitlement>> = {}) {
  const ent = createEntitlement(
    userId,
    'ANALYSIS',
    createPurchaseId(`purchase-${Math.random()}`),
  );
  return { ...ent, ...overrides };
}

describe('EntitlementChecker', () => {
  describe('findValidEntitlement', () => {
    it('returns a valid entitlement of the correct type', () => {
      const valid = makeEntitlement();
      const result = findValidEntitlement([valid], 'ANALYSIS');

      expect(result).toEqual(valid);
    });

    it('returns null when no entitlements exist', () => {
      expect(findValidEntitlement([], 'ANALYSIS')).toBeNull();
    });

    it('skips consumed entitlements', () => {
      const consumed = consumeEntitlement(makeEntitlement());
      expect(findValidEntitlement([consumed], 'ANALYSIS')).toBeNull();
    });

    it('skips expired entitlements', () => {
      const expired = makeEntitlement({ expiresAt: '2020-01-01T00:00:00Z' });
      expect(findValidEntitlement([expired], 'ANALYSIS')).toBeNull();
    });

    it('skips wrong type', () => {
      const wardrobeEnt = makeEntitlement({ type: 'WARDROBE_CHECK' });
      expect(findValidEntitlement([wardrobeEnt], 'ANALYSIS')).toBeNull();
    });

    it('returns first valid when multiple exist', () => {
      const consumed = consumeEntitlement(makeEntitlement());
      const valid = makeEntitlement();
      const result = findValidEntitlement([consumed, valid], 'ANALYSIS');

      expect(result).toEqual(valid);
    });
  });

  describe('hasValidEntitlement', () => {
    it('returns true when a valid entitlement exists', () => {
      const valid = makeEntitlement();
      expect(hasValidEntitlement([valid], 'ANALYSIS')).toBe(true);
    });

    it('returns false when no valid entitlement exists', () => {
      expect(hasValidEntitlement([], 'ANALYSIS')).toBe(false);
    });
  });
});
