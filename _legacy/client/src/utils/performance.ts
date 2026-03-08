// Performance utilities for production optimization

// Preload critical resources
export const preloadCriticalResources = () => {
  try {
    // Preload critical fonts with error handling
    const playfairFont = new FontFace('Playfair Display', 'url(https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap)');
    playfairFont.load().then(() => {
      document.fonts.add(playfairFont);
    }).catch(error => {
      console.warn('Font loading failed:', error);
    });

    // Preload critical images
    const criticalImages = [
      '/attached_assets/12-tone-chart-value-temperature_1750623961315.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.onerror = () => console.warn('Image preload failed:', src);
      document.head.appendChild(link);
    });
  } catch (error) {
    console.warn('Resource preloading failed:', error);
  }
};

// Optimize image loading with intersection observer
export const createImageObserver = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  return imageObserver;
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle utility for performance  
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return (...args: Parameters<T>) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Monitor performance metrics
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          const ttfb = perfData.responseStart - perfData.requestStart;
          
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Performance Metrics:', {
              'Load Time': `${loadTime}ms`,
              'Time to First Byte': `${ttfb}ms`,
              'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`
            });
          }
        }
      }, 0);
    });
  }
};

// Critical CSS for above-the-fold content
export const injectCriticalCSS = () => {
  const criticalCSS = `
    .coral-gradient { background: linear-gradient(135deg, #E85A4F 0%, #C54A3E 100%); }
    .sage-gradient { background: linear-gradient(135deg, #A8DADC 0%, #97C7C9 100%); }
    .golden-gradient { background: linear-gradient(135deg, #F4A261 0%, #E76F51 100%); }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};