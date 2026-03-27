import type { AnalysisResultResponse } from './client';
import type { SeasonResult, SeasonType, ColorSwatch, NailData, AccessoryData, DrapeComparison } from '../data/seasons';

const SEASON_ID_TO_DISPLAY: Record<string, SeasonType> = {
  LIGHT_SPRING: 'Light Spring',
  TRUE_SPRING: 'True Spring',
  BRIGHT_SPRING: 'Bright Spring',
  LIGHT_SUMMER: 'Light Summer',
  TRUE_SUMMER: 'True Summer',
  SOFT_SUMMER: 'Soft Summer',
  SOFT_AUTUMN: 'Soft Autumn',
  TRUE_AUTUMN: 'True Autumn',
  DEEP_AUTUMN: 'Deep Autumn',
  DEEP_WINTER: 'Deep Winter',
  TRUE_WINTER: 'True Winter',
  BRIGHT_WINTER: 'Bright Winter',
};

const SEASON_PINTEREST: Record<string, { makeup: string; outfits: string }> = {
  LIGHT_SPRING: { makeup: 'https://www.pinterest.com/hazelandhue/light-spring-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/light-spring-outfits/' },
  TRUE_SPRING: { makeup: 'https://www.pinterest.com/hazelandhue/true-spring-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/true-spring-outfits/' },
  BRIGHT_SPRING: { makeup: 'https://www.pinterest.com/hazelandhue/bright-spring-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/bright-spring-outfits/' },
  LIGHT_SUMMER: { makeup: 'https://www.pinterest.com/hazelandhue/light-summer-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/light-summer-outfits/' },
  TRUE_SUMMER: { makeup: 'https://www.pinterest.com/hazelandhue/true-summer-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/true-summer-outfits/' },
  SOFT_SUMMER: { makeup: 'https://www.pinterest.com/hazelandhue/soft-summer-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/soft-summer-outfits/' },
  SOFT_AUTUMN: { makeup: 'https://www.pinterest.com/hazelandhue/soft-autumn-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/soft-autumn-outfits/' },
  TRUE_AUTUMN: { makeup: 'https://www.pinterest.com/hazelandhue/true-autumn-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/true-autumn-outfits/' },
  DEEP_AUTUMN: { makeup: 'https://www.pinterest.com/hazelandhue/deep-autumn-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/deep-autumn-outfits/' },
  DEEP_WINTER: { makeup: 'https://www.pinterest.com/hazelandhue/deep-winter-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/deep-winter-outfits/' },
  TRUE_WINTER: { makeup: 'https://www.pinterest.com/hazelandhue/true-winter-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/true-winter-outfits/' },
  BRIGHT_WINTER: { makeup: 'https://www.pinterest.com/hazelandhue/bright-winter-makeup/', outfits: 'https://www.pinterest.com/hazelandhue/bright-winter-outfits/' },
};

function asSwatches(arr: unknown): ColorSwatch[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((s): s is ColorSwatch => s && typeof s.hex === 'string' && typeof s.name === 'string');
}

