import type { AnalysisId, PaletteColor } from '@domain/shared/types';

/**
 * A curated set of colors that complement a user's season.
 * Organized into categories for practical use.
 */
export interface Palette {
  analysisId: AnalysisId;
  signatureColor: PaletteColor;
  neutrals: PaletteColor[];    // 6-8 everyday foundation colors
  statements: PaletteColor[];  // 6-8 bold, eye-catching choices
  accents: PaletteColor[];     // 6-8 small pop colors
  colorsToAvoid: AvoidColor[]; // 8-10 colors that clash
}

export interface AvoidColor {
  hex: string;
  name: string;
  reason: string;
}
