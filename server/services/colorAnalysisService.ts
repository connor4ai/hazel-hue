import OpenAI from "openai";
import fs from "fs";
import path from "path";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
}

export class ColorAnalysisService {
  private readonly colorAnalysisPrompt = `
    You are a professional color analyst with expertise in seasonal color analysis. 
    
    Analyze the provided photos to determine the person's seasonal color type from these 16 categories:
    
    SPRING: Bright Spring, True Spring, Light Spring, Warm Spring
    SUMMER: Light Summer, True Summer, Soft Summer, Cool Summer
    AUTUMN: Soft Autumn, True Autumn, Deep Autumn, Warm Autumn
    WINTER: Deep Winter, True Winter, Bright Winter, Cool Winter
    
    Consider these factors:
    1. Skin undertone (warm, cool, or neutral)
    2. Eye color and clarity
    3. Natural hair color
    4. Overall contrast level
    5. Color intensity that complements the person
    
    Provide your analysis in this exact JSON format:
    {
      "season": "Specific Season Name (e.g., Bright Spring, Deep Winter)",
      "description": "A detailed 2-3 sentence explanation of why this season suits them, mentioning their specific coloring characteristics",
      "coreNeutrals": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5", "#hexcolor6"],
      "accentLights": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5", "#hexcolor6"],
      "accentBrights": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5", "#hexcolor6"],
      "recommendations": {
        "metals": "Specific metal recommendations (gold, silver, rose gold, etc.) and why",
        "eyewear": "Frame colors and styles that would be most flattering",
        "makeup": "Specific makeup color recommendations for lips, cheeks, and eyes"
      }
    }
    
    Ensure all hex colors are valid and represent realistic, wearable colors appropriate for the determined season.
  `;

  async analyzePhotos(imagePaths: string[]): Promise<ColorAnalysisResult> {
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

      // Call OpenAI with GPT-4o vision model
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: this.colorAnalysisPrompt
              },
              ...imageContents
            ]
          }
        ],
        max_tokens: 1500,
        response_format: { type: "json_object" }
      });

      const result = response.choices[0].message.content;
      if (!result) {
        throw new Error("No response from OpenAI");
      }

      const analysisResult = JSON.parse(result) as ColorAnalysisResult;
      
      // Validate the result structure
      this.validateAnalysisResult(analysisResult);
      
      return analysisResult;
    } catch (error: any) {
      console.error("Color analysis error:", error);
      throw new Error(`Failed to analyze colors: ${error?.message || 'Unknown error'}`);
    }
  }

  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.webp':
        return 'image/webp';
      default:
        return 'image/jpeg';
    }
  }

  private validateAnalysisResult(result: any): void {
    const required = ['season', 'description', 'coreNeutrals', 'accentLights', 'accentBrights', 'recommendations'];
    
    for (const field of required) {
      if (!result[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate color arrays
    const colorArrays = ['coreNeutrals', 'accentLights', 'accentBrights'];
    for (const arrayName of colorArrays) {
      if (!Array.isArray(result[arrayName]) || result[arrayName].length !== 6) {
        throw new Error(`${arrayName} must be an array of 6 colors`);
      }
      
      // Validate hex colors
      for (const color of result[arrayName]) {
        if (typeof color !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
          throw new Error(`Invalid hex color: ${color}`);
        }
      }
    }

    // Validate recommendations
    const recRequired = ['metals', 'eyewear', 'makeup'];
    for (const field of recRequired) {
      if (!result.recommendations[field]) {
        throw new Error(`Missing recommendation field: ${field}`);
      }
    }
  }
}

export const colorAnalysisService = new ColorAnalysisService();