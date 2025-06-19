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
    // Premium gradient background
    this.drawGradientBackground(doc, '#0F172A', '#1E293B');
    
    // Logo area with modern styling
    doc.fontSize(11)
       .fillColor('#F8FAFC')
       .font('Helvetica')
       .text('HUEMATCHER', 40, 60, { align: 'center' });
    
    doc.fontSize(8)
       .fillColor('#94A3B8')
       .text('PROFESSIONAL COLOR ANALYSIS', 40, 75, { align: 'center' });
    
    // Decorative line
    doc.moveTo(150, 95)
       .lineTo(445, 95)
       .strokeColor('#475569')
       .lineWidth(1)
       .stroke();
    
    // Main season title with elevated styling
    doc.fontSize(48)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text(analysisResult.season, 40, 140, { align: 'center' });
    
    // Elegant subtitle with accent color
    const seasonSubtitles: { [key: string]: string } = {
      'Cool Winter': 'Dramatic • Bold • Sophisticated',
      'Warm Spring': 'Fresh • Vibrant • Energetic',
      'Soft Summer': 'Elegant • Refined • Gentle'
    };
    
    doc.fontSize(14)
       .fillColor('#7C3AED')
       .font('Helvetica-Oblique')
       .text(seasonSubtitles[analysisResult.season] || 'Sophisticated • Elegant • Refined', 40, 200, { align: 'center' });
    
    // Modern card design for description
    this.drawModernCard(doc, 50, 260, 495, 140, '#1E293B', '#334155');
    
    doc.fontSize(13)
       .fillColor('#F1F5F9')
       .font('Helvetica')
       .text(analysisResult.description, 70, 290, { 
         width: 455, 
         align: 'center',
         lineGap: 6
       });
    
    // Signature visual elements
    this.drawAccentElements(doc, analysisResult.season);
    
    // Professional quote with premium styling
    doc.fontSize(16)
       .fillColor('#A855F7')
       .font('Helvetica-Oblique')
       .text('"Discover the colors that unlock your most confident self"', 40, 480, { 
         width: 515, 
         align: 'center' 
       });
    
    // Modern footer with brand identity
    doc.rect(40, 680, 515, 60)
       .fillColor('#0F172A')
       .fill();
    
    doc.fontSize(10)
       .fillColor('#CBD5E1')
       .font('Helvetica')
       .text(`Generated by HueMatcher AI • ${new Date().toLocaleDateString('en-US', { 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric' 
       })}`, 40, 705, { align: 'center' });
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
    // Modern dark background
    this.drawGradientBackground(doc, '#0F172A', '#1E293B');
    
    // Header with contemporary styling
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Complete Color Palette', 40, 50, { align: 'center' });

    doc.fontSize(12)
       .fillColor('#94A3B8')
       .font('Helvetica')
       .text('30+ Colors • CMYK Accurate • Shopping Ready', 40, 85, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 120;
    
    // Modern card for extended palette
    this.drawModernCard(doc, 30, yPos, 535, 200, '#1E293B', '#374151');
    
    // Extended Palette Grid with modern styling
    this.drawPremiumPaletteGrid(doc, palette.extendedPalette, yPos + 20);
    
    yPos += 230;
    
    // Sophisticated color sections
    this.drawPremiumColorSection(doc, 'Foundation Neutrals', 
      'Essential building blocks for every outfit',
      palette.coreNeutrals, yPos, '#7C3AED');
    
    yPos += 140;
    
    this.drawPremiumColorSection(doc, 'Accent Lights',
      'Soft highlights that enhance your radiance',
      palette.accentLights, yPos, '#3B82F6');
    
    yPos += 140;
    
    this.drawPremiumColorSection(doc, 'Statement Brights',
      'Your signature power colors',
      palette.accentBrights, yPos, '#EC4899');
  }

  private generateContrastAnalysisPage(doc: any, analysisResult: any) {
    this.drawGradientBackground(doc, '#1E293B', '#374151');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Contrast & Temperature Analysis', 40, 50, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 120;
    
    // Modern analysis cards
    this.drawModernCard(doc, 50, yPos, 240, 150, '#0F172A', '#1E293B');
    this.drawModernCard(doc, 305, yPos, 240, 150, '#0F172A', '#1E293B');
    
    // Contrast Level with modern dial
    doc.fontSize(16)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Contrast Level', 70, yPos + 20);
    
    this.drawModernContrastDial(doc, palette.contrastLevel, 120, yPos + 60);
    
    // Temperature analysis
    doc.fontSize(16)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Temperature Profile', 325, yPos + 20);
    
    doc.fontSize(24)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text(palette.temperatureRating, 325, yPos + 60);
    
    yPos += 190;
    
    // Professional explanation card
    this.drawModernCard(doc, 40, yPos, 515, 120, '#1E293B', '#374151');
    
    doc.fontSize(14)
       .fillColor('#A855F7')
       .font('Helvetica-Bold')
       .text('Your Color Science', 60, yPos + 20);
    
    const explanation = `Your ${palette.contrastLevel.toLowerCase()} contrast level and ${palette.temperatureRating.toLowerCase()} undertones create a sophisticated color profile. This combination allows you to wear bold, dramatic colors with confidence while maintaining elegance.`;
    
    doc.fontSize(11)
       .fillColor('#F1F5F9')
       .font('Helvetica')
       .text(explanation, 60, yPos + 45, { width: 475, lineGap: 4 });
    
    yPos += 150;
    
    // Signature combinations with visual elements
    this.drawModernCard(doc, 40, yPos, 515, 200, '#0F172A', '#1E293B');
    
    doc.fontSize(16)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Signature Color Combinations', 60, yPos + 20);
    
    const combinations = [
      { colors: ['#000000', '#FFFFFF'], name: 'Classic Contrast', desc: 'Maximum impact for formal occasions' },
      { colors: ['#2C3E50', '#F8FAFC'], name: 'Professional Edge', desc: 'Sophisticated yet approachable' },
      { colors: ['#666666', '#C0C0C0'], name: 'Modern Neutral', desc: 'Contemporary and refined' },
      { colors: ['#7C3AED', '#E2E8F0'], name: 'Creative Confidence', desc: 'Bold yet balanced' }
    ];
    
    combinations.forEach((combo, index) => {
      const x = 60 + (index * 120);
      const y = yPos + 60;
      
      // Color pairing visual
      doc.rect(x, y, 25, 25).fillColor(combo.colors[0]).fill();
      doc.rect(x + 30, y, 25, 25).fillColor(combo.colors[1]).fill();
      
      doc.fontSize(9)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text(combo.name, x - 5, y + 35, { width: 70, align: 'center' });
      
      doc.fontSize(7)
         .fillColor('#94A3B8')
         .text(combo.desc, x - 10, y + 50, { width: 80, align: 'center' });
    });
  }

  private generateHairColorPage(doc: any, analysisResult: any) {
    this.drawGradientBackground(doc, '#374151', '#0F172A');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Hair Color Strategy', 40, 50, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 110;
    
    // Header card
    this.drawModernCard(doc, 40, yPos, 515, 60, '#1E293B', '#374151');
    doc.fontSize(14)
       .fillColor('#A855F7')
       .font('Helvetica-Bold')
       .text('Professional Hair Color Recommendations', 60, yPos + 20);
    
    yPos += 80;
    
    // Hair color options with visual cards
    palette.hairColors.forEach((color: string, index: number) => {
      this.drawModernCard(doc, 50, yPos, 495, 80, '#0F172A', '#1E293B');
      
      // Color name with premium styling
      doc.fontSize(16)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text(`${index + 1}. ${color}`, 70, yPos + 15);
      
      // Visual indicator based on hair color
      const colorHex = this.getHairColorHex(color);
      doc.rect(450, yPos + 15, 30, 30)
         .fillColor(colorHex)
         .fill();
      
      doc.rect(450, yPos + 15, 30, 30)
         .strokeColor('#374151')
         .lineWidth(1)
         .stroke();
      
      const explanation = this.getHairColorExplanation(color);
      doc.fontSize(10)
         .fillColor('#CBD5E1')
         .font('Helvetica')
         .text(explanation, 70, yPos + 40, { width: 370, lineGap: 3 });
      
      yPos += 95;
    });
    
    // Professional tips section
    yPos += 10;
    this.drawModernCard(doc, 40, yPos, 515, 140, '#1E293B', '#374151');
    
    doc.fontSize(16)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('Professional Maintenance Guide', 60, yPos + 20);
    
    const tips = [
      '✓ Use purple shampoo weekly to maintain cool tones',
      '✓ Request ash or platinum tones, avoid warm highlights',
      '✓ Touch up roots every 6-8 weeks for optimal contrast',
      '✓ Consider semi-permanent options for subtle changes'
    ];
    
    tips.forEach((tip, index) => {
      doc.fontSize(11)
         .fillColor('#F1F5F9')
         .font('Helvetica')
         .text(tip, 80, yPos + 50 + (index * 20), { width: 450 });
    });
  }

  private generateCosmeticsPage(doc: any, analysisResult: any) {
    this.drawGradientBackground(doc, '#0F172A', '#1E293B');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Named Cosmetics Guide', 40, 50, { align: 'center' });

    const palette = this.expandedColorPalettes[analysisResult.season] || this.expandedColorPalettes['Cool Winter'];
    let yPos = 100;
    
    // Premium cosmetics sections
    const cosmeticSections = [
      { title: 'Foundation Matches', icon: '●', products: palette.makeupBrands.foundation, color: '#EC4899' },
      { title: 'Signature Lipsticks', icon: '●', products: palette.makeupBrands.lipstick, color: '#EF4444' },
      { title: 'Eyeshadow Palettes', icon: '●', products: palette.makeupBrands.eyeshadow, color: '#8B5CF6' }
    ];
    
    cosmeticSections.forEach(section => {
      this.drawModernCard(doc, 40, yPos, 515, 120, '#1E293B', '#374151');
      
      // Section header with color accent
      doc.rect(40, yPos, 515, 40)
         .fillColor(section.color + '20')
         .fill();
      
      doc.fontSize(16)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text(section.title, 60, yPos + 15);
      
      // Color indicator
      doc.circle(500, yPos + 20, 8)
         .fillColor(section.color)
         .fill();
      
      // Product list with premium styling
      section.products.forEach((product: string, index: number) => {
        doc.fontSize(11)
           .fillColor('#F1F5F9')
           .font('Helvetica-Bold')
           .text('• ' + product, 70, yPos + 55 + (index * 18));
      });
      
      yPos += 135;
    });
    
    // Shopping strategy card
    this.drawModernCard(doc, 40, yPos, 515, 160, '#0F172A', '#1E293B');
    
    doc.fontSize(16)
       .fillColor('#A855F7')
       .font('Helvetica-Bold')
       .text('Professional Shopping Strategy', 60, yPos + 20);
    
    const tips = [
      '✓ Test foundation on jawline in natural daylight',
      '✓ Prioritize cool undertones in all product selections',
      '✓ Avoid warm browns, oranges, and golden undertones',
      '✓ Choose silver-based highlighters over gold alternatives',
      '✓ Build your collection around your core neutral palette'
    ];
    
    tips.forEach((tip, index) => {
      doc.fontSize(11)
         .fillColor('#CBD5E1')
         .font('Helvetica')
         .text(tip, 80, yPos + 55 + (index * 20), { width: 450 });
    });
  }

  private generateFabricPage(doc: any, analysisResult: any) {
    this.drawGradientBackground(doc, '#1E293B', '#0F172A');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Fabric & Texture Guide', 40, 50, { align: 'center' });

    const fabrics = this.fabricGuide[analysisResult.season] || this.fabricGuide['Cool Winter'];
    let yPos = 110;
    
    // Header card
    this.drawModernCard(doc, 40, yPos, 515, 60, '#1E293B', '#374151');
    doc.fontSize(14)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('Premium Fabric Recommendations for Your Color Type', 60, yPos + 20);
    
    yPos += 80;
    
    // Fabric recommendations with visual cards
    fabrics.forEach((fabric, index) => {
      const [name, description] = fabric.split(' - ');
      
      this.drawModernCard(doc, 50, yPos, 495, 70, '#0F172A', '#1E293B');
      
      // Fabric name with modern styling
      doc.fontSize(16)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text(name, 70, yPos + 15);
      
      // Visual texture indicator
      const fabricColors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];
      doc.rect(450, yPos + 15, 35, 20)
         .fillColor(fabricColors[index % fabricColors.length])
         .fill();
      
      if (description) {
        doc.fontSize(10)
           .fillColor('#CBD5E1')
           .font('Helvetica')
           .text(description, 70, yPos + 40, { width: 370 });
      }
      
      yPos += 85;
    });
    
    // Texture principles section
    yPos += 10;
    this.drawModernCard(doc, 40, yPos, 515, 180, '#1E293B', '#374151');
    
    doc.fontSize(16)
       .fillColor('#A855F7')
       .font('Helvetica-Bold')
       .text('Professional Texture Guidelines', 60, yPos + 20);
    
    const principles = [
      '✓ Smooth, refined textures enhance your sophisticated palette',
      '✓ Structured fabrics complement your high contrast features',
      '✓ Lustrous finishes work better than matte alternatives',
      '✓ Avoid rough textures like heavy canvas or burlap',
      '✓ Choose quality over quantity - invest in fewer, better pieces'
    ];
    
    principles.forEach((principle, index) => {
      doc.fontSize(11)
         .fillColor('#F1F5F9')
         .font('Helvetica')
         .text(principle, 80, yPos + 55 + (index * 22), { width: 450 });
    });
  }

  private generateOutfitFormulasPage(doc: any, analysisResult: any) {
    this.drawGradientBackground(doc, '#0F172A', '#374151');
    
    doc.fontSize(28)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text('Signature Outfit Formulas', 40, 50, { align: 'center' });

    const formulas = this.outfitFormulas[analysisResult.season] || this.outfitFormulas['Cool Winter'];
    let yPos = 100;
    
    doc.fontSize(12)
       .fillColor('#94A3B8')
       .font('Helvetica')
       .text('Professional styling formulas designed specifically for your color type', 40, 80, { align: 'center' });
    
    // Premium formula cards
    formulas.forEach((formula, index) => {
      const [title, description] = formula.split(' = ');
      
      this.drawModernCard(doc, 40, yPos, 515, 100, '#1E293B', '#374151');
      
      // Formula number indicator
      doc.circle(70, yPos + 25, 12)
         .fillColor('#7C3AED')
         .fill();
      
      doc.fontSize(10)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text((index + 1).toString(), 66, yPos + 21);
      
      // Formula title with premium styling
      doc.fontSize(16)
         .fillColor('#FFFFFF')
         .font('Helvetica-Bold')
         .text(title, 95, yPos + 18);
      
      // Result description with accent color
      doc.fontSize(11)
         .fillColor('#A855F7')
         .font('Helvetica-Oblique')
         .text('Creates: ' + description, 95, yPos + 42, { width: 420 });
      
      // Professional styling tip
      const tip = this.getOutfitTip(index);
      doc.fontSize(9)
         .fillColor('#CBD5E1')
         .font('Helvetica')
         .text('Pro Tip: ' + tip, 95, yPos + 65, { width: 420 });
      
      yPos += 115;
    });
    
    // Master styling principles section
    this.drawModernCard(doc, 40, yPos, 515, 160, '#0F172A', '#1E293B');
    
    doc.fontSize(16)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('Master Styling Principles', 60, yPos + 20);
    
    const principles = [
      '✓ Create intentional contrast between light and dark pieces',
      '✓ Use accessories to introduce your signature accent colors',
      '✓ Maintain clean, structured proportions in all silhouettes',
      '✓ Allow one statement piece to be the outfit\'s focal point',
      '✓ Layer textures within your approved fabric guidelines'
    ];
    
    principles.forEach((principle, index) => {
      doc.fontSize(11)
         .fillColor('#F1F5F9')
         .font('Helvetica')
         .text(principle, 80, yPos + 55 + (index * 20), { width: 450 });
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

  private drawGradientBackground(doc: any, color1: string, color2: string) {
    // Simulate gradient with overlapping rectangles
    for (let i = 0; i < 20; i++) {
      const alpha = i / 20;
      const blendedColor = this.blendColors(color1, color2, alpha);
      doc.rect(0, i * 40, 595, 40)
         .fillColor(blendedColor)
         .fill();
    }
  }

  private drawModernCard(doc: any, x: number, y: number, width: number, height: number, bgColor: string, borderColor: string) {
    // Card shadow effect
    doc.rect(x + 3, y + 3, width, height)
       .fillColor('#00000020')
       .fill();
    
    // Main card
    doc.rect(x, y, width, height)
       .fillColor(bgColor)
       .fill();
    
    // Subtle border
    doc.rect(x, y, width, height)
       .strokeColor(borderColor)
       .lineWidth(1)
       .stroke();
  }

  private drawAccentElements(doc: any, season: string) {
    // Decorative geometric elements based on season
    const accentColor = season === 'Cool Winter' ? '#7C3AED' : '#3B82F6';
    
    // Left accent line
    doc.moveTo(60, 420)
       .lineTo(60, 460)
       .strokeColor(accentColor)
       .lineWidth(4)
       .stroke();
    
    // Right accent dots
    for (let i = 0; i < 3; i++) {
      doc.circle(535, 430 + (i * 15), 3)
         .fillColor(accentColor)
         .fill();
    }
  }

  private drawPremiumPaletteGrid(doc: any, colors: string[], yPos: number) {
    const swatchSize = 32;
    const cols = 8;
    const spacing = 8;
    const startX = 60;
    
    colors.forEach((color, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + (col * (swatchSize + spacing));
      const y = yPos + (row * (swatchSize + spacing));
      
      // Modern shadow effect
      doc.rect(x + 2, y + 2, swatchSize, swatchSize)
         .fillColor('#00000030')
         .fill();
      
      // Color swatch with rounded corners effect
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // Subtle border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#FFFFFF20')
         .lineWidth(1)
         .stroke();
      
      // CMYK label with modern styling
      const cmyk = this.hexToCMYK(color);
      doc.fontSize(6)
         .fillColor('#94A3B8')
         .font('Helvetica')
         .text(cmyk, x - 5, y + swatchSize + 3, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
    });
  }

  private drawPremiumColorSection(doc: any, title: string, description: string, colors: string[], yPos: number, accentColor: string) {
    // Modern section card
    this.drawModernCard(doc, 40, yPos, 515, 120, '#1E293B', '#374151');
    
    // Section header with accent
    doc.rect(40, yPos, 515, 35)
       .fillColor(accentColor + '20')
       .fill();
    
    doc.fontSize(16)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text(title, 60, yPos + 12);
    
    doc.fontSize(10)
       .fillColor('#CBD5E1')
       .font('Helvetica')
       .text(description, 60, yPos + 48);
    
    // Premium color swatches
    const swatchSize = 36;
    const swatchSpacing = 65;
    const startX = 60;
    
    colors.forEach((color, index) => {
      const x = startX + (index * swatchSpacing);
      const y = yPos + 70;
      
      // Shadow effect
      doc.rect(x + 2, y + 2, swatchSize, swatchSize)
         .fillColor('#00000040')
         .fill();
      
      // Main swatch
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // Premium border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#F8FAFC')
         .lineWidth(2)
         .stroke();
      
      // Color name with professional styling
      const colorName = this.getColorName(color);
      doc.fontSize(7)
         .fillColor('#F1F5F9')
         .font('Helvetica-Bold')
         .text(colorName, x - 8, y + swatchSize + 5, { 
           width: swatchSize + 16, 
           align: 'center' 
         });
    });
  }

  private drawModernContrastDial(doc: any, level: string, x: number, y: number) {
    const radius = 35;
    
    // Outer ring with gradient effect
    doc.circle(x, y, radius)
       .strokeColor('#374151')
       .lineWidth(6)
       .stroke();
    
    // Progress ring based on level
    const progress = level === 'High' ? 0.85 : level === 'Medium' ? 0.6 : 0.35;
    const color = level === 'High' ? '#7C3AED' : level === 'Medium' ? '#3B82F6' : '#10B981';
    
    // Simulate progress arc
    doc.circle(x, y, radius - 3)
       .strokeColor(color)
       .lineWidth(4)
       .stroke();
    
    // Center circle
    doc.circle(x, y, 15)
       .fillColor(color)
       .fill();
    
    // Level text
    doc.fontSize(8)
       .fillColor('#FFFFFF')
       .font('Helvetica-Bold')
       .text(level, x - 12, y - 3);
  }

  private getHairColorHex(colorName: string): string {
    const hairColorHexes: { [key: string]: string } = {
      'Ash Brown': '#8B7355',
      'Platinum Blonde': '#F5F5DC',
      'True Black': '#000000',
      'Cool Dark Brown': '#654321'
    };
    
    return hairColorHexes[colorName] || '#666666';
  }

  private blendColors(color1: string, color2: string, ratio: number): string {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

export const workingPdfService = new WorkingPDFService();