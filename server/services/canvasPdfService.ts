import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";
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

class CanvasPdfService {
  private readonly seasonPalettes = {
    'Cool Winter': {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#533483',
      text: '#ffffff',
      background: '#0f3460'
    },
    'Cool Summer': {
      primary: '#4a5568',
      secondary: '#718096',
      accent: '#805ad5',
      text: '#ffffff',
      background: '#edf2f7'
    },
    'Warm Spring': {
      primary: '#f6ad55',
      secondary: '#fbb041',
      accent: '#ed8936',
      text: '#1a202c',
      background: '#fffaf0'
    },
    'Warm Autumn': {
      primary: '#c53030',
      secondary: '#e53e3e',
      accent: '#d69e2e',
      text: '#ffffff',
      background: '#fed7d7'
    }
  };

  async generateReport(order: any, analysisResult: ColorAnalysisResult): Promise<string> {
    const filename = `canvas-analysis-${order.id}-${Date.now()}.pdf`;
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

      // Generate pages with canvas-based graphics
      await this.generateCanvasCoverPage(pdf, analysisResult);
      pdf.addPage();
      await this.generateCanvasPalettePage(pdf, analysisResult);
      pdf.addPage();
      await this.generateCanvasStylePage(pdf, analysisResult);
      pdf.addPage();
      await this.generateCanvasShoppingPage(pdf, analysisResult);

      const pdfBuffer = pdf.output('arraybuffer');
      fs.writeFileSync(filePath, Buffer.from(pdfBuffer));
      
      console.log('Canvas PDF generated successfully at:', filePath);
      return filePath;
      
    } catch (error) {
      console.error('Canvas PDF generation error:', error);
      throw error;
    }
  }

  private async generateCanvasCoverPage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const canvas = createCanvas(595, 842); // A4 size in points
    const ctx = canvas.getContext('2d');
    
    const palette = this.seasonPalettes[analysisResult.season as keyof typeof this.seasonPalettes] || this.seasonPalettes['Cool Winter'];
    
    // Create sophisticated gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 842);
    gradient.addColorStop(0, palette.primary);
    gradient.addColorStop(0.5, palette.secondary);
    gradient.addColorStop(1, palette.background);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 595, 842);
    
    // Add subtle pattern overlay
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = palette.accent;
      ctx.beginPath();
      ctx.arc(Math.random() * 595, Math.random() * 842, Math.random() * 50 + 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    // Main content card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.roundRect(50, 100, 495, 600, 20);
    ctx.fill();
    
    // Shadow effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.roundRect(55, 105, 495, 600, 20);
    ctx.fill();
    
    // Brand header
    ctx.fillStyle = palette.primary;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HUEMATCHER', 297, 180);
    ctx.font = '16px Arial';
    ctx.fillText('PROFESSIONAL COLOR ANALYSIS', 297, 210);
    
    // Decorative line
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(150, 230);
    ctx.lineTo(445, 230);
    ctx.stroke();
    
    // Season title with modern styling
    ctx.fillStyle = palette.primary;
    ctx.font = 'bold 48px Arial';
    ctx.fillText(analysisResult.season.toUpperCase(), 297, 320);
    
    // Description
    ctx.fillStyle = '#4a5568';
    ctx.font = '14px Arial';
    const words = analysisResult.description.split(' ');
    let line = '';
    let y = 380;
    
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 400 && line !== '') {
        ctx.fillText(line, 297, y);
        line = word + ' ';
        y += 25;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 297, y);
    
    // Color preview strip
    const colors = [...analysisResult.coreNeutrals.slice(0, 3), ...analysisResult.accentBrights.slice(0, 3)];
    const stripWidth = 300;
    const colorWidth = stripWidth / colors.length;
    
    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(147 + (index * colorWidth), 500, colorWidth, 40);
    });
    
    // Convert canvas to image and add to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  }

  private async generateCanvasPalettePage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const canvas = createCanvas(595, 842);
    const ctx = canvas.getContext('2d');
    
    const palette = this.seasonPalettes[analysisResult.season as keyof typeof this.seasonPalettes] || this.seasonPalettes['Cool Winter'];
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, 595, 842);
    
    // Header
    ctx.fillStyle = palette.primary;
    ctx.fillRect(0, 0, 595, 80);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('YOUR COMPLETE PALETTE', 297, 50);
    
    // Color sections
    this.drawColorSection(ctx, 'CORE NEUTRALS', analysisResult.coreNeutrals, 120, palette.primary);
    this.drawColorSection(ctx, 'ACCENT LIGHTS', analysisResult.accentLights, 320, palette.secondary);
    this.drawColorSection(ctx, 'ACCENT BRIGHTS', analysisResult.accentBrights, 520, palette.accent);
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  }

  private async generateCanvasStylePage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const canvas = createCanvas(595, 842);
    const ctx = canvas.getContext('2d');
    
    const palette = this.seasonPalettes[analysisResult.season as keyof typeof this.seasonPalettes] || this.seasonPalettes['Cool Winter'];
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 595, 842);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, palette.background);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 595, 842);
    
    // Header
    ctx.fillStyle = palette.primary;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('STYLE RECOMMENDATIONS', 297, 60);
    
    // Recommendation cards
    const recommendations = [
      { title: 'METALS', content: analysisResult.recommendations.metals },
      { title: 'EYEWEAR', content: analysisResult.recommendations.eyewear },
      { title: 'MAKEUP', content: analysisResult.recommendations.makeup }
    ];
    
    recommendations.forEach((rec, index) => {
      this.drawRecommendationCard(ctx, rec.title, rec.content, 120 + (index * 180), palette);
    });
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  }

  private async generateCanvasShoppingPage(pdf: jsPDF, analysisResult: ColorAnalysisResult) {
    const canvas = createCanvas(595, 842);
    const ctx = canvas.getContext('2d');
    
    const palette = this.seasonPalettes[analysisResult.season as keyof typeof this.seasonPalettes] || this.seasonPalettes['Cool Winter'];
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 595, 842);
    
    // Header with gradient
    const gradient = ctx.createLinearGradient(0, 0, 595, 100);
    gradient.addColorStop(0, palette.primary);
    gradient.addColorStop(1, palette.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 595, 100);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SHOPPING STRATEGY', 297, 60);
    
    // Shopping tips with visual elements
    const tips = [
      'Start with core neutrals - build your foundation first',
      'Add accent lights gradually - they work with everything',
      'Use accent brights as statement pieces only',
      'Always check colors in natural light before purchasing',
      'Invest in quality pieces in your core neutral colors'
    ];
    
    tips.forEach((tip, index) => {
      const y = 150 + (index * 120);
      
      // Card background
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      ctx.roundRect(50, y, 495, 80, 15);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Number circle
      ctx.fillStyle = palette.accent;
      ctx.beginPath();
      ctx.arc(90, y + 40, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((index + 1).toString(), 90, y + 47);
      
      // Tip text
      ctx.fillStyle = '#2d3748';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(tip, 130, y + 47);
    });
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  }

  private drawColorSection(ctx: any, title: string, colors: string[], y: number, accentColor: string) {
    // Section header
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 50, y);
    
    // Color swatches
    colors.slice(0, 6).forEach((color, index) => {
      const x = 50 + (index * 80);
      
      // Swatch background
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 5;
      ctx.roundRect(x, y + 20, 60, 60, 10);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Color fill
      ctx.fillStyle = color;
      ctx.roundRect(x + 5, y + 25, 50, 50, 8);
      ctx.fill();
      
      // Color name
      ctx.fillStyle = '#4a5568';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(this.getColorName(color), x + 30, y + 95);
    });
  }

  private drawRecommendationCard(ctx: any, title: string, content: string, y: number, palette: any) {
    // Card background
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.roundRect(50, y, 495, 120, 15);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Title bar
    ctx.fillStyle = palette.primary;
    ctx.roundRect(50, y, 495, 40, [15, 15, 0, 0]);
    ctx.fill();
    
    // Title text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 70, y + 27);
    
    // Content text
    ctx.fillStyle = '#4a5568';
    ctx.font = '14px Arial';
    const words = content.split(' ');
    let line = '';
    let textY = y + 65;
    
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 420 && line !== '') {
        ctx.fillText(line, 70, textY);
        line = word + ' ';
        textY += 20;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, textY);
  }

  private getColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#000000': 'Black', '#1C1C1C': 'Charcoal', '#2F4F4F': 'Dark Slate',
      '#708090': 'Slate Gray', '#A9A9A9': 'Dark Gray', '#D3D3D3': 'Light Gray',
      '#F5F5F5': 'White Smoke', '#FFFFFF': 'White',
      '#4682B4': 'Steel Blue', '#5F9EA0': 'Cadet Blue', '#6495ED': 'Cornflower',
      '#7B68EE': 'Medium Slate', '#8A2BE2': 'Blue Violet', '#9370DB': 'Medium Purple'
    };
    return colorNames[hex.toUpperCase()] || 'Color';
  }
}

export const canvasPdfService = new CanvasPdfService();