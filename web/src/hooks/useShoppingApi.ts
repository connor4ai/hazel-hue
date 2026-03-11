/**
 * React hooks for the shopping/affiliate API.
 * Handles product search, feed loading, and click tracking.
 */

import { useState, useCallback, useRef } from 'react';
import type { ShoppableProduct, ProductCategory, ClickSource } from '../data/seasons';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

interface SearchResult {
  products: ShoppableProduct[];
  query: string;
  loading: boolean;
  error: string | null;
}

interface FeedResult {
  products: ShoppableProduct[];
  loading: boolean;
  error: string | null;
  cached: boolean;
}

/**
 * Hook for searching products by query and color.
 */
export function useProductSearch(paletteHexes: string[]) {
  const [result, setResult] = useState<SearchResult>({
    products: [],
    query: '',
    loading: false,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async (query: string, targetHex?: string, category?: ProductCategory, limit = 5) => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setResult((prev) => ({ ...prev, loading: true, error: null, query }));

      try {
        const params = new URLSearchParams({
          q: query,
          palette: paletteHexes.join(','),
          limit: String(limit),
        });
        if (targetHex) params.set('targetHex', targetHex);
        if (category) params.set('category', category);

        const response = await fetch(`${API_BASE}/shopping/search?${params}`, {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Search failed: ${response.status}`);

        const data = await response.json();
        setResult({
          products: data.products ?? [],
          query,
          loading: false,
          error: null,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setResult((prev) => ({
          ...prev,
          loading: false,
          error: (err as Error).message,
        }));
      }
    },
    [paletteHexes],
  );

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setResult({ products: [], query: '', loading: false, error: null });
  }, []);

  return { ...result, search, clear };
}

/**
 * Hook for loading a curated product feed (Shop Your Colors tab).
 */
export function useProductFeed(season: string, paletteHexes: string[]) {
  const [feeds, setFeeds] = useState<Record<ProductCategory, FeedResult>>({
    clothing: { products: [], loading: false, error: null, cached: false },
    makeup: { products: [], loading: false, error: null, cached: false },
    nails: { products: [], loading: false, error: null, cached: false },
    jewelry: { products: [], loading: false, error: null, cached: false },
    accessories: { products: [], loading: false, error: null, cached: false },
    hair: { products: [], loading: false, error: null, cached: false },
  });

  const loadCategory = useCallback(
    async (category: ProductCategory) => {
      setFeeds((prev) => ({
        ...prev,
        [category]: { ...prev[category], loading: true, error: null },
      }));

      try {
        const params = new URLSearchParams({
          season,
          category,
          palette: paletteHexes.join(','),
        });

        const response = await fetch(`${API_BASE}/shopping/feed?${params}`, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Feed load failed: ${response.status}`);

        const data = await response.json();
        setFeeds((prev) => ({
          ...prev,
          [category]: {
            products: data.products ?? [],
            loading: false,
            error: null,
            cached: data.cached ?? false,
          },
        }));
      } catch (err) {
        setFeeds((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            loading: false,
            error: (err as Error).message,
          },
        }));
      }
    },
    [season, paletteHexes],
  );

  return { feeds, loadCategory };
}

/**
 * Track a product click for analytics.
 * Fire-and-forget — doesn't block the user.
 */
export function trackProductClick(params: {
  analysisId: string;
  productId: string;
  merchantName: string;
  clickSource: ClickSource;
  category: ProductCategory;
  matchScore: number;
  affiliateUrl: string;
}): void {
  fetch(`${API_BASE}/shopping/click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).catch(() => {
    // Silently fail — click tracking should never block the user
  });
}

/**
 * Format a price in cents to a display string.
 */
export function formatPrice(priceInCents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceInCents / 100);
}
