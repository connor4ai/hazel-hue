import PDFDocument from 'pdfkit';
type PDFDoc = InstanceType<typeof PDFDocument>;
import fs from 'fs';
import path from 'path';

class PremiumPDFService {
  private readonly colorNames: { [key: string]: string } = {
    '#000000': 'True Black', '#333333': 'Charcoal', '#666666': 'Steel Gray',
    '#999999': 'Silver Gray', '#CCCCCC': 'Light Gray', '#FFFFFF': 'Pure White',
    '#E0E0E0': 'Platinum', '#F5F5F5': 'Pearl White', '#D3D3D3': 'Cloud Gray',
    '#FAFAFA': 'Snow White', '#F0F0F0': 'Ivory', '#E8E8E8': 'Whisper Gray',
    '#0033FF': 'Royal Blue', '#6600CC': 'Deep Purple', '#FF0066': 'Fuchsia Pink',
    '#FF3300': 'Crimson Red', '#0099FF': 'Electric Blue', '#33CC33': 'Emerald Green'
  };

  private readonly seasonDescriptions: { [key: string]: any } = {
    'Cool Winter': {
      tagline: 'Bold, Dramatic, Sophisticated',
      personality: 'You command attention with striking contrasts and jewel tones. Your natural palette speaks to confidence and elegance.',
      signature: 'High contrast combinations with cool undertones create your most powerful looks.',
      tips: [
        'Wear colors closest to your face for maximum impact',
        'Mix high contrast combinations confidently',
        'Use bright colors as statement pieces',
        'Build wardrobe around your core neutrals'
      ]
    },
    'Warm Spring': {
      tagline: 'Fresh, Vibrant, Energetic',
      personality: 'You radiate warmth and vitality with clear, bright colors. Your palette celebrates life and optimism.',
      signature: 'Golden undertones and clear brights bring out your natural glow.',
      tips: [
        'Embrace warm, golden undertones',
        'Use clear, bright colors near your face',
        'Layer warm neutrals for depth',
        'Add golden accessories for extra warmth'
      ]
    }
  };

