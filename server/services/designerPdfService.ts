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

class DesignerPdfService {
  private readonly luxuryThemes = {
    // Spring seasons
    'Light Spring': {
      primary: '#f4e4bc',
      secondary: '#e8b4a0',
      accent: '#d4a574',
      gold: '#f59e0b',
      silver: '#fbbf24',
      textPrimary: '#8b4513',
      textSecondary: '#a0522d',
      background: '#fffbeb'
    },
    'True Spring': {
      primary: '#ffe4b5',
      secondary: '#ffa500',
      accent: '#32cd32',
      gold: '#f59e0b',
      silver: '#fbbf24',
      textPrimary: '#8b4513',
      textSecondary: '#a0522d',
      background: '#fffbeb'
    },
    'Bright Spring': {
      primary: '#ffffe0',
      secondary: '#ff6347',
      accent: '#00ced1',
      gold: '#ffd700',
      silver: '#c0c0c0',
      textPrimary: '#2f4f4f',
      textSecondary: '#696969',
      background: '#f0ffff'
    },
    // Summer seasons
    'Light Summer': {
      primary: '#f0f8ff',
      secondary: '#e6e6fa',
      accent: '#b0c4de',
      gold: '#d3d3d3',
      silver: '#c0c0c0',
      textPrimary: '#2f4f4f',
      textSecondary: '#708090',
      background: '#f8f8ff'
    },
    'True Summer': {
      primary: '#e0e0e0',
      secondary: '#d3d3d3',
      accent: '#9370db',
      gold: '#dda0dd',
      silver: '#c0c0c0',
      textPrimary: '#2f4f4f',
      textSecondary: '#708090',
      background: '#f5f5f5'
    },
    'Soft Summer': {
      primary: '#f5f5dc',
      secondary: '#dcdcdc',
      accent: '#bc8f8f',
      gold: '#d2b48c',
      silver: '#c0c0c0',
      textPrimary: '#696969',
      textSecondary: '#808080',
      background: '#faf0e6'
    },
    // Autumn seasons
    'Soft Autumn': {
      primary: '#deb887',
      secondary: '#d2b48c',
      accent: '#cd853f',
      gold: '#daa520',
      silver: '#bc8f8f',
      textPrimary: '#8b4513',
      textSecondary: '#a0522d',
      background: '#fdf5e6'
    },
    'True Autumn': {
      primary: '#d2691e',
      secondary: '#cd853f',
      accent: '#b8860b',
      gold: '#daa520',
      silver: '#bc8f8f',
      textPrimary: '#8b4513',
      textSecondary: '#a0522d',
      background: '#fff8dc'
    },
    'Dark Autumn': {
      primary: '#8b4513',
      secondary: '#a0522d',
      accent: '#d2691e',
      gold: '#b8860b',
      silver: '#696969',
      textPrimary: '#ffffff',
      textSecondary: '#deb887',
      background: '#2f1b14'
    },
    // Winter seasons
    'Dark Winter': {
      primary: '#0a0f1c',
      secondary: '#1a2332',
      accent: '#2563eb',
      gold: '#fbbf24',
      silver: '#e5e7eb',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      background: '#f8fafc'
    },
    'True Winter': {
      primary: '#000000',
      secondary: '#2c3e50',
      accent: '#3498db',
      gold: '#f1c40f',
      silver: '#bdc3c7',
      textPrimary: '#ffffff',
      textSecondary: '#ecf0f1',
      background: '#ffffff'
    },
    'Bright Winter': {
      primary: '#1e1b4b',
      secondary: '#3730a3',
      accent: '#6366f1',
      gold: '#d946ef',
      silver: '#e879f9',
      textPrimary: '#ffffff',
      textSecondary: '#a5b4fc',
      background: '#faf5ff'
    }
  };

  async generateReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const filename = `designer-analysis-${order.id}-${Date.now()}.pdf`;
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

      // Create luxury magazine-style PDF
      this.generateLuxuryCover(pdf, analysisResult);
      pdf.addPage();
      this.generateEditorialPalette(pdf, analysisResult);
      pdf.addPage();
      this.generateScientificAnalysis(pdf, analysisResult);
      pdf.addPage();
      this.generateCoutureGuide(pdf, analysisResult);
      pdf.addPage();
      this.generateLuxuryShopping(pdf, analysisResult);
      pdf.addPage();
      this.generatePersonalBrand(pdf, analysisResult);

      const pdfBuffer = pdf.output('arraybuffer');
      fs.writeFileSync(filePath, Buffer.from(pdfBuffer));
      
