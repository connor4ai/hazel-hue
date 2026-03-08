// UTM Tracking and Google Analytics Integration for Ad Campaigns

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    trackColorAnalysis?: (season: string, method: string) => void;
    trackUserAction?: (action: string, category?: string, label?: string) => void;
  }
}

// Initialize Google Analytics with UTM tracking and enhanced ecommerce
export const initGAWithUTM = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  console.log('Initializing GA4 with UTM tracking:', measurementId);

  // Add Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag with enhanced ecommerce and UTM tracking
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      anonymize_ip: true,
      enhanced_ecommerce: true,
      custom_map: {
        'custom_parameter_1': 'utm_source',
        'custom_parameter_2': 'utm_campaign', 
        'custom_parameter_3': 'utm_medium',
        'custom_parameter_4': 'color_season'
      }
    });
    
    // Enhanced tracking functions
    window.trackColorAnalysis = function(season, method) {
      gtag('event', 'color_analysis_complete', {
        'color_analysis_type': method || 'AI',
        'seasonal_result': season,
        'event_category': 'engagement',
        'event_label': season + '_analysis',
        'value': 1
      });
    };
    
    window.trackUserAction = function(action, category, label) {
      gtag('event', action, {
        'event_category': category || 'user_interaction',
        'event_label': label,
        'send_to': '${measurementId}'
      });
    };
  `;
  document.head.appendChild(script2);
};

// Track page views with UTM attribution
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url,
    page_title: document.title
  });
};

// Enhanced event tracking with UTM attribution
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters
  });
};

// UTM Parameter Tracking - Core function for ad attribution
export const trackUTMParameters = () => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };
  
  // Only track if we have UTM parameters
  if (Object.values(utmData).some(value => value !== null)) {
    console.log('UTM Parameters detected:', utmData);
    
    // Track landing event with UTM data
    trackEvent('utm_landing', 'traffic_source', 'paid_traffic', undefined, utmData);
    
    // Store UTM data in session storage for conversion attribution
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    sessionStorage.setItem('utm_timestamp', Date.now().toString());
    
    // Set custom dimensions for this session
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      window.gtag('config', measurementId, {
        custom_map: {
          utm_source: utmData.utm_source,
          utm_campaign: utmData.utm_campaign,
          utm_medium: utmData.utm_medium
        }
      });
    }
  }
};

// Conversion Funnel Tracking for Ad Optimization
export const trackFunnelStep = (step: string, additionalData?: Record<string, any>) => {
  const utmData = getStoredUTMData();
  
  trackEvent('funnel_step', 'conversion', step, undefined, {
    funnel_step: step,
    ...utmData,
    ...additionalData
  });
  
  console.log(`Funnel step tracked: ${step}`, { utmData, additionalData });
};

// Enhanced ecommerce conversion tracking with full attribution
export const trackConversion = (orderId: string, amount: number, season?: string) => {
  const utmData = getStoredUTMData();
  
  // GA4 Enhanced Ecommerce Purchase Event
  window.gtag('event', 'purchase', {
    transaction_id: orderId,
    value: amount,
    currency: 'USD',
    items: [{
      item_id: 'color-analysis',
      item_name: 'AI Color Analysis',
      item_category: 'Digital Service',
      item_variant: season,
      quantity: 1,
      price: amount
    }],
    ...utmData
  });
  
  // Custom conversion event for detailed ad attribution
  trackEvent('color_analysis_conversion', 'ecommerce', 'purchase_complete', amount, {
    order_id: orderId,
    color_season: season,
    conversion_value: amount,
    ...utmData
  });
  
  console.log('Conversion tracked:', { orderId, amount, season, utmData });
};

// Track photo upload events (key engagement metric)
export const trackPhotoUpload = (photoCount: number) => {
  const utmData = getStoredUTMData();
  
  trackEvent('photo_upload', 'engagement', 'upload_complete', photoCount, {
    photo_count: photoCount,
    engagement_type: 'photo_upload',
    ...utmData
  });
  
  trackFunnelStep('photos_uploaded', { photo_count: photoCount });
};

// Track payment initiation (critical conversion metric)
export const trackPaymentInitiated = (amount: number) => {
  const utmData = getStoredUTMData();
  
  // GA4 Standard begin_checkout event
  window.gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: amount,
    items: [{
      item_id: 'color-analysis',
      item_name: 'AI Color Analysis',
      item_category: 'Digital Service',
      quantity: 1,
      price: amount
    }],
    ...utmData
  });
  
  trackFunnelStep('payment_initiated', { amount });
};

// Track AI analysis completion
export const trackAnalysisComplete = (season: string, processingTimeOrOrderId?: number | string) => {
  const utmData = getStoredUTMData();
  
  trackEvent('analysis_complete', 'ai_processing', season, undefined, {
    color_season: season,
    processing_data: processingTimeOrOrderId,
    analysis_type: 'AI',
    ...utmData
  });
  
  trackFunnelStep('analysis_complete', { season, data: processingTimeOrOrderId });
  
  // Use existing global function if available
  if (window.trackColorAnalysis) {
    window.trackColorAnalysis(season, 'AI');
  }
};

// Track ad landing page views with source identification
export const trackAdLanding = (landingPage: string) => {
  trackUTMParameters();
  trackFunnelStep('ad_landing', { 
    landing_page: landingPage,
    referrer: document.referrer 
  });
};

// Get stored UTM data from session storage
const getStoredUTMData = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem('utm_data');
    const timestamp = sessionStorage.getItem('utm_timestamp');
    
    // UTM data expires after 30 days
    if (stored && timestamp) {
      const utmAge = Date.now() - parseInt(timestamp);
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      
      if (utmAge < thirtyDays) {
        return JSON.parse(stored);
      } else {
        // Clean up expired UTM data
        sessionStorage.removeItem('utm_data');
        sessionStorage.removeItem('utm_timestamp');
      }
    }
  } catch {
    return {};
  }
  
  return {};
};

// Track custom ad events for campaign optimization
export const trackAdEvent = (eventName: string, parameters?: Record<string, any>) => {
  const utmData = getStoredUTMData();
  
  trackEvent(eventName, 'ad_campaign', eventName, undefined, {
    ad_event_type: eventName,
    ...utmData,
    ...parameters
  });
};

// Enhanced page view tracking with UTM attribution
export const trackPageViewWithUTM = (url: string) => {
  trackPageView(url);
  
  // Track UTM parameters on key landing pages
  if (url === '/' || url === '/upload' || url === '/homepage' || url === '/reddit-landing') {
    trackUTMParameters();
    trackAdLanding(url);
  }
  
  // Track funnel progression automatically
  if (url === '/upload') {
    trackFunnelStep('upload_page_view');
  } else if (url.includes('/checkout')) {
    trackFunnelStep('checkout_page_view');
  } else if (url.includes('/results')) {
    trackFunnelStep('results_page_view');
  }
};

// Debug function to check UTM tracking status
export const debugUTMTracking = () => {
  const utmData = getStoredUTMData();
  const hasUTM = Object.values(utmData).some(value => value !== null && value !== undefined);
  
  console.log('UTM Tracking Debug:', {
    hasUTMData: hasUTM,
    storedUTMData: utmData,
    currentURL: window.location.href,
    currentParams: Object.fromEntries(new URLSearchParams(window.location.search)),
    gaInitialized: typeof window.gtag !== 'undefined'
  });
  
  return { hasUTM, utmData };
};

// Export utility functions for testing
export function getUTMParams() {
  return getStoredUTMData();
}

export function setUTMData(data: any) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('utm_data', JSON.stringify(data));
    sessionStorage.setItem('utm_timestamp', Date.now().toString());
  }
}