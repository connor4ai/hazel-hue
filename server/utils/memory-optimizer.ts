import { logger } from './logger';

class MemoryOptimizer {
  private cleanupInterval: NodeJS.Timeout | null = null;
  private lastGcTime = Date.now();
  private memoryThreshold = 0.85; // 85% memory usage threshold

  constructor() {
    this.startMemoryMonitoring();
  }

  private startMemoryMonitoring() {
    // Run memory cleanup every 30 seconds
    this.cleanupInterval = setInterval(() => {
      this.performMemoryCleanup();
    }, 30000);

    // Monitor for high memory usage
    setInterval(() => {
      this.checkMemoryUsage();
    }, 10000);
  }

  private performMemoryCleanup() {
    try {
      // Force garbage collection if available
      if (global.gc) {
        const before = process.memoryUsage();
        global.gc();
        const after = process.memoryUsage();
        
        const freedMB = Math.round((before.heapUsed - after.heapUsed) / 1024 / 1024);
        if (freedMB > 0) {
          logger.info(`Memory cleanup: freed ${freedMB}MB`);
        }
      }

      // Clear require cache for non-essential modules
      this.clearModuleCache();
      
    } catch (error) {
      logger.error('Memory cleanup error:', error as Error);
    }
  }

  private clearModuleCache() {
    const moduleKeys = Object.keys(require.cache);
    const clearableModules = moduleKeys.filter(key => 
      // Only clear cache for specific development modules
      key.includes('node_modules/@types') ||
      key.includes('node_modules/typescript') ||
      key.includes('/.vite/') ||
      key.includes('/temp/')
    );

    clearableModules.forEach(key => {
      try {
        delete require.cache[key];
      } catch (error) {
        // Ignore errors when clearing cache
      }
    });

    if (clearableModules.length > 0) {
      logger.info(`Cleared ${clearableModules.length} cached modules`);
    }
  }

  private checkMemoryUsage() {
    const memInfo = process.memoryUsage();
    const totalMemory = require('os').totalmem();
    const usedPercentage = memInfo.rss / totalMemory;

    if (usedPercentage > this.memoryThreshold) {
      logger.warn(`High memory usage detected: ${Math.round(usedPercentage * 100)}%`);
      
      // Force immediate cleanup
      this.performMemoryCleanup();
      
      // Log detailed memory info
      logger.warn('Memory details:', {
        rss: Math.round(memInfo.rss / 1024 / 1024) + 'MB',
        heapUsed: Math.round(memInfo.heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(memInfo.heapTotal / 1024 / 1024) + 'MB',
        external: Math.round(memInfo.external / 1024 / 1024) + 'MB'
      });
    }
  }

  public forceCleanup() {
    this.performMemoryCleanup();
  }

  public getMemoryStats() {
    const memInfo = process.memoryUsage();
    const totalMemory = require('os').totalmem();
    
    return {
      rss: Math.round(memInfo.rss / 1024 / 1024),
      heapUsed: Math.round(memInfo.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memInfo.heapTotal / 1024 / 1024),
      external: Math.round(memInfo.external / 1024 / 1024),
      totalSystem: Math.round(totalMemory / 1024 / 1024),
      usagePercentage: Math.round((memInfo.rss / totalMemory) * 100)
    };
  }

  public shutdown() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

export const memoryOptimizer = new MemoryOptimizer();

// Cleanup on process exit
process.on('exit', () => {
  memoryOptimizer.shutdown();
});

process.on('SIGTERM', () => {
  memoryOptimizer.shutdown();
  process.exit(0);
});

process.on('SIGINT', () => {
  memoryOptimizer.shutdown();
  process.exit(0);
});