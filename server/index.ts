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

  // SSR middleware for search engines only
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.get('User-Agent') || '';
    const isSearchEngineBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|developers\.google\.com\/\+\/web\/snippet/i.test(userAgent);
    
    if (isSearchEngineBot && isSSRRoute(req.path)) {
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
