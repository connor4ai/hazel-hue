export type Undertone = 'warm' | 'cool' | 'neutral';

export type Chroma = 'bright' | 'soft' | 'muted';

export type ContrastLevel = 'low' | 'medium' | 'high';

/**
 * The composite of undertone, chroma, and contrast that uniquely describes
 * a user's natural coloring. This goes beyond just the season — two people
 * can be the same season but have different color profiles.
 */
export interface ColorProfileTraits {
  undertone: Undertone;
  chroma: Chroma;
  contrastLevel: ContrastLevel;
  skinHex: string;
  hairHex: string;
  eyeHex: string;
}
