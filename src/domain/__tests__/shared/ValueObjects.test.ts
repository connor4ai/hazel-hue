import {
  createUserId,
  createAnalysisId,
  createPurchaseId,
  createReferralCode,
  createTenantId,
  createShareId,
  createConfidenceScore,
} from '@domain/shared/types/ValueObjects';

describe('ValueObjects', () => {
  describe('branded types', () => {
    it('creates UserId from string', () => {
      const id = createUserId('user-123');
      expect(id).toBe('user-123');
    });

    it('creates AnalysisId from string', () => {
      const id = createAnalysisId('analysis-456');
      expect(id).toBe('analysis-456');
    });

    it('creates PurchaseId from string', () => {
      const id = createPurchaseId('purchase-789');
      expect(id).toBe('purchase-789');
    });

    it('creates ReferralCode from string', () => {
      const code = createReferralCode('FRIEND10');
      expect(code).toBe('FRIEND10');
    });

    it('creates TenantId from string', () => {
      const id = createTenantId('tenant-001');
      expect(id).toBe('tenant-001');
    });

    it('creates ShareId from string', () => {
      const id = createShareId('share-xyz');
      expect(id).toBe('share-xyz');
    });
  });

  describe('createConfidenceScore', () => {
    it('creates a valid score', () => {
      const score = createConfidenceScore(85);
      expect(score).toBe(85);
    });

    it('rounds the score', () => {
      const score = createConfidenceScore(85.7);
      expect(score).toBe(86);
    });

    it('accepts boundary values', () => {
      expect(createConfidenceScore(0)).toBe(0);
      expect(createConfidenceScore(100)).toBe(100);
    });

    it('throws for score below 0', () => {
      expect(() => createConfidenceScore(-1)).toThrow();
    });

    it('throws for score above 100', () => {
      expect(() => createConfidenceScore(101)).toThrow();
    });
  });
});
