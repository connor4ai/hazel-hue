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
    'True Winter', 'Bright Winter', 'Dark Winter',
    'True Summer', 'Light Summer', 'Soft Summer', 
    'True Autumn', 'Soft Autumn', 'Dark Autumn',
    'True Spring', 'Bright Spring', 'Light Spring'
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
      // Check if this is a demo order (with demo images)
      const isDemoOrder = imagePaths.some(path => path.includes('demo'));
      
      if (isDemoOrder) {
        // For demo orders, randomly select from available seasons for testing
        const availableSeasons = ['True Winter', 'Bright Winter', 'Dark Winter', 'True Summer', 'Light Summer', 'Soft Summer', 'True Spring', 'Bright Spring', 'Light Spring', 'True Autumn', 'Dark Autumn', 'Soft Autumn'];
        const randomIndex = Math.floor(Math.random() * availableSeasons.length);
        const selectedSeason = availableSeasons[randomIndex];
        console.log(`Demo order - randomly selected ${selectedSeason} for demonstration`);
        return this.getPreloadedResult(selectedSeason);
      }
      
      // Use OpenAI to detect the actual season from real uploaded photos
      const detectedSeason = await this.detectSeason(imagePaths);
      console.log(`AI detected season: ${detectedSeason}`);
      
      // Check if we have content for the detected season
      const availableSeasons = ['True Winter', 'Bright Winter', 'Dark Winter', 'True Summer', 'Light Summer', 'Soft Summer', 'True Spring', 'Bright Spring', 'Light Spring', 'True Autumn', 'Dark Autumn', 'Soft Autumn'];
      if (!availableSeasons.includes(detectedSeason)) {
        console.log(`Season "${detectedSeason}" detected but not yet implemented. Returning work-in-progress result.`);
        return this.getWorkInProgressResult(detectedSeason);
      }
      
      return this.getPreloadedResult(detectedSeason);
    } catch (error) {
      console.error('❌ CRITICAL ERROR in color analysis:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        imagePaths: imagePaths
      });
      
      // Don't default to True Winter automatically - throw the error so we can see what's wrong
      throw new Error(`Color analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async detectSeason(imagePaths: string[]): Promise<string> {
    console.log(`🔍 STARTING ANALYSIS: Processing ${imagePaths.length} uploaded images`);
    console.log(`📸 Image paths:`, imagePaths);
    
    // Check if files exist
    const validPaths = imagePaths.filter(path => {
      const exists = fs.existsSync(path);
      if (!exists) {
        console.warn(`❌ Image file not found: ${path}`);
      } else {
        console.log(`✅ Valid image found: ${path}`);
      }
      return exists;
    });
    
    console.log(`📊 PHOTO COUNT: ${validPaths.length} valid photos will be sent to OpenAI for analysis`);
    
    if (validPaths.length === 0) {
      console.error('❌ No valid image files found for analysis');
      throw new Error('No valid images available for analysis');
    }
    
    const images = validPaths.map(imagePath => {
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
    Professional Color Analysis Instructions for GPT-4o Vision

    Core Analysis Framework
    You are performing a professional color analysis service. Users have paid for this analysis, so accuracy and consistency are paramount. Follow these instructions precisely for every analysis.

    Pre-Analysis Requirements

    Image Quality Assessment
    Lighting Check: Evaluate each photo for:
    - Natural daylight or daylight-equivalent lighting (5000-6500K color temperature)
    - Even illumination across the face without harsh shadows
    - No color casts from artificial lighting (yellow, blue, green tints)
    - If lighting is inadequate, note this in your analysis

    Photo Requirements Verification:
    - Face clearly visible and centered
    - Minimal to no makeup (or note if heavy makeup affects analysis)
    - Hair pulled back from face when possible
    - No strong colored clothing near face that could reflect color

    Scientific Color Analysis Method

    Step 1: Undertone Identification
    Analyze the following areas for undertone determination:

    Vein Test Areas: Inside of wrist and temples
    - Blue/Purple veins = Cool undertone
    - Green veins = Warm undertone
    - Blue-green mix = Neutral undertone

    Natural Flush Points:
    - Cheeks after light exertion
    - Lips natural color
    - Fingertip pads
    - Pink/Rose flush = Cool
    - Peach/Coral flush = Warm
    - Mix of both = Neutral

    Skin's Relationship to White:
    - Compare skin against pure white background
    - Yellow/Golden cast = Warm
    - Pink/Blue cast = Cool
    - No distinct cast = Neutral

    Step 2: Overtone Analysis
    Examine the surface color of skin:
    - Forehead center
    - Cheek apples
    - Jawline
    - Neck (to ensure no foundation interference)

    Document:
    - Depth (Fair, Light, Medium, Tan, Deep, Rich)
    - Visible color cast (golden, olive, pink, red, yellow)

    Step 3: Seasonal Color Classification
    Based on undertone and overtone combination, classify into:

    Cool Undertones:
    Summer: Cool undertone + muted/soft overtones
    - Characteristics: Pink/rose undertones, ashy hair tones naturally, low contrast
    - Best colors: Soft, muted, dusty colors with blue undertones
    - Subcategories: True Summer, Light Summer, Soft Summer

    Winter: Cool undertone + clear/bright overtones
    - Characteristics: Blue/pink undertones, high contrast features, bright white sclera
    - Best colors: Bold, clear, icy colors with blue undertones
    - Subcategories: True Winter, Bright Winter, Dark Winter

    Warm Undertones:
    Spring: Warm undertone + clear/bright overtones
    - Characteristics: Golden/peach undertones, clear bright eyes, golden hair tones
    - Best colors: Clear, warm, bright colors with yellow undertones
    - Subcategories: True Spring, Bright Spring, Light Spring

    Autumn: Warm undertone + muted/rich overtones
    - Characteristics: Golden/bronze undertones, earthy eye colors, golden/red hair tones
    - Best colors: Rich, muted, earthy colors with golden undertones
    - Subcategories: True Autumn, Soft Autumn, Dark Autumn

    Neutral Undertones:
    - Classify based on whether they lean slightly warm or cool
    - Note their versatility with both warm and cool colors

    Step 4: Contrast Level Assessment
    Evaluate the contrast between:
    - Hair and skin
    - Eyes and skin
    - Features overall

    Classify as:
    - High contrast (e.g., pale skin with dark hair)
    - Medium contrast
    - Low contrast (similar depths throughout)

    This affects intensity of recommended colors.

    Step 5: Color Clarity Determination
    Assess whether colors appear:
    - Clear/Bright: Pure, saturated colors suit best
    - Muted/Soft: Dusty, grayed colors suit best

    Look for:
    - Eye clarity and brightness
    - Skin clarity (clear vs. muted appearance)
    - Natural hair color intensity

    Consistency Protocols
    - Always analyze all three photos before making determinations
    - Look for consensus across images - if photos show different results, note this
    - Be specific in observations - reference exact areas of face analyzed
    - Acknowledge limitations - if photo quality affects analysis, state this
    - Cross-check results - ensure undertone and season align logically

    Error Prevention
    Common mistakes to avoid:
    - Don't confuse surface redness with cool undertones
    - Don't let hair color override skin analysis
    - Don't ignore neutral undertones - they're valid
    - Don't assume ethnicity determines undertone
    - Don't let makeup or tan interfere with base tone analysis

    FINAL ANALYSIS REQUIREMENT: Analyze ALL the photos provided to determine their seasonal color type. IMPORTANT: Look at every photo equally and consider the consistent features across all images to make your determination.
    
    Based on your comprehensive professional analysis of all five steps (undertones, overtones, contrast, clarity, and consistency), determine which of these 12 seasons is the best match:

    True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Soft Autumn, Dark Autumn

    IMPORTANT: You MUST respond with ONLY the exact season name. Do not include any explanations, analysis details, or other text. Just the season name.

    If photos are unclear due to lighting or quality issues, choose the most likely season based on any visible features following the scientific method outlined above.
    `;

    console.log('📤 Sending request to OpenAI GPT-4o for season analysis...');
    
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
      temperature: 0.1,
    });
    
    console.log('📥 OpenAI API call completed successfully');

    const rawResponse = response.choices[0]?.message?.content;
    
    console.log(`🤖 OpenAI Raw Response:`, {
      content: rawResponse,
      model: response.model,
      usage: response.usage,
      finish_reason: response.choices[0]?.finish_reason,
      response_length: rawResponse?.length || 0
    });
    
    if (!rawResponse || rawResponse.trim() === '') {
      console.error('❌ OpenAI returned empty response!');
      throw new Error('OpenAI analysis failed: empty response received');
    }
    
    const detectedSeason = rawResponse.trim();
    console.log(`🤖 OpenAI Detected Season: "${detectedSeason}"`);
    
    // Clean up the response to extract just the season name
    const cleanSeason = detectedSeason.split('\n')[0].trim();
    
    // Normalize and validate the detected season
    const normalizedSeason = this.normalizeSeasonName(cleanSeason);
    
    if (!this.allSeasons.includes(normalizedSeason)) {
      console.warn(`⚠️ Invalid season detected: "${cleanSeason}" from OpenAI. Available seasons:`, this.allSeasons);
      console.warn(`⚠️ Full OpenAI response was: "${detectedSeason}"`);
      console.warn(`⚠️ Normalized to: "${normalizedSeason}"`);
      
      // Try to find a fuzzy match
      const fuzzyMatch = this.findBestSeasonMatch(cleanSeason);
      
      if (fuzzyMatch) {
        console.log(`✅ Found fuzzy match: "${cleanSeason}" → "${fuzzyMatch}"`);
        return fuzzyMatch;
      }
      
      console.warn(`⚠️ No match found for "${cleanSeason}", analyzing content to suggest best alternative`);
      
      // If no match, don't default to True Winter - return an error
      throw new Error(`OpenAI returned unrecognized season: "${cleanSeason}". Expected one of: ${this.allSeasons.join(', ')}`);
    }
    
    console.log(`✅ FINAL RESULT: ${normalizedSeason} (analyzed from ${validPaths.length} photos)`);
    return normalizedSeason;
  }

  private getPreloadedResult(season: string): ColorAnalysisResult {
    console.log(`Looking for season content for: "${season}"`);
    console.log('Available seasons:', Object.keys(seasonalContentData));
    
    const content = seasonalContentData[season];
    
    if (!content) {
      console.error(`Season "${season}" not found in seasonalContentData. Available: ${Object.keys(seasonalContentData).join(', ')}`);
      throw new Error(`No pre-loaded content found for season: ${season}`);
    }

    return {
      season: content.season,
      description: content.overview.description,
      coreNeutrals: content.colorPalette.coreNeutrals,
      accentLights: content.colorPalette.accentLights,
      accentBrights: content.colorPalette.accentBrights,
      recommendations: {
        metals: content.accessories.bestMetals ? content.accessories.bestMetals.join(', ') : content.accessories.metals || 'Silver and gold',
        eyewear: content.accessories.glasses ? (Array.isArray(content.accessories.glasses) ? content.accessories.glasses.join('. ') : content.accessories.glasses) : content.accessories.description || 'Frames that complement your coloring',
        makeup: content.makeup.guidelines ? content.makeup.guidelines.join('. ') : content.makeup.tips || content.makeup.foundation || 'Natural makeup that enhances your features'
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

  private getWorkInProgressResult(season: string): ColorAnalysisResult {
    // Return minimal result for unimplemented seasons
    return {
      season: season,
      description: `You are a ${season}! This seasonal color type is currently being developed.`,
      coreNeutrals: [],
      accentLights: [],
      accentBrights: [],
      recommendations: {
        metals: 'Style guide in development',
        eyewear: 'Recommendations coming soon',
        makeup: 'Color palette being curated'
      },
      overview: {
        keyCharacteristics: [`${season} characteristics being documented`],
        signatureColors: ['Color palette in development'],
        colorsToAvoid: ['Guidelines being prepared'],
        description: `You are a ${season}! This seasonal color type is currently being developed with comprehensive style guides and color recommendations.`
      },
      colorPalette: {
        htmlContent: `<div style="text-align:center;padding:50px;"><h1>${season}</h1><p>Color palette coming soon!</p></div>`,
        coreNeutrals: [],
        accentLights: [],
        accentBrights: []
      },
      clothing: {
        pinterestUrl: '',
        guidelines: ['Style guide in development']
      },
      accessories: {
        metals: 'Coming soon',
        jewelry: ['Recommendations in development'],
        watches: ['Style guide being prepared'],
        glasses: ['Options being curated']
      },
      hairColor: {
        bestColors: ['Color recommendations coming soon'],
        avoidColors: ['Guidelines being prepared'],
        guidance: `${season} hair color guide in development`
      },
      makeup: {
        pinterestUrl: '',
        guidelines: ['Makeup guide being developed']
      },
      celebrities: []
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

  private normalizeSeasonName(season: string): string {
    // Remove extra spaces and normalize capitalization
    const normalized = season.trim().replace(/\s+/g, ' ');
    
    // Handle common variations
    const variations: { [key: string]: string } = {
      'deep winter': 'Dark Winter',
      'cool winter': 'True Winter',
      'clear winter': 'Bright Winter',
      'deep autumn': 'Dark Autumn',
      'warm autumn': 'True Autumn',
      'muted autumn': 'Soft Autumn',
      'clear spring': 'Bright Spring',
      'warm spring': 'True Spring',
      'light clear spring': 'Light Spring',
      'cool summer': 'True Summer',
      'light cool summer': 'Light Summer',
      'muted summer': 'Soft Summer'
    };
    
    const lowerNormalized = normalized.toLowerCase();
    if (variations[lowerNormalized]) {
      return variations[lowerNormalized];
    }
    
    return normalized;
  }

  private findBestSeasonMatch(input: string): string | null {
    const inputLower = input.toLowerCase();
    
    // Direct substring matching
    for (const season of this.allSeasons) {
      const seasonLower = season.toLowerCase();
      if (inputLower.includes(seasonLower) || seasonLower.includes(inputLower)) {
        return season;
      }
    }
    
    // Word-by-word matching
    const inputWords = inputLower.split(/\s+/);
    for (const season of this.allSeasons) {
      const seasonWords = season.toLowerCase().split(/\s+/);
      const matchCount = seasonWords.filter(word => inputWords.includes(word)).length;
      
      if (matchCount >= 2) { // At least 2 words match
        return season;
      }
    }
    
    // Single word matching for key terms
    const keyWordMap: { [key: string]: string[] } = {
      'winter': ['True Winter', 'Bright Winter', 'Dark Winter'],
      'summer': ['True Summer', 'Light Summer', 'Soft Summer'],
      'spring': ['True Spring', 'Bright Spring', 'Light Spring'],
      'autumn': ['True Autumn', 'Dark Autumn', 'Soft Autumn'],
      'fall': ['True Autumn', 'Dark Autumn', 'Soft Autumn'],
      'bright': ['Bright Winter', 'Bright Spring'],
      'light': ['Light Summer', 'Light Spring'],
      'dark': ['Dark Winter', 'Dark Autumn'],
      'deep': ['Dark Winter', 'Dark Autumn'],
      'soft': ['Soft Summer', 'Soft Autumn'],
      'muted': ['Soft Summer', 'Soft Autumn'],
      'true': ['True Winter', 'True Summer', 'True Spring', 'True Autumn'],
      'clear': ['Bright Winter', 'Bright Spring']
    };
    
    for (const word of inputWords) {
      if (keyWordMap[word]) {
        return keyWordMap[word][0]; // Return first match
      }
    }
    
    return null;
  }
}

export const preloadedColorAnalysisService = new PreloadedColorAnalysisService();