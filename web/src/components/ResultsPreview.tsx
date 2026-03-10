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

const FEATURES = [
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
    description: 'Curated outfit concepts for every occasion, with exact color recommendations.',
    gradient: 'from-dusty-rose/20 to-dusty-rose/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Makeup & Hair',
    description: 'Foundation shades, lip colors, eyeshadow palettes, and hair color recs.',
    gradient: 'from-sage/20 to-sage/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Drape Comparison',
    description: 'Side-by-side showing exactly how your best and worst colors frame your face.',
    gradient: 'from-lavender/15 to-lavender/5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
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
            More than a quiz —
            <br className="hidden sm:block" />
            a complete <span className="italic text-gradient">color guide</span>
          </motion.h2>
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

        {/* Feature bento grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Hover gradient */}
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
      </div>
    </section>
  );
}
