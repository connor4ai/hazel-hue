/**
 * ShopTab — "Shop Your Colors" tab content.
 *
 * A full shopping experience organized by category,
 * with palette-matched products scored against the user's colors.
 */

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import type { ShoppableProduct, ProductCategory, ColorSwatch } from '../../data/seasons';
import { useProductFeed, trackProductClick, formatPrice } from '../../hooks/useShoppingApi';

interface ShopTabProps {
  season: string;
  palette: ColorSwatch[];
  analysisId?: string;
}

const CATEGORIES: { key: ProductCategory; label: string; icon: string }[] = [
  { key: 'clothing', label: 'Clothing', icon: '👗' },
  { key: 'makeup', label: 'Makeup', icon: '💄' },
  { key: 'jewelry', label: 'Jewelry', icon: '💎' },
  { key: 'nails', label: 'Nails', icon: '💅' },
  { key: 'accessories', label: 'Accessories', icon: '👜' },
  { key: 'hair', label: 'Hair', icon: '✂️' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export function ShopTab({ season, palette, analysisId }: ShopTabProps) {
  const paletteHexes = palette.map((c) => c.hex);
  const { feeds, loadCategory } = useProductFeed(season, paletteHexes);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('clothing');

  // Load initial category
  useEffect(() => {
    loadCategory(activeCategory);
  }, [activeCategory, loadCategory]);

  const handleCategoryChange = useCallback((category: ProductCategory) => {
    setActiveCategory(category);
  }, []);

  const handleProductClick = useCallback(
    (product: ShoppableProduct) => {
      if (analysisId) {
        trackProductClick({
          analysisId,
          productId: product.id,
          merchantName: product.merchantName,
          clickSource: 'shop_tab',
          category: product.category,
          matchScore: product.matchScore,
          affiliateUrl: product.affiliateUrl,
        });
      }
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    },
    [analysisId],
  );

  const currentFeed = feeds[activeCategory];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div {...fadeUp}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel">
          Shop Your Colors
        </p>
        <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
          Products matched to your palette
        </h2>
        <p className="mt-3 max-w-xl text-charcoal/45 leading-relaxed">
          Every product below has been color-analyzed and scored against your personal palette
          using perceptual color science. The higher the match, the better it complements your
          natural coloring.
        </p>
      </motion.div>

      {/* Palette reminder strip */}
      <motion.div {...fadeUp} className="rounded-2xl border border-cream-200 bg-white/70 p-5 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/30 mb-3">
          Your Palette Colors
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {palette.slice(0, 12).map((color) => (
            <div
              key={color.hex}
              className="h-8 w-8 flex-shrink-0 rounded-lg ring-1 ring-black/5"
              style={{ backgroundColor: color.hex }}
              title={`${color.name} (${color.hex})`}
            />
          ))}
        </div>
      </motion.div>

      {/* Category pills */}
      <motion.div {...fadeUp} className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === key
                ? 'bg-hazel text-white shadow-md shadow-hazel/20'
                : 'border border-cream-200 bg-white/70 text-charcoal/50 hover:bg-white hover:text-charcoal hover:shadow-sm'
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Product grid */}
      <div className="min-h-[300px]">
        {currentFeed.loading && <ProductGridSkeleton />}

        {currentFeed.error && (
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center">
            <p className="text-sm text-red-400">Couldn't load products right now.</p>
            <button
              onClick={() => loadCategory(activeCategory)}
              className="mt-3 text-sm font-semibold text-hazel underline-offset-4 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!currentFeed.loading && !currentFeed.error && currentFeed.products.length === 0 && (
          <div className="rounded-2xl border border-cream-200 bg-white/40 p-12 text-center">
            <p className="text-charcoal/40">No products available in this category yet.</p>
            <p className="mt-1 text-sm text-charcoal/25">Check back soon — we're always adding new matches.</p>
          </div>
        )}

        {!currentFeed.loading && !currentFeed.error && currentFeed.products.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {currentFeed.products.map((product, i) => (
              <ShopProductCard
                key={product.id}
                product={product}
                index={i}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Affiliate disclosure */}
      <div className="rounded-2xl border border-cream-200 bg-cream-50/50 px-6 py-4 text-center">
        <p className="text-[10px] text-charcoal/30 leading-relaxed">
          Some links on this page are affiliate links. Hazel & Hue may earn a small commission
          at no extra cost to you when you make a purchase through these links.
        </p>
      </div>
    </div>
  );
}

// ─── Product Card (Grid Layout) ────────────────────────────────────

function ShopProductCard({
  product,
  index,
  onClick,
}: {
  product: ShoppableProduct;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white/70 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-hazel/5"
    >
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden bg-cream-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-12 w-12 text-charcoal/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5" />
            </svg>
          </div>
        )}

        {/* Match score pill */}
        <div className="absolute left-3 top-3">
          <MatchPill score={product.matchScore} hex={product.matchedPaletteHex} />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-charcoal line-clamp-2 group-hover:text-hazel transition-colors">
          {product.name}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-charcoal">
            {formatPrice(product.priceInCents, product.currency)}
          </span>
          <span className="text-[10px] font-medium text-charcoal/30">
            {product.merchantName}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Match Score Pill ──────────────────────────────────────────────

function MatchPill({ score, hex }: { score: number; hex: string }) {
  const bg = score >= 85 ? 'bg-green-500/90' : score >= 65 ? 'bg-amber-500/90' : 'bg-charcoal/60';

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${bg} backdrop-blur-sm shadow-sm`}>
      <div
        className="h-3 w-3 rounded-full ring-1 ring-white/30"
        style={{ backgroundColor: hex }}
      />
      <span className="text-[10px] font-extrabold text-white">
        {score}% match
      </span>
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-cream-200 bg-white/40">
          <div className="aspect-square animate-pulse bg-cream-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-cream-200" />
            <div className="h-3 w-1/3 animate-pulse rounded-lg bg-cream-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
