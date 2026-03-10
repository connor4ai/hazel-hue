import { motion } from 'framer-motion';

const PALETTE_COLORS = [
  { hex: '#C67B5C', label: 'Terracotta' },
  { hex: '#D4A5A5', label: 'Dusty Rose' },
  { hex: '#A8B5A0', label: 'Sage' },
  { hex: '#8B6F47', label: 'Hazel' },
  { hex: '#B19CD9', label: 'Lavender' },
  { hex: '#7B2D5F', label: 'Plum' },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden px-6 pb-20 pt-32 md:pt-40 lg:px-12">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-radial from-dusty-rose/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-radial from-sage-light/25 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-radial from-hazel-100/40 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-4 py-1.5 text-xs font-medium tracking-wide text-sage-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-dark" />
                AI-Powered Color Analysis
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-display-xl font-bold text-charcoal"
            >
              Discover the colors
              <br />
              <span className="text-gradient italic">made for you</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/60"
            >
              Upload a selfie. In under a minute, get your seasonal color palette,
              style guide, makeup & hair recommendations — all personalized to your
              unique coloring. Completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#get-started"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-charcoal px-8 py-4 text-sm font-semibold text-cream-50 transition-all hover:shadow-2xl hover:shadow-charcoal/20"
              >
                <span className="relative z-10">Get My Colors — Free</span>
                <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-hazel transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <span className="text-sm text-charcoal/40">
                Share with 2 friends to unlock
              </span>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-12 flex items-center gap-5"
            >
              <div className="flex -space-x-3">
                {['#C67B5C', '#B19CD9', '#7B2D5F', '#FF8C69', '#A8B5A0'].map((color, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-[3px] border-cream"
                    style={{ backgroundColor: color, zIndex: 5 - i }}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">2,400+ analyses</p>
                <div className="mt-0.5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-charcoal/40">4.8 average</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating palette card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Main card */}
              <div className="card-hover rounded-3xl border border-cream-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-hazel/60">
                    Your Season
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-charcoal">
                    Soft Autumn
                  </p>
                  <p className="mt-1 font-display text-sm italic text-charcoal/40">
                    "Golden warmth meets earthy elegance"
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {PALETTE_COLORS.map((color, i) => (
                    <motion.div
                      key={color.hex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div
                        className="aspect-square w-full rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] font-medium text-charcoal/40">{color.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-charcoal/30">
                  <div className="h-px flex-1 bg-cream-200" />
                  + 24 more in your palette
                  <div className="h-px flex-1 bg-cream-200" />
                </div>
              </div>

              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 -top-6 h-20 w-20 rounded-2xl bg-dusty-rose/20 backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-sage/20 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
