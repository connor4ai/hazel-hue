// Test script to manually trigger analysis and see debugging output
import { PreloadedColorAnalysisService } from './server/services/preloadedColorAnalysis.ts';

async function testAnalysis() {
  console.log('🧪 MANUAL TEST: Starting fresh analysis');
  
  const imagePaths = [
    'uploads/images/436-1751727575031-1.jpg',
    'uploads/images/436-1751727575031-2.jpg', 
    'uploads/images/436-1751727575031-3.jpg'
  ];
  
  console.log('🧪 Testing with image paths:', imagePaths);
  
  try {
    const analysisService = new PreloadedColorAnalysisService();
    const result = await analysisService.analyzePhotos(imagePaths);
    console.log('🧪 MANUAL TEST RESULT:', result.season);
  } catch (error) {
    console.error('🧪 MANUAL TEST ERROR:', error);
  }
}

testAnalysis();