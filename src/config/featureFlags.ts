/**
 * Feature flags for progressive rollout.
 * In production, these would be backed by a remote config service.
 */
export const featureFlags = {
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
} as const;
