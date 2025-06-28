import { seasonalContentData, type SeasonalContent } from '../data/seasonalContent';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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
    
    // Check Sharp capabilities
    this.checkSharpCapabilities();
  }

  private checkSharpCapabilities() {
    try {
      console.log('📋 Sharp version:', sharp.versions);
      console.log('📋 Sharp formats:', sharp.format);
    } catch (error) {
      console.error('❌ Error checking Sharp capabilities:', error);
    }
  }

  /**
   * Convert HEIC files to JPEG format for OpenAI compatibility
   * Returns the converted file path or original path if no conversion needed
   */
  private async convertHeicToJpeg(imagePath: string): Promise<string> {
    const fileExtension = path.extname(imagePath).toLowerCase();
    
    console.log(`🔄 Checking file for conversion: ${path.basename(imagePath)} (ext: ${fileExtension})`);
    
    // Only convert HEIC files
    if (fileExtension !== '.heic' && fileExtension !== '.heif') {
      console.log(`⏭️ Skipping conversion - not a HEIC file`);
      return imagePath;
    }
    
    try {
      const convertedPath = imagePath.replace(/\.(heic|heif)$/i, '_converted.jpg');
      console.log(`🔄 Starting HEIC conversion: ${path.basename(imagePath)} → ${path.basename(convertedPath)}`);
      
      // Check if original file exists
      if (!fs.existsSync(imagePath)) {
        throw new Error(`Source file does not exist: ${imagePath}`);
      }
      
      await sharp(imagePath)
        .jpeg({ quality: 95 }) // High quality conversion
        .toFile(convertedPath);
      
      // Verify converted file was created
      if (!fs.existsSync(convertedPath)) {
        throw new Error(`Converted file was not created: ${convertedPath}`);
      }
      
      const originalSize = fs.statSync(imagePath).size;
      const convertedSize = fs.statSync(convertedPath).size;
      console.log(`✅ HEIC conversion successful: ${path.basename(imagePath)} (${Math.round(originalSize/1024)}KB) → ${path.basename(convertedPath)} (${Math.round(convertedSize/1024)}KB)`);
      
      return convertedPath;
    } catch (error) {
      console.error(`❌ Failed to convert HEIC file ${imagePath}:`, error);
      console.error(`❌ Sharp error details:`, error);
      // Return original path as fallback
      return imagePath;
    }
  }

  /**
   * Convert all HEIC files in the array to JPEG format
   */
  private async convertAllHeicFiles(imagePaths: string[]): Promise<string[]> {
    const convertedPaths: string[] = [];
    
    for (const imagePath of imagePaths) {
      const convertedPath = await this.convertHeicToJpeg(imagePath);
      convertedPaths.push(convertedPath);
    }
    
    return convertedPaths;
  }

  /**
   * Clean up converted JPEG files to save disk space
   */
  private async cleanupConvertedFiles(convertedPaths: string[]) {
    for (const convertedPath of convertedPaths) {
      // Only delete files that were converted (end with _converted.jpg)
      if (convertedPath.includes('_converted.jpg')) {
        try {
          if (fs.existsSync(convertedPath)) {
            fs.unlinkSync(convertedPath);
            console.log(`🗑️ Cleaned up converted file: ${path.basename(convertedPath)}`);
          }
        } catch (error) {
          console.error(`Failed to cleanup converted file ${convertedPath}:`, error);
        }
      }
    }
  }

  async analyzePhotos(imagePaths: string[]): Promise<ColorAnalysisResult> {
    try {
      // Check if this is a demo order (with demo images)
      const isDemoOrder = imagePaths.some(path => path.includes('demo'));
      
      // Convert HEIC files to JPEG format for OpenAI compatibility
      console.log('📸 Converting HEIC files to JPEG for OpenAI analysis...');
      const convertedImagePaths = await this.convertAllHeicFiles(imagePaths);
      console.log('📸 Image conversion complete, proceeding with analysis...');
      
      if (isDemoOrder) {
        // For demo orders, randomly select from available seasons for testing
        const availableSeasons = ['True Winter', 'Bright Winter', 'Dark Winter', 'True Summer', 'Light Summer', 'Soft Summer', 'True Spring', 'Bright Spring', 'Light Spring', 'True Autumn', 'Dark Autumn', 'Soft Autumn'];
        const randomIndex = Math.floor(Math.random() * availableSeasons.length);
        const selectedSeason = availableSeasons[randomIndex];
        console.log(`Demo order - randomly selected ${selectedSeason} for demonstration`);
        return this.getPreloadedResult(selectedSeason);
      }
      
      // Use OpenAI to detect the actual season from real uploaded photos (using converted paths)
      const detectedSeason = await this.detectSeason(convertedImagePaths);
      console.log(`AI detected season: ${detectedSeason}`);
      
      // Clean up converted files after analysis
      await this.cleanupConvertedFiles(convertedImagePaths);
      
      // Check if we have content for the detected season
      const availableSeasons = ['True Winter', 'Bright Winter', 'Dark Winter', 'True Summer', 'Light Summer', 'Soft Summer', 'True Spring', 'Bright Spring', 'Light Spring', 'True Autumn', 'Dark Autumn', 'Soft Autumn'];
      if (!availableSeasons.includes(detectedSeason)) {
        console.log(`Season "${detectedSeason}" detected but not yet implemented. Returning work-in-progress result.`);
        return this.getWorkInProgressResult(detectedSeason);
      }
      
      return this.getPreloadedResult(detectedSeason);
    } catch (error) {
      console.error('Error in color analysis:', error);
      return this.getPreloadedResult('True Winter');
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
    You are a professional color analyst specializing in 12-season color analysis. Analyze ALL the photos provided to determine their seasonal color type. IMPORTANT: Look at every photo equally and consider the consistent features across all images to make your determination.
    
    Examine these key factors across ALL photos:
    1. SKIN UNDERTONE: Cool (blue/pink) vs Warm (yellow/golden) vs Neutral - look for consistent undertones across all photos
    2. HAIR COLOR: Natural color, depth, and warmth/coolness - consider the hair color shown in all images
    3. EYE COLOR: Hue, clarity, and intensity - examine eye characteristics visible in the photos
    4. OVERALL CONTRAST: High contrast (dark hair + light skin) vs Low contrast (similar tones) - assess contrast level consistently shown
    5. CHROMA NEEDS: Can they handle bright, saturated colors or do they need muted tones - determine from overall coloring pattern
    
    12 Seasons to choose from:
    - WINTER FAMILY (cool undertones, can handle high contrast):
      * True Winter: High contrast, cool undertones, handles pure colors
      * Bright Winter: Very high contrast, cool undertones, needs electric/bright colors  
      * Dark Winter: High contrast but can handle some warmth, deep colors
    
    - SUMMER FAMILY (cool undertones, soft contrast):
      * True Summer: Cool, medium contrast, soft colors
      * Light Summer: Cool, light, delicate colors
      * Soft Summer: Cool-neutral, muted, gentle colors
    
    - AUTUMN FAMILY (warm undertones):
      * True Autumn: Warm, rich, earthy colors
      * Soft Autumn: Warm-neutral, muted, gentle warmth
      * Dark Autumn: Warm-neutral, deep, rich colors
    
    - SPRING FAMILY (warm undertones, bright):
      * True Spring: Warm, bright, clear colors
      * Bright Spring: Very warm, electric bright colors
      * Light Spring: Warm, light, fresh colors
    
    Based on your analysis, respond with ONLY the exact season name (e.g., "True Winter" or "Bright Winter").
    
    IMPORTANT: You MUST choose one of the 12 seasons above. Do not respond with any other text, explanations, or apologies. 
    If the photos are unclear, choose the most likely season based on any visible features.
    Your response must be exactly one of these 12 season names:
    True Winter, Bright Winter, Dark Winter, True Summer, Light Summer, Soft Summer, True Spring, Bright Spring, Light Spring, True Autumn, Soft Autumn, Dark Autumn
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
      temperature: 0.1,
    });

    const detectedSeason = response.choices[0].message.content?.trim() || 'True Winter';
    
    console.log(`🤖 OpenAI Response: "${detectedSeason}"`);
    
    // Clean up the response to extract just the season name
    const cleanSeason = detectedSeason.split('\n')[0].trim();
    
    // Validate the detected season against all 12 seasons
    if (!this.allSeasons.includes(cleanSeason)) {
      console.warn(`⚠️ Invalid season detected: ${cleanSeason}, defaulting to True Winter`);
      return 'True Winter';
    }
    
    console.log(`✅ FINAL RESULT: ${cleanSeason} (analyzed from ${validPaths.length} photos)`);
    return cleanSeason;
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
}

export const preloadedColorAnalysisService = new PreloadedColorAnalysisService();