import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import ENV from '@config/env';
import { REVENUE_CAT_PRODUCT_ID } from '@config/constants';

let initialized = false;

/**
 * Initialize RevenueCat SDK with the platform-appropriate API key.
 * Must be called once at app startup.
 */
export async function initializeRevenueCat(): Promise<void> {
  if (initialized) return;

  const apiKey = Platform.OS === 'ios'
    ? ENV.REVENUE_CAT_API_KEY_IOS
    : ENV.REVENUE_CAT_API_KEY_ANDROID;

  if (!apiKey) {
    console.warn('RevenueCat API key not configured');
    return;
  }

  await Purchases.configure({ apiKey });
  initialized = true;
}

/**
 * Set the RevenueCat user ID (call after authentication).
 */
export async function identifyUser(userId: string): Promise<void> {
  await Purchases.logIn(userId);
}

export interface PurchaseResult {
  productId: string;
  transactionId: string;
  receipt: string;
  platform: 'APPLE_IAP' | 'GOOGLE_PLAY';
}

/**
 * Purchase the color analysis product ($19 one-time).
 * Returns the receipt info needed for backend verification.
 */
export async function purchaseAnalysis(): Promise<PurchaseResult> {
  const offerings = await Purchases.getOfferings();
  const offering = offerings.current;

  if (!offering) {
    throw new Error('No offerings available');
  }

  const pkg = offering.availablePackages.find(
    (p) => p.product.identifier === REVENUE_CAT_PRODUCT_ID,
  );

  if (!pkg) {
    throw new Error('Analysis product not found');
  }

  const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pkg);

  const transactionId = customerInfo.nonSubscriptionTransactions
    .find((t) => t.productIdentifier === REVENUE_CAT_PRODUCT_ID)?.transactionIdentifier ?? '';

  return {
    productId: productIdentifier,
    transactionId,
    receipt: JSON.stringify(customerInfo.originalAppUserId),
    platform: Platform.OS === 'ios' ? 'APPLE_IAP' : 'GOOGLE_PLAY',
  };
}

/**
 * Check if the user has already purchased the analysis.
 */
export async function hasExistingPurchase(): Promise<boolean> {
  const info = await Purchases.getCustomerInfo();
  return info.nonSubscriptionTransactions.some(
    (t) => t.productIdentifier === REVENUE_CAT_PRODUCT_ID,
  );
}

/**
 * Restore previous purchases (e.g., after reinstall).
 */
export async function restorePurchases(): Promise<boolean> {
  const info = await Purchases.restorePurchases();
  return info.nonSubscriptionTransactions.some(
    (t) => t.productIdentifier === REVENUE_CAT_PRODUCT_ID,
  );
}
