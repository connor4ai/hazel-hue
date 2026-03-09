import { useState, useCallback } from 'react';
import {
  purchaseAnalysis,
  hasExistingPurchase,
  restorePurchases,
  type PurchaseResult,
} from '@infrastructure/payments/RevenueCatProvider';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

interface UsePurchaseReturn {
  isPurchasing: boolean;
  isRestoring: boolean;
  error: string | null;
  purchase: () => Promise<PurchaseResult | null>;
  restore: () => Promise<boolean>;
  checkEntitlement: () => Promise<boolean>;
}

export function usePurchase(): UsePurchaseReturn {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchase = useCallback(async (): Promise<PurchaseResult | null> => {
    setIsPurchasing(true);
    setError(null);
    try {
      const result = await purchaseAnalysis();

      // Verify purchase on backend
      await apiClient.post(endpoints.user.purchases, {
        platform: result.platform,
        receiptId: result.transactionId,
        productId: result.productId,
      });

      return result;
    } catch (err) {
      if (err instanceof Error && err.message.includes('cancelled')) {
        return null;
      }
      const message = err instanceof Error ? err.message : 'Purchase failed';
      setError(message);
      return null;
    } finally {
      setIsPurchasing(false);
    }
  }, []);

  const restore = useCallback(async (): Promise<boolean> => {
    setIsRestoring(true);
    setError(null);
    try {
      return await restorePurchases();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Restore failed';
      setError(message);
      return false;
    } finally {
      setIsRestoring(false);
    }
  }, []);

  const checkEntitlement = useCallback(async (): Promise<boolean> => {
    try {
      return await hasExistingPurchase();
    } catch {
      return false;
    }
  }, []);

  return { isPurchasing, isRestoring, error, purchase, restore, checkEntitlement };
}
