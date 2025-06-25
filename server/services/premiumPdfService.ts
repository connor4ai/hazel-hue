import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { seasonalContentData } from '../data/seasonalContent';

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
  overview: any;
  colorPalette: any;
  clothing: any;
  accessories: any;
  hairColor: any;
  makeup: any;
  celebrities: string[];
}

class PremiumPdfService {
  private readonly brandColors = {
    primary: '#E85A4F',
    secondary: '#D2B48C',
    accent: '#4F7942',
    neutral: '#2C3E50',
    light: '#F8F9FA'
  };

  async generateReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const fileName = `color-analysis-${order.id}-${Date.now()}.pdf`;
    const outputPath = path.join(process.cwd(), 'uploads', fileName);

    // Ensure uploads directory exists
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    try {
      // Page 1: Overview, Key Characteristics, Signature Colors, Colors to Avoid
      this.generatePage1(pdf, analysisResult);
      
      // Page 2: Color Overview - Palette, Color Dimensions, Graph Comparing
      pdf.addPage();
      this.generatePage2(pdf, analysisResult);
      
      // Page 3: Clothing Overview
      pdf.addPage();
      this.generatePage3(pdf, analysisResult);
      
      // Page 4: Metals, Jewelry, Watches and Glasses
      pdf.addPage();
      this.generatePage4(pdf, analysisResult);
      
      // Page 5: Hair Color
      pdf.addPage();
      this.generatePage5(pdf, analysisResult);
      
      // Page 6: Makeup
      pdf.addPage();
      this.generatePage6(pdf, analysisResult);
      
      // Page 7: Celebrities with the Same Season
      pdf.addPage();
      this.generatePage7(pdf, analysisResult);

      // Save PDF
      const pdfBytes = pdf.output();
      fs.writeFileSync(outputPath, pdfBytes, 'binary');
      console.log(`Premium PDF generated: ${outputPath}`);
      
      return outputPath;
    } catch (error) {
      console.error('Error generating premium PDF:', error);
      throw error;
    }
  }

  private generatePage1(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79); // Brand primary color
    pdf.rect(0, 0, 210, 30, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('YOUR SEASONAL COLOR ANALYSIS', 105, 20, { align: 'center' });
    
    // Season Title
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.text(analysisResult.season.toUpperCase(), 105, 50, { align: 'center' });
    
    // Overview
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('OVERVIEW', 20, 70);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const overview = this.wrapText(pdf, analysisResult.overview.description, 20, 190);
    this.drawTextBlock(pdf, overview, 20, 80);
    
    // Key Characteristics
    const yPosition = 80 + (overview.length * 5) + 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('KEY CHARACTERISTICS', 20, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    let currentY = yPosition + 10;
    analysisResult.overview.keyCharacteristics.forEach((characteristic: string) => {
      pdf.text(`• ${characteristic}`, 25, currentY);
      currentY += 6;
    });
    
    // Signature Colors
    currentY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('SIGNATURE COLORS', 20, currentY);
    
    // Draw color swatches
    currentY += 10;
    const colorsPerRow = 4;
    const swatchSize = 15;
    const swatchSpacing = 45;
    
    analysisResult.overview.signatureColors.forEach((color: string, index: number) => {
      const row = Math.floor(index / colorsPerRow);
      const col = index % colorsPerRow;
      const x = 20 + (col * swatchSpacing);
      const y = currentY + (row * 25);
      
      // Color swatch
      const rgb = this.hexToRgb(color);
      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.rect(x, y, swatchSize, swatchSize, 'F');
      
      // Color border
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(x, y, swatchSize, swatchSize, 'S');
      
      // Color code
      pdf.setTextColor(44, 62, 80);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(color, x + (swatchSize/2), y + swatchSize + 5, { align: 'center' });
    });
    
    // Colors to Avoid
    const avoidY = currentY + 50;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('COLORS TO AVOID', 20, avoidY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    let avoidCurrentY = avoidY + 10;
    analysisResult.overview.colorsToAvoid.forEach((colorGroup: string) => {
      pdf.text(`• ${colorGroup}`, 25, avoidCurrentY);
      avoidCurrentY += 6;
    });
  }

  private generatePage2(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('COLOR OVERVIEW', 105, 16, { align: 'center' });
    
    // Palette Description
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('YOUR COLOR PALETTE', 20, 45);
    
    // Note about interactive palette
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Your complete interactive color palette is available in your digital download.', 20, 55);
    pdf.text('Click any color to copy its hex code for shopping and styling.', 20, 62);
    
    // Color Dimensions
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('COLOR DIMENSIONS', 20, 85);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('• Temperature: Cool (blue-based undertones)', 25, 95);
    pdf.text('• Saturation: High (clear, pure colors)', 25, 102);
    pdf.text('• Value Range: Medium to Deep (avoiding very light pastels)', 25, 109);
    pdf.text('• Intensity: Bold and striking', 25, 116);
    
    // Core Neutrals Section
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('CORE NEUTRALS', 20, 140);
    
    // Draw core neutrals
    let currentY = 150;
    const swatchSize = 12;
    analysisResult.coreNeutrals.forEach((color: string, index: number) => {
      const x = 25 + (index * 35);
      const rgb = this.hexToRgb(color);
      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'F');
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'S');
      
      pdf.setTextColor(44, 62, 80);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(color, x + (swatchSize/2), currentY + swatchSize + 4, { align: 'center' });
    });
    
    // Accent Lights Section
    currentY += 35;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('ACCENT LIGHTS', 20, currentY);
    
    currentY += 10;
    analysisResult.accentLights.forEach((color: string, index: number) => {
      const x = 25 + (index * 35);
      const rgb = this.hexToRgb(color);
      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'F');
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'S');
      
      pdf.setTextColor(44, 62, 80);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(color, x + (swatchSize/2), currentY + swatchSize + 4, { align: 'center' });
    });
    
    // Accent Brights Section
    currentY += 35;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('ACCENT BRIGHTS', 20, currentY);
    
    currentY += 10;
    analysisResult.accentBrights.forEach((color: string, index: number) => {
      const x = 25 + (index * 35);
      const rgb = this.hexToRgb(color);
      pdf.setFillColor(rgb.r, rgb.g, rgb.b);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'F');
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(x, currentY, swatchSize, swatchSize, 'S');
      
      pdf.setTextColor(44, 62, 80);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(color, x + (swatchSize/2), currentY + swatchSize + 4, { align: 'center' });
    });
  }

  private generatePage3(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CLOTHING OVERVIEW', 105, 16, { align: 'center' });
    
    // Clothing Guidelines
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`YOUR ${analysisResult.season.toUpperCase()} WARDROBE`, 20, 45);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    let currentY = 55;
    
    analysisResult.clothing.guidelines.forEach((guideline: string) => {
      const wrappedText = this.wrapText(pdf, `• ${guideline}`, 25, 170);
      this.drawTextBlock(pdf, wrappedText, 25, currentY);
      currentY += wrappedText.length * 5 + 3;
    });
    
    // Pinterest Reference
    currentY += 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('STYLE INSPIRATION', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Find curated outfit ideas and styling inspiration at:', 20, currentY + 10);
    
    pdf.setTextColor(232, 90, 79);
    pdf.setFont('helvetica', 'normal');
    pdf.text(analysisResult.clothing.pinterestUrl, 20, currentY + 20);
    
    // Shopping Tips
    currentY += 40;
    pdf.setTextColor(44, 62, 80);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('SHOPPING STRATEGY', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const shoppingTips = [
      'Always carry your color palette when shopping',
      'Focus on building a capsule wardrobe with your signature colors',
      'Invest in quality pieces in your core neutrals',
      'Use accent colors for accessories and statement pieces',
      'When in doubt, stick to your tried-and-true color combinations'
    ];
    
    currentY += 10;
    shoppingTips.forEach(tip => {
      pdf.text(`• ${tip}`, 25, currentY);
      currentY += 6;
    });
  }

  private generatePage4(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ACCESSORIES GUIDE', 105, 16, { align: 'center' });
    
    // Metals
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BEST METALS', 20, 45);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const metalsText = this.wrapText(pdf, analysisResult.accessories.metals || 'Gold and silver metals', 20, 170);
    this.drawTextBlock(pdf, metalsText, 20, 55);
    
    // Jewelry
    let currentY = 55 + (metalsText.length * 5) + 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('JEWELRY STYLE', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    currentY += 10;
    const jewelryContent = analysisResult.accessories.jewelryStyle || 
                          (Array.isArray(analysisResult.accessories.jewelry) ? 
                           analysisResult.accessories.jewelry.join('. ') : 
                           analysisResult.accessories.jewelry) || 
                          'Choose pieces that complement your coloring';
    const jewelryText = this.wrapText(pdf, jewelryContent, 20, 170);
    this.drawTextBlock(pdf, jewelryText, 20, currentY);
    currentY += jewelryText.length * 5 + 10;
    
    // Watches
    currentY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('WATCHES', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    currentY += 10;
    const watchesContent = Array.isArray(analysisResult.accessories.watches) ? 
                          analysisResult.accessories.watches.join('. ') : 
                          analysisResult.accessories.watches || 
                          'Choose watches that complement your style';
    const watchesText = this.wrapText(pdf, watchesContent, 20, 170);
    this.drawTextBlock(pdf, watchesText, 20, currentY);
    currentY += watchesText.length * 5 + 10;
    
    // Glasses
    currentY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('EYEWEAR', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    currentY += 10;
    const eyewearContent = Array.isArray(analysisResult.accessories.glasses) ? 
                          analysisResult.accessories.glasses.join('. ') : 
                          analysisResult.accessories.glasses || 
                          analysisResult.accessories.description ||
                          'Choose frames that suit your features';
    const eyewearText = this.wrapText(pdf, eyewearContent, 20, 170);
    this.drawTextBlock(pdf, eyewearText, 20, currentY);
    currentY += eyewearText.length * 5;
  }

  private generatePage5(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HAIR COLOR GUIDE', 105, 16, { align: 'center' });
    
    // Hair Guidance
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HAIR COLOR GUIDANCE', 20, 45);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const guidanceText = this.wrapText(pdf, analysisResult.hairColor.guidance, 20, 170);
    this.drawTextBlock(pdf, guidanceText, 20, 55);
    
    // Best Colors
    let currentY = 55 + (guidanceText.length * 5) + 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('BEST HAIR COLORS FOR YOU', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    currentY += 10;
    analysisResult.hairColor.bestColors.forEach((color: string) => {
      const wrappedText = this.wrapText(pdf, `• ${color}`, 25, 165);
      this.drawTextBlock(pdf, wrappedText, 25, currentY);
      currentY += wrappedText.length * 5 + 3;
    });
    
    // Colors to Avoid
    currentY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('HAIR COLORS TO AVOID', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    currentY += 10;
    analysisResult.hairColor.avoidColors.forEach((color: string) => {
      pdf.text(`• ${color}`, 25, currentY);
      currentY += 6;
    });
  }

  private generatePage6(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MAKEUP GUIDE', 105, 16, { align: 'center' });
    
    // Makeup Guidelines
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`YOUR ${analysisResult.season.toUpperCase()} MAKEUP PALETTE`, 20, 45);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    let currentY = 55;
    
    const guidelines = Array.isArray(analysisResult.makeup.guidelines) ? 
                      analysisResult.makeup.guidelines : 
                      (analysisResult.makeup.description ? 
                       [analysisResult.makeup.description] : 
                       ['Follow your seasonal color palette for best results']);
    
    guidelines.forEach((guideline: string) => {
      const wrappedText = this.wrapText(pdf, `• ${guideline}`, 25, 165);
      this.drawTextBlock(pdf, wrappedText, 25, currentY);
      currentY += wrappedText.length * 5 + 3;
    });
    
    // Pinterest Reference
    currentY += 15;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('MAKEUP INSPIRATION', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('Find curated makeup looks and color combinations at:', 20, currentY + 10);
    
    pdf.setTextColor(232, 90, 79);
    pdf.setFont('helvetica', 'normal');
    pdf.text(analysisResult.makeup.pinterestUrl, 20, currentY + 20);
  }

  private generatePage7(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    // Header
    pdf.setFillColor(232, 90, 79);
    pdf.rect(0, 0, 210, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CELEBRITY INSPIRATION', 105, 16, { align: 'center' });
    
    // Celebrity Section
    pdf.setTextColor(44, 62, 80);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${analysisResult.season.toUpperCase()} CELEBRITIES`, 20, 45);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text('These celebrities share your seasonal color type:', 20, 55);
    
    let currentY = 70;
    const celebrities = Array.isArray(analysisResult.celebrities) ? 
                       analysisResult.celebrities : 
                       ['Style icons who share your coloring'];
    
    celebrities.forEach((celebrity: string) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`• ${celebrity}`, 25, currentY);
      currentY += 15;
    });
    
    // Style Tips
    currentY += 20;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('CELEBRITY STYLE INSPIRATION', 20, currentY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const styleTips = [
      'Study how these celebrities use color in their red carpet looks',
      'Notice their makeup choices and how they complement their natural coloring',
      'Observe their jewelry and accessory selections',
      'Look for patterns in their most flattering outfits'
    ];
    
    currentY += 10;
    styleTips.forEach(tip => {
      const wrappedText = this.wrapText(pdf, `• ${tip}`, 25, 165);
      this.drawTextBlock(pdf, wrappedText, 25, currentY);
      currentY += wrappedText.length * 5 + 3;
    });
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  private wrapText(pdf: jsPDF, text: string | undefined, x: number, maxWidth: number): string[] {
    if (!text) return [''];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = pdf.getTextWidth(testLine);
      
      if (textWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  }

  private drawTextBlock(pdf: jsPDF, lines: string[], x: number, y: number) {
    lines.forEach((line, index) => {
      pdf.text(line, x, y + (index * 5));
    });
  }
}

export const premiumPdfService = new PremiumPdfService();