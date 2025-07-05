#!/usr/bin/env node

// Direct trigger for order 476 analysis
import('./server/routes.js').then(async (routes) => {
  console.log('🚀 Manually triggering Flask analysis for order 476...');
  
  try {
    // Import the worker function and trigger it
    const { processColorAnalysisWorker } = routes;
    if (processColorAnalysisWorker) {
      await processColorAnalysisWorker(476);
      console.log('✅ Analysis triggered successfully');
    } else {
      console.error('❌ Worker function not found');
    }
  } catch (error) {
    console.error('❌ Error triggering analysis:', error);
  }
});