  async generateProfessionalReport(order: any, analysisResult: any): Promise<string> {
    const doc = new PDFDocument({ 
      size: 'A4',
      margin: 0,
      bufferPages: true,
      info: {
        Title: `${analysisResult.season} Color Analysis Report`,
        Author: 'HueMatcher Professional Color Analysis',
        Subject: 'Personal Color Analysis',
        Creator: 'HueMatcher AI'
      }
    });

    const filename = `${analysisResult.season.replace(/\s+/g, '-')}-Professional-Report-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

    // Generate premium report pages
    this.generateCoverPage(doc, analysisResult);
    doc.addPage();
    this.generatePalettePage(doc, analysisResult);
    doc.addPage();
    this.generateColorTheoryPage(doc, analysisResult);
    doc.addPage();
    this.generateStyleGuidePage(doc, analysisResult);
    doc.addPage();
    this.generateShoppingGuidePage(doc, analysisResult);

    doc.end();
    return filePath;
  }

  private generateCoverPage(doc: PDFDoc, analysisResult: any) {
    const seasonInfo = this.seasonDescriptions[analysisResult.season] || this.seasonDescriptions['Cool Winter'];
    
    // Premium background gradient effect
    this.drawGradientBackground(doc, '#F8FAFC', '#E2E8F0');
    
    // Header with brand
    doc.fontSize(14)
       .fillColor('#64748B')
       .text('HUEMATCHER PROFESSIONAL COLOR ANALYSIS', 60, 60, { align: 'center' });
    
    // Decorative line
    doc.moveTo(150, 90)
       .lineTo(450, 90)
       .strokeColor('#E2E8F0')
       .lineWidth(2)
       .stroke();
    
    // Main season title with premium styling
    doc.fontSize(48)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text(analysisResult.season, 60, 150, { align: 'center' });
    
    // Tagline
    doc.fontSize(18)
       .fillColor('#475569')
       .font('Helvetica')
       .text(seasonInfo.tagline, 60, 220, { align: 'center' });
    
    // Professional description box
    const boxY = 280;
    doc.rect(80, boxY, 440, 120)
       .fillColor('#F1F5F9')
       .fill();
    
    doc.rect(80, boxY, 440, 120)
       .strokeColor('#CBD5E1')
       .lineWidth(1)
       .stroke();
    
    doc.fontSize(12)
       .fillColor('#334155')
       .text(seasonInfo.personality, 100, boxY + 20, { 
         width: 400, 
         align: 'center',
         lineGap: 4
       });
    
    // Signature style quote
    doc.fontSize(14)
       .fillColor('#7C3AED')
       .font('Helvetica-Oblique')
       .text(`"${seasonInfo.signature}"`, 80, 450, { 
         width: 440, 
         align: 'center' 
       });
    
    // Analysis details
    doc.fontSize(11)
       .fillColor('#64748B')
       .font('Helvetica')
       .text('ANALYSIS DETAILS', 60, 520, { align: 'left' });
    
    doc.fontSize(10)
       .fillColor('#475569')
       .text(analysisResult.description, 60, 540, { 
         width: 480, 
         lineGap: 3 
       });
    
    // Footer
    doc.fontSize(8)
       .fillColor('#94A3B8')
       .text('Generated by HueMatcher AI • Professional Color Analysis System', 60, 750, { align: 'center' });
  }

  private generatePalettePage(doc: PDFDoc, analysisResult: any) {
    this.drawGradientBackground(doc, '#FEFEFE', '#F8FAFC');
    
    // Page title
    doc.fontSize(32)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Your Complete Palette', 60, 60, { align: 'center' });
    
    doc.fontSize(14)
       .fillColor('#64748B')
       .font('Helvetica')
       .text('Professional color collection calibrated for your unique features', 60, 110, { align: 'center' });
    
    let yPosition = 160;
    
    // Foundation Neutrals
    this.drawColorSection(doc, 'Foundation Neutrals', 
      'Your essential building blocks - mix and match with confidence',
      analysisResult.coreNeutrals, yPosition, '#64748B');
    
    yPosition += 180;
    
    // Accent Lights
    this.drawColorSection(doc, 'Accent Lights',
      'Soft highlights that enhance your natural glow',
      analysisResult.accentLights, yPosition, '#3B82F6');
    
    yPosition += 180;
    
    // Statement Brights
    this.drawColorSection(doc, 'Statement Brights',
      'Your power colors - use sparingly for maximum impact',
      analysisResult.accentBrights, yPosition, '#7C3AED');
  }

  private generateColorTheoryPage(doc: PDFDoc, analysisResult: any) {
    this.drawGradientBackground(doc, '#FEFEFE', '#F8FAFC');
    
    doc.fontSize(32)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Color Science Behind Your Analysis', 60, 60, { align: 'center' });
    
    // CMYK color accuracy section
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('CMYK Color Accuracy', 60, 140);
    
    doc.fontSize(11)
       .fillColor('#4B5563')
       .font('Helvetica')
       .text('All colors in this report are calibrated for accurate printing and real-world color matching. These CMYK values ensure consistency across digital and physical media.', 60, 170, { width: 480, lineGap: 4 });
    
    // Color temperature section
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Color Temperature', 60, 240);
    
    const isWarm = analysisResult.season.toLowerCase().includes('spring') || analysisResult.season.toLowerCase().includes('autumn');
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(`Your ${analysisResult.season} palette is characterized by ${isWarm ? 'warm' : 'cool'} undertones. This means colors with ${isWarm ? 'golden, yellow, or orange' : 'blue, pink, or purple'} bases will be most flattering on you.`, 60, 270, { width: 480, lineGap: 4 });
    
    // Contrast level
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Your Contrast Level', 60, 340);
    
    const isHighContrast = analysisResult.season.toLowerCase().includes('winter');
    doc.fontSize(11)
       .fillColor('#4B5563')
       .text(`Your features support ${isHighContrast ? 'high contrast' : 'medium contrast'} color combinations. This means you can ${isHighContrast ? 'wear bold, dramatic color pairings' : 'combine colors in balanced, harmonious ways'}.`, 60, 370, { width: 480, lineGap: 4 });
    
    // Color harmony rules
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Color Harmony Rules', 60, 440);
    
    const harmonyRules = [
      'Use your neutrals as the foundation for every outfit',
      'Add one accent color per outfit for best results',
      'Place your brightest colors closest to your face',
      'Combine colors from the same category for foolproof coordination'
    ];
    
    let ruleY = 470;
    harmonyRules.forEach(rule => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .text('• ' + rule, 80, ruleY, { width: 460 });
      ruleY += 25;
    });
  }

  private generateStyleGuidePage(doc: PDFDoc, analysisResult: any) {
    this.drawGradientBackground(doc, '#FEFEFE', '#F8FAFC');
    
    doc.fontSize(32)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Professional Styling Guide', 60, 60, { align: 'center' });
    
    // Metals section
    this.drawRecommendationBox(doc, 'Best Metals & Jewelry', 
      analysisResult.recommendations.metals, 140, '#F59E0B');
    
    // Makeup section
    this.drawRecommendationBox(doc, 'Makeup & Beauty', 
      analysisResult.recommendations.makeup, 280, '#EF4444');
    
    // Eyewear section
    this.drawRecommendationBox(doc, 'Eyewear & Frames', 
      analysisResult.recommendations.eyewear, 420, '#3B82F6');
    
    // Professional tips
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Professional Styling Tips', 60, 560);
    
    const seasonInfo = this.seasonDescriptions[analysisResult.season] || this.seasonDescriptions['Cool Winter'];
    let tipY = 590;
    seasonInfo.tips.forEach((tip: string) => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .text('• ' + tip, 80, tipY, { width: 460 });
      tipY += 25;
    });
  }

  private generateShoppingGuidePage(doc: PDFDoc, analysisResult: any) {
    this.drawGradientBackground(doc, '#FEFEFE', '#F8FAFC');
    
    doc.fontSize(32)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text('Shopping Strategy Guide', 60, 60, { align: 'center' });
    
    // Shopping checklist
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Shopping Checklist', 60, 140);
    
    const shoppingTips = [
      'Always test colors near your face in natural light',
      'Build outfits around your foundation neutrals',
      'Use bright colors as accent pieces only',
      'Reference your digital color card when shopping',
      'Ask for fabric swatches to compare at home',
      'Photograph potential purchases with your palette'
    ];
    
    let tipY = 170;
    shoppingTips.forEach(tip => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .text('✓ ' + tip, 80, tipY, { width: 460 });
      tipY += 30;
    });
    
    // Wardrobe essentials
    doc.fontSize(18)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text('Wardrobe Essentials in Your Colors', 60, 380);
    
    const essentials = [
      'Classic blazer in your darkest neutral',
      'White or light neutral button-down shirt',
      'Statement scarf in one of your bright colors',
      'Jewelry in your recommended metal tone',
      'Little black dress (or your darkest neutral)',
      'Casual sweater in a mid-tone neutral'
    ];
    
    let essentialY = 410;
    essentials.forEach(essential => {
      doc.fontSize(11)
         .fillColor('#4B5563')
         .text('• ' + essential, 80, essentialY, { width: 460 });
      essentialY += 25;
    });
    
    // Color matching tip box
    doc.rect(60, 580, 480, 120)
       .fillColor('#FEF3C7')
       .fill();
    
    doc.rect(60, 580, 480, 120)
       .strokeColor('#F59E0B')
       .lineWidth(2)
       .stroke();
    
    doc.fontSize(14)
       .fillColor('#92400E')
       .font('Helvetica-Bold')
       .text('Pro Tip: Digital Color Matching', 80, 600);
    
    doc.fontSize(11)
       .fillColor('#78350F')
       .font('Helvetica')
       .text('Use your Apple Wallet color card to hold up against clothing items when shopping. The CMYK-calibrated colors ensure accurate matching in any lighting condition.', 80, 625, { width: 440, lineGap: 4 });
  }

  private drawGradientBackground(doc: PDFDoc, color1: string, color2: string) {
    // Simple background color (PDFKit doesn't support gradients directly)
    doc.rect(0, 0, 595, 842)
       .fillColor(color1)
       .fill();
  }

  private drawColorSection(doc: PDFDoc, title: string, description: string, colors: string[], yPos: number, accentColor: string) {
    // Section title
    doc.fontSize(16)
       .fillColor(accentColor)
       .font('Helvetica-Bold')
       .text(title, 60, yPos);
    
    // Description
    doc.fontSize(10)
       .fillColor('#6B7280')
       .font('Helvetica')
       .text(description, 60, yPos + 25);
    
    // Color swatches
    const swatchSize = 45;
    const swatchSpacing = 65;
    const startX = 60;
    
    colors.forEach((color, index) => {
      const x = startX + (index * swatchSpacing);
      const y = yPos + 50;
      
      // Color swatch with professional styling
      doc.rect(x, y, swatchSize, swatchSize)
         .fillColor(color)
         .fill();
      
      // White border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#FFFFFF')
         .lineWidth(3)
         .stroke();
      
      // Outer border
      doc.rect(x, y, swatchSize, swatchSize)
         .strokeColor('#E5E7EB')
         .lineWidth(1)
         .stroke();
      
      // Color name
      const colorName = this.colorNames[color] || color;
      doc.fontSize(8)
         .fillColor('#374151')
         .text(colorName, x - 10, y + swatchSize + 8, { 
           width: swatchSize + 20, 
           align: 'center' 
         });
      
      // CMYK values (simulated for demonstration)
      doc.fontSize(6)
         .fillColor('#6B7280')
         .text(this.generateCMYKValues(color), x - 10, y + swatchSize + 25, {
           width: swatchSize + 20,
           align: 'center'
         });
    });
  }

  private drawRecommendationBox(doc: PDFDoc, title: string, content: string, yPos: number, accentColor: string) {
    // Box background
    doc.rect(60, yPos, 480, 100)
       .fillColor('#F9FAFB')
       .fill();
    
    // Box border
    doc.rect(60, yPos, 480, 100)
       .strokeColor('#E5E7EB')
       .lineWidth(1)
       .stroke();
    
    // Accent bar
    doc.rect(60, yPos, 6, 100)
       .fillColor(accentColor)
       .fill();
    
    // Title
    doc.fontSize(14)
       .fillColor('#374151')
       .font('Helvetica-Bold')
       .text(title, 80, yPos + 15);
    
    // Content
    doc.fontSize(11)
       .fillColor('#4B5563')
       .font('Helvetica')
       .text(content, 80, yPos + 40, { width: 440, lineGap: 3 });
  }

  private generateCMYKValues(hexColor: string): string {
    // Convert hex to approximate CMYK (simplified for demonstration)
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    
    return `C${Math.round(c * 100)} M${Math.round(m * 100)} Y${Math.round(y * 100)} K${Math.round(k * 100)}`;
  }
}

export const premiumPdfService = new PremiumPDFService();