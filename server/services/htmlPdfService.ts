import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

interface ColorAnalysisResult {
  season: string;
  description: string;
  coreNeutrals: string[];
  accentLights: string[];
  accentBrights: string[];
  recommendations: {
    metals: string;
    eyewear: string;
    makeup: string;
  };
}

class HTMLPDFService {
  private readonly expandedColorPalettes: { [key: string]: any } = {
    'Cool Winter': {
      coreNeutrals: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF', '#2C3E50', '#34495E'],
      accentLights: ['#E0E0E0', '#F5F5F5', '#D3D3D3', '#FAFAFA', '#F0F0F0', '#E8E8E8', '#ECF0F1', '#BDC3C7'],
      accentBrights: ['#0033FF', '#6600CC', '#FF0066', '#FF3300', '#0099FF', '#33CC33', '#E74C3C', '#9B59B6'],
      extendedPalette: [
        '#1ABC9C', '#16A085', '#2ECC71', '#27AE60', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD',
        '#E74C3C', '#C0392B', '#E67E22', '#D35400', '#F39C12', '#F1C40F', '#95A5A6', '#7F8C8D',
        '#34495E', '#2C3E50', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'
      ],
      contrastLevel: 'High',
      temperatureRating: 'Cool',
      hairColors: ['Ash Brown', 'Platinum Blonde', 'True Black', 'Cool Dark Brown'],
      makeupBrands: {
        foundation: ['MAC Studio Fix NC15', 'Fenty Beauty 120', 'NARS Siberia'],
        lipstick: ['MAC Russian Red', 'Charlotte Tilbury Very Victoria', 'Tom Ford Cherry Lush'],
        eyeshadow: ['Urban Decay Naked Smoky', 'Pat McGrath MTHRSHP Bronze Temptation']
      }
    },
    'Bright Winter': {
      coreNeutrals: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF', '#2C3E50', '#34495E'],
      accentLights: ['#E0FFFF', '#F0E68C', '#F5F5DC', '#FFE4E1', '#FFFACD', '#FAFAD2', '#E6E6FA', '#F0F8FF'],
      accentBrights: ['#FF69B4', '#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#8A2BE2', '#FF1493', '#00CED1'],
      extendedPalette: [
        '#FF69B4', '#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#8A2BE2', '#FF1493', '#00CED1',
        '#FF6347', '#DA70D6', '#00FA9A', '#4169E1', '#FFA500', '#9932CC', '#FF0000', '#008B8B',
        '#FF8C00', '#BA55D3', '#ADFF2F', '#6495ED', '#FFFF00', '#8B008B', '#DC143C', '#20B2AA'
      ],
      contrastLevel: 'High',
      temperatureRating: 'Cool',
      hairColors: ['Platinum Blonde', 'True Black', 'Ash Brown', 'Silver'],
      makeupBrands: {
        foundation: ['MAC Studio Fix NC20', 'Fenty Beauty 150', 'NARS Mont Blanc'],
        lipstick: ['MAC Ruby Woo', 'Charlotte Tilbury Red Hot Susan', 'Tom Ford Scarlet Rouge'],
        eyeshadow: ['Urban Decay Electric Palette', 'Pat McGrath MTHRSHP Subliminal']
      }
    }
  };

  private readonly fabricGuide: { [key: string]: string[] } = {
    'Cool Winter': [
      'Silk - creates dramatic drape with your high contrast',
      'Cashmere - luxury texture complements sophisticated palette',
      'Wool gabardine - structured fabrics enhance your bold presence',
      'Satin - reflective surfaces work with your cool undertones'
    ],
    'Bright Winter': [
      'Silk - enhances your vibrant color palette',
      'Crepe - structured yet fluid for your dynamic energy',
      'Satin - reflective quality amplifies your bright colors',
      'Fine wool - provides structure while highlighting your features'
    ]
  };

