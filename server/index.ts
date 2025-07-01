import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { renderSSRPage, isSSRRoute } from "./ssr";

const app = express();

// Performance optimizations
app.set('trust proxy', 1);
app.use(express.json({ limit: '10mb' })); // Reduced from 50mb for better performance
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

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
  
  // Serve SEO files from root
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.resolve(process.cwd(), 'robots.txt'));
  });
  
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.resolve(process.cwd(), 'sitemap.xml'));
  });
  
  const server = await registerRoutes(app);

  // SSR middleware for critical pages (before Vite setup) - DISABLED FOR DEBUGGING
  // Only serve SSR to actual bots, not regular users
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    const url = req.path;
    
    // Check if this is a request for a critical SSR page
    if (isSSRRoute(url)) {
      // Check if request is from a search engine crawler or social media bot
      const userAgent = req.get('User-Agent') || '';
      const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram/i.test(userAgent);
      
      // Also serve SSR for specific query parameters that indicate SEO needs
      const forceSSR = req.query.ssr === 'true' || req.query._escaped_fragment_ !== undefined;
      
      // TEMPORARILY DISABLED - Only serve to very specific bots
      if (forceSSR && isBot) {
        const ssrHtml = renderSSRPage(url);
        if (ssrHtml) {
          res.setHeader('Content-Type', 'text/html');
          res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
          res.send(ssrHtml);
          return;
        }
      }
    }
    
    next();
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

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
