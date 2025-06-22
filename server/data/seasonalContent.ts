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
  }
  // Additional seasons will be added here
};