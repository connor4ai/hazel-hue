import type { PaletteColor } from '@domain/shared/types';

/**
 * A product from an external retailer, enriched with palette matching data.
 */
export interface ShoppableProduct {
  /** Unique identifier from the affiliate network */
  id: string;
  /** Product name / title */
  name: string;
  /** Price in smallest unit (cents) */
  priceInCents: number;
  /** ISO 4217 currency code */
  currency: string;
  /** Product image URL */
  imageUrl: string;
  /** Retailer / merchant name */
  merchantName: string;
  /** Affiliate-tracked URL */
  affiliateUrl: string;
  /** Original merchant URL (before affiliate wrapping) */
  merchantUrl: string;
  /** 0-100 palette match score */
  matchScore: number;
  /** Which palette color this product best matched */
  matchedPaletteHex: string;
  /** Dominant colors extracted from the product image */
  dominantColors: string[];
  /** Product category for filtering */
  category: ProductCategory;
}

export type ProductCategory =
  | 'clothing'
  | 'makeup'
  | 'nails'
  | 'jewelry'
  | 'accessories'
  | 'hair';

/**
 * A product search request from the client.
 */
export interface ProductSearchRequest {
  /** Free-text search query (e.g., "terracotta suede jacket") */
  query: string;
  /** Target hex color to match against */
  targetHex?: string;
  /** User's palette colors for ranking */
  paletteHexes: string[];
  /** Product category filter */
  category?: ProductCategory;
  /** Maximum number of results */
  limit?: number;
}

/**
 * A curated product feed for the "Shop Your Colors" tab.
 */
export interface ProductFeed {
  /** The season this feed was generated for */
  season: string;
  /** Category of products */
  category: ProductCategory;
  /** Products sorted by match score */
  products: ShoppableProduct[];
  /** When this feed was last refreshed */
  generatedAt: string;
  /** TTL for caching */
  expiresAt: number;
}

/**
 * Click tracking event for analytics.
 */
export interface ProductClickEvent {
  /** User's analysis ID */
  analysisId: string;
  /** Product that was clicked */
  productId: string;
  /** Merchant name */
  merchantName: string;
  /** Which section/context the click originated from */
  clickSource: ClickSource;
  /** Product category */
  category: ProductCategory;
  /** The match score at time of click */
  matchScore: number;
  /** Timestamp */
  clickedAt: string;
}

export type ClickSource =
  | 'lookbook'
  | 'makeup_guide'
  | 'hair_guide'
  | 'nail_guide'
  | 'jewelry_guide'
  | 'accessory_guide'
  | 'shop_tab';
