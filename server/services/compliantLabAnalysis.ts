import OpenAI from 'openai';
import { execSync } from 'child_process';
import path from 'path';
import { logger } from '../utils/logger';
import fs from 'fs';

interface LabData {
  skin_LAB: [number, number, number];
  hair_LAB: [number, number, number];
  eye_LAB: [number, number, number];
  overall_contrast: 'high' | 'medium' | 'low';
  undertone: 'warm' | 'cool' | 'neutral';
  chroma_intensity: 'muted' | 'moderate' | 'vibrant';
}

export class CompliantLabAnalysisService {
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
   * Log detailed analysis information to persistent file
   */
  private logAnalysisDetails(orderId: string, step: string, data: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      orderId,
      step,
      data
    };
    
    const logPath = path.join(process.cwd(), 'analysis-logs.txt');
    const logLine = `[${timestamp}] ORDER-${orderId} | ${step} | ${JSON.stringify(data, null, 2)}\n\n`;
    
    try {
      fs.appendFileSync(logPath, logLine);
      console.log(`📝 Logged analysis step: ${step} for order ${orderId}`);
    } catch (error) {
      console.error('Failed to write analysis log:', error);
    }
  }

  /**
   * Extract LAB values using local Python processing
   * This is compliant with OpenAI policies as no image data goes to OpenAI
   */
  async extractLabData(imagePaths: string[], orderId?: string): Promise<LabData[]> {
    console.log(`🔬 Extracting LAB data locally from ${imagePaths.length} images`);
    
    if (orderId) {
      this.logAnalysisDetails(orderId, 'LAB_EXTRACTION_START', {
        imageCount: imagePaths.length,
        imagePaths: imagePaths
      });
    }
    
    try {
      // First try the full OpenCV/MediaPipe extractor
      const pythonPath = path.join(process.cwd(), 'python', 'lab_extractor.py');
      const command = `python3 ${pythonPath} ${imagePaths.join(' ')}`;
      
      console.log(`🐍 Running Python command: ${command}`);
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'PYTHON_COMMAND', {
          command: command,
          pythonPath: pythonPath
        });
      }
      
      const result = execSync(command, { 
        encoding: 'utf8',
        timeout: 30000 // 30 second timeout
      });
      
      console.log(`📊 Python LAB extraction result:`, result);
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'LAB_EXTRACTION_RESULT', {
          rawResult: result
        });
      }
      
      const labDataArray = JSON.parse(result);
      
      if (!Array.isArray(labDataArray) || labDataArray.length === 0) {
        throw new Error('No LAB data extracted from images');
      }
      
      console.log(`✅ Successfully extracted LAB data from ${labDataArray.length} images`);
      return labDataArray;
      
    } catch (error: any) {
      console.error('❌ Real LAB extraction failed:', error.message);
      throw new Error(`LAB extraction failed: ${error.message}`);
    }
  }

  /**
   * Average LAB data across multiple photos for more accuracy
   */
  private averageLabData(labDataArray: LabData[]): LabData {
    if (labDataArray.length === 1) {
      return labDataArray[0];
    }

    const avgSkin = [0, 0, 0];
    const avgHair = [0, 0, 0];
    const avgEye = [0, 0, 0];
    
    let validSkinCount = 0;
    let validHairCount = 0;
    let validEyeCount = 0;

    for (const data of labDataArray) {
      if (data.skin_LAB) {
        avgSkin[0] += data.skin_LAB[0];
        avgSkin[1] += data.skin_LAB[1];
        avgSkin[2] += data.skin_LAB[2];
        validSkinCount++;
      }
      if (data.hair_LAB) {
        avgHair[0] += data.hair_LAB[0];
        avgHair[1] += data.hair_LAB[1];
        avgHair[2] += data.hair_LAB[2];
        validHairCount++;
      }
      if (data.eye_LAB) {
        avgEye[0] += data.eye_LAB[0];
        avgEye[1] += data.eye_LAB[1];
        avgEye[2] += data.eye_LAB[2];
        validEyeCount++;
      }
    }

    // Average the values
    if (validSkinCount > 0) {
      avgSkin[0] /= validSkinCount;
      avgSkin[1] /= validSkinCount;
      avgSkin[2] /= validSkinCount;
    }
    if (validHairCount > 0) {
      avgHair[0] /= validHairCount;
      avgHair[1] /= validHairCount;
      avgHair[2] /= validHairCount;
    }
    if (validEyeCount > 0) {
      avgEye[0] /= validEyeCount;
      avgEye[1] /= validEyeCount;
      avgEye[2] /= validEyeCount;
    }

    // Use most common categorical values
    const contrasts = labDataArray.map(d => d.overall_contrast);
    const undertones = labDataArray.map(d => d.undertone);
    const chromas = labDataArray.map(d => d.chroma_intensity);

    return {
      skin_LAB: avgSkin as [number, number, number],
      hair_LAB: avgHair as [number, number, number],
      eye_LAB: avgEye as [number, number, number],
      overall_contrast: this.getMostCommon(contrasts),
      undertone: this.getMostCommon(undertones),
      chroma_intensity: this.getMostCommon(chromas)
    };
  }

  private getMostCommon<T>(arr: T[]): T {
    const counts = arr.reduce((acc, val) => {
      acc[val as string] = (acc[val as string] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    ) as T;
  }

  /**
   * Analyze season using GPT-o3 with LAB data only
   * Compliant with OpenAI policies - only numeric data sent
   */
  async analyzeSeasonWithLabData(labDataArray: LabData[], orderId?: string): Promise<string> {
    console.log(`🧪 Analyzing season using LAB data from ${labDataArray.length} photos`);
    
    // Average the LAB values across multiple photos for more accuracy
    const avgLabData = this.averageLabData(labDataArray);
    
    console.log(`📊 Average LAB data:`, JSON.stringify(avgLabData, null, 2));
    
    if (orderId) {
      this.logAnalysisDetails(orderId, 'LAB_DATA_AVERAGED', {
        originalCount: labDataArray.length,
        averagedData: avgLabData
      });
    }
    
    // Try GPT-o3 first, fall back to GPT-4o after 1 minute
    try {
      console.log('🧠 Attempting analysis with GPT-o3 (full reasoning model)...');
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'GPT_O3_REQUEST_START', {
          model: 'o3',
          parameters: { max_completion_tokens: 32768, note: 'Using default temperature and top_p for o3 model' },
          inputData: avgLabData
        });
      }
      
      const o3Promise = this.openai.chat.completions.create({
        model: "o3",
        max_completion_tokens: 32768,
        messages: [
          {
            role: "system",
            content: "You are a certified color analyst specializing in the 12-season system. Use your advanced reasoning capabilities to analyze the provided LAB color data to determine the correct seasonal color type."
          },
          {
            role: "user", 
            content: `Using the 12-season color analysis system, classify this person based on their LAB color data.

IMPORTANT: You must choose EXACTLY one of these 12 seasons:
- True Winter
- Bright Winter 
- Dark Winter
- True Summer
- Light Summer
- Soft Summer
- True Spring
- Bright Spring
- Light Spring
- True Autumn
- Dark Autumn
- Soft Autumn

LAB Color Data:
${JSON.stringify(avgLabData, null, 2)}

Analysis Guidelines:
- Skin LAB values for undertone assessment (a* values: negative=green/cool, positive=red/warm)
- Hair LAB values for natural coloring (L* for lightness, a* and b* for undertone)
- Eye LAB values for contrast analysis (how they contrast with skin and hair)
- Overall contrast level (high/medium/low)
- Undertone (warm/cool/neutral)
- Chroma intensity (muted/moderate/vibrant)

Use your reasoning to carefully analyze these numerical values and classify the season.

Return exactly this JSON format:
{
  "season": "<One of the 12 exact season names listed above>",
  "confidence": <0-100 integer>,
  "reasoning": "<Detailed explanation based on LAB values analysis>"
}`
          }
        ]
      });

      // Set 60-second timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('GPT-o3 timeout after 60 seconds')), 60000);
      });

      const response = await Promise.race([o3Promise, timeoutPromise]);
      
      console.log('✅ GPT-o3 analysis completed');
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'GPT_O3_RESPONSE', {
          model: 'o3',
          usage: response.usage,
          rawResponse: response.choices[0].message.content
        });
      }
      
      try {
        const content = response.choices[0].message.content.trim();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log(`🎯 GPT-o3 Result: ${parsed.season} (${parsed.confidence}% confidence)`);
          console.log(`💭 Reasoning: ${parsed.reasoning}`);
          
          if (orderId) {
            this.logAnalysisDetails(orderId, 'GPT_O3_SUCCESS', {
              season: parsed.season,
              confidence: parsed.confidence,
              reasoning: parsed.reasoning
            });
          }
          
          // Normalize season name to match expected format
          const normalizedSeason = this.normalizeSeasonName(parsed.season);
          return normalizedSeason;
        }
      } catch (parseError) {
        console.error('❌ Failed to parse GPT-o3 JSON response');
      }
      
      // Fallback: extract season name from response
      const content = response.choices[0].message.content;
      const seasonMatch = content.match(/(True|Bright|Dark|Light|Soft|Cool|Deep|Warm)\s+(Winter|Summer|Spring|Autumn)/i);
      if (seasonMatch) {
        const season = `${seasonMatch[1]} ${seasonMatch[2]}`;
        console.log(`🎯 GPT-o3 fallback result: ${season}`);
        return season;
      }

    } catch (o3Error) {
      console.log(`⚠️ GPT-o3 failed: ${o3Error.message}`);
      console.log('🔄 Falling back to GPT-4o...');
    }

    // Fallback to GPT-4o
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        top_p: 0,
        seed: 42,
        messages: [
          {
            role: "system",
            content: "You are a certified color analyst specializing in the 12-season system. Analyze the provided LAB color data to determine the correct seasonal color type."
          },
          {
            role: "user",
            content: `Using the 12-season color analysis system, classify this person based on their LAB color data.

IMPORTANT: You must choose EXACTLY one of these 12 seasons:
- True Winter
- Bright Winter 
- Dark Winter
- True Summer
- Light Summer
- Soft Summer
- True Spring
- Bright Spring
- Light Spring
- True Autumn
- Dark Autumn
- Soft Autumn

LAB Color Data:
${JSON.stringify(avgLabData, null, 2)}

Return only the exact season name from the list above.`
          }
        ]
      });

      const season = response.choices[0].message.content.trim();
      console.log(`🎯 GPT-4o fallback result: ${season}`);
      return season;

    } catch (fallbackError) {
      console.error('❌ Both GPT-o3 and GPT-4o failed:', fallbackError);
      throw new Error('Color analysis failed');
    }
  }

  /**
   * Complete analysis pipeline: Extract LAB data locally, then analyze with AI
   */
  async analyzePhotosCompliant(imagePaths: string[], orderId?: string): Promise<string> {
    console.log(`🎨 Starting compliant color analysis for ${imagePaths.length} photos`);
    
    if (orderId) {
      this.logAnalysisDetails(orderId, 'COMPLIANT_ANALYSIS_START', {
        method: 'compliant_lab_analysis',
        imageCount: imagePaths.length,
        imagePaths: imagePaths
      });
    }
    
    try {
      // Step 1: Extract LAB data locally (no OpenAI API calls)
      const labDataArray = await this.extractLabData(imagePaths, orderId);
      
      // Step 2: Analyze with OpenAI using only numeric data
      const season = await this.analyzeSeasonWithLabData(labDataArray, orderId);
      
      console.log(`✅ Compliant analysis completed: ${season}`);
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'COMPLIANT_ANALYSIS_COMPLETE', {
          finalSeason: season,
          success: true
        });
      }
      
      return season;
      
    } catch (error) {
      console.error('❌ Compliant analysis failed:', error);
      
      if (orderId) {
        this.logAnalysisDetails(orderId, 'COMPLIANT_ANALYSIS_ERROR', {
          error: error.message || String(error),
          stack: error.stack
        });
      }
      
      throw error;
    }
  }

  /**
   * Normalize season names to match expected format
   * Handles variations like "True/Warm Spring" -> "True Spring"
   */
  private normalizeSeasonName(season: string): string {
    // Remove common variations and normalize
    const normalized = season
      .replace(/True\/Warm\s+/i, 'True ')
      .replace(/Warm\/True\s+/i, 'True ')
      .replace(/Warm\s+(Spring|Autumn)/i, 'True $1')
      .replace(/Cool\s+(Summer|Winter)/i, 'True $1')
      .replace(/Bright\/Cool\s+/i, 'Bright ')
      .replace(/Deep\/Dark\s+/i, 'Dark ')
      .replace(/Soft\/Muted\s+/i, 'Soft ')
      .replace(/Light\/Delicate\s+/i, 'Light ')
      .replace(/Cool\/True\s+/i, 'True ')
      .trim();

    // Validate against known seasons
    const validSeasons = [
      'True Winter', 'Bright Winter', 'Dark Winter',
      'True Summer', 'Light Summer', 'Soft Summer',
      'True Spring', 'Bright Spring', 'Light Spring',
      'True Autumn', 'Dark Autumn', 'Soft Autumn'
    ];

    const exactMatch = validSeasons.find(validSeason => 
      validSeason.toLowerCase() === normalized.toLowerCase()
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Try partial matching for edge cases
    const partialMatch = validSeasons.find(validSeason => 
      normalized.toLowerCase().includes(validSeason.toLowerCase()) ||
      validSeason.toLowerCase().includes(normalized.toLowerCase())
    );

    if (partialMatch) {
      console.log(`🔧 Normalized "${season}" to "${partialMatch}"`);
      return partialMatch;
    }

    console.log(`⚠️ Could not normalize season: "${season}"`);
    return season; // Return original if no match found
  }
}