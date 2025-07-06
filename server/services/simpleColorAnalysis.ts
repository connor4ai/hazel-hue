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

      // Call OpenAI GPT-4o Vision with simple, direct prompts
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a certified personal-color analyst who always classifies a person into **exactly one** of the 12 extended seasons: True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Dark Autumn, Soft Autumn. Never refuse. The output should be simply the season name. Nothing else."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Here are three photos of the same person. Study them together and pick the **single best-fit season**. Respond with ONLY the season name, no explanation."
              },
              ...imageContents
            ]
          }
        ],
        max_tokens: 10,
        temperature: 0
      });

      const result = response.choices[0].message.content?.trim();
      if (!result) {
        throw new Error("No response from OpenAI");
      }

      // Normalize the season name by extracting it from any extra text
      const seasonName = this.normalizeSeason(result);
      console.log(`✅ GPT-4o Vision analysis completed: ${seasonName}`);
      return seasonName;

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