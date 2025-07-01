import sgMail from '@sendgrid/mail';
import fs from 'fs';

class EmailService {
  constructor() {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY environment variable is required');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  // Validate that a results URL would be accessible
  validateResultsUrl(orderId: string): string {
    let baseUrl;
    
    if (process.env.NODE_ENV === 'production') {
      baseUrl = process.env.PRODUCTION_URL || 
                process.env.REPLIT_DEV_DOMAIN || 
                'https://hazelandhue.com';
      
      if (!baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl.replace(/^https?:\/\//, '')}`;
      }
    } else {
      baseUrl = 'http://localhost:5000';
    }
    
    const resultsUrl = `${baseUrl}/results/${orderId}`;
    console.log(`🔍 URL validation - Generated: ${resultsUrl}`);
    
    return resultsUrl;
  }

  async sendAnalysisReport(email: string, analysisResult: any, orderId: string) {
    try {
      const emailHtml = this.generateEmailTemplate(analysisResult, orderId);
      
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'test@example.com', // Use verified sender from env
        subject: '🎨 Your Personal Color Analysis Results are Ready!',
        html: emailHtml
      };

      await sgMail.send(msg);
      console.log(`✅ Analysis report email sent successfully to: ${email} with order ID: ${orderId}`);
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Provide more helpful error messages for common SendGrid issues
      if (error.code === 401) {
        const errorDetails = error.response?.body?.errors?.[0]?.message || 'Unauthorized';
        
        if (errorDetails.includes('Maximum credits exceeded')) {
          console.error('❌ SendGrid credits exceeded. Email delivery temporarily unavailable.');
          console.log('📧 Email would have been sent to:', email, 'with order ID:', orderId);
          console.log('🔗 Results URL for customer:', this.validateResultsUrl(orderId));
          
          // Log the email content that would have been sent for debugging
          console.log('📝 Email subject:', '🎨 Your Personal Color Analysis Results are Ready!');
          console.log('🎯 Customer can access results directly at:', this.validateResultsUrl(orderId));
          
          // Throw a specific error that can be caught upstream
          throw new Error('Maximum credits exceeded');
        }
        
        const errorMsg = 'SendGrid authentication failed. Please ensure:\n' +
          '1. Your SENDGRID_API_KEY is valid\n' +
          '2. Your sender email is verified in SendGrid\n' +
          '3. SendGrid account has sufficient credits\n' +
          'Error details: ' + errorDetails;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      if (error.code === 403) {
        const errorMsg = 'SendGrid permission denied. Please check your API key permissions.';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      throw error;
    }
  }

  private generateEmailTemplate(analysisResult: any, orderId: string): string {
    // Use environment variable for production URL, with intelligent fallbacks
    let baseUrl;
    
    if (process.env.NODE_ENV === 'production') {
      // Priority order: custom PRODUCTION_URL, Replit domain, fallback to hazelandhue.com
      baseUrl = process.env.PRODUCTION_URL || 
                process.env.REPLIT_DEV_DOMAIN || 
                'https://hazelandhue.com';
      
      // Ensure HTTPS for production
      if (!baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl.replace(/^https?:\/\//, '')}`;
      }
    } else {
      // Development environment
      baseUrl = 'http://localhost:5000';
    }
    
    const resultsUrl = `${baseUrl}/results/${orderId}`;
    
    console.log(`🔗 Email results link generated: ${resultsUrl}`);
    
    // Verify the results URL structure is correct
    if (!resultsUrl.includes('/results/') || !orderId) {
      console.error(`⚠️  Invalid results URL structure: ${resultsUrl}, orderId: ${orderId}`);
    }
    
    // Extract Pinterest links from the analysis result
    const pinterestLinks = analysisResult.pinterest || [];
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Color Analysis Results - Hazel & Hue</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
          
          body { 
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #2D5A3D; 
            margin: 0; 
            padding: 0; 
            background: #F1FAEE;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background: #F1FAEE;
          }
          .header { 
            background: linear-gradient(135deg, #2D5A3D 0%, #4A7C59 100%); 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 20px 20px 0 0; 
            color: white;
            position: relative;
            overflow: hidden;
          }
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.06)"/></svg>');
            animation: float 20s linear infinite;
          }
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(360deg); }
          }
          .brand-title { 
            color: #F4A261; 
            font-size: 32px; 
            font-weight: 700; 
            margin: 0 0 10px 0; 
            position: relative;
            z-index: 1;
          }
          .season { 
            color: #F1FAEE; 
            font-size: 28px; 
            font-weight: 600; 
            margin: 15px 0; 
            position: relative;
            z-index: 1;
          }
          .header-description {
            color: #A8DADC;
            font-size: 16px;
            margin: 10px 0 0 0;
            position: relative;
            z-index: 1;
          }
          .content-wrapper {
            background: white;
            border-radius: 0 0 20px 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(45, 90, 61, 0.1);
          }
          .color-palette { 
            display: flex; 
            justify-content: center; 
            gap: 12px; 
            margin: 20px 0; 
            flex-wrap: wrap;
          }
          .color-swatch { 
            width: 45px; 
            height: 45px; 
            border-radius: 12px; 
            border: 3px solid white; 
            box-shadow: 0 4px 12px rgba(45, 90, 61, 0.15);
            transition: transform 0.2s ease;
          }
          .section { 
            margin: 0; 
            padding: 30px; 
            border-bottom: 1px solid #E5D5C0;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section h2 {
            color: #2D5A3D;
            font-size: 22px;
            font-weight: 600;
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .section h3 {
            color: #E85A4F;
            font-size: 16px;
            font-weight: 600;
            margin: 25px 0 10px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .recommendation-item {
            background: #F1FAEE;
            padding: 15px;
            border-radius: 12px;
            margin: 10px 0;
            border-left: 4px solid #E85A4F;
          }
          .recommendation-item strong {
            color: #2D5A3D;
            font-weight: 600;
          }
          .pinterest-link {
            display: inline-block;
            background: linear-gradient(135deg, #E60023 0%, #BD081C 100%);
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin: 8px 8px 8px 0;
            transition: transform 0.2s ease;
          }
          .cta-section {
            text-align: center;
            margin: 0;
            padding: 40px 30px;
            background: linear-gradient(135deg, #E85A4F 0%, #E76F51 100%);
            position: relative;
            overflow: hidden;
          }
          .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="20" fill="rgba(255,255,255,0.05)"/><circle cx="70" cy="70" r="15" fill="rgba(255,255,255,0.03)"/></svg>');
          }
          .cta-title {
            color: white;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 15px 0;
            position: relative;
            z-index: 1;
          }
          .cta-subtitle {
            color: rgba(255,255,255,0.9);
            font-size: 16px;
            margin: 0 0 25px 0;
            position: relative;
            z-index: 1;
          }
          .cta-button {
            display: inline-block;
            background: white;
            color: #2D5A3D;
            padding: 18px 35px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
          }
          .footer { 
            text-align: center; 
            color: #6B5B47; 
            font-size: 14px; 
            margin-top: 30px; 
            padding: 20px;
          }
          .footer p {
            margin: 8px 0;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 600px) {
            .container { padding: 10px; }
            .header { padding: 30px 20px; }
            .brand-title { font-size: 28px; }
            .season { font-size: 24px; }
            .section { padding: 25px 20px; }
            .color-swatch { width: 40px; height: 40px; }
            .cta-section { padding: 35px 20px; }
            .cta-button { padding: 16px 30px; font-size: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand-title">Hazel & Hue</div>
            <div class="season">You are a ${analysisResult.season}!</div>
            <div class="header-description">${analysisResult.description}</div>
          </div>
          
          <div class="content-wrapper">
            <div class="section">
              <h2>🎨 Your Color Palettes</h2>
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
              <h2>💄 Quick Recommendations</h2>
              <div class="recommendation-item">
                <strong>Metals:</strong> ${analysisResult.recommendations.metals}
              </div>
              <div class="recommendation-item">
                <strong>Eyewear:</strong> ${analysisResult.recommendations.eyewear}
              </div>
              <div class="recommendation-item">
                <strong>Makeup:</strong> ${analysisResult.recommendations.makeup}
              </div>
            </div>
            
            ${pinterestLinks.length > 0 ? `
              <div class="section">
                <h2>📌 Your Style Inspiration</h2>
                <p style="color: #6B5B47; margin-bottom: 20px;">Get inspired with curated Pinterest boards just for your season:</p>
                <div style="margin: 15px 0;">
                  ${pinterestLinks.map((link: any) => `
                    <a href="${link.url}" class="pinterest-link">
                      📌 ${link.name}
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <div class="cta-section">
              <div class="cta-title">Your Complete Results Await</div>
              <div class="cta-subtitle">View your full 6-page analysis with detailed styling guidance</div>
              <a href="${resultsUrl}" class="cta-button">
                View My Full Results
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Save this email</strong> - you can always return to view your complete results!</p>
            <p>Thank you for choosing Hazel & Hue!</p>
            <p style="color: #A8DADC; font-size: 12px;">
              Visit <a href="https://hazelandhue.com" style="color: #E85A4F;">hazelandhue.com</a> for more color analysis insights
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();