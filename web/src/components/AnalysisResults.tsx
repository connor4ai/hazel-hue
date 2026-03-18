import { motion } from 'framer-motion';
import { useState, useCallback, useRef } from 'react';
import type { SeasonResult, ColorSwatch, ClickSource, ProductCategory } from '../data/seasons';
import { ShopButton } from './shopping/ShopButton';
import { ProductModal } from './shopping/ProductModal';
import { ShopTab } from './shopping/ShopTab';
import { useProductSearch } from '../hooks/useShoppingApi';
import { ShareResultCardSection } from './ShareResultCard';

interface Props {
  result: SeasonResult;
  preview: string;
  onStartOver: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

type TabType = 'palette' | 'style' | 'beauty' | 'accessories' | 'inspiration' | 'shop';

const TAB_LABELS: Record<TabType, string> = {
  palette: 'Color Palette',
  style: 'Style & Lookbook',
  beauty: 'Beauty',
  accessories: 'Accessories',
  inspiration: 'Inspiration',
  shop: 'Shop Your Colors',
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section {...fadeUp} className={className}>
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel">{children}</p>
  );
}

function ColorChip({ color, size = 'md' }: { color: ColorSwatch; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-12 w-12 rounded-xl';
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClass} flex-shrink-0 shadow-md ring-1 ring-black/5`}
        style={{ backgroundColor: color.hex, boxShadow: `0 4px 12px -2px ${color.hex}40` }}
      />
      <div>
        <p className="text-sm font-medium text-charcoal">{color.name}</p>
        <p className="text-[10px] font-mono text-charcoal/30">{color.hex}</p>
      </div>
    </div>
  );
}

function Chip({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'muted' }) {
  const classes = variant === 'muted'
    ? 'border-cream-200 bg-cream-50 text-charcoal/40'
    : 'border-hazel/15 bg-hazel/5 text-hazel';
  return (
    <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold ${classes}`}>
      {children}
    </span>
  );
}

/**
 * Curate 10-12 swatches for the share card: best colors first, then fill from palette.
 */
function buildShareSwatches(result: SeasonResult): ColorSwatch[] {
  const picks: ColorSwatch[] = [];
  const seen = new Set<string>();

  // Best colors first (up to 4)
  for (const c of result.bestColors.slice(0, 4)) {
    if (!seen.has(c.hex)) { picks.push(c); seen.add(c.hex); }
  }

  // Fill remaining from full palette
  for (const c of result.palette) {
    if (picks.length >= 12) break;
    if (!seen.has(c.hex)) { picks.push(c); seen.add(c.hex); }
  }

  return picks.slice(0, 12);
}

