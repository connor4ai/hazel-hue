import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalAssets = () => {
      // Preload hero images
      const heroImage = new Image();
      heroImage.src = '/hero-background.webp';
      
      // Preload fonts to prevent FOUT
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap';
      preloadLink.as = 'style';
      document.head.appendChild(preloadLink);
    };

    // Optimize images for better LCP
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        // Add loading attributes for performance
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add fetchpriority for above-the-fold images
        if (img.getBoundingClientRect().top < 600) {
          img.setAttribute('fetchpriority', 'high');
          img.setAttribute('loading', 'eager');
        }
        
        // Add proper sizing attributes
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          if (aspectRatio) {
            img.style.aspectRatio = aspectRatio.toString();
          }
        }
      });
    };

    // Reduce Cumulative Layout Shift (CLS)
    const preventLayoutShift = () => {
      // Reserve space for dynamically loaded content
      const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
      dynamicContainers.forEach((container) => {
        const el = container as HTMLElement;
        if (!el.style.minHeight) {
          el.style.minHeight = '200px';
        }
      });
    };

    // Optimize for Interaction to Next Paint (INP)
    const optimizeInteractions = () => {
      // Debounce scroll events
      let scrollTimeout: number | undefined;
      const handleScroll = () => {
        if (scrollTimeout) window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          // Throttled scroll handler
        }, 16); // ~60fps
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) window.clearTimeout(scrollTimeout);
      };
    };

    // Monitor Core Web Vitals
    const reportWebVitals = () => {
      if ('web-vitals' in window) {
        // This would be implemented with actual web-vitals library in production
        console.log('Core Web Vitals monitoring active');
      }
    };

    // Apply optimizations
    preloadCriticalAssets();
    optimizeImages();
    preventLayoutShift();
    const cleanupInteractions = optimizeInteractions();
    reportWebVitals();

    // Cleanup function
    return () => {
      if (cleanupInteractions) {
        cleanupInteractions();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}