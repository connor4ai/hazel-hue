import { Request, Response, NextFunction } from 'express';

// Comprehensive mobile detection and optimization
export const mobileDetection = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get('User-Agent') || '';
  
  // Enhanced mobile device detection
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /IEMobile/i,
    /Opera Mini/i,
    /Mobile Safari/i,
    /Edge Mobile/i,
    /Chrome Mobile/i,
    /Samsung/i,
    /LG\-/i,
    /SAMSUNG/i,
    /GT\-/i,
    /SM\-/i,
    /SonyEricsson/i,
    /Nokia/i,
    /HTC/i,
    /Motorola/i,
    /Windows Phone/i
  ];
  
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  const isTablet = /iPad|Android(?!.*Mobile)|Kindle|Silk|PlayBook/i.test(userAgent);
  
  // Add device type to request for downstream use
  (req as any).deviceType = {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet
  };
  
  // Mobile-specific response headers
  if (isMobile) {
    res.setHeader('X-Mobile-Optimized', 'true');
    res.setHeader('X-Device-Type', 'mobile');
    
    // Disable zoom for better mobile experience on form pages
    if (req.path.includes('upload') || req.path.includes('checkout')) {
      res.setHeader('X-Viewport-Disable-Zoom', 'true');
    }
  } else if (isTablet) {
    res.setHeader('X-Device-Type', 'tablet');
  } else {
    res.setHeader('X-Device-Type', 'desktop');
  }
  
  next();
};

// Touch-friendly interface optimization
export const touchOptimization = (req: Request, res: Response, next: NextFunction) => {
  const deviceType = (req as any).deviceType;
  
  if (deviceType?.isMobile || deviceType?.isTablet) {
    // Add touch-specific headers
    res.setHeader('X-Touch-Optimized', 'true');
    res.setHeader('X-Min-Touch-Target', '44px');
    
    // Disable text selection for better touch experience on interactive elements
    res.setHeader('X-Touch-Action', 'manipulation');
  }
  
  next();
};

// Mobile performance optimization
export const mobilePerformance = (req: Request, res: Response, next: NextFunction) => {
  const deviceType = (req as any).deviceType;
  
  if (deviceType?.isMobile) {
    // Aggressive caching for mobile to reduce data usage
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Hint at mobile-specific optimizations
    res.setHeader('X-Mobile-Performance', 'optimized');
    res.setHeader('Save-Data', 'on'); // Respect data saver mode
  }
  
  next();
};

// Responsive image handling
export const responsiveImages = (req: Request, res: Response, next: NextFunction) => {
  const deviceType = (req as any).deviceType;
  
  // Add responsive image hints
  if (deviceType?.isMobile) {
    res.setHeader('X-Image-Optimization', 'mobile');
    res.setHeader('X-Recommended-Width', '375'); // Standard mobile width
  } else if (deviceType?.isTablet) {
    res.setHeader('X-Image-Optimization', 'tablet');
    res.setHeader('X-Recommended-Width', '768');
  } else {
    res.setHeader('X-Image-Optimization', 'desktop');
    res.setHeader('X-Recommended-Width', '1200');
  }
  
  next();
};