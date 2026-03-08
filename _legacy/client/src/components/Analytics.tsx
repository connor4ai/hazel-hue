import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Initialize Google Analytics 4 when ready for production
    const initializeGA4 = () => {
      // Google Analytics 4 tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: location,
          page_title: document.title,
          content_group1: getContentGroup(location),
          custom_map: {
            custom_parameter_1: 'page_type'
          }
        });
      }
    };

    // Initialize Microsoft Clarity for user behavior insights
    const initializeClarity = () => {
      if (typeof window !== 'undefined' && window.clarity) {
        window.clarity('set', 'page_type', getContentGroup(location));
        window.clarity('set', 'user_journey_stage', getUserJourneyStage(location));
      }
    };

    // Track Core Web Vitals for performance monitoring
    const trackCoreWebVitals = () => {
      if ('web-vitals' in window) {
        // This would integrate with actual web-vitals library
        console.log('Tracking Core Web Vitals for:', location);
      }
    };

    // Track conversion events
    const trackConversions = () => {
      if (location === '/upload') {
        // Track upload page view
        trackEvent('page_view', 'upload_page', { value: 1 });
      } else if (location === '/checkout') {
        // Track checkout initiation
        trackEvent('begin_checkout', 'checkout_started', { currency: 'USD', value: 29.99 });
      } else if (location.includes('/results/')) {
        // Track successful completion
        trackEvent('purchase', 'analysis_completed', { 
          currency: 'USD', 
          value: 29.99,
          transaction_id: location.split('/').pop()
        });
      }
    };

    initializeGA4();
    initializeClarity();
    trackCoreWebVitals();
    trackConversions();
  }, [location]);

  // Helper function to categorize content
  const getContentGroup = (path: string): string => {
    if (path === '/') return 'Homepage';
    if (path === '/upload') return 'Upload';
    if (path === '/checkout') return 'Checkout';
    if (path.includes('/results/')) return 'Results';
    if (path === '/faqs') return 'FAQ';
    return 'Other';
  };

  // Helper function to determine user journey stage
  const getUserJourneyStage = (path: string): string => {
    if (path === '/') return 'awareness';
    if (path === '/upload') return 'consideration';
    if (path === '/checkout') return 'purchase';
    if (path.includes('/results/')) return 'post_purchase';
    return 'exploration';
  };

  // Generic event tracking function
  const trackEvent = (eventName: string, eventCategory: string, parameters: any = {}) => {
    // Google Analytics 4 event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: eventCategory,
        event_label: location,
        ...parameters
      });
    }

    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: eventCategory,
        content_name: eventName
      });
    }

    // Custom analytics for business intelligence
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          category: eventCategory,
          page: location,
          timestamp: new Date().toISOString(),
          parameters
        })
      }).catch(err => console.log('Analytics tracking failed:', err));
    }
  };

  return null; // This component doesn't render anything visible
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}