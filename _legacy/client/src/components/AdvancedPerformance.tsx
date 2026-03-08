import { useEffect } from 'react';

// Core Web Vitals optimization component
export function AdvancedPerformance() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
      ];
      
      fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = [
        '/attached_assets/12-tone-chart-value-temperature_1750623961315.png',
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts
    const optimizeThirdParty = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Resource hints for external domains
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://api.openai.com' },
        { rel: 'preconnect', href: 'https://js.stripe.com' },
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.rel === 'preconnect') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Critical rendering path optimization
    const optimizeCriticalPath = () => {
      // Inline critical CSS if not already done
      const criticalCSS = `
        .hero-section { display: block; }
        .cta-button { display: inline-block; }
        .navigation { display: flex; }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    preloadCriticalResources();
    optimizeThirdParty();
    addResourceHints();
    optimizeCriticalPath();

    // Performance monitoring with proper typing
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          try {
            const entries = performance.getEntriesByType('navigation');
            if (entries.length > 0) {
              const perfData = entries[0] as any; // Safe casting for compatibility
              console.log('Performance Metrics:', {
                'Load Time': perfData.loadEventEnd ? `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms` : '0ms',
                'Time to First Byte': perfData.responseStart ? `${Math.round(perfData.responseStart - perfData.requestStart)}ms` : '0ms',
                'DOM Content Loaded': perfData.domContentLoadedEventEnd ? `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms` : '0ms'
              });
            }
          } catch (error) {
            console.log('Performance measurement not available');
          }
        }, 0);
      });
    }
  }, []);

  return null;
}

// Image optimization component
export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  sizes = '100vw',
  priority = false 
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}) {
  const imageProps = {
    src,
    alt,
    className,
    loading: priority ? 'eager' : loading,
    sizes,
    decoding: 'async' as const,
  };

  return <img {...imageProps} />;
}