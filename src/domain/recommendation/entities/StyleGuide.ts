import type { AnalysisId, PaletteColor } from '@domain/shared/types';

/**
 * Personalized style recommendations — "Your Lookbook".
 * Specific outfit concepts with colors from the user's palette.
 */
export interface StyleGuide {
  analysisId: AnalysisId;
  outfits: OutfitConcept[];
  bestPatterns: string[];
  bestFabrics: string[];
  patternsToAvoid: string[];
}

export interface OutfitConcept {
  name: string; // e.g., "The Weekend", "Date Night"
  description: string;
  pieces: OutfitPiece[];
}

export interface OutfitPiece {
  item: string; // e.g., "Olive linen pants"
  color: PaletteColor;
}

/**
 * Makeup recommendations tailored to the user's color profile.
 */
export interface MakeupGuide {
  analysisId: AnalysisId;
  foundationTone: string;
  lipColors: PaletteColor[];      // 6 from nude to bold
  eyeShadows: PaletteColor[];     // 6 complementary shades
  blushColors: PaletteColor[];
  yourRed: PaletteColor;          // THE one perfect red
}

/**
 * Hair color recommendations with professional salon terminology.
 */
export interface HairGuide {
  analysisId: AnalysisId;
  bestColors: PaletteColor[];
  colorsToAvoid: PaletteColor[];
  highlightRecommendation: string;
  lowlightRecommendation: string;
  salonTerminology: string[];     // Professional terms to tell stylist
}

/**
 * Jewelry and metals guide.
 */
export interface JewelryGuide {
  analysisId: AnalysisId;
  bestMetals: string[];           // e.g., "Gold", "Rose gold"
  metalsToMinimize: string[];     // e.g., "Silver", "Platinum"
  gemstoneRecommendations: string[];
}

/**
 * Celebrity season matches for social sharing.
 */
export interface SeasonSiblings {
  analysisId: AnalysisId;
  celebrities: CelebrityMatch[];
}

export interface CelebrityMatch {
  name: string;
  description: string; // Brief note on their coloring
}
