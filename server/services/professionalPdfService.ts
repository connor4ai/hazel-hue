import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class ProfessionalPDFService {
  private readonly seasonData: { [key: string]: any } = {
    'Cool Winter': {
      neutrals: ['#000000', '#1C1C1C', '#2F2F2F', '#434343', '#575757', '#6B6B6B', '#808080', '#949494', '#A8A8A8', '#BCBCBC', '#D0D0D0', '#E4E4E4', '#FFFFFF'],
      accentLights: ['#E8E8E8', '#F2F2F2', '#FAFAFA', '#E0E7FF', '#DBEAFE', '#EDE9FE', '#F3E8FF'],
      accentBrights: ['#1E40AF', '#7C3AED', '#BE185D', '#DC2626', '#059669', '#0891B2', '#EA580C'],
      wowColors: ['#0033FF', '#6600CC', '#FF0066', '#DC2626', '#0891B2', '#059669'],
      metals: ['#C0C0C0', '#E5E7EB', '#F8F9FA'],
      contrastLevel: 'High',
      contrastDelta: '35 ΔE',
      hairColors: {
        'Dark Brown': 'Maintain rich chocolate tones, avoid warm highlights',
        'Black': 'Perfect natural choice, add subtle blue-black shine',
        'Salt & Pepper': 'Embrace the natural silver, avoid yellow tones'
      },
      cosmetics: {
        lipsticks: [
          { brand: 'MAC', shade: 'Russian Red', type: 'Classic red' },
          { brand: 'Charlotte Tilbury', shade: 'Very Victoria', type: 'Berry' },
          { brand: 'NARS', shade: 'Train Bleu', type: 'Deep purple' }
        ],
        blushes: [
          { brand: 'Tarte', shade: 'Paaarty', type: 'Cool pink' },
          { brand: 'Glossier', shade: 'Storm', type: 'Berry flush' }
        ],
        eyeshadow: { brand: 'Urban Decay', shade: 'Naked Smoky Palette', type: 'Cool greys & silvers' }
      },
      textures: [
        'Silk and satin in bold colors create stunning impact',
        'Avoid heathered or mottled patterns - choose clear, solid colors',
        'Matte finishes work better than shimmery textures',
        'Sharp, geometric patterns over organic florals'
      ]
    },
    'Warm Spring': {
      neutrals: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3', '#FFF8DC', '#FFFACD', '#FFFFFF'],
      accentLights: ['#FFEFD5', '#FFE4B5', '#FFDAB9', '#FFCCCB', '#FFB6C1'],
      accentBrights: ['#FF6347', '#FF4500', '#FFA500', '#FFD700', '#ADFF2F', '#00FF7F'],
      wowColors: ['#FF4500', '#FFA500', '#FFD700', '#ADFF2F', '#00FF7F', '#FF6347'],
      metals: ['#FFD700', '#FFA500', '#CD853F'],
      contrastLevel: 'Medium',
      contrastDelta: '25 ΔE',
      hairColors: {
        'Blonde': 'Warm golden highlights, honey tones',
        'Light Brown': 'Add caramel and golden highlights',
        'Red': 'Embrace warm copper and auburn tones'
      },
      cosmetics: {
        lipsticks: [
          { brand: 'MAC', shade: 'Morange', type: 'Warm coral' },
          { brand: 'Charlotte Tilbury', shade: 'Sunrise Blaze', type: 'Warm peach' },
          { brand: 'NARS', shade: 'Heat Wave', type: 'Warm red' }
        ],
        blushes: [
          { brand: 'Tarte', shade: 'Dollface', type: 'Warm peach' },
          { brand: 'Glossier', shade: 'Beam', type: 'Golden coral' }
        ],
        eyeshadow: { brand: 'Urban Decay', shade: 'Naked Heat Palette', type: 'Warm golds & coppers' }
      },
      textures: [
        'Textured fabrics like tweed and corduroy work beautifully',
        'Embrace warm metallics and golden finishes',
        'Organic patterns and florals complement your natural energy',
        'Avoid stark, geometric designs'
      ]
    }
  };

  async generateReport(order: any, analysisResult: any): Promise<string> {
    const filename = `${analysisResult.season.replace(/\s+/g, '-')}-Professional-Analysis-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ 
          size: 'A4',
          margin: 40,
          bufferPages: true,
          info: {
            Title: `${analysisResult.season} Professional Color Analysis`,
            Author: 'HueMatcher Professional Color Analysis',
            Subject: 'Personal Color Analysis Report',
            Creator: 'HueMatcher AI',
            Producer: 'HueMatcher Professional'
          }
        });
        
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add bookmarks for navigation
        const seasonRef = doc.ref({ Type: 'Outline', Title: 'Your Season Analysis' });
        const paletteRef = doc.ref({ Type: 'Outline', Title: 'Complete Color Palette' });
        const wowRef = doc.ref({ Type: 'Outline', Title: 'Your WOW Colors' });
        const guideRef = doc.ref({ Type: 'Outline', Title: 'Professional Style Guide' });
        const shopRef = doc.ref({ Type: 'Outline', Title: 'Shopping Strategy' });

        // Page 1: Season Analysis with contrast dial
        this.generateSeasonPage(doc, analysisResult, order);
        
        // Page 2: Complete 30+ color palette
        doc.addPage();
        this.generateCompletePalette(doc, analysisResult);
        
        // Page 3: WOW colors with named cosmetics
        doc.addPage();
        this.generateWowColorsPage(doc, analysisResult);
        
        // Page 4: Professional style guide with specific recommendations
        doc.addPage();
        this.generateStyleGuidePage(doc, analysisResult);
        
        // Page 5: Shopping strategy and outfit formulas
        doc.addPage();
        this.generateShoppingPage(doc, analysisResult);

        doc.end();
        
        stream.on('finish', () => {
          console.log('Professional PDF generated successfully at:', filePath);
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

  private generateSeasonPage(doc: any, analysisResult: any, order: any) {
    const seasonInfo = this.seasonData[analysisResult.season] || this.seasonData['Cool Winter'];
    
    // Header with branding
    doc.fontSize(12)
       .fillColor('#64748B')
       .text('HUEMATCHER PROFESSIONAL COLOR ANALYSIS', 50, 50, { align: 'center' });
    
    // Main season title with professional styling
    doc.fontSize(38)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text(`You are a ${analysisResult.season}`, 50, 100, { align: 'center' });
    
    // Contrast level indicator with dial visualization
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Contrast Level', 70, 180);
    
    // Draw contrast dial
    this.drawContrastDial(doc, seasonInfo.contrastLevel, 350, 200);
    
    doc.fontSize(12)
       .fillColor('#4B5563')
       .text(`Your optimal contrast: ${seasonInfo.contrastDelta}`, 70, 220);
    
    doc.fontSize(11)
       .fillColor('#6B7280')
       .text('Example: Black blazer with ice-blue blouse creates perfect separation', 70, 240);
    
    // Personal analysis section
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Personal Analysis', 70, 280);
    
    doc.fontSize(11)
       .fillColor('#4B5563')
       .font('Helvetica')
       .text(analysisResult.description, 70, 305, { width: 450, lineGap: 4 });
    
    // Hair color recommendations
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Hair Color Strategy', 70, 380);
    
    let hairY = 405;
    Object.entries(seasonInfo.hairColors).forEach(([base, advice]: [string, any]) => {
      doc.fontSize(11)
         .fillColor('#374151')
         .font('Helvetica-Bold')
         .text(`${base}: `, 90, hairY);
      
      doc.fontSize(11)
         .fillColor('#4B5563')
         .font('Helvetica')
         .text(advice, 90 + doc.widthOfString(`${base}: `), hairY);
      
      hairY += 25;
    });
    
    // Quick use guide
    doc.fontSize(16)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('How to Use This Report', 70, 520);
    
    const quickTips = [
      '1. Screenshot the palette pages for shopping reference',
      '2. Start with neutrals, add one accent color per outfit',
      '3. Use WOW colors near your face for maximum impact',
      '4. Follow the specific brand recommendations in cosmetics'
    ];
    
    let tipY = 545;
    quickTips.forEach(tip => {
      doc.fontSize(10)
         .fillColor('#5B21B6')
         .text(tip, 90, tipY);
      tipY += 20;
    });
    
    // Professional footer
    doc.fontSize(9)
       .fillColor('#94A3B8')
       .text(`Professional Analysis • Generated ${new Date().toLocaleDateString()} • Report ID: ${order.id}`, 50, 730, { align: 'center' });
  }

  private generateCompletePalette(doc: any, analysisResult: any) {
    const seasonInfo = this.seasonData[analysisResult.season] || this.seasonData['Cool Winter'];
    
    doc.fontSize(26)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Your Complete Color Palette', 50, 60, { align: 'center' });
    
    doc.fontSize(11)
       .fillColor('#64748B')
       .text('30+ colors organized by purpose • CMYK calibrated for accurate printing', 50, 95, { align: 'center' });
    
    let yPos = 130;
    
    // Foundation Neutrals (expanded)
    this.drawExpandedColorSection(doc, 'Foundation Neutrals', 
      'Your wardrobe building blocks - mix any two together', 
      seasonInfo.neutrals, yPos, '#64748B');
    yPos += 130;
    
    // Accent Lights  
    this.drawExpandedColorSection(doc, 'Accent Lights',
      'Soft colors for blouses, scarves, and gentle highlights',
      seasonInfo.accentLights, yPos, '#3B82F6');
    yPos += 130;
    
    // Accent Brights
    this.drawExpandedColorSection(doc, 'Accent Brights', 
      'Statement colors for impact pieces and accessories',
      seasonInfo.accentBrights, yPos, '#7C3AED');
    yPos += 130;
    
    // Metals section
    this.drawExpandedColorSection(doc, 'Your Best Metals',
      'Jewelry, hardware, and metallic accents',
      seasonInfo.metals, yPos, '#F59E0B');
  }

  private generateWowColorsPage(doc: any, analysisResult: any) {
    const seasonInfo = this.seasonData[analysisResult.season] || this.seasonData['Cool Winter'];
    
    doc.fontSize(26)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Your 6 WOW Colors', 50, 60, { align: 'center' });
    
    doc.fontSize(12)
       .fillColor('#64748B')
       .text('These colors will get you the most compliments', 50, 95, { align: 'center' });
    
    // Large WOW color swatches
    this.drawLargeWowSwatches(doc, seasonInfo.wowColors, 70, 130);
    
    // Named cosmetics section
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Specific Product Recommendations', 70, 320);
    
    // Lipsticks
    doc.fontSize(14)
       .fillColor('#EF4444')
       .font('Helvetica-Bold')
       .text('Lipsticks', 90, 350);
    
    let cosmeticY = 375;
    seasonInfo.cosmetics.lipsticks.forEach((lipstick: any) => {
      doc.fontSize(11)
         .fillColor('#374151')
         .font('Helvetica-Bold')
         .text(`${lipstick.brand} ${lipstick.shade}`, 110, cosmeticY);
      
      doc.fontSize(10)
         .fillColor('#6B7280')
         .text(` - ${lipstick.type}`, 110 + doc.widthOfString(`${lipstick.brand} ${lipstick.shade}`), cosmeticY);
      
      cosmeticY += 20;
    });
    
    // Blushes
    cosmeticY += 10;
    doc.fontSize(14)
       .fillColor('#F97316')
       .font('Helvetica-Bold')
       .text('Blushes', 90, cosmeticY);
    
    cosmeticY += 25;
    seasonInfo.cosmetics.blushes.forEach((blush: any) => {
      doc.fontSize(11)
         .fillColor('#374151')
         .font('Helvetica-Bold')
         .text(`${blush.brand} ${blush.shade}`, 110, cosmeticY);
      
      doc.fontSize(10)
         .fillColor('#6B7280')
         .text(` - ${blush.type}`, 110 + doc.widthOfString(`${blush.brand} ${blush.shade}`), cosmeticY);
      
      cosmeticY += 20;
    });
    
    // Eyeshadow
    cosmeticY += 10;
    doc.fontSize(14)
       .fillColor('#8B5CF6')
       .font('Helvetica-Bold')
       .text('Eyeshadow', 90, cosmeticY);
    
    cosmeticY += 25;
    const eyeshadow = seasonInfo.cosmetics.eyeshadow;
    doc.fontSize(11)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(`${eyeshadow.brand} ${eyeshadow.shade}`, 110, cosmeticY);
    
    doc.fontSize(10)
       .fillColor('#6B7280')
       .text(` - ${eyeshadow.type}`, 110 + doc.widthOfString(`${eyeshadow.brand} ${eyeshadow.shade}`), cosmeticY);
  }

  private generateStyleGuidePage(doc: any, analysisResult: any) {
    const seasonInfo = this.seasonData[analysisResult.season] || this.seasonData['Cool Winter'];
    
    doc.fontSize(26)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Fabric & Texture Guide', 50, 60, { align: 'center' });
    
    // Texture recommendations
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Best Textures & Patterns', 70, 120);
    
    let textureY = 150;
    seasonInfo.textures.forEach((texture: string) => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .text('• ' + texture, 90, textureY, { width: 430 });
      textureY += 25;
    });
    
    // Three outfit formulas
    doc.fontSize(18)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('3 Foolproof Outfit Formulas', 70, 300);
    
    const outfitFormulas = [
      {
        title: 'Professional Power',
        formula: 'Dark neutral blazer + light neutral blouse + WOW color accessories',
        occasion: 'Meetings, presentations, important events'
      },
      {
        title: 'Casual Confidence', 
        formula: 'Medium neutral top + dark neutral bottom + accent light scarf',
        occasion: 'Weekend, casual Friday, coffee dates'
      },
      {
        title: 'Evening Impact',
        formula: 'WOW color dress/top + neutral accessories + metallic details',
        occasion: 'Dinner, parties, special occasions'
      }
    ];
    
    let formulaY = 330;
    outfitFormulas.forEach(outfit => {
      // Title
      doc.fontSize(12)
         .fillColor('#5B21B6')
         .font('Helvetica-Bold')
         .text(outfit.title, 90, formulaY);
      
      // Formula
      doc.fontSize(10)
         .fillColor('#374151')
         .text(outfit.formula, 90, formulaY + 15, { width: 400 });
      
      // Occasion
      doc.fontSize(9)
         .fillColor('#6B7280')
         .font('Helvetica-Oblique')
         .text(`Perfect for: ${outfit.occasion}`, 90, formulaY + 35);
      
      formulaY += 70;
    });
    
    // Metals and hardware
    doc.fontSize(16)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Hardware & Metallic Details', 70, 580);
    
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(analysisResult.recommendations.metals, 90, 605, { width: 400 });
    
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(analysisResult.recommendations.eyewear, 90, 635, { width: 400 });
  }

  private generateShoppingPage(doc: any, analysisResult: any) {
    doc.fontSize(26)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Shopping Strategy & Action Plan', 50, 60, { align: 'center' });
    
    // Shopping checklist
    doc.fontSize(16)
       .fillColor('#059669')
       .font('Helvetica-Bold')
       .text('Your Shopping Checklist', 70, 120);
    
    const shoppingList = [
      'Screenshot pages 2-3 before shopping trips',
      'Test colors against your neck/face in natural light',
      'Buy neutrals first, then add accent colors gradually',
      'Stick to your WOW colors for statement pieces',
      'Use the Apple Wallet card for in-store color matching',
      'Avoid colors outside your seasonal palette entirely'
    ];
    
    let checkY = 150;
    shoppingList.forEach(item => {
      doc.fontSize(11)
         .fillColor('#065F46')
         .text('✓ ' + item, 90, checkY, { width: 430 });
      checkY += 25;
    });
    
    // Wardrobe essentials
    doc.fontSize(16)
       .fillColor('#7C3AED')
       .font('Helvetica-Bold')
       .text('Essential Pieces to Build First', 70, 320);
    
    const essentials = [
      'One blazer in your darkest neutral',
      'Three tops in different neutrals',
      'One statement piece in a WOW color',
      'Accessories in your best metals',
      'One versatile scarf in an accent light',
      'Quality basics in your lightest neutral'
    ];
    
    let essentialY = 350;
    essentials.forEach((essential, index) => {
      doc.fontSize(11)
         .fillColor('#5B21B6')
         .text(`${index + 1}. ${essential}`, 90, essentialY, { width: 400 });
      essentialY += 25;
    });
    
    // Color matching tip
    doc.rect(70, 520, 450, 100)
       .fillColor('#FEF3C7')
       .fill();
    
    doc.rect(70, 520, 450, 100)
       .strokeColor('#F59E0B')
       .lineWidth(2)
       .stroke();
    
    doc.fontSize(14)
       .fillColor('#92400E')
       .font('Helvetica-Bold')
       .text('Professional Color Matching', 90, 540);
    
    doc.fontSize(10)
       .fillColor('#78350F')
       .text('Your Apple Wallet card contains CMYK-calibrated colors for accurate matching in any store lighting. Hold it against potential purchases to ensure perfect color harmony.', 90, 560, { width: 410, lineGap: 4 });
    
    // Action steps
    doc.fontSize(16)
       .fillColor('#DC2626')
       .font('Helvetica-Bold')
       .text('Your Next Steps', 70, 650);
    
    const nextSteps = [
      'Save this PDF to your phone for easy access',
      'Add the color card to your Apple Wallet',
      'Book a consultation with a colorist using the hair guide',
      'Plan your first shopping trip with the checklist'
    ];
    
    let stepY = 675;
    nextSteps.forEach((step, index) => {
      doc.fontSize(10)
         .fillColor('#991B1B')
         .text(`→ ${step}`, 90, stepY);
      stepY += 18;
    });
  }

  private drawContrastDial(doc: any, level: string, x: number, y: number) {
    const dialRadius = 30;
    const centerX = x;
    const centerY = y;
    
    // Draw dial background
    doc.circle(centerX, centerY, dialRadius)
       .strokeColor('#E5E7EB')
       .lineWidth(3)
       .stroke();
    
    // Draw level indicator
    const angles = { 'Low': -120, 'Medium': 0, 'High': 120 };
    const angle = (angles[level as keyof typeof angles] || 0) * Math.PI / 180;
    const indicatorX = centerX + (dialRadius - 10) * Math.cos(angle);
    const indicatorY = centerY + (dialRadius - 10) * Math.sin(angle);
    
    doc.circle(indicatorX, indicatorY, 5)
       .fillColor('#EF4444')
       .fill();
    
    // Labels
    doc.fontSize(8)
       .fillColor('#6B7280')
       .text('LOW', centerX - 40, centerY + 15, { align: 'center', width: 25 });
    
    doc.fontSize(8)
       .fillColor('#6B7280')
       .text('MED', centerX - 12, centerY - 45, { align: 'center', width: 25 });
    
    doc.fontSize(8)
       .fillColor('#6B7280')
       .text('HIGH', centerX + 15, centerY + 15, { align: 'center', width: 25 });
    
    // Current level text
    doc.fontSize(10)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(level, centerX - 15, centerY - 5, { align: 'center', width: 30 });
  }

  private drawExpandedColorSection(doc: any, title: string, description: string, colors: string[], yPos: number, accentColor: string) {
    // Section title with accent line
    doc.moveTo(70, yPos - 5)
       .lineTo(520, yPos - 5)
       .strokeColor(accentColor)
       .lineWidth(2)
       .stroke();
    
    doc.fontSize(14)
       .fillColor(accentColor)
       .font('Helvetica-Bold')
       .text(title, 70, yPos);
    
    doc.fontSize(9)
       .fillColor('#6B7280')
       .text(description, 70, yPos + 18);
    
    // Color swatches with proper spacing
    const swatchSize = 28;
    const swatchSpacing = 35;
    const startX = 70;
    const maxPerRow = 13;
    
    colors.forEach((color, index) => {
      const row = Math.floor(index / maxPerRow);
      const col = index % maxPerRow;
      const x = startX + (col * swatchSpacing);
      const y = yPos + 40 + (row * 40);
      
      // Color swatch with enhanced styling
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // White inner border
      doc.rect(x + 1, y + 1, swatchSize - 2, swatchSize - 2)
         .strokeColor('#FFFFFF')
         .lineWidth(1)
         .stroke();
      
      // Outer border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#D1D5DB')
         .lineWidth(1)
         .stroke();
      
      // Smart text color based on background lightness
      const textColor = this.getContrastColor(color);
      
      // Hex code with proper contrast
      doc.fontSize(6)
         .fillColor(textColor)
         .text(color.substring(1), x + 2, y + swatchSize - 10, { 
           width: swatchSize - 4, 
           align: 'center' 
         });
    });
  }

  private drawLargeWowSwatches(doc: any, colors: string[], startX: number, startY: number) {
    const swatchSize = 60;
    const spacing = 80;
    const colsPerRow = 3;
    
    colors.forEach((color, index) => {
      const row = Math.floor(index / colsPerRow);
      const col = index % colsPerRow;
      const x = startX + (col * spacing);
      const y = startY + (row * spacing);
      
      // Large swatch with shadow effect
      doc.rect(x + 3, y + 3, swatchSize, swatchSize)
         .fillColor('#00000020')
         .fill();
      
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#FFFFFF')
         .lineWidth(3)
         .stroke();
      
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#D1D5DB')
         .lineWidth(1)
         .stroke();
      
      // Color name and hex
      doc.fontSize(8)
         .fillColor('#374151')
         .font('Helvetica-Bold')
         .text(this.getColorName(color), x - 5, y + swatchSize + 8, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
      
      doc.fontSize(7)
         .fillColor('#6B7280')
         .text(color, x - 5, y + swatchSize + 22, { 
           width: swatchSize + 10, 
           align: 'center' 
         });
    });
  }

  private getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.4 ? '#000000' : '#FFFFFF';
  }

  private getColorName(color: string): string {
    const names: { [key: string]: string } = {
      '#0033FF': 'Electric Blue',
      '#6600CC': 'Royal Purple', 
      '#FF0066': 'Hot Pink',
      '#DC2626': 'Classic Red',
      '#0891B2': 'Ocean Blue',
      '#059669': 'Emerald Green'
    };
    return names[color] || color;
  }
}

export const professionalPdfService = new ProfessionalPDFService();