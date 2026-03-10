import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const PALETTE_COLORS = [
  { hex: '#C67B5C', label: 'Terracotta' },
  { hex: '#D4A5A5', label: 'Dusty Rose' },
  { hex: '#A8B5A0', label: 'Sage' },
  { hex: '#8B6F47', label: 'Hazel' },
  { hex: '#B19CD9', label: 'Lavender' },
  { hex: '#7B2D5F', label: 'Plum' },
];

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px]">
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[40px] bg-charcoal p-3 shadow-2xl shadow-charcoal/30">
        <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-charcoal" />
        {/* Screen content */}
        <div className="relative overflow-hidden rounded-[28px] bg-cream">
          {/* Mini app screen */}
          <div className="px-5 pb-8 pt-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-center text-[8px] font-medium uppercase tracking-[0.3em] text-hazel/50"
            >
              Your Season
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 text-center font-display text-xl font-bold text-charcoal"
            >
              Soft Autumn
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="mt-0.5 text-center font-display text-[10px] italic text-charcoal/40"
            >
              &ldquo;Golden warmth meets earthy elegance&rdquo;
            </motion.p>

            {/* Color grid */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {PALETTE_COLORS.map((color, i) => (
                <motion.div
                  key={color.hex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="aspect-square w-full rounded-xl"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[7px] font-medium text-charcoal/30">{color.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="mt-4 flex items-center gap-2"
            >
              <div className="h-px flex-1 bg-cream-200" />
              <span className="text-[8px] text-charcoal/25">+ 24 more colors</span>
              <div className="h-px flex-1 bg-cream-200" />
            </motion.div>

            {/* Bottom action */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 rounded-xl bg-charcoal py-2.5 text-center"
            >
              <span className="text-[10px] font-semibold text-cream-50">View Full Palette</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 75, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 75, damping: 30 });

  const gradientX = useTransform(springX, [-1, 1], ['35%', '65%']);
  const gradientY = useTransform(springY, [-1, 1], ['35%', '65%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = (e.clientY - rect.top) / rect.height * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden px-6 pb-24 pt-32 md:pt-40 lg:px-12">
      {/* Soft gradient background — clean, no animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-[800px] w-[800px] rounded-full bg-gradient-radial from-dusty-rose/20 via-transparent to-transparent blur-3xl"
          style={{ left: gradientX, top: gradientY, x: '-50%', y: '-50%' }}
        />
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-radial from-dusty-rose/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-radial from-sage-light/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-radial from-hazel-100/30 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-hazel/15 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-dark" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-charcoal/70">
                  AI-Powered Color Analysis
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-display-2xl font-bold text-charcoal"
            >
              Discover
              <br />
              the colors
              <br />
              <span className="text-gradient-animated italic">made for you</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md text-lg leading-relaxed text-charcoal/55"
            >
              Upload a selfie. In under a minute, get your seasonal color palette,
              style guide, and beauty recommendations — personalized to your
              unique coloring.{' '}
              <span className="font-semibold text-charcoal/70">Completely free.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#get-started"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-charcoal px-10 py-4.5 text-sm font-semibold text-cream-50 shadow-xl shadow-charcoal/15 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal/25"
              >
                <span className="relative z-10">Get My Colors — Free</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-hazel-400 to-hazel-500 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <span className="text-sm text-charcoal/35">
                Share with 2 friends to unlock
              </span>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-14 flex items-center gap-5"
            >
              <div className="flex -space-x-3">
                {['#C67B5C', '#B19CD9', '#7B2D5F', '#FF8C69', '#A8B5A0'].map((color, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-[3px] border-cream shadow-sm"
                    style={{ backgroundColor: color, zIndex: 5 - i }}
                  />
                ))}
              </div>
              <div className="border-l border-cream-200 pl-5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-charcoal">2,400+</span>
                  <span className="text-sm text-charcoal/40">analyses</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs font-medium text-charcoal/40">4.8</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Phone mockup — clean entrance, no perpetual float */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-sm">
              {/* Subtle static glow behind phone */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-hazel-200/30 via-dusty-rose/15 to-transparent blur-3xl" />

              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
