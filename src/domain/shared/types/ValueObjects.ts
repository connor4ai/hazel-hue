/**
 * Branded types for domain identifiers.
 * Prevents accidentally passing a UserId where an AnalysisId is expected.
 */

type Brand<T, B extends string> = T & { readonly __brand: B };

export type UserId = Brand<string, 'UserId'>;
export type AnalysisId = Brand<string, 'AnalysisId'>;
export type PurchaseId = Brand<string, 'PurchaseId'>;
export type ReferralCode = Brand<string, 'ReferralCode'>;
export type TenantId = Brand<string, 'TenantId'>;
export type ShareId = Brand<string, 'ShareId'>;

export function createUserId(id: string): UserId {
  return id as UserId;
}

export function createAnalysisId(id: string): AnalysisId {
  return id as AnalysisId;
}

export function createPurchaseId(id: string): PurchaseId {
  return id as PurchaseId;
}

export function createReferralCode(code: string): ReferralCode {
  return code as ReferralCode;
}

export function createTenantId(id: string): TenantId {
  return id as TenantId;
}

export function createShareId(id: string): ShareId {
  return id as ShareId;
}

/**
 * A single color in a palette, with hex value and descriptive name.
 */
export interface PaletteColor {
  hex: string;
  name: string;
}

/**
 * Confidence score for an analysis result (0-100).
 * Based on photo quality and model certainty.
 */
export type ConfidenceScore = Brand<number, 'ConfidenceScore'>;

export function createConfidenceScore(score: number): ConfidenceScore {
  if (score < 0 || score > 100) {
    throw new Error(`Confidence score must be between 0 and 100, got ${score}`);
  }
  return Math.round(score) as unknown as ConfidenceScore;
}
