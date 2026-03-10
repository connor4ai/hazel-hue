import {
  createPurchase,
  completePurchase,
  refundPurchase,
  ANALYSIS_PRICE_CENTS,
} from '@domain/user/entities/Purchase';
import { createPurchaseId, createUserId } from '@domain/shared/types/ValueObjects';

const purchaseId = createPurchaseId('purchase-123');
const userId = createUserId('user-456');

describe('Purchase entity', () => {
  describe('createPurchase', () => {
    it('creates a pending purchase with correct price', () => {
      const purchase = createPurchase(purchaseId, userId, 'APPLE_IAP');

      expect(purchase.id).toBe(purchaseId);
      expect(purchase.userId).toBe(userId);
      expect(purchase.amount).toBe(ANALYSIS_PRICE_CENTS);
      expect(purchase.currency).toBe('USD');
      expect(purchase.status).toBe('PENDING');
      expect(purchase.platform).toBe('APPLE_IAP');
      expect(purchase.platformReceiptId).toBeNull();
      expect(purchase.refundedAt).toBeNull();
    });

    it('accepts optional receipt ID', () => {
      const purchase = createPurchase(purchaseId, userId, 'STRIPE', 'receipt_xyz');

      expect(purchase.platformReceiptId).toBe('receipt_xyz');
    });

    it('sets price to $19 (1900 cents)', () => {
      expect(ANALYSIS_PRICE_CENTS).toBe(1900);
    });
  });

  describe('completePurchase', () => {
    it('transitions to COMPLETED with receipt', () => {
      const purchase = createPurchase(purchaseId, userId, 'GOOGLE_PLAY');
      const completed = completePurchase(purchase, 'receipt_abc');

      expect(completed.status).toBe('COMPLETED');
      expect(completed.platformReceiptId).toBe('receipt_abc');
    });

    it('does not mutate original', () => {
      const purchase = createPurchase(purchaseId, userId, 'APPLE_IAP');
      completePurchase(purchase, 'receipt_abc');

      expect(purchase.status).toBe('PENDING');
    });
  });

  describe('refundPurchase', () => {
    it('transitions to REFUNDED with timestamp', () => {
      const purchase = createPurchase(purchaseId, userId, 'STRIPE');
      const completed = completePurchase(purchase, 'receipt_abc');
      const refunded = refundPurchase(completed);

      expect(refunded.status).toBe('REFUNDED');
      expect(refunded.refundedAt).toBeDefined();
    });
  });
});
