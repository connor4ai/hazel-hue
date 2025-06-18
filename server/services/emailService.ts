import nodemailer from 'nodemailer';
import fs from 'fs';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendAnalysisReport(email: string, analysisResult: any, pdfPath: string) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@colormuse.com',
        to: email,
        subject: '🎨 Your Personal Color Analysis Results are Ready!',
        html: this.generateEmailTemplate(analysisResult),
        attachments: [
          {
            filename: 'color-analysis-report.pdf',
            path: pdfPath,
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Analysis report email sent successfully to:', email);
    } catch (error) {
      console.error('Error sending email:', error);
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
            <h1 style="color: #6B5B47; margin: 0;">🎨 HueMatcher</h1>
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
            <p>Thank you for choosing HueMatcher! 💕</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