  private readonly outfitFormulas: { [key: string]: string[] } = {
    'Cool Winter': [
      'Black blazer + white shirt + navy trousers = executive power',
      'Charcoal coat + burgundy scarf + black boots = elegant sophistication',
      'White top + black pencil skirt + silver accessories = classic contrast',
      'Navy dress + white statement jewelry = effortless polish'
    ],
    'Bright Winter': [
      'Black jacket + bright fuchsia top + white pants = bold confidence',
      'Navy coat + electric blue scarf + silver accessories = dynamic energy',
      'White blazer + emerald green blouse + black trousers = striking impact',
      'Charcoal dress + bright coral accessories = modern sophistication'
    ]
  };

  async generatePremiumReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const filename = `premium-color-analysis-${order.id}-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Generate the complete HTML content
      const htmlContent = this.generateHTMLContent(analysisResult);
      
      await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0' 
      });

      // Generate PDF with high quality settings
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }
      });

      console.log('Premium PDF generated successfully at:', filePath);
      return filePath;

    } finally {
      await browser.close();
    }
  }

  private generateHTMLContent(analysisResult: ColorAnalysisResult): string {
    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    const fabrics = this.fabricGuide[analysisResult.season] || this.fabricGuide['Cool Winter'];
    const formulas = this.outfitFormulas[analysisResult.season] || this.outfitFormulas['Cool Winter'];

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${analysisResult.season} Color Analysis Report</title>
        <style>
            ${this.getCSS()}
        </style>
    </head>
    <body>
        <!-- Cover Page -->
        <div class="page cover-page">
            <div class="gradient-bg"></div>
            <div class="content">
                <div class="logo">HUEMATCHER</div>
                <div class="subtitle">PROFESSIONAL COLOR ANALYSIS</div>
                <div class="decorative-line"></div>
                
                <h1 class="season-title">${analysisResult.season}</h1>
                <div class="season-tagline">${this.getSeasonTagline(analysisResult.season)}</div>
                
                <div class="description-card">
                    <p>${analysisResult.description}</p>
                </div>
                
                <div class="accent-elements">
                    <div class="accent-line"></div>
                    <div class="accent-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                
                <div class="quote">"Discover the colors that unlock your most confident self"</div>
                
                <div class="footer">
                    Generated by HueMatcher AI • ${new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                </div>
            </div>
        </div>

        <!-- Complete Palette Page -->
        <div class="page palette-page">
            <div class="gradient-bg-alt"></div>
            <div class="content">
                <h2 class="page-title">Complete Color Palette</h2>
                <div class="page-subtitle">30+ Colors • CMYK Accurate • Shopping Ready</div>
                
                <div class="palette-grid">
                    ${palette.extendedPalette.map((color: string) => `
                        <div class="color-swatch">
                            <div class="swatch" style="background-color: ${color}"></div>
                            <div class="color-info">
                                <div class="color-name">${this.getColorName(color)}</div>
                                <div class="color-code">${color}</div>
                                <div class="cmyk-code">${this.hexToCMYK(color)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="color-sections">
                    <div class="color-section foundation">
                        <h3>Foundation Neutrals</h3>
                        <p>Essential building blocks for every outfit</p>
                        <div class="swatches">
                            ${palette.coreNeutrals.map(color => `
                                <div class="premium-swatch" style="background-color: ${color}">
                                    <span class="swatch-name">${this.getColorName(color)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="color-section lights">
                        <h3>Accent Lights</h3>
                        <p>Soft highlights that enhance your radiance</p>
                        <div class="swatches">
                            ${palette.accentLights.map(color => `
                                <div class="premium-swatch" style="background-color: ${color}">
                                    <span class="swatch-name">${this.getColorName(color)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="color-section brights">
                        <h3>Statement Brights</h3>
                        <p>Your signature power colors</p>
                        <div class="swatches">
                            ${palette.accentBrights.map(color => `
                                <div class="premium-swatch" style="background-color: ${color}">
                                    <span class="swatch-name">${this.getColorName(color)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contrast Analysis Page -->
        <div class="page analysis-page">
            <div class="gradient-bg-contrast"></div>
            <div class="content">
                <h2 class="page-title">Contrast & Temperature Analysis</h2>
                
                <div class="analysis-cards">
                    <div class="analysis-card">
                        <h3>Contrast Level</h3>
                        <div class="contrast-dial ${palette.contrastLevel.toLowerCase()}">
                            <div class="dial-fill"></div>
                            <span class="dial-text">${palette.contrastLevel}</span>
                        </div>
                    </div>
                    
                    <div class="analysis-card">
                        <h3>Temperature Profile</h3>
                        <div class="temperature-display">${palette.temperatureRating}</div>
                    </div>
                </div>
                
                <div class="explanation-card">
                    <h3>Your Color Science</h3>
                    <p>Your ${palette.contrastLevel.toLowerCase()} contrast level and ${palette.temperatureRating.toLowerCase()} undertones create a sophisticated color profile. This combination allows you to wear bold, dramatic colors with confidence while maintaining elegance.</p>
                </div>
                
                <div class="combinations-section">
                    <h3>Signature Color Combinations</h3>
                    <div class="color-combinations">
                        ${this.getColorCombinations(analysisResult.season).map(combo => `
                            <div class="combination">
                                <div class="combo-colors">
                                    <div class="combo-swatch" style="background-color: ${combo.colors[0]}"></div>
                                    <div class="combo-swatch" style="background-color: ${combo.colors[1]}"></div>
                                </div>
                                <div class="combo-info">
                                    <div class="combo-name">${combo.name}</div>
                                    <div class="combo-desc">${combo.desc}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Hair Color Page -->
        <div class="page hair-page">
            <div class="gradient-bg-hair"></div>
            <div class="content">
                <h2 class="page-title">Hair Color Strategy</h2>
                
                <div class="section-card">
                    <h3>Professional Hair Color Recommendations</h3>
                </div>
                
                <div class="hair-colors">
                    ${palette.hairColors.map((color, index) => `
                        <div class="hair-color-card">
                            <div class="hair-number">${index + 1}</div>
                            <div class="hair-info">
                                <h4>${color}</h4>
                                <p>${this.getHairColorExplanation(color)}</p>
                            </div>
                            <div class="hair-sample" style="background-color: ${this.getHairColorHex(color)}"></div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="maintenance-section">
                    <h3>Professional Maintenance Guide</h3>
                    <div class="maintenance-tips">
                        <div class="tip">✓ Use purple shampoo weekly to maintain cool tones</div>
                        <div class="tip">✓ Request ash or platinum tones, avoid warm highlights</div>
                        <div class="tip">✓ Touch up roots every 6-8 weeks for optimal contrast</div>
                        <div class="tip">✓ Consider semi-permanent options for subtle changes</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cosmetics Page -->
        <div class="page cosmetics-page">
            <div class="gradient-bg-cosmetics"></div>
            <div class="content">
                <h2 class="page-title">Named Cosmetics Guide</h2>
                
                <div class="cosmetics-sections">
                    <div class="cosmetic-section foundation-section">
                        <div class="section-header">
                            <h3>Foundation Matches</h3>
                            <div class="section-icon"></div>
                        </div>
                        <div class="product-list">
                            ${palette.makeupBrands.foundation.map(product => `
                                <div class="product">• ${product}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="cosmetic-section lipstick-section">
                        <div class="section-header">
                            <h3>Signature Lipsticks</h3>
                            <div class="section-icon"></div>
                        </div>
                        <div class="product-list">
                            ${palette.makeupBrands.lipstick.map(product => `
                                <div class="product">• ${product}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="cosmetic-section eyeshadow-section">
                        <div class="section-header">
                            <h3>Eyeshadow Palettes</h3>
                            <div class="section-icon"></div>
                        </div>
                        <div class="product-list">
                            ${palette.makeupBrands.eyeshadow.map(product => `
                                <div class="product">• ${product}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="shopping-strategy">
                    <h3>Professional Shopping Strategy</h3>
                    <div class="strategy-tips">
                        <div class="strategy-tip">✓ Test foundation on jawline in natural daylight</div>
                        <div class="strategy-tip">✓ Prioritize cool undertones in all product selections</div>
                        <div class="strategy-tip">✓ Avoid warm browns, oranges, and golden undertones</div>
                        <div class="strategy-tip">✓ Choose silver-based highlighters over gold alternatives</div>
                        <div class="strategy-tip">✓ Build your collection around your core neutral palette</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fabric Page -->
        <div class="page fabric-page">
            <div class="gradient-bg-fabric"></div>
            <div class="content">
                <h2 class="page-title">Fabric & Texture Guide</h2>
                
                <div class="section-header-card">
                    <h3>Premium Fabric Recommendations for Your Color Type</h3>
                </div>
                
                <div class="fabric-recommendations">
                    ${fabrics.map((fabric, index) => {
                      const [name, description] = fabric.split(' - ');
                      return `
                        <div class="fabric-card">
                            <div class="fabric-visual" style="background: linear-gradient(45deg, ${this.getFabricColors()[index % 4]}, ${this.getFabricColors()[(index + 1) % 4]})"></div>
                            <div class="fabric-info">
                                <h4>${name}</h4>
                                <p>${description}</p>
                            </div>
                        </div>
                      `;
                    }).join('')}
                </div>
                
                <div class="texture-principles">
                    <h3>Professional Texture Guidelines</h3>
                    <div class="principles-list">
                        <div class="principle">✓ Smooth, refined textures enhance your sophisticated palette</div>
                        <div class="principle">✓ Structured fabrics complement your high contrast features</div>
                        <div class="principle">✓ Lustrous finishes work better than matte alternatives</div>
                        <div class="principle">✓ Avoid rough textures like heavy canvas or burlap</div>
                        <div class="principle">✓ Choose quality over quantity - invest in fewer, better pieces</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Outfit Formulas Page -->
        <div class="page outfit-page">
            <div class="gradient-bg-outfit"></div>
            <div class="content">
                <h2 class="page-title">Signature Outfit Formulas</h2>
                <div class="page-subtitle">Professional styling formulas designed specifically for your color type</div>
                
                <div class="formula-cards">
                    ${formulas.map((formula, index) => {
                      const [title, description] = formula.split(' = ');
                      return `
                        <div class="formula-card">
                            <div class="formula-number">${index + 1}</div>
                            <div class="formula-content">
                                <h4>${title}</h4>
                                <p class="formula-result">Creates: ${description}</p>
                                <div class="pro-tip">Pro Tip: ${this.getOutfitTip(index)}</div>
                            </div>
                        </div>
                      `;
                    }).join('')}
                </div>
                
                <div class="styling-principles">
                    <h3>Master Styling Principles</h3>
                    <div class="principles-grid">
                        <div class="principle-card">✓ Create intentional contrast between light and dark pieces</div>
                        <div class="principle-card">✓ Use accessories to introduce your signature accent colors</div>
                        <div class="principle-card">✓ Maintain clean, structured proportions in all silhouettes</div>
                        <div class="principle-card">✓ Allow one statement piece to be the outfit's focal point</div>
                        <div class="principle-card">✓ Layer textures within your approved fabric guidelines</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private getCSS(): string {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .page {
            width: 210mm;
            height: 297mm;
            position: relative;
            page-break-after: always;
            overflow: hidden;
        }

        .page:last-child {
            page-break-after: avoid;
        }

        /* Gradient Backgrounds */
        .gradient-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .gradient-bg-alt {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%);
        }

        .gradient-bg-contrast {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #1e293b 0%, #374151 100%);
        }

        .gradient-bg-hair {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #374151 0%, #0f172a 100%);
        }

        .gradient-bg-cosmetics {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .gradient-bg-fabric {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }

        .gradient-bg-outfit {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0f172a 0%, #374151 100%);
        }

        .content {
            position: relative;
            z-index: 1;
            padding: 40px;
            height: 100%;
        }

        /* Cover Page Styles */
        .cover-page .logo {
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            color: #f8fafc;
            margin-top: 40px;
            letter-spacing: 2px;
        }

        .cover-page .subtitle {
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            margin-top: 8px;
            letter-spacing: 1px;
        }

        .decorative-line {
            width: 200px;
            height: 1px;
            background: #475569;
            margin: 20px auto;
        }

        .season-title {
            text-align: center;
            font-size: 48px;
            font-weight: bold;
            color: #ffffff;
            margin: 40px 0 20px 0;
            letter-spacing: -1px;
        }

        .season-tagline {
            text-align: center;
            font-size: 16px;
            color: #7c3aed;
            font-style: italic;
            margin-bottom: 40px;
        }

        .description-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 30px;
            margin: 40px auto;
            max-width: 500px;
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .description-card p {
            color: #f1f5f9;
            font-size: 14px;
            text-align: center;
            line-height: 1.8;
        }

        .accent-elements {
            position: relative;
            margin: 60px 0;
        }

        .accent-line {
            position: absolute;
            left: 40px;
            top: 20px;
            width: 4px;
            height: 40px;
            background: #7c3aed;
        }

        .accent-dots {
            position: absolute;
            right: 40px;
            top: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .dot {
            width: 8px;
            height: 8px;
            background: #7c3aed;
            border-radius: 50%;
        }

        .quote {
            text-align: center;
            font-size: 18px;
            color: #a855f7;
            font-style: italic;
            margin: 40px 0;
            font-weight: 300;
        }

        .footer {
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: #cbd5e1;
            background: rgba(15, 23, 42, 0.9);
            padding: 20px;
            border-radius: 8px;
            margin: 0 40px;
        }

        /* Page Titles */
        .page-title {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
        }

        .page-subtitle {
            text-align: center;
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 40px;
        }

        /* Palette Page Styles */
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 8px;
            margin: 40px 0;
            padding: 20px;
            background: rgba(30, 41, 59, 0.6);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }

        .color-swatch {
            text-align: center;
        }

        .swatch {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            margin: 0 auto 8px auto;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .color-info {
            font-size: 8px;
            color: #94a3b8;
        }

        .color-name {
            font-weight: bold;
            color: #f1f5f9;
            margin-bottom: 2px;
        }

        .color-sections {
            margin-top: 40px;
        }

        .color-section {
            background: rgba(30, 41, 59, 0.8);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #374151;
        }

        .color-section h3 {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 8px;
        }

        .color-section p {
            color: #cbd5e1;
            font-size: 12px;
            margin-bottom: 20px;
        }

        .swatches {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .premium-swatch {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            position: relative;
            border: 2px solid #f8fafc;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        .swatch-name {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            color: #f1f5f9;
            font-weight: bold;
            white-space: nowrap;
        }

        /* Analysis Page Styles */
        .analysis-cards {
            display: flex;
            gap: 40px;
            margin: 40px 0;
        }

        .analysis-card {
            flex: 1;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
        }

        .analysis-card h3 {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .contrast-dial {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 6px solid #374151;
            position: relative;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .contrast-dial.high {
            border-color: #7c3aed;
        }

        .dial-fill {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #7c3aed;
        }

        .dial-text {
            position: absolute;
            color: #ffffff;
            font-weight: bold;
            font-size: 10px;
        }

        .temperature-display {
            font-size: 28px;
            font-weight: bold;
            color: #7c3aed;
        }

        .explanation-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 30px;
            margin: 40px 0;
        }

        .explanation-card h3 {
            color: #a855f7;
            font-size: 18px;
            margin-bottom: 15px;
        }

        .explanation-card p {
            color: #f1f5f9;
            font-size: 13px;
            line-height: 1.6;
        }

        .combinations-section {
            margin-top: 40px;
        }

        .combinations-section h3 {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .color-combinations {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .combination {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .combo-colors {
            display: flex;
            gap: 5px;
        }

        .combo-swatch {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .combo-name {
            color: #ffffff;
            font-weight: bold;
            font-size: 12px;
        }

        .combo-desc {
            color: #94a3b8;
            font-size: 10px;
        }

        /* Hair Page Styles */
        .section-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .section-card h3 {
            color: #a855f7;
            font-size: 16px;
        }

        .hair-colors {
            margin: 30px 0;
        }

        .hair-color-card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .hair-number {
            width: 30px;
            height: 30px;
            background: #7c3aed;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 14px;
        }

        .hair-info {
            flex: 1;
        }

        .hair-info h4 {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 8px;
        }

        .hair-info p {
            color: #cbd5e1;
            font-size: 12px;
            line-height: 1.5;
        }

        .hair-sample {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            border: 1px solid #374151;
        }

        .maintenance-section {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 30px;
            margin-top: 30px;
        }

        .maintenance-section h3 {
            color: #7c3aed;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .maintenance-tips .tip {
            color: #f1f5f9;
            font-size: 13px;
            margin-bottom: 12px;
        }

        /* Cosmetics Page Styles */
        .cosmetics-sections {
            margin: 40px 0;
        }

        .cosmetic-section {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .section-header h3 {
            color: #ffffff;
            font-size: 18px;
        }

        .section-icon {
            width: 12px;
            height: 12px;
            background: #ec4899;
            border-radius: 50%;
        }

        .foundation-section .section-icon {
            background: #ec4899;
        }

        .lipstick-section .section-icon {
            background: #ef4444;
        }

        .eyeshadow-section .section-icon {
            background: #8b5cf6;
        }

        .product-list .product {
            color: #f1f5f9;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .shopping-strategy {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 12px;
            padding: 30px;
            margin-top: 30px;
        }

        .shopping-strategy h3 {
            color: #a855f7;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .strategy-tips .strategy-tip {
            color: #cbd5e1;
            font-size: 13px;
            margin-bottom: 12px;
        }

        /* Fabric Page Styles */
        .section-header-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .section-header-card h3 {
            color: #7c3aed;
            font-size: 16px;
        }

        .fabric-recommendations {
            margin: 30px 0;
        }

        .fabric-card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .fabric-visual {
            width: 50px;
            height: 30px;
            border-radius: 4px;
            border: 1px solid #374151;
        }

        .fabric-info h4 {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 8px;
        }

        .fabric-info p {
            color: #cbd5e1;
            font-size: 12px;
            line-height: 1.5;
        }

        .texture-principles {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 30px;
            margin-top: 30px;
        }

        .texture-principles h3 {
            color: #a855f7;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .principles-list .principle {
            color: #f1f5f9;
            font-size: 13px;
            margin-bottom: 12px;
        }

        /* Outfit Page Styles */
        .formula-cards {
            margin: 40px 0;
        }

        .formula-card {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }

        .formula-number {
            width: 30px;
            height: 30px;
            background: #7c3aed;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 14px;
        }

        .formula-content h4 {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .formula-result {
            color: #a855f7;
            font-style: italic;
            font-size: 13px;
            margin-bottom: 10px;
        }

        .pro-tip {
            color: #cbd5e1;
            font-size: 11px;
        }

        .styling-principles {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #1e293b;
            border-radius: 12px;
            padding: 30px;
            margin-top: 30px;
        }

        .styling-principles h3 {
            color: #7c3aed;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .principles-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }

        .principle-card {
            color: #f1f5f9;
            font-size: 13px;
            padding: 12px;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 6px;
            border: 1px solid #374151;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    `;
  }

  private getSeasonTagline(season: string): string {
    const taglines: { [key: string]: string } = {
      'Cool Winter': 'Dramatic • Bold • Sophisticated',
      'Bright Winter': 'Vibrant • Dynamic • Striking',
      'Warm Spring': 'Fresh • Vibrant • Energetic',
      'Soft Summer': 'Elegant • Refined • Gentle'
    };
    return taglines[season] || 'Sophisticated • Elegant • Refined';
  }

  private getColorCombinations(season: string): Array<{colors: string[], name: string, desc: string}> {
    return [
      { colors: ['#000000', '#FFFFFF'], name: 'Classic Contrast', desc: 'Maximum impact for formal occasions' },
      { colors: ['#2C3E50', '#F8FAFC'], name: 'Professional Edge', desc: 'Sophisticated yet approachable' },
      { colors: ['#666666', '#C0C0C0'], name: 'Modern Neutral', desc: 'Contemporary and refined' },
      { colors: ['#7C3AED', '#E2E8F0'], name: 'Creative Confidence', desc: 'Bold yet balanced' }
    ];
  }

  private getHairColorExplanation(color: string): string {
    const explanations: { [key: string]: string } = {
      'Ash Brown': 'Cool-toned brown that complements your undertones and creates beautiful contrast with your features.',
      'Platinum Blonde': 'Dramatic light shade that maximizes your high contrast potential - requires professional maintenance.',
      'True Black': 'Classic choice that enhances your sophisticated color palette and creates striking contrast.',
      'Cool Dark Brown': 'Rich, deep brown with cool undertones - perfect balance of drama and wearability.',
      'Silver': 'Bold, sophisticated choice that embraces your cool undertones and creates stunning contrast.'
    };
    return explanations[color] || 'This color complements your cool undertones and contrast level.';
  }

  private getHairColorHex(colorName: string): string {
    const hairColorHexes: { [key: string]: string } = {
      'Ash Brown': '#8B7355',
      'Platinum Blonde': '#F5F5DC',
      'True Black': '#000000',
      'Cool Dark Brown': '#654321',
      'Silver': '#C0C0C0'
    };
    return hairColorHexes[colorName] || '#666666';
  }

  private getFabricColors(): string[] {
    return ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];
  }

  private getOutfitTip(index: number): string {
    const tips = [
      'Add a statement watch or structured bag to complete the look',
      'Perfect for client meetings or important presentations',
      'Ideal for dinner dates or sophisticated social events',
      'Great base for both day and evening occasions'
    ];
    return tips[index] || 'Mix textures to add visual interest while staying true to your palette';
  }

  private hexToCMYK(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
    
    return `C${Math.round(c * 100)} M${Math.round(m * 100)} Y${Math.round(y * 100)} K${Math.round(k * 100)}`;
  }

  private getColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#000000': 'True Black', '#333333': 'Charcoal', '#666666': 'Steel Gray',
      '#999999': 'Medium Gray', '#CCCCCC': 'Light Gray', '#FFFFFF': 'Pure White',
      '#2C3E50': 'Navy', '#34495E': 'Slate', '#E0E0E0': 'Platinum',
      '#F5F5F5': 'Ivory', '#D3D3D3': 'Silver', '#FAFAFA': 'Snow',
      '#0033FF': 'Royal Blue', '#6600CC': 'Deep Purple', '#FF0066': 'Magenta',
      '#FF69B4': 'Hot Pink', '#FF4500': 'Orange Red', '#32CD32': 'Lime Green',
      '#1E90FF': 'Dodger Blue', '#FFD700': 'Gold', '#8A2BE2': 'Blue Violet'
    };
    return colorNames[hex.toUpperCase()] || hex;
  }
}

export const htmlPdfService = new HTMLPDFService();