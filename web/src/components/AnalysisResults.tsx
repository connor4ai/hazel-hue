import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SeasonResult } from '../data/seasons';

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

export function AnalysisResults({ result, preview, onStartOver }: Props) {
  const [showAllColors, setShowAllColors] = useState(false);
  const [activeTab, setActiveTab] = useState<'palette' | 'style' | 'beauty'>('palette');

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
            <h1 className="mt-2 font-display text-display-xl font-bold text-charcoal">
              {result.season}
            </h1>
            <p className="mt-2 font-display text-lg italic text-charcoal/35">
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
            className="mx-auto mt-8 flex max-w-sm justify-center divide-x divide-cream-200"
          >
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text-charcoal">{result.palette.length}</p>
              <p className="mt-0.5 text-xs text-charcoal/35">Colors</p>
            </div>
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text-charcoal">{result.styleTips.length}</p>
              <p className="mt-0.5 text-xs text-charcoal/35">Style Tips</p>
            </div>
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text-charcoal">{result.metallic}</p>
              <p className="mt-0.5 text-xs text-charcoal/35">Best Metal</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-[72px] z-20 border-b border-cream-200 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl">
          {(['palette', 'style', 'beauty'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 px-4 py-4 text-center text-sm font-semibold transition-colors ${
                activeTab === tab ? 'text-hazel' : 'text-charcoal/35 hover:text-charcoal/60'
              }`}
            >
              {tab === 'palette' && 'Color Palette'}
              {tab === 'style' && 'Style Guide'}
              {tab === 'beauty' && 'Makeup & Hair'}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-hazel"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-12">
        {/* Palette Tab */}
        {activeTab === 'palette' && (
          <div className="space-y-16">
            {/* Full palette */}
            <Section>
              <SectionLabel>Your Palette</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                {result.palette.length} colors curated for you
              </h2>
              <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                {visiblePalette.map((color, i) => (
                  <motion.div
                    key={color.hex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className="aspect-square w-full rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rounded-2xl group-hover:shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-center text-[9px] font-medium text-charcoal/30 sm:text-[10px]">
                      {color.name}
                    </span>
                  </motion.div>
                ))}
              </div>
              {result.palette.length > 8 && (
                <button
                  onClick={() => setShowAllColors(!showAllColors)}
                  className="mt-6 text-sm font-medium text-hazel underline-offset-4 transition hover:underline"
                >
                  {showAllColors ? 'Show less' : `Show all ${result.palette.length} colors`}
                </button>
              )}
            </Section>

            {/* Best colors */}
            <Section>
              <SectionLabel>Best Colors</SectionLabel>
              <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
                Colors that make you shine
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {result.bestColors.map((color) => (
                  <div
                    key={color.hex}
                    className="flex items-center gap-4 rounded-2xl border border-cream-200 bg-white/60 p-4 transition-all hover:bg-white/90 hover:shadow-md hover:shadow-hazel/5"
                  >
                    <div
                      className="h-14 w-14 flex-shrink-0 rounded-xl shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="font-semibold text-charcoal">{color.name}</p>
                      <p className="mt-0.5 text-xs font-mono text-charcoal/30">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Colors to avoid */}
            <Section>
              <SectionLabel>Colors to Minimize</SectionLabel>
              <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
                These may clash with your coloring
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {result.avoidColors.map((color) => (
                  <div
                    key={color.hex}
                    className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white/40 p-4"
                  >
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded-lg opacity-50 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm text-charcoal/40 line-through decoration-charcoal/15">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Style Tab */}
        {activeTab === 'style' && (
          <div className="space-y-16">
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
                    className="flex gap-4 rounded-2xl border border-cream-200 bg-white/60 p-5"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-hazel/10 text-sm font-bold text-hazel">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-charcoal/60">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section>
              <SectionLabel>Best Metal</SectionLabel>
              <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
                Jewelry & accessories
              </h2>
              <div className="mt-6 rounded-2xl border border-cream-200 bg-white/60 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-hazel-100 to-hazel-200 text-hazel">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-charcoal">{result.metallic}</p>
                    <p className="mt-0.5 text-sm text-charcoal/40">Your most harmonizing metal tone</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Celebrity matches */}
            {result.celebrities.length > 0 && (
              <Section>
                <SectionLabel>Celebrity Matches</SectionLabel>
                <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
                  Stars with your season
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {result.celebrities.map((celeb) => (
                    <span
                      key={celeb}
                      className="rounded-full border border-cream-200 bg-white/60 px-5 py-2.5 text-sm font-medium text-charcoal/60"
                    >
                      {celeb}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}

        {/* Beauty Tab */}
        {activeTab === 'beauty' && (
          <div className="space-y-16">
            <Section>
              <SectionLabel>Makeup Guide</SectionLabel>
              <h2 className="mt-3 font-display text-display-md font-bold text-charcoal">
                Beauty recommendations
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {result.makeupTips.map((tip, i) => (
                  <motion.div
                    key={tip.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-cream-200 bg-white/60 p-5 transition-all hover:bg-white/90 hover:shadow-md hover:shadow-hazel/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-hazel/60">
                      {tip.category}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                      {tip.recommendation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Section>

            <Section>
              <SectionLabel>Hair Colors</SectionLabel>
              <h2 className="mt-3 font-display text-xl font-bold text-charcoal">
                Flattering hair shades
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {result.hairColors.map((color) => (
                  <div
                    key={color.hex}
                    className="flex items-center gap-4 rounded-2xl border border-cream-200 bg-white/60 p-4"
                  >
                    <div
                      className="h-12 w-12 flex-shrink-0 rounded-xl shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="font-medium text-charcoal">{color.name}</p>
                      <p className="mt-0.5 text-xs font-mono text-charcoal/25">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Actions footer */}
        <Section className="mt-20 text-center">
          <div className="rounded-3xl border border-cream-200 bg-white/60 px-8 py-12">
            <h2 className="font-display text-xl font-bold text-charcoal">
              Want to save your results?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-charcoal/40">
              Download the Hazel & Hue app to save your palette, get outfit ideas,
              and access your color guide anytime.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://apps.apple.com/app/hazel-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold text-cream-50 shadow-lg transition-all hover:shadow-xl"
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
                className="inline-flex items-center gap-2.5 rounded-full border border-cream-300 bg-white px-8 py-3.5 text-sm font-semibold text-charcoal transition-all hover:bg-cream-50 hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.433.289.744.765.744 1.19 0 .425-.311.901-.744 1.19l-2.56 1.484-2.544-2.544 2.802-2.622zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
                </svg>
                Google Play
              </a>
            </div>
            <div className="mt-6">
              <button
                onClick={onStartOver}
                className="text-sm font-medium text-charcoal/35 underline-offset-4 transition hover:text-hazel hover:underline"
              >
                Try with a different photo
              </button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
