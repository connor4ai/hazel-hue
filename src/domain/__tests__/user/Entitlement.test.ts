import {
  createEntitlement,
  consumeEntitlement,
  isEntitlementValid,
} from '@domain/user/entities/Entitlement';
import { createUserId, createPurchaseId } from '@domain/shared/types/ValueObjects';

const userId = createUserId('user-123');
const purchaseId = createPurchaseId('purchase-456');

describe('Entitlement entity', () => {
  describe('createEntitlement', () => {
    it('creates a valid unconsumed entitlement', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);

      expect(ent.userId).toBe(userId);
      expect(ent.type).toBe('ANALYSIS');
      expect(ent.purchaseId).toBe(purchaseId);
      expect(ent.consumed).toBe(false);
      expect(ent.consumedAt).toBeNull();
      expect(ent.expiresAt).toBeNull();
      expect(ent.grantedAt).toBeDefined();
    });
  });

  describe('consumeEntitlement', () => {
    it('marks entitlement as consumed with timestamp', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      const consumed = consumeEntitlement(ent);

      expect(consumed.consumed).toBe(true);
      expect(consumed.consumedAt).toBeDefined();
    });

    it('does not mutate original', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      consumeEntitlement(ent);

      expect(ent.consumed).toBe(false);
    });
  });

  describe('isEntitlementValid', () => {
    it('returns true for unconsumed, non-expired entitlement', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      expect(isEntitlementValid(ent)).toBe(true);
    });

    it('returns false for consumed entitlement', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      const consumed = consumeEntitlement(ent);
      expect(isEntitlementValid(consumed)).toBe(false);
    });

    it('returns false for expired entitlement', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      const expired = { ...ent, expiresAt: '2020-01-01T00:00:00Z' };
      expect(isEntitlementValid(expired)).toBe(false);
    });

    it('returns true for entitlement with future expiration', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      const future = { ...ent, expiresAt: '2099-12-31T23:59:59Z' };
      expect(isEntitlementValid(future)).toBe(true);
    });

    it('returns true for entitlement with null expiresAt (forever)', () => {
      const ent = createEntitlement(userId, 'ANALYSIS', purchaseId);
      expect(ent.expiresAt).toBeNull();
      expect(isEntitlementValid(ent)).toBe(true);
    });
  });
});
