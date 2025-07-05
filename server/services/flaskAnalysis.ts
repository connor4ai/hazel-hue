import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
// @ts-ignore
import fetch from 'node-fetch';
import { getSeasonalContent } from './seasonalContent';
import { logger } from '../logger';

export class FlaskAnalysisService {
  private flaskUrl: string;

  constructor() {
    // Flask server running on Python port (default 5001 to avoid conflict with Express on 5000)
    this.flaskUrl = process.env.FLASK_URL || 'http://localhost:5001';
  }

  async analyzePhotosWithFlask(imagePaths: string[]): Promise<string> {
    const orderId = imagePaths[0]?.split('_')[1] || 'unknown';
    
    try {
      logger.info(`🔬 Starting Flask analysis for order ${orderId}`, {
        imagePaths,
        flaskUrl: this.flaskUrl
      });

      // Verify all image files exist
      for (const imagePath of imagePaths) {
        if (!fs.existsSync(imagePath)) {
          throw new Error(`Image file not found: ${imagePath}`);
        }
      }

      // Create form data with the 3 images
      const formData = new FormData();
      for (let i = 0; i < imagePaths.length; i++) {
        const imagePath = imagePaths[i];
        const imageBuffer = fs.readFileSync(imagePath);
        formData.append(`photo${i + 1}`, imageBuffer, {
          filename: path.basename(imagePath),
          contentType: this.getContentType(imagePath)
        });
      }

      logger.info(`📡 Sending request to Flask server: ${this.flaskUrl}/analyze`);

      // Call Flask analysis endpoint
      const response = await fetch(`${this.flaskUrl}/analyze`, {
        method: 'POST',
        body: formData,
        // @ts-ignore - timeout is valid in node-fetch
        timeout: 60000 // 60 second timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Flask server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json() as { season: string; confidence: number };
      
      logger.info(`🎯 Flask analysis result for order ${orderId}:`, {
        season: result.season,
        confidence: result.confidence
      });

      // Validate the season result
      if (!result.season) {
        throw new Error('Flask server returned no season');
      }

      // Normalize season name (e.g., "Warm Autumn" -> "True Autumn")
      const normalizedSeason = this.normalizeSeasonName(result.season);
      
      logger.info(`✅ Flask analysis completed for order ${orderId}: ${normalizedSeason} (${result.confidence}% confidence)`);
      
      return normalizedSeason;

    } catch (error) {
      logger.error(`❌ Flask analysis failed for order ${orderId}:`, error);
      throw new Error(`Flask analysis failed: ${error.message}`);
    }
  }

  private getContentType(imagePath: string): string {
    const ext = path.extname(imagePath).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.heic':
        return 'image/heic';
      case '.heif':
        return 'image/heif';
      default:
        return 'image/jpeg';
    }
  }

  private normalizeSeasonName(season: string): string {
    // Normalize variations to standard 12-season names
    const normalizations: Record<string, string> = {
      'Warm Autumn': 'True Autumn',
      'Cool Summer': 'True Summer',
      'Cool Winter': 'True Winter',
      'Warm Spring': 'True Spring',
      'Deep Winter': 'Dark Winter',
      'Deep Autumn': 'Dark Autumn',
      'Clear Winter': 'Bright Winter',
      'Clear Spring': 'Bright Spring'
    };

    return normalizations[season] || season;
  }

  async generateCompleteAnalysis(season: string, orderId: string): Promise<any> {
    try {
      logger.info(`📝 Generating complete analysis for order ${orderId}: ${season}`);

      // Get seasonal content
      const seasonalContent = getSeasonalContent(season);
      if (!seasonalContent) {
        throw new Error(`No seasonal content found for: ${season}`);
      }

      // Create comprehensive analysis result
      const result = {
        season,
        description: seasonalContent.description,
        overview: {
          description: seasonalContent.description,
          signatueColors: seasonalContent.signatureColors || [],
          colorsToAvoid: seasonalContent.colorsToAvoid || []
        },
        makeup: {
          guidelines: seasonalContent.makeup?.guidelines || [],
          tips: seasonalContent.makeup?.tips || '',
          foundation: seasonalContent.makeup?.foundation || '',
          eyeshadowPalettes: seasonalContent.makeup?.eyeshadowPalettes || [],
          blushOptions: seasonalContent.makeup?.blushOptions || [],
          mascara: seasonalContent.makeup?.mascara || '',
          eyeliner: seasonalContent.makeup?.eyeliner || '',
          pinterestUrl: seasonalContent.makeup?.pinterestUrl || ''
        },
        clothing: {
          guidelines: seasonalContent.clothing?.guidelines || [],
          pinterestUrl: seasonalContent.clothing?.pinterestUrl || ''
        },
        jewelry: seasonalContent.jewelry || {},
        coreNeutrals: seasonalContent.coreNeutrals || [],
        accentLights: seasonalContent.accentLights || [],
        accentDeeps: seasonalContent.accentDeeps || [],
        celebMatches: seasonalContent.celebMatches || [],
        confidenceScore: 95 // High confidence from Flask analysis
      };

      logger.info(`✅ Complete analysis generated for order ${orderId}`);
      return result;

    } catch (error) {
      logger.error(`❌ Failed to generate complete analysis for order ${orderId}:`, error);
      throw error;
    }
  }
}