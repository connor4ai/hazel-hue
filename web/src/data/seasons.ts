export type SeasonType =
  | 'Light Spring' | 'Warm Spring' | 'Clear Spring'
  | 'Light Summer' | 'Cool Summer' | 'Soft Summer'
  | 'Soft Autumn' | 'Warm Autumn' | 'Deep Autumn'
  | 'Deep Winter' | 'Cool Winter' | 'Clear Winter';

export interface ColorSwatch {
  hex: string;
  name: string;
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
  },
  'Warm Spring': {
    season: 'Warm Spring',
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
  },
  'Clear Spring': {
    season: 'Clear Spring',
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
  },
  'Cool Summer': {
    season: 'Cool Summer',
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
  },
  'Warm Autumn': {
    season: 'Warm Autumn',
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
  },
  'Cool Winter': {
    season: 'Cool Winter',
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
  },
  'Clear Winter': {
    season: 'Clear Winter',
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
