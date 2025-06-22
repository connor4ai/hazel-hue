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
      // For now, always return True Winter to test the system
      // Later we'll re-enable AI detection: const detectedSeason = await this.detectSeason(imagePaths);
      const detectedSeason = 'True Winter';
      console.log(`Using ${detectedSeason} for analysis`);
      
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
    You are a professional color analyst. Analyze the person in these photos and determine their seasonal color type.
    
    Choose from these 12 seasons:
    True Winter, Cool Winter, Deep Winter, True Summer, Light Summer, Soft Summer, True Autumn, Deep Autumn, Soft Autumn, True Spring, Light Spring, Warm Spring
    
    Look at:
    - Skin undertone (cool blue/pink vs warm yellow/golden)
    - Hair color and depth
    - Eye color
    - Overall contrast level
    
    Respond with ONLY the season name (e.g. "True Winter").
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
    
    // Validate the detected season
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