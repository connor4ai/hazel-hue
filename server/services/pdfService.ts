import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class PDFService {
  async generateReport(order: any, analysisResult: any): Promise<string> {
    const doc = new PDFDocument({ margin: 50 });
    const filename = `color-analysis-${order.id}-${Date.now()}.pdf`;
    const filePath = path.join('uploads', 'reports', filename);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    doc.pipe(fs.createWriteStream(filePath));

    // Page 1: Cover Page
    doc.fontSize(32)
       .fillColor('#DA8A67')
       .text('Personal Color Analysis', 50, 100, { align: 'center' });
    
    doc.fontSize(24)
       .fillColor('#6B5B47')
       .text(`You are a ${analysisResult.season}`, 50, 200, { align: 'center' });

    doc.fontSize(16)
       .fillColor('#8B7355')
       .text(analysisResult.description, 50, 300, { 
         align: 'center',
         width: 500
       });

    // Add current date
    doc.fontSize(12)
       .fillColor('#9AB6A0')
       .text(`Generated on ${new Date().toLocaleDateString()}`, 50, 700, { align: 'center' });

    // Page 2: Color Palettes
    doc.addPage();
    doc.fontSize(24)
       .fillColor('#DA8A67')
       .text('Your Color Palettes', 50, 50);

    let yPosition = 120;

    // Core Neutrals
    doc.fontSize(18)
       .fillColor('#6B5B47')
       .text('Core Neutrals', 50, yPosition);
    
    yPosition += 40;
    this.drawColorSwatches(doc, analysisResult.coreNeutrals, 50, yPosition);
    yPosition += 80;

    // Accent Lights
    doc.fontSize(18)
       .fillColor('#6B5B47')
       .text('Accent Lights', 50, yPosition);
    
    yPosition += 40;
    this.drawColorSwatches(doc, analysisResult.accentLights, 50, yPosition);
    yPosition += 80;

    // Accent Brights
    doc.fontSize(18)
       .fillColor('#6B5B47')
       .text('Accent Brights', 50, yPosition);
    
    yPosition += 40;
    this.drawColorSwatches(doc, analysisResult.accentBrights, 50, yPosition);

    // Page 3: Wardrobe Guide
    doc.addPage();
    doc.fontSize(24)
       .fillColor('#DA8A67')
       .text('Wardrobe Guide', 50, 50);

    doc.fontSize(16)
       .fillColor('#6B5B47')
       .text('Building Your Perfect Wardrobe', 50, 100);

    const wardrobeText = `
    Your ${analysisResult.season} coloring calls for warm, rich colors that enhance your natural beauty. 
    Here's how to build a cohesive wardrobe:

    FOUNDATION PIECES:
    • Invest in quality basics in your core neutral colors
    • Choose warm undertones over cool ones
    • Focus on rich, saturated colors rather than pastels

    MIX & MATCH STRATEGY:
    • Use core neutrals as your foundation
    • Add accent lights for everyday wear
    • Incorporate accent brights for special occasions

    SHOPPING TIPS:
    • Always test colors against your skin in natural light
    • Avoid colors that make you look washed out
    • When in doubt, choose warmer tones
    `;

    doc.fontSize(12)
       .fillColor('#8B7355')
       .text(wardrobeText, 50, 140, { 
         width: 500,
         lineGap: 5
       });

    // Page 4: Style Recommendations
    doc.addPage();
    doc.fontSize(24)
       .fillColor('#DA8A67')
       .text('Style Recommendations', 50, 50);

    doc.fontSize(18)
       .fillColor('#6B5B47')
       .text('Finishing Touches', 50, 100);

    const recommendationsText = `
    METALS: ${analysisResult.recommendations.metals}
    Choose jewelry and accessories in these warm metal tones to complement your coloring.

    EYEWEAR: ${analysisResult.recommendations.eyewear}
    These frame colors will enhance your features and work harmoniously with your palette.

    MAKEUP: ${analysisResult.recommendations.makeup}
    Focus on warm-toned makeup that enhances your natural coloring.

    HAIR COLOR NOTES:
    • Warm brown, auburn, and golden blonde tones work beautifully
    • Avoid ash tones which can make you look dull
    • Consider warm highlights to add dimension
    `;

    doc.fontSize(12)
       .fillColor('#8B7355')
       .text(recommendationsText, 50, 140, { 
         width: 500,
         lineGap: 5
       });

    // Additional pages with more detailed information...
    for (let page = 5; page <= 15; page++) {
      doc.addPage();
      doc.fontSize(20)
         .fillColor('#DA8A67')
         .text(`Chapter ${page - 3}`, 50, 50);
      
      // Add relevant content for each page
      const content = this.getPageContent(page, analysisResult);
      doc.fontSize(12)
         .fillColor('#8B7355')
         .text(content, 50, 100, { 
           width: 500,
           lineGap: 5
         });
    }

    doc.end();
    
    return new Promise((resolve, reject) => {
      doc.on('end', () => resolve(filePath));
      doc.on('error', reject);
    });
  }

  private drawColorSwatches(doc: PDFKit.PDFDocument, colors: string[], x: number, y: number) {
    colors.forEach((color, index) => {
      const swatchX = x + (index * 70);
      doc.circle(swatchX + 25, y + 25, 25)
         .fillColor(color)
         .fill();
      
      doc.fontSize(10)
         .fillColor('#6B5B47')
         .text(color, swatchX, y + 60, { 
           width: 50, 
           align: 'center' 
         });
    });
  }

  private getPageContent(page: number, analysisResult: any): string {
    const content = {
      5: 'UNDERSTANDING YOUR SEASON\n\nThe Warm Autumn palette is characterized by rich, warm colors that mirror the changing leaves of fall...',
      6: 'SEASONAL COLOR THEORY\n\nYour coloring has warm undertones, which means colors with yellow, orange, or red bases will be most flattering...',
      7: 'WARDROBE ESSENTIALS\n\nBuild your wardrobe around these key pieces in your most flattering colors...',
      8: 'CASUAL WEAR GUIDE\n\nFor everyday styling, focus on comfortable pieces in your core neutral palette...',
      9: 'PROFESSIONAL ATTIRE\n\nIn the workplace, your warm autumn colors can create a powerful, confident impression...',
      10: 'EVENING & SPECIAL OCCASIONS\n\nFor special events, embrace your accent bright colors for maximum impact...',
      11: 'SEASONAL STYLING TIPS\n\nAdapt your color palette throughout the year while staying true to your warm undertones...',
      12: 'SHOPPING STRATEGY\n\nMake smart purchases by sticking to your color palette and building a cohesive wardrobe...',
      13: 'COLOR COMBINATIONS\n\nLearn which colors work best together from your palette for foolproof outfit coordination...',
      14: 'ACCESSORIES & DETAILS\n\nThe finishing touches that will elevate every outfit and enhance your natural beauty...',
      15: 'MAINTENANCE & UPDATES\n\nHow to keep your color analysis relevant as you age and your style evolves...'
    };

    return content[page as keyof typeof content] || 'Additional styling information and tips...';
  }
}

export const pdfService = new PDFService();