      console.log('Designer PDF generated successfully at:', filePath);
      return filePath;
      
    } catch (error) {
      console.error('Designer PDF generation error:', error);
      throw error;
    }
  }

  private generateLuxuryCover(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Luxury black background
    pdf.setFillColor(theme.primary);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Elegant geometric overlay
    pdf.setFillColor(theme.secondary);
    pdf.circle(pageWidth * 0.8, pageHeight * 0.2, 60, 'F');
    pdf.setFillColor(theme.accent);
    pdf.circle(pageWidth * 0.2, pageHeight * 0.8, 40, 'F');
    
    // Premium content card
    pdf.setFillColor('#ffffff');
    this.drawShadowRect(pdf, 30, 80, pageWidth - 60, pageHeight - 160);
    
    // Luxury branding
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('HUEMATCHER', pageWidth / 2, 120, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text('PROFESSIONAL COLOR ANALYSIS', pageWidth / 2, 135, { align: 'center' });
    
    // Decorative gold line
    pdf.setDrawColor(theme.gold);
    pdf.setLineWidth(2);
    pdf.line(pageWidth / 2 - 50, 145, pageWidth / 2 + 50, 145);
    
    // Season title - luxury typography
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(42);
    pdf.text(analysisResult.season.toUpperCase(), pageWidth / 2, 190, { align: 'center' });
    
    // Elegant season badge
    pdf.setFillColor(theme.accent);
    this.drawDiamondShape(pdf, pageWidth / 2, 210, 40);
    
    // Sophisticated description
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    this.wrapText(pdf, analysisResult.description, pageWidth / 2, 240, pageWidth - 80);
    
    // Luxury color preview
    this.drawLuxuryColorStrip(pdf, analysisResult, theme, 50, 280);
  }

  private generateEditorialPalette(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Magazine-style header
    pdf.setFillColor(theme.background);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text('YOUR SIGNATURE PALETTE', pageWidth / 2, 30, { align: 'center' });
    
    // Editorial layout - Core Neutrals
    this.drawEditorialSection(pdf, 'FOUNDATION', 'Your wardrobe essentials', 
      analysisResult.coreNeutrals, 70, theme, 'neutrals');
    
    // Editorial layout - Accent Lights
    this.drawEditorialSection(pdf, 'SOPHISTICATION', 'Refined supporting tones', 
      analysisResult.accentLights, 150, theme, 'lights');
    
    // Editorial layout - Accent Brights
    this.drawEditorialSection(pdf, 'STATEMENT', 'Your power colors', 
      analysisResult.accentBrights, 230, theme, 'brights');
  }

  private generateScientificAnalysis(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Scientific header
    pdf.setFillColor(theme.primary);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('COLOR SCIENCE ANALYSIS', pageWidth / 2, 30, { align: 'center' });
    
    // Scientific breakdown
    this.drawScientificCard(pdf, 'UNDERTONE CLASSIFICATION', 
      this.getUndertoneScience(analysisResult.season), 70, theme);
    
    this.drawScientificCard(pdf, 'CHROMATIC HARMONY', 
      this.getChromaticScience(analysisResult.season), 140, theme);
    
    this.drawScientificCard(pdf, 'OPTICAL ENHANCEMENT', 
      this.getOpticalScience(analysisResult.season), 210, theme);
  }

  private generateCoutureGuide(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Couture header
    pdf.setFillColor(theme.accent);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('COUTURE STYLING GUIDE', pageWidth / 2, 30, { align: 'center' });
    
    // Luxury styling cards
    this.drawCoutureCard(pdf, 'PRECIOUS METALS', analysisResult.recommendations.metals, 70, theme);
    this.drawCoutureCard(pdf, 'LUXURY EYEWEAR', analysisResult.recommendations.eyewear, 140, theme);
    this.drawCoutureCard(pdf, 'ARTISAN COSMETICS', analysisResult.recommendations.makeup, 210, theme);
  }

  private generateLuxuryShopping(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Luxury shopping header
    pdf.setFillColor(theme.gold);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('LUXURY SHOPPING STRATEGY', pageWidth / 2, 30, { align: 'center' });
    
    // Premium shopping principles
    const luxuryPrinciples = [
      'Investment Philosophy: Quality over quantity in signature pieces',
      'Capsule Curation: Build a refined wardrobe foundation',
      'Color Harmony: Master the art of sophisticated combinations',
      'Seasonal Adaptation: Adjust intensity for optimal impact',
      'Personal Signature: Develop your unique style language'
    ];
    
    let yPos = 80;
    luxuryPrinciples.forEach((principle, index) => {
      this.drawLuxuryPrinciple(pdf, index + 1, principle, yPos, theme);
      yPos += 40;
    });
  }

  private generatePersonalBrand(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const theme = this.luxuryThemes[analysisResult.season as keyof typeof this.luxuryThemes] || this.luxuryThemes['Cool Winter'];
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Personal brand header
    pdf.setFillColor(theme.secondary);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('YOUR PERSONAL BRAND', pageWidth / 2, 30, { align: 'center' });
    
    // Brand archetype
    this.drawBrandArchetype(pdf, analysisResult.season, 70, theme);
    
    // Digital hex codes for precision
    this.drawDigitalPalette(pdf, analysisResult, 160, theme);
    
    // Professional signature
    this.drawProfessionalSignature(pdf, 240, theme);
  }

  // Advanced drawing methods
  private drawShadowRect(pdf: jsPDF, x: number, y: number, width: number, height: number) {
    // Shadow
    pdf.setFillColor('#000000');
    pdf.rect(x + 2, y + 2, width, height, 'F');
    // Main rect
    pdf.setFillColor('#ffffff');
    pdf.rect(x, y, width, height, 'F');
  }

  private drawDiamondShape(pdf: jsPDF, centerX: number, centerY: number, size: number) {
    pdf.lines([
      [0, -size/2],
      [size/2, 0],
      [0, size/2],
      [-size/2, 0]
    ], centerX, centerY, [1, 1], 'F');
  }

  private drawLuxuryColorStrip(pdf: jsPDF, analysisResult: ColorAnalysisResult, theme: any, x: number, y: number) {
    const colors = [...analysisResult.coreNeutrals.slice(0, 3), ...analysisResult.accentBrights.slice(0, 3)];
    const swatchSize = 20;
    
    colors.forEach((color, index) => {
      // Luxury border
      pdf.setFillColor(theme.gold);
      pdf.rect(x + (index * 25) - 1, y - 1, swatchSize + 2, swatchSize + 2, 'F');
      
      // Color swatch
      pdf.setFillColor(color);
      pdf.rect(x + (index * 25), y, swatchSize, swatchSize, 'F');
      
      // Premium label
      pdf.setTextColor(theme.primary);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(this.getLuxuryColorName(color), x + (index * 25) + 10, y + 30, { align: 'center' });
    });
  }

  private drawEditorialSection(pdf: jsPDF, title: string, subtitle: string, colors: string[], y: number, theme: any, type: string) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Editorial title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(title, 30, y);
    
    // Editorial subtitle
    pdf.setTextColor(theme.textSecondary);
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.text(subtitle, 30, y + 12);
    
    // Editorial color display
    colors.slice(0, 6).forEach((color, index) => {
      const x = 30 + (index * 28);
      const swatchSize = type === 'brights' ? 22 : 18;
      
      // Editorial frame
      pdf.setDrawColor(theme.accent);
      pdf.setLineWidth(1);
      pdf.rect(x - 1, y + 20 - 1, swatchSize + 2, swatchSize + 2);
      
      // Color
      pdf.setFillColor(color);
      pdf.rect(x, y + 20, swatchSize, swatchSize, 'F');
      
      // Editorial label
      pdf.setTextColor(theme.primary);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(this.getLuxuryColorName(color), x + swatchSize/2, y + 50, { align: 'center' });
    });
  }

  private drawScientificCard(pdf: jsPDF, title: string, content: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Scientific card background
    pdf.setFillColor(theme.background);
    pdf.setDrawColor(theme.accent);
    pdf.rect(30, y, pageWidth - 60, 50, 'DF');
    
    // Scientific title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, 40, y + 15);
    
    // Scientific content
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const lines = pdf.splitTextToSize(content, pageWidth - 80);
    pdf.text(lines, 40, y + 30);
  }

  private drawCoutureCard(pdf: jsPDF, title: string, content: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Couture card with gold accent
    pdf.setFillColor('#ffffff');
    pdf.rect(30, y, pageWidth - 60, 50, 'F');
    
    // Gold accent stripe
    pdf.setFillColor(theme.gold);
    pdf.rect(30, y, 5, 50, 'F');
    
    // Couture title
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, 45, y + 15);
    
    // Couture content
    pdf.setTextColor('#4a5568');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(content, pageWidth - 90);
    pdf.text(lines, 45, y + 30);
  }

  private drawLuxuryPrinciple(pdf: jsPDF, number: number, principle: string, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Luxury number badge
    pdf.setFillColor(theme.gold);
    pdf.circle(50, y + 10, 12, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(number.toString(), 50, y + 14, { align: 'center' });
    
    // Luxury principle text
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(principle, pageWidth - 100);
    pdf.text(lines, 75, y + 14);
  }

  private drawBrandArchetype(pdf: jsPDF, season: string, y: number, theme: any) {
    const archetypes = {
      'Cool Winter': 'THE EXECUTIVE - Commanding presence with sophisticated authority',
      'Cool Summer': 'THE DIPLOMAT - Elegant refinement with gentle strength',
      'Warm Spring': 'THE INNOVATOR - Dynamic energy with approachable confidence',
      'Warm Autumn': 'THE CURATOR - Rich sophistication with timeless appeal'
    };
    
    const archetype = archetypes[season as keyof typeof archetypes] || 'THE PROFESSIONAL - Distinctive style with personal authority';
    
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('BRAND ARCHETYPE', 30, y);
    
    pdf.setTextColor(theme.accent);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(archetype, 30, y + 20);
  }

  private drawDigitalPalette(pdf: jsPDF, analysisResult: ColorAnalysisResult, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('DIGITAL COLOR CODES', 30, y);
    
    const allColors = [...analysisResult.coreNeutrals.slice(0, 3), ...analysisResult.accentBrights.slice(0, 3)];
    
    allColors.forEach((color, index) => {
      const x = 30 + (index % 3) * 60;
      const yPos = y + 20 + Math.floor(index / 3) * 25;
      
      // Digital swatch
      pdf.setFillColor(color);
      pdf.rect(x, yPos, 15, 15, 'F');
      
      // Hex code
      pdf.setTextColor('#4a5568');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(color.toUpperCase(), x + 20, yPos + 10);
    });
  }

  private drawProfessionalSignature(pdf: jsPDF, y: number, theme: any) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setTextColor(theme.primary);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('PROFESSIONAL ANALYSIS CERTIFIED', pageWidth / 2, y, { align: 'center' });
    
    pdf.setTextColor('#666666');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text('This analysis was generated using advanced AI color science', pageWidth / 2, y + 15, { align: 'center' });
    pdf.text(`Analysis Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, y + 25, { align: 'center' });
  }

  private wrapText(pdf: jsPDF, text: string, x: number, y: number, maxWidth: number) {
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y, { align: 'center' });
  }

  private getUndertoneScience(season: string): string {
    const science = {
      'Cool Winter': 'Blue-based melanin distribution creates cool undertones that reflect blue and violet wavelengths, requiring colors with similar spectral properties for optimal harmony.',
      'Cool Summer': 'Soft cool undertones with reduced chromatic intensity respond to muted colors that complement rather than compete with natural pigmentation.',
      'Warm Spring': 'Golden melanin concentrations create warm undertones that enhance with yellow-based colors, amplifying natural luminosity through color temperature matching.',
      'Warm Autumn': 'Rich warm undertones with high melanin density pair with saturated warm colors that reflect similar spectral wavelengths for maximum enhancement.'
    };
    return science[season as keyof typeof science] || 'Undertone analysis determines optimal color temperature matching for enhanced natural beauty.';
  }

  private getChromaticScience(season: string): string {
    const science = {
      'Cool Winter': 'High contrast levels require saturated colors with pure chroma to maintain visual balance and prevent color dilution against strong natural pigmentation.',
      'Cool Summer': 'Medium contrast with soft pigmentation responds to muted chroma levels that create sophisticated harmony without overwhelming delicate features.',
      'Warm Spring': 'Clear pigmentation with medium-high contrast accommodates bright, pure colors that match natural chromatic intensity for optimal enhancement.',
      'Warm Autumn': 'Rich pigmentation with medium contrast pairs with deep, saturated colors that complement natural warmth and depth for sophisticated appeal.'
    };
    return science[season as keyof typeof science] || 'Chromatic analysis ensures color saturation levels complement natural pigmentation intensity.';
  }

  private getOpticalScience(season: string): string {
    const science = {
      'Cool Winter': 'High-contrast coloring creates strong light reflection that requires bold colors to maintain visual impact and prevent color washout.',
      'Cool Summer': 'Soft coloring with gentle light reflection benefits from muted colors that enhance rather than compete with natural subtlety.',
      'Warm Spring': 'Clear coloring with bright light reflection enhances with pure, clear colors that amplify natural luminosity and vibrancy.',
      'Warm Autumn': 'Rich coloring with warm light reflection pairs with deep, warm colors that complement natural earthiness and depth.'
    };
    return science[season as keyof typeof science] || 'Optical analysis determines how light interacts with your coloring for maximum enhancement.';
  }

  private getLuxuryColorName(hex: string): string {
    const luxuryNames: { [key: string]: string } = {
      '#000000': 'Onyx', '#1C1C1C': 'Charcoal', '#2F4F4F': 'Graphite',
      '#708090': 'Platinum', '#A9A9A9': 'Sterling', '#D3D3D3': 'Pearl',
      '#F5F5F5': 'Ivory', '#FFFFFF': 'Diamond',
      '#4682B4': 'Sapphire', '#5F9EA0': 'Aquamarine', '#6495ED': 'Lapis',
      '#7B68EE': 'Amethyst', '#8A2BE2': 'Tanzanite', '#9370DB': 'Violet'
    };
    return luxuryNames[hex.toUpperCase()] || 'Gemstone';
  }
}

export const designerPdfService = new DesignerPdfService();