export function mapApiResultToSeasonResult(data: AnalysisResultResponse): SeasonResult {
  const r = data.results;
  const palette = r.palette as Record<string, unknown> | undefined;
  const colorstory = r.colorstory as Record<string, unknown> | undefined;
  const styleguide = r.styleguide as Record<string, unknown> | undefined;
  const makeup = r.makeup as Record<string, unknown> | undefined;
  const hair = r.hair as Record<string, unknown> | undefined;
  const jewelry = r.jewelry as Record<string, unknown> | undefined;
  const siblings = r.siblings as Record<string, unknown> | undefined;
  const avoid = r.avoid as Record<string, unknown> | undefined;
  const nails = r.nails as Record<string, unknown> | undefined;
  const accessories = r.accessories as Record<string, unknown> | undefined;

  const seasonDisplay = SEASON_ID_TO_DISPLAY[data.season] ?? (data.season as SeasonType);

  // Build palette array from sections
  const paletteColors: ColorSwatch[] = [
    ...(palette?.signatureColor ? [palette.signatureColor as ColorSwatch] : []),
    ...asSwatches(palette?.neutrals),
    ...asSwatches(palette?.statements),
    ...asSwatches(palette?.accents),
  ];

  // Map makeup to tips format
  const makeupTips: { category: string; recommendation: string }[] = [];
  if (makeup) {
    if (makeup.foundationTone) makeupTips.push({ category: 'Foundation', recommendation: String(makeup.foundationTone) });
    const lips = asSwatches(makeup.lipColors);
    if (lips.length) makeupTips.push({ category: 'Lip Color', recommendation: lips.map(l => l.name).join(', ') });
    const eyes = asSwatches(makeup.eyeShadows);
    if (eyes.length) makeupTips.push({ category: 'Eyeshadow', recommendation: eyes.map(e => e.name).join(', ') });
    const blush = asSwatches(makeup.blushColors);
    if (blush.length) makeupTips.push({ category: 'Blush', recommendation: blush.map(b => b.name).join(', ') });
    if (makeup.yourRed) makeupTips.push({ category: 'Your Perfect Red', recommendation: (makeup.yourRed as ColorSwatch).name });
  }

  // Map style tips from styleguide outfits
  const styleTips: string[] = [];
  if (styleguide) {
    if (Array.isArray(styleguide.bestPatterns)) styleTips.push(`Best patterns: ${(styleguide.bestPatterns as string[]).join(', ')}`);
    if (Array.isArray(styleguide.bestFabrics)) styleTips.push(`Best fabrics: ${(styleguide.bestFabrics as string[]).join(', ')}`);
    if (Array.isArray(styleguide.patternsToAvoid)) styleTips.push(`Patterns to avoid: ${(styleguide.patternsToAvoid as string[]).join(', ')}`);
  }

  // Build nails data
  const defaultNails: NailData = {
    everyday: [], statement: [], frenchTip: { hex: '#F5F5DC', name: 'Natural' }, avoidShades: [],
  };
  const nailData: NailData = nails ? {
    everyday: asSwatches(nails.everyday),
    statement: asSwatches(nails.statement),
    frenchTip: (nails.frenchTip as ColorSwatch) ?? defaultNails.frenchTip,
    avoidShades: asSwatches(nails.avoidShades),
  } : defaultNails;

  // Build accessories data
  const defaultAccessories: AccessoryData = {
    sunglassesFrames: [], bagColors: [], scarfColors: [], shoeColors: [], beltColors: [],
  };
  const accessoryData: AccessoryData = accessories ? {
    sunglassesFrames: Array.isArray(accessories.sunglassesFrames) ? accessories.sunglassesFrames as string[] : [],
    bagColors: asSwatches(accessories.bagColors),
    scarfColors: asSwatches(accessories.scarfColors),
    shoeColors: asSwatches(accessories.shoeColors),
    beltColors: Array.isArray(accessories.beltColors) ? accessories.beltColors as string[] : [],
  } : defaultAccessories;

  // Build avoid colors
  const avoidColors: ColorSwatch[] = Array.isArray((avoid as any)?.colorsToAvoid)
    ? (avoid as any).colorsToAvoid.map((c: any) => ({ hex: c.hex, name: c.name }))
    : [];

  // Celebrities
  const celebrityNames: string[] = Array.isArray((siblings as any)?.celebrities)
    ? (siblings as any).celebrities.map((c: any) => c.name ?? c)
    : [];

  const pinterest = SEASON_PINTEREST[data.season] ?? { makeup: '', outfits: '' };

  // Drape comparisons not generated by the API
  const drapeComparisons: DrapeComparison[] = [];

  return {
    season: seasonDisplay,
    tagline: String(colorstory?.poeticOneLiner ?? ''),
    description: String(colorstory?.narrative ?? ''),
    palette: paletteColors,
    bestColors: asSwatches(palette?.statements).slice(0, 4),
    avoidColors,
    metallic: Array.isArray((jewelry as any)?.bestMetals) ? (jewelry as any).bestMetals[0] ?? '' : '',
    styleTips,
    makeupTips,
    hairColors: asSwatches((hair as any)?.bestColors),
    celebrities: celebrityNames,
    styleGuide: {
      outfits: Array.isArray((styleguide as any)?.outfits) ? (styleguide as any).outfits : [],
      bestPatterns: Array.isArray((styleguide as any)?.bestPatterns) ? (styleguide as any).bestPatterns : [],
      bestFabrics: Array.isArray((styleguide as any)?.bestFabrics) ? (styleguide as any).bestFabrics : [],
      patternsToAvoid: Array.isArray((styleguide as any)?.patternsToAvoid) ? (styleguide as any).patternsToAvoid : [],
    },
    jewelry: {
      bestMetals: Array.isArray((jewelry as any)?.bestMetals) ? (jewelry as any).bestMetals : [],
      metalsToMinimize: Array.isArray((jewelry as any)?.metalsToMinimize) ? (jewelry as any).metalsToMinimize : [],
      gemstoneRecommendations: Array.isArray((jewelry as any)?.gemstoneRecommendations) ? (jewelry as any).gemstoneRecommendations : [],
    },
    hair: {
      bestColors: asSwatches((hair as any)?.bestColors),
      colorsToAvoid: asSwatches((hair as any)?.colorsToAvoid),
      highlightRecommendation: String((hair as any)?.highlightRecommendation ?? ''),
      lowlightRecommendation: String((hair as any)?.lowlightRecommendation ?? ''),
      salonTerminology: Array.isArray((hair as any)?.salonTerminology) ? (hair as any).salonTerminology : [],
    },
    nails: nailData,
    accessories: accessoryData,
    pinterest,
    drapeComparisons,
  };
}
