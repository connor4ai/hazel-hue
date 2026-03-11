export type SeasonType =
  | 'Light Spring' | 'True Spring' | 'Bright Spring'
  | 'Light Summer' | 'True Summer' | 'Soft Summer'
  | 'Soft Autumn' | 'True Autumn' | 'Deep Autumn'
  | 'Deep Winter' | 'True Winter' | 'Bright Winter';

export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface StyleGuideData {
  outfits: {
    name: string;
    description: string;
    pieces: { item: string; color: ColorSwatch }[];
  }[];
  bestPatterns: string[];
  bestFabrics: string[];
  patternsToAvoid: string[];
}

export interface JewelryData {
  bestMetals: string[];
  metalsToMinimize: string[];
  gemstoneRecommendations: string[];
}

export interface HairData {
  bestColors: ColorSwatch[];
  colorsToAvoid: ColorSwatch[];
  highlightRecommendation: string;
  lowlightRecommendation: string;
  salonTerminology: string[];
}

export interface NailData {
  everyday: ColorSwatch[];
  statement: ColorSwatch[];
  frenchTip: ColorSwatch;
  avoidShades: ColorSwatch[];
}

export interface AccessoryData {
  sunglassesFrames: string[];
  bagColors: ColorSwatch[];
  scarfColors: ColorSwatch[];
  shoeColors: ColorSwatch[];
  beltColors: string[];
}

// ─── Shopping Types ─────────────────────────────────────────────────

export interface ShoppableProduct {
  id: string;
  name: string;
  priceInCents: number;
  currency: string;
  imageUrl: string;
  merchantName: string;
  affiliateUrl: string;
  merchantUrl: string;
  matchScore: number;
  matchedPaletteHex: string;
  dominantColors: string[];
  category: ProductCategory;
}

export type ProductCategory =
  | 'clothing'
  | 'makeup'
  | 'nails'
  | 'jewelry'
  | 'accessories'
  | 'hair';

export type ClickSource =
  | 'lookbook'
  | 'makeup_guide'
  | 'hair_guide'
  | 'nail_guide'
  | 'jewelry_guide'
  | 'accessory_guide'
  | 'shop_tab';

export interface DrapeComparison {
  goodHex: string;
  goodName: string;
  badHex: string;
  badName: string;
  explanation: string;
}

export interface SeasonResult {
  season: SeasonType;
  tagline: string;
  description: string;
  palette: ColorSwatch[];
  bestColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  metallic: string;
  styleTips: string[];
  makeupTips: { category: string; recommendation: string }[];
  hairColors: ColorSwatch[];
  celebrities: string[];
  styleGuide: StyleGuideData;
  jewelry: JewelryData;
  hair: HairData;
  nails: NailData;
  accessories: AccessoryData;
  pinterest: { makeup: string; outfits: string };
  drapeComparisons: DrapeComparison[];
}

