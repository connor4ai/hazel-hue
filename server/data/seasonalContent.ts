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
    metals: string;
    jewelry: string[];
    watches: string[];
    glasses: string[];
  };
  hairColor: {
    bestColors: string[];
    avoidColors: string[];
    guidance: string;
  };
  makeup: {
    pinterestUrl: string;
    guidelines: string[];
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
      htmlContent: `<!-- True Winter HTML palette content from user files -->`,
      coreNeutrals: ['#E8E8E8', '#6B7B7B', '#4A4A4A', '#1C1C1C'],
      accentLights: ['#FFB8E8', '#FFE8FC', '#E8B8E8', '#FCE4B8'],
      accentBrights: ['#E85AA0', '#4D9B4D', '#2E5F5F', '#5A3D5A']
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
      metals: 'Silver, White Gold, Platinum',
      jewelry: ['Bold silver pieces', 'Clear gemstones', 'High contrast designs'],
      watches: ['Silver with black or white bands', 'Clean, modern designs'],
      glasses: ['Black or silver frames', 'Bold, geometric shapes']
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
    celebrities: ['Anne Hathaway', 'Sandra Bullock', 'Megan Fox']
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
      htmlContent: `<!-- Bright Winter palette content -->`,
      coreNeutrals: ['#FFFFFF', '#000000', '#808080', '#C0C0C0'],
      accentLights: ['#FF1493', '#00FFFF', '#FFFF00', '#00FF80'],
      accentBrights: ['#0080FF', '#FF0000', '#8A2BE2', '#00FF80']
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
      metals: 'Bright Silver, Platinum, White Gold, Chrome',
      jewelry: ['Bold, statement pieces with clean geometric lines', 'Large, architectural pieces in bright metals'],
      watches: ['Bright silver, white gold, or high-tech materials like ceramic or titanium'],
      glasses: ['Bright silver, black, white, or even electric blue frames', 'Bold, modern shapes']
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
    celebrities: ['Megan Fox', 'Katy Perry', 'Adriana Lima']
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
      htmlContent: `<div class="dark-winter-palette">
        <div class="palette-header">
          <h2>Dark Winter Color Palette</h2>
          <p>Deep, sophisticated colors with cool undertones</p>
        </div>
        <div class="color-grid">
          <!-- Full 64-color palette rendered here -->
        </div>
      </div>`,
      coreNeutrals: [
        '#F8F8FF', '#696969', '#2F4F4F', '#000000', '#D3D3D3', '#C0C0C0', 
        '#36454F', '#A9A9A9', '#F5F5F5', '#708090', '#B0C4DE', '#F0F8FF'
      ],
      accentLights: [
        '#E6E6FA', '#F0E68C', '#C85A8A', '#FF69B4', '#FF1493', '#DCDCDC',
        '#DB7093', '#B0C4DE', '#ADD8E6', '#F0F8FF', '#GAINSBORO', '#SILVER'
      ],
      accentBrights: [
        '#8B1538', '#2E8B57', '#008B8B', '#191970', '#663399', '#DC143C',
        '#006400', '#4169E1', '#800080', '#800000', '#B22222', '#556B2F'
      ]
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
      metals: 'Silver, platinum, white gold, gunmetal, and oxidized silver are your sophisticated metals.',
      jewelry: [
        'Substantial, sophisticated pieces with rich details',
        'Ornate designs that maintain elegance',
        'Statement pieces in silver or platinum',
        'Geometric or vintage-inspired designs'
      ],
      watches: [
        'Dark metals with sophisticated complications',
        'Black leather bands or deep burgundy leather',
        'Gunmetal or black cases',
        'Classic luxury timepieces'
      ],
      glasses: [
        'Dark frames - black, gunmetal, deep burgundy',
        'Cool-toned dark tortoiseshell',
        'Sophisticated, substantial frame shapes',
        'Avoid warm browns or golden tones'
      ]
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
      'Sandra Bullock',
      'Salma Hayek', 
      'Viola Davis',
      'Anne Hathaway',
      'Courteney Cox',
      'Catherine Zeta-Jones'
    ]
  },
  'Bright Winter': {
    season: 'Bright Winter',
    overview: {
      keyCharacteristics: [
        'Cool undertones (blue or pink)',
        'Very high contrast between features',
        'Bright & clear chroma - needs the most saturated colors',
        'Full value range - can wear both very light and very dark colors'
      ],
      signatureColors: [
        'Electric Blue (#0080FF) - Your most stunning color',
        'True Red (#FF0000) - Bold and powerful',
        'Emerald Green (#00FF80) - Vibrant and sophisticated',
        'Hot Pink (#FF1493) - Bright and energetic',
        'Pure White (#FFFFFF) - Crisp and clean',
        'Jet Black (#000000) - Deep and dramatic',
        'Bright Purple (#8A2BE2) - Regal and striking',
        'Lemon Yellow (#FFFF00) - Your brightest, clearest yellow'
      ],
      colorsToAvoid: [
        'Peach', 'Coral', 'Orange', 'Warm Yellow', 'Golden Brown', 'Olive Green',
        'Dusty Colors', 'Muted Tones', 'Sage Green', 'Taupe', 'Beige', 'Cream',
        'Rust', 'Terracotta'
      ],
      description: 'You are a Bright Winter, possessing striking, high-contrast coloring that can handle the most intense colors in the spectrum. Your features are characterized by cool undertones with dramatic contrast - often dark hair, pale skin, and bright, piercing eyes. Your palette consists of the most saturated, cool-toned colors: true red, royal blue, emerald green, and pure white. These bold colors complement your naturally dramatic appearance and ensure you look powerful and commanding.'
    },
    colorPalette: {
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bright Winter Color Palette</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f0f2f8 0%, #e0e4f0 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #fefefe;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: #ffffff;
            color: #2c2c2c;
            padding: 60px 30px;
            text-align: center;
            border-bottom: 1px solid #e8e8e8;
        }
        
        .header h1 {
            margin: 0;
            font-size: 4em;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        .header p {
            margin: 12px 0 0 0;
            font-size: 1em;
            font-weight: 400;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #666666;
        }
        
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 16px;
            padding: 50px 40px;
            background: #fefefe;
        }
        
        .color-swatch {
            position: relative;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .color-swatch:hover {
            transform: translateY(-4px) scale(1.02);
            z-index: 10;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }
        
        .color-top {
            height: 120px;
            width: 100%;
            position: relative;
        }
        
        .color-info {
            background: white;
            padding: 12px 8px 8px 8px;
            text-align: center;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .color-name {
            font-size: 0.7em;
            font-weight: 600;
            color: #2c2c2c;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        
        .color-code {
            font-size: 0.65em;
            font-weight: 400;
            color: #666666;
            font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BRIGHT WINTER</h1>
            <p>12 Season Color Analysis Palette</p>
        </div>
        
        <div class="palette-grid">
            <div class="color-swatch"><div class="color-top" style="background-color: #FFFFFF;"></div><div class="color-info"><div class="color-name">Pure White</div><div class="color-code">#FFFFFF</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #8B9B8B;"></div><div class="color-info"><div class="color-name">Cool Grey</div><div class="color-code">#8B9B8B</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #C4577A;"></div><div class="color-info"><div class="color-name">Rose</div><div class="color-code">#C4577A</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #E6004C;"></div><div class="color-info"><div class="color-name">Bright Pink</div><div class="color-code">#E6004C</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #8B2F8B;"></div><div class="color-info"><div class="color-name">Magenta</div><div class="color-code">#8B2F8B</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #00A651;"></div><div class="color-info"><div class="color-name">Kelly Green</div><div class="color-code">#00A651</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #008B8B;"></div><div class="color-info"><div class="color-name">Teal</div><div class="color-code">#008B8B</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #4169E1;"></div><div class="color-info"><div class="color-name">Royal Blue</div><div class="color-code">#4169E1</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #F5F5DC;"></div><div class="color-info"><div class="color-name">Cream</div><div class="color-code">#F5F5DC</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #2F4F4F;"></div><div class="color-info"><div class="color-name">Dark Grey</div><div class="color-code">#2F4F4F</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #FFD700;"></div><div class="color-info"><div class="color-name">Bright Yellow</div><div class="color-code">#FFD700</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #DC143C;"></div><div class="color-info"><div class="color-name">Crimson</div><div class="color-code">#DC143C</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #8B008B;"></div><div class="color-info"><div class="color-name">Dark Magenta</div><div class="color-code">#8B008B</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #228B22;"></div><div class="color-info"><div class="color-name">Forest Green</div><div class="color-code">#228B22</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #20B2AA;"></div><div class="color-info"><div class="color-name">Light Sea Green</div><div class="color-code">#20B2AA</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #0000FF;"></div><div class="color-info"><div class="color-name">True Blue</div><div class="color-code">#0000FF</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #696969;"></div><div class="color-info"><div class="color-name">Dim Grey</div><div class="color-code">#696969</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #000000;"></div><div class="color-info"><div class="color-name">True Black</div><div class="color-code">#000000</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #FFFF00;"></div><div class="color-info"><div class="color-name">Pure Yellow</div><div class="color-code">#FFFF00</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #FF1493;"></div><div class="color-info"><div class="color-name">Deep Pink</div><div class="color-code">#FF1493</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #FF00FF;"></div><div class="color-info"><div class="color-name">Fuchsia</div><div class="color-code">#FF00FF</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #8B4513;"></div><div class="color-info"><div class="color-name">Saddle Brown</div><div class="color-code">#8B4513</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #00CED1;"></div><div class="color-info"><div class="color-name">Dark Turquoise</div><div class="color-code">#00CED1</div></div></div>
            <div class="color-swatch"><div class="color-top" style="background-color: #191970;"></div><div class="color-info"><div class="color-name">Midnight Blue</div><div class="color-code">#191970</div></div></div>
        </div>
    </div>
</body>
</html>`,
      coreNeutrals: ['#FFFFFF', '#8B9B8B', '#2F4F4F', '#696969', '#000000', '#F5F5DC'],
      accentLights: ['#FFD700', '#FFFF00', '#20B2AA', '#00CED1', '#C4577A', '#E6004C'],
      accentBrights: ['#FF1493', '#FF00FF', '#8B2F8B', '#8B008B', '#4169E1', '#0000FF', '#191970', '#00A651', '#228B22', '#008B8B', '#DC143C', '#8B4513']
    },
    clothing: {
      pinterestUrl: 'https://pin.it/3N5d043Xa',
      guidelines: [
        'Build wardrobe around high-impact statement pieces',
        'Electric blue can serve as a neutral for you',
        'Black and white create perfect contrast',
        'Choose bold, geometric patterns with high contrast',
        'You can wear head-to-toe bright colors',
        'Think runway fashion and high-fashion editorial looks'
      ]
    },
    accessories: {
      bestMetals: ["Bright Silver - Polished and reflective", "Platinum - Pure and pristine", "White Gold - Modern and clean", "Chrome - Shiny and contemporary"],
      jewelryStyle: "Choose bold, statement pieces with clean geometric lines. Your jewelry should be as dramatic as your coloring. Think large, architectural pieces in bright metals.",
      watches: "Bright silver, white gold, or high-tech materials like ceramic or titanium. Avoid anything muted or vintage-looking.",
      glasses: "Bright silver, black, white, or even electric blue frames. Bold, modern shapes work best.",
      description: "Your accessories should match your electric personality with bold, contemporary designs in the brightest metals."
    },
    hairColor: {
      bestColors: [
        'Jet Black - Maximum contrast and drama',
        'Platinum Blonde - If going light, go all the way',
        'Cool Dark Brown - Rich and intense',
        'Bold Fashion Colors - Electric blue, bright purple, hot pink',
        'Silver/White - Striking and modern'
      ],
      avoidColors: [
        'Any warm tones',
        'Golden highlights',
        'Auburn',
        'Copper',
        'Muddy colors'
      ],
      guidance: 'Bright Winters often have naturally dark hair with high contrast against pale skin. Your hair should either be dramatically dark or dramatically light - no in-between tones.'
    },
    makeup: {
      pinterestUrl: 'https://pin.it/1RvCERX0Z',
      foundation: "Cool undertones only - pink or neutral bases",
      
      eyeshadowPalettes: [
        {
          name: "Electric Drama",
          colors: ["Electric blue", "Bright purple", "Silver", "Pure white"],
          description: "High-voltage colors for maximum impact"
        },
        {
          name: "Bold Brights",
          colors: ["Emerald green", "Hot pink", "Bright yellow", "Black"],
          description: "Saturated colors that match your electric energy"
        },
        {
          name: "Neon Nights",
          colors: ["Electric purple", "Bright turquoise", "Hot pink", "White"],
          description: "For when you want to make a statement"
        },
        {
          name: "High Contrast",
          colors: ["Pure black", "Pure white", "Bright red", "Electric blue"],
          description: "Maximum contrast for dramatic looks"
        }
      ],
      
      blushOptions: [
        "Bright pink - electric and fun",
        "Cool rose - vibrant and fresh",
        "Berry - bold and striking",
        "Hot pink - maximum impact"
      ],
      
      lipstickCollections: [
        {
          occasion: "Daily Wear",
          shades: ["Bright red", "Hot pink", "Electric berry"]
        },
        {
          occasion: "Evening",
          shades: ["Electric purple", "Bright red", "Hot pink"]
        },
        {
          occasion: "Statement",
          shades: ["Electric blue", "Bright purple", "Neon pink"]
        }
      ],
      
      eyeliner: "Jet black, bright blue, purple, or white for drama",
      mascara: "Black or colored mascara for bold looks",
      tips: "You can handle the most dramatic makeup looks. Think bold eyes with bold lips - combinations that would look costume-like on others work beautifully on you."
    },
    celebrities: ['Megan Fox', 'Katy Perry', 'Adriana Lima']
  },
  "True Winter": {
    season: "True Winter",
    overview: {
      keyCharacteristics: [
        "Undertone: Cool (blue, pink, or neutral-cool undertones)",
        "Contrast Level: High (striking difference between hair, skin, and eye colors)",
        "Chroma: Clear & Saturated (can handle pure, undiluted colors)",
        "Value: Medium to Deep (looks best in colors with substance and depth)"
      ],
      signatureColors: [
        "#DC143C", // True Red - Your power color that enhances your natural intensity
        "#000080", // Navy Blue - Your perfect neutral that works as well as black
        "#50C878", // Emerald Green - Brings out any green in your eyes and complements your cool tones
        "#FFFFFF", // Pure White - Your ideal light neutral, crisp and clean
        "#800020", // Deep Burgundy - Rich and sophisticated, perfect for formal occasions
        "#4169E1", // Royal Blue - Enhances your natural regality and confidence
        "#36454F", // Charcoal Grey - Your softer neutral alternative to black
        "#FF1493"  // Fuchsia Pink - Your best pink option with cool undertones
      ],
      colorsToAvoid: [
        "Orange, Peach, Coral, Warm Yellow, Golden Brown",
        "Sage Green, Dusty Rose, Beige, Taupe, Cream",
        "Rust, Olive, Terracotta, Camel, Ivory"
      ],
      description: "You are a True Winter, characterized by your cool undertones and high natural contrast that creates a striking, sophisticated appearance. Your coloring typically features dark hair, cool-toned skin, and eyes that are often dark or strikingly light in contrast. Your ideal palette draws from winter's most elegant colors: deep burgundy, navy blue, emerald green, and crisp white. These colors enhance your natural drama and complement your cool undertones beautifully. Stay away from warm, golden, or muted colors that will clash with your cool coloring and make you appear sallow or tired."
    },
    colorPalette: {
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>True Winter Color Palette</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f0f2f5 0%, #e0e4e8 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #fefefe;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: #ffffff;
            color: #2c2c2c;
            padding: 60px 30px;
            text-align: center;
            border-bottom: 1px solid #e8e8e8;
        }
        
        .header h1 {
            margin: 0;
            font-size: 4em;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        .header p {
            margin: 12px 0 0 0;
            font-size: 1em;
            font-weight: 400;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #666666;
        }
        
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 16px;
            padding: 50px 40px;
            background: #fefefe;
        }
        
        .color-swatch {
            position: relative;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .color-swatch:hover {
            transform: translateY(-4px) scale(1.02);
            z-index: 10;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }
        
        .color-top {
            height: 120px;
            width: 100%;
            position: relative;
        }
        
        .color-info {
            background: white;
            padding: 12px 8px 8px 8px;
            text-align: center;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .color-name {
            font-size: 0.7em;
            font-weight: 600;
            color: #2c2c2c;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        
        .color-code {
            font-size: 0.65em;
            font-weight: 400;
            color: #666666;
            font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
            letter-spacing: 0.5px;
        }
        
        .footer {
            text-align: center;
            padding: 30px 20px;
            color: #666666;
            font-size: 0.9em;
            background: linear-gradient(135deg, #f0f2f5 0%, #fefefe 100%);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .palette-grid {
                grid-template-columns: repeat(4, 1fr);
                padding: 30px 20px;
                gap: 12px;
            }
            
            .color-top {
                height: 100px;
            }
            
            .color-info {
                padding: 10px 6px 6px 6px;
            }
            
            .color-name {
                font-size: 0.65em;
            }
            
            .color-code {
                font-size: 0.6em;
            }
            
            .header h1 {
                font-size: 2.4em;
                letter-spacing: 4px;
            }
            
            .header p {
                font-size: 0.95em;
                letter-spacing: 1px;
            }
        }
        
        @media (max-width: 480px) {
            .palette-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
            }
            
            .color-top {
                height: 80px;
            }
            
            .color-info {
                padding: 8px 4px 4px 4px;
            }
            
            .color-name {
                font-size: 0.6em;
                margin-bottom: 2px;
            }
            
            .color-code {
                font-size: 0.55em;
            }
            
            .header h1 {
                font-size: 2em;
                letter-spacing: 3px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TRUE WINTER</h1>
            <p>12 Season Color Analysis Palette</p>
        </div>
        
        <div class="palette-grid">
            <!-- Row 1 -->
            <div class="color-swatch">
                <div class="color-top" style="background-color: #E8E8E8;"></div>
                <div class="color-info">
                    <div class="color-name">Ice White</div>
                    <div class="color-code">#E8E8E8</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #6B7B7B;"></div>
                <div class="color-info">
                    <div class="color-name">Cool Grey</div>
                    <div class="color-code">#6B7B7B</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #FCE4B8;"></div>
                <div class="color-info">
                    <div class="color-name">Icy Yellow</div>
                    <div class="color-code">#FCE4B8</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #4D9B4D;"></div>
                <div class="color-info">
                    <div class="color-name">Emerald</div>
                    <div class="color-code">#4D9B4D</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #2E5F5F;"></div>
                <div class="color-info">
                    <div class="color-name">Teal</div>
                    <div class="color-code">#2E5F5F</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #FFB8E8;"></div>
                <div class="color-info">
                    <div class="color-name">Bright Pink</div>
                    <div class="color-code">#FFB8E8</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #E85AA0;"></div>
                <div class="color-info">
                    <div class="color-name">Fuchsia</div>
                    <div class="color-code">#E85AA0</div>
                </div>
            </div>
            <div class="color-swatch">
                <div class="color-top" style="background-color: #5A3D5A;"></div>
                <div class="color-info">
                    <div class="color-name">Eggplant</div>
                    <div class="color-code">#5A3D5A</div>
                </div>
            </div>
            
            <!-- More rows will be added based on the full palette data -->
        </div>
        
        <div class="footer">
            <p>Professional Color Analysis • HueMatcher</p>
        </div>
    </div>
</body>
</html>`,
      coreNeutrals: ["#1C1C1C", "#FCFCFC", "#6B7B7B", "#4A4A4A"],
      accentLights: ["#E8E8E8", "#D4D4D4", "#B8B8B8", "#FFE8FC"],
      accentBrights: ["#E8201C", "#1C7A9B", "#E85A9B", "#7A3D7A"]
    },
    clothing: {
      pinterestUrl: "https://pin.it/5msDn2lWd",
      guidelines: [
        "Build your wardrobe around signature colors for maximum impact",
        "Navy blue serves as your primary neutral - use it where others would use brown or beige",
        "Black is excellent for formal wear, while charcoal grey offers a softer alternative",
        "Your reds should be true and clear, your greens should be emerald or forest tones",
        "Patterns work best when they incorporate signature colors in high contrast combinations",
        "Avoid anything with warm undertones, dusty finishes, or muted qualities"
      ]
    },
    accessories: {
      metals: "Silver, platinum, white gold, and gunmetal are your most flattering metal choices. These cool-toned metals complement your natural coloring perfectly.",
      jewelry: [
        "Choose pieces with clean lines and geometric shapes",
        "Your jewelry should have the same clarity and boldness as your color palette",
        "Silver, platinum, and white gold are ideal",
        "Avoid ornate, vintage, or overly decorative pieces that compete with your natural drama"
      ],
      watches: [
        "Silver, white gold, or black metal watch faces work best",
        "Leather bands should be black, navy, or deep burgundy",
        "Never brown or tan leather straps",
        "Choose modern, sophisticated designs"
      ],
      glasses: [
        "Silver, gunmetal, black, or navy frames work best",
        "Bold, geometric shapes complement your high-contrast features",
        "Avoid gold, tortoiseshell, or warm brown frames"
      ]
    },
    hairColor: {
      bestColors: [
        "Natural Black - Classic and striking",
        "Cool Dark Brown - Rich without warmth",
        "Ash Blonde - If going lighter, keep it cool-toned",
        "Silver/Grey - Elegant and sophisticated when going natural",
        "Bold Colors - Deep burgundy, navy blue, or other signature colors for adventurous choices"
      ],
      avoidColors: [
        "Warm browns",
        "Golden blonde", 
        "Auburn or copper",
        "Any hair color with golden or red undertones"
      ],
      guidance: "True Winters typically have naturally dark hair - deep brown, black, or very dark blonde with cool undertones. Your hair color should maintain the cool undertones that complement your natural coloring."
    },
    makeup: {
      pinterestUrl: "https://pin.it/4jTgHGE0j",
      guidelines: [
        "Your makeup should be as bold and clear as your clothing colors",
        "Think dramatic eyes, true red lips, and clean, cool-toned base products",
        "Foundation: Look for cool or neutral undertones - pink, beige, or neutral bases",
        "Lipstick: True red, deep burgundy, fuchsia pink, berry tones",
        "Eyeshadow: Navy, charcoal, emerald, silver, white, deep purple",
        "Blush: Cool pink, berry, or rose tones",
        "Eyeliner: Black, navy, or deep burgundy"
      ]
    },
    celebrities: [
      "Anne Hathaway",
      "Courteney Cox", 
      "Megan Fox"
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
      htmlContent: `<!-- Cool Winter HTML palette would go here -->`,
      coreNeutrals: ["#2F4F4F", "#F0F8FF", "#708090", "#696969"],
      accentLights: ["#E6E6FA", "#B0C4DE", "#D8BFD8", "#F0FFFF"],
      accentBrights: ["#4B0082", "#20B2AA", "#8B008B", "#4682B4"]
    },
    clothing: {
      pinterestUrl: "https://pinterest.com/coolwinter",
      guidelines: [
        "Choose sophisticated blues and purples as your foundation",
        "Gray serves as your perfect neutral - from charcoal to light gray",
        "Cool pinks and roses work beautifully for feminine touches",
        "Avoid warm undertones but can handle slightly muted versions of clear colors"
      ]
    },
    accessories: {
      metals: "Silver and white gold are ideal. Cool-toned metals complement your refined coloring.",
      jewelry: ["Silver statement pieces", "Cool-toned gemstones", "Sophisticated geometric designs"],
      watches: ["Silver or white gold", "Cool gray leather straps", "Classic, refined designs"],
      glasses: ["Silver or cool gray frames", "Sophisticated shapes", "Avoid warm tones"]
    },
    hairColor: {
      bestColors: ["Ash brown", "Cool black", "Silver highlights", "Cool blonde shades"],
      avoidColors: ["Golden blonde", "Warm browns", "Auburn", "Copper tones"],
      guidance: "Cool undertones are essential. Your hair should complement your sophisticated, cool coloring."
    },
    makeup: {
      pinterestUrl: "https://pinterest.com/coolwintermakeup",
      guidelines: [
        "Cool-toned foundation with pink or neutral undertones",
        "Berry and cool pink lipsticks",
        "Cool gray and purple eyeshadows",
        "Silver and cool-toned highlighters"
      ]
    },
    celebrities: ["Sandra Bullock", "Reese Witherspoon", "Jamie Lee Curtis"]
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
      htmlContent: `<!-- Deep Winter HTML palette would go here -->`,
      coreNeutrals: ["#000080", "#FFFFFF", "#2F4F4F", "#191970"],
      accentLights: ["#E0E0E0", "#F0F8FF", "#E6E6FA", "#F5F5F5"],
      accentBrights: ["#800080", "#008B8B", "#8B0000", "#8B008B"]
    },
    clothing: {
      pinterestUrl: "https://pinterest.com/deepwinter",
      guidelines: [
        "Embrace deep, rich colors as your signature",
        "Navy and deep gray are your perfect neutrals",
        "Rich jewel tones look incredible on you",
        "Avoid light, washed-out colors that diminish your natural intensity"
      ]
    },
    accessories: {
      metals: "Silver, white gold, and platinum enhance your deep coloring beautifully.",
      jewelry: ["Bold silver pieces", "Deep gemstones", "Dramatic designs"],
      watches: ["Silver or black metal", "Deep colored straps", "Bold, substantial designs"],
      glasses: ["Black or silver frames", "Bold, dramatic shapes", "Avoid light colors"]
    },
    hairColor: {
      bestColors: ["Deep black", "Dark brown", "Deep burgundy", "Rich chocolate"],
      avoidColors: ["Light blonde", "Golden tones", "Light brown", "Warm highlights"],
      guidance: "Your hair should match your natural depth and intensity. Deep, rich colors are most flattering."
    },
    makeup: {
      pinterestUrl: "https://pinterest.com/deepwintermakeup",
      guidelines: [
        "Rich, deep foundation tones",
        "Bold, deep lip colors",
        "Dramatic eye makeup",
        "Deep, rich color palette throughout"
      ]
    },
    celebrities: ["Sandra Bullock", "Salma Hayek", "Viola Davis"]
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
      metals: "Silver and white gold are most flattering for your cool, gentle coloring.",
      jewelry: ["Delicate silver pieces", "Soft-colored gemstones", "Elegant, refined designs"],
      watches: ["Silver with soft straps", "Gentle colors", "Classic, elegant styles"],
      glasses: ["Silver or soft gray frames", "Gentle, rounded shapes", "Avoid harsh angles"]
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
    celebrities: ["Grace Kelly", "Gwyneth Paltrow", "Cate Blanchett"]
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
      bestMetals: ["Silver - Light and delicate", "White Gold - Soft and refined", "Platinum - Understated luxury", "Light Pewter - Soft and muted"],
      jewelryStyle: "Choose delicate, feminine pieces with intricate details. Your jewelry should be as light and airy as your coloring. Think fine chains, small pearls, and delicate gemstones.",
      watches: "Light metals with small faces. Soft leather bands in light colors like powder blue or soft pink.",
      glasses: "Light-colored frames in silver, light gray, or soft pastels. Avoid dark or heavy frames.",
      description: "Your accessories should complement your light, delicate nature with understated elegance and cool metal tones."
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
      htmlContent: `<!-- Soft Summer HTML palette would go here -->`,
      coreNeutrals: ["#708090", "#F5F5DC", "#BC8F8F", "#D3D3D3"],
      accentLights: ["#E6E6FA", "#F0F8FF", "#FFE4E1", "#F5F5F5"],
      accentBrights: ["#9370DB", "#20B2AA", "#CD5C5C", "#6495ED"]
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
      bestMetals: ["Muted Silver - Soft and refined", "Pewter - Gentle and understated", "White Gold - Cool and elegant", "Soft Platinum - Understated luxury"],
      jewelryStyle: "Choose pieces with soft, muted finishes that blend harmoniously with your coloring. Avoid high-contrast or shiny pieces that compete with your gentle nature.",
      watches: "Soft metals with muted straps in gray, dusty rose, or soft beige. Choose gentle, understated styles.",
      glasses: "Soft gray, muted frames, or gentle tortoiseshell. Avoid stark contrasts or bright colors.",
      description: "Your accessories should complement your muted elegance with soft, blended finishes that enhance your natural harmony."
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
    celebrities: ["Jennifer Aniston", "Adriana Lima", "Cara Delevingne"]
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
      htmlContent: `<div class="palette-grid"><!-- True Spring 64-color palette --></div>`,
      coreNeutrals: ['#FFFFF0', '#F5DEB3', '#D2691E', '#8B4513'],
      accentLights: ['#FFCBA4', '#FFD700', '#87CEEB', '#98FB98'],
      accentBrights: ['#FF7F50', '#FF8C00', '#7CFC00', '#4CBB17']
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
      metals: 'Gold, Brass, Copper',
      jewelry: ['Warm gold pieces', 'Coral and turquoise stones', 'Bright, clear gems'],
      watches: ['Gold with warm-toned bands', 'Fresh, sporty designs'],
      glasses: ['Warm tortoiseshell', 'Golden frames', 'Fresh, youthful styles']
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
    celebrities: ['Emma Stone', 'Mila Jojovich', 'Jane Levy']
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
      htmlContent: `<div class="palette-grid"><!-- Bright Spring 64-color palette --></div>`,
      coreNeutrals: ['#FFFFFF', '#F0F8FF', '#FFE4B5', '#CD853F'],
      accentLights: ['#FFFF00', '#40E0D0', '#98FB98', '#FFB6C1'],
      accentBrights: ['#FF6347', '#FF4500', '#32CD32', '#FF00FF']
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
      metals: 'Bright Gold, Rose Gold',
      jewelry: ['Bold, bright pieces', 'Vibrant gemstones', 'Statement jewelry'],
      watches: ['Bright metals with colorful bands', 'Bold, modern designs'],
      glasses: ['Bright frames', 'Bold colors', 'Statement styles']
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
    celebrities: ['Jennifer Lopez', 'Beyoncé', 'Priyanka Chopra']
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
      htmlContent: `<div class="palette-grid"><!-- Light Spring 64-color palette --></div>`,
      coreNeutrals: ['#FFFDD0', '#F5F5DC', '#DEB887', '#CD853F'],
      accentLights: ['#FFCBA4', '#FFCCCB', '#7FFFD4', '#90EE90'],
      accentBrights: ['#F08080', '#FFD700', '#32CD32', '#87CEEB']
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
      metals: 'Light Gold, Rose Gold',
      jewelry: ['Delicate gold pieces', 'Light, warm gems', 'Gentle designs'],
      watches: ['Light metals with soft bands', 'Delicate, feminine styles'],
      glasses: ['Light frames', 'Warm tones', 'Gentle shapes']
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
    celebrities: ['Blake Lively', 'Reese Witherspoon', 'Taylor Swift']
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
      htmlContent: `<div class="palette-grid"><!-- True Autumn 64-color palette --></div>`,
      coreNeutrals: ['#F5F5DC', '#D2691E', '#8B4513', '#654321'],
      accentLights: ['#DEB887', '#F4A460', '#CD853F', '#D2B48C'],
      accentBrights: ['#B7410E', '#CC5500', '#355E3B', '#800020']
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
      bestMetals: ["Gold - Your most flattering metal choice", "Brass - Warm and vintage", "Copper - Rich and earthy", "Bronze - Deep and sophisticated", "Antique Gold - Rich and textured"],
      jewelryStyle: "Choose substantial pieces with warm metals and organic designs. Your jewelry should reflect your rich, earthy nature. Think chunky gold pieces, amber, and warm gemstones.",
      watches: "Gold or bronze with warm leather bands in brown, tan, or cognac. Classic or vintage styles work well.",
      glasses: "Warm-toned frames in gold, warm tortoiseshell, brown, or cognac. Rich, substantial frames complement your features.",
      description: "Your accessories should embody the richness of autumn with substantial, warm metals and earthy, organic designs."
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
    celebrities: ['Ana de Armas', 'Beyonce', 'Julianne Moore']
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
      htmlContent: `<div class="palette-grid"><!-- Dark Autumn 64-color palette --></div>`,
      coreNeutrals: ['#36454F', '#3C1810', '#654321', '#8B4513'],
      accentLights: ['#D2691E', '#CD853F', '#DEB887', '#F4A460'],
      accentBrights: ['#722F37', '#B22222', '#013220', '#355E3B']
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
      bestMetals: ["Gold - Rich and warm", "Bronze - Deep and sophisticated", "Copper - Warm and striking", "Antique Gold - Rich and textured", "Brass - Warm and vintage"],
      jewelryStyle: "Choose substantial, sophisticated pieces with rich details and warm metals. Your jewelry can be bold and dramatic to match your powerful coloring.",
      watches: "Gold or bronze with dark leather bands in brown, burgundy, or black. Sophisticated, substantial styles work best.",
      glasses: "Rich, warm frames in gold, dark tortoiseshell, burgundy, or dark brown. Bold, substantial frames complement your strong features.",
      description: "Your accessories should reflect your sophisticated depth with rich, luxurious materials and substantial designs that match your powerful presence."
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
    celebrities: ['Emily Ratajkowski', 'Tyla', 'Julia Roberts']
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
      htmlContent: `
        <div class="palette-grid">
          <!-- Soft Autumn 64-color palette will be rendered by component -->
        </div>
      `,
      coreNeutrals: [
        '#F5F5DC', '#F0E68C', '#D2B48C', '#DDD0C0', '#BC9A6A', '#8B7765',
        '#708090', '#696969', '#F5DEB3', '#DAA520', '#B8860B', '#CD853F'
      ],
      accentLights: [
        '#DEB887', '#D2691E', '#A0522D', '#8B4513', '#F0B27A', '#E8B4CB',
        '#D2B4DE', '#BC8F8F', '#CD5C5C', '#A0522D', '#8B4C5C', '#9B4444'
      ],
      accentBrights: [
        '#9CAF88', '#8FBC8F', '#6B8E23', '#BDB76B', '#808000', '#556B2F',
        '#20B2AA', '#5F9EA0', '#008080', '#4682B4', '#6495ED', '#708090'
      ]
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
      bestMetals: ["Muted Gold - Soft and warm", "Rose Gold - Gentle and feminine", "Brass - Warm but not too bright", "Bronze - Muted and sophisticated", "Antique Gold - Soft, aged finish"],
      jewelryStyle: "Choose pieces with soft, muted finishes rather than highly polished metals. Your jewelry should blend harmoniously with your coloring rather than create contrast.",
      watches: "Muted metals with soft leather bands in taupe, sage, or dusty rose. Avoid shiny or high-contrast styles.",
      glasses: "Soft, muted frames in taupe, sage green, dusty rose, or soft gold. Avoid sharp contrasts or bright colors.",
      description: "Your accessories should complement your understated elegance with soft, muted finishes that enhance your natural harmony."
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