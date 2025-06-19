import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import { JSDOM } from "jsdom";

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

class ModernPdfService {
  private readonly expandedColorPalettes: { [key: string]: any } = {
    'Cool Winter': {
      signature: ['#000000', '#FFFFFF', '#E6E6FA', '#4169E1', '#8B0000'],
      extended: ['#1C1C1C', '#2F4F4F', '#708090', '#A9A9A9', '#D3D3D3', '#F5F5F5'],
      accent: ['#4682B4', '#5F9EA0', '#6495ED', '#7B68EE', '#8A2BE2', '#9370DB'],
      avoid: ['#FFA500', '#FF7F50', '#DAA520', '#B8860B', '#CD853F']
    }
  };

  async generateReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const filename = `modern-analysis-${order.id}-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      // Create PDF using jsPDF with custom design
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Generate cover page
      this.generateModernCoverPage(pdf, analysisResult);
      
      // Add new page for palette
      pdf.addPage();
      this.generateModernPalettePage(pdf, analysisResult);
      
      // Add new page for style guide
      pdf.addPage();
      this.generateModernStylePage(pdf, analysisResult);
      
      // Add new page for shopping guide
      pdf.addPage();
      this.generateModernShoppingPage(pdf, analysisResult);

      // Save the PDF
      const pdfBuffer = pdf.output('arraybuffer');
      fs.writeFileSync(filePath, Buffer.from(pdfBuffer));
      
      console.log('Modern PDF generated successfully at:', filePath);
      return filePath;
      
    } catch (error) {
      console.error('Modern PDF generation error:', error);
      throw error;
    }
  }

  private generateModernCoverPage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Modern gradient background effect (simulated with rectangles)
    const gradientColors = ['#1a1a2e', '#16213e', '#0f3460', '#533483'];
    for (let i = 0; i < gradientColors.length; i++) {
      pdf.setFillColor(gradientColors[i]);
      pdf.rect(0, (pageHeight / gradientColors.length) * i, pageWidth, pageHeight / gradientColors.length, 'F');
    }
    
    // White content overlay
    pdf.setFillColor('#ffffff');
    pdf.roundedRect(20, 40, pageWidth - 40, pageHeight - 80, 10, 10, 'F');
    
    // Modern typography
    pdf.setTextColor('#1a1a2e');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(32);
    pdf.text('YOUR COLOR', pageWidth / 2, 80, { align: 'center' });
    pdf.text('SIGNATURE', pageWidth / 2, 100, { align: 'center' });
    
    // Season badge with modern styling
    const seasonColor = this.getSeasonColor(analysisResult.season);
    pdf.setFillColor(seasonColor);
    pdf.roundedRect(40, 120, pageWidth - 80, 30, 15, 15, 'F');
    
    pdf.setTextColor('#ffffff');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text(analysisResult.season.toUpperCase(), pageWidth / 2, 140, { align: 'center' });
    
    // Modern description
    pdf.setTextColor('#4a4a4a');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(analysisResult.description, pageWidth - 60);
    pdf.text(lines, pageWidth / 2, 170, { align: 'center' });
    
    // Signature colors preview
    this.drawModernColorStrip(pdf, analysisResult.coreNeutrals.slice(0, 5), 30, 220);
  }

  private generateModernPalettePage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Page header
    pdf.setFillColor('#f8f9fa');
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#212529');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text('YOUR COMPLETE PALETTE', pageWidth / 2, 30, { align: 'center' });
    
    // Core Neutrals Section
    this.drawModernColorSection(pdf, 'CORE NEUTRALS', 
      'Your foundation colors - use these for 60% of your wardrobe', 
      analysisResult.coreNeutrals, 70);
    
    // Accent Lights Section
    this.drawModernColorSection(pdf, 'ACCENT LIGHTS', 
      'Soft supporting colors - perfect for blouses and accessories', 
      analysisResult.accentLights, 140);
    
    // Accent Brights Section
    this.drawModernColorSection(pdf, 'ACCENT BRIGHTS', 
      'Your statement colors - use sparingly for maximum impact', 
      analysisResult.accentBrights, 210);
  }

  private generateModernStylePage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Page header
    pdf.setFillColor('#e9ecef');
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#212529');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text('STYLE RECOMMENDATIONS', pageWidth / 2, 30, { align: 'center' });
    
    // Recommendations cards
    const recommendations = [
      { title: 'METALS', content: analysisResult.recommendations.metals },
      { title: 'EYEWEAR', content: analysisResult.recommendations.eyewear },
      { title: 'MAKEUP', content: analysisResult.recommendations.makeup }
    ];
    
    let yPos = 70;
    recommendations.forEach(rec => {
      this.drawModernRecommendationCard(pdf, rec.title, rec.content, yPos);
      yPos += 60;
    });
  }

  private generateModernShoppingPage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Page header
    pdf.setFillColor('#dee2e6');
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor('#212529');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text('SHOPPING STRATEGY', pageWidth / 2, 30, { align: 'center' });
    
    // Shopping tips
    const tips = [
      'Start with core neutrals - build your foundation first',
      'Add accent lights gradually - they work with everything',
      'Use accent brights as statement pieces only',
      'Always check colors in natural light before purchasing',
      'Invest in quality pieces in your core neutral colors'
    ];
    
    let yPos = 70;
    tips.forEach((tip, index) => {
      pdf.setFillColor('#ffffff');
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 5, 5, 'F');
      
      pdf.setTextColor('#495057');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.text(`${index + 1}. ${tip}`, 30, yPos + 15);
      
      yPos += 35;
    });
  }

  private drawModernColorSection(pdf: jsPDF, title: string, description: string, colors: string[], yPos: number) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setTextColor('#343a40');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(title, 30, yPos);
    
    pdf.setTextColor('#6c757d');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(description, 30, yPos + 12);
    
    // Draw color swatches
    const swatchSize = 15;
    const spacing = 20;
    let xPos = 30;
    
    colors.slice(0, 6).forEach(color => {
      pdf.setFillColor(color);
      pdf.roundedRect(xPos, yPos + 20, swatchSize, swatchSize, 2, 2, 'F');
      
      // Color name
      pdf.setTextColor('#495057');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      const colorName = this.getColorName(color);
      pdf.text(colorName, xPos + (swatchSize/2), yPos + 45, { align: 'center' });
      
      xPos += spacing + swatchSize;
    });
  }

  private drawModernColorStrip(pdf: jsPDF, colors: string[], x: number, y: number) {
    const swatchWidth = 20;
    colors.forEach((color, index) => {
      pdf.setFillColor(color);
      pdf.rect(x + (index * swatchWidth), y, swatchWidth, 15, 'F');
    });
  }

  private drawModernRecommendationCard(pdf: jsPDF, title: string, content: string, yPos: number) {
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Card background
    pdf.setFillColor('#ffffff');
    pdf.roundedRect(20, yPos, pageWidth - 40, 40, 8, 8, 'F');
    
    // Card border
    pdf.setDrawColor('#e9ecef');
    pdf.setLineWidth(0.5);
    pdf.roundedRect(20, yPos, pageWidth - 40, 40, 8, 8);
    
    // Title
    pdf.setTextColor('#495057');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, 30, yPos + 15);
    
    // Content
    pdf.setTextColor('#6c757d');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(content, pageWidth - 70);
    pdf.text(lines, 30, yPos + 28);
  }

  private getSeasonColor(season: string): string {
    const seasonColors: { [key: string]: string } = {
      'Cool Winter': '#1e3a8a',
      'Cool Summer': '#6366f1',
      'Warm Spring': '#f59e0b',
      'Warm Autumn': '#dc2626'
    };
    return seasonColors[season] || '#374151';
  }

  private getColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#000000': 'Black', '#333333': 'Charcoal', '#666666': 'Gray',
      '#999999': 'Light Gray', '#CCCCCC': 'Silver', '#FFFFFF': 'White',
      '#4682B4': 'Steel Blue', '#5F9EA0': 'Cadet Blue', '#6495ED': 'Cornflower',
      '#7B68EE': 'Medium Slate', '#8A2BE2': 'Blue Violet', '#9370DB': 'Medium Purple'
    };
    return colorNames[hex.toUpperCase()] || 'Color';
  }
}

export const modernPdfService = new ModernPdfService();