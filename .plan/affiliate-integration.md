# Affiliate Integration Plan — Hazel & Hue

## Overview
Add shoppable affiliate links throughout the results experience (all guide sections) plus a dedicated "Shop Your Colors" tab. Use Skimlinks as the product/affiliate backbone and Imagga Color API for palette-matched product scoring.

---

## Architecture

### Backend: New Product Recommendation Service

**New Lambda: `searchProducts`**
- Endpoint: `GET /products/search?query=...&palette=...&season=...`
- Accepts: search query (e.g., "suede jacket"), target hex color, user's season
- Pipeline:
  1. Call Skimlinks Product API to search for products matching the query
  2. For each product result, call Imagga Color API to extract dominant colors from product image
  3. Score each product using CIEDE2000 color distance against the target hex
  4. Return top 5 products sorted by palette match score, with affiliate links

**New Lambda: `getShopFeed`**
- Endpoint: `GET /products/feed?season=...&category=...`
- Returns a curated feed of palette-matched products for the "Shop Your Colors" tab
- Categories: clothing, makeup, nails, jewelry, accessories, hair
- Caches results in DynamoDB (TTL: 24h) to avoid repeated API calls
- Pre-generates feeds per season on a schedule (EventBridge cron)

**Skimlinks Integration:**
- Sign up at skimlinks.com → get Publisher ID, Client ID, Client Secret
- Use Product API for product search with images, pricing, availability
- Use Link API to wrap merchant URLs in affiliate tracking links
- Use Reporting API to track commissions and conversions

**Imagga Integration:**
- Sign up at imagga.com → get API key
- Use Color Extraction endpoint on product images
- Returns dominant colors in hex format
- Compare against user palette using CIEDE2000 formula

### Color Matching Algorithm (CIEDE2000)

```typescript
// Convert hex to Lab color space, then compute perceptual distance
function colorDistance(hex1: string, hex2: string): number {
  const lab1 = hexToLab(hex1);
  const lab2 = hexToLab(hex2);
  return ciede2000(lab1, lab2); // Lower = closer match
}

function paletteMatchScore(productColors: string[], userPalette: string[]): number {
  // Find the best match between any product color and any palette color
  let bestDistance = Infinity;
  for (const pc of productColors) {
    for (const uc of userPalette) {
      bestDistance = Math.min(bestDistance, colorDistance(pc, uc));
    }
  }
  // Convert distance to 0-100 score (0 distance = 100% match)
  return Math.max(0, Math.round(100 - bestDistance * 2));
}
```

---

## Frontend: Shop Integration Points

### All Guide Sections — Inline "Shop" Buttons

Each existing section gets a contextual shop button/link:

**Lookbook (Style tab)**
- Each outfit piece card gets a "Shop" pill button
- Tapping opens a bottom sheet / modal with 3-5 product matches
- Query: `{piece.item}` filtered by `{piece.color.hex}`
- Example: "Floral midi dress" in Baby Pink → shows matching dresses

**Makeup Guide (Beauty tab)**
- Each makeup category card gets "Shop [Category]" link
- Query: `{category} {recommendation}` (e.g., "blush warm peach coral")
- Targets: Sephora, Charlotte Tilbury, MAC via Skimlinks

**Hair Guide (Beauty tab)**
- "Shop Hair Color" button under salon terminology section
- Query: hair color products matching recommended shades
- Targets: Sally Beauty, Olaplex, dpHue

**Nail Guide (Beauty tab)**
- Each polish swatch (everyday + statement) gets a small shop icon
- Query: `nail polish {shade.name}` filtered by `{shade.hex}`
- Targets: Zoya, OPI, Essie

**Jewelry Guide (Accessories tab)**
- "Shop [Metal]" buttons for each recommended metal
- "Shop [Gemstone]" for each gemstone recommendation
- Query: `{metal} {gemstone} jewelry`
- Targets: Mejuri, Monica Vinader, Gorjana

**Accessories (Accessories tab)**
- Each bag/shoe/scarf color swatch gets a shop link
- Query: `{category} {color.name}` (e.g., "crossbody bag cognac")

### New "Shop Your Colors" Tab (6th tab)

A dedicated shopping experience organized by category:

```
┌─────────────────────────────────────────┐
│  SHOP YOUR COLORS                       │
│  Products hand-matched to your palette  │
├─────────────────────────────────────────┤
│                                         │
│  [Clothing] [Makeup] [Jewelry]          │  ← Category pills
│  [Nails] [Accessories] [Hair]           │
│                                         │
│  ── Clothing ──────────────────────     │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ product  │  │ product  │              │
│  │  image   │  │  image   │              │
│  │         │  │         │              │
│  │ 96% ●   │  │ 91% ●   │              │
│  │ match    │  │ match    │              │
│  │         │  │         │              │
│  │ Name     │  │ Name     │              │
│  │ $89      │  │ $120     │              │
│  │ Nordstrom│  │ ASOS     │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  ── Your Palette Match ────────────     │
│  [color dot] [color dot] [color dot]    │
│  Products scored against your 12        │
│  best colors using color science        │
│                                         │
└─────────────────────────────────────────┘
```

