// CLS optimization utility - no React hooks needed
export const CumulativeLayoutShift = () => {
  // This component runs optimization on mount via CSS injection
  if (typeof window !== 'undefined') {
    // Initialize CLS monitoring on client side
    setTimeout(() => {
      initializeCLSMonitoring();
    }, 0);
  }
  
  return null;
};

// Initialize CLS monitoring without React hooks
const initializeCLSMonitoring = () => {
  try {
    let clsValue = 0;
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          const layoutShift = entry as LayoutShift;
          clsValue += layoutShift.value;
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Report CLS after page load
    window.addEventListener('beforeunload', () => {
      if (clsValue > 0.1) {
        console.warn(`CLS score: ${clsValue.toFixed(4)} (target: ≤0.1)`);
      }
      observer.disconnect();
    });
  } catch (error) {
    console.log('CLS monitoring not supported in this browser');
  }
};

// Layout stability utilities
export const stabilizeLayout = () => {
  // Add explicit dimensions to prevent CLS
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent layout shifts */
    img {
      max-width: 100%;
      height: auto;
    }
    
    .hero-section {
      min-height: 600px;
    }
    
    .card-container {
      min-height: 200px;
    }
    
    /* Skeleton loaders for content */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
      background-size: 400% 100%;
      animation: skeleton-loading 1.5s ease-in-out infinite;
    }
    
    @keyframes skeleton-loading {
      0% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* Preload critical fonts */
    @font-face {
      font-family: 'Playfair Display';
      font-display: swap;
    }
  `;
  
  if (!document.head.querySelector('style[data-cls-optimizer]')) {
    style.setAttribute('data-cls-optimizer', 'true');
    document.head.appendChild(style);
  }
};