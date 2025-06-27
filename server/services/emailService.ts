import sgMail from '@sendgrid/mail';
import fs from 'fs';

class EmailService {
  constructor() {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY environment variable is required');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendAnalysisReport(email: string, analysisResult: any, pdfPath: string) {
    try {
      let pdfAttachment = null;
      
      // Read PDF file if it exists
      if (pdfPath && fs.existsSync(pdfPath)) {
        const pdfBuffer = fs.readFileSync(pdfPath);
        pdfAttachment = {
          content: pdfBuffer.toString('base64'),
          filename: 'color-analysis-report.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        };
      }

      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'test@example.com', // Use verified sender from env
        subject: '🎨 Your Personal Color Analysis Results are Ready!',
        html: this.generateEmailTemplate(analysisResult),
        attachments: pdfAttachment ? [pdfAttachment] : []
      };

      await sgMail.send(msg);
      console.log('Analysis report email sent successfully to:', email);
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Provide more helpful error messages for common SendGrid issues
      if (error.code === 403) {
        const errorMsg = 'SendGrid authentication failed. Please ensure:\n' +
          '1. Your SENDGRID_API_KEY is valid\n' +
          '2. Your sender email is verified in SendGrid\n' +
          '3. Set SENDGRID_FROM_EMAIL environment variable to your verified sender';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      throw error;
    }
  }

  private generateEmailTemplate(analysisResult: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #6B5B47; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FAF4EE 0%, #F5E6D3 100%); padding: 30px; text-align: center; border-radius: 10px; }
          .season { color: #DA8A67; font-size: 28px; font-weight: bold; margin: 10px 0; }
          .color-palette { display: flex; justify-content: center; gap: 10px; margin: 20px 0; }
          .color-swatch { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .section { margin: 20px 0; padding: 20px; background: #fff; border-radius: 10px; }
          .footer { text-align: center; color: #9AB6A0; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #6B5B47; margin: 0;">🎨 Hazel & Hue</h1>
            <div class="season">You are a ${analysisResult.season}!</div>
            <p>${analysisResult.description}</p>
          </div>
          
          <div class="section">
            <h2 style="color: #DA8A67;">Your Color Palettes</h2>
            <h3>Core Neutrals</h3>
            <div class="color-palette">
              ${analysisResult.coreNeutrals.map((color: string) => 
                `<div class="color-swatch" style="background-color: ${color};"></div>`
              ).join('')}
            </div>
            
            <h3>Accent Lights</h3>
            <div class="color-palette">
              ${analysisResult.accentLights.map((color: string) => 
                `<div class="color-swatch" style="background-color: ${color};"></div>`
              ).join('')}
            </div>
            
            <h3>Accent Brights</h3>
            <div class="color-palette">
              ${analysisResult.accentBrights.map((color: string) => 
                `<div class="color-swatch" style="background-color: ${color};"></div>`
              ).join('')}
            </div>
          </div>
          
          <div class="section">
            <h2 style="color: #DA8A67;">Quick Recommendations</h2>
            <p><strong>Metals:</strong> ${analysisResult.recommendations.metals}</p>
            <p><strong>Eyewear:</strong> ${analysisResult.recommendations.eyewear}</p>
            <p><strong>Makeup:</strong> ${analysisResult.recommendations.makeup}</p>
          </div>
          
          <div class="footer">
            <p>Your complete in depth analysis report is attached to this email.</p>
            <p>Thank you for choosing Hazel & Hue! 💕</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();