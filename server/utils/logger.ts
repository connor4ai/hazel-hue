import { Request, Response } from 'express';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export const LOG_LEVELS = {
  ERROR: 'error' as const,
  WARN: 'warn' as const,
  INFO: 'info' as const,
  DEBUG: 'debug' as const
};

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
  error?: Error;
  requestId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, metadata, error, requestId } = entry;
    
    let logMessage = `[${timestamp}] ${level.toUpperCase()}`;
    if (requestId) logMessage += ` [${requestId}]`;
    logMessage += `: ${message}`;
    
    if (metadata && Object.keys(metadata).length > 0) {
      logMessage += ` | Metadata: ${JSON.stringify(metadata)}`;
    }
    
    if (error) {
      logMessage += ` | Error: ${error.message}`;
      if (this.isDevelopment && error.stack) {
        logMessage += `\nStack: ${error.stack}`;
      }
    }
    
    return logMessage;
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>, error?: Error, requestId?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      error,
      requestId
    };

    const formattedMessage = this.formatLog(entry);
    
    // Console output
    switch (level) {
      case 'error':
        console.error(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'debug':
        if (this.isDevelopment) console.debug(formattedMessage);
        break;
    }

    // In production, you could send to external logging service here
    // Example: await this.sendToExternalService(entry);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>, requestId?: string) {
    this.log('error', message, metadata, error, requestId);
  }

  warn(message: string, metadata?: Record<string, any>, requestId?: string) {
    this.log('warn', message, metadata, undefined, requestId);
  }

  info(message: string, metadata?: Record<string, any>, requestId?: string) {
    this.log('info', message, metadata, undefined, requestId);
  }

  debug(message: string, metadata?: Record<string, any>, requestId?: string) {
    this.log('debug', message, metadata, undefined, requestId);
  }

  // Request-specific logging helpers
  requestStart(req: Request, requestId: string) {
    this.info(`Request started: ${req.method} ${req.path}`, {
      method: req.method,
      path: req.path,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    }, requestId);
  }

  requestEnd(req: Request, res: Response, requestId: string, duration: number) {
    this.info(`Request completed: ${req.method} ${req.path}`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    }, requestId);
  }

  requestError(req: Request, error: Error, requestId: string) {
    this.error(`Request failed: ${req.method} ${req.path}`, error, {
      method: req.method,
      path: req.path,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    }, requestId);
  }

  // Business logic logging
  orderCreated(orderId: number, email: string, amount: number, requestId?: string) {
    this.info('Order created', {
      orderId,
      email,
      amount,
      event: 'order_created'
    }, requestId);
  }

  orderCompleted(orderId: number, season: string, requestId?: string) {
    this.info('Order completed', {
      orderId,
      season,
      event: 'order_completed'
    }, requestId);
  }

  paymentProcessed(orderId: number, amount: number, promoCode?: string, requestId?: string) {
    this.info('Payment processed', {
      orderId,
      amount,
      promoCode,
      event: 'payment_processed'
    }, requestId);
  }

  analysisCompleted(orderId: number, season: string, duration: number, requestId?: string) {
    this.info('AI analysis completed', {
      orderId,
      season,
      duration: `${duration}ms`,
      event: 'analysis_completed'
    }, requestId);
  }

  emailSent(orderId: number, email: string, success: boolean, requestId?: string) {
    if (success) {
      this.info('Results email sent', { orderId, email, event: 'email_sent' }, requestId);
    } else {
      this.warn('Results email failed', { orderId, email, event: 'email_failed' }, requestId);
    }
  }
}

export const logger = new Logger();