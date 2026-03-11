/**
 * Imagga Color Extraction API client.
 *
 * Extracts dominant colors from product images to enable
 * perceptual color matching against a user's seasonal palette.
 *
 * @see https://docs.imagga.com/#colors
 */

// ─── Types ─────────────────────────────────────────────────────────

export interface ImaggaConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
}

export interface ExtractedColor {
  hex: string;
  percentage: number;
  name: string;
}

interface ImaggaColorsResponse {
  result?: {
    colors?: {
      image_colors?: ImaggaRawColor[];
      foreground_colors?: ImaggaRawColor[];
      background_colors?: ImaggaRawColor[];
    };
  };
  status?: {
    type: string;
    text: string;
  };
}

interface ImaggaRawColor {
  r: number;
  g: number;
  b: number;
  html_code: string;
  closest_palette_color: string;
  closest_palette_color_html_code: string;
  percentage: number;
}

// ─── In-Memory Cache ───────────────────────────────────────────────

interface CacheEntry {
  colors: ExtractedColor[];
  expiresAt: number;
}

const COLOR_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 5000;

function getCached(key: string): ExtractedColor[] | null {
  const entry = COLOR_CACHE.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    COLOR_CACHE.delete(key);
    return null;
  }
  return entry.colors;
}

function setCache(key: string, colors: ExtractedColor[]): void {
  // Evict oldest entries if cache is full
  if (COLOR_CACHE.size >= MAX_CACHE_SIZE) {
    const firstKey = COLOR_CACHE.keys().next().value;
    if (firstKey !== undefined) COLOR_CACHE.delete(firstKey);
  }
  COLOR_CACHE.set(key, { colors, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ─── Client ────────────────────────────────────────────────────────

export class ImaggaClient {
  private readonly config: Required<ImaggaConfig>;
  private readonly authHeader: string;

  constructor(config: ImaggaConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? 'https://api.imagga.com/v2',
    };
    this.authHeader = 'Basic ' + Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64');
  }

  /**
   * Extract dominant colors from an image URL.
   *
   * Returns the top colors sorted by percentage (most dominant first).
   * Combines foreground and image colors for the most accurate representation
   * of the product's visible color.
   */
  async extractColors(imageUrl: string, maxColors = 5): Promise<ExtractedColor[]> {
    // Check cache first
    const cached = getCached(imageUrl);
    if (cached) return cached.slice(0, maxColors);

    const params = new URLSearchParams({
      image_url: imageUrl,
      extract_overall_colors: '1',
      extract_object_colors: '1',
    });

    const url = `${this.config.baseUrl}/colors?${params}`;

    const response = await this.fetchWithRetry(url);

    if (!response.result?.colors) {
      return [];
    }

    const { image_colors = [], foreground_colors = [] } = response.result.colors;

    // Merge and deduplicate colors, preferring foreground (product) colors
    const colorMap = new Map<string, ExtractedColor>();

    for (const rawColor of [...foreground_colors, ...image_colors]) {
      const hex = rawColor.html_code.toLowerCase();
      if (!colorMap.has(hex)) {
        colorMap.set(hex, {
          hex,
          percentage: rawColor.percentage,
          name: rawColor.closest_palette_color,
        });
      }
    }

    const colors = Array.from(colorMap.values())
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, maxColors);

    // Cache the result
    setCache(imageUrl, colors);

    return colors;
  }

  /**
   * Batch extract colors from multiple images.
   * Processes in parallel with concurrency limit to avoid rate limiting.
   */
  async batchExtractColors(
    imageUrls: string[],
    maxColors = 5,
    concurrency = 5,
  ): Promise<Map<string, ExtractedColor[]>> {
    const results = new Map<string, ExtractedColor[]>();

    // Process in concurrent batches
    for (let i = 0; i < imageUrls.length; i += concurrency) {
      const batch = imageUrls.slice(i, i + concurrency);
      const settled = await Promise.allSettled(
        batch.map(async (url) => {
          const colors = await this.extractColors(url, maxColors);
          return { url, colors };
        }),
      );

      for (const result of settled) {
        if (result.status === 'fulfilled') {
          results.set(result.value.url, result.value.colors);
        } else {
          // Log but don't fail the batch
          console.warn('Color extraction failed for image:', result.reason);
        }
      }
    }

    return results;
  }

  // ─── Resilience ────────────────────────────────────────────────

  private async fetchWithRetry(url: string, maxRetries = 2): Promise<ImaggaColorsResponse> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15_000);

        try {
          const response = await fetch(url, {
            headers: {
              'Authorization': this.authHeader,
              'Accept': 'application/json',
            },
            signal: controller.signal,
          });

          if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get('Retry-After') ?? '3', 10);
            await new Promise((r) => setTimeout(r, retryAfter * 1000));
            continue;
          }

          if (!response.ok) {
            throw new Error(`Imagga API error: ${response.status} ${response.statusText}`);
          }

          return (await response.json()) as ImaggaColorsResponse;
        } finally {
          clearTimeout(timeout);
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }
      }
    }

    throw lastError ?? new Error('Imagga API request failed');
  }
}

/**
 * Create an Imagga client from environment variables.
 */
export function createImaggaClient(): ImaggaClient {
  const apiKey = process.env.IMAGGA_API_KEY;
  const apiSecret = process.env.IMAGGA_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Missing Imagga configuration: IMAGGA_API_KEY, IMAGGA_API_SECRET');
  }

  return new ImaggaClient({ apiKey, apiSecret });
}