export function AnalysisResults({ result, preview, onStartOver }: Props) {
  const [showAllColors, setShowAllColors] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('palette');
  const contentRef = useRef<HTMLDivElement>(null);

  // Shopping state
  const paletteHexes = result.palette.map((c) => c.hex);
  const { products: searchProducts, loading: searchLoading, error: searchError, query: searchQuery, search, clear: clearSearch } = useProductSearch(paletteHexes);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<ClickSource>('lookbook');

  const openShopModal = useCallback((query: string, targetHex: string | undefined, source: ClickSource, category?: ProductCategory) => {
    setModalSource(source);
    setModalOpen(true);
    search(query, targetHex, category);
  }, [search]);

  const closeShopModal = useCallback(() => {
    setModalOpen(false);
    clearSearch();
  }, [clearSearch]);

  const visiblePalette = showAllColors ? result.palette : result.palette.slice(0, 8);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero reveal */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-50 to-cream px-6 pb-20 pt-32 md:pt-40 lg:px-12">
        <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-40" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Season badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-hazel/15 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-dark" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-charcoal/70">
                Analysis Complete
              </span>
            </span>
          </motion.div>

          {/* User photo + Season name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-3xl shadow-xl shadow-hazel/15 ring-4 ring-white sm:h-28 sm:w-28">
              <img src={preview} alt="Your photo" className="h-full w-full object-cover" />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-hazel/50">
              Your Season
            </p>
            <h1 className="mt-2 font-display text-display-xl font-bold text-gradient">
              {result.season}
            </h1>
            <p className="mt-3 font-display text-xl italic text-charcoal/40">
              &ldquo;{result.tagline}&rdquo;
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-charcoal/50 leading-relaxed"
          >
            {result.description}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 inline-flex items-center gap-0 rounded-2xl border border-cream-200 bg-white/70 shadow-lg shadow-hazel/5 backdrop-blur-sm"
          >
            <div className="px-8 py-5 text-center">
              <p className="font-display text-3xl font-bold text-charcoal">{result.palette.length}</p>
              <p className="mt-1 text-xs font-medium text-charcoal/35">Colors</p>
            </div>
            <div className="h-10 w-px bg-cream-200" />
            <div className="px-8 py-5 text-center">
              <p className="font-display text-3xl font-bold text-charcoal">{result.styleTips.length}</p>
              <p className="mt-1 text-xs font-medium text-charcoal/35">Style Tips</p>
            </div>
            <div className="h-10 w-px bg-cream-200" />
            <div className="px-8 py-5 text-center">
              <p className="font-display text-lg font-bold text-charcoal">{result.metallic}</p>
              <p className="mt-1 text-xs font-medium text-charcoal/35">Best Metal</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-[72px] z-20 border-b border-cream-200 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl overflow-x-auto">
          {(Object.keys(TAB_LABELS) as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                // Scroll to top of content area so the new tab isn't pre-scrolled
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`relative flex-1 whitespace-nowrap px-4 py-4 text-center text-sm font-semibold transition-colors ${
                activeTab === tab ? 'text-hazel' : 'text-charcoal/35 hover:text-charcoal/60'
              }`}
            >
              {TAB_LABELS[tab]}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-hazel-400 to-terracotta"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="mx-auto max-w-4xl scroll-mt-[130px] px-6 py-16 lg:px-12">
        {/* ── Palette Tab ── */}
        {activeTab === 'palette' && (
          <div className="space-y-20">
            {/* Full palette */}
            <Section>
              <SectionLabel>Your Palette</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                {result.palette.length} colors curated for you
              </h2>
              <div className="mt-10 grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                {visiblePalette.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <div
                      className="aspect-square w-full rounded-2xl shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-black/15"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: `0 8px 24px -4px ${color.hex}40`,
                      }}
                    />
                    <span className="text-center text-[10px] font-semibold text-charcoal/40 sm:text-[11px]">
                      {color.name}
                    </span>
                  </motion.div>
                ))}
              </div>
              {result.palette.length > 8 && (
                <button
                  onClick={() => setShowAllColors(!showAllColors)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-hazel/20 bg-hazel/5 px-6 py-2.5 text-sm font-semibold text-hazel transition-all hover:bg-hazel/10 hover:shadow-md"
                >
                  {showAllColors ? 'Show less' : `Show all ${result.palette.length} colors`}
                  <svg className={`h-4 w-4 transition-transform ${showAllColors ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </Section>

            {/* Best colors */}
            <Section>
              <SectionLabel>Best Colors</SectionLabel>
              <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                Colors that make you shine
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {result.bestColors.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-5 rounded-2xl border border-cream-200 bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-hazel/8"
                  >
                    <div
                      className="h-16 w-16 flex-shrink-0 rounded-2xl shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: `0 8px 20px -4px ${color.hex}50`,
                      }}
                    />
                    <div>
                      <p className="font-display text-lg font-semibold text-charcoal">{color.name}</p>
                      <p className="mt-1 text-xs font-mono font-medium text-charcoal/30">{color.hex}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Colors to avoid */}
            <Section>
              <SectionLabel>Colors to Minimize</SectionLabel>
              <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                These may clash with your coloring
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {result.avoidColors.map((color) => (
                  <div
                    key={color.hex}
                    className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white/40 p-4"
                  >
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded-xl opacity-50 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium text-charcoal/40 line-through decoration-charcoal/15">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Drape Comparison */}
            {result.drapeComparisons.length > 0 && (
              <Section>
                <SectionLabel>The Drape Room</SectionLabel>
                <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                  See why your colors work
                </h2>
                <div className="mt-8 space-y-4">
                  {result.drapeComparisons.map((drape, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="h-16 w-16 rounded-2xl shadow-lg ring-1 ring-black/5"
                            style={{ backgroundColor: drape.goodHex, boxShadow: `0 8px 20px -4px ${drape.goodHex}50` }}
                          />
                          <p className="text-sm font-semibold text-charcoal">{drape.goodName}</p>
                          <span className="rounded-full bg-sage/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sage-dark">Yes</span>
                        </div>
                        <div className="text-charcoal/20">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                          </svg>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="h-16 w-16 rounded-2xl opacity-50 shadow-md ring-1 ring-black/5"
                            style={{ backgroundColor: drape.badHex }}
                          />
                          <p className="text-sm font-medium text-charcoal/40 line-through">{drape.badName}</p>
                          <span className="rounded-full bg-red-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">Avoid</span>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-sm leading-relaxed text-charcoal/50">
                        {drape.explanation}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}

        {/* ── Style & Lookbook Tab ── */}
        {activeTab === 'style' && (
          <div className="space-y-20">
            {/* Style Tips */}
            <Section>
              <SectionLabel>Style Tips</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                How to wear your colors
              </h2>
              <div className="mt-8 space-y-4">
                {result.styleTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-5 rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-hazel/5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hazel-100 to-hazel-200 font-display text-sm font-bold text-hazel shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-[15px] leading-relaxed text-charcoal/60">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Lookbook */}
            <Section>
              <SectionLabel>Your Lookbook</SectionLabel>
              <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                Complete outfits in your palette
              </h2>
              <div className="mt-8 space-y-6">
                {result.styleGuide.outfits.map((outfit, i) => (
                  <motion.div
                    key={outfit.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-hazel text-xs font-bold text-white">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="font-display text-lg font-semibold text-hazel">{outfit.name}</p>
                        <p className="mt-0.5 text-sm italic text-charcoal/40">{outfit.description}</p>
                      </div>
                    </div>
                    {/* Color strip */}
                    <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                      {outfit.pieces.map((p, j) => (
                        <div key={j} className="flex-1" style={{ backgroundColor: p.color.hex }} />
                      ))}
                    </div>
                    {/* Pieces */}
                    <div className="mt-4 space-y-2">
                      {outfit.pieces.map((piece, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div
                            className="h-9 w-9 flex-shrink-0 rounded-lg shadow-sm ring-1 ring-black/5"
                            style={{ backgroundColor: piece.color.hex }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-charcoal">{piece.item}</p>
                            <p className="text-[10px] text-charcoal/35">{piece.color.name}</p>
                          </div>
                          <ShopButton
                            compact
                            onClick={() => openShopModal(piece.item, piece.color.hex, 'lookbook', 'clothing')}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Patterns & Fabrics */}
            <Section>
              <SectionLabel>Patterns & Fabrics</SectionLabel>
              <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                Materials that complement you
              </h2>
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Best Patterns</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.styleGuide.bestPatterns.map((p) => <Chip key={p}>{p}</Chip>)}
                  </div>
                </div>
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Best Fabrics</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.styleGuide.bestFabrics.map((f) => <Chip key={f}>{f}</Chip>)}
                  </div>
                </div>
                <div className="rounded-2xl border border-cream-200 bg-white/40 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">Patterns to Skip</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.styleGuide.patternsToAvoid.map((p) => <Chip key={p} variant="muted">{p}</Chip>)}
                  </div>
                </div>
              </div>
            </Section>

            {/* Celebrity matches */}
            {result.celebrities.length > 0 && (
              <Section>
                <SectionLabel>Celebrity Matches</SectionLabel>
                <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                  Stars with your season
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {result.celebrities.map((celeb) => (
                    <span
                      key={celeb}
                      className="rounded-full border border-cream-200 bg-white/70 px-6 py-3 text-sm font-semibold text-charcoal/60 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                    >
                      {celeb}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}

        {/* ── Beauty Tab ── */}
        {activeTab === 'beauty' && (
          <div className="space-y-20">
            {/* Makeup Guide */}
            <Section>
              <SectionLabel>Makeup Guide</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                Beauty recommendations
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {result.makeupTips.map((tip, i) => (
                  <motion.div
                    key={tip.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-hazel/5"
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-hazel">
                        {tip.category}
                      </p>
                      <ShopButton
                        compact
                        label={`Shop ${tip.category}`}
                        onClick={() => openShopModal(`${tip.category} ${tip.recommendation}`, undefined, 'makeup_guide', 'makeup')}
                      />
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-charcoal/55">
                      {tip.recommendation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Hair Guide */}
            <Section>
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Hair Guide</SectionLabel>
                  <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                    What to ask for at the salon
                  </h2>
                </div>
                <ShopButton
                  label="Shop Hair Color"
                  onClick={() => openShopModal(`${result.season} hair color products`, undefined, 'hair_guide', 'hair')}
                />
              </div>
              <div className="mt-8 space-y-6">
                {/* Hair color strip */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Best Hair Colors</p>
                  <div className="mt-4 flex h-8 overflow-hidden rounded-full">
                    {result.hair.bestColors.map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    {result.hair.bestColors.map((c, i) => (
                      <p key={i} className="flex-1 text-center text-[10px] text-charcoal/40">{c.name}</p>
                    ))}
                  </div>
                </div>

                {/* Highlights & Lowlights */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-300" />
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Highlights</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/55">{result.hair.highlightRecommendation}</p>
                  </div>
                  <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-700 to-amber-900" />
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Lowlights</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/55">{result.hair.lowlightRecommendation}</p>
                  </div>
                </div>

                {/* Salon terminology */}
                {result.hair.salonTerminology.length > 0 && (
                  <div className="rounded-2xl border border-cream-200 bg-gradient-to-br from-white/80 to-hazel/5 p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-hazel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Show Your Stylist</p>
                    </div>
                    <p className="mt-1 text-[11px] text-charcoal/35">Use these exact terms at the salon</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.hair.salonTerminology.map((term) => <Chip key={term}>{term}</Chip>)}
                    </div>
                  </div>
                )}

                {/* Colors to avoid */}
                {result.hair.colorsToAvoid.length > 0 && (
                  <div className="rounded-2xl border border-cream-200 bg-white/40 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">Hair Colors to Avoid</p>
                    <div className="mt-4 flex h-6 overflow-hidden rounded-full opacity-50">
                      {result.hair.colorsToAvoid.map((c, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                    <div className="mt-2 flex">
                      {result.hair.colorsToAvoid.map((c, i) => (
                        <p key={i} className="flex-1 text-center text-[10px] text-charcoal/30 line-through">{c.name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>

            {/* Nail Polish Guide */}
            <Section>
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Nail Polish Guide</SectionLabel>
                  <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                    Shades curated for your hands
                  </h2>
                </div>
                <ShopButton
                  label="Shop Nails"
                  onClick={() => openShopModal(`nail polish ${result.season}`, undefined, 'nail_guide', 'nails')}
                />
              </div>
              <div className="mt-8 space-y-6">
                {/* Everyday shades */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Everyday Shades</p>
                  <div className="mt-4 flex flex-wrap gap-6 justify-center">
                    {result.nails.everyday.map((shade) => (
                      <div key={shade.hex} className="flex flex-col items-center gap-2">
                        <div
                          className="h-14 w-8 rounded-t-lg rounded-b-2xl shadow-lg ring-1 ring-black/5"
                          style={{ backgroundColor: shade.hex, boxShadow: `0 6px 16px -3px ${shade.hex}50` }}
                        />
                        <p className="text-[10px] font-medium text-charcoal/50">{shade.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statement shades */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Statement Shades</p>
                  <div className="mt-4 flex flex-wrap gap-6 justify-center">
                    {result.nails.statement.map((shade) => (
                      <div key={shade.hex} className="flex flex-col items-center gap-2">
                        <div
                          className="h-14 w-8 rounded-t-lg rounded-b-2xl shadow-lg ring-1 ring-black/5"
                          style={{ backgroundColor: shade.hex, boxShadow: `0 6px 16px -3px ${shade.hex}50` }}
                        />
                        <p className="text-[10px] font-medium text-charcoal/50">{shade.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* French tip */}
                <div className="rounded-2xl border border-cream-200 bg-gradient-to-br from-white/80 to-hazel/5 p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-10">
                      {/* Nail shape with french tip */}
                      <div className="absolute inset-0 rounded-t-lg rounded-b-[1.25rem] bg-gradient-to-b from-pink-100 to-pink-50" />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-4 rounded-b-[1.25rem]"
                        style={{ backgroundColor: result.nails.frenchTip.hex }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">Your French Tip</p>
                      <p className="mt-1 font-display text-lg font-semibold text-hazel">{result.nails.frenchTip.name}</p>
                    </div>
                  </div>
                </div>

                {/* Avoid shades */}
                <div className="rounded-2xl border border-cream-200 bg-white/40 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">Shades to Skip</p>
                  <div className="mt-4 flex flex-wrap gap-6 justify-center">
                    {result.nails.avoidShades.map((shade) => (
                      <div key={shade.hex} className="flex flex-col items-center gap-2 opacity-50">
                        <div
                          className="h-14 w-8 rounded-t-lg rounded-b-2xl shadow-sm ring-1 ring-black/5"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <p className="text-[10px] font-medium text-charcoal/30 line-through">{shade.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ── Accessories Tab ── */}
        {activeTab === 'accessories' && (
          <div className="space-y-20">
            {/* Jewelry Guide */}
            <Section>
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Jewelry & Metals</SectionLabel>
                  <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                    Metals and stones that complement you
                  </h2>
                </div>
                <ShopButton
                  label="Shop Jewelry"
                  onClick={() => openShopModal(`${result.jewelry.bestMetals[0]} jewelry`, undefined, 'jewelry_guide', 'jewelry')}
                />
              </div>
              <div className="mt-8 space-y-6">
                {/* Best metals */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Your Best Metals</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {result.jewelry.bestMetals.map((metal) => (
                      <button
                        key={metal}
                        onClick={() => openShopModal(`${metal} jewelry`, undefined, 'jewelry_guide', 'jewelry')}
                        className="group rounded-2xl border border-cream-200 bg-gradient-to-br from-white to-cream-50 px-5 py-3 text-sm font-semibold text-charcoal shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-hazel/20"
                      >
                        {metal}
                        <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-hazel/50 opacity-0 transition-opacity group-hover:opacity-100">Shop</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metals to minimize */}
                <div className="rounded-2xl border border-cream-200 bg-white/40 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40">Metals to Minimize</p>
                  <p className="mt-2 text-sm text-charcoal/40">{result.jewelry.metalsToMinimize.join(' · ')}</p>
                </div>

                {/* Gemstones */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Recommended Gemstones</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.jewelry.gemstoneRecommendations.map((gem) => (
                      <span key={gem} className="inline-flex items-center gap-1.5 rounded-full border border-hazel/15 bg-hazel/5 px-4 py-1.5 text-xs font-semibold text-hazel">
                        <svg className="h-3 w-3 opacity-50" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M3 2h8l3 4-7 8-7-8 3-4z" />
                        </svg>
                        {gem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Accessories */}
            <Section>
              <div className="flex items-start justify-between">
                <div>
                  <SectionLabel>Accessories</SectionLabel>
                  <h2 className="mt-3 font-display text-display-sm font-bold text-charcoal">
                    Complete your look
                  </h2>
                </div>
                <ShopButton
                  label="Shop Accessories"
                  onClick={() => openShopModal(`${result.season} accessories`, undefined, 'accessory_guide', 'accessories')}
                />
              </div>
              <div className="mt-8 space-y-6">
                {/* Sunglasses */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Sunglasses Frames</p>
                  <p className="mt-2 text-sm text-charcoal/55">{result.accessories.sunglassesFrames.join(' · ')}</p>
                </div>

                {/* Bags */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Bag Colors</p>
                  <div className="mt-4 space-y-3">
                    {result.accessories.bagColors.map((c) => <ColorChip key={c.hex} color={c} size="sm" />)}
                  </div>
                </div>

                {/* Scarves */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Scarves & Wraps</p>
                  <div className="mt-4 space-y-3">
                    {result.accessories.scarfColors.map((c) => <ColorChip key={c.hex} color={c} size="sm" />)}
                  </div>
                </div>

                {/* Shoes */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Shoe Colors</p>
                  <div className="mt-4 space-y-3">
                    {result.accessories.shoeColors.map((c) => <ColorChip key={c.hex} color={c} size="sm" />)}
                  </div>
                </div>

                {/* Belts */}
                <div className="rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-hazel">Belts</p>
                  <p className="mt-2 text-sm text-charcoal/55">{result.accessories.beltColors.join(' · ')}</p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ── Inspiration Tab ── */}
        {activeTab === 'inspiration' && (
          <div className="space-y-20">
            {/* Pinterest Boards */}
            <Section>
              <SectionLabel>Curated Inspiration</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                Hand-picked {result.season} boards
              </h2>
              <div className="mt-8 space-y-4">
                {/* Makeup board */}
                <a
                  href={result.pinterest.makeup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-hazel/8"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 shadow-sm">
                    <svg className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold text-charcoal">{result.season} Makeup</p>
                    <p className="mt-0.5 text-sm text-charcoal/40">Lipstick, eyeshadow & blush looks curated for your palette</p>
                  </div>
                  <svg className="h-5 w-5 text-charcoal/25 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>

                {/* Outfits board */}
                <a
                  href={result.pinterest.outfits}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-cream-200 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-hazel/8"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 shadow-sm">
                    <svg className="h-7 w-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold text-charcoal">{result.season} Outfits</p>
                    <p className="mt-0.5 text-sm text-charcoal/40">Complete outfits, color combos & seasonal styling in your colors</p>
                  </div>
                  <svg className="h-5 w-5 text-charcoal/25 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </Section>
          </div>
        )}

        {/* ── Shop Your Colors Tab ── */}
        {activeTab === 'shop' && (
          <ShopTab
            season={result.season}
            palette={result.palette}
          />
        )}

        {/* ── Shareable Palette Card ── */}
        <div className="mt-24">
          <ShareResultCardSection
            season={result.season}
            tagline={result.tagline}
            swatches={buildShareSwatches(result)}
            celebrityName={result.celebrities[0] ?? 'someone iconic'}
          />
        </div>

        {/* Actions footer */}
        <Section className="mt-24 text-center">
          <div className="rounded-3xl border border-cream-200 bg-gradient-to-b from-white/80 to-cream-50/60 px-8 py-14 shadow-lg shadow-hazel/5">
            <h2 className="font-display text-display-sm font-bold text-charcoal">
              Want to save your results?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-charcoal/45 leading-relaxed">
              Download the Hazel & Hue app to save your palette, get outfit ideas,
              and access your color guide anytime.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://apps.apple.com/app/hazel-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-charcoal px-8 py-4 text-sm font-semibold text-cream-50 shadow-lg shadow-charcoal/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.hazelhue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-cream-300 bg-white px-8 py-4 text-sm font-semibold text-charcoal shadow-sm transition-all hover:-translate-y-0.5 hover:bg-cream-50 hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.433.289.744.765.744 1.19 0 .425-.311.901-.744 1.19l-2.56 1.484-2.544-2.544 2.802-2.622zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
                </svg>
                Google Play
              </a>
            </div>
            <div className="mt-8">
              <button
                onClick={onStartOver}
                className="text-sm font-semibold text-charcoal/35 underline-offset-4 transition hover:text-hazel hover:underline"
              >
                Try with a different photo
              </button>
            </div>
          </div>
        </Section>
      </div>

      {/* Product search modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeShopModal}
        products={searchProducts}
        loading={searchLoading}
        error={searchError}
        query={searchQuery}
        clickSource={modalSource}
      />

      {/* FTC Disclosure */}
      <div className="border-t border-cream-200 bg-cream-50/50 px-6 py-4 text-center">
        <p className="mx-auto max-w-2xl text-[10px] text-charcoal/25 leading-relaxed">
          Some links on this page are affiliate links. Hazel & Hue may earn a small commission
          at no extra cost to you when you make a purchase through these links. This does not
          influence our color recommendations.
        </p>
      </div>
    </div>
  );
}
