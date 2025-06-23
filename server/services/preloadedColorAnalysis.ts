import { seasonalContentData, type SeasonalContent } from '../data/seasonalContent';
import OpenAI from 'openai';
import fs from 'fs';

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
  // Extended properties for 7-page format
  overview: SeasonalContent['overview'];
  colorPalette: SeasonalContent['colorPalette'];
  clothing: SeasonalContent['clothing'];
  accessories: SeasonalContent['accessories'];
  hairColor: SeasonalContent['hairColor'];
  makeup: SeasonalContent['makeup'];
  celebrities: string[];
}

export class PreloadedColorAnalysisService {
  private readonly openai: OpenAI;
  
  // All 12 seasons for season determination
  private readonly allSeasons = [
    'True Winter', 'Bright Winter', 'Dark Winter',
    'True Summer', 'Light Summer', 'Soft Summer', 
    'True Autumn', 'Soft Autumn', 'Dark Autumn',
    'True Spring', 'Bright Spring', 'Light Spring'
  ];

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzePhotos(imagePaths: string[]): Promise<ColorAnalysisResult> {
    try {
      // Use OpenAI to detect the actual season from photos
      const detectedSeason = await this.detectSeason(imagePaths);
      console.log(`AI detected season: ${detectedSeason}`);
      
      // Check if we have content for the detected season
      const availableSeasons = ['True Winter', 'Bright Winter'];
      if (!availableSeasons.includes(detectedSeason)) {
        console.warn(`Season "${detectedSeason}" not yet implemented. Using True Winter as fallback.`);
        return this.getPreloadedResult('True Winter');
      }
      
      return this.getPreloadedResult(detectedSeason);
    } catch (error) {
      console.error('Error in color analysis:', error);
      return this.getPreloadedResult('True Winter');
    }
  }

  private async detectSeason(imagePaths: string[]): Promise<string> {
    const images = imagePaths.map(imagePath => {
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = this.getMimeType(imagePath);
      
      return {
        type: "image_url" as const,
        image_url: {
          url: `data:${mimeType};base64,${base64Image}`
        }
      };
    });

    const seasonDetectionPrompt = `
    You are a professional color analyst specializing in 12-season color analysis. Analyze the person in these photos to determine their seasonal color type.
    
    Examine these key factors:
    1. SKIN UNDERTONE: Cool (blue/pink) vs Warm (yellow/golden) vs Neutral
    2. HAIR COLOR: Natural color, depth, and warmth/coolness
    3. EYE COLOR: Hue, clarity, and intensity
    4. OVERALL CONTRAST: High contrast (dark hair + light skin) vs Low contrast (similar tones)
    5. CHROMA NEEDS: Can they handle bright, saturated colors or do they need muted tones?
    
    12 Seasons to choose from:
    - WINTER FAMILY (cool undertones, can handle high contrast):
      * True Winter: High contrast, cool undertones, handles pure colors
      * Bright Winter: Very high contrast, cool undertones, needs electric/bright colors  
      * Dark Winter: High contrast but can handle some warmth, deep colors
    
    - SUMMER FAMILY (cool undertones, soft contrast):
      * True Summer: Cool, medium contrast, soft colors
      * Light Summer: Cool, light, delicate colors
      * Soft Summer: Cool-neutral, muted, gentle colors
    
    - AUTUMN FAMILY (warm undertones):
      * True Autumn: Warm, rich, earthy colors
      * Soft Autumn: Warm-neutral, muted, gentle warmth
      * Dark Autumn: Warm-neutral, deep, rich colors
    
    - SPRING FAMILY (warm undertones, bright):
      * True Spring: Warm, bright, clear colors
      * Bright Spring: Very warm, electric bright colors
      * Light Spring: Warm, light, fresh colors
    
    Based on your analysis, respond with ONLY the exact season name (e.g., "True Winter" or "Bright Winter").
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: seasonDetectionPrompt },
            ...images
          ]
        }
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    const detectedSeason = response.choices[0].message.content?.trim() || 'True Winter';
    
    // Clean up the response to extract just the season name
    const cleanSeason = detectedSeason.split('\n')[0].trim();
    
    // Validate the detected season against all 12 seasons
    if (!this.allSeasons.includes(cleanSeason)) {
      console.warn(`Invalid season detected: ${cleanSeason}, defaulting to True Winter`);
      return 'True Winter';
    }
    
    return cleanSeason;
  }

  private getPreloadedResult(season: string): ColorAnalysisResult {
    const content = seasonalContentData[season];
    
    if (!content) {
      throw new Error(`No pre-loaded content found for season: ${season}`);
    }

    return {
      season: content.season,
      description: content.overview.description,
      coreNeutrals: content.colorPalette.coreNeutrals,
      accentLights: content.colorPalette.accentLights,
      accentBrights: content.colorPalette.accentBrights,
      recommendations: {
        metals: content.accessories.metals,
        eyewear: content.accessories.glasses.join('. '),
        makeup: content.makeup.guidelines.join('. ')
      },
      overview: content.overview,
      colorPalette: content.colorPalette,
      clothing: content.clothing,
      accessories: content.accessories,
      hairColor: content.hairColor,
      makeup: content.makeup,
      celebrities: content.celebrities
    };
  }

  private getMimeType(filePath: string): string {
    const ext = filePath.toLowerCase().split('.').pop();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      default:
        return 'image/jpeg';
    }
  }
}

export const preloadedColorAnalysisService = new PreloadedColorAnalysisService();