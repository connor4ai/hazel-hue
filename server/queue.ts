import { Queue, Worker, Job } from 'bullmq';
import { redisForQueues } from './redis';
import { logger } from './utils/logger';
import { storage } from './storage-cached';

// Define job data types
export interface ColorAnalysisJobData {
  orderId: number;
  images: string[];
  email: string;
}

export interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}

// Queue configuration
const queueConfig = {
  connection: redisForQueues,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential' as const,
      delay: 2000,
    },
    removeOnComplete: {
      age: 24 * 3600, // Keep completed jobs for 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 7 * 24 * 3600, // Keep failed jobs for 7 days
    },
  },
};

// Create queues
export const colorAnalysisQueue = new Queue<ColorAnalysisJobData>('color-analysis', queueConfig);
export const emailQueue = new Queue<EmailJobData>('email', queueConfig);

// Queue event handlers
colorAnalysisQueue.on('error', (err) => {
  logger.error('Color analysis queue error', { error: err.message });
});

emailQueue.on('error', (err) => {
  logger.error('Email queue error', { error: err.message });
});

// Color Analysis Worker
export function createColorAnalysisWorker(
  processFunction: (job: Job<ColorAnalysisJobData>) => Promise<void>
) {
  const worker = new Worker<ColorAnalysisJobData>(
    'color-analysis',
    async (job) => {
      logger.info('Processing color analysis job', {
        jobId: job.id,
        orderId: job.data.orderId,
        attempt: job.attemptsMade + 1,
      });

      try {
        await processFunction(job);
        logger.info('Color analysis job completed', {
          jobId: job.id,
          orderId: job.data.orderId,
        });
      } catch (error: any) {
        logger.error('Color analysis job failed', {
          jobId: job.id,
          orderId: job.data.orderId,
          error: error.message,
          attempt: job.attemptsMade + 1,
        });
        throw error;
      }
    },
    {
      connection: redisForQueues,
      concurrency: 2, // Process 2 jobs at a time
      limiter: {
        max: 10, // Max 10 jobs
        duration: 60000, // Per minute
      },
    }
  );

  worker.on('completed', (job) => {
    logger.info('Worker completed job', { jobId: job.id, queue: 'color-analysis' });
  });

  worker.on('failed', (job, err) => {
    logger.error('Worker job failed', {
      jobId: job?.id,
      queue: 'color-analysis',
      error: err.message,
      attempts: job?.attemptsMade,
    });
  });

  worker.on('error', (err) => {
    logger.error('Worker error', { queue: 'color-analysis', error: err.message });
  });

  return worker;
}

// Email Worker
export function createEmailWorker(
  processFunction: (job: Job<EmailJobData>) => Promise<void>
) {
  const worker = new Worker<EmailJobData>(
    'email',
    async (job) => {
      logger.info('Processing email job', {
        jobId: job.id,
        to: job.data.to,
        subject: job.data.subject,
        attempt: job.attemptsMade + 1,
      });

      try {
        await processFunction(job);
        logger.info('Email job completed', {
          jobId: job.id,
          to: job.data.to,
        });
      } catch (error: any) {
        logger.error('Email job failed', {
          jobId: job.id,
          to: job.data.to,
          error: error.message,
          attempt: job.attemptsMade + 1,
        });
        throw error;
      }
    },
    {
      connection: redisForQueues,
      concurrency: 5, // Process 5 emails at a time
      limiter: {
        max: 50, // Max 50 emails
        duration: 60000, // Per minute
      },
    }
  );

  worker.on('completed', (job) => {
    logger.info('Worker completed job', { jobId: job.id, queue: 'email' });
  });

  worker.on('failed', (job, err) => {
    logger.error('Worker job failed', {
      jobId: job?.id,
      queue: 'email',
      error: err.message,
      attempts: job?.attemptsMade,
    });
  });

  worker.on('error', (err) => {
    logger.error('Worker error', { queue: 'email', error: err.message });
  });

  return worker;
}

// Helper functions for adding jobs
export async function addColorAnalysisJob(data: ColorAnalysisJobData) {
  const job = await colorAnalysisQueue.add('analyze', data, {
    priority: 1, // High priority
  });

  logger.info('Color analysis job added', {
    jobId: job.id,
    orderId: data.orderId,
  });

  // Update order status to queued
  await storage.updateOrderStatus(data.orderId, 'queued');

  return job;
}

export async function addEmailJob(data: EmailJobData, priority: number = 5) {
  const job = await emailQueue.add('send', data, {
    priority,
  });

  logger.info('Email job added', {
    jobId: job.id,
    to: data.to,
  });

  return job;
}

// Helper function to get queue stats
export async function getQueueStats() {
  const [
    colorAnalysisWaiting,
    colorAnalysisActive,
    colorAnalysisCompleted,
    colorAnalysisFailed,
    emailWaiting,
    emailActive,
    emailCompleted,
    emailFailed,
  ] = await Promise.all([
    colorAnalysisQueue.getWaitingCount(),
    colorAnalysisQueue.getActiveCount(),
    colorAnalysisQueue.getCompletedCount(),
    colorAnalysisQueue.getFailedCount(),
    emailQueue.getWaitingCount(),
    emailQueue.getActiveCount(),
    emailQueue.getCompletedCount(),
    emailQueue.getFailedCount(),
  ]);

  return {
    colorAnalysis: {
      waiting: colorAnalysisWaiting,
      active: colorAnalysisActive,
      completed: colorAnalysisCompleted,
      failed: colorAnalysisFailed,
    },
    email: {
      waiting: emailWaiting,
      active: emailActive,
      completed: emailCompleted,
      failed: emailFailed,
    },
  };
}

// Graceful shutdown
export async function closeQueues() {
  logger.info('Closing job queues');
  await Promise.all([
    colorAnalysisQueue.close(),
    emailQueue.close(),
  ]);
  logger.info('Job queues closed');
}

process.on('SIGTERM', closeQueues);
process.on('SIGINT', closeQueues);
