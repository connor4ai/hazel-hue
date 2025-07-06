import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export class SimpleColorAnalysisService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found');
    }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Simple, direct GPT-4o Vision analysis of uploaded photos
   */
  async analyzePhotos(imagePaths: string[]): Promise<string> {
    console.log(`🎨 Starting simple GPT-4o Vision analysis of ${imagePaths.length} photos`);
    
    try {
      // Convert images to base64
      const imageContents = await Promise.all(
        imagePaths.map(async (imagePath) => {
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = imageBuffer.toString('base64');
          const mimeType = this.getMimeType(imagePath);
          return {
            type: "image_url" as const,
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
              detail: "high" as const
            }
          };
        })
      );

      // Call OpenAI GPT-4o Vision with ChatGPT's exact approach
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a color analysis expert. Analyze the colors, tones, and harmonies visible in these images. " +
                     "Determine which of these 12 seasonal color palettes best matches the color characteristics shown:\n" +
                     "True Winter, Bright Winter, Dark Winter, " +
                     "True Summer, Light Summer, Soft Summer, " +
                     "True Spring, Bright Spring, Light Spring, " +
                     "True Autumn, Dark Autumn, Soft Autumn.\n" +
                     "Return ONLY this JSON:\n" +
                     '{"season":"<name>"}'
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze the color harmony, temperature, and contrast in these images to determine the best matching seasonal color palette."
              },
              ...imageContents
            ]
          }
        ],
        temperature: 0,
        top_p: 0,
        seed: 42
      });

      const result = response.choices[0].message.content?.trim();
      if (!result) {
        throw new Error("No response from OpenAI");
      }

      try {
        // Parse JSON response
        const jsonResult = JSON.parse(result);
        const seasonName = jsonResult.season;
        
        if (!seasonName) {
          throw new Error("No season found in JSON response");
        }
        
        console.log(`✅ GPT-4o Vision analysis completed: ${seasonName}`);
        return seasonName;
      } catch (parseError) {
        // Fallback to text normalization if JSON parsing fails
        const seasonName = this.normalizeSeason(result);
        console.log(`⚠️ JSON parsing failed, normalized to: ${seasonName}`);
        return seasonName;
      }

    } catch (error) {
      console.error('❌ Error in simple color analysis:', error);
      throw error;
    }
  }

  private normalizeSeason(rawResponse: string): string {
    const seasons = [
      'True Winter', 'Bright Winter', 'Dark Winter',
      'True Summer', 'Light Summer', 'Soft Summer', 
      'True Spring', 'Bright Spring', 'Light Spring',
      'True Autumn', 'Dark Autumn', 'Soft Autumn'
    ];

    // Check if any season name is mentioned in the response
    for (const season of seasons) {
      if (rawResponse.includes(season)) {
        return season;
      }
    }

    // If no exact match, return the raw response
    return rawResponse;
  }

  private getMimeType(imagePath: string): string {
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
}