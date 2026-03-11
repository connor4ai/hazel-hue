/**
 * ShopButton — A contextual "Shop" pill that triggers product search.
 *
 * Appears inline next to color swatches, outfit pieces, and guide items.
 * Clicking opens the ProductModal with matching products.
 */

import { motion } from 'framer-motion';

interface ShopButtonProps {
  onClick: () => void;
  /** Compact variant for tight layouts (swatches, inline items) */
  compact?: boolean;
  label?: string;
  loading?: boolean;
}

export function ShopButton({
  onClick,
  compact = false,
  label = 'Shop',
  loading = false,
}: ShopButtonProps) {
  if (compact) {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-1 rounded-full border border-hazel/20 bg-hazel/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-hazel transition-all hover:bg-hazel/10 hover:shadow-sm"
        disabled={loading}
      >
        {loading ? (
          <LoadingDots />
        ) : (
          <>
            <ShoppingBagIcon size={10} />
            {label}
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 rounded-full border border-hazel/20 bg-gradient-to-r from-hazel/5 to-hazel/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-hazel shadow-sm transition-all hover:from-hazel/10 hover:to-hazel/15 hover:shadow-md"
      disabled={loading}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <>
          <ShoppingBagIcon size={14} />
          {label}
          <ArrowRightIcon />
        </>
      )}
    </motion.button>
  );
}

function ShoppingBagIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1 w-1 rounded-full bg-hazel"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
