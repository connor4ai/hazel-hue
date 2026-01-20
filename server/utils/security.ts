import { Request, Response, NextFunction } from 'express';
import { cache } from '../redis';

// Security headers middleware
export function securityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Check if this is an AI bot or crawler
  const userAgent = req.get('User-Agent') || '';
  const isAIBot = /gptbot|chatgpt|claude|anthropic|openai|perplexity|bard|gemini|copilot|ai|bot|crawler|scraper/i.test(userAgent);
  
  // Allow frame embedding for AI tools while maintaining security
  if (isAIBot) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-AI-Crawlable', 'true');
    res.setHeader('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  } else {
    res.setHeader('X-Frame-Options', 'DENY');
  }
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Strict transport security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Content Security Policy - improved security by minimizing unsafe directives
  // Note: unsafe-inline for styles kept for compatibility with Tailwind/inline styles
  // Consider using nonces in production for script-src
  const csp = [
    "default-src 'self'",
    // Allow scripts from trusted sources only - removed unsafe-eval
    // unsafe-inline kept for inline event handlers, consider using nonces
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://analytics.tiktok.com https://www.google-analytics.com https://js.stripe.com https://m.stripe.network",
    // Styles: unsafe-inline needed for Tailwind CSS and inline styles
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' data: https:",
    "connect-src 'self' https://api.stripe.com https://m.stripe.network https://www.google-analytics.com https://analytics.tiktok.com https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://js.stripe.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  next();
}

// Redis-based distributed rate limiting for API endpoints
// This works across multiple server instances and survives server restarts
export function rateLimit(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const key = `ratelimit:${ip}`;
    const windowSeconds = Math.floor(windowMs / 1000);

    try {
      // Increment request count
      const count = await cache.incr(key, windowSeconds);

      // Check if limit exceeded
      if (count > maxRequests) {
        const ttl = await cache.ttl(key);
        res.status(429).json({
          error: 'Too many requests',
          retryAfter: ttl > 0 ? ttl : windowSeconds
        });
        return;
      }

      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - count).toString());
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + windowSeconds * 1000).toISOString());

      next();
    } catch (error) {
      // If Redis fails, log error but don't block requests
      console.error('Rate limiting error:', error);
      next();
    }
  };
}

// Input validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function sanitizeString(input: string): string {
  return input
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .trim()
    .substring(0, 1000); // Limit length
}

export function validateFileUpload(file: Express.Multer.File): { valid: boolean; error?: string } {
  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File too large (max 10MB)' };
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.heic', '.heif'];
  
  const hasValidType = allowedTypes.includes(file.mimetype);
  const hasValidExtension = allowedExtensions.some(ext => 
    file.originalname.toLowerCase().endsWith(ext)
  );
  
  if (!hasValidType && !hasValidExtension) {
    return { valid: false, error: 'Invalid file type (JPEG, PNG, or HEIC only)' };
  }
  
  return { valid: true };
}