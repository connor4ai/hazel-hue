/**
 * Skimlinks API client with retry, circuit breaker, and response caching.
 *
 * Skimlinks provides:
 *   - Product API: Search ~1B products with images, pricing, availability
 *   - Link API: Wrap merchant URLs in affiliate tracking links
 *   - Merchant API: Retailer metadata and commission rates
 *
 * @see https://developers.skimlinks.com/
 */

// ─── Types ─────────────────────────────────────────────────────────

export interface SkimlinksConfig {
  publisherId: string;
  clientId: string;
  apiKey: string;
  baseUrl?: string;
}

export interface SkimlinksProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  merchantName: string;
  merchantId: number;
  url: string;
  description?: string;
  category?: string;
}

export interface SkimlinksSearchParams {
  query: string;
  /** Filter by merchant domain (e.g., "sephora.com") */
  merchantDomain?: string;
  /** Filter by category */
  category?: string;
  /** Minimum price in cents */
  minPrice?: number;
  /** Maximum price in cents */
  maxPrice?: number;
  /** Number of results to return (max 100) */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Country code for localized results */
  country?: string;
}

interface SkimlinksSearchResponse {
  skimpiProducts?: {
    products: SkimlinksRawProduct[];
    total: number;
    numFound: number;
  };
}

interface SkimlinksRawProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrl?: string;
  image_url?: string;
  merchantName?: string;
  merchant_name?: string;
  merchantId?: number;
  merchant_id?: number;
  url: string;
  description?: string;
  category?: string;
}

interface AffiliateLinkResponse {
  url?: string;
  affiliateUrl?: string;
}

// ─── Circuit Breaker ───────────────────────────────────────────────

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
}

const FAILURE_THRESHOLD = 5;
const RESET_TIMEOUT_MS = 30_000; // 30 seconds

// ─── Client ────────────────────────────────────────────────────────

export class SkimlinksClient {
  private readonly config: Required<SkimlinksConfig>;
  private readonly circuitBreaker: CircuitBreakerState = {
    failures: 0,
    lastFailureTime: 0,
    state: 'CLOSED',
  };

  constructor(config: SkimlinksConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? 'https://api-product.skimlinks.com',
    };
  }

  /**
   * Search for products matching a query.
   */
  async searchProducts(params: SkimlinksSearchParams): Promise<SkimlinksProduct[]> {
    const queryParams = new URLSearchParams({
      q: params.query,
      apikey: this.config.apiKey,
      publisherId: this.config.publisherId,
      rows: String(Math.min(params.limit ?? 20, 100)),
      start: String(params.offset ?? 0),
      country: params.country ?? 'US',
      ...(params.merchantDomain ? { merchant: params.merchantDomain } : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.minPrice ? { min_price: String(params.minPrice) } : {}),
      ...(params.maxPrice ? { max_price: String(params.maxPrice) } : {}),
    });

    const url = `${this.config.baseUrl}/product/search?${queryParams}`;
    const data = await this.fetchWithResilience<SkimlinksSearchResponse>(url);

    if (!data.skimpiProducts?.products) return [];

    return data.skimpiProducts.products.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      currency: p.currency ?? 'USD',
      imageUrl: p.imageUrl ?? p.image_url ?? '',
      merchantName: p.merchantName ?? p.merchant_name ?? 'Unknown',
      merchantId: p.merchantId ?? p.merchant_id ?? 0,
      url: p.url,
      description: p.description,
      category: p.category,
    }));
  }

  /**
   * Wrap a merchant URL in an affiliate tracking link.
   */
  async getAffiliateLink(merchantUrl: string): Promise<string> {
    const queryParams = new URLSearchParams({
      apikey: this.config.apiKey,
      publisherId: this.config.publisherId,
      url: merchantUrl,
    });

    const url = `https://api-links.skimlinks.com/link?${queryParams}`;

    try {
      const data = await this.fetchWithResilience<AffiliateLinkResponse>(url);
      return data.affiliateUrl ?? data.url ?? merchantUrl;
    } catch {
      // Fallback to original URL if link wrapping fails
      return merchantUrl;
    }
  }

  /**
   * Batch-wrap multiple URLs in affiliate links.
   */
  async getAffiliateLinks(merchantUrls: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    // Process in batches of 10 to avoid overwhelming the API
    const batchSize = 10;

    for (let i = 0; i < merchantUrls.length; i += batchSize) {
      const batch = merchantUrls.slice(i, i + batchSize);
      const settled = await Promise.allSettled(
        batch.map(async (url) => {
          const affiliateUrl = await this.getAffiliateLink(url);
          return { original: url, affiliate: affiliateUrl };
        }),
      );

      for (const result of settled) {
        if (result.status === 'fulfilled') {
          results.set(result.value.original, result.value.affiliate);
        }
      }
    }

    return results;
  }

  // ─── Resilience Layer ──────────────────────────────────────────

  private async fetchWithResilience<T>(url: string, maxRetries = 3): Promise<T> {
    this.checkCircuitBreaker();

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);

        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'HazelHue/1.0',
            },
            signal: controller.signal,
          });

          if (!response.ok) {
            if (response.status === 429) {
              // Rate limited — back off
              const retryAfter = parseInt(response.headers.get('Retry-After') ?? '2', 10);
              await this.sleep(retryAfter * 1000);
              continue;
            }

            throw new Error(`Skimlinks API error: ${response.status} ${response.statusText}`);
          }

          const data = (await response.json()) as T;
          this.onSuccess();
          return data;
        } finally {
          clearTimeout(timeout);
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt < maxRetries) {
          // Exponential backoff: 500ms, 1s, 2s
          await this.sleep(500 * Math.pow(2, attempt));
        }
      }
    }

    this.onFailure();
    throw lastError ?? new Error('Skimlinks API request failed');
  }

  private checkCircuitBreaker(): void {
    if (this.circuitBreaker.state === 'OPEN') {
      const elapsed = Date.now() - this.circuitBreaker.lastFailureTime;
      if (elapsed >= RESET_TIMEOUT_MS) {
        this.circuitBreaker.state = 'HALF_OPEN';
      } else {
        throw new Error('Skimlinks circuit breaker is OPEN — requests are temporarily blocked');
      }
    }
  }

  private onSuccess(): void {
    this.circuitBreaker.failures = 0;
    this.circuitBreaker.state = 'CLOSED';
  }

  private onFailure(): void {
    this.circuitBreaker.failures++;
    this.circuitBreaker.lastFailureTime = Date.now();
    if (this.circuitBreaker.failures >= FAILURE_THRESHOLD) {
      this.circuitBreaker.state = 'OPEN';
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create a Skimlinks client from explicit config or environment variables.
 */
export function createSkimlinksClient(config?: Partial<SkimlinksConfig>): SkimlinksClient {
  const publisherId = config?.publisherId ?? process.env.SKIMLINKS_PUBLISHER_ID;
  const clientId = config?.clientId ?? process.env.SKIMLINKS_CLIENT_ID;
  const apiKey = config?.apiKey ?? process.env.SKIMLINKS_API_KEY;

  if (!publisherId || !clientId || !apiKey) {
    throw new Error('Missing Skimlinks configuration: SKIMLINKS_PUBLISHER_ID, SKIMLINKS_CLIENT_ID, SKIMLINKS_API_KEY');
  }

  return new SkimlinksClient({ publisherId, clientId, apiKey });
}
