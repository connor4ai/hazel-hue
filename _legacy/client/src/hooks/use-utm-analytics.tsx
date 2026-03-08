import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageViewWithUTM, trackFunnelStep } from '../lib/utm-analytics';

export const useUTMAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      trackPageViewWithUTM(location);
      prevLocationRef.current = location;
    }
  }, [location]);
};