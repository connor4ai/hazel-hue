import type { Undertone, Chroma, ContrastLevel } from '@domain/shared/types';

/**
 * The composite of undertone, chroma, and contrast that uniquely
 * describes a user's natural coloring. Two people can share a season
 * but have different color profiles.
 */
export interface ColorProfile {
  undertone: Undertone;
  chroma: Chroma;
  contrastLevel: ContrastLevel;
  dominantSkinHex: string;
  dominantHairHex: string;
  dominantEyeHex: string;
}
