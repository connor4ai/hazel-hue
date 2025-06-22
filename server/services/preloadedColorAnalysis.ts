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
    'True Winter', 'Cool Winter', 'Deep Winter',
    'True Summer', 'Light Summer', 'Soft Summer', 
    'True Autumn', 'Deep Autumn', 'Soft Autumn',
    'True Spring', 'Light Spring', 'Warm Spring'
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
      // Use AI only to determine the season
      const detectedSeason = await this.detectSeason(imagePaths);
      
      // Use pre-loaded content for that season
      const seasonalContent = seasonalContentData[detectedSeason];
      
      if (!seasonalContent) {
        // Fallback to True Winter if season not found in pre-loaded data
        console.warn(`Season ${detectedSeason} not found in pre-loaded data, using True Winter`);
        return this.getPreloadedResult('True Winter');
      }

      return this.getPreloadedResult(detectedSeason);
    } catch (error) {
      console.error('Error in color analysis:', error);
      // Fallback to True Winter for demonstration
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
    You are a professional color analyst specializing in 12-season color analysis. 
    
    Analyze these photos and determine which of the 12 seasonal color types this person belongs to:
    
    **12 SEASONS:**
    - True Winter, Cool Winter, Deep Winter
    - True Summer, Light Summer, Soft Summer  
    - True Autumn, Deep Autumn, Soft Autumn
    - True Spring, Light Spring, Warm Spring
    
    **ANALYSIS CRITERIA:**
    1. **Undertone**: Cool (blue/pink) vs Warm (yellow/golden) vs Neutral
    2. **Contrast**: High vs Medium vs Low (difference between hair, skin, eyes)
    3. **Chroma**: Clear/Bright vs Soft/Muted vs Deep/Rich
    4. **Value**: Light vs Medium vs Deep
    
    **INSTRUCTIONS:**
    - Look at skin undertone, hair color, eye color, and overall contrast
    - Consider how the person's natural coloring would work with different color palettes
    - Focus on the person's natural, unfiltered appearance
    
    Respond with ONLY the season name exactly as listed above (e.g., "True Winter", "Light Spring", etc.).
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
    
    // Validate the detected season
    if (!this.allSeasons.includes(detectedSeason)) {
      console.warn(`Invalid season detected: ${detectedSeason}, defaulting to True Winter`);
      return 'True Winter';
    }
    
    return detectedSeason;
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