/**
 * Feature flags for progressive rollout.
 * Supports default values with runtime overrides from AsyncStorage
 * or a remote config service.
 */

type FeatureFlagKey =
  | 'wardrobeCheck'
  | 'colorOfDayWidget'
  | 'seasonMatch'
  | 'enterprise'
  | 'referrals'
  | 'pdfDownload'
  | 'lockScreenGenerator';

const defaults: Record<FeatureFlagKey, boolean> = {
  /** Enable wardrobe check add-on purchase */
  wardrobeCheck: false,
  /** Enable Color of the Day widget */
  colorOfDayWidget: false,
  /** Enable Season Match social feature */
  seasonMatch: false,
  /** Enable enterprise multi-tenant mode */
  enterprise: false,
  /** Enable referral system */
  referrals: true,
  /** Enable PDF results download */
  pdfDownload: true,
  /** Enable lock screen wallpaper generator */
  lockScreenGenerator: true,
};

const overrides: Partial<Record<FeatureFlagKey, boolean>> = {};

/**
 * Check if a feature flag is enabled.
 * Overrides take precedence over defaults.
 */
export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  if (flag in overrides) {
    return overrides[flag]!;
  }
  return defaults[flag];
}

/**
 * Override a feature flag at runtime.
 * Useful for remote config, A/B testing, or dev tools.
 */
export function setFeatureOverride(flag: FeatureFlagKey, enabled: boolean): void {
  overrides[flag] = enabled;
}

/**
 * Clear a runtime override, reverting to the default value.
 */
export function clearFeatureOverride(flag: FeatureFlagKey): void {
  delete overrides[flag];
}

/**
 * Clear all runtime overrides.
 */
export function clearAllOverrides(): void {
  for (const key of Object.keys(overrides) as FeatureFlagKey[]) {
    delete overrides[key];
  }
}

/**
 * Get all flag values (with overrides applied).
 */
export function getAllFlags(): Record<FeatureFlagKey, boolean> {
  return { ...defaults, ...overrides };
}

// Backward-compatible static export
export const featureFlags = defaults;
