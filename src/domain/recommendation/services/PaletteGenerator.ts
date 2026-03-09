import type { Season } from '@domain/shared/types';
import type { ColorProfile } from '@domain/analysis/entities/ColorProfile';
import type { Palette } from '../entities/Palette';

/**
 * Domain service interface for generating personalized palettes.
 * Implementation lives in the infrastructure layer (Bedrock AI).
 */
export interface IPaletteGenerator {
  generatePalette(season: Season, colorProfile: ColorProfile): Promise<Palette>;
}
