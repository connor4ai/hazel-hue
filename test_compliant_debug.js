const { CompliantLabAnalysisService } = require('./dist/server/services/compliantLabAnalysis.js');

async function testCompliantAnalysis() {
  console.log('🧪 Testing compliant analysis with real order data...');
  
  const imagePaths = [
    'uploads/images/465-1751740818043-1.jpg',
    'uploads/images/465-1751740818044-2.jpg', 
    'uploads/images/465-1751740818044-3.jpg'
  ];
  
  try {
    const service = new CompliantLabAnalysisService();
    console.log('🔬 Created service, starting analysis...');
    
    const result = await service.analyzePhotosCompliant(imagePaths, 'TEST-465');
    console.log('✅ Success! Result:', result);
    
  } catch (error) {
    console.error('❌ DETAILED ERROR:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('Type:', error.constructor.name);
  }
}

testCompliantAnalysis().catch(console.error);