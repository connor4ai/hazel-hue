import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { renderSSRPage, isSSRRoute } from "./ssr";
import { logger } from "./utils/logger";
import { 
  performanceMiddleware, 
  monitorMemoryUsage, 
  setupGracefulShutdown, 
  setupErrorHandling 
} from "./utils/performance";
import { securityHeaders, rateLimit } from "./utils/security";
import { healthCheck, metrics, statusDashboard } from "./utils/monitoring";
import { memoryOptimizer } from "./utils/memory-optimizer";
import { 
  mobileOptimization, 
  criticalResourcesMiddleware, 
  seoEnhancement, 
  performanceHeaders, 
  pageSpeedOptimization 
} from "./utils/technical-seo";
import { 
  mobileDetection, 
  touchOptimization, 
  mobilePerformance, 
  responsiveImages 
} from "./utils/mobile-optimization";
import { trackAnalytics } from "./utils/analytics";
import "./emergency-memory-fix.js";

const app = express();

// Monitoring and health check endpoints (FIRST - highest priority)
app.get('/health', healthCheck);
app.get('/metrics', metrics);
app.get('/status', statusDashboard);

// Initialize monitoring and error handling
setupErrorHandling();
setupGracefulShutdown();
monitorMemoryUsage();

// Performance optimizations
app.set('trust proxy', 1);
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Add security headers and performance monitoring
app.use(securityHeaders);
app.use(performanceMiddleware);

// Technical SEO and mobile optimization
app.use(mobileOptimization);
app.use(mobileDetection);
app.use(touchOptimization);
app.use(mobilePerformance);
app.use(responsiveImages);
app.use(criticalResourcesMiddleware);
app.use(seoEnhancement);
app.use(performanceHeaders);
app.use(pageSpeedOptimization);

// Analytics tracking (after device detection)
app.use(trackAnalytics);

// Rate limiting for API routes
app.use('/api', rateLimit(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

// Compression and caching headers
app.use((req, res, next) => {
  // Enable compression for text responses
  if (req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year for static assets
  } else if (req.path.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for pages
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Serve attached assets with performance optimizations
  const attachedAssetsPath = path.resolve(process.cwd(), "attached_assets");
  app.use("/attached_assets", express.static(attachedAssetsPath, {
    maxAge: '1y', // Cache for 1 year
    immutable: true,
    setHeaders: (res, path) => {
      if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/' + path.split('.').pop());
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
  
  // Serve SEO and security files from root
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.resolve(process.cwd(), 'robots.txt'));
  });
  
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.resolve(process.cwd(), 'sitemap.xml'));
  });
  
  // Serve .well-known directory for security and validation files
  app.get('/.well-known/security.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.resolve(process.cwd(), 'public/.well-known/security.txt'));
  });
  
  // Serve other .well-known files if needed
  app.use('/.well-known', express.static(path.resolve(process.cwd(), 'public/.well-known')));
  
  const server = await registerRoutes(app);

  // SSR middleware for search engines only (exclude monitoring endpoints)
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    // Skip SSR for monitoring and utility endpoints
    if (req.path.startsWith('/health') || req.path.startsWith('/metrics') || req.path.startsWith('/status') || req.path.startsWith('/debug') || req.path.startsWith('/api')) {
      return next();
    }
    
    const userAgent = req.get('User-Agent') || '';
    const isSearchEngineBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|developers\.google\.com\/\+\/web\/snippet|gptbot|chatgpt-user|claude-web|perplexity|anthropic|openai|bard|gemini|bing.*ai|copilot|webscraper|scrapy|python-requests|curl|wget|httpclient|crawl|spider|bot\/|scraper|indexer|preview|parser|reader|archive|wayback|lighthouse|pagespeed|applebot|seobilitybot|ahrefsbot|semrushbot|mj12bot|dotbot|ccbot|commoncrawl|archive\.org/i.test(userAgent);
    
    // Log user agents that might be AI tools for debugging
    if (userAgent.toLowerCase().includes('gpt') || 
        userAgent.toLowerCase().includes('claude') || 
        userAgent.toLowerCase().includes('anthropic') ||
        userAgent.toLowerCase().includes('openai') ||
        userAgent.toLowerCase().includes('perplexity') ||
        userAgent.toLowerCase().includes('bot') ||
        userAgent.toLowerCase().includes('crawler') ||
        userAgent.toLowerCase().includes('scraper')) {
      console.log(`AI/Bot User Agent detected: ${userAgent} - SSR: ${isSearchEngineBot}`);
    }
    
    // Check for SSR override parameters (useful for AI tools and testing)
    const forceSSR = req.query.ssr === 'true' || req.query.static === 'true' || req.query.scrape === 'true';
    
    if ((isSearchEngineBot || forceSSR) && isSSRRoute(req.path)) {
      console.log(`Serving SSR for ${forceSSR ? 'forced SSR' : 'bot'}: ${userAgent.substring(0, 100)}...`);
      renderSSRPage(req, res);
    } else {
      next();
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Global error handling middleware (must be last)
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const requestId = (req as any).requestId || 'unknown';
    logger.requestError(req, error, requestId);
    
    if (res.headersSent) {
      return next(error);
    }
    
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      requestId
    });
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    const requestId = (req as any).requestId || 'unknown';
    logger.warn('404 Not Found', { path: req.path, method: req.method }, requestId);
    res.status(404).json({ message: 'Not found', requestId });
  });

  // ALWAYS serve the app on port 5000
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    logger.info(`Server started on port ${port}`, {
      environment: process.env.NODE_ENV,
      port,
      timestamp: new Date().toISOString()
    });
    log(`serving on port ${port}`);
  });
})();
