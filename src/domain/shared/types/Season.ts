/**
 * The 12 seasonal color types used in personal color analysis.
 * Each season is a combination of temperature (warm/cool),
 * value (light/deep), and chroma (bright/soft).
 */
export enum Season {
  LightSpring = 'LIGHT_SPRING',
  TrueSpring = 'TRUE_SPRING',
  BrightSpring = 'BRIGHT_SPRING',

  LightSummer = 'LIGHT_SUMMER',
  TrueSummer = 'TRUE_SUMMER',
  SoftSummer = 'SOFT_SUMMER',

  SoftAutumn = 'SOFT_AUTUMN',
  TrueAutumn = 'TRUE_AUTUMN',
  DeepAutumn = 'DEEP_AUTUMN',

  DeepWinter = 'DEEP_WINTER',
  TrueWinter = 'TRUE_WINTER',
  BrightWinter = 'BRIGHT_WINTER',
}

export type SeasonFamily = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

export function getSeasonFamily(season: Season): SeasonFamily {
  if (season.includes('SPRING')) return 'SPRING';
  if (season.includes('SUMMER')) return 'SUMMER';
  if (season.includes('AUTUMN')) return 'AUTUMN';
  return 'WINTER';
}

export function getSeasonDisplayName(season: Season): string {
  return season
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export interface SeasonMetadata {
  season: Season;
  family: SeasonFamily;
  displayName: string;
  poeticDescription: string;
  accentColor: string;
  temperature: 'warm' | 'cool';
  value: 'light' | 'medium' | 'deep';
  chroma: 'bright' | 'soft' | 'true';
}

export const SEASON_METADATA: Record<Season, SeasonMetadata> = {
  [Season.LightSpring]: {
    season: Season.LightSpring,
    family: 'SPRING',
    displayName: 'Light Spring',
    poeticDescription: 'Delicate, warm, and luminous — like morning sunlight on peach blossoms',
    accentColor: '#FFB347',
    temperature: 'warm',
    value: 'light',
    chroma: 'soft',
  },
  [Season.TrueSpring]: {
    season: Season.TrueSpring,
    family: 'SPRING',
    displayName: 'True Spring',
    poeticDescription: 'Vibrant, warm, and alive — like a garden in full bloom',
    accentColor: '#FF6B35',
    temperature: 'warm',
    value: 'medium',
    chroma: 'true',
  },
  [Season.BrightSpring]: {
    season: Season.BrightSpring,
    family: 'SPRING',
    displayName: 'Bright Spring',
    poeticDescription: 'Electric, clear, and radiant — like tropical flowers in noon sun',
    accentColor: '#FF4F81',
    temperature: 'warm',
    value: 'medium',
    chroma: 'bright',
  },
  [Season.LightSummer]: {
    season: Season.LightSummer,
    family: 'SUMMER',
    displayName: 'Light Summer',
    poeticDescription: 'Soft, cool, and ethereal — like lavender fields in morning mist',
    accentColor: '#B19CD9',
    temperature: 'cool',
    value: 'light',
    chroma: 'soft',
  },
  [Season.TrueSummer]: {
    season: Season.TrueSummer,
    family: 'SUMMER',
    displayName: 'True Summer',
    poeticDescription: 'Cool, muted, and graceful — like a cloudy seaside in soft light',
    accentColor: '#7B9EBF',
    temperature: 'cool',
    value: 'medium',
    chroma: 'true',
  },
  [Season.SoftSummer]: {
    season: Season.SoftSummer,
    family: 'SUMMER',
    displayName: 'Soft Summer',
    poeticDescription: 'Gentle, blended, and smoky — like twilight over a still lake',
    accentColor: '#8E9AAF',
    temperature: 'cool',
    value: 'medium',
    chroma: 'soft',
  },
  [Season.SoftAutumn]: {
    season: Season.SoftAutumn,
    family: 'AUTUMN',
    displayName: 'Soft Autumn',
    poeticDescription: 'Warm, muted, and golden — like sunlight through autumn leaves',
    accentColor: '#C4A882',
    temperature: 'warm',
    value: 'medium',
    chroma: 'soft',
  },
  [Season.TrueAutumn]: {
    season: Season.TrueAutumn,
    family: 'AUTUMN',
    displayName: 'True Autumn',
    poeticDescription: 'Rich, warm, and earthy — like a harvest table at golden hour',
    accentColor: '#B5651D',
    temperature: 'warm',
    value: 'medium',
    chroma: 'true',
  },
  [Season.DeepAutumn]: {
    season: Season.DeepAutumn,
    family: 'AUTUMN',
    displayName: 'Deep Autumn',
    poeticDescription: 'Intense, warm, and grounded — like aged mahogany and deep amber',
    accentColor: '#8B4513',
    temperature: 'warm',
    value: 'deep',
    chroma: 'true',
  },
  [Season.DeepWinter]: {
    season: Season.DeepWinter,
    family: 'WINTER',
    displayName: 'Deep Winter',
    poeticDescription: 'Bold, cool, and dramatic — like a midnight sky over fresh snow',
    accentColor: '#2C1654',
    temperature: 'cool',
    value: 'deep',
    chroma: 'true',
  },
  [Season.TrueWinter]: {
    season: Season.TrueWinter,
    family: 'WINTER',
    displayName: 'True Winter',
    poeticDescription: 'Crisp, cool, and striking — like ice crystals catching winter light',
    accentColor: '#1E3A5F',
    temperature: 'cool',
    value: 'medium',
    chroma: 'true',
  },
  [Season.BrightWinter]: {
    season: Season.BrightWinter,
    family: 'WINTER',
    displayName: 'Bright Winter',
    poeticDescription: 'Vivid, icy, and electric — like jewels on a bed of fresh snow',
    accentColor: '#E91E63',
    temperature: 'cool',
    value: 'medium',
    chroma: 'bright',
  },
};
