/**
 * React Native hooks for the shopping API.
 */

import { useState, useCallback, useRef } from 'react';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

// ─── Types ─────────────────────────────────────────────────────────

export interface ShoppableProduct {
  id: string;
  name: string;
  priceInCents: number;
  currency: string;
  imageUrl: string;
  merchantName: string;
  merchantUrl: string;
  matchScore: number;
  matchedPaletteHex: string;
  dominantColors: string[];
  category: ProductCategory;
}

export type ProductCategory =
  | 'clothing'
  | 'makeup'
  | 'nails'
  | 'jewelry'
  | 'accessories'
  | 'hair';

export type ClickSource =
  | 'lookbook'
  | 'makeup_guide'
  | 'hair_guide'
  | 'nail_guide'
  | 'jewelry_guide'
  | 'accessory_guide'
  | 'shop_tab';

// ─── Search Hook ───────────────────────────────────────────────────

interface SearchState {
  products: ShoppableProduct[];
  query: string;
  loading: boolean;
  error: string | null;
}

export function useProductSearch(paletteHexes: string[]) {
  const [state, setState] = useState<SearchState>({
    products: [],
    query: '',
    loading: false,
    error: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async (query: string, targetHex?: string, category?: ProductCategory, limit = 5) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState((prev) => ({ ...prev, loading: true, error: null, query }));

      try {
        const params = new URLSearchParams({
          q: query,
          palette: paletteHexes.join(','),
          limit: String(limit),
        });
        if (targetHex) params.set('targetHex', targetHex);
        if (category) params.set('category', category);

        const data = await apiClient.get<{ products: ShoppableProduct[] }>(
          `${endpoints.shopping.search}?${params}`,
          controller.signal,
        );
        setState({ products: data.products ?? [], query, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState((prev) => ({ ...prev, loading: false, error: (err as Error).message }));
      }
    },
    [paletteHexes],
  );

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setState({ products: [], query: '', loading: false, error: null });
  }, []);

  return { ...state, search, clear };
}

// ─── Feed Hook ─────────────────────────────────────────────────────

interface FeedState {
  products: ShoppableProduct[];
  loading: boolean;
  error: string | null;
}

export function useProductFeed(season: string, paletteHexes: string[]) {
  const [feeds, setFeeds] = useState<Record<ProductCategory, FeedState>>({
    clothing: { products: [], loading: false, error: null },
    makeup: { products: [], loading: false, error: null },
    nails: { products: [], loading: false, error: null },
    jewelry: { products: [], loading: false, error: null },
    accessories: { products: [], loading: false, error: null },
    hair: { products: [], loading: false, error: null },
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

        const data = await apiClient.get<{ products: ShoppableProduct[] }>(
          `${endpoints.shopping.feed}?${params}`,
        );
        setFeeds((prev) => ({
          ...prev,
          [category]: { products: data.products ?? [], loading: false, error: null },
        }));
      } catch (err) {
        setFeeds((prev) => ({
          ...prev,
          [category]: { ...prev[category], loading: false, error: (err as Error).message },
        }));
      }
    },
    [season, paletteHexes],
  );

  return { feeds, loadCategory };
}

// ─── Click Tracking ────────────────────────────────────────────────

export function trackProductClick(params: {
  analysisId: string;
  productId: string;
  merchantName: string;
  clickSource: ClickSource;
  category: ProductCategory;
  matchScore: number;
}): void {
  apiClient.post(endpoints.shopping.trackClick, params).catch(() => {});
}

// ─── Price Formatting ──────────────────────────────────────────────

export function formatPrice(priceInCents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceInCents / 100);
}
