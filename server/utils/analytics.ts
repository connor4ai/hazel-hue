import { Request, Response, NextFunction } from 'express';

// Traffic analytics and user behavior tracking
export interface TrafficAnalytics {
  timestamp: string;
  path: string;
  method: string;
  userAgent: string;
  ip: string;
  referrer?: string;
  sessionId?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  isBot: boolean;
  duration?: number;
  statusCode?: number;
}

// In-memory analytics store (for immediate insights)
const analytics: TrafficAnalytics[] = [];
const MAX_ANALYTICS_ENTRIES = 10000;

// User journey tracking
const userJourneys = new Map<string, string[]>();

export const trackAnalytics = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const deviceType = (req as any).deviceType;
  const userAgent = req.get('User-Agent') || '';
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const sessionId = `${ip}-${userAgent.substring(0, 10)}-${Date.now()}`;
  
  // Detect if request is from a bot
  const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|facebookexternalhit|twitterbot/i.test(userAgent);
  
  // Track user journey
  if (!isBot && req.method === 'GET') {
    const journey = userJourneys.get(sessionId) || [];
    journey.push(`${req.path}:${new Date().toISOString()}`);
    userJourneys.set(sessionId, journey.slice(-20)); // Keep last 20 pages
  }
  
  // Capture response details
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - startTime;
    
    // Store analytics data
    const analyticsEntry: TrafficAnalytics = {
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      userAgent,
      ip,
      referrer: req.get('Referer'),
      sessionId,
      deviceType: deviceType?.isMobile ? 'mobile' : deviceType?.isTablet ? 'tablet' : 'desktop',
      isBot,
      duration,
      statusCode: res.statusCode
    };
    
    analytics.push(analyticsEntry);
    
    // Keep analytics array manageable
    if (analytics.length > MAX_ANALYTICS_ENTRIES) {
      analytics.splice(0, analytics.length - MAX_ANALYTICS_ENTRIES);
    }
    
    return originalSend.call(this, body);
  };
  
  next();
};

// Analytics reporting functions
export const getTrafficSummary = (hours: number = 24) => {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  const recentData = analytics.filter(entry => new Date(entry.timestamp) > cutoffTime);
  
  const summary = {
    totalRequests: recentData.length,
    uniqueIPs: new Set(recentData.map(e => e.ip)).size,
    humanTraffic: recentData.filter(e => !e.isBot).length,
    botTraffic: recentData.filter(e => e.isBot).length,
    mobileTraffic: recentData.filter(e => e.deviceType === 'mobile').length,
    desktopTraffic: recentData.filter(e => e.deviceType === 'desktop').length,
    tabletTraffic: recentData.filter(e => e.deviceType === 'tablet').length,
    averageResponseTime: recentData.reduce((sum, e) => sum + (e.duration || 0), 0) / recentData.length,
    topPages: getTopPages(recentData),
    dropOffPoints: getDropOffPoints(recentData),
    conversionFunnel: getConversionFunnel(recentData),
    referrers: getTopReferrers(recentData)
  };
  
  return summary;
};

const getTopPages = (data: TrafficAnalytics[]) => {
  const pageCounts = new Map<string, number>();
  data.filter(e => !e.isBot && e.method === 'GET').forEach(entry => {
    const count = pageCounts.get(entry.path) || 0;
    pageCounts.set(entry.path, count + 1);
  });
  
  return Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, visits: count }));
};

const getDropOffPoints = (data: TrafficAnalytics[]) => {
  const journeySteps = ['/'];
  const uploadVisits = data.filter(e => !e.isBot && e.path === '/upload').length;
  const checkoutAttempts = data.filter(e => !e.isBot && e.path.includes('/checkout')).length;
  const ordersCreated = data.filter(e => !e.isBot && e.path.includes('/api/orders') && e.method === 'POST').length;
  const homepageVisits = data.filter(e => !e.isBot && e.path === '/').length;
  
  return {
    homepageVisits,
    uploadPageVisits: uploadVisits,
    checkoutAttempts,
    ordersCreated,
    homepageToUpload: uploadVisits > 0 ? (uploadVisits / homepageVisits * 100).toFixed(1) + '%' : '0%',
    uploadToCheckout: uploadVisits > 0 ? (checkoutAttempts / uploadVisits * 100).toFixed(1) + '%' : '0%',
    checkoutToOrder: checkoutAttempts > 0 ? (ordersCreated / checkoutAttempts * 100).toFixed(1) + '%' : '0%'
  };
};

const getConversionFunnel = (data: TrafficAnalytics[]) => {
  const humanTraffic = data.filter(e => !e.isBot);
  const uniqueVisitors = new Set(humanTraffic.map(e => e.ip)).size;
  const uploadStarts = data.filter(e => !e.isBot && e.path === '/upload').length;
  const fileUploads = data.filter(e => !e.isBot && e.path.includes('/api/orders') && e.method === 'POST').length;
  const payments = data.filter(e => !e.isBot && e.path.includes('/api/create-payment-intent')).length;
  
  return {
    visitors: uniqueVisitors,
    uploadPageViews: uploadStarts,
    photoUploads: fileUploads,
    paymentAttempts: payments,
    conversionRate: uniqueVisitors > 0 ? (payments / uniqueVisitors * 100).toFixed(2) + '%' : '0%'
  };
};

const getTopReferrers = (data: TrafficAnalytics[]) => {
  const referrerCounts = new Map<string, number>();
  data.filter(e => !e.isBot && e.referrer && !e.referrer.includes('hazelandhue.com')).forEach(entry => {
    const referrer = entry.referrer || 'Direct';
    const count = referrerCounts.get(referrer) || 0;
    referrerCounts.set(referrer, count + 1);
  });
  
  return Array.from(referrerCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, visits: count }));
};

export const getUserJourneys = () => {
  const recentJourneys = Array.from(userJourneys.entries())
    .filter(([sessionId, journey]) => journey.length > 1)
    .slice(-50); // Last 50 user journeys
    
  return recentJourneys.map(([sessionId, journey]) => ({
    sessionId: sessionId.substring(0, 8) + '...',
    pages: journey.map(step => {
      const [path, timestamp] = step.split(':');
      return { path, timestamp: new Date(timestamp).toLocaleTimeString() };
    })
  }));
};

// Clear analytics data (for privacy/GDPR compliance)
export const clearAnalytics = () => {
  analytics.length = 0;
  userJourneys.clear();
};