export const SEASON_DATA: Record<SeasonType, SeasonResult> = {
  'Light Spring': {
    season: 'Light Spring',
    tagline: 'Fresh, warm, and delicate radiance',
    description: 'Your coloring has a warm, light quality — like early morning sun through blossoms. You glow in warm pastels and light, clear tones that mirror your natural brightness.',
    palette: [
      { hex: '#F5C16C', name: 'Buttercup' }, { hex: '#FFB88C', name: 'Peach' },
      { hex: '#E8A0BF', name: 'Pink Tulip' }, { hex: '#98D8C8', name: 'Seafoam' },
      { hex: '#F7E7CE', name: 'Champagne' }, { hex: '#C5E17A', name: 'Spring Green' },
      { hex: '#FADADD', name: 'Baby Pink' }, { hex: '#FFD700', name: 'Golden' },
      { hex: '#87CEEB', name: 'Sky Blue' }, { hex: '#DDA0DD', name: 'Light Plum' },
      { hex: '#F0E68C', name: 'Khaki' }, { hex: '#FFA07A', name: 'Light Salmon' },
    ],
    bestColors: [
      { hex: '#F5C16C', name: 'Buttercup' }, { hex: '#FFB88C', name: 'Warm Peach' },
      { hex: '#98D8C8', name: 'Seafoam' }, { hex: '#C5E17A', name: 'Spring Green' },
    ],
    avoidColors: [
      { hex: '#2F4F4F', name: 'Dark Slate' }, { hex: '#800020', name: 'Burgundy' },
      { hex: '#000000', name: 'Black' },
    ],
    metallic: 'Light Gold',
    styleTips: [
      'Opt for light, warm fabrics like linen and cotton in your palette colors.',
      'Layer soft pastels for a fresh, springtime look year-round.',
      'Choose warm ivory over stark white for your base pieces.',
      'Floral prints in your palette colors are naturally flattering.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Warm with yellow/golden undertones, light coverage' },
      { category: 'Blush', recommendation: 'Warm peach or light coral' },
      { category: 'Lip Color', recommendation: 'Peach, warm pink, or light coral' },
      { category: 'Eyeshadow', recommendation: 'Champagne, soft gold, warm taupe' },
    ],
    hairColors: [
      { hex: '#DAA520', name: 'Warm Golden Blonde' }, { hex: '#CD853F', name: 'Light Caramel' },
      { hex: '#F4A460', name: 'Strawberry Blonde' }, { hex: '#D2B48C', name: 'Honey' },
    ],
    celebrities: ['Scarlett Johansson', 'Taylor Swift', 'Blake Lively'],
    styleGuide: {
      outfits: [
        {
          name: 'Garden Party',
          description: 'Light and airy for warm-weather events',
          pieces: [
            { item: 'Floral midi dress', color: { hex: '#FADADD', name: 'Baby Pink' } },
            { item: 'Woven straw clutch', color: { hex: '#F7E7CE', name: 'Champagne' } },
            { item: 'Strappy sandals', color: { hex: '#F5C16C', name: 'Buttercup' } },
          ],
        },
        {
          name: 'Weekend Brunch',
          description: 'Effortlessly polished casual',
          pieces: [
            { item: 'Linen blouse', color: { hex: '#F7E7CE', name: 'Champagne' } },
            { item: 'Cropped trousers', color: { hex: '#98D8C8', name: 'Seafoam' } },
            { item: 'Ballet flats', color: { hex: '#FFB88C', name: 'Peach' } },
          ],
        },
      ],
      bestPatterns: ['Soft florals', 'Watercolor prints', 'Delicate stripes', 'Gingham'],
      bestFabrics: ['Linen', 'Cotton voile', 'Silk chiffon', 'Light knit'],
      patternsToAvoid: ['Heavy geometric', 'Dark plaids', 'Bold abstract'],
    },
    jewelry: {
      bestMetals: ['Light Gold', 'Champagne Gold', 'Rose Gold'],
      metalsToMinimize: ['Dark Silver', 'Gunmetal', 'Pewter'],
      gemstoneRecommendations: ['Peridot', 'Citrine', 'Rose Quartz', 'Aquamarine'],
    },
    hair: {
      bestColors: [
        { hex: '#DAA520', name: 'Warm Golden Blonde' }, { hex: '#CD853F', name: 'Light Caramel' },
        { hex: '#F4A460', name: 'Strawberry Blonde' }, { hex: '#D2B48C', name: 'Honey' },
      ],
      colorsToAvoid: [
        { hex: '#1C1C1C', name: 'Jet Black' }, { hex: '#808080', name: 'Ash Gray' },
      ],
      highlightRecommendation: 'Soft, sun-kissed golden babylights around the face',
      lowlightRecommendation: 'Warm honey or light caramel, no more than 2 shades deeper',
      salonTerminology: ['Babylights', 'Warm golden toner', 'Balayage', 'Hand-painted highlights'],
    },
    nails: {
      everyday: [
        { hex: '#FFB88C', name: 'Peach' }, { hex: '#FADADD', name: 'Baby Pink' },
        { hex: '#F7E7CE', name: 'Champagne' },
      ],
      statement: [
        { hex: '#F5C16C', name: 'Buttercup' }, { hex: '#E8A0BF', name: 'Pink Tulip' },
      ],
      frenchTip: { hex: '#F7E7CE', name: 'Warm Ivory' },
      avoidShades: [
        { hex: '#2F4F4F', name: 'Dark Slate' }, { hex: '#800020', name: 'Burgundy' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Light Tortoiseshell', 'Warm Gold Wire', 'Transparent Peach'],
      bagColors: [
        { hex: '#D2B48C', name: 'Honey Tan' }, { hex: '#F7E7CE', name: 'Cream' },
        { hex: '#FFB88C', name: 'Peach' },
      ],
      scarfColors: [
        { hex: '#98D8C8', name: 'Seafoam' }, { hex: '#FADADD', name: 'Baby Pink' },
        { hex: '#C5E17A', name: 'Spring Green' },
      ],
      shoeColors: [
        { hex: '#D2B48C', name: 'Nude' }, { hex: '#F5C16C', name: 'Gold' },
        { hex: '#F7E7CE', name: 'Cream' },
      ],
      beltColors: ['Light Tan', 'Warm Nude', 'Gold'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/light-spring-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/light-spring-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#FFB88C', goodName: 'Warm Peach', badHex: '#C0C0C0', badName: 'Cool Silver', explanation: 'Warm peach enhances your natural glow, while cool silver can make you look washed out.' },
      { goodHex: '#98D8C8', goodName: 'Seafoam', badHex: '#000000', badName: 'Black', explanation: 'Soft seafoam harmonizes with your light, warm coloring; black creates too harsh a contrast.' },
    ],
  },
  'True Spring': {
    season: 'True Spring',
    tagline: 'Golden warmth and vibrant energy',
    description: 'Your natural coloring is warm, clear, and vibrant. You shine in colors that are warm, saturated, and full of life — think golden hour light.',
    palette: [
      { hex: '#FF6347', name: 'Tomato Red' }, { hex: '#FF8C00', name: 'Tangerine' },
      { hex: '#FFD700', name: 'Gold' }, { hex: '#32CD32', name: 'Lime' },
      { hex: '#FF7F50', name: 'Coral' }, { hex: '#DAA520', name: 'Goldenrod' },
      { hex: '#00CED1', name: 'Turquoise' }, { hex: '#FFDAB9', name: 'Peach Puff' },
      { hex: '#9ACD32', name: 'Yellow Green' }, { hex: '#F08080', name: 'Light Coral' },
      { hex: '#20B2AA', name: 'Light Sea Green' }, { hex: '#FFA500', name: 'Orange' },
    ],
    bestColors: [
      { hex: '#FF7F50', name: 'Coral' }, { hex: '#DAA520', name: 'Goldenrod' },
      { hex: '#00CED1', name: 'Turquoise' }, { hex: '#FF8C00', name: 'Tangerine' },
    ],
    avoidColors: [
      { hex: '#C0C0C0', name: 'Cool Silver' }, { hex: '#800080', name: 'Cool Purple' },
      { hex: '#000080', name: 'Navy' },
    ],
    metallic: 'Bright Gold',
    styleTips: [
      'Embrace warm, saturated hues — think sunset colors.',
      'Mix warm neutrals like camel and cream with pops of coral or turquoise.',
      'Choose golden jewelry over silver for a cohesive look.',
      'Prints with warm, bold colors complement your natural vibrancy.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Warm with golden/peachy undertones' },
      { category: 'Blush', recommendation: 'Warm coral or apricot' },
      { category: 'Lip Color', recommendation: 'Orange-red, coral, warm nude' },
      { category: 'Eyeshadow', recommendation: 'Warm copper, bronze, golden olive' },
    ],
    hairColors: [
      { hex: '#B8860B', name: 'Golden Brown' }, { hex: '#D2691E', name: 'Copper' },
      { hex: '#DAA520', name: 'Rich Golden Blonde' }, { hex: '#8B4513', name: 'Auburn' },
    ],
    celebrities: ['Jennifer Lopez', 'Amy Adams', 'Lindsay Lohan'],
    styleGuide: {
      outfits: [
        {
          name: 'Golden Hour',
          description: 'Warm and vibrant for a statement entrance',
          pieces: [
            { item: 'Wrap dress', color: { hex: '#FF7F50', name: 'Coral' } },
            { item: 'Leather sandals', color: { hex: '#DAA520', name: 'Goldenrod' } },
            { item: 'Statement earrings', color: { hex: '#00CED1', name: 'Turquoise' } },
          ],
        },
        {
          name: 'Casual Warm',
          description: 'Relaxed warmth for everyday',
          pieces: [
            { item: 'Cotton tee', color: { hex: '#FFDAB9', name: 'Peach Puff' } },
            { item: 'Wide-leg trousers', color: { hex: '#DAA520', name: 'Goldenrod' } },
            { item: 'Canvas sneakers', color: { hex: '#FF8C00', name: 'Tangerine' } },
          ],
        },
      ],
      bestPatterns: ['Tropical prints', 'Warm stripes', 'Ikat', 'Paisley'],
      bestFabrics: ['Cotton', 'Linen', 'Silk', 'Lightweight denim'],
      patternsToAvoid: ['Cool-toned florals', 'Gray plaids', 'Muted abstracts'],
    },
    jewelry: {
      bestMetals: ['Bright Gold', 'Yellow Gold', 'Copper'],
      metalsToMinimize: ['Silver', 'Platinum', 'White Gold'],
      gemstoneRecommendations: ['Turquoise', 'Coral', 'Amber', 'Carnelian'],
    },
    hair: {
      bestColors: [
        { hex: '#B8860B', name: 'Golden Brown' }, { hex: '#D2691E', name: 'Copper' },
        { hex: '#DAA520', name: 'Rich Golden Blonde' }, { hex: '#8B4513', name: 'Auburn' },
      ],
      colorsToAvoid: [
        { hex: '#808080', name: 'Ash Tones' }, { hex: '#C0C0C0', name: 'Platinum' },
      ],
      highlightRecommendation: 'Bold golden highlights for maximum warmth and dimension',
      lowlightRecommendation: 'Rich copper or warm auburn lowlights for depth',
      salonTerminology: ['Golden balayage', 'Copper foils', 'Warm toner', 'Face-framing highlights'],
    },
    nails: {
      everyday: [
        { hex: '#FF7F50', name: 'Coral' }, { hex: '#FFDAB9', name: 'Peach Puff' },
        { hex: '#F08080', name: 'Light Coral' },
      ],
      statement: [
        { hex: '#FF6347', name: 'Tomato Red' }, { hex: '#FF8C00', name: 'Tangerine' },
      ],
      frenchTip: { hex: '#FFDAB9', name: 'Warm Peach' },
      avoidShades: [
        { hex: '#C0C0C0', name: 'Cool Silver' }, { hex: '#800080', name: 'Cool Purple' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Warm Tortoiseshell', 'Gold Wire', 'Amber'],
      bagColors: [
        { hex: '#DAA520', name: 'Goldenrod' }, { hex: '#8B4513', name: 'Saddle Brown' },
        { hex: '#FF7F50', name: 'Coral' },
      ],
      scarfColors: [
        { hex: '#00CED1', name: 'Turquoise' }, { hex: '#FF8C00', name: 'Tangerine' },
        { hex: '#9ACD32', name: 'Yellow Green' },
      ],
      shoeColors: [
        { hex: '#8B4513', name: 'Cognac' }, { hex: '#DAA520', name: 'Gold' },
        { hex: '#D2691E', name: 'Copper' },
      ],
      beltColors: ['Cognac', 'Warm Brown', 'Gold'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/true-spring-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/true-spring-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#FF7F50', goodName: 'Coral', badHex: '#C0C0C0', badName: 'Cool Silver', explanation: 'Coral brings warmth to your face; cool silver drains your natural vibrancy.' },
      { goodHex: '#DAA520', goodName: 'Goldenrod', badHex: '#000080', badName: 'Navy', explanation: 'Golden tones echo your warm undertone; cool navy fights against it.' },
    ],
  },
  'Bright Spring': {
    season: 'Bright Spring',
    tagline: 'Bright, warm, and strikingly vivid',
    description: 'You have high contrast with warm undertones. Bold, clear, and saturated colors bring out the striking clarity in your features.',
    palette: [
      { hex: '#FF4500', name: 'Red Orange' }, { hex: '#00BFFF', name: 'Deep Sky Blue' },
      { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#32CD32', name: 'Lime Green' },
      { hex: '#FF6347', name: 'Tomato' }, { hex: '#FFD700', name: 'Bright Gold' },
      { hex: '#00CED1', name: 'Turquoise' }, { hex: '#FF69B4', name: 'Bubblegum' },
      { hex: '#7B68EE', name: 'Medium Slate Blue' }, { hex: '#FFA07A', name: 'Light Salmon' },
      { hex: '#00FA9A', name: 'Spring Green' }, { hex: '#FF8C00', name: 'Dark Orange' },
    ],
    bestColors: [
      { hex: '#FF4500', name: 'Red Orange' }, { hex: '#00BFFF', name: 'Sky Blue' },
      { hex: '#32CD32', name: 'Lime Green' }, { hex: '#FFD700', name: 'Bright Gold' },
    ],
    avoidColors: [
      { hex: '#808080', name: 'Muted Gray' }, { hex: '#8B8682', name: 'Dusty Tones' },
      { hex: '#C4A882', name: 'Muted Beige' },
    ],
    metallic: 'Bright Gold',
    styleTips: [
      'Go bold with vivid, clear colors — they match your high-contrast features.',
      'Pair bright accent pieces with warm neutrals for balance.',
      'Avoid muted or dusty tones that will dull your natural vibrancy.',
      'Color-blocking with two bright colors is your secret weapon.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Warm, clear undertone' },
      { category: 'Blush', recommendation: 'Bright peach or vivid coral' },
      { category: 'Lip Color', recommendation: 'Bright red, vivid coral, hot pink' },
      { category: 'Eyeshadow', recommendation: 'Bright gold, turquoise, vivid plum' },
    ],
    hairColors: [
      { hex: '#8B4513', name: 'Rich Auburn' }, { hex: '#D2691E', name: 'Bright Copper' },
      { hex: '#CD853F', name: 'Warm Caramel' }, { hex: '#B22222', name: 'Fiery Red' },
    ],
    celebrities: ['Megan Fox', 'Emma Stone', 'Jessica Alba'],
    styleGuide: {
      outfits: [
        {
          name: 'Show Stopper',
          description: 'Bold and vivid for maximum impact',
          pieces: [
            { item: 'Tailored blazer', color: { hex: '#FF4500', name: 'Red Orange' } },
            { item: 'Slim trousers', color: { hex: '#000000', name: 'Black' } },
            { item: 'Pointed heels', color: { hex: '#FFD700', name: 'Bright Gold' } },
          ],
        },
        {
          name: 'Electric Casual',
          description: 'Bright and clear for standout weekends',
          pieces: [
            { item: 'Graphic tee', color: { hex: '#00BFFF', name: 'Deep Sky Blue' } },
            { item: 'High-waist jeans', color: { hex: '#191970', name: 'Dark Wash' } },
            { item: 'Colorful sneakers', color: { hex: '#32CD32', name: 'Lime Green' } },
          ],
        },
      ],
      bestPatterns: ['Color blocking', 'Bold stripes', 'Graphic prints', 'Vivid florals'],
      bestFabrics: ['Crisp cotton', 'Structured silk', 'Ponte knit', 'Patent leather'],
      patternsToAvoid: ['Muted watercolors', 'Dusty tones', 'Faded prints'],
    },
    jewelry: {
      bestMetals: ['Bright Gold', 'Polished Gold', 'Rose Gold'],
      metalsToMinimize: ['Brushed Silver', 'Pewter', 'Antique metals'],
      gemstoneRecommendations: ['Ruby', 'Emerald', 'Topaz', 'Turquoise'],
    },
    hair: {
      bestColors: [
        { hex: '#8B4513', name: 'Rich Auburn' }, { hex: '#D2691E', name: 'Bright Copper' },
        { hex: '#CD853F', name: 'Warm Caramel' }, { hex: '#B22222', name: 'Fiery Red' },
      ],
      colorsToAvoid: [
        { hex: '#808080', name: 'Ashy Tones' }, { hex: '#A9A9A9', name: 'Muted Gray' },
      ],
      highlightRecommendation: 'Bold, bright copper or warm caramel face-framing highlights',
      lowlightRecommendation: 'Rich auburn lowlights for contrast and depth',
      salonTerminology: ['Vivid copper', 'High-contrast highlights', 'Warm balayage', 'Gloss treatment'],
    },
    nails: {
      everyday: [
        { hex: '#FFA07A', name: 'Light Salmon' }, { hex: '#FF69B4', name: 'Bubblegum' },
        { hex: '#FFD700', name: 'Bright Gold' },
      ],
      statement: [
        { hex: '#FF4500', name: 'Red Orange' }, { hex: '#FF1493', name: 'Hot Pink' },
      ],
      frenchTip: { hex: '#FFFFFF', name: 'Bright White' },
      avoidShades: [
        { hex: '#808080', name: 'Muted Gray' }, { hex: '#C4A882', name: 'Dusty Beige' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Bold Black', 'Bright Tortoiseshell', 'Clear Crystal'],
      bagColors: [
        { hex: '#FF4500', name: 'Red Orange' }, { hex: '#000000', name: 'Black' },
        { hex: '#FFD700', name: 'Gold' },
      ],
      scarfColors: [
        { hex: '#00BFFF', name: 'Sky Blue' }, { hex: '#FF1493', name: 'Hot Pink' },
        { hex: '#32CD32', name: 'Lime' },
      ],
      shoeColors: [
        { hex: '#000000', name: 'Black' }, { hex: '#FF4500', name: 'Red' },
        { hex: '#FFD700', name: 'Gold' },
      ],
      beltColors: ['Black', 'Bright Red', 'Gold'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/bright-spring-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/bright-spring-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#FF4500', goodName: 'Red Orange', badHex: '#808080', badName: 'Muted Gray', explanation: 'Bold red-orange matches your high contrast; muted gray dulls your striking features.' },
      { goodHex: '#00BFFF', goodName: 'Sky Blue', badHex: '#C4A882', badName: 'Dusty Beige', explanation: 'Clear sky blue makes your features pop; dusty tones wash out your clarity.' },
    ],
  },
  'Light Summer': {
    season: 'Light Summer',
    tagline: 'Soft, cool, and ethereally delicate',
    description: 'Your coloring is cool, light, and gently muted — like a pastel watercolor. Soft, cool pastels and powdery shades bring out your delicate luminosity.',
    palette: [
      { hex: '#B0C4DE', name: 'Steel Blue' }, { hex: '#DDA0DD', name: 'Plum' },
      { hex: '#E6E6FA', name: 'Lavender' }, { hex: '#FFC0CB', name: 'Pink' },
      { hex: '#ADD8E6', name: 'Light Blue' }, { hex: '#D8BFD8', name: 'Thistle' },
      { hex: '#F0E68C', name: 'Soft Yellow' }, { hex: '#98FB98', name: 'Pale Green' },
      { hex: '#FFB6C1', name: 'Light Pink' }, { hex: '#87CEEB', name: 'Sky Blue' },
      { hex: '#C8A2C8', name: 'Lilac' }, { hex: '#FFDEAD', name: 'Navajo White' },
    ],
    bestColors: [
      { hex: '#E6E6FA', name: 'Lavender' }, { hex: '#B0C4DE', name: 'Steel Blue' },
      { hex: '#FFB6C1', name: 'Light Pink' }, { hex: '#98FB98', name: 'Pale Green' },
    ],
    avoidColors: [
      { hex: '#FF4500', name: 'Bright Orange' }, { hex: '#000000', name: 'Black' },
      { hex: '#8B0000', name: 'Dark Red' },
    ],
    metallic: 'Silver or White Gold',
    styleTips: [
      'Stick to soft, cool pastels for a luminous, polished look.',
      'Layer cool-toned neutrals like dove gray, soft navy, and cool taupe.',
      'Avoid harsh contrasts — your beauty is in soft tonal combinations.',
      'Light denim and chambray are perfect everyday pieces for you.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Cool with pink/neutral undertones, light coverage' },
      { category: 'Blush', recommendation: 'Cool pink or soft mauve' },
      { category: 'Lip Color', recommendation: 'Cool pink, soft berry, rose' },
      { category: 'Eyeshadow', recommendation: 'Lavender, soft silver, cool taupe' },
    ],
    hairColors: [
      { hex: '#C0C0C0', name: 'Ash Blonde' }, { hex: '#D2B48C', name: 'Light Ash Brown' },
      { hex: '#F5F5DC', name: 'Platinum Blonde' }, { hex: '#BC8F8F', name: 'Rosy Brown' },
    ],
    celebrities: ['Cate Blanchett', 'Naomi Watts', 'Elle Fanning'],
    styleGuide: {
      outfits: [
        {
          name: 'Ethereal Evening',
          description: 'Soft and luminous for special occasions',
          pieces: [
            { item: 'Chiffon maxi dress', color: { hex: '#E6E6FA', name: 'Lavender' } },
            { item: 'Delicate wrap', color: { hex: '#FFB6C1', name: 'Light Pink' } },
            { item: 'Kitten heels', color: { hex: '#C0C0C0', name: 'Silver' } },
          ],
        },
        {
          name: 'Soft Workday',
          description: 'Polished yet gentle for the office',
          pieces: [
            { item: 'Silk blouse', color: { hex: '#B0C4DE', name: 'Steel Blue' } },
            { item: 'Pencil skirt', color: { hex: '#D8BFD8', name: 'Thistle' } },
            { item: 'Pointed flats', color: { hex: '#FFDEAD', name: 'Navajo White' } },
          ],
        },
      ],
      bestPatterns: ['Watercolor florals', 'Tone-on-tone', 'Soft stripes', 'Ditsy prints'],
      bestFabrics: ['Silk chiffon', 'Cashmere', 'Modal', 'Soft cotton'],
      patternsToAvoid: ['Bold geometric', 'High-contrast prints', 'Neon accents'],
    },
    jewelry: {
      bestMetals: ['Silver', 'White Gold', 'Platinum'],
      metalsToMinimize: ['Yellow Gold', 'Copper', 'Bronze'],
      gemstoneRecommendations: ['Moonstone', 'Amethyst', 'Aquamarine', 'Rose Quartz'],
    },
    hair: {
      bestColors: [
        { hex: '#C0C0C0', name: 'Ash Blonde' }, { hex: '#D2B48C', name: 'Light Ash Brown' },
        { hex: '#F5F5DC', name: 'Platinum Blonde' }, { hex: '#BC8F8F', name: 'Rosy Brown' },
      ],
      colorsToAvoid: [
        { hex: '#DAA520', name: 'Golden Tones' }, { hex: '#8B4513', name: 'Warm Auburn' },
      ],
      highlightRecommendation: 'Cool ash babylights or icy champagne pieces',
      lowlightRecommendation: 'Cool mushroom or soft ash brown lowlights',
      salonTerminology: ['Ash toner', 'Cool blonde', 'Pearl highlights', 'Mushroom brown'],
    },
    nails: {
      everyday: [
        { hex: '#FFB6C1', name: 'Light Pink' }, { hex: '#E6E6FA', name: 'Lavender' },
        { hex: '#FFC0CB', name: 'Pink' },
      ],
      statement: [
        { hex: '#DDA0DD', name: 'Plum' }, { hex: '#B0C4DE', name: 'Steel Blue' },
      ],
      frenchTip: { hex: '#FFFAFA', name: 'Snow White' },
      avoidShades: [
        { hex: '#FF4500', name: 'Bright Orange' }, { hex: '#8B0000', name: 'Dark Red' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Light Metal', 'Clear Frames', 'Cool Tortoiseshell'],
      bagColors: [
        { hex: '#D8BFD8', name: 'Thistle' }, { hex: '#C0C0C0', name: 'Silver' },
        { hex: '#E6E6FA', name: 'Lavender' },
      ],
      scarfColors: [
        { hex: '#FFB6C1', name: 'Light Pink' }, { hex: '#87CEEB', name: 'Sky Blue' },
        { hex: '#98FB98', name: 'Pale Green' },
      ],
      shoeColors: [
        { hex: '#C0C0C0', name: 'Silver' }, { hex: '#DDA0DD', name: 'Soft Plum' },
        { hex: '#FFDEAD', name: 'Nude' },
      ],
      beltColors: ['Dove Gray', 'Soft Pink', 'Silver'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/light-summer-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/light-summer-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#E6E6FA', goodName: 'Lavender', badHex: '#FF4500', badName: 'Bright Orange', explanation: 'Soft lavender illuminates your delicate features; bright orange overwhelms your gentle coloring.' },
      { goodHex: '#B0C4DE', goodName: 'Steel Blue', badHex: '#000000', badName: 'Black', explanation: 'Cool steel blue enhances your luminosity; black creates too stark a contrast.' },
    ],
  },
  'True Summer': {
    season: 'True Summer',
    tagline: 'Elegant coolness with refined depth',
    description: 'Your coloring is cool, moderate in depth, and slightly muted. Sophisticated cool tones — slate, dusty rose, cool berry — complement your natural elegance.',
    palette: [
      { hex: '#708090', name: 'Slate Gray' }, { hex: '#BC8F8F', name: 'Rosy Brown' },
      { hex: '#4682B4', name: 'Steel Blue' }, { hex: '#DB7093', name: 'Pale Violet Red' },
      { hex: '#778899', name: 'Light Slate' }, { hex: '#8FBC8F', name: 'Sea Green' },
      { hex: '#CD5C5C', name: 'Indian Red' }, { hex: '#6495ED', name: 'Cornflower' },
      { hex: '#9370DB', name: 'Medium Purple' }, { hex: '#20B2AA', name: 'Teal' },
      { hex: '#DEB887', name: 'Cool Tan' }, { hex: '#C0C0C0', name: 'Silver' },
    ],
    bestColors: [
      { hex: '#708090', name: 'Slate' }, { hex: '#DB7093', name: 'Pale Violet Red' },
      { hex: '#6495ED', name: 'Cornflower' }, { hex: '#9370DB', name: 'Medium Purple' },
    ],
    avoidColors: [
      { hex: '#FF8C00', name: 'Orange' }, { hex: '#FFD700', name: 'Yellow Gold' },
      { hex: '#8B4513', name: 'Warm Brown' },
    ],
    metallic: 'Silver or Platinum',
    styleTips: [
      'Cool, muted tones are your best friend — think sophisticated and understated.',
      'Navy, soft charcoal, and cool gray make excellent neutrals for you.',
      'Pair cool berry tones with slate for a polished, editorial look.',
      'Monochromatic cool-toned outfits look exceptionally chic on you.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Cool with pink undertones' },
      { category: 'Blush', recommendation: 'Dusty rose or cool berry' },
      { category: 'Lip Color', recommendation: 'Berry, mauve, cool red' },
      { category: 'Eyeshadow', recommendation: 'Cool gray, slate blue, soft plum' },
    ],
    hairColors: [
      { hex: '#696969', name: 'Ash Brown' }, { hex: '#808080', name: 'Cool Brunette' },
      { hex: '#A9A9A9', name: 'Ash Blonde' }, { hex: '#4A3728', name: 'Cool Dark Brown' },
    ],
    celebrities: ['Jennifer Aniston', 'Emily Blunt', 'Leighton Meester'],
    styleGuide: {
      outfits: [
        {
          name: 'Refined Cool',
          description: 'Elegant and understated sophistication',
          pieces: [
            { item: 'Structured blazer', color: { hex: '#708090', name: 'Slate Gray' } },
            { item: 'Silk camisole', color: { hex: '#DB7093', name: 'Pale Violet Red' } },
            { item: 'Tailored trousers', color: { hex: '#778899', name: 'Light Slate' } },
          ],
        },
        {
          name: 'Berry Casual',
          description: 'Cool tones for a polished weekend',
          pieces: [
            { item: 'Cashmere sweater', color: { hex: '#6495ED', name: 'Cornflower' } },
            { item: 'Slim jeans', color: { hex: '#4682B4', name: 'Steel Blue' } },
            { item: 'Leather boots', color: { hex: '#708090', name: 'Slate' } },
          ],
        },
      ],
      bestPatterns: ['Pinstripes', 'Cool-toned plaid', 'Subtle herringbone', 'Monochrome prints'],
      bestFabrics: ['Wool crepe', 'Silk', 'Cashmere', 'Structured cotton'],
      patternsToAvoid: ['Warm florals', 'Orange-based prints', 'Yellow plaids'],
    },
    jewelry: {
      bestMetals: ['Silver', 'Platinum', 'White Gold'],
      metalsToMinimize: ['Yellow Gold', 'Copper', 'Brass'],
      gemstoneRecommendations: ['Sapphire', 'Amethyst', 'Garnet', 'Iolite'],
    },
    hair: {
      bestColors: [
        { hex: '#696969', name: 'Ash Brown' }, { hex: '#808080', name: 'Cool Brunette' },
        { hex: '#A9A9A9', name: 'Ash Blonde' }, { hex: '#4A3728', name: 'Cool Dark Brown' },
      ],
      colorsToAvoid: [
        { hex: '#D2691E', name: 'Copper' }, { hex: '#DAA520', name: 'Golden Tones' },
      ],
      highlightRecommendation: 'Cool ash or smoky mauve highlights for subtle dimension',
      lowlightRecommendation: 'Cool espresso or dark ash lowlights',
      salonTerminology: ['Ash brown', 'Cool toner', 'Smoky brunette', 'Mushroom balayage'],
    },
    nails: {
      everyday: [
        { hex: '#BC8F8F', name: 'Rosy Brown' }, { hex: '#DB7093', name: 'Pale Violet Red' },
        { hex: '#778899', name: 'Light Slate' },
      ],
      statement: [
        { hex: '#9370DB', name: 'Medium Purple' }, { hex: '#4682B4', name: 'Steel Blue' },
      ],
      frenchTip: { hex: '#F8F8FF', name: 'Ghost White' },
      avoidShades: [
        { hex: '#FF8C00', name: 'Orange' }, { hex: '#FFD700', name: 'Yellow Gold' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Cool Gray', 'Silver Wire', 'Navy'],
      bagColors: [
        { hex: '#708090', name: 'Slate' }, { hex: '#778899', name: 'Gray Blue' },
        { hex: '#4682B4', name: 'Steel Blue' },
      ],
      scarfColors: [
        { hex: '#DB7093', name: 'Pale Violet Red' }, { hex: '#6495ED', name: 'Cornflower' },
        { hex: '#9370DB', name: 'Lavender' },
      ],
      shoeColors: [
        { hex: '#708090', name: 'Slate' }, { hex: '#4682B4', name: 'Navy' },
        { hex: '#C0C0C0', name: 'Silver' },
      ],
      beltColors: ['Slate Gray', 'Cool Navy', 'Silver'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/true-summer-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/true-summer-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#708090', goodName: 'Slate', badHex: '#FF8C00', badName: 'Orange', explanation: 'Sophisticated slate enhances your cool elegance; warm orange clashes with your undertone.' },
      { goodHex: '#6495ED', goodName: 'Cornflower', badHex: '#8B4513', badName: 'Warm Brown', explanation: 'Cool cornflower blue flatters your complexion; warm brown looks discordant.' },
    ],
  },
  'Soft Summer': {
    season: 'Soft Summer',
    tagline: 'Muted, cool, and gracefully blended',
    description: 'Your coloring is cool, soft, and muted — like a misty morning. Dusty, grayed-out cool tones create a beautiful harmony with your low-contrast features.',
    palette: [
      { hex: '#A8B5A0', name: 'Sage' }, { hex: '#D4A5A5', name: 'Dusty Rose' },
      { hex: '#B0C4DE', name: 'Blue Gray' }, { hex: '#C8A2C8', name: 'Mauve' },
      { hex: '#8FBC8F', name: 'Muted Green' }, { hex: '#D3B8AE', name: 'Rose Taupe' },
      { hex: '#A9B4C2', name: 'Cool Gray Blue' }, { hex: '#C4A882', name: 'Soft Wheat' },
      { hex: '#B19CD9', name: 'Soft Lavender' }, { hex: '#BDB76B', name: 'Dark Khaki' },
      { hex: '#CD853F', name: 'Cocoa' }, { hex: '#D2B48C', name: 'Tan Rose' },
    ],
    bestColors: [
      { hex: '#A8B5A0', name: 'Sage' }, { hex: '#D4A5A5', name: 'Dusty Rose' },
      { hex: '#B0C4DE', name: 'Blue Gray' }, { hex: '#B19CD9', name: 'Soft Lavender' },
    ],
    avoidColors: [
      { hex: '#FF0000', name: 'Bright Red' }, { hex: '#000000', name: 'Jet Black' },
      { hex: '#FF4500', name: 'Bright Orange' },
    ],
    metallic: 'Brushed Silver or Rose Gold',
    styleTips: [
      'Embrace muted, tonal dressing — layer dusty shades for depth.',
      'Soft gray, sage, and dusty rose are your power neutrals.',
      'Avoid high contrast; keep your looks tonal and blended.',
      'Soft fabrics like cashmere, silk, and modal complement your season.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Neutral to cool, soft matte finish' },
      { category: 'Blush', recommendation: 'Dusty pink or soft mauve' },
      { category: 'Lip Color', recommendation: 'Mauve, dusty rose, soft berry' },
      { category: 'Eyeshadow', recommendation: 'Soft taupe, dusty purple, muted sage' },
    ],
    hairColors: [
      { hex: '#8B7D6B', name: 'Mushroom Brown' }, { hex: '#A89178', name: 'Ash Bronde' },
      { hex: '#C8B09A', name: 'Cool Beige Blonde' }, { hex: '#6B5B50', name: 'Cool Chocolate' },
    ],
    celebrities: ['Sarah Jessica Parker', 'Kate Middleton', 'Gisele Bündchen'],
    styleGuide: {
      outfits: [
        {
          name: 'Misty Morning',
          description: 'Soft and tonal for an effortlessly blended look',
          pieces: [
            { item: 'Oversized cardigan', color: { hex: '#A8B5A0', name: 'Sage' } },
            { item: 'Silk camisole', color: { hex: '#D4A5A5', name: 'Dusty Rose' } },
            { item: 'Wide-leg pants', color: { hex: '#D3B8AE', name: 'Rose Taupe' } },
          ],
        },
        {
          name: 'Muted Elegance',
          description: 'Understated sophistication in soft tones',
          pieces: [
            { item: 'Knit dress', color: { hex: '#B0C4DE', name: 'Blue Gray' } },
            { item: 'Suede boots', color: { hex: '#CD853F', name: 'Cocoa' } },
            { item: 'Wool scarf', color: { hex: '#B19CD9', name: 'Soft Lavender' } },
          ],
        },
      ],
      bestPatterns: ['Tonal prints', 'Soft plaid', 'Muted watercolor', 'Subtle ombré'],
      bestFabrics: ['Cashmere', 'Silk', 'Modal', 'Brushed cotton'],
      patternsToAvoid: ['Bright neon', 'Sharp geometric', 'High-contrast stripes'],
    },
    jewelry: {
      bestMetals: ['Brushed Silver', 'Rose Gold', 'Matte Gold'],
      metalsToMinimize: ['Bright Gold', 'Polished Chrome', 'Copper'],
      gemstoneRecommendations: ['Labradorite', 'Smoky Quartz', 'Moonstone', 'Chalcedony'],
    },
    hair: {
      bestColors: [
        { hex: '#8B7D6B', name: 'Mushroom Brown' }, { hex: '#A89178', name: 'Ash Bronde' },
        { hex: '#C8B09A', name: 'Cool Beige Blonde' }, { hex: '#6B5B50', name: 'Cool Chocolate' },
      ],
      colorsToAvoid: [
        { hex: '#FF0000', name: 'Bright Red' }, { hex: '#FFD700', name: 'Bright Gold' },
      ],
      highlightRecommendation: 'Soft, blended ash or mushroom babylights',
      lowlightRecommendation: 'Muted cool brown or soft espresso lowlights',
      salonTerminology: ['Mushroom brown', 'Smoky balayage', 'Soft blend', 'Muted toner'],
    },
    nails: {
      everyday: [
        { hex: '#D4A5A5', name: 'Dusty Rose' }, { hex: '#A8B5A0', name: 'Sage' },
        { hex: '#D3B8AE', name: 'Rose Taupe' },
      ],
      statement: [
        { hex: '#B19CD9', name: 'Soft Lavender' }, { hex: '#C8A2C8', name: 'Mauve' },
      ],
      frenchTip: { hex: '#F5F0EB', name: 'Soft Cream' },
      avoidShades: [
        { hex: '#FF0000', name: 'Bright Red' }, { hex: '#FF4500', name: 'Bright Orange' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Muted Tortoiseshell', 'Soft Gray', 'Rose Gold Wire'],
      bagColors: [
        { hex: '#D3B8AE', name: 'Rose Taupe' }, { hex: '#A8B5A0', name: 'Sage' },
        { hex: '#D2B48C', name: 'Tan' },
      ],
      scarfColors: [
        { hex: '#D4A5A5', name: 'Dusty Rose' }, { hex: '#B0C4DE', name: 'Blue Gray' },
        { hex: '#B19CD9', name: 'Soft Lavender' },
      ],
      shoeColors: [
        { hex: '#D3B8AE', name: 'Taupe' }, { hex: '#C0C0C0', name: 'Soft Silver' },
        { hex: '#CD853F', name: 'Cocoa' },
      ],
      beltColors: ['Taupe', 'Soft Gray', 'Rose Gold'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/soft-summer-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/soft-summer-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#A8B5A0', goodName: 'Sage', badHex: '#FF0000', badName: 'Bright Red', explanation: 'Muted sage creates a soft harmony with your coloring; bright red overpowers your delicate features.' },
      { goodHex: '#D4A5A5', goodName: 'Dusty Rose', badHex: '#000000', badName: 'Jet Black', explanation: 'Dusty rose enhances your soft warmth; black creates too jarring a contrast.' },
    ],
  },
  'Soft Autumn': {
    season: 'Soft Autumn',
    tagline: 'Golden warmth meets earthy elegance',
    description: 'Your coloring is warm, soft, and muted — like afternoon sun filtering through autumn leaves. Earthy, warm, and gently muted tones bring out your natural warmth.',
    palette: [
      { hex: '#C67B5C', name: 'Terracotta' }, { hex: '#D4A574', name: 'Warm Sand' },
      { hex: '#8B6F47', name: 'Hazelnut' }, { hex: '#A0845C', name: 'Golden Oak' },
      { hex: '#D4A5A5', name: 'Dusty Rose' }, { hex: '#7B8E6F', name: 'Sage Leaf' },
      { hex: '#9B4F3A', name: 'Deep Terracotta' }, { hex: '#B8860B', name: 'Dark Gold' },
      { hex: '#A8B5A0', name: 'Soft Sage' }, { hex: '#CD853F', name: 'Peru' },
      { hex: '#DAB78A', name: 'Warm Wheat' }, { hex: '#C4956A', name: 'Camel' },
    ],
    bestColors: [
      { hex: '#C67B5C', name: 'Terracotta' }, { hex: '#8B6F47', name: 'Hazelnut' },
      { hex: '#A8B5A0', name: 'Sage' }, { hex: '#DAB78A', name: 'Warm Gold' },
    ],
    avoidColors: [
      { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#00CED1', name: 'Bright Teal' },
      { hex: '#7FFF00', name: 'Chartreuse' },
    ],
    metallic: 'Antique Gold or Brass',
    styleTips: [
      'Pair your warm neutrals with earthy accents — terracotta and sage are your power combination.',
      'Choose warm ivory and camel over stark white and cool gray.',
      'Layered, textured outfits in tonal warm shades look effortlessly chic.',
      'Natural materials like linen, suede, and corduroy complement your palette.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Warm with golden/olive undertones, satin finish' },
      { category: 'Blush', recommendation: 'Warm peach, soft terracotta, or dusty coral' },
      { category: 'Lip Color', recommendation: 'Warm nude, terracotta, warm rose' },
      { category: 'Eyeshadow', recommendation: 'Warm taupe, bronze, muted olive, soft copper' },
    ],
    hairColors: [
      { hex: '#8B6F47', name: 'Warm Chestnut' }, { hex: '#B8860B', name: 'Rich Gold Brown' },
      { hex: '#DAA520', name: 'Caramel Highlights' }, { hex: '#A0522D', name: 'Warm Auburn' },
    ],
    celebrities: ['Jennifer Lopez', 'Beyoncé', 'Gigi Hadid'],
    styleGuide: {
      outfits: [
        {
          name: 'Earthy Chic',
          description: 'Warm and grounded for a naturally elegant look',
          pieces: [
            { item: 'Suede jacket', color: { hex: '#C67B5C', name: 'Terracotta' } },
            { item: 'Knit sweater', color: { hex: '#F7E7CE', name: 'Cream' } },
            { item: 'Wide-leg trousers', color: { hex: '#8B6F47', name: 'Hazelnut' } },
          ],
        },
        {
          name: 'Golden Afternoon',
          description: 'Warm tones for relaxed sophistication',
          pieces: [
            { item: 'Linen shirt dress', color: { hex: '#DAB78A', name: 'Warm Wheat' } },
            { item: 'Leather belt', color: { hex: '#9B4F3A', name: 'Deep Terracotta' } },
            { item: 'Woven sandals', color: { hex: '#C4956A', name: 'Camel' } },
          ],
        },
      ],
      bestPatterns: ['Earth-toned florals', 'Soft plaid', 'Paisley', 'Organic prints'],
      bestFabrics: ['Suede', 'Linen', 'Corduroy', 'Cashmere'],
      patternsToAvoid: ['Neon prints', 'Cool-toned abstract', 'Stark black and white'],
    },
    jewelry: {
      bestMetals: ['Antique Gold', 'Brass', 'Rose Gold'],
      metalsToMinimize: ['Silver', 'Chrome', 'Platinum'],
      gemstoneRecommendations: ['Tiger Eye', 'Amber', 'Carnelian', 'Smoky Topaz'],
    },
    hair: {
      bestColors: [
        { hex: '#8B6F47', name: 'Warm Chestnut' }, { hex: '#B8860B', name: 'Rich Gold Brown' },
        { hex: '#DAA520', name: 'Caramel Highlights' }, { hex: '#A0522D', name: 'Warm Auburn' },
      ],
      colorsToAvoid: [
        { hex: '#1C1C1C', name: 'Blue-Black' }, { hex: '#C0C0C0', name: 'Platinum' },
      ],
      highlightRecommendation: 'Warm golden or honey-toned face-framing highlights',
      lowlightRecommendation: 'Rich warm chestnut or toffee lowlights',
      salonTerminology: ['Warm balayage', 'Toffee toner', 'Honey highlights', 'Golden glaze'],
    },
    nails: {
      everyday: [
        { hex: '#D4A574', name: 'Warm Sand' }, { hex: '#C4956A', name: 'Camel' },
        { hex: '#DAB78A', name: 'Warm Wheat' },
      ],
      statement: [
        { hex: '#C67B5C', name: 'Terracotta' }, { hex: '#9B4F3A', name: 'Deep Terracotta' },
      ],
      frenchTip: { hex: '#F5E6D0', name: 'Warm Cream' },
      avoidShades: [
        { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#00CED1', name: 'Bright Teal' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Warm Tortoiseshell', 'Honey', 'Matte Brown'],
      bagColors: [
        { hex: '#8B6F47', name: 'Hazelnut' }, { hex: '#C4956A', name: 'Camel' },
        { hex: '#C67B5C', name: 'Terracotta' },
      ],
      scarfColors: [
        { hex: '#A8B5A0', name: 'Sage' }, { hex: '#D4A5A5', name: 'Dusty Rose' },
        { hex: '#DAB78A', name: 'Warm Wheat' },
      ],
      shoeColors: [
        { hex: '#8B6F47', name: 'Hazelnut' }, { hex: '#C4956A', name: 'Camel' },
        { hex: '#D4A574', name: 'Warm Sand' },
      ],
      beltColors: ['Cognac', 'Warm Brown', 'Brass'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/soft-autumn-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/soft-autumn-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#C67B5C', goodName: 'Terracotta', badHex: '#FF1493', badName: 'Hot Pink', explanation: 'Warm terracotta harmonizes with your earthy undertone; hot pink clashes with your muted warmth.' },
      { goodHex: '#A8B5A0', goodName: 'Sage', badHex: '#7FFF00', badName: 'Chartreuse', explanation: 'Muted sage complements your soft coloring; bright chartreuse overwhelms your natural palette.' },
    ],
  },
  'True Autumn': {
    season: 'True Autumn',
    tagline: 'Rich, warm, and luxuriously deep',
    description: 'Your coloring is warm, rich, and saturated. Think golden hour in a forest — deep ambers, burnt oranges, and olive greens are your signature.',
    palette: [
      { hex: '#8B4513', name: 'Saddle Brown' }, { hex: '#B8860B', name: 'Dark Goldenrod' },
      { hex: '#CD853F', name: 'Peru' }, { hex: '#556B2F', name: 'Olive' },
      { hex: '#A0522D', name: 'Sienna' }, { hex: '#D2691E', name: 'Chocolate' },
      { hex: '#DAA520', name: 'Goldenrod' }, { hex: '#8FBC8F', name: 'Forest Sage' },
      { hex: '#BC8F8F', name: 'Rosy Copper' }, { hex: '#6B8E23', name: 'Olive Drab' },
      { hex: '#F4A460', name: 'Sandy Brown' }, { hex: '#800020', name: 'Burgundy' },
    ],
    bestColors: [
      { hex: '#8B4513', name: 'Rich Brown' }, { hex: '#DAA520', name: 'Goldenrod' },
      { hex: '#556B2F', name: 'Olive Green' }, { hex: '#A0522D', name: 'Sienna' },
    ],
    avoidColors: [
      { hex: '#FF69B4', name: 'Bubblegum Pink' }, { hex: '#E6E6FA', name: 'Lavender' },
      { hex: '#4169E1', name: 'Royal Blue' },
    ],
    metallic: 'Rich Gold or Copper',
    styleTips: [
      'Embrace rich, warm earth tones for a naturally polished look.',
      'Olive, burnt orange, and deep gold are your statement colors.',
      'Layer textures — corduroy, leather, suede, and knits look amazing on you.',
      'Tortoiseshell and warm wood accessories complete your palette.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Warm golden or olive undertones, natural finish' },
      { category: 'Blush', recommendation: 'Warm bronze, burnt orange, or terracotta' },
      { category: 'Lip Color', recommendation: 'Warm brick, cinnamon, deep terracotta' },
      { category: 'Eyeshadow', recommendation: 'Copper, warm olive, deep bronze, rust' },
    ],
    hairColors: [
      { hex: '#8B4513', name: 'Rich Auburn' }, { hex: '#A0522D', name: 'Copper Brown' },
      { hex: '#D2691E', name: 'Bright Copper' }, { hex: '#654321', name: 'Dark Chocolate' },
    ],
    celebrities: ['Julia Roberts', 'Julianne Moore', 'Isla Fisher'],
    styleGuide: {
      outfits: [
        {
          name: 'Forest Walk',
          description: 'Rich earth tones for a warm, grounded look',
          pieces: [
            { item: 'Leather jacket', color: { hex: '#8B4513', name: 'Saddle Brown' } },
            { item: 'Chunky knit', color: { hex: '#DAA520', name: 'Goldenrod' } },
            { item: 'Corduroy pants', color: { hex: '#556B2F', name: 'Olive' } },
          ],
        },
        {
          name: 'Harvest Dinner',
          description: 'Luxurious warmth for evening gatherings',
          pieces: [
            { item: 'Velvet blouse', color: { hex: '#800020', name: 'Burgundy' } },
            { item: 'Wool skirt', color: { hex: '#CD853F', name: 'Peru' } },
            { item: 'Suede heels', color: { hex: '#A0522D', name: 'Sienna' } },
          ],
        },
      ],
      bestPatterns: ['Rich paisley', 'Tartan', 'Animal print', 'Warm florals'],
      bestFabrics: ['Leather', 'Corduroy', 'Tweed', 'Velvet'],
      patternsToAvoid: ['Pastel prints', 'Cool-toned plaids', 'Neon patterns'],
    },
    jewelry: {
      bestMetals: ['Rich Gold', 'Copper', 'Bronze'],
      metalsToMinimize: ['Silver', 'Platinum', 'Chrome'],
      gemstoneRecommendations: ['Amber', 'Garnet', 'Tiger Eye', 'Citrine'],
    },
    hair: {
      bestColors: [
        { hex: '#8B4513', name: 'Rich Auburn' }, { hex: '#A0522D', name: 'Copper Brown' },
        { hex: '#D2691E', name: 'Bright Copper' }, { hex: '#654321', name: 'Dark Chocolate' },
      ],
      colorsToAvoid: [
        { hex: '#C0C0C0', name: 'Platinum Blonde' }, { hex: '#808080', name: 'Ash Tones' },
      ],
      highlightRecommendation: 'Warm copper or golden bronze chunky highlights',
      lowlightRecommendation: 'Rich dark chocolate or warm espresso',
      salonTerminology: ['Copper balayage', 'Warm bronze', 'Rich toner', 'Dimensional color'],
    },
    nails: {
      everyday: [
        { hex: '#CD853F', name: 'Peru' }, { hex: '#D2691E', name: 'Chocolate' },
        { hex: '#F4A460', name: 'Sandy Brown' },
      ],
      statement: [
        { hex: '#800020', name: 'Burgundy' }, { hex: '#8B4513', name: 'Saddle Brown' },
      ],
      frenchTip: { hex: '#F5E6D0', name: 'Warm Cream' },
      avoidShades: [
        { hex: '#FF69B4', name: 'Bubblegum' }, { hex: '#E6E6FA', name: 'Lavender' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Dark Tortoiseshell', 'Warm Brown', 'Copper Wire'],
      bagColors: [
        { hex: '#8B4513', name: 'Saddle Brown' }, { hex: '#556B2F', name: 'Olive' },
        { hex: '#A0522D', name: 'Sienna' },
      ],
      scarfColors: [
        { hex: '#DAA520', name: 'Goldenrod' }, { hex: '#800020', name: 'Burgundy' },
        { hex: '#6B8E23', name: 'Olive Drab' },
      ],
      shoeColors: [
        { hex: '#8B4513', name: 'Brown' }, { hex: '#A0522D', name: 'Sienna' },
        { hex: '#654321', name: 'Dark Brown' },
      ],
      beltColors: ['Rich Brown', 'Copper', 'Dark Olive'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/true-autumn-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/true-autumn-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#DAA520', goodName: 'Goldenrod', badHex: '#E6E6FA', badName: 'Lavender', explanation: 'Rich goldenrod enhances your warm depth; lavender looks disconnected from your warm undertone.' },
      { goodHex: '#556B2F', goodName: 'Olive', badHex: '#4169E1', badName: 'Royal Blue', explanation: 'Warm olive complements your earthy palette; cool royal blue clashes.' },
    ],
  },
  'Deep Autumn': {
    season: 'Deep Autumn',
    tagline: 'Dark, warm, and richly intense',
    description: 'You have deep, warm coloring with rich contrast. Bold, warm, and deep colors — think jewel tones with a warm cast — make you look powerful and luminous.',
    palette: [
      { hex: '#8B0000', name: 'Dark Red' }, { hex: '#006400', name: 'Dark Green' },
      { hex: '#8B4513', name: 'Brown' }, { hex: '#800020', name: 'Burgundy' },
      { hex: '#B8860B', name: 'Dark Gold' }, { hex: '#654321', name: 'Chocolate' },
      { hex: '#4B0082', name: 'Indigo' }, { hex: '#2F4F4F', name: 'Dark Teal' },
      { hex: '#8B6F47', name: 'Dark Hazel' }, { hex: '#CD5C5C', name: 'Indian Red' },
      { hex: '#556B2F', name: 'Dark Olive' }, { hex: '#D2691E', name: 'Rich Sienna' },
    ],
    bestColors: [
      { hex: '#800020', name: 'Burgundy' }, { hex: '#006400', name: 'Forest Green' },
      { hex: '#8B0000', name: 'Oxblood' }, { hex: '#B8860B', name: 'Dark Gold' },
    ],
    avoidColors: [
      { hex: '#FFB6C1', name: 'Pastel Pink' }, { hex: '#E6E6FA', name: 'Lavender' },
      { hex: '#87CEEB', name: 'Baby Blue' },
    ],
    metallic: 'Antique Gold or Dark Bronze',
    styleTips: [
      'Deep, warm jewel tones bring out your rich contrast beautifully.',
      'Dark chocolate and burgundy are better base neutrals than black for you.',
      'Rich, heavy fabrics like velvet, tweed, and leather suit your depth.',
      'Warm-toned prints in deep colors create stunning looks.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Deep warm with golden/amber undertones' },
      { category: 'Blush', recommendation: 'Deep terracotta, warm plum, or bronze' },
      { category: 'Lip Color', recommendation: 'Deep burgundy, warm red, dark terracotta' },
      { category: 'Eyeshadow', recommendation: 'Dark bronze, deep olive, warm plum, espresso' },
    ],
    hairColors: [
      { hex: '#1C1008', name: 'Rich Espresso' }, { hex: '#3D2B1F', name: 'Dark Chocolate' },
      { hex: '#654321', name: 'Warm Dark Brown' }, { hex: '#4A0E0E', name: 'Deep Auburn' },
    ],
    celebrities: ['Eva Longoria', 'Penélope Cruz', 'Priyanka Chopra'],
    styleGuide: {
      outfits: [
        {
          name: 'Power Statement',
          description: 'Deep, warm jewel tones for commanding presence',
          pieces: [
            { item: 'Structured blazer', color: { hex: '#800020', name: 'Burgundy' } },
            { item: 'Silk blouse', color: { hex: '#B8860B', name: 'Dark Gold' } },
            { item: 'Tailored trousers', color: { hex: '#654321', name: 'Chocolate' } },
          ],
        },
        {
          name: 'Dark Luxe',
          description: 'Rich and dramatic for evening',
          pieces: [
            { item: 'Velvet dress', color: { hex: '#4B0082', name: 'Indigo' } },
            { item: 'Gold cuff', color: { hex: '#B8860B', name: 'Dark Gold' } },
            { item: 'Leather heels', color: { hex: '#8B0000', name: 'Dark Red' } },
          ],
        },
      ],
      bestPatterns: ['Deep florals', 'Rich brocade', 'Dark paisley', 'Jewel-toned abstract'],
      bestFabrics: ['Velvet', 'Rich leather', 'Heavy silk', 'Brocade'],
      patternsToAvoid: ['Light pastels', 'Baby prints', 'Washed-out patterns'],
    },
    jewelry: {
      bestMetals: ['Antique Gold', 'Dark Bronze', 'Rich Copper'],
      metalsToMinimize: ['Silver', 'Platinum', 'Light Rose Gold'],
      gemstoneRecommendations: ['Garnet', 'Dark Amethyst', 'Onyx', 'Deep Topaz'],
    },
    hair: {
      bestColors: [
        { hex: '#1C1008', name: 'Rich Espresso' }, { hex: '#3D2B1F', name: 'Dark Chocolate' },
        { hex: '#654321', name: 'Warm Dark Brown' }, { hex: '#4A0E0E', name: 'Deep Auburn' },
      ],
      colorsToAvoid: [
        { hex: '#F5F5DC', name: 'Blonde' }, { hex: '#C0C0C0', name: 'Ash Tones' },
      ],
      highlightRecommendation: 'Subtle warm bronze or dark caramel highlights',
      lowlightRecommendation: 'Deep espresso or rich dark chocolate',
      salonTerminology: ['Rich brunette', 'Warm espresso glaze', 'Dark balayage', 'Bronze foils'],
    },
    nails: {
      everyday: [
        { hex: '#8B6F47', name: 'Dark Hazel' }, { hex: '#CD5C5C', name: 'Indian Red' },
        { hex: '#B8860B', name: 'Dark Gold' },
      ],
      statement: [
        { hex: '#800020', name: 'Burgundy' }, { hex: '#4B0082', name: 'Indigo' },
      ],
      frenchTip: { hex: '#F0E6D8', name: 'Warm Ivory' },
      avoidShades: [
        { hex: '#FFB6C1', name: 'Pastel Pink' }, { hex: '#87CEEB', name: 'Baby Blue' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Dark Brown', 'Dark Tortoiseshell', 'Matte Black'],
      bagColors: [
        { hex: '#654321', name: 'Chocolate' }, { hex: '#800020', name: 'Burgundy' },
        { hex: '#8B0000', name: 'Dark Red' },
      ],
      scarfColors: [
        { hex: '#B8860B', name: 'Dark Gold' }, { hex: '#006400', name: 'Forest Green' },
        { hex: '#4B0082', name: 'Indigo' },
      ],
      shoeColors: [
        { hex: '#654321', name: 'Dark Brown' }, { hex: '#800020', name: 'Burgundy' },
        { hex: '#1C1008', name: 'Espresso' },
      ],
      beltColors: ['Dark Brown', 'Burgundy', 'Bronze'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/deep-autumn-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/deep-autumn-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#800020', goodName: 'Burgundy', badHex: '#FFB6C1', badName: 'Pastel Pink', explanation: 'Rich burgundy brings out your deep contrast; pastel pink looks washed out against your features.' },
      { goodHex: '#006400', goodName: 'Forest Green', badHex: '#87CEEB', badName: 'Baby Blue', explanation: 'Deep forest green matches your intensity; light baby blue is too soft for your strong coloring.' },
    ],
  },
  'Deep Winter': {
    season: 'Deep Winter',
    tagline: 'Bold, cool-neutral, and intensely dramatic',
    description: 'Your coloring is deep with cool-neutral undertones and high contrast. Rich, bold colors with depth bring out the drama in your features.',
    palette: [
      { hex: '#191970', name: 'Midnight Blue' }, { hex: '#800020', name: 'Burgundy' },
      { hex: '#2F4F4F', name: 'Dark Teal' }, { hex: '#4B0082', name: 'Indigo' },
      { hex: '#8B0000', name: 'Dark Crimson' }, { hex: '#006400', name: 'Forest Green' },
      { hex: '#2C0047', name: 'Deep Purple' }, { hex: '#1C1C1C', name: 'Near Black' },
      { hex: '#483D8B', name: 'Dark Slate Blue' }, { hex: '#36454F', name: 'Charcoal' },
      { hex: '#C41E3A', name: 'Cardinal' }, { hex: '#1B4D3E', name: 'Evergreen' },
    ],
    bestColors: [
      { hex: '#191970', name: 'Midnight Blue' }, { hex: '#8B0000', name: 'Deep Crimson' },
      { hex: '#006400', name: 'Forest Green' }, { hex: '#4B0082', name: 'Indigo' },
    ],
    avoidColors: [
      { hex: '#FFD700', name: 'Warm Gold' }, { hex: '#FF8C00', name: 'Orange' },
      { hex: '#F0E68C', name: 'Soft Yellow' },
    ],
    metallic: 'Gunmetal or Dark Silver',
    styleTips: [
      'Deep jewel tones and near-black shades create powerful looks.',
      'Black is a strong neutral for you — you can carry it well.',
      'Pair deep, rich colors for an editorial, high-fashion effect.',
      'Sleek, structured silhouettes complement your striking contrast.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Neutral-cool with deep coverage options' },
      { category: 'Blush', recommendation: 'Deep berry, plum, or cool dark rose' },
      { category: 'Lip Color', recommendation: 'Deep wine, dark berry, bold red' },
      { category: 'Eyeshadow', recommendation: 'Deep charcoal, navy, plum, dark emerald' },
    ],
    hairColors: [
      { hex: '#0C0C0C', name: 'Jet Black' }, { hex: '#1C1C1C', name: 'Espresso' },
      { hex: '#2B1B17', name: 'Dark Mocha' }, { hex: '#321414', name: 'Deep Burgundy' },
    ],
    celebrities: ['Kim Kardashian', 'Sandra Bullock', 'Lucy Liu'],
    styleGuide: {
      outfits: [
        {
          name: 'Midnight Glamour',
          description: 'Dark and dramatic for maximum impact',
          pieces: [
            { item: 'Tailored coat', color: { hex: '#1C1C1C', name: 'Near Black' } },
            { item: 'Silk top', color: { hex: '#C41E3A', name: 'Cardinal' } },
            { item: 'Slim trousers', color: { hex: '#191970', name: 'Midnight Blue' } },
          ],
        },
        {
          name: 'Bold Executive',
          description: 'Powerful deep tones for the boardroom',
          pieces: [
            { item: 'Double-breasted blazer', color: { hex: '#36454F', name: 'Charcoal' } },
            { item: 'Turtleneck', color: { hex: '#1B4D3E', name: 'Evergreen' } },
            { item: 'Oxford shoes', color: { hex: '#1C1C1C', name: 'Near Black' } },
          ],
        },
      ],
      bestPatterns: ['Dark florals', 'Pinstripes', 'Deep jewel-toned abstract', 'Subtle texture'],
      bestFabrics: ['Cashmere', 'Heavy silk', 'Structured wool', 'Leather'],
      patternsToAvoid: ['Warm earth tones', 'Muted pastels', 'Warm yellows'],
    },
    jewelry: {
      bestMetals: ['Gunmetal', 'Dark Silver', 'Platinum'],
      metalsToMinimize: ['Yellow Gold', 'Copper', 'Brass'],
      gemstoneRecommendations: ['Onyx', 'Deep Sapphire', 'Dark Garnet', 'Tanzanite'],
    },
    hair: {
      bestColors: [
        { hex: '#0C0C0C', name: 'Jet Black' }, { hex: '#1C1C1C', name: 'Espresso' },
        { hex: '#2B1B17', name: 'Dark Mocha' }, { hex: '#321414', name: 'Deep Burgundy' },
      ],
      colorsToAvoid: [
        { hex: '#DAA520', name: 'Golden Blonde' }, { hex: '#D2691E', name: 'Warm Copper' },
      ],
      highlightRecommendation: 'Subtle cool espresso or dark plum highlights',
      lowlightRecommendation: 'Blue-black or deep cool brown lowlights',
      salonTerminology: ['Cool brunette', 'Blue-black glaze', 'Cool espresso', 'Dark toner'],
    },
    nails: {
      everyday: [
        { hex: '#483D8B', name: 'Dark Slate Blue' }, { hex: '#36454F', name: 'Charcoal' },
        { hex: '#C41E3A', name: 'Cardinal' },
      ],
      statement: [
        { hex: '#191970', name: 'Midnight Blue' }, { hex: '#8B0000', name: 'Dark Crimson' },
      ],
      frenchTip: { hex: '#FFFFFF', name: 'Stark White' },
      avoidShades: [
        { hex: '#FFD700', name: 'Warm Gold' }, { hex: '#FF8C00', name: 'Orange' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Matte Black', 'Dark Metal', 'Deep Navy'],
      bagColors: [
        { hex: '#1C1C1C', name: 'Near Black' }, { hex: '#191970', name: 'Midnight' },
        { hex: '#800020', name: 'Burgundy' },
      ],
      scarfColors: [
        { hex: '#C41E3A', name: 'Cardinal' }, { hex: '#1B4D3E', name: 'Evergreen' },
        { hex: '#4B0082', name: 'Indigo' },
      ],
      shoeColors: [
        { hex: '#1C1C1C', name: 'Black' }, { hex: '#191970', name: 'Midnight' },
        { hex: '#36454F', name: 'Charcoal' },
      ],
      beltColors: ['Black', 'Dark Silver', 'Deep Navy'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/deep-winter-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/deep-winter-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#191970', goodName: 'Midnight Blue', badHex: '#FFD700', badName: 'Warm Gold', explanation: 'Deep midnight blue enhances your cool-neutral depth; warm gold clashes with your undertone.' },
      { goodHex: '#8B0000', goodName: 'Deep Crimson', badHex: '#F0E68C', badName: 'Soft Yellow', explanation: 'Rich crimson matches your dramatic contrast; soft yellow washes out your intensity.' },
    ],
  },
  'True Winter': {
    season: 'True Winter',
    tagline: 'Icy, cool, and strikingly pure',
    description: 'Your coloring is cool, high-contrast, and clear. True cool tones — icy pastels to deep jewels with blue undertones — create a striking, elegant look.',
    palette: [
      { hex: '#DC143C', name: 'Crimson' }, { hex: '#4169E1', name: 'Royal Blue' },
      { hex: '#008080', name: 'Teal' }, { hex: '#800080', name: 'Purple' },
      { hex: '#C71585', name: 'Magenta' }, { hex: '#191970', name: 'Navy' },
      { hex: '#E0FFFF', name: 'Ice Blue' }, { hex: '#FF1493', name: 'Deep Pink' },
      { hex: '#2E8B57', name: 'Emerald' }, { hex: '#FFFAFA', name: 'Snow White' },
      { hex: '#778899', name: 'Cool Gray' }, { hex: '#DB7093', name: 'Orchid Pink' },
    ],
    bestColors: [
      { hex: '#DC143C', name: 'True Crimson' }, { hex: '#4169E1', name: 'Royal Blue' },
      { hex: '#2E8B57', name: 'Emerald' }, { hex: '#FFFAFA', name: 'Pure White' },
    ],
    avoidColors: [
      { hex: '#FF8C00', name: 'Orange' }, { hex: '#DAA520', name: 'Goldenrod' },
      { hex: '#8B4513', name: 'Warm Brown' },
    ],
    metallic: 'Sterling Silver or Platinum',
    styleTips: [
      'True cool tones with blue undertones are your signature.',
      'Pair stark white and black — you handle high contrast beautifully.',
      'Cool jewel tones (emerald, sapphire, ruby) look stunning on you.',
      'Keep patterns crisp and clean — graphic prints over soft florals.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Cool with pink/blue undertones' },
      { category: 'Blush', recommendation: 'Cool berry, fuchsia, or icy pink' },
      { category: 'Lip Color', recommendation: 'True red, berry, deep fuchsia' },
      { category: 'Eyeshadow', recommendation: 'Silver, navy, deep plum, charcoal' },
    ],
    hairColors: [
      { hex: '#1C1C1C', name: 'Blue-Black' }, { hex: '#3D3D3D', name: 'Cool Dark Brown' },
      { hex: '#C0C0C0', name: 'Icy Platinum' }, { hex: '#4A3728', name: 'Cool Espresso' },
    ],
    celebrities: ['Anne Hathaway', 'Lupita Nyong\'o', 'Lily Collins'],
    styleGuide: {
      outfits: [
        {
          name: 'Ice Queen',
          description: 'Cool and commanding with icy elegance',
          pieces: [
            { item: 'Cashmere coat', color: { hex: '#FFFAFA', name: 'Snow White' } },
            { item: 'Silk dress', color: { hex: '#DC143C', name: 'Crimson' } },
            { item: 'Pointed heels', color: { hex: '#191970', name: 'Navy' } },
          ],
        },
        {
          name: 'Cool Professional',
          description: 'Polished cool tones for work',
          pieces: [
            { item: 'Fitted blazer', color: { hex: '#191970', name: 'Navy' } },
            { item: 'Blouse', color: { hex: '#E0FFFF', name: 'Ice Blue' } },
            { item: 'Pumps', color: { hex: '#2E8B57', name: 'Emerald' } },
          ],
        },
      ],
      bestPatterns: ['Crisp stripes', 'Cool florals', 'Graphic prints', 'Classic houndstooth'],
      bestFabrics: ['Crisp cotton', 'Structured silk', 'Wool', 'Satin'],
      patternsToAvoid: ['Warm earth tones', 'Muted prints', 'Orange-based patterns'],
    },
    jewelry: {
      bestMetals: ['Sterling Silver', 'Platinum', 'White Gold'],
      metalsToMinimize: ['Yellow Gold', 'Brass', 'Copper'],
      gemstoneRecommendations: ['Diamond', 'Sapphire', 'Emerald', 'Ruby'],
    },
    hair: {
      bestColors: [
        { hex: '#1C1C1C', name: 'Blue-Black' }, { hex: '#3D3D3D', name: 'Cool Dark Brown' },
        { hex: '#C0C0C0', name: 'Icy Platinum' }, { hex: '#4A3728', name: 'Cool Espresso' },
      ],
      colorsToAvoid: [
        { hex: '#D2691E', name: 'Warm Copper' }, { hex: '#DAA520', name: 'Golden Tones' },
      ],
      highlightRecommendation: 'Icy platinum or cool silver pieces for dramatic contrast',
      lowlightRecommendation: 'Deep blue-black or cool espresso lowlights',
      salonTerminology: ['Cool toner', 'Icy highlights', 'Blue-black gloss', 'Platinum pieces'],
    },
    nails: {
      everyday: [
        { hex: '#DB7093', name: 'Orchid Pink' }, { hex: '#778899', name: 'Cool Gray' },
        { hex: '#E0FFFF', name: 'Ice Blue' },
      ],
      statement: [
        { hex: '#DC143C', name: 'Crimson' }, { hex: '#800080', name: 'Purple' },
      ],
      frenchTip: { hex: '#FFFFFF', name: 'Pure White' },
      avoidShades: [
        { hex: '#FF8C00', name: 'Orange' }, { hex: '#8B4513', name: 'Warm Brown' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Silver Wire', 'Black', 'Navy'],
      bagColors: [
        { hex: '#191970', name: 'Navy' }, { hex: '#FFFAFA', name: 'Snow White' },
        { hex: '#DC143C', name: 'Crimson' },
      ],
      scarfColors: [
        { hex: '#4169E1', name: 'Royal Blue' }, { hex: '#C71585', name: 'Magenta' },
        { hex: '#2E8B57', name: 'Emerald' },
      ],
      shoeColors: [
        { hex: '#000000', name: 'Black' }, { hex: '#191970', name: 'Navy' },
        { hex: '#DC143C', name: 'Crimson' },
      ],
      beltColors: ['Black', 'Navy', 'Silver'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/true-winter-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/true-winter-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#DC143C', goodName: 'Crimson', badHex: '#FF8C00', badName: 'Orange', explanation: 'Cool crimson makes your complexion glow; warm orange fights against your cool undertone.' },
      { goodHex: '#4169E1', goodName: 'Royal Blue', badHex: '#DAA520', badName: 'Goldenrod', explanation: 'Royal blue enhances your cool clarity; warm goldenrod dulls your natural brilliance.' },
    ],
  },
  'Bright Winter': {
    season: 'Bright Winter',
    tagline: 'Vivid, cool, and electrifyingly bright',
    description: 'You have cool undertones with incredibly high contrast and clarity. Bright, vivid, and clear colors — not muted — make your features pop dramatically.',
    palette: [
      { hex: '#FF0000', name: 'True Red' }, { hex: '#0000FF', name: 'Cobalt' },
      { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#00FF00', name: 'Bright Green' },
      { hex: '#FF00FF', name: 'Magenta' }, { hex: '#000000', name: 'Black' },
      { hex: '#FFFFFF', name: 'Pure White' }, { hex: '#4169E1', name: 'Royal Blue' },
      { hex: '#00CED1', name: 'Dark Turquoise' }, { hex: '#9400D3', name: 'Dark Violet' },
      { hex: '#FF6347', name: 'Cool Tomato' }, { hex: '#20B2AA', name: 'Sea Green' },
    ],
    bestColors: [
      { hex: '#FF0000', name: 'True Red' }, { hex: '#0000FF', name: 'Cobalt' },
      { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#000000', name: 'Jet Black' },
    ],
    avoidColors: [
      { hex: '#D2B48C', name: 'Tan' }, { hex: '#BDB76B', name: 'Muted Olive' },
      { hex: '#D4A5A5', name: 'Dusty Rose' },
    ],
    metallic: 'High-Shine Silver',
    styleTips: [
      'Think vivid and high contrast — you are one of the few who can wear all-black or all-white.',
      'Bright accent pieces over monochrome foundations create showstopping looks.',
      'Avoid anything muted, dusty, or warm — clarity is key.',
      'Sharp tailoring and bold graphic prints match your striking features.',
    ],
    makeupTips: [
      { category: 'Foundation', recommendation: 'Cool, clear undertone with flawless finish' },
      { category: 'Blush', recommendation: 'Bright cool pink or vivid fuchsia' },
      { category: 'Lip Color', recommendation: 'Vivid red, bright fuchsia, clear berry' },
      { category: 'Eyeshadow', recommendation: 'Bright silver, cobalt, vivid purple, jet' },
    ],
    hairColors: [
      { hex: '#0C0C0C', name: 'Jet Black' }, { hex: '#1C1C1C', name: 'Blue-Black' },
      { hex: '#F5F5F5', name: 'Icy Platinum' }, { hex: '#321414', name: 'Cool Deep Burgundy' },
    ],
    celebrities: ['Zendaya', 'Megan Fox', 'Dita Von Teese'],
    styleGuide: {
      outfits: [
        {
          name: 'Electric Night',
          description: 'Vivid and striking for maximum drama',
          pieces: [
            { item: 'Structured blazer', color: { hex: '#000000', name: 'Black' } },
            { item: 'Statement top', color: { hex: '#FF0000', name: 'True Red' } },
            { item: 'Slim trousers', color: { hex: '#FFFFFF', name: 'Pure White' } },
          ],
        },
        {
          name: 'Vivid Weekend',
          description: 'Bold and clear for standout casual',
          pieces: [
            { item: 'Graphic jacket', color: { hex: '#0000FF', name: 'Cobalt' } },
            { item: 'Fitted tee', color: { hex: '#FFFFFF', name: 'White' } },
            { item: 'Colorful sneakers', color: { hex: '#FF1493', name: 'Hot Pink' } },
          ],
        },
      ],
      bestPatterns: ['High-contrast graphic', 'Bold stripes', 'Color blocking', 'Pop art prints'],
      bestFabrics: ['Crisp cotton', 'Patent leather', 'Structured silk', 'Ponte knit'],
      patternsToAvoid: ['Dusty prints', 'Muted watercolor', 'Faded tones'],
    },
    jewelry: {
      bestMetals: ['High-Shine Silver', 'Platinum', 'White Gold'],
      metalsToMinimize: ['Matte Gold', 'Copper', 'Antique metals'],
      gemstoneRecommendations: ['Diamond', 'Ruby', 'Sapphire', 'Emerald'],
    },
    hair: {
      bestColors: [
        { hex: '#0C0C0C', name: 'Jet Black' }, { hex: '#1C1C1C', name: 'Blue-Black' },
        { hex: '#F5F5F5', name: 'Icy Platinum' }, { hex: '#321414', name: 'Cool Deep Burgundy' },
      ],
      colorsToAvoid: [
        { hex: '#DAA520', name: 'Golden Tones' }, { hex: '#D2691E', name: 'Warm Copper' },
      ],
      highlightRecommendation: 'Dramatic icy platinum or vivid cool burgundy pieces',
      lowlightRecommendation: 'Blue-black or jet black for maximum contrast',
      salonTerminology: ['Jet black gloss', 'Platinum contrast', 'Cool vivid toner', 'High-shine treatment'],
    },
    nails: {
      everyday: [
        { hex: '#FF1493', name: 'Hot Pink' }, { hex: '#20B2AA', name: 'Sea Green' },
        { hex: '#FFFFFF', name: 'Pure White' },
      ],
      statement: [
        { hex: '#FF0000', name: 'True Red' }, { hex: '#0000FF', name: 'Cobalt' },
      ],
      frenchTip: { hex: '#FFFFFF', name: 'Bright White' },
      avoidShades: [
        { hex: '#D2B48C', name: 'Tan' }, { hex: '#D4A5A5', name: 'Dusty Rose' },
      ],
    },
    accessories: {
      sunglassesFrames: ['Jet Black', 'Clear Crystal', 'Bright White'],
      bagColors: [
        { hex: '#000000', name: 'Black' }, { hex: '#FF0000', name: 'Red' },
        { hex: '#FFFFFF', name: 'White' },
      ],
      scarfColors: [
        { hex: '#0000FF', name: 'Cobalt' }, { hex: '#FF00FF', name: 'Magenta' },
        { hex: '#00FF00', name: 'Bright Green' },
      ],
      shoeColors: [
        { hex: '#000000', name: 'Black' }, { hex: '#FF0000', name: 'True Red' },
        { hex: '#FFFFFF', name: 'White' },
      ],
      beltColors: ['Black', 'Bright Red', 'High-Shine Silver'],
    },
    pinterest: {
      makeup: 'https://www.pinterest.com/hazelandhue/bright-winter-makeup/',
      outfits: 'https://www.pinterest.com/hazelandhue/bright-winter-outfits/',
    },
    drapeComparisons: [
      { goodHex: '#FF0000', goodName: 'True Red', badHex: '#D2B48C', badName: 'Tan', explanation: 'Vivid true red matches your electrifying contrast; muted tan dulls your striking features.' },
      { goodHex: '#0000FF', goodName: 'Cobalt', badHex: '#BDB76B', badName: 'Muted Olive', explanation: 'Bold cobalt makes your features pop dramatically; muted olive washes out your clarity.' },
    ],
  },
};

const SEASON_LIST: SeasonType[] = Object.keys(SEASON_DATA) as SeasonType[];

/** Deterministically pick a season based on image data */
export function analyzeImage(imageData: Uint8Array): SeasonType {
  let hash = 0;
  const step = Math.max(1, Math.floor(imageData.length / 1000));
  for (let i = 0; i < imageData.length; i += step) {
    hash = ((hash << 5) - hash + imageData[i]) | 0;
  }
  const index = Math.abs(hash) % SEASON_LIST.length;
  return SEASON_LIST[index];
}
