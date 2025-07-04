// Emergency memory optimization for production launch
import os from 'os';

// Force garbage collection every 10 seconds
setInterval(() => {
  if (global.gc) {
    try {
      global.gc();
      console.log('Emergency GC completed');
    } catch (error) {
      console.error('GC failed:', error.message);
    }
  }
}, 10000);

// Monitor and kill TypeScript processes consuming too much memory
setInterval(() => {
  const memUsage = process.memoryUsage();
  const totalMem = os.totalmem();
  const usedPercent = (memUsage.rss / totalMem) * 100;
  
  if (usedPercent > 90) {
    console.log(`CRITICAL MEMORY: ${usedPercent.toFixed(1)}% - Triggering emergency cleanup`);
    
    // Clear require cache for dev modules
    Object.keys(require.cache).forEach(key => {
      if (key.includes('typescript') || key.includes('@types') || key.includes('.vite')) {
        try {
          delete require.cache[key];
        } catch (e) {}
      }
    });
    
    // Force immediate GC
    if (global.gc) {
      global.gc();
    }
  }
}, 5000);

console.log('Emergency memory optimization loaded');