Each product card shows:
- Product image
- Palette match score (0-100%) with color dot
- Product name
- Price
- Retailer name
- "Shop" button (affiliate link)

---

## Data Model Changes

### New Types (web/src/data/seasons.ts)

```typescript
interface ShoppableProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  merchantName: string;
  affiliateUrl: string;
  paletteMatchScore: number;   // 0-100
  matchedPaletteHex: string;   // Which palette color it matched
  dominantColorHex: string;    // Product's dominant color
}

interface ProductSearchResult {
  products: ShoppableProduct[];
  query: string;
  targetHex?: string;
}
```

### New DynamoDB Table: ProductCache

```
PK: SEASON#{season}
SK: CATEGORY#{category}#PRODUCT#{productId}
TTL: 24h
Fields: product data + palette match score
```

---

## Infrastructure Changes

### New Lambdas (infra/lambdas/products/)

1. `searchProducts.ts` — On-demand product search + color matching
2. `generateShopFeed.ts` — Scheduled feed generation per season/category
3. `trackClick.ts` — Click tracking for analytics (which products/sections convert)

### New API Routes (ApiStack.ts)

```
GET  /products/search    → searchProducts Lambda
GET  /products/feed      → getShopFeed Lambda
POST /products/click     → trackClick Lambda
```

### New Environment Variables

```
SKIMLINKS_PUBLISHER_ID
SKIMLINKS_CLIENT_ID
SKIMLINKS_CLIENT_SECRET
IMAGGA_API_KEY
IMAGGA_API_SECRET
```

### IAM: No Bedrock needed for product Lambdas (just DynamoDB + external HTTP)

---

## Implementation Order

### Step 1: Backend Product Service
- [ ] Create CIEDE2000 color distance utility
- [ ] Create Skimlinks API client (Product API + Link API)
- [ ] Create Imagga API client (Color extraction)
- [ ] Build searchProducts Lambda
- [ ] Build generateShopFeed Lambda
- [ ] Build trackClick Lambda
- [ ] Add API routes to ApiStack
- [ ] Create ProductCache DynamoDB table
- [ ] Add environment variables / secrets

### Step 2: Web — Inline Shop Buttons
- [ ] Create ShopButton component (small pill that opens product modal)
- [ ] Create ProductModal component (shows 3-5 matching products)
- [ ] Add ShopButton to Lookbook outfit pieces
- [ ] Add ShopButton to Makeup guide categories
- [ ] Add ShopButton to Nail polish swatches
- [ ] Add ShopButton to Jewelry metals & gemstones
- [ ] Add ShopButton to Accessory color swatches
- [ ] Add "Shop Hair Color" to Hair guide

### Step 3: Web — Shop Your Colors Tab
- [ ] Create ShopTab component with category filters
- [ ] Create ProductCard component with palette match score
- [ ] Create PaletteMatchBadge component
- [ ] Add "Shop Your Colors" as 6th tab in AnalysisResults.tsx
- [ ] Wire up to getShopFeed API endpoint
- [ ] Add loading states and empty states

### Step 4: Mobile — Same Features
- [ ] Create ShopButton React Native component
- [ ] Create ProductModal React Native component
- [ ] Create ShopFeedScreen React Native screen
- [ ] Add inline shop buttons to all mobile guide components
- [ ] Add Shop tab to mobile results navigation
- [ ] Handle deep linking (open retailer in in-app browser)

### Step 5: Analytics & Optimization
- [ ] Track click-through rate per section
- [ ] Track conversion rate per category
- [ ] A/B test shop button placement and styling
- [ ] Optimize product feed caching strategy

---

## Disclosure / Compliance

FTC requires affiliate disclosure. Add to results page footer:
> "Some links on this page are affiliate links. Hazel & Hue may earn a commission at no extra cost to you."

Also add to Terms of Service.

---

## Cost Estimates

| Service | Pricing | Monthly Estimate |
|---------|---------|-----------------|
| Skimlinks | Free (they take cut of commissions) | $0 |
| Imagga Color API | Free tier: 2,000 calls/mo; $49/mo for 40K | $49-99/mo |
| Additional Lambda compute | ~$5-10/mo at moderate scale | $10/mo |
| DynamoDB (ProductCache) | On-demand, ~$1-5/mo | $3/mo |
| **Total infrastructure** | | **~$60-110/mo** |

At 10K monthly analyses with 30% shop engagement, even conservative 3% conversion at 7% blended commission on $60 AOV = **~$3,780/mo revenue**.

**ROI: ~35-60x infrastructure cost.**
