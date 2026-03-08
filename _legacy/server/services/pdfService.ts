import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class PDFService {
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
        const doc = new PDFDocument({ margin: 40 });
        const stream = fs.createWriteStream(filePath);
        
        doc.pipe(stream);

        // Page 1: Season Badge + Description
        this.generateCoverPage(doc, analysisResult);
        
        // Page 2: Complete Color Palette
        doc.addPage();
        this.generatePalettePage(doc, analysisResult);
        
        // Page 3: Style Guide & Recommendations
        doc.addPage();
        this.generateStyleGuidePage(doc, analysisResult);

        doc.end();
        
        stream.on('finish', () => {
          console.log('PDF generated successfully at:', filePath);
          resolve(filePath);
        });
        
        stream.on('error', (error) => {
          console.error('PDF generation error:', error);
          reject(error);
        });
        
        doc.on('error', (error) => {
          console.error('PDFKit error:', error);
          reject(error);
        });
      } catch (error) {
        console.error('PDF setup error:', error);
        reject(error);
      }
    });
  }

  private generateCoverPage(doc: PDFKit.PDFDocument, analysisResult: any) {
    // Premium header
    doc.fontSize(14)
       .fillColor('#64748B')
       .text('HUEMATCHER PROFESSIONAL COLOR ANALYSIS', 50, 50, { align: 'center' });
    
    // Season badge with enhanced styling
    doc.fontSize(42)
       .fillColor('#1E293B')
       .font('Helvetica-Bold')
       .text(analysisResult.season || 'Color Analysis', 50, 120, { align: 'center' });
    
    // Tagline
    doc.fontSize(16)
       .fillColor('#475569')
       .font('Helvetica')
       .text('Bold, Dramatic, Sophisticated', 50, 180, { align: 'center' });
    
    // Description box
    doc.fontSize(14)
       .fillColor('#34495E')
       .text(analysisResult.description, 80, 250, { 
         align: 'center',
         width: 440,
         lineGap: 8
       });

    // Generation date
    doc.fontSize(10)
       .fillColor('#7F8C8D')
       .text(`Personal Color Analysis • ${new Date().toLocaleDateString()}`, 50, 750, { align: 'center' });
  }

  private generatePalettePage(doc: PDFKit.PDFDocument, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#2C3E50')
       .text('Your Color Palette', 50, 50);

    let yPosition = 120;

    // Core Neutrals
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Core Neutrals', 50, yPosition);
    
    yPosition += 30;
    this.drawColorSwatches(doc, analysisResult.coreNeutrals, 50, yPosition);
    yPosition += 120;

    // Accent Lights
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Accent Lights', 50, yPosition);
    
    yPosition += 30;
    this.drawColorSwatches(doc, analysisResult.accentLights, 50, yPosition);
    yPosition += 120;

    // Accent Brights
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Accent Brights', 50, yPosition);
    
    yPosition += 30;
    this.drawColorSwatches(doc, analysisResult.accentBrights, 50, yPosition);
  }

  private generateStyleGuidePage(doc: PDFKit.PDFDocument, analysisResult: any) {
    doc.fontSize(24)
       .fillColor('#2C3E50')
       .text('Your Style Guide', 50, 50);

    let yPosition = 120;

    // Metals
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Best Metals', 50, yPosition);
    
    doc.fontSize(12)
       .fillColor('#7F8C8D')
       .text(analysisResult.recommendations.metals, 50, yPosition + 25, { width: 500 });
    
    yPosition += 100;

    // Makeup
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Makeup Colors', 50, yPosition);
    
    doc.fontSize(12)
       .fillColor('#7F8C8D')
       .text(analysisResult.recommendations.makeup, 50, yPosition + 25, { width: 500 });
    
    yPosition += 100;

    // Eyewear
    doc.fontSize(16)
       .fillColor('#34495E')
       .text('Eyewear Frames', 50, yPosition);
    
    doc.fontSize(12)
       .fillColor('#7F8C8D')
       .text(analysisResult.recommendations.eyewear, 50, yPosition + 25, { width: 500 });
    
    yPosition += 100;

    // Season-specific styling tips
    doc.fontSize(16)
       .fillColor('#34495E')
       .text(`${analysisResult.season} Styling Tips`, 50, yPosition);
    
    yPosition += 30;
    
    const tips = this.getSeasonTips(analysisResult.season);
    tips.forEach((tip: string) => {
      doc.fontSize(12)
         .fillColor('#7F8C8D')
         .text(`• ${tip}`, 60, yPosition, { width: 480 });
      yPosition += 25;
    });
  }

  private drawColorSwatches(doc: PDFKit.PDFDocument, colors: string[], x: number, y: number) {
    colors.forEach((color, index) => {
      const swatchX = x + (index % 6) * 80;
      const swatchY = y + Math.floor(index / 6) * 70;
      
      // Draw color swatch
      doc.rect(swatchX, swatchY, 65, 45)
         .fillColor(color)
         .fill();
      
      // Draw hex label
      doc.fontSize(9)
         .fillColor('#2C3E50')
         .text(color, swatchX, swatchY + 50, { width: 65, align: 'center' });
    });
  }

  private getSeasonTips(season: string): string[] {
    const tips: { [key: string]: string[] } = {
      'Light Spring': [
        'Choose light, clear colors with warm undertones',
        'Avoid heavy, dark colors that overwhelm your delicate features',
        'Gold jewelry enhances your natural warmth',
        'Soft textures complement your gentle contrast level'
      ],
      'Light Summer': [
        'Embrace soft, muted colors with cool undertones',
        'Avoid bright, vibrant colors that clash with your subtle coloring',
        'Silver jewelry complements your cool tones',
        'Romantic styles enhance your delicate features'
      ],
      'True Spring': [
        'Wear clear, warm colors with medium intensity',
        'Golden undertones in clothing bring out your natural glow',
        'Mix warm neutrals with vibrant accent colors',
        'Classic styles suit your balanced features'
      ]
    };
    
    return tips[season] || [
      'Choose colors from your seasonal palette for best results',
      'Consider your undertone when selecting metals and makeup',
      'Balance contrast levels in your outfit combinations',
      'Trust your instincts when colors feel harmonious'
    ];
  }
}

export const pdfService = new PDFService();