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
    celebrities: ["Demi Moore", "Catherine Zeta-Jones", "Lucy Liu"]
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
      pinterestUrl: "https://pinterest.com/truesummer",
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
      pinterestUrl: "https://pinterest.com/truesummermakeup",
      guidelines: [
        "Soft, cool-toned foundation",
        "Muted pink and rose lipsticks",
        "Gentle gray and purple eyeshadows",
        "Soft, blended makeup application"
      ]
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
      pinterestUrl: "https://pinterest.com/lightsummer",
      guidelines: [
        "Light blues and lavenders are perfect for you",
        "White and light gray are your ideal neutrals",
        "Soft pastels enhance your delicate beauty",
        "Avoid dark, heavy colors that overpower your gentle features"
      ]
    },
    accessories: {
      metals: "Silver and white gold in delicate styles complement your light coloring.",
      jewelry: ["Delicate silver chains", "Light-colored gemstones", "Feminine, airy designs"],
      watches: ["Light metals", "Soft, light-colored straps", "Delicate, refined styles"],
      glasses: ["Light silver or clear frames", "Soft, gentle shapes", "Avoid bold, dark frames"]
    },
    hairColor: {
      bestColors: ["Light ash blonde", "Platinum", "Light gray", "Cool light brown"],
      avoidColors: ["Dark colors", "Warm tones", "Golden blonde", "Red"],
      guidance: "Light, cool colors that maintain your delicate, ethereal appearance work best."
    },
    makeup: {
      pinterestUrl: "https://pinterest.com/lightsummermakeup",
      guidelines: [
        "Light, cool-toned foundation",
        "Soft pink and rose lip colors",
        "Light, shimmery eyeshadows",
        "Gentle, natural makeup application"
      ]
    },
    celebrities: ["Naomi Watts", "Scarlett Johansson", "Michelle Pfeiffer"]
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
      pinterestUrl: "https://pinterest.com/softsummer",
      guidelines: [
        "Muted blues and purples are your signature",
        "Soft gray and muted beige work as neutrals",
        "Blended, harmonious colors suit you best",
        "Avoid high contrast and bright, clear colors"
      ]
    },
    accessories: {
      metals: "Muted silver and soft metals complement your gentle coloring.",
      jewelry: ["Soft silver pieces", "Muted gemstones", "Harmonious, blended designs"],
      watches: ["Soft metals", "Muted straps", "Gentle, understated styles"],
      glasses: ["Soft gray or muted frames", "Gentle shapes", "Avoid stark contrasts"]
    },
    hairColor: {
      bestColors: ["Soft brown", "Muted blonde", "Cool gray", "Gentle highlights"],
      avoidColors: ["Bright colors", "Golden tones", "Harsh black", "Vivid red"],
      guidance: "Soft, muted colors that blend with your natural coloring are most flattering."
    },
    makeup: {
      pinterestUrl: "https://pinterest.com/softsummermakeup",
      guidelines: [
        "Muted, cool-toned foundation",
        "Soft, muted lip colors",
        "Blended, harmonious eyeshadows",
        "Gentle, natural makeup look"
      ]
    },
    celebrities: ["Sarah Jessica Parker", "Meryl Streep", "Jennifer Aniston"]
  }
};