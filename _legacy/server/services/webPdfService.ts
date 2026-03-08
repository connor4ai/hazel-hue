import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";

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

class WebPdfService {
  private readonly seasonThemes = {
    'Cool Winter': {
      primary: '#1a365d',
      secondary: '#2c5282',
      accent: '#3182ce',
      gradient: ['#1a202c', '#2d3748', '#4a5568'],
      textLight: '#ffffff',
      textDark: '#2d3748'
    },
    'Cool Summer': {
      primary: '#553c9a',
      secondary: '#6b46c1',
      accent: '#8b5cf6',
      gradient: ['#44337a', '#553c9a', '#6b46c1'],
      textLight: '#ffffff',
      textDark: '#2d3748'
    },
    'Warm Spring': {
      primary: '#c05621',
      secondary: '#dd6b20',
      accent: '#ed8936',
      gradient: ['#9c4221', '#c05621', '#dd6b20'],
      textLight: '#ffffff',
      textDark: '#2d3748'
    },
    'Warm Autumn': {
      primary: '#9c2a00',
      secondary: '#c53030',
      accent: '#e53e3e',
      gradient: ['#742a2a', '#9c2a00', '#c53030'],
      textLight: '#ffffff',
      textDark: '#2d3748'
    }
  };

  async generateReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const filename = `professional-analysis-${order.id}-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Generate sophisticated pages
      this.generateProfessionalCover(pdf, analysisResult);
      pdf.addPage();
      this.generateAdvancedPalette(pdf, analysisResult);
      pdf.addPage();
      this.generateDetailedAnalysis(pdf, analysisResult);
      pdf.addPage();
      this.generateStyleGuide(pdf, analysisResult);
      pdf.addPage();
      this.generateShoppingSuite(pdf, analysisResult);

      const pdfBuffer = pdf.output('arraybuffer');
      fs.writeFileSync(filePath, Buffer.from(pdfBuffer));
      
      console.log('Web PDF generated successfully at:', filePath);
      return filePath;
      
    } catch (error) {
      console.error('Web PDF generation error:', error);
      throw error;
    }
  }

  private generateProfessionalCover(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.seasonThemes[analysisResult.season as keyof typeof this.seasonThemes] || this.seasonThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Sophisticated gradient background (simulated with layered rectangles)
    for (let i = 0; i < 3; i++) {
      const alpha = 0.3 - (i * 0.1);
      pdf.setFillColor(theme.gradient[i]);
      // pdf.setGState(new pdf.GState({ opacity: alpha }));
      pdf.rect(0, (pageHeight / 3) * i, pageWidth, pageHeight / 3, 'F');
    }
    // pdf.setGState(new pdf.GState({ opacity: 1 }));
    
    // Elegant overlay card
    pdf.setFillColor('#ffffff');
    pdf.setDrawColor(theme.primary);
    pdf.setLineWidth(0.5);
    this.drawRoundedRect(pdf, 25, 50, pageWidth - 50, pageHeight - 100, 8);
    pdf.rect(25, 50, pageWidth - 50, pageHeight - 100, 'DF');
    
    // Premium branding
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('HUEMATCHER', pageWidth / 2, 85, { align: 'center' });
    pdf.setFontSize(10);
    pdf.text('PROFESSIONAL COLOR ANALYSIS', pageWidth / 2, 95, { align: 'center' });
    
    // Decorative elements
    pdf.setDrawColor(theme.accent);
    pdf.setLineWidth(1);
    pdf.line(60, 110, pageWidth - 60, 110);
    
    // Season title with sophisticated typography
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(36);
    pdf.text(analysisResult.season.toUpperCase(), pageWidth / 2, 150, { align: 'center' });
    
    // Elegant subtitle
    pdf.setTextColor('#666666');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(16);
    pdf.text('Your Personal Color Profile', pageWidth / 2, 170, { align: 'center' });
    
    // Description with refined formatting
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const descWords = analysisResult.description.split(' ');
    let currentLine = '';
    let yPos = 200;
    
    for (const word of descWords) {
      const testLine = currentLine + word + ' ';
      const textWidth = pdf.getTextWidth(testLine);
      if (textWidth > (pageWidth - 80) && currentLine !== '') {
        pdf.text(currentLine.trim(), pageWidth / 2, yPos, { align: 'center' });
        currentLine = word + ' ';
        yPos += 15;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine.trim()) {
      pdf.text(currentLine.trim(), pageWidth / 2, yPos, { align: 'center' });
    }
    
    // Signature color preview
    this.drawSignatureStrip(pdf, analysisResult, theme, 40, 240);
  }

  private generateAdvancedPalette(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.seasonThemes[analysisResult.season as keyof typeof this.seasonThemes] || this.seasonThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Professional header
    pdf.setFillColor(theme.primary);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('COMPLETE COLOR PALETTE', pageWidth / 2, 25, { align: 'center' });
    
    // Core Neutrals section
    this.drawPaletteSection(pdf, 'CORE NEUTRALS', 
      'Foundation colors for 60% of your wardrobe', 
      analysisResult.coreNeutrals, 60, theme);
    
    // Accent Lights section
    this.drawPaletteSection(pdf, 'ACCENT LIGHTS', 
      'Supporting colors for shirts, blouses, and accessories', 
      analysisResult.accentLights, 120, theme);
    
    // Accent Brights section
    this.drawPaletteSection(pdf, 'ACCENT BRIGHTS', 
      'Statement colors for maximum impact and personal expression', 
      analysisResult.accentBrights, 180, theme);
    
    // Color theory explanation
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Each color has been selected based on your unique undertones, contrast level, and chromatic intensity.', 
      30, 250);
    pdf.text('Use these combinations to create harmonious, sophisticated looks that enhance your natural beauty.', 
      30, 265);
  }

  private generateDetailedAnalysis(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.seasonThemes[analysisResult.season as keyof typeof this.seasonThemes] || this.seasonThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Header
    pdf.setFillColor(theme.secondary);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('DETAILED ANALYSIS', pageWidth / 2, 25, { align: 'center' });
    
    // Analysis cards
    this.drawAnalysisCard(pdf, 'UNDERTONE ANALYSIS', 
      this.getUndertoneAnalysis(analysisResult.season), 60, theme);
    
    this.drawAnalysisCard(pdf, 'CONTRAST LEVEL', 
      this.getContrastAnalysis(analysisResult.season), 130, theme);
    
    this.drawAnalysisCard(pdf, 'CHROMATIC INTENSITY', 
      this.getChromaticAnalysis(analysisResult.season), 200, theme);
  }

  private generateStyleGuide(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.seasonThemes[analysisResult.season as keyof typeof this.seasonThemes] || this.seasonThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Header
    pdf.setFillColor(theme.accent);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('STYLE RECOMMENDATIONS', pageWidth / 2, 25, { align: 'center' });
    
    // Recommendation sections
    this.drawStyleCard(pdf, 'METALS & JEWELRY', analysisResult.recommendations.metals, 60, theme);
    this.drawStyleCard(pdf, 'EYEWEAR SELECTION', analysisResult.recommendations.eyewear, 130, theme);
    this.drawStyleCard(pdf, 'MAKEUP PALETTE', analysisResult.recommendations.makeup, 200, theme);
  }

  private generateShoppingSuite(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.seasonThemes[analysisResult.season as keyof typeof this.seasonThemes] || this.seasonThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Header
    pdf.setFillColor(theme.primary);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('SHOPPING STRATEGY', pageWidth / 2, 25, { align: 'center' });
    
    // Shopping principles
    const principles = [
      'Investment Pieces: Start with core neutrals in quality fabrics',
      'Color Mixing: Combine 60% neutrals, 30% lights, 10% brights',
      'Fabric Selection: Choose textures that complement your contrast level',
      'Seasonal Adaptation: Adjust intensity based on lighting conditions',
      'Personal Expression: Use accent brights to showcase your personality'
    ];
    
    let yPos = 70;
    principles.forEach((principle, index) => {
      this.drawShoppingTip(pdf, index + 1, principle, yPos, theme);
      yPos += 40;
    });
  }

  // Helper methods
  private drawRoundedRect(pdf: jsPDF, x: number, y: number, width: number, height: number, radius: number) {
    pdf.roundedRect(x, y, width, height, radius, radius);
  }

  private drawSignatureStrip(pdf: jsPDF, analysisResult: ColorAnalysisResult, theme: any, x: number, y: number) {
    const colors = [...analysisResult.coreNeutrals.slice(0, 3), ...analysisResult.accentBrights.slice(0, 3)];
    const swatchWidth = 20;
    
    colors.forEach((color, index) => {
      pdf.setFillColor(color);
      pdf.rect(x + (index * swatchWidth), y, swatchWidth, 15, 'F');
      
      // Color label
      pdf.setTextColor('#666666');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(this.getColorName(color), x + (index * swatchWidth) + 10, y + 28, { align: 'center' });
    });
  }

  private drawPaletteSection(pdf: jsPDF, title: string, description: string, colors: string[], y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Section title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(title, 30, y);
    
    // Description
    pdf.setTextColor('#666666');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(description, 30, y + 12);
    
    // Color swatches
    const swatchSize = 18;
    colors.slice(0, 6).forEach((color, index) => {
      const x = 30 + (index * 25);
      
      // Swatch with border
      pdf.setFillColor('#ffffff');
      pdf.rect(x - 1, y + 20 - 1, swatchSize + 2, swatchSize + 2, 'F');
      pdf.setFillColor(color);
      pdf.rect(x, y + 20, swatchSize, swatchSize, 'F');
      
      // Color name
      pdf.setTextColor('#4a5568');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(this.getColorName(color), x + 9, y + 45, { align: 'center' });
    });
  }

  private drawAnalysisCard(pdf: jsPDF, title: string, content: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Card background
    pdf.setFillColor('#f8f9fa');
    pdf.setDrawColor('#e9ecef');
    pdf.rect(30, y, pageWidth - 60, 50, 'DF');
    
    // Title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, 40, y + 15);
    
    // Content
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(content, pageWidth - 80);
    pdf.text(lines, 40, y + 30);
  }

  private drawStyleCard(pdf: jsPDF, title: string, content: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Card with accent border
    pdf.setFillColor('#ffffff');
    pdf.setDrawColor(theme.accent);
    pdf.setLineWidth(1);
    pdf.rect(30, y, pageWidth - 60, 50, 'DF');
    
    // Accent stripe
    pdf.setFillColor(theme.accent);
    pdf.rect(30, y, 5, 50, 'F');
    
    // Title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, 45, y + 15);
    
    // Content
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(content, pageWidth - 90);
    pdf.text(lines, 45, y + 30);
  }

  private drawShoppingTip(pdf: jsPDF, number: number, tip: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Number circle
    pdf.setFillColor(theme.accent);
    pdf.circle(45, y + 10, 8, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(number.toString(), 45, y + 13, { align: 'center' });
    
    // Tip text
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(tip, pageWidth - 80);
    pdf.text(lines, 65, y + 13);
  }

  private getUndertoneAnalysis(season: string): string {
    const analyses = {
      'Cool Winter': 'Cool blue and pink undertones create crisp, clear coloring that pairs beautifully with jewel tones and high contrast combinations.',
      'Cool Summer': 'Soft cool undertones with muted intensity work best with gentle, sophisticated colors that complement rather than compete.',
      'Warm Spring': 'Golden warm undertones with bright clarity respond to clear, warm colors that enhance your natural luminosity.',
      'Warm Autumn': 'Rich warm undertones with deep intensity are complemented by earthy, golden colors that reflect your natural richness.'
    };
    return analyses[season as keyof typeof analyses] || 'Your unique undertone profile has been carefully analyzed to provide the most flattering color recommendations.';
  }

  private getContrastAnalysis(season: string): string {
    const analyses = {
      'Cool Winter': 'High contrast between hair, eyes, and skin requires bold, clear colors that match your natural intensity level.',
      'Cool Summer': 'Medium contrast allows for sophisticated, muted colors that create elegant, harmonious combinations.',
      'Warm Spring': 'Medium to high contrast works with clear, warm colors that provide enough intensity without overwhelming.',
      'Warm Autumn': 'Medium contrast pairs with rich, warm colors that complement your natural depth and warmth.'
    };
    return analyses[season as keyof typeof analyses] || 'Your contrast level determines the intensity and clarity of colors that will look most harmonious.';
  }

  private getChromaticAnalysis(season: string): string {
    const analyses = {
      'Cool Winter': 'High chromatic intensity means you can wear pure, saturated colors that would overwhelm other types.',
      'Cool Summer': 'Soft chromatic intensity requires muted, grayed colors that provide sophistication without harshness.',
      'Warm Spring': 'Clear chromatic intensity allows for bright, pure warm colors that enhance your natural vibrancy.',
      'Warm Autumn': 'Rich chromatic intensity works with deep, warm colors that reflect your natural earthiness and depth.'
    };
    return analyses[season as keyof typeof analyses] || 'Your chromatic intensity level guides the saturation and purity of your ideal colors.';
  }

  private getColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#000000': 'Black', '#1C1C1C': 'Charcoal', '#2F4F4F': 'Slate',
      '#708090': 'Steel', '#A9A9A9': 'Gray', '#D3D3D3': 'Silver',
      '#F5F5F5': 'Ivory', '#FFFFFF': 'White',
      '#4682B4': 'Steel Blue', '#5F9EA0': 'Cadet', '#6495ED': 'Cornflower',
      '#7B68EE': 'Periwinkle', '#8A2BE2': 'Violet', '#9370DB': 'Purple'
    };
    return colorNames[hex.toUpperCase()] || 'Color';
  }
}

export const webPdfService = new WebPdfService();