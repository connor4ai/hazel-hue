import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

const PREVIEW_PALETTE = [
  { hex: '#C67B5C', name: 'Burnt Sienna' },
  { hex: '#D4A574', name: 'Warm Sand' },
  { hex: '#8B6F47', name: 'Hazelnut' },
  { hex: '#A0845C', name: 'Golden Oak' },
  { hex: '#D4A5A5', name: 'Dusty Rose' },
  { hex: '#7B8E6F', name: 'Sage Leaf' },
  { hex: '#9B4F3A', name: 'Terracotta' },
  { hex: '#B8860B', name: 'Dark Gold' },
];

const FEATURES_TOP = [
  {
    title: 'Your Color Story',
    description: 'A personalized narrative explaining why these colors harmonize with your natural features.',
    gradient: 'from-hazel-100/80 to-hazel-50/40',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Style Lookbook',
    description: 'Curated outfit concepts for every occasion — work, weekend, date night — with exact color recs.',
    gradient: 'from-dusty-rose/20 to-dusty-rose/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Makeup Guide',
    description: 'Foundation tone, 6 lip shades from nude to bold, eyeshadows, blush, and your one perfect red.',
    gradient: 'from-sage/20 to-sage/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Hair Color Guide',
    description: 'Best shades, colors to avoid, highlight and lowlight recs, plus salon terminology to bring.',
    gradient: 'from-lavender/15 to-lavender/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const FEATURES_BOTTOM = [
  {
    title: 'Jewelry & Metals',
    description: 'Best metals, gemstones, and pieces that complement your coloring.',
    gradient: 'from-hazel-100/60 to-hazel-50/30',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Nail Polish Guide',
    description: 'Everyday nudes, statement shades, your French tip, and colors to skip.',
    gradient: 'from-dusty-rose/15 to-dusty-rose/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Accessories',
    description: 'Sunglasses frames, bag colors, scarves, shoes, and belts curated for your palette.',
    gradient: 'from-sage/15 to-sage/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Drape Comparison',
    description: 'Side-by-side showing exactly how your best and worst colors frame your face.',
    gradient: 'from-lavender/10 to-lavender/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const BONUS_FEATURES = [
  {
    title: 'Pinterest Inspiration',
    description: 'Curated mood boards for your season — makeup looks and outfit ideas hand-picked by our stylists.',
    gradient: 'from-terracotta/10 to-terracotta/5',
    span: 'sm:col-span-2',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Celebrity Season Twins',
    description: 'Discover which celebrities share your season and see how they wear your colors.',
    gradient: 'from-plum/10 to-plum/5',
    span: 'sm:col-span-1',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Share Your Colors',
    description: 'Instagram-ready story cards and easy sharing to show friends your results.',
    gradient: 'from-coral/10 to-coral/5',
    span: 'sm:col-span-1',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function PaletteCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d"
    >
      <div className="rounded-[2rem] border border-cream-200/80 bg-white/80 p-8 shadow-2xl shadow-hazel/8 backdrop-blur-sm md:p-10">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-hazel/40">
            Example Result
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-charcoal">
            Soft Autumn
          </p>
          <p className="mt-1 font-display text-sm italic text-charcoal/35">
            &ldquo;Golden warmth meets earthy elegance&rdquo;
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-3">
          {PREVIEW_PALETTE.map((color, i) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="aspect-square w-full rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:rounded-2xl"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[9px] font-medium text-charcoal/25">{color.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
          <span className="text-xs italic text-charcoal/20">+ 22 more in your palette</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof FEATURES_TOP[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card group relative overflow-hidden rounded-2xl p-6"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="relative flex gap-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100 text-hazel transition-all duration-500 group-hover:bg-hazel group-hover:text-cream-50 group-hover:shadow-lg group-hover:shadow-hazel/20">
          {feature.icon}
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-charcoal">
            {feature.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-charcoal/45">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsPreview() {
  return (
    <section id="results" className="relative px-6 py-32 lg:px-12">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/80 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel"
          >
            What You Get
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-display-lg font-bold text-charcoal text-balance"
          >
            Not just a palette —
            <br className="hidden sm:block" />
            your <span className="italic text-gradient">complete color guide</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-charcoal/40"
          >
            10 personalized guides covering every aspect of your color journey — from makeup to nails to accessories.
          </motion.p>
        </div>

        {/* 3D tilt palette preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-xl"
        >
          <PaletteCard />
        </motion.div>

        {/* Primary features - 2x2 grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {FEATURES_TOP.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Secondary features - 2x2 grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {FEATURES_BOTTOM.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i + FEATURES_TOP.length} />
          ))}
        </div>

        {/* Bonus features - 3 column grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {BONUS_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`bento-card group relative overflow-hidden rounded-2xl p-6 ${feature.span}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative flex gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100 text-hazel transition-all duration-500 group-hover:bg-hazel group-hover:text-cream-50 group-hover:shadow-lg group-hover:shadow-hazel/20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/45">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total count callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-full border border-cream-200 bg-white/60 px-6 py-3 backdrop-blur-sm"
        >
          <svg className="h-4 w-4 text-hazel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-charcoal/50">
            <span className="font-bold text-charcoal/70">10 personalized guides</span> — all from one selfie
          </span>
        </motion.div>
      </div>
    </section>
  );
}
