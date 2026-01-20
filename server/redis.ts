import Redis from 'ioredis';
import { logger } from './utils/logger';

// Redis configuration with connection pooling and retry strategy
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableReadyCheck: true,
  enableOfflineQueue: true,
  lazyConnect: false,
  // Connection pooling
  db: 0,
};

// Main Redis client for caching
export const redis = new Redis(redisConfig);

// Separate Redis client for BullMQ (required for job queues)
export const redisForQueues = new Redis(redisConfig);

// Redis event handlers
redis.on('connect', () => {
  logger.info('Redis connected successfully', { host: redisConfig.host });
});

redis.on('ready', () => {
  logger.info('Redis is ready to accept commands');
});

redis.on('error', (err) => {
  logger.error('Redis connection error', { error: err.message });
});

redis.on('close', () => {
  logger.warn('Redis connection closed');
});

redis.on('reconnecting', () => {
  logger.info('Redis reconnecting...');
});

redisForQueues.on('error', (err) => {
  logger.error('Redis queue connection error', { error: err.message });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing Redis connections');
  await redis.quit();
  await redisForQueues.quit();
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing Redis connections');
  await redis.quit();
  await redisForQueues.quit();
});

// Cache helper functions with automatic JSON serialization
export const cache = {
  // Get cached value
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error: any) {
      logger.error('Redis get error', { key, error: error.message });
      return null;
    }
  },

  // Set cached value with TTL (in seconds)
  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await redis.setex(key, ttl, serialized);
      } else {
        await redis.set(key, serialized);
      }
      return true;
    } catch (error: any) {
      logger.error('Redis set error', { key, error: error.message });
      return false;
    }
  },

  // Delete cached value
  async del(key: string): Promise<boolean> {
    try {
      await redis.del(key);
      return true;
    } catch (error: any) {
      logger.error('Redis del error', { key, error: error.message });
      return false;
    }
  },

  // Delete multiple keys by pattern
  async delPattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        return await redis.del(...keys);
      }
      return 0;
    } catch (error: any) {
      logger.error('Redis delPattern error', { pattern, error: error.message });
      return 0;
    }
  },

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error: any) {
      logger.error('Redis exists error', { key, error: error.message });
      return false;
    }
  },

  // Increment counter (useful for rate limiting)
  async incr(key: string, ttl?: number): Promise<number> {
    try {
      const value = await redis.incr(key);
      if (ttl && value === 1) {
        await redis.expire(key, ttl);
      }
      return value;
    } catch (error: any) {
      logger.error('Redis incr error', { key, error: error.message });
      return 0;
    }
  },

  // Get TTL of a key
  async ttl(key: string): Promise<number> {
    try {
      return await redis.ttl(key);
    } catch (error: any) {
      logger.error('Redis ttl error', { key, error: error.message });
      return -1;
    }
  },
};

export default redis;
