import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

// Performance monitoring utilities
export interface PerformanceMetrics {
  requestDuration: number;
  databaseQueries: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage?: NodeJS.CpuUsage;
}

export interface DatabaseQuery {
  query: string;
  duration: number;
  timestamp: string;
}

class PerformanceMonitor {
  private activeRequests = new Map<string, {
    startTime: number;
    startCpuUsage: NodeJS.CpuUsage;
    queries: DatabaseQuery[];
  }>();

  startRequest(requestId: string): void {
    this.activeRequests.set(requestId, {
      startTime: Date.now(),
      startCpuUsage: process.cpuUsage(),
      queries: []
    });
  }

  endRequest(requestId: string): PerformanceMetrics | null {
    const request = this.activeRequests.get(requestId);
    if (!request) return null;

    const endTime = Date.now();
    const endCpuUsage = process.cpuUsage(request.startCpuUsage);
    
    const metrics: PerformanceMetrics = {
      requestDuration: endTime - request.startTime,
      databaseQueries: request.queries.length,
      memoryUsage: process.memoryUsage(),
      cpuUsage: endCpuUsage
    };

    this.activeRequests.delete(requestId);
    return metrics;
  }

  logDatabaseQuery(requestId: string, query: string, duration: number): void {
    const request = this.activeRequests.get(requestId);
    if (request) {
      request.queries.push({
        query: query.substring(0, 100), // Truncate long queries
        duration,
        timestamp: new Date().toISOString()
      });
    }
  }

  getSystemMetrics(): {
    memory: NodeJS.MemoryUsage;
    uptime: number;
    activeRequests: number;
  } {
    return {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      activeRequests: this.activeRequests.size
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Middleware for request performance tracking
export function performanceMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = req.headers['x-request-id'] as string || 
                   Math.random().toString(36).substring(2, 15);
  
  // Add request ID to request object for use in other middlewares
  (req as any).requestId = requestId;
  
  performanceMonitor.startRequest(requestId);
  logger.requestStart(req, requestId);

  // Override res.end to capture completion
  const originalEnd = res.end;
  res.end = function(...args: any[]) {
    const metrics = performanceMonitor.endRequest(requestId);
    
    if (metrics) {
      logger.requestEnd(req, res, requestId, metrics.requestDuration);
      
      // Log performance warnings
      if (metrics.requestDuration > 5000) {
        logger.warn('Slow request detected', {
          duration: metrics.requestDuration,
          path: req.path,
          queries: metrics.databaseQueries
        }, requestId);
      }
      
      if (metrics.databaseQueries > 10) {
        logger.warn('High database query count', {
          queries: metrics.databaseQueries,
          path: req.path,
          duration: metrics.requestDuration
        }, requestId);
      }
    }
    
    return originalEnd.apply(this, args as any);
  };

  next();
}

// Database query timing utility
export function timeQuery<T>(
  requestId: string,
  queryDescription: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  
  return queryFn()
    .then(result => {
      const duration = Date.now() - startTime;
      performanceMonitor.logDatabaseQuery(requestId, queryDescription, duration);
      
      if (duration > 1000) {
        logger.warn('Slow database query', {
          query: queryDescription,
          duration
        }, requestId);
      }
      
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      logger.error('Database query failed', error, {
        query: queryDescription,
        duration
      }, requestId);
      throw error;
    });
}

// Memory leak detection
export function monitorMemoryUsage(): void {
  setInterval(() => {
    const usage = process.memoryUsage();
    const heapUsedMB = usage.heapUsed / 1024 / 1024;
    const rssUsedMB = usage.rss / 1024 / 1024;
    
    // Log warning if memory usage is high
    if (heapUsedMB > 512) { // More than 512MB heap
      logger.warn('High memory usage detected', {
        heapUsed: `${heapUsedMB.toFixed(2)}MB`,
        rss: `${rssUsedMB.toFixed(2)}MB`,
        external: `${(usage.external / 1024 / 1024).toFixed(2)}MB`
      });
    }
  }, 60000); // Check every minute
}

// Graceful shutdown handling
export function setupGracefulShutdown(): void {
  const gracefulShutdown = (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully`);
    
    // Log final system metrics
    const metrics = performanceMonitor.getSystemMetrics();
    logger.info('Final system metrics', {
      uptime: `${metrics.uptime.toFixed(2)}s`,
      memory: `${(metrics.memory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
      activeRequests: metrics.activeRequests
    });
    
    process.exit(0);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

// Error boundary for unhandled errors
export function setupErrorHandling(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught exception', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error('Unhandled promise rejection', new Error(reason), {
      promise: promise.toString()
    });
  });
}