#!/usr/bin/env node

// Test the logging system with a real analysis
const { CompliantLabAnalysisService } = require('./server/services/compliantLabAnalysis.ts');

async function testLoggingSystem() {
  console.log('🧪 Testing analysis logging system...');
  
  try {
    const service = new CompliantLabAnalysisService();
    
    // Test the logging function directly
    console.log('📝 Testing log function...');
    service.logAnalysisDetails('TEST-123', 'SYSTEM_TEST', {
      message: 'Testing logging system',
      timestamp: new Date().toISOString(),
      testData: { success: true }
    });
    
    console.log('✅ Logging test completed. Check analysis-logs.txt for the log entry.');
    
  } catch (error) {
    console.error('❌ Logging test failed:', error);
  }
}

testLoggingSystem();