import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class WorkingPDFService {
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
    }
  };

  private readonly fabricGuide: { [key: string]: string[] } = {
    'Cool Winter': [
      'Silk - creates dramatic drape with your high contrast',
      'Cashmere - luxury texture complements sophisticated palette',
      'Wool gabardine - structured fabrics enhance your bold presence',
      'Satin - reflective surfaces work with your cool undertones',
      'Avoid: Rough tweeds, matte jerseys, warm-toned fabrics'
    ]
  };

  private readonly outfitFormulas: { [key: string]: string[] } = {
    'Cool Winter': [
      'Formula 1: Black blazer + white shirt + navy trousers = executive power',
      'Formula 2: Charcoal coat + burgundy scarf + black boots = elegant sophistication',
      'Formula 3: White top + black pencil skirt + silver accessories = classic contrast',
      'Formula 4: Navy dress + white statement jewelry = effortless polish'
    ]
  };

  async generateReport(order: any, analysisResult: any): Promise<string> {
    const filename = `color-analysis-${order.id}-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ 
          size: 'A4',
          margin: 40,
          info: {
            Title: `${analysisResult.season} Professional Color Analysis Report`,
            Author: 'HueMatcher Professional Color Analysis',
            Subject: 'Comprehensive Personal Color Analysis with 30+ Colors'
          }
        });
        
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Cover Page
        this.generateCoverPage(doc, analysisResult);
        
        // Complete Palette Page (30+ colors)
        doc.addPage();
        this.generateCompletePalettePage(doc, analysisResult);
        
        // Contrast & Temperature Analysis
        doc.addPage();
        this.generateContrastAnalysisPage(doc, analysisResult);
        
        // Hair Color Strategy
        doc.addPage();
        this.generateHairColorPage(doc, analysisResult);
        
        // Named Cosmetics Guide
        doc.addPage();
        this.generateCosmeticsPage(doc, analysisResult);
        
        // Fabric & Texture Guide
        doc.addPage();
        this.generateFabricPage(doc, analysisResult);
        
        // Outfit Formulas
        doc.addPage();
        this.generateOutfitFormulasPage(doc, analysisResult);

        doc.end();
        
        stream.on('finish', () => {
          console.log('PDF generated successfully at:', filePath);
          resolve(filePath);
        });
        
        stream.on('error', (error) => {
          console.error('PDF generation error:', error);
          reject(error);
        });
        
      } catch (error) {
        console.error('PDF setup error:', error);
        reject(error);
      }
    });
  }

  private generateCoverPage(doc: any, analysisResult: any) {
    // Header
    doc.fontSize(14)
       .fillColor('#64748B')
       .text('HUEMATCHER PROFESSIONAL COLOR ANALYSIS', 50, 80, { align: 'center' });
    
    // Main title
    doc.fontSize(36)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text(analysisResult.season, 50, 150, { align: 'center' });
    
    // Tagline
    doc.fontSize(16)
       .fillColor('#475569')
       .font('Helvetica')
       .text('Bold, Dramatic, Sophisticated', 50, 200, { align: 'center' });
    
    // Description box
    doc.rect(70, 280, 450, 120)
       .fillColor('#F1F5F9')
       .fill();
    
    doc.rect(70, 280, 450, 120)
       .strokeColor('#CBD5E1')
       .lineWidth(1)
       .stroke();
    
    doc.fontSize(12)
       .fillColor('#334155')
       .font('Helvetica')
       .text(analysisResult.description, 90, 300, { 
         width: 410, 
         align: 'center',
         lineGap: 4
       });
    
    // Signature quote
    doc.fontSize(14)
       .fillColor('#7C3AED')
       .font('Helvetica-Oblique')
       .text('"High contrast combinations with cool undertones create your most powerful looks."', 70, 450, { 
         width: 450, 
         align: 'center' 
       });
    
    // Footer
    doc.fontSize(10)
       .fillColor('#94A3B8')
       .font('Helvetica')
       .text(`Generated by HueMatcher AI • ${new Date().toLocaleDateString()}`, 50, 720, { align: 'center' });
  }

  private generatePalettePage(doc: any, analysisResult: any) {
    // Title
    doc.fontSize(28)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Your Complete Color Palette', 50, 80, { align: 'center' });

    doc.fontSize(12)
       .fillColor('#64748B')
       .font('Helvetica')
       .text('Professional color collection calibrated for your unique features', 50, 120, { align: 'center' });

    let yPos = 170;
    
    // Foundation Neutrals
    this.drawColorSection(doc, 'Foundation Neutrals', 
      'Your essential building blocks - mix and match with confidence',
      analysisResult.coreNeutrals, yPos);
    
    yPos += 150;
    
    // Accent Lights
    this.drawColorSection(doc, 'Accent Lights',
      'Soft highlights that enhance your natural glow',
      analysisResult.accentLights, yPos);
    
    yPos += 150;
    
    // Statement Brights
    this.drawColorSection(doc, 'Statement Brights',
      'Your power colors - use sparingly for maximum impact',
      analysisResult.accentBrights, yPos);
  }

  private generateCompletePalettePage(doc: any, analysisResult: any) {
    // Title
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Complete 30+ Color Palette', 40, 60, { align: 'center' });

    doc.fontSize(11)
       .fillColor('#64748B')
       .font('Helvetica')
       .text('Your comprehensive color collection with CMYK values for shopping accuracy', 40, 90, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 130;
    
    // Extended Palette Grid
    this.drawExtendedPaletteGrid(doc, palette.extendedPalette, yPos);
    
    yPos += 250;
    
    // Color categories with enhanced swatches
    this.drawEnhancedColorSection(doc, 'Foundation Neutrals', 
      'Essential building blocks - your most versatile colors',
      palette.coreNeutrals, yPos);
    
    yPos += 120;
    
    this.drawEnhancedColorSection(doc, 'Accent Lights',
      'Soft highlights that enhance your natural radiance',
      palette.accentLights, yPos);
    
    yPos += 120;
    
    this.drawEnhancedColorSection(doc, 'Statement Brights',
      'Your power colors - use strategically for maximum impact',
      palette.accentBrights, yPos);
  }

  private generateContrastAnalysisPage(doc: any, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Contrast & Temperature Analysis', 40, 60, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 120;
    
    // Contrast Level Indicator
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Contrast Level: ' + palette.contrastLevel, 60, yPos);
    
    this.drawContrastDial(doc, palette.contrastLevel, 350, yPos - 10);
    
    yPos += 80;
    
    // Temperature Rating
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Temperature: ' + palette.temperatureRating, 60, yPos);
    
    yPos += 40;
    
    // Detailed explanation
    const contrastExplanation = `${palette.contrastLevel} contrast means you can handle bold color combinations and dramatic differences between light and dark. Your ${palette.temperatureRating.toLowerCase()} undertones work best with colors that have blue, gray, or green bases rather than yellow or orange undertones.`;
    
    doc.fontSize(12)
       .fillColor('#4B5563')
       .font('Helvetica')
       .text(contrastExplanation, 60, yPos, { width: 480, lineGap: 4 });
    
    yPos += 100;
    
    // Best combinations
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Best Color Combinations:', 60, yPos);
    
    yPos += 30;
    const combinations = [
      'Black + White (Maximum contrast for formal occasions)',
      'Navy + Bright White (Professional yet approachable)',
      'Charcoal + Silver (Sophisticated and modern)',
      'Deep Purple + Light Gray (Creative and confident)'
    ];
    
    combinations.forEach(combo => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text('• ' + combo, 80, yPos, { width: 450 });
      yPos += 25;
    });
  }

  private generateHairColorPage(doc: any, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Hair Color Strategy', 40, 60, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 120;
    
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Most Flattering Hair Colors:', 60, yPos);
    
    yPos += 40;
    
    palette.hairColors.forEach((color: string, index: number) => {
      doc.fontSize(14)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text(`${index + 1}. ${color}`, 80, yPos);
      
      yPos += 25;
      
      const explanation = this.getHairColorExplanation(color);
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text(explanation, 100, yPos, { width: 420, lineGap: 3 });
      
      yPos += 50;
    });
    
    // Hair color maintenance tips
    yPos += 20;
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Professional Maintenance Tips:', 60, yPos);
    
    yPos += 30;
    const tips = [
      'Use purple shampoo weekly to maintain cool tones',
      'Avoid warm highlights - ask for ash or platinum tones',
      'Touch up roots every 6-8 weeks to maintain contrast',
      'Consider semi-permanent color for subtle changes'
    ];
    
    tips.forEach(tip => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text('• ' + tip, 80, yPos, { width: 450 });
      yPos += 25;
    });
  }

  private generateCosmeticsPage(doc: any, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Named Cosmetics Guide', 40, 60, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 120;
    
    // Foundation recommendations
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Foundation Matches:', 60, yPos);
    
    yPos += 30;
    palette.makeupBrands.foundation.forEach((product: string) => {
      doc.fontSize(12)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text('• ' + product, 80, yPos);
      yPos += 20;
    });
    
    yPos += 20;
    
    // Lipstick recommendations
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Signature Lipsticks:', 60, yPos);
    
    yPos += 30;
    palette.makeupBrands.lipstick.forEach((product: string) => {
      doc.fontSize(12)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text('• ' + product, 80, yPos);
      yPos += 20;
    });
    
    yPos += 20;
    
    // Eyeshadow recommendations
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Eyeshadow Palettes:', 60, yPos);
    
    yPos += 30;
    palette.makeupBrands.eyeshadow.forEach((product: string) => {
      doc.fontSize(12)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text('• ' + product, 80, yPos);
      yPos += 20;
    });
    
    yPos += 40;
    
    // Shopping tips for cosmetics
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Cosmetics Shopping Strategy:', 60, yPos);
    
    yPos += 30;
    const cosmeticTips = [
      'Always test foundation on your jawline in natural light',
      'Look for cool undertones in all makeup products',
      'Avoid warm browns, oranges, and golden shades',
      'Choose silver-based highlighters over gold ones'
    ];
    
    cosmeticTips.forEach(tip => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text('• ' + tip, 80, yPos, { width: 450 });
      yPos += 25;
    });
  }

  private generateFabricPage(doc: any, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Fabric & Texture Guide', 40, 60, { align: 'center' });

    const fabrics = this.fabricGuide[analysisResult.season] || this.fabricGuide['Cool Winter'];
    let yPos = 120;
    
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Best Fabric Choices:', 60, yPos);
    
    yPos += 40;
    
    fabrics.forEach(fabric => {
      const [name, description] = fabric.split(' - ');
      
      doc.fontSize(14)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text('• ' + name, 80, yPos);
      
      if (description) {
        yPos += 20;
        doc.fontSize(11)
           .fillColor('#4B5563')
           .font('Helvetica')
           .text(description, 100, yPos, { width: 420 });
      }
      
      yPos += 35;
    });
    
    yPos += 20;
    
    // Texture principles
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Texture Principles for Your Type:', 60, yPos);
    
    yPos += 30;
    const principles = [
      'Smooth, refined textures enhance your sophisticated palette',
      'Structured fabrics complement your high contrast features',
      'Avoid overly casual or rough textures like heavy canvas',
      'Shiny or lustrous finishes work better than matte ones'
    ];
    
    principles.forEach(principle => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text('• ' + principle, 80, yPos, { width: 450 });
      yPos += 25;
    });
  }

  private generateOutfitFormulasPage(doc: any, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Signature Outfit Formulas', 40, 60, { align: 'center' });

    const formulas = this.outfitFormulas[analysisResult.season] || this.outfitFormulas['Cool Winter'];
    let yPos = 120;
    
    doc.fontSize(12)
       .fillColor('#64748B')
       .font('Helvetica')
       .text('Professional styling formulas designed specifically for your color type', 40, 90, { align: 'center' });
    
    formulas.forEach((formula, index) => {
      const [title, description] = formula.split(' = ');
      
      // Formula box
      doc.rect(60, yPos, 480, 80)
         .fillColor('#F8FAFC')
         .fill();
      
      doc.rect(60, yPos, 480, 80)
         .strokeColor('#E2E8F0')
         .lineWidth(1)
         .stroke();
      
      doc.fontSize(14)
         .fillColor('#1E293B')
         .font('Helvetica-Bold')
         .text(title, 80, yPos + 15);
      
      doc.fontSize(11)
         .fillColor('#7C3AED')
         .font('Helvetica-Oblique')
         .text('Result: ' + description, 80, yPos + 35, { width: 440 });
      
      // Add styling tip
      const tip = this.getOutfitTip(index);
      doc.fontSize(10)
         .fillColor('#64748B')
         .font('Helvetica')
         .text('Tip: ' + tip, 80, yPos + 55, { width: 440 });
      
      yPos += 100;
    });
    
    // General styling principles
    yPos += 20;
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Styling Principles:', 60, yPos);
    
    yPos += 30;
    const principles = [
      'Always create contrast - mix light and dark pieces',
      'Use accessories to add pops of your signature colors',
      'Keep proportions clean and structured',
      'Let one statement piece be the focal point'
    ];
    
    principles.forEach(principle => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text('• ' + principle, 80, yPos, { width: 450 });
      yPos += 25;
    });
  }

  private drawColorSection(doc: any, title: string, description: string, colors: string[], yPos: number) {
    // Section title
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(title, 70, yPos);
    
    // Description
    doc.fontSize(10)
       .fillColor('#6B7280')
       .font('Helvetica')
       .text(description, 70, yPos + 20);
    
    // Color swatches
    const swatchSize = 35;
    const swatchSpacing = 50;
    const startX = 70;
    
    colors.forEach((color, index) => {
      const x = startX + (index * swatchSpacing);
      const y = yPos + 45;
      
      // Color swatch
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // Border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#E5E7EB')
         .lineWidth(1)
         .stroke();
      
      // Color code
      doc.fontSize(7)
         .fillColor('#374151')
         .text(color, x - 5, y + swatchSize + 5, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
    });
  }

  private drawRecommendationBox(doc: any, title: string, content: string, yPos: number) {
    // Box background
    doc.rect(70, yPos, 450, 80)
       .fillColor('#F9FAFB')
       .fill();
    
    // Box border
    doc.rect(70, yPos, 450, 80)
       .strokeColor('#E5E7EB')
       .lineWidth(1)
       .stroke();
    
    // Title
    doc.fontSize(14)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(title, 90, yPos + 15);
    
    // Content
    doc.fontSize(11)
       .fillColor('#4B5563')
       .font('Helvetica')
       .text(content, 90, yPos + 35, { width: 410, lineGap: 3 });
  }

  private drawExtendedPaletteGrid(doc: any, colors: string[], yPos: number) {
    const swatchSize = 28;
    const cols = 8;
    const spacing = 5;
    const startX = 60;
    
    colors.forEach((color, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + (col * (swatchSize + spacing));
      const y = yPos + (row * (swatchSize + spacing));
      
      // Color swatch
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // Border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#E5E7EB')
         .lineWidth(0.5)
         .stroke();
      
      // CMYK value below
      const cmyk = this.hexToCMYK(color);
      doc.fontSize(6)
         .fillColor('#374151')
         .text(cmyk, x - 5, y + swatchSize + 2, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
    });
  }

  private drawEnhancedColorSection(doc: any, title: string, description: string, colors: string[], yPos: number) {
    // Section title
    doc.fontSize(14)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(title, 60, yPos);
    
    // Description
    doc.fontSize(9)
       .fillColor('#6B7280')
       .font('Helvetica')
       .text(description, 60, yPos + 18);
    
    // Enhanced color swatches with names
    const swatchSize = 32;
    const swatchSpacing = 60;
    const startX = 60;
    
    colors.forEach((color, index) => {
      const x = startX + (index * swatchSpacing);
      const y = yPos + 40;
      
      // Color swatch
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // Border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#E5E7EB')
         .lineWidth(1)
         .stroke();
      
      // Color name
      const colorName = this.getColorName(color);
      doc.fontSize(7)
         .fillColor('#374151')
         .font('Helvetica-Bold')
         .text(colorName, x - 5, y + swatchSize + 3, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
      
      // Hex code
      doc.fontSize(6)
         .fillColor('#6B7280')
         .text(color, x - 5, y + swatchSize + 13, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
    });
  }

  private drawContrastDial(doc: any, level: string, x: number, y: number) {
    const radius = 30;
    const centerX = x + radius;
    const centerY = y + radius;
    
    // Outer circle
    doc.circle(centerX, centerY, radius)
       .strokeColor('#E5E7EB')
       .lineWidth(3)
       .stroke();
    
    // Fill based on contrast level
    const fillAngle = level === 'High' ? 270 : level === 'Medium' ? 180 : 90;
    doc.circle(centerX, centerY, radius - 5)
       .fillColor(level === 'High' ? '#7C3AED' : level === 'Medium' ? '#3B82F6' : '#10B981')
       .fill();
    
    // Center text
    doc.fontSize(8)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text(level, centerX - 15, centerY - 3);
  }

  private getHairColorExplanation(color: string): string {
    const explanations: { [key: string]: string } = {
      'Ash Brown': 'Cool-toned brown that complements your undertones and creates beautiful contrast with your features.',
      'Platinum Blonde': 'Dramatic light shade that maximizes your high contrast potential - requires professional maintenance.',
      'True Black': 'Classic choice that enhances your sophisticated color palette and creates striking contrast.',
      'Cool Dark Brown': 'Rich, deep brown with cool undertones - perfect balance of drama and wearability.'
    };
    
    return explanations[color] || 'This color complements your cool undertones and contrast level.';
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
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    // Calculate CMYK
    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
    
    return `C${Math.round(c * 100)} M${Math.round(m * 100)} Y${Math.round(y * 100)} K${Math.round(k * 100)}`;
  }

  private getColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#000000': 'True Black',
      '#333333': 'Charcoal',
      '#666666': 'Steel Gray',
      '#999999': 'Medium Gray',
      '#CCCCCC': 'Light Gray',
      '#FFFFFF': 'Pure White',
      '#2C3E50': 'Navy',
      '#34495E': 'Slate',
      '#E0E0E0': 'Platinum',
      '#F5F5F5': 'Ivory',
      '#D3D3D3': 'Silver',
      '#FAFAFA': 'Snow',
      '#F0F0F0': 'Pearl',
      '#E8E8E8': 'Mist',
      '#0033FF': 'Royal Blue',
      '#6600CC': 'Deep Purple',
      '#FF0066': 'Magenta',
      '#FF3300': 'Crimson',
      '#0099FF': 'Azure',
      '#33CC33': 'Emerald'
    };
    
    return colorNames[hex.toUpperCase()] || hex;
  }
}

export const workingPdfService = new WorkingPDFService();