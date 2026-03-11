/**
 * ProductModal — Shows matching products when a ShopButton is clicked.
 *
 * Displays 3-5 color-matched products from real retailers with:
 *   - Product image
 *   - Palette match score badge
 *   - Price
 *   - Retailer name
 *   - Affiliate "Shop" link
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ShoppableProduct, ClickSource } from '../../data/seasons';
import { trackProductClick, formatPrice } from '../../hooks/useShoppingApi';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShoppableProduct[];
  loading: boolean;
  error: string | null;
  query: string;
  /** Which section triggered the modal (for analytics) */
  clickSource: ClickSource;
  /** Analysis ID for click tracking */
  analysisId?: string;
}

export function ProductModal({
  isOpen,
  onClose,
  products,
  loading,
  error,
  query,
  clickSource,
  analysisId,
}: ProductModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleProductClick = (product: ShoppableProduct) => {
    if (analysisId) {
      trackProductClick({
        analysisId,
        productId: product.id,
        merchantName: product.merchantName,
        clickSource,
        category: product.category,
        matchScore: product.matchScore,
        affiliateUrl: product.affiliateUrl,
      });
    }
    // Open in new tab
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-lg rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hazel/50">
                  Shop This Look
                </p>
                <p className="mt-0.5 text-sm font-semibold text-charcoal truncate max-w-[260px]">
                  {query}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-200/50 text-charcoal/40 transition-colors hover:bg-cream-200 hover:text-charcoal"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto px-6 py-4 sm:max-h-[50vh]">
              {loading && <LoadingSkeleton />}

              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center">
                  <p className="text-sm text-red-400">Couldn't load products right now.</p>
                  <p className="mt-1 text-xs text-red-300">Please try again in a moment.</p>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-charcoal/40">No matching products found.</p>
                  <p className="mt-1 text-xs text-charcoal/30">Try searching for something similar.</p>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <div className="space-y-3">
                  {products.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-cream-200 px-6 py-3">
              <p className="text-[9px] text-charcoal/25 text-center leading-relaxed">
                Affiliate links — Hazel & Hue may earn a commission at no extra cost to you.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Product Card ──────────────────────────────────────────────────

function ProductCard({
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group flex w-full items-center gap-4 rounded-2xl border border-cream-200 bg-white/70 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-hazel/5"
    >
      {/* Product image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-cream-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-6 w-6 text-charcoal/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5" />
            </svg>
          </div>
        )}

        {/* Match score badge */}
        <MatchBadge score={product.matchScore} hex={product.matchedPaletteHex} />
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-charcoal group-hover:text-hazel transition-colors">
          {product.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold text-charcoal">
            {formatPrice(product.priceInCents, product.currency)}
          </span>
          <span className="text-[10px] text-charcoal/30">
            {product.merchantName}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <svg className="h-4 w-4 flex-shrink-0 text-charcoal/20 transition-transform group-hover:translate-x-1 group-hover:text-hazel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </motion.button>
  );
}

// ─── Match Score Badge ─────────────────────────────────────────────

function MatchBadge({ score, hex }: { score: number; hex: string }) {
  const bgColor = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-charcoal/40';

  return (
    <div className="absolute -right-1 -top-1 flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 shadow-sm ring-1 ring-black/5">
      <div
        className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
        style={{ backgroundColor: hex }}
      />
      <span className={`text-[8px] font-extrabold text-white rounded-full px-1 ${bgColor}`}>
        {score}%
      </span>
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl border border-cream-200 bg-white/40 p-4">
          <div className="h-16 w-16 animate-pulse rounded-xl bg-cream-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-cream-200" />
            <div className="h-3 w-1/3 animate-pulse rounded-lg bg-cream-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
