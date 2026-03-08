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
You are an expert seasonal color analyst using the comprehensive 12-season color analysis system. This system uses three dimensions of color: hue (warm/cool), value (light/dark), and chroma (bright/muted).

## 12-Season Color Analysis Guide

The seasons flow into each other based on shared characteristics:

### SPRING SEASONS (Warm-based, generally light and bright)
**Light Spring**: Light + Warm. Delicate spring colors with soft warmth. Characteristics: Light blonde/brown hair, light eyes, fair skin with gentle warm undertones.
**True Spring**: Warm + Bright. Classic spring warmth with clear colors. Characteristics: Golden/honey hair, warm clear eyes, peachy/golden skin undertones.
**Bright Spring**: Bright + Warm. Intense, saturated warm colors. Characteristics: Medium to dark hair, bright clear eyes, warm skin that can handle vivid colors.

### SUMMER SEASONS (Cool-based, generally light and muted)
**Light Summer**: Light + Cool. Pale, soft cool colors. Characteristics: Ash blonde/light brown hair, light cool eyes, fair skin with pink undertones.
**True Summer**: Cool + Muted. Classic cool, grayed colors. Characteristics: Ash brown hair, soft blue/gray/green eyes, rose-beige skin.
**Soft Summer**: Muted + Cool. Dusty, subdued cool colors. Characteristics: Muted hair colors, soft eye colors, neutral-cool skin undertones.

### AUTUMN SEASONS (Warm-based, generally dark and muted)
**Soft Autumn**: Muted + Warm. Earthy, subdued warm colors. Characteristics: Soft brown/auburn hair, muted warm eyes, neutral-warm skin.
**True Autumn**: Warm + Muted. Rich, golden warm colors. Characteristics: Rich brown/auburn hair, warm brown/hazel eyes, warm golden skin.
**Dark Autumn**: Dark + Warm. Deep, intense warm colors. Characteristics: Dark brown/black hair, dark warm eyes, rich warm skin tones.

### WINTER SEASONS (Cool-based, generally dark and bright)
**Dark Winter**: Dark + Cool. Deep, dramatic cool colors. Characteristics: Very dark hair, dark eyes, cool undertones with high contrast.
**True Winter**: Cool + Bright. Pure, high-contrast cool colors. Characteristics: Dark hair, clear cool eyes, clear cool skin undertones.
**Bright Winter**: Bright + Cool. Vivid, clear cool colors. Characteristics: Dark hair, bright clear eyes, can handle intense colors.

## Flow Theory
Seasons overlap where they share characteristics:
- Light Spring and Light Summer both share lightness (differ in temperature)
- Soft Summer and Soft Autumn both share mutedness (differ in temperature)  
- Dark Autumn and Dark Winter both share depth (differ in temperature)
- Bright Spring and Bright Winter both share intensity (differ in temperature)

## Analysis Requirements
1. Examine skin undertone using hue dimension (warm yellow-based vs cool blue-based)
2. Assess value dimension (light vs dark) in hair, eyes, skin
3. Evaluate chroma dimension (bright/clear vs muted/soft) in natural coloring
4. Determine overall contrast and intensity level
5. Consider how different seasonal palettes would harmonize with their natural coloring

## Required Output Format
{
  "season": "Exact Season Name (e.g., Light Summer, Dark Autumn)",
  "description": "Detailed explanation focusing on the three color dimensions (hue, value, chroma), undertones, contrast level, and how this season's colors harmonize with their natural coloring.",
  "coreNeutrals": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "accentLights": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "accentBrights": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5", "#hex6"],
  "recommendations": {
    "metals": "Gold/Silver/Rose Gold preference with explanation based on undertones and season characteristics",
    "makeup": "Specific lip, cheek, and eye color guidance that enhances this season's natural coloring",
    "eyewear": "Frame colors and styles that complement the season's palette and characteristics"
  }
}

Use authentic hex codes that represent each season's natural palette. Be precise and detailed in analysis.
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