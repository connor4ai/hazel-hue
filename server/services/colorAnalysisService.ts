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
You are an expert seasonal color analyst. Analyze the provided photos to determine the person's exact seasonal color type from the comprehensive 16-season system.

## 16-Season Color Analysis Guide

### SPRING SEASONS (Warm undertones, clear/bright colors)
**Bright Spring**: High contrast, warm undertone, vibrant clear colors. Characteristics: Medium to dark hair, bright clear eyes, warm but not golden skin.
**True Spring**: Classic spring warmth, medium contrast. Characteristics: Golden/honey hair, warm eyes, peachy/golden skin undertones.
**Light Spring**: Delicate spring warmth, low contrast. Characteristics: Light blonde/light brown hair, light eyes, fair skin with warm undertones.
**Warm Spring**: Maximum warmth, golden tones. Characteristics: Golden/auburn hair, warm brown/hazel eyes, golden yellow undertones.

### SUMMER SEASONS (Cool undertones, muted/soft colors)
**Light Summer**: Delicate coolness, very low contrast. Characteristics: Ash blonde/light brown hair, light cool eyes, fair skin with pink undertones.
**True Summer**: Classic summer coolness, medium-low contrast. Characteristics: Ash brown hair, soft blue/gray/green eyes, rose-beige skin.
**Soft Summer**: Muted coolness, low contrast. Characteristics: Muted hair colors, soft eye colors, neutral-cool skin undertones.
**Cool Summer**: Maximum coolness, icy tones. Characteristics: Ash hair, cool-toned eyes, pink or blue undertones in skin.

### AUTUMN SEASONS (Warm undertones, muted/earthy colors)
**Soft Autumn**: Muted warmth, low contrast. Characteristics: Soft brown/auburn hair, muted eyes, neutral-warm skin.
**True Autumn**: Classic autumn warmth, medium contrast. Characteristics: Rich brown/auburn hair, warm brown/hazel eyes, warm golden skin.
**Deep Autumn**: Rich warmth with depth, high contrast. Characteristics: Dark brown/black hair, dark eyes, rich warm skin tones.
**Warm Autumn**: Maximum warmth, golden earth tones. Characteristics: Golden brown/red hair, warm eyes, golden yellow undertones.

### WINTER SEASONS (Cool undertones, clear/bold colors)
**Deep Winter**: Maximum depth and coolness, very high contrast. Characteristics: Very dark hair, dark eyes, cool undertones with high contrast.
**True Winter**: Classic winter coolness, high contrast. Characteristics: Dark hair, clear cool eyes, clear cool skin undertones.
**Bright Winter**: High contrast with some warmth, vivid colors. Characteristics: Dark hair, bright clear eyes, neutral-cool undertones.
**Cool Winter**: Maximum coolness, icy clarity. Characteristics: Dark hair, cool-toned eyes, pink or blue undertones, high contrast.

## Analysis Requirements
1. Examine skin undertone (warm/golden vs cool/pink vs neutral)
2. Assess natural hair color and depth
3. Evaluate eye color, clarity, and warmth/coolness
4. Determine overall contrast level between features
5. Match to the EXACT seasonal type that best fits all characteristics

## Required Output Format
Provide your analysis in this EXACT JSON format:

{
  "season": "Exact Season Name (e.g., Light Summer, Deep Autumn)",
  "description": "Brief 1-2 sentence explanation focusing on their specific undertone, contrast level, and why this season suits them.",
  "coreNeutrals": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "accentLights": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "accentBrights": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "recommendations": {
    "metals": "Gold/Silver/Rose Gold and specific reasoning",
    "makeup": "Specific lip, cheek, and eye color guidance with exact shades",
    "eyewear": "Frame colors and styles that enhance their natural coloring"
  }
}

**Light Complexion Example (Light Summer)**: Person with ash blonde hair, light blue-gray eyes, fair skin with pink undertones, delicate features.

**Dark Complexion Example (Deep Autumn)**: Person with dark brown hair, warm brown eyes, rich golden-brown skin, strong warm undertones.

Be precise, season-consistent, and concise. No additional text outside the JSON blocks.
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

      // Call OpenAI with GPT-4o vision model with optimized parameters
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
        max_tokens: 2000,
        temperature: 0.35,
        top_p: 0.9,
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