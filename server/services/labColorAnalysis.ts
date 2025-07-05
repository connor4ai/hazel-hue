import OpenAI from 'openai';
import fs from 'fs';
import { logger } from '../utils/logger';

interface LabColorData {
  skin_LAB: [number, number, number];
  hair_LAB: [number, number, number];
  eye_LAB: [number, number, number];
  overall_contrast: 'high' | 'medium' | 'low';
  undertone: 'warm' | 'cool' | 'neutral';
  chroma_intensity: 'muted' | 'moderate' | 'vibrant';
}

export class LabColorAnalysisService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found');
    }
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async extractLabData(imagePaths: string[]): Promise<LabColorData[]> {
    console.log(`🔬 Starting LAB color extraction for ${imagePaths.length} images`);
    
    const results: LabColorData[] = [];
    
    for (const imagePath of imagePaths) {
      try {
        console.log(`📸 Extracting LAB data from: ${imagePath}`);
        
        // Read and encode image
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = imagePath.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';
        
        console.log(`📊 Image size: ${imageBuffer.length} bytes`);
        
        const response = await this.openai.chat.completions.create({
          model: "gpt-4o",
          temperature: 0,
          top_p: 0,
          seed: 12345,
          messages: [
            {
              role: "system",
              content: "You are a professional colorimetrist with access to spectrophotometer data. Extract precise CIE L*a*b* color values for skin, hair, and eyes from this portrait photo. Provide numerical LAB coordinates only. Return only valid JSON with exact numbers."
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this portrait and extract LAB color values. Return exactly this JSON format:
{
  "skin_LAB": [L, a, b],
  "hair_LAB": [L, a, b], 
  "eye_LAB": [L, a, b],
  "overall_contrast": "high|medium|low",
  "undertone": "warm|cool|neutral",
  "chroma_intensity": "muted|moderate|vibrant"
}

LAB values should be:
- L (lightness): 0-100
- a (green-red): -128 to +127  
- b (blue-yellow): -128 to +127`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ]
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error('No response from OpenAI');
        }

        console.log(`🤖 OpenAI LAB response: ${content}`);

        // Parse JSON response (handle markdown code blocks)
        let labData: LabColorData;
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          const jsonStr = jsonMatch ? jsonMatch[0] : content;
          labData = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error(`❌ Failed to parse LAB JSON: ${parseError}`);
          throw new Error(`Invalid JSON response: ${content}`);
        }

        // Validate the structure
        if (!labData.skin_LAB || !labData.hair_LAB || !labData.eye_LAB) {
          throw new Error('Missing required LAB color data');
        }

        console.log(`✅ Extracted LAB data:`, JSON.stringify(labData, null, 2));
        results.push(labData);
        
      } catch (error) {
        console.error(`❌ Error extracting LAB data from ${imagePath}:`, error);
        throw error;
      }
    }
    
    return results;
  }

  async analyzeWithLabData(labDataArray: LabColorData[]): Promise<string> {
    console.log(`🧪 Analyzing season using LAB data from ${labDataArray.length} photos`);
    
    // Average the LAB values across multiple photos for more accuracy
    const avgLabData = this.averageLabData(labDataArray);
    
    console.log(`📊 Average LAB data:`, JSON.stringify(avgLabData, null, 2));
    
    // Try GPT-o3 first, fall back to GPT-4o if needed
    let response;
    try {
      console.log('🧠 Attempting analysis with GPT-o3...');
      response = await this.openai.chat.completions.create({
        model: "o3-mini",
        messages: [
        {
          role: "system",
          content: "You are a certified color analyst specializing in the 12-season system. Use your reasoning capabilities to analyze the provided LAB color data to determine the correct seasonal color type."
        },
        {
          role: "user", 
          content: `Using the 12-season color analysis system, classify this person based on their LAB color data:

${JSON.stringify(avgLabData, null, 2)}

Consider:
- Skin LAB values for undertone assessment (a* values: negative=green/cool, positive=red/warm)
- Hair LAB values for natural coloring (L* for lightness, a* and b* for undertone)
- Eye LAB values for contrast analysis (how they contrast with skin and hair)
- Overall contrast level (high/medium/low)
- Undertone (warm/cool/neutral)
- Chroma intensity (muted/moderate/vibrant)

Use your reasoning to carefully analyze these numerical values and classify the season.

Return exactly this JSON:
{
  "season": "<Exact season name>",
  "confidence": <0-100 integer>,
  "reasoning": "<Detailed explanation based on LAB values analysis>"
}

Valid seasons: True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Soft Autumn, Dark Autumn`
        }
      ]
      });
      console.log('✅ GPT-o3 analysis successful');
    } catch (o3Error) {
      console.log('⚠️ GPT-o3 unavailable, falling back to GPT-4o:', o3Error.message);
      response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        top_p: 0,
        seed: 12345,
        messages: [
        {
          role: "system",
          content: "You are a certified color analyst specializing in the 12-season system. Analyze the provided LAB color data to determine the correct seasonal color type."
        },
        {
          role: "user", 
          content: `Using the 12-season color analysis system, classify this person based on their LAB color data:

${JSON.stringify(avgLabData, null, 2)}

Consider:
- Skin LAB values for undertone assessment (a* values: negative=green/cool, positive=red/warm)
- Hair LAB values for natural coloring (L* for lightness, a* and b* for undertone)
- Eye LAB values for contrast analysis (how they contrast with skin and hair)
- Overall contrast level (high/medium/low)
- Undertone (warm/cool/neutral)
- Chroma intensity (muted/moderate/vibrant)

Return exactly this JSON:
{
  "season": "<Exact season name>",
  "confidence": <0-100 integer>,
  "reasoning": "<Detailed explanation based on LAB values analysis>"
}

Valid seasons: True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Soft Autumn, Dark Autumn`
        }
      ]
      });
    }

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI season analysis');
    }

    console.log(`🤖 Season analysis response: ${content}`);

    // Parse the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      const result = JSON.parse(jsonStr);
      
      console.log(`✅ LAB-based season result: ${result.season} (${result.confidence}% confidence)`);
      console.log(`💡 Reasoning: ${result.reasoning}`);
      
      return result.season;
    } catch (parseError) {
      console.error(`❌ Failed to parse season analysis JSON: ${parseError}`);
      throw new Error(`Invalid JSON response: ${content}`);
    }
  }

  private averageLabData(labDataArray: LabColorData[]): LabColorData {
    if (labDataArray.length === 0) {
      throw new Error('No LAB data to average');
    }
    
    if (labDataArray.length === 1) {
      return labDataArray[0];
    }
    
    // Average the LAB values
    const avgSkinL = labDataArray.reduce((sum, data) => sum + data.skin_LAB[0], 0) / labDataArray.length;
    const avgSkinA = labDataArray.reduce((sum, data) => sum + data.skin_LAB[1], 0) / labDataArray.length;
    const avgSkinB = labDataArray.reduce((sum, data) => sum + data.skin_LAB[2], 0) / labDataArray.length;
    
    const avgHairL = labDataArray.reduce((sum, data) => sum + data.hair_LAB[0], 0) / labDataArray.length;
    const avgHairA = labDataArray.reduce((sum, data) => sum + data.hair_LAB[1], 0) / labDataArray.length;
    const avgHairB = labDataArray.reduce((sum, data) => sum + data.hair_LAB[2], 0) / labDataArray.length;
    
    const avgEyeL = labDataArray.reduce((sum, data) => sum + data.eye_LAB[0], 0) / labDataArray.length;
    const avgEyeA = labDataArray.reduce((sum, data) => sum + data.eye_LAB[1], 0) / labDataArray.length;
    const avgEyeB = labDataArray.reduce((sum, data) => sum + data.eye_LAB[2], 0) / labDataArray.length;
    
    // Use the most common values for categorical data
    const mostCommonContrast = this.getMostCommon(labDataArray.map(d => d.overall_contrast));
    const mostCommonUndertone = this.getMostCommon(labDataArray.map(d => d.undertone));
    const mostCommonChroma = this.getMostCommon(labDataArray.map(d => d.chroma_intensity));
    
    return {
      skin_LAB: [Math.round(avgSkinL * 100) / 100, Math.round(avgSkinA * 100) / 100, Math.round(avgSkinB * 100) / 100],
      hair_LAB: [Math.round(avgHairL * 100) / 100, Math.round(avgHairA * 100) / 100, Math.round(avgHairB * 100) / 100],
      eye_LAB: [Math.round(avgEyeL * 100) / 100, Math.round(avgEyeA * 100) / 100, Math.round(avgEyeB * 100) / 100],
      overall_contrast: mostCommonContrast,
      undertone: mostCommonUndertone,
      chroma_intensity: mostCommonChroma
    };
  }
  
  private getMostCommon<T>(arr: T[]): T {
    const counts: Record<string, number> = {};
    arr.forEach(item => {
      const key = String(item);
      counts[key] = (counts[key] || 0) + 1;
    });
    
    return arr.find(item => 
      counts[String(item)] === Math.max(...Object.values(counts))
    )!;
  }
}