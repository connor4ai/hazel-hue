import fs from 'fs';
import path from 'path';

// Import the actual GPT-o3 analysis service
const { LabColorAnalysisService } = await import('./server/services/labColorAnalysis.ts');
const { getSeasonalContentData } = await import('./server/services/preloadedColorAnalysis.ts');

async function testEmmaStoneAnalysis() {
  try {
    console.log('🎬 Testing Emma Stone photos with GPT-o3 analysis...');
    
    // Convert the attached images to the format expected by the analysis service
    const imagePaths = [
      'attached_assets/Screenshot 2025-07-04 at 7.10.27 PM_1751732656484.png',
      'attached_assets/Screenshot 2025-07-04 at 7.10.48 PM_1751732656485.png', 
      'attached_assets/Screenshot 2025-07-04 at 7.11.00 PM_1751732656485.png'
    ];
    
    // Check if files exist
    for (const imagePath of imagePaths) {
      if (!fs.existsSync(imagePath)) {
        console.error(`❌ Image not found: ${imagePath}`);
        return;
      }
      console.log(`✅ Found image: ${imagePath}`);
    }
    
    // Create the analysis service and run GPT-o3 analysis
    console.log('🧠 Starting GPT-o3 LAB extraction...');
    const startTime = Date.now();
    
    const labService = new LabColorAnalysisService();
    
    // Step 1: Extract LAB data
    const labDataArray = await labService.extractLabData(imagePaths);
    console.log('📊 LAB data extracted:', labDataArray);
    
    // Step 2: Analyze with GPT-o3
    const season = await labService.analyzeWithLabData(labDataArray);
    console.log('🎯 Season determined:', season);
    
    // Step 3: Get seasonal content
    const seasonalContent = await getSeasonalContentData(season);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    const result = {
      season,
      seasonalContent,
      duration,
      labData: labDataArray
    };
    
    console.log(`⏱️ Analysis completed in ${duration} seconds`);
    console.log('🎯 GPT-o3 Analysis Result:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    throw error;
  }
}

// Run the test
testEmmaStoneAnalysis().catch(console.error);