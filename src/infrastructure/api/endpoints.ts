import ENV from '@config/env';

const BASE = ENV.API_BASE_URL;

export const endpoints = {
  // User context
  user: {
    profile: `${BASE}/user/profile`,
    shares: `${BASE}/user/shares`,
    purchases: `${BASE}/user/purchases`,
    entitlements: `${BASE}/user/entitlements`,
  },

  // Analysis context
  analysis: {
    create: `${BASE}/analysis`,
    getById: (id: string) => `${BASE}/analysis/${id}`,
    list: `${BASE}/analysis`,
    checkQuality: `${BASE}/analysis/check-quality`,
    presignedUpload: `${BASE}/analysis/upload-url`,
    pollStatus: (id: string) => `${BASE}/analysis/${id}/status`,
  },

  // Recommendation context
  recommendation: {
    palette: (analysisId: string) => `${BASE}/recommendation/${analysisId}/palette`,
    styleGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/style-guide`,
    makeupGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/makeup`,
    hairGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/hair`,
    jewelryGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/jewelry`,
    seasonSiblings: (analysisId: string) => `${BASE}/recommendation/${analysisId}/siblings`,
    nailGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/nails`,
    accessoryGuide: (analysisId: string) => `${BASE}/recommendation/${analysisId}/accessories`,
  },

  // Experience context
  experience: {
    shareImage: `${BASE}/experience/share-image`,
    lockScreen: `${BASE}/experience/lock-screen`,
    salonCard: `${BASE}/experience/salon-card`,
    referral: `${BASE}/experience/referral`,
  },
} as const;
