// Pre-loaded seasonal content for 12-season color analysis
export interface SeasonalContent {
  season: string;
  overview: {
    keyCharacteristics: string[];
    signatureColors: string[];
    colorsToAvoid: string[];
    description: string;
  };
  colorPalette: {
    htmlContent: string;
    coreNeutrals: string[];
    accentLights: string[];
    accentBrights: string[];
  };
  clothing: {
    pinterestUrl: string;
    guidelines: string[];
  };
  accessories: {
    bestMetals?: string[];
    metals?: string;
    jewelryStyle?: string;
    jewelry?: string[];
    watches?: string | string[];
    glasses?: string | string[];
    description?: string;
  };
  hairColor: {
    bestColors: string[];
    avoidColors: string[];
    guidance: string;
  };
  makeup: {
    pinterestUrl: string;
    foundation?: string;
    eyeshadowPalettes?: Array<{
      name: string;
      colors: string[];
      description: string;
    }>;
    blushOptions?: string[];
    lipstickCollections?: Array<{
      occasion: string;
      shades: string[];
    }>;
    eyeliner?: string;
    mascara?: string;
    tips?: string;
    guidelines?: string[];
  };
  celebrities: string[];
}

export const seasonalContentData: Record<string, SeasonalContent> = {
  'True Winter': {
    season: 'True Winter',
    overview: {
      keyCharacteristics: [
        'Cool undertones (blue or pink)',
        'High contrast level (dark hair, light skin)',
        'Clear & bright chroma (pure, vivid colors)',
        'Deep to Light value range (can handle both extremes)'
      ],
      signatureColors: [
        'Ice White (#E8E8E8)',
        'Cool Grey (#6B7B7B)',
        'Icy Yellow (#FCE4B8)',
        'Emerald (#4D9B4D)',
        'Teal (#2E5F5F)',
        'Bright Pink (#FFB8E8)',
        'Fuchsia (#E85AA0)',
        'Eggplant (#5A3D5A)'
      ],
      colorsToAvoid: [
        'Peach', 'Coral', 'Orange', 'Warm Yellow', 'Golden Brown', 
        'Olive Green', 'Dusty Colors', 'Muted Tones', 'Sage Green', 
        'Taupe', 'Beige', 'Cream', 'Rust', 'Terracotta'
      ],
      description: 'True Winter represents the essence of winter with high contrast and cool undertones. You have striking features with dark hair, light skin, and bright eyes that can handle the most dramatic color combinations. Your palette consists of pure, clear colors in their truest form - think fresh snow, deep night sky, and jewel tones.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>True Winter Color Palette</h2>
          <p>High contrast cool colors with dramatic depth</p>
        </div>
        <div class="color-grid">
          <!-- 64-color True Winter palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#000000', '#FFFFFF', '#36454F', '#708090', '#2F4F4F', '#C0C0C0'],
      accentLights: ['#E6E6FA', '#F0F8FF', '#B0C4DE', '#ADD8E6', '#F5F5F5', '#DCDCDC'],
      accentBrights: ['#DC143C', '#000080', '#50C878', '#FF1493', '#4169E1', '#800020']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/5msDn2lWd',
      guidelines: [
        'Black and white are your power neutrals',
        'Choose pure, saturated colors without yellow undertones',
        'High contrast combinations work beautifully',
        'Jewel tones are your signature colors'
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'White Gold', 'Platinum'],
      metals: 'Silver, white gold, and platinum are your perfect metals. Their cool undertones complement your natural coloring beautifully.',
      jewelryStyle: 'Bold, dramatic pieces with clean lines and high contrast',
      jewelry: ['Statement silver necklaces', 'Diamond or clear crystal jewelry', 'Bold geometric designs', 'High-contrast black and white pieces'],
      watches: ['Silver or platinum with black leather straps', 'White or black watch faces', 'Clean, architectural designs'],
      glasses: ['Black acetate frames', 'Silver or gunmetal wire frames', 'Bold geometric shapes', 'High-contrast designs that match your dramatic coloring']
    },
    hairColor: {
      bestColors: ['Black', 'Dark brown', 'Platinum blonde', 'Silver'],
      avoidColors: ['Golden blonde', 'Auburn', 'Warm brown', 'Copper'],
      guidance: 'True Winters look stunning in dramatic hair colors with cool undertones.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/4jTgHGE0j',
      guidelines: [
        'Bold, dramatic makeup',
        'True red or bright pink lipstick',
        'Cool-toned foundation',
        'Black or navy eyeliner'
      ]
    },
    celebrities: ['Adriana Lima', 'Katy Perry', 'Megan Fox']
  },

  'Bright Winter': {
    season: 'Bright Winter',
    overview: {
      keyCharacteristics: [
        'Cool undertones (blue or pink undertones)',
        'Very High contrast (dramatic contrast between features)',
        'Bright & Clear chroma (needs the most saturated colors)',
        'Full Range value (can wear both very light and very dark colors)'
      ],
      signatureColors: [
        'Electric Blue (#0080FF)',
        'True Red (#FF0000)',
        'Emerald Green (#00FF80)',
        'Hot Pink (#FF1493)',
        'Pure White (#FFFFFF)',
        'Jet Black (#000000)',
        'Bright Purple (#8A2BE2)',
        'Lemon Yellow (#FFFF00)'
      ],
      colorsToAvoid: [
        'Peach', 'Coral', 'Orange', 'Warm Yellow', 'Golden Brown', 
        'Olive Green', 'Dusty Colors', 'Muted Tones', 'Sage Green', 
        'Taupe', 'Beige', 'Cream', 'Rust', 'Terracotta'
      ],
      description: 'You are a Bright Winter, possessing striking, high-contrast coloring that can handle the most intense colors in the spectrum. Your features are characterized by cool undertones with dramatic contrast - often dark hair, pale skin, and bright, piercing eyes. Your palette consists of the most saturated, cool-toned colors that complement your naturally dramatic appearance.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Bright Winter Color Palette</h2>
          <p>Electric, high-contrast colors with maximum saturation</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Bright Winter palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#FFFFFF', '#000000', '#8B9B8B', '#2F4F4F', '#696969', '#F5F5DC'],
      accentLights: ['#FFD700', '#FFFF00', '#20B2AA', '#00CED1', '#C4577A', '#E6004C'],
      accentBrights: ['#FF1493', '#FF00FF', '#8B2F8B', '#4169E1', '#0000FF', '#00A651']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/3N5d043Xa',
      guidelines: [
        'Your wardrobe should be built around high-impact, statement pieces',
        'You can wear head-to-toe bright colors that would overwhelm other seasons',
        'Black and white create perfect contrast for you',
        'Your patterns should be bold and geometric, with high contrast between colors'
      ]
    },
    accessories: {
      bestMetals: ['Bright Silver', 'Platinum', 'White Gold', 'Chrome'],
      metals: 'Bright silver, platinum, white gold, and chrome metals enhance your electric energy. Avoid any metals with warm undertones.',
      jewelryStyle: 'Bold, ultra-modern statement pieces with sharp geometric lines and maximum impact',
      jewelry: ['Large architectural silver pieces', 'Electric blue or emerald statement jewelry', 'Futuristic geometric designs', 'High-contrast crystal or diamond pieces'],
      watches: ['Bright silver or platinum with bold faces', 'High-tech materials like ceramic or titanium', 'Electric blue or black bands', 'Ultra-modern digital or architectural designs'],
      glasses: ['Electric blue acetate frames', 'Bright silver or chrome wire frames', 'Bold futuristic shapes', 'High-contrast black or white frames with dramatic proportions']
    },
    hairColor: {
      bestColors: ['Jet Black', 'Platinum Blonde', 'Cool Dark Brown', 'Bold Fashion Colors', 'Silver/White'],
      avoidColors: ['Any warm tones', 'golden highlights', 'auburn', 'copper', 'muddy colors'],
      guidance: 'Bright Winters often have naturally dark hair with high contrast against pale skin.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/1RvCERX0Z',
      guidelines: [
        'You can handle the most dramatic makeup looks',
        'Bright red, hot pink, electric purple, bright berry lipstick',
        'Electric blue, bright purple, silver, black, white, emerald eyeshadow',
        'Jet black, bright blue, purple, or white eyeliner for drama'
      ]
    },
    celebrities: ['Adriana Lima', 'Katy Perry', 'Megan Fox']
  },

  'Dark Winter': {
    season: 'Dark Winter',
    overview: {
      keyCharacteristics: [
        'Cool undertones (blue or neutral-cool)',
        'High contrast level (but deeper than Bright Winter)',
        'Deep & Rich chroma (sophisticated, darker colors)',
        'Deep to Medium value range (avoiding very light colors)'
      ],
      signatureColors: [
        'Deep Burgundy (#722F37) - Your most sophisticated color',
        'Midnight Blue (#191970) - Dark and mysterious',
        'Forest Green (#355E3B) - Rich and luxurious',
        'Charcoal Grey (#36454F) - Your perfect neutral',
        'Deep Purple (#301934) - Regal and elegant',
        'Black (#000000) - Classic and timeless',
        'Pine Green (#01796F) - Deep and natural',
        'Deep Magenta (#8B008B) - Bold yet sophisticated'
      ],
      colorsToAvoid: [
        'Light colors and pastels',
        'Bright yellow and orange',
        'Peach and coral tones',
        'Light pink and sage green',
        'Beige, taupe, and cream',
        'Golden colors and rust',
        'Light blue shades'
      ],
      description: 'As a Dark Winter, you have deep, intense coloring with cool undertones that can carry the richest, most sophisticated colors. Your features are characterized by high contrast and depth - typically dark hair, eyes that are deep or strikingly light, and skin with cool undertones. Your palette consists of the deepest, most luxurious colors that enhance your natural intensity and create an aura of elegance.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Dark Winter Color Palette</h2>
          <p>Deep, sophisticated colors with cool undertones</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Dark Winter palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#000000', '#36454F', '#2F4F4F', '#696969', '#708090', '#C0C0C0'],
      accentLights: ['#E6E6FA', '#B0C4DE', '#ADD8E6', '#F0F8FF', '#D3D3D3', '#DCDCDC'],
      accentBrights: ['#8B1538', '#191970', '#663399', '#800080', '#2E8B57', '#008B8B']
    },
    clothing: {
      pinterestUrl: 'https://www.pinterest.com/HueMatcher/dark-winter-outfits/',
      guidelines: [
        'Build around deep, rich colors that create mystery and elegance',
        'Black is excellent, but consider deep burgundy and midnight blue as powerful alternatives',
        'Choose rich, complex patterns - paisley, deep florals, or geometric designs',
        'Fabrics should have weight and sophistication',
        'Avoid light colors and anything with warm undertones'
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'Platinum', 'White Gold', 'Gunmetal', 'Oxidized Silver'],
      metals: 'Silver, platinum, white gold, gunmetal, and oxidized silver create the sophisticated, dramatic look that enhances your mysterious elegance.',
      jewelryStyle: 'Substantial, sophisticated pieces with rich details and dramatic presence',
      jewelry: ['Ornate silver statement necklaces', 'Deep-set gemstone pieces in silver settings', 'Vintage-inspired brooches and pins', 'Heavy chain jewelry with architectural details'],
      watches: ['Gunmetal or black cases with complications', 'Deep burgundy or black leather straps', 'Platinum or white gold luxury timepieces', 'Dark metal bracelet watches with substantial weight'],
      glasses: ['Black acetate frames with sophisticated detailing', 'Gunmetal wire frames with dramatic proportions', 'Cool-toned dark tortoiseshell with substantial weight', 'Deep burgundy frames for sophisticated contrast']
    },
    hairColor: {
      bestColors: [
        'Natural black - timeless and sophisticated',
        'Deep cool brown - rich and elegant',
        'Dark burgundy - adds richness while staying cool',
        'Deep purple - for bold, sophisticated looks',
        'Silver/grey - elegant and distinguished'
      ],
      avoidColors: [
        'Light colors of any kind',
        'Warm browns and golden highlights',
        'Auburn, copper, or warm tones',
        'Blonde shades',
        'Orange-based reds'
      ],
      guidance: 'Dark Winters typically have naturally dark hair - deep brown or black. Embrace your natural darkness and avoid anything that lightens or warms your coloring.'
    },
    makeup: {
      pinterestUrl: 'https://www.pinterest.com/HueMatcher/dark-winter-makeup/',
      guidelines: [
        'Foundation with cool undertones - avoid warm or golden tones',
        'Lipstick in deep burgundy, wine, deep berry, or dark red',
        'Eyeshadow in deep purple, forest green, charcoal, or black',
        'Blush in deep rose, burgundy, or deep berry tones',
        'Eyeliner in black, deep burgundy, or forest green',
        'Sophisticated and dramatic color combinations'
      ]
    },
    celebrities: [
      'Salma Hayek',
      'Sandra Bullock',
      'Viola Davis'
    ]
  },

  "Cool Winter": {
    season: "Cool Winter",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool (blue, pink undertones)",
        "Contrast Level: Medium to High",
        "Chroma: Clear but slightly softer than True Winter",
        "Value: Medium with some lightness tolerance"
      ],
      signatureColors: [
        "#4B0082", // Indigo
        "#708090", // Slate Gray
        "#20B2AA", // Light Sea Green
        "#F0F8FF", // Alice Blue
        "#8B008B", // Dark Magenta
        "#4682B4", // Steel Blue
        "#2F4F4F", // Dark Slate Gray
        "#DA70D6"  // Orchid
      ],
      colorsToAvoid: [
        "Orange, Coral, Warm Yellow, Golden Brown",
        "Rust, Terracotta, Warm Red, Peach",
        "Olive, Mustard, Cream, Ivory"
      ],
      description: "Cool Winter combines high contrast with slightly softened intensity. You have cool undertones with medium to high contrast that can handle clear, sophisticated colors with a touch more subtlety than True Winter."
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>True Summer Color Palette</h2>
          <p>Cool, muted colors with sophisticated depth</p>
        </div>
        <div class="color-grid">
          <!-- 64-color True Summer palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ["#2F4F4F", "#708090", "#696969", "#F0F8FF", "#E6E6FA", "#B0C4DE"],
      accentLights: ["#D8BFD8", "#F0FFFF", "#E0E0E0", "#F5F5F5", "#DCDCDC", "#C0C0C0"],
      accentBrights: ["#4B0082", "#20B2AA", "#8B008B", "#4682B4", "#6A5ACD", "#483D8B"]
    },
    clothing: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/true-summer-outfits/",
      guidelines: [
        "Choose sophisticated blues and purples as your foundation",
        "Gray serves as your perfect neutral - from charcoal to light gray",
        "Cool pinks and roses work beautifully for feminine touches",
        "Avoid warm undertones but can handle slightly muted versions of clear colors"
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'White Gold', 'Platinum'],
      metals: 'Silver, white gold, and platinum are your ideal metals. These cool-toned metals complement your refined, sophisticated coloring perfectly.',
      jewelryStyle: 'Refined, elegant pieces with cool-toned gemstones and sophisticated designs',
      jewelry: ['Silver chain necklaces with cool gemstones', 'Sapphire or diamond jewelry in silver settings', 'Elegant pearl pieces', 'Refined geometric designs in cool metals'],
      watches: ['Silver or white gold cases', 'Navy blue or cool gray leather straps', 'Classic dress watches with clean lines', 'Sophisticated complications in cool metals'],
      glasses: ['Silver wire frames with elegant proportions', 'Cool gray acetate frames', 'Navy blue or charcoal frames', 'Refined shapes that enhance your sophisticated presence']
    },
    hairColor: {
      bestColors: ["Ash brown", "Cool black", "Silver highlights", "Cool blonde shades"],
      avoidColors: ["Golden blonde", "Warm browns", "Auburn", "Copper tones"],
      guidance: "Cool undertones are essential. Your hair should complement your sophisticated, cool coloring."
    },
    makeup: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/true-summer-makeup/",
      guidelines: [
        "Cool-toned foundation with pink or neutral undertones",
        "Berry and cool pink lipsticks",
        "Cool gray and purple eyeshadows",
        "Silver and cool-toned highlighters"
      ]
    },
    celebrities: ["Anna Kendrick", "Emily DiDonato", "Kaya Scodelario"]
  },

  "Deep Winter": {
    season: "Deep Winter",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool to neutral-cool",
        "Contrast Level: High",
        "Chroma: Deep and rich",
        "Value: Deep and saturated"
      ],
      signatureColors: [
        "#000080", // Navy
        "#800080", // Purple
        "#008B8B", // Dark Cyan
        "#FFFFFF", // White
        "#8B0000", // Dark Red
        "#2F4F4F", // Dark Slate Gray
        "#191970", // Midnight Blue
        "#8B008B"  // Dark Magenta
      ],
      colorsToAvoid: [
        "Light pastels, Warm yellows, Orange",
        "Peach, Coral, Golden tones",
        "Light warm colors, Beige, Cream"
      ],
      description: "Deep Winter has the richest, most saturated coloring. You can wear the deepest, most intense colors with confidence and look stunning in dramatic contrasts."
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Light Summer Color Palette</h2>
          <p>Delicate, cool colors with gentle sophistication</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Light Summer palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ["#F0F8FF", "#E6E6FA", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080"],
      accentLights: ["#E0E0E0", "#F5F5F5", "#DCDCDC", "#B0C4DE", "#ADD8E6", "#F0FFFF"],
      accentBrights: ["#6A5ACD", "#4682B4", "#20B2AA", "#8470FF", "#9370DB", "#7B68EE"]
    },
    clothing: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/light-summer-outfits/",
      guidelines: [
        "Embrace deep, rich colors as your signature",
        "Navy and deep gray are your perfect neutrals",
        "Rich jewel tones look incredible on you",
        "Avoid light, washed-out colors that diminish your natural intensity"
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'White Gold', 'Platinum', 'Black Metal'],
      metals: 'Silver, white gold, platinum, and black metal enhance your deep, dramatic coloring while maintaining cool undertones.',
      jewelryStyle: 'Bold, substantial pieces with deep gemstones and dramatic presence',
      jewelry: ['Large silver statement necklaces', 'Deep sapphire or emerald jewelry in silver settings', 'Bold geometric pieces with weight', 'Dramatic chandelier earrings in cool metals'],
      watches: ['Black metal cases with silver accents', 'Deep navy or black leather straps', 'Substantial sport watches in black or silver', 'Bold chronographs with dramatic presence'],
      glasses: ['Black acetate frames with bold proportions', 'Silver frames with dramatic shapes', 'Deep navy or charcoal frames', 'Substantial frames that match your powerful presence']
    },
    hairColor: {
      bestColors: ["Deep black", "Dark brown", "Deep burgundy", "Rich chocolate"],
      avoidColors: ["Light blonde", "Golden tones", "Light brown", "Warm highlights"],
      guidance: "Your hair should match your natural depth and intensity. Deep, rich colors are most flattering."
    },
    makeup: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/light-summer-makeup/",
      guidelines: [
        "Light, cool-toned foundation with pink undertones",
        "Soft pink and rose lip colors", 
        "Delicate eye makeup in cool pastels",
        "Light, ethereal color palette throughout"
      ]
    },
    celebrities: ["Margot Robbie", "Reese Witherspoon", "Sydney Sweeney"]
  },

  "True Summer": {
    season: "True Summer",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool (blue, pink undertones)",
        "Contrast Level: Medium",
        "Chroma: Soft and muted",
        "Value: Medium with gentle lightness"
      ],
      signatureColors: [
        "#6495ED", // Cornflower Blue
        "#DDA0DD", // Plum
        "#20B2AA", // Light Sea Green
        "#F0F8FF", // Alice Blue
        "#CD5C5C", // Indian Red
        "#9370DB", // Medium Purple
        "#778899", // Light Slate Gray
        "#FFB6C1"  // Light Pink
      ],
      colorsToAvoid: [
        "Orange, Bright yellow, Black",
        "Warm browns, Rust, Terracotta",
        "Bright, harsh colors, Pure white"
      ],
      description: "True Summer has gentle, muted coloring with cool undertones. You look best in soft, sophisticated colors that enhance your natural elegance without overwhelming your delicate features."
    },
    colorPalette: {
      htmlContent: `<!-- True Summer HTML palette would go here -->`,
      coreNeutrals: ["#778899", "#F0F8FF", "#696969", "#E6E6FA"],
      accentLights: ["#E0E0E0", "#F5F5DC", "#FFE4E1", "#F0FFFF"],
      accentBrights: ["#6495ED", "#DDA0DD", "#20B2AA", "#CD5C5C"]
    },
    clothing: {
      pinterestUrl: "https://pin.it/339TCPy6G",
      guidelines: [
        "Soft blues and purples are your signature colors",
        "Gray is your perfect neutral in all its variations",
        "Muted colors work better than bright, harsh tones",
        "Cool pinks and roses complement your gentle coloring"
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'White Gold', 'Rose Gold (Cool-toned)'],
      metals: 'Silver, white gold, and cool-toned rose gold complement your soft, cool coloring. Avoid warm or yellow metals.',
      jewelryStyle: 'Medium-contrast pieces with classic elegance and refined presence',
      jewelry: ['Classic silver chain necklaces', 'Blue topaz or aquamarine in silver settings', 'Pearl jewelry with silver accents', 'Traditional designs with cool gemstones'],
      watches: ['Silver cases with navy or gray leather straps', 'Classic dress watches with clean dials', 'Medium-sized cases with refined proportions', 'Cool blue or white watch faces'],
      glasses: ['Silver wire frames with classic proportions', 'Cool gray or navy acetate frames', 'Traditional shapes with medium weight', 'Soft rectangular or oval frames that enhance your balanced features']
    },
    hairColor: {
      bestColors: ["Ash blonde", "Cool brown", "Soft gray", "Cool highlights"],
      avoidColors: ["Golden blonde", "Warm brown", "Red tones", "Harsh black"],
      guidance: "Soft, cool tones that complement your gentle coloring work best. Avoid harsh contrasts."
    },
    makeup: {
      pinterestUrl: "https://pin.it/4jTgHGE0j",
      foundation: "Soft, cool-toned foundation with blue or pink undertones",
      
      eyeshadowPalettes: [
        {
          name: "Cool Summer",
          colors: ["Soft gray", "Cool purple", "Rose", "Pearl"],
          description: "Classic cool tones for everyday elegance"
        },
        {
          name: "Garden Party",
          colors: ["Gentle lavender", "Soft rose", "Cool beige", "Silver"],
          description: "Romantic colors for special occasions"
        },
        {
          name: "Sophisticated Mist",
          colors: ["Cool brown", "Mauve", "Dusty purple", "Soft white"],
          description: "Professional tones with cool undertones"
        },
        {
          name: "Evening Rose",
          colors: ["Deep rose", "Cool plum", "Charcoal", "Pink pearl"],
          description: "Deeper cool tones for evening glamour"
        }
      ],
      
      blushOptions: [
        "Cool rose - classic and elegant",
        "Soft pink - gentle and fresh",
        "Dusty rose - sophisticated depth",
        "Cool berry - for evening looks"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Soft rose", "Cool pink", "Muted berry"]
        },
        {
          occasion: "Evening",
          shades: ["Deep rose", "Cool plum", "Berry"]
        },
        {
          occasion: "Professional",
          shades: ["Soft mauve", "Cool nude", "Rose pink"]
        }
      ],
      
      eyeliner: "Soft brown, charcoal gray, or navy",
      mascara: "Brown or charcoal for natural definition",
      tips: "Your makeup should be soft and cool-toned, creating elegant looks with muted colors that enhance your natural sophistication."
    },
    celebrities: ["Jane Levy", "Mila Jojovich", "Emma Stone"]
  },

  "Light Summer": {
    season: "Light Summer",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool with light, delicate coloring",
        "Contrast Level: Low to Medium",
        "Chroma: Light and soft",
        "Value: Light with gentle depth"
      ],
      signatureColors: [
        "#E6E6FA", // Lavender
        "#B0E0E6", // Powder Blue
        "#F0E68C", // Khaki (cool version)
        "#FFFFFF", // White
        "#DDA0DD", // Plum
        "#87CEEB", // Sky Blue
        "#D3D3D3", // Light Gray
        "#FFB6C1"  // Light Pink
      ],
      colorsToAvoid: [
        "Black, Deep colors, Orange",
        "Bright yellow, Red, Dark brown",
        "Heavy, intense colors"
      ],
      description: "Light Summer has the most delicate coloring with cool undertones and low contrast. You shine in light, airy colors that complement your ethereal beauty."
    },
    colorPalette: {
      htmlContent: `<!-- Light Summer HTML palette would go here -->`,
      coreNeutrals: ["#D3D3D3", "#FFFFFF", "#E6E6FA", "#F5F5F5"],
      accentLights: ["#E0E0E0", "#F0F8FF", "#FFE4E1", "#F0FFFF"],
      accentBrights: ["#B0E0E6", "#DDA0DD", "#87CEEB", "#FFB6C1"]
    },
    clothing: {
      pinterestUrl: "https://pin.it/5D4woGTlr",
      guidelines: [
        "Light blues and lavenders are perfect for you",
        "White and light gray are your ideal neutrals",
        "Soft pastels enhance your delicate beauty",
        "Avoid dark, heavy colors that overpower your gentle features"
      ]
    },
    accessories: {
      bestMetals: ['Silver', 'White Gold', 'Platinum', 'Light Pewter'],
      metals: 'Light, delicate metals in silver, white gold, platinum, and light pewter enhance your ethereal coloring. Avoid heavy or dark metals.',
      jewelryStyle: 'Delicate, feminine pieces with intricate details and light, airy designs',
      jewelry: ['Fine silver chain necklaces', 'Small pearl earrings and necklaces', 'Delicate gemstone pieces in light blue or lavender', 'Intricate filigree work in light metals'],
      watches: ['Small, delicate cases in silver or white gold', 'Soft leather bands in powder blue or light pink', 'Thin metal bracelets with refined details', 'Small watch faces with clean, light dials'],
      glasses: ['Light silver wire frames with delicate proportions', 'Soft gray or light blue acetate frames', 'Rimless or semi-rimless designs', 'Delicate shapes that enhance your ethereal features']
    },
    hairColor: {
      bestColors: ["Light ash blonde", "Platinum", "Light gray", "Cool light brown"],
      avoidColors: ["Dark colors", "Warm tones", "Golden blonde", "Red"],
      guidance: "Light, cool colors that maintain your delicate, ethereal appearance work best."
    },
    makeup: {
      pinterestUrl: "https://pin.it/654Gk4Nrv",
      foundation: "Light, cool-toned foundation with pink or neutral undertones",
      
      eyeshadowPalettes: [
        {
          name: "Soft Romance",
          colors: ["Powder pink", "Soft lavender", "Light rose", "Pearl white"],
          description: "Perfect for romantic, ethereal looks"
        },
        {
          name: "Cool Neutrals", 
          colors: ["Light gray", "Soft taupe", "Cool beige", "Silver"],
          description: "Everyday sophistication with cool undertones"
        },
        {
          name: "Delicate Blues",
          colors: ["Baby blue", "Soft periwinkle", "Light steel blue", "Icy white"],
          description: "Enhance your cool coloring with gentle blues"
        },
        {
          name: "Gentle Purples",
          colors: ["Soft lilac", "Light plum", "Dusty mauve", "Cool ivory"],
          description: "Sophisticated purples for elegant occasions"
        }
      ],
      
      blushOptions: [
        "Very soft pink - everyday natural glow",
        "Light rose - gentle warmth",
        "Cool pink - romantic enhancement",
        "Dusty rose - sophisticated finish"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Soft pink", "Light berry", "Nude pink"]
        },
        {
          occasion: "Evening",
          shades: ["Cool berry", "Light plum", "Rose pink"]
        },
        {
          occasion: "Professional",
          shades: ["Soft mauve", "Dusty rose", "Cool neutral pink"]
        }
      ],
      
      eyeliner: "Soft brown or light gray",
      mascara: "Brown or dark gray for natural enhancement",
      tips: "Your makeup should be very light and natural, enhancing your delicate features without adding weight or drama."
    },
    celebrities: ["Margot Robbie", "Reese Witherspoon", "Sydney Sweeney"]
  },

  "Soft Summer": {
    season: "Soft Summer",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool with muted qualities",
        "Contrast Level: Low",
        "Chroma: Soft and muted",
        "Value: Medium with gentle tones"
      ],
      signatureColors: [
        "#9370DB", // Medium Purple
        "#708090", // Slate Gray
        "#20B2AA", // Light Sea Green
        "#F5F5DC", // Beige
        "#CD5C5C", // Indian Red
        "#6495ED", // Cornflower Blue
        "#BC8F8F", // Rosy Brown
        "#DDA0DD"  // Plum
      ],
      colorsToAvoid: [
        "Bright, clear colors, Black, Orange",
        "Bright yellow, Pure white",
        "Harsh, contrasting colors"
      ],
      description: "Soft Summer has the most muted coloring with cool undertones and gentle contrast. You look beautiful in soft, blended colors that harmonize with your natural subtlety."
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Soft Summer Color Palette</h2>
          <p>Muted, cool colors with gentle harmony</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Soft Summer palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ["#708090", "#BC8F8F", "#D3D3D3", "#F5F5DC", "#DCDCDC", "#C0C0C0"],
      accentLights: ["#E6E6FA", "#F0F8FF", "#FFE4E1", "#F5F5F5", "#F8F8FF", "#E0E0E0"],
      accentBrights: ["#9370DB", "#20B2AA", "#CD5C5C", "#6495ED", "#8470FF", "#778899"]
    },
    clothing: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/soft-summer-outfits/",
      guidelines: [
        "Muted blues and purples are your signature",
        "Soft gray and muted beige work as neutrals",
        "Blended, harmonious colors suit you best",
        "Avoid high contrast and bright, clear colors"
      ]
    },
    accessories: {
      bestMetals: ['Muted Silver', 'Pewter', 'White Gold', 'Soft Platinum'],
      metals: 'Muted silver, pewter, white gold, and soft platinum with brushed or matte finishes complement your gentle, harmonious coloring.',
      jewelryStyle: 'Soft, muted pieces with blended finishes that create harmony rather than contrast',
      jewelry: ['Muted silver chain necklaces', 'Soft pearl pieces with gentle luster', 'Dusty rose or lavender gemstones in muted settings', 'Vintage-inspired pieces with soft patina'],
      watches: ['Muted metal cases with soft finishes', 'Gray, dusty rose, or soft beige leather straps', 'Understated designs with gentle proportions', 'Soft, muted watch faces'],
      glasses: ['Soft gray acetate frames', 'Muted tortoiseshell with cool undertones', 'Pewter or brushed silver wire frames', 'Gentle shapes that blend with your harmonious features']
    },
    hairColor: {
      bestColors: ["Soft brown", "Muted blonde", "Cool gray", "Gentle highlights"],
      avoidColors: ["Bright colors", "Golden tones", "Harsh black", "Vivid red"],
      guidance: "Soft, muted colors that blend with your natural coloring are most flattering."
    },
    makeup: {
      pinterestUrl: "https://www.pinterest.com/HueMatcher/soft-summer-makeup/",
      guidelines: [
        "Muted, cool-toned foundation",
        "Soft, muted lip colors",
        "Blended, harmonious eyeshadows",
        "Gentle, natural makeup look"
      ]
    },
    celebrities: ["Adriana Lima", "Cara Delevingne", "Jennifer Aniston"]
  },

  'True Spring': {
    season: 'True Spring',
    overview: {
      keyCharacteristics: [
        'Warm undertones (golden or peach)',
        'Medium to high contrast level',
        'Clear & warm chroma (bright, warm colors)',
        'Light to medium value range'
      ],
      signatureColors: [
        'Clear Coral (#FF7F50)',
        'Golden Yellow (#FFD700)',
        'Grass Green (#7CFC00)',
        'Warm Blue (#87CEEB)',
        'Peach (#FFCBA4)',
        'Bright Orange (#FF8C00)',
        'Kelly Green (#4CBB17)',
        'Ivory (#FFFFF0)'
      ],
      colorsToAvoid: [
        'Black', 'Dark Colors', 'Cool Colors', 'Muted Tones', 'Gray',
        'Purple', 'Cool Pink', 'Navy', 'Burgundy', 'Dusty Colors'
      ],
      description: 'True Spring embodies the fresh vitality of spring with warm, clear colors. You have golden undertones in your skin, warm hair, and bright eyes that sparkle with warmth. Your palette consists of clear, warm colors that reflect the energy of new growth and sunshine.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>True Spring Color Palette</h2>
          <p>Warm, vibrant colors with natural freshness</p>
        </div>
        <div class="color-grid">
          <!-- 64-color True Spring palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#FFFFF0', '#F5DEB3', '#D2691E', '#8B4513', '#DEB887', '#F4A460'],
      accentLights: ['#FFCBA4', '#FFD700', '#87CEEB', '#98FB98', '#F0E68C', '#FFEFD5'],
      accentBrights: ['#FF7F50', '#FF8C00', '#7CFC00', '#4CBB17', '#FF6347', '#32CD32']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/truespring',
      guidelines: [
        'Warm, clear colors are your signature',
        'Golden and coral tones are perfect',
        'Avoid black - use warm brown instead',
        'Bright, fresh combinations work beautifully'
      ]
    },
    accessories: {
      bestMetals: ['Gold', 'Brass', 'Copper', 'Warm Bronze'],
      metals: 'Gold, brass, copper, and warm bronze enhance your vibrant, warm coloring. Avoid all cool-toned metals like silver.',
      jewelryStyle: 'Bright, fresh pieces with warm metals and clear, vibrant gemstones',
      jewelry: ['Warm gold chain necklaces', 'Coral and turquoise statement pieces', 'Bright citrine or peridot jewelry', 'Fresh, modern designs in warm metals'],
      watches: ['Gold cases with bright leather straps', 'Sporty designs in warm metals', 'Orange, coral, or turquoise bands', 'Fresh, youthful complications'],
      glasses: ['Warm tortoiseshell with golden undertones', 'Golden metal frames', 'Bright coral or turquoise acetate', 'Fresh, energetic shapes that match your vibrant personality']
    },
    hairColor: {
      bestColors: ['Golden blonde', 'Warm brown', 'Auburn', 'Copper'],
      avoidColors: ['Ash blonde', 'Cool brown', 'Black', 'Platinum'],
      guidance: 'True Springs shine in warm, golden hair colors with sunny highlights.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/truespringmakeup',
      guidelines: [
        'Warm, fresh makeup',
        'Coral or peach lipstick',
        'Golden-toned foundation',
        'Warm brown eyeliner'
      ]
    },
    celebrities: ['Blake Lively', 'Cynthia Nixon', 'Amy Adams']
  },

  'Bright Spring': {
    season: 'Bright Spring',
    overview: {
      keyCharacteristics: [
        'Warm undertones with high intensity',
        'High contrast level',
        'Bright & electric chroma (vivid, saturated colors)',
        'Light to medium value range'
      ],
      signatureColors: [
        'Electric Coral (#FF6347)',
        'Bright Yellow (#FFFF00)',
        'Hot Orange (#FF4500)',
        'Electric Blue (#0080FF)',
        'Lime Green (#32CD32)',
        'Fuchsia (#FF00FF)',
        'Turquoise (#40E0D0)',
        'Clear White (#FFFFFF)'
      ],
      colorsToAvoid: [
        'Muted Colors', 'Dusty Tones', 'Black', 'Gray', 'Beige',
        'Soft Colors', 'Pastels', 'Earth Tones', 'Brown', 'Burgundy'
      ],
      description: 'Bright Spring represents electric energy with high contrast warm coloring. You can handle the most saturated, vibrant colors with confidence. Your features are striking with warm undertones and you need colors as dynamic as your personality.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Bright Spring Color Palette</h2>
          <p>Electric, vibrant colors with maximum energy</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Bright Spring palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#FFFFFF', '#FFE4B5', '#F0F8FF', '#CD853F', '#F5DEB3', '#DEB887'],
      accentLights: ['#FFFF00', '#40E0D0', '#98FB98', '#FFB6C1', '#FFD700', '#87CEEB'],
      accentBrights: ['#FF6347', '#FF4500', '#32CD32', '#FF00FF', '#FF1493', '#00FF7F']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/1BqAZuRko',
      guidelines: [
        'Electric, vibrant colors are your strength',
        'High contrast combinations work perfectly',
        'Avoid muted or dusty tones',
        'Bright white is better than cream'
      ]
    },
    accessories: {
      bestMetals: ['Bright Gold', 'Rose Gold', 'Polished Brass', 'Warm Copper'],
      metals: 'Bright gold, rose gold, polished brass, and warm copper in high-shine finishes complement your electric energy and warm undertones.',
      jewelryStyle: 'Bold, vibrant statement pieces with electric colors and dynamic designs',
      jewelry: ['Large gold statement necklaces', 'Bright coral, turquoise, or citrine jewelry', 'Electric blue or hot pink gemstone pieces', 'Bold geometric designs in bright metals'],
      watches: ['Bright gold cases with electric colored bands', 'Hot pink, turquoise, or coral straps', 'Bold sport watches with vibrant accents', 'Modern designs with high-energy appeal'],
      glasses: ['Bright turquoise or coral acetate frames', 'Polished gold wire frames', 'Electric blue or hot pink frames', 'Bold, energetic shapes that match your dynamic personality']
    },
    hairColor: {
      bestColors: ['Bright blonde', 'Vivid auburn', 'Electric highlights', 'Bold colors'],
      avoidColors: ['Muted tones', 'Ash colors', 'Dusty shades', 'Gray'],
      guidance: 'Bright Springs can handle the most vibrant hair colors and dramatic changes.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/brightspringmakeup',
      guidelines: [
        'Bold, vibrant makeup',
        'Bright coral or fuchsia lipstick',
        'Clear, warm foundation',
        'Electric blue or green accents'
      ]
    },
    celebrities: ['Emma Stone', 'Jane Levy', 'Mila Jovovich']
  },

  'Light Spring': {
    season: 'Light Spring',
    overview: {
      keyCharacteristics: [
        'Warm undertones with light coloring',
        'Low to medium contrast level',
        'Light & clear chroma (delicate but warm)',
        'Light value range'
      ],
      signatureColors: [
        'Soft Peach (#FFCBA4)',
        'Light Coral (#F08080)',
        'Cream (#FFFDD0)',
        'Light Aqua (#7FFFD4)',
        'Soft Yellow (#FFFFE0)',
        'Peachy Pink (#FFCCCB)',
        'Light Green (#90EE90)',
        'Warm Beige (#F5F5DC)'
      ],
      colorsToAvoid: [
        'Dark Colors', 'Black', 'Heavy Colors', 'Cool Colors', 'Purple',
        'Burgundy', 'Navy', 'Gray', 'Harsh Contrast', 'Deep Tones'
      ],
      description: 'Light Spring represents delicate warmth with gentle, light coloring. You have soft features with warm undertones and need colors that enhance your natural luminosity without overwhelming your gentle presence.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Light Spring Color Palette</h2>
          <p>Delicate, warm colors with gentle luminosity</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Light Spring palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#FFFDD0', '#F5F5DC', '#DEB887', '#CD853F', '#F4A460', '#FFEFD5'],
      accentLights: ['#FFCBA4', '#FFCCCB', '#7FFFD4', '#90EE90', '#F0E68C', '#FFE4E1'],
      accentBrights: ['#F08080', '#FFD700', '#32CD32', '#87CEEB', '#FF7F50', '#98FB98']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/10Gbz4387',
      guidelines: [
        'Light, warm colors are perfect',
        'Cream is better than white',
        'Soft, delicate combinations work best',
        'Avoid heavy or dark colors'
      ]
    },
    accessories: {
      bestMetals: ['Light Gold', 'Rose Gold', 'Champagne Gold', 'Light Brass'],
      metals: 'Light gold, rose gold, champagne gold, and light brass in delicate finishes enhance your gentle, warm coloring.',
      jewelryStyle: 'Delicate, feminine pieces with light, warm metals and soft gemstones',
      jewelry: ['Fine gold chain necklaces', 'Light peach or coral gemstone pieces', 'Delicate pearl jewelry in warm settings', 'Gentle floral or nature-inspired designs'],
      watches: ['Light gold cases with soft leather straps', 'Cream, peach, or light pink bands', 'Delicate, feminine complications', 'Small cases with gentle proportions'],
      glasses: ['Light gold wire frames', 'Warm peach or coral acetate frames', 'Champagne gold metal frames', 'Gentle, rounded shapes that enhance your soft features']
    },
    hairColor: {
      bestColors: ['Light blonde', 'Strawberry blonde', 'Light brown', 'Soft highlights'],
      avoidColors: ['Dark colors', 'Ash tones', 'Black', 'Cool colors'],
      guidance: 'Light Springs look beautiful in soft, warm hair colors that enhance their delicate coloring.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/lightspringmakeup',
      guidelines: [
        'Soft, warm makeup',
        'Peachy or coral lipstick',
        'Light, warm foundation',
        'Soft brown eyeliner'
      ]
    },
    celebrities: ['Cynthia Nixon', 'Jane Levy', 'Mila Jojovich']
  },

  'True Autumn': {
    season: 'True Autumn',
    overview: {
      keyCharacteristics: [
        'Warm undertones (golden or peachy)',
        'Medium contrast level',
        'Rich & warm chroma (deep, earthy colors)',
        'Medium to deep value range'
      ],
      signatureColors: [
        'Rust (#B7410E)',
        'Golden Brown (#B8860B)',
        'Forest Green (#355E3B)',
        'Burnt Orange (#CC5500)',
        'Deep Gold (#FFD700)',
        'Burgundy (#800020)',
        'Olive Green (#808000)',
        'Warm Beige (#F5F5DC)'
      ],
      colorsToAvoid: [
        'Cool Colors', 'Black', 'Pure White', 'Pink', 'Cool Blue',
        'Purple', 'Gray', 'Icy Colors', 'Bright Colors', 'Neon Tones'
      ],
      description: 'True Autumn embodies the rich warmth of autumn with deep, earthy colors. You have golden undertones and warm features that harmonize beautifully with nature\'s most abundant season. Your palette reflects the richness of harvest time.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>True Autumn Color Palette</h2>
          <p>Rich, warm colors with earthy depth</p>
        </div>
        <div class="color-grid">
          <!-- 64-color True Autumn palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#F5F5DC', '#D2691E', '#8B4513', '#654321', '#DEB887', '#CD853F'],
      accentLights: ['#F4A460', '#D2B48C', '#BC8F8F', '#F0E68C', '#FFEFD5', '#FFE4B5'],
      accentBrights: ['#B7410E', '#CC5500', '#355E3B', '#800020', '#B22222', '#8B4513']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/trueautumn',
      guidelines: [
        'Rich, warm earth tones are your signature',
        'Golden browns and rusts are perfect',
        'Avoid black - use deep brown instead',
        'Warm, rich combinations work beautifully'
      ]
    },
    accessories: {
      bestMetals: ['Gold', 'Brass', 'Copper', 'Bronze', 'Antique Gold'],
      metals: 'Gold, brass, copper, bronze, and antique gold in rich, warm finishes reflect your earthy, abundant nature.',
      jewelryStyle: 'Substantial pieces with warm metals and organic, nature-inspired designs',
      jewelry: ['Chunky gold chain necklaces', 'Amber or topaz jewelry in warm settings', 'Earthy gemstone pieces like carnelian or citrine', 'Vintage-inspired designs with rich patina'],
      watches: ['Gold or bronze cases with cognac leather straps', 'Warm brown or tan leather bands', 'Classic dress watches with rich complications', 'Vintage-inspired timepieces with warm metals'],
      glasses: ['Warm tortoiseshell with golden undertones', 'Rich gold metal frames', 'Cognac or warm brown acetate frames', 'Substantial shapes that complement your rich coloring']
    },
    hairColor: {
      bestColors: ['Rich brown', 'Auburn', 'Golden highlights', 'Copper'],
      avoidColors: ['Cool colors', 'Ash tones', 'Black', 'Platinum'],
      guidance: 'True Autumns shine in rich, warm hair colors that echo autumn leaves.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/6oshETYvm',
      foundation: "Warm undertones - golden, bronze, or warm beige bases",
      
      eyeshadowPalettes: [
        {
          name: "Autumn Earth",
          colors: ["Golden brown", "Rust", "Bronze", "Cream"],
          description: "Rich earth tones for your natural beauty"
        },
        {
          name: "Harvest Gold",
          colors: ["Golden yellow", "Warm brown", "Bronze", "Copper"],
          description: "Golden tones that enhance your warmth"
        },
        {
          name: "Forest Floor",
          colors: ["Olive green", "Brown", "Gold", "Rust"],
          description: "Natural greens and browns for earthy looks"
        },
        {
          name: "Spice Market",
          colors: ["Cinnamon", "Paprika", "Golden brown", "Warm bronze"],
          description: "Warm spice tones for sophisticated glamour"
        }
      ],
      
      blushOptions: [
        "Peach - warm and natural",
        "Bronze - rich and sophisticated",
        "Warm coral - fresh autumn glow",
        "Rust - deep and earthy"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Warm coral", "Bronze", "Rust"]
        },
        {
          occasion: "Evening",
          shades: ["Warm red", "Deep bronze", "Rich rust"]
        },
        {
          occasion: "Professional",
          shades: ["Warm brown", "Bronze nude", "Soft rust"]
        }
      ],
      
      eyeliner: "Brown, bronze, or olive green",
      mascara: "Brown or warm black",
      tips: "Your makeup should be rich and warm, enhancing your natural earthiness. Think golden colors that make you look healthy and radiant with autumn's richness."
    },
    celebrities: ['Ana de Armas', 'Beyoncé', 'Julianne Moore']
  },

  'Dark Autumn': {
    season: 'Dark Autumn',
    overview: {
      keyCharacteristics: [
        'Warm-neutral undertones',
        'High contrast level',
        'Deep & rich chroma (sophisticated, darker colors)',
        'Deep value range'
      ],
      signatureColors: [
        'Deep Forest (#013220)',
        'Chocolate Brown (#3C1810)',
        'Burgundy Wine (#722F37)',
        'Deep Rust (#B22222)',
        'Hunter Green (#355E3B)',
        'Espresso (#362D1D)',
        'Deep Gold (#B8860B)',
        'Charcoal (#36454F)'
      ],
      colorsToAvoid: [
        'Light Colors', 'Pastels', 'Bright Colors', 'Cool Colors',
        'Pink', 'Light Blue', 'White', 'Silver', 'Icy Tones', 'Neon Colors'
      ],
      description: 'Dark Autumn represents sophisticated depth with rich, dark warm colors. You can handle the deepest, most luxurious colors with elegance. Your features have enough contrast to carry dramatic, rich tones that create a powerful, sophisticated presence.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Dark Autumn Color Palette</h2>
          <p>Deep, rich colors with sophisticated warmth</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Dark Autumn palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#36454F', '#3C1810', '#654321', '#8B4513', '#2F4F4F', '#5D4037'],
      accentLights: ['#D2691E', '#CD853F', '#DEB887', '#F4A460', '#BC8F8F', '#A0522D'],
      accentBrights: ['#722F37', '#B22222', '#013220', '#355E3B', '#8B0000', '#556B2F']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/darkautumn',
      guidelines: [
        'Deep, rich colors are your power palette',
        'Chocolate brown can replace black',
        'Luxurious, sophisticated combinations',
        'Rich textures enhance your dramatic coloring'
      ]
    },
    accessories: {
      bestMetals: ['Gold', 'Bronze', 'Copper', 'Antique Gold', 'Brass'],
      metals: 'Gold, bronze, copper, antique gold, and brass in rich, deep finishes reflect your sophisticated, luxurious nature.',
      jewelryStyle: 'Substantial, sophisticated pieces with rich details and dramatic presence',
      jewelry: ['Heavy gold statement necklaces', 'Deep amber or garnet jewelry in rich settings', 'Vintage gold pieces with patina', 'Bold geometric designs with warm metals'],
      watches: ['Gold or bronze cases with dark leather straps', 'Rich burgundy or dark brown leather bands', 'Sophisticated complications in warm metals', 'Luxury timepieces with substantial presence'],
      glasses: ['Rich dark tortoiseshell with warm undertones', 'Deep gold metal frames', 'Dark burgundy or chocolate brown acetate', 'Bold, substantial frames that match your powerful presence']
    },
    hairColor: {
      bestColors: ['Dark brown', 'Deep auburn', 'Rich chocolate', 'Dark copper'],
      avoidColors: ['Light colors', 'Blonde', 'Cool tones', 'Ash colors'],
      guidance: 'Dark Autumns look stunning in deep, rich hair colors that match their sophisticated coloring.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/5RmF5PveK',
      foundation: "Deep warm undertones - golden, bronze, or olive bases",
      
      eyeshadowPalettes: [
        {
          name: "Deep Luxury",
          colors: ["Deep brown", "Forest green", "Burgundy", "Gold"],
          description: "Rich, sophisticated colors for dramatic looks"
        },
        {
          name: "Autumn Nights",
          colors: ["Espresso", "Dark copper", "Deep rust", "Bronze"],
          description: "Deep, warm tones for evening glamour"
        },
        {
          name: "Forest Depths",
          colors: ["Forest green", "Dark olive", "Brown", "Deep gold"],
          description: "Natural deep tones with sophisticated appeal"
        },
        {
          name: "Wine Country",
          colors: ["Burgundy", "Deep plum", "Dark bronze", "Rich brown"],
          description: "Luxurious wine tones for special occasions"
        }
      ],
      
      blushOptions: [
        "Deep bronze - rich and warm",
        "Warm burgundy - sophisticated depth",
        "Rich coral - deep autumn glow",
        "Dark rust - bold and earthy"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Deep bronze", "Wine", "Rich rust"]
        },
        {
          occasion: "Evening",
          shades: ["Deep burgundy", "Dark bronze", "Rich wine"]
        },
        {
          occasion: "Professional",
          shades: ["Dark bronze", "Deep rust", "Sophisticated brown"]
        }
      ],
      
      eyeliner: "Dark brown, forest green, or burgundy",
      mascara: "Dark brown or black",
      tips: "Your makeup should be rich and dramatic, matching your powerful coloring. Think deep, warm colors that create sophistication and intensity."
    },
    celebrities: ['Emily Ratajkowski', 'Julia Roberts', 'Tyla']
  },

  'Soft Autumn': {
    season: 'Soft Autumn',
    overview: {
      keyCharacteristics: [
        'Warm-neutral undertones (golden with some cool influence)',
        'Low contrast level (gentle blending between features)',
        'Muted & soft chroma (gentle, toned-down colors)',
        'Medium value range (avoiding light or dark extremes)',
        'Sophisticated coloring that harmonizes beautifully with muted tones',
        'Typically features hair with golden or ashy highlights and warm undertone skin',
        'Natural harmony with gentle, understated elegance'
      ],
      signatureColors: [
        'Sage Green (#9CAF88)',
        'Dusty Rose (#E8B4CB)',
        'Warm Taupe (#8B7765)',
        'Soft Brass (#B8860B)',
        'Mushroom (#DDD0C0)',
        'Soft Rust (#A0522D)',
        'Khaki (#F0E68C)',
        'Soft Olive (#BDB76B)'
      ],
      colorsToAvoid: [
        'Bright Colors', 'Pure White', 'Black', 'Electric Blue', 'Hot Pink', 
        'Orange', 'Bright Red', 'Pure Colors', 'High Contrast Combinations', 'Cool Grays'
      ],
      description: 'As a Soft Autumn, you possess gentle, muted coloring with warm undertones that creates a naturally harmonious appearance. Your features are characterized by low contrast and warm-neutral tones - typically hair with golden or ashy highlights, skin with warm undertones, and eyes that often appear hazel or have mixed colors. Your ideal palette draws from autumn\'s most subtle colors: sage green, dusty rose, warm taupe, and soft brass. These muted, warm colors enhance your natural sophistication and create beautiful tonal combinations.'
    },
    colorPalette: {
      htmlContent: `<div class="seasonal-palette">
        <div class="palette-header">
          <h2>Soft Autumn Color Palette</h2>
          <p>Muted, warm colors with gentle harmony</p>
        </div>
        <div class="color-grid">
          <!-- 64-color Soft Autumn palette rendered by component -->
        </div>
      </div>`,
      coreNeutrals: ['#F5F5DC', '#D2B48C', '#BC9A6A', '#8B7765', '#708090', '#696969'],
      accentLights: ['#F0E68C', '#DEB887', '#F4A460', '#BC8F8F', '#E8B4CB', '#D2B4DE'],
      accentBrights: ['#9CAF88', '#8FBC8F', '#BDB76B', '#556B2F', '#5F9EA0', '#CD5C5C']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/53u5QJ3To',
      guidelines: [
        'Your wardrobe should focus on tonal dressing and sophisticated, muted combinations',
        'Taupe and mushroom serve as your perfect neutral bases instead of black or white',
        'Create beautiful monochromatic looks using different shades of the same muted color family',
        'Patterns should be soft and blended - think watercolor effects, subtle tweeds, or gentle textures',
        'Choose fabrics with natural, understated elegance that complement your harmonious coloring',
        'Avoid bright colors and high contrast combinations that compete with your gentle presence',
        'Embrace soft, flowing silhouettes that enhance your naturally graceful aesthetic'
      ]
    },
    accessories: {
      bestMetals: ['Muted Gold', 'Rose Gold', 'Brass', 'Bronze', 'Antique Gold'],
      metals: 'Muted gold, rose gold, brass, bronze, and antique gold with soft, brushed finishes complement your harmonious, gentle coloring.',
      jewelryStyle: 'Soft, muted pieces with blended finishes that create harmony rather than contrast',
      jewelry: ['Muted gold chain necklaces with soft finishes', 'Rose gold pieces with natural gemstones', 'Vintage-inspired jewelry with gentle patina', 'Organic designs in warm, muted metals'],
      watches: ['Muted gold cases with soft finishes', 'Taupe, sage, or dusty rose leather straps', 'Vintage-inspired designs with gentle proportions', 'Soft, harmonious watch faces'],
      glasses: ['Soft taupe or sage green acetate frames', 'Muted gold wire frames with brushed finish', 'Gentle tortoiseshell with warm undertones', 'Soft, rounded shapes that enhance your harmonious features']
    },
    hairColor: {
      bestColors: ['Strawberry Blonde', 'Golden Blonde', 'Light Golden Brown', 'Medium Golden Brown'],
      avoidColors: [
        'Bright colors', 'High contrast', 'Pure golden tones', 
        'Very dark colors', 'Harsh highlights', 'Cool platinum tones'
      ],
      guidance: 'Soft Autumns typically have naturally light brown to dark blonde hair with mixed warm and cool tones. When coloring, maintain the muted, harmonious quality and avoid bright or high-contrast colors that would overwhelm your gentle, sophisticated presence.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/6QKrA6KaV',
      foundation: "Neutral to warm undertones with natural finish",
      
      eyeshadowPalettes: [
        {
          name: "Soft Earth",
          colors: ["Soft brown", "Taupe", "Mushroom", "Warm beige"],
          description: "Gentle earth tones for everyday sophistication"
        },
        {
          name: "Garden Mist",
          colors: ["Sage green", "Dusty rose", "Soft gray", "Cream"],
          description: "Muted nature tones for harmonious looks"
        },
        {
          name: "Autumn Haze",
          colors: ["Soft rust", "Warm taupe", "Dusty mauve", "Light bronze"],
          description: "Gentle autumn colors with sophisticated appeal"
        },
        {
          name: "Neutral Harmony",
          colors: ["Mushroom", "Soft khaki", "Dusty rose", "Warm gray"],
          description: "Perfect muted tones for professional settings"
        }
      ],
      
      blushOptions: [
        "Dusty rose - soft and sophisticated",
        "Soft peach - gentle warmth",
        "Muted coral - understated glow",
        "Soft bronze - natural depth"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Dusty rose", "Soft coral", "Warm nude"]
        },
        {
          occasion: "Evening",
          shades: ["Muted berry", "Soft plum", "Dusty mauve"]
        },
        {
          occasion: "Professional",
          shades: ["Soft taupe", "Muted rose", "Natural nude"]
        }
      ],
      
      eyeliner: "Soft brown, sage green, or dusty rose for gentle definition",
      mascara: "Brown or soft black",
      tips: "Your makeup should be soft and blended, creating a natural, sophisticated look. Think muted colors that blend seamlessly with your natural coloring for understated elegance."
    },
    celebrities: ['Drew Barrymore', 'Angelina Jolie', 'Jessica Biel']
  }
};