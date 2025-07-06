import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { seasonalContentMap } from '../../shared/seasonalContent';
import type { ColorAnalysisResult } from '../../shared/types';

export class SimpleColorAnalysisService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzePhotos(imagePaths: string[]): Promise<ColorAnalysisResult> {
    try {
      console.log(`🎨 Starting simple GPT-4o analysis with ${imagePaths.length} images...`);
      
      // Convert images to base64 for OpenAI Vision API
      const imageContents = await Promise.all(
        imagePaths.map(async (imagePath) => {
          const fullPath = path.resolve(imagePath);
          const imageBuffer = fs.readFileSync(fullPath);
          const base64Image = imageBuffer.toString('base64');
          const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
          
          return {
            type: "image_url" as const,
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`
            }
          };
        })
      );

      // Call OpenAI GPT-4o Vision with exact Python approach
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",  // Full model
        messages: [
          {
            role: "system",
            content: "You are a certified personal-color analyst. " +
                     "Determine which **exactly one** of these 12 seasons fits the person best:\n" +
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
                text: "Determine the single best season using every image."
              },
              ...imageContents
            ]
          }
        ],
        temperature: 0,      // Hard-zero randomness
        top_p: 0,           // Hard-zero randomness  
        seed: 42            // Guarantees identical result
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
          throw new Error("No season found in response");
        }

        // Get seasonal content
        const seasonalContent = seasonalContentMap[seasonName];
        if (!seasonalContent) {
          throw new Error(`No content found for season: ${seasonName}`);
        }

        console.log(`✅ GPT-4o Vision analysis completed: ${seasonName}`);

        return {
          season: seasonName,
          description: seasonalContent.description,
          coreNeutrals: seasonalContent.coreNeutrals,
          accentLights: seasonalContent.accentLights,
          accentDeeps: seasonalContent.accentDeeps,
          signatureColors: seasonalContent.signatureColors,
          characteristics: seasonalContent.characteristics,
          colorsToAvoid: seasonalContent.colorsToAvoid,
          makeup: seasonalContent.makeup,
          jewelry: seasonalContent.jewelry,
          hairColors: seasonalContent.hairColors
        };

      } catch (parseError) {
        console.error("Failed to parse JSON response:", result);
        throw new Error(`Invalid JSON response from OpenAI: ${result}`);
      }

    } catch (error) {
      console.error("❌ GPT-4o analysis failed:", error);
      throw error;
    }
  }
}