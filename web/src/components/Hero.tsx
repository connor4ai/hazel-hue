import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PALETTE_COLORS = [
  { hex: '#C67B5C', label: 'Terracotta' },
  { hex: '#D4A5A5', label: 'Dusty Rose' },
  { hex: '#A8B5A0', label: 'Sage' },
  { hex: '#8B6F47', label: 'Hazel' },
  { hex: '#B19CD9', label: 'Lavender' },
  { hex: '#7B2D5F', label: 'Plum' },
];

const BEST_COLORS = [
  { hex: '#C67B5C', name: 'Terracotta' },
  { hex: '#D4A5A5', name: 'Dusty Rose' },
  { hex: '#A8B5A0', name: 'Sage' },
  { hex: '#DAB78A', name: 'Warm Gold' },
  { hex: '#8B6F47', name: 'Hazel' },
  { hex: '#C4956A', name: 'Camel' },
];

const AVOID_COLORS = [
  { hex: '#FF1493', name: 'Hot Pink' },
  { hex: '#00CED1', name: 'Bright Teal' },
  { hex: '#7FFF00', name: 'Chartreuse' },
];

function IPhoneMockup() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mouseX.set(x);
      mouseY.set(y);
    };
    const handleMouseLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    };
    const el = phoneRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  // Clock time
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={phoneRef} className="iphone-perspective" style={{ perspective: '1200px' }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative mx-auto w-[285px]"
      >
        {/* Outer titanium frame */}
        <div className="iphone-frame relative rounded-[52px] p-[2px]">
          {/* Inner frame with screen bezel */}
          <div className="relative overflow-hidden rounded-[50px] bg-[#1a1a1a] p-[10px]">

            {/* Side buttons - volume */}
            <div className="absolute -left-[3.5px] top-[100px] h-[28px] w-[3px] rounded-l-sm bg-gradient-to-b from-[#8a8a8e] via-[#a0a0a5] to-[#8a8a8e]" />
            <div className="absolute -left-[3.5px] top-[138px] h-[28px] w-[3px] rounded-l-sm bg-gradient-to-b from-[#8a8a8e] via-[#a0a0a5] to-[#8a8a8e]" />
            {/* Side button - power */}
            <div className="absolute -right-[3.5px] top-[120px] h-[40px] w-[3px] rounded-r-sm bg-gradient-to-b from-[#8a8a8e] via-[#a0a0a5] to-[#8a8a8e]" />
            {/* Silent switch */}
            <div className="absolute -left-[3.5px] top-[72px] h-[16px] w-[3px] rounded-l-sm bg-gradient-to-b from-[#8a8a8e] via-[#a0a0a5] to-[#8a8a8e]" />

            {/* Screen */}
            <div className="relative overflow-hidden rounded-[40px] bg-cream">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[10px] z-30 -translate-x-1/2">
                <div className="flex h-[28px] w-[100px] items-center justify-center rounded-full bg-black">
                  {/* Camera lens */}
                  <div className="ml-auto mr-3 h-[10px] w-[10px] rounded-full bg-[#1a1a2e] ring-1 ring-[#2a2a3a]">
                    <div className="ml-[2px] mt-[2px] h-[3px] w-[3px] rounded-full bg-[#191970]/40" />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="relative z-20 flex items-center justify-between bg-cream px-7 pb-1 pt-[14px]">
                <span className="text-[11px] font-semibold text-charcoal">{time}</span>
                <div className="flex items-center gap-[5px]">
                  {/* Signal bars */}
                  <svg className="h-[11px] w-[15px] text-charcoal" viewBox="0 0 16 12" fill="currentColor">
                    <rect x="0" y="9" width="3" height="3" rx="0.5" />
                    <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
                    <rect x="9" y="3" width="3" height="9" rx="0.5" />
                    <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3" />
                  </svg>
                  {/* WiFi */}
                  <svg className="h-[11px] w-[13px] text-charcoal" viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                    <path d="M4.46 7.88a5 5 0 017.08 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M1.81 5.23a9 9 0 0112.38 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center gap-[1px]">
                    <div className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-charcoal/40 p-[1.5px]">
                      <div className="h-full w-[75%] rounded-[1.5px] bg-charcoal" />
                    </div>
                    <div className="h-[5px] w-[1.5px] rounded-r-full bg-charcoal/40" />
                  </div>
                </div>
              </div>

              {/* Scrollable app content */}
              <div className="iphone-screen-content relative h-[520px] overflow-hidden">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -180, -180, 0, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.3, 0.55, 0.85, 1],
                  }}
                  className="px-5 pb-12"
                >
                  {/* Results header */}
                  <div className="pt-4 text-center">
                    <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-hazel/50">
                      Your Season
                    </p>
                    <p className="mt-1 font-display text-[22px] font-bold leading-tight text-charcoal">
                      Soft Autumn
                    </p>
                    <p className="mt-0.5 font-display text-[10px] italic text-charcoal/40">
                      &ldquo;Golden warmth meets earthy elegance&rdquo;
                    </p>
                  </div>

                  {/* Season palette */}
                  <div className="mt-5">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-hazel/70">
                      Your Palette
                    </p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2">
                      {PALETTE_COLORS.map((color) => (
                        <div key={color.hex} className="flex flex-col items-center gap-1">
                          <div
                            className="aspect-square w-full rounded-[10px] shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[6.5px] font-medium text-charcoal/30">{color.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-px flex-1 bg-cream-200" />
                    <span className="text-[7px] text-charcoal/20">+ 24 more colors</span>
                    <div className="h-px flex-1 bg-cream-200" />
                  </div>

                  {/* Best colors section */}
                  <div className="mt-5">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-hazel/70">
                      Best Colors for You
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {BEST_COLORS.map((c) => (
                        <div key={c.hex} className="flex items-center gap-2.5">
                          <div className="h-5 w-5 rounded-md shadow-sm" style={{ backgroundColor: c.hex }} />
                          <span className="text-[9px] text-charcoal/60">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colors to avoid */}
                  <div className="mt-5">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                      Colors to Minimize
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {AVOID_COLORS.map((c) => (
                        <div key={c.hex} className="flex items-center gap-2.5">
                          <div className="h-5 w-5 rounded-md opacity-60 shadow-sm" style={{ backgroundColor: c.hex }} />
                          <span className="text-[9px] text-charcoal/35 line-through decoration-charcoal/20">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Style tips card */}
                  <div className="mt-5 rounded-xl bg-hazel-50/60 p-3.5">
                    <p className="text-[8px] font-semibold text-hazel">Style Tip</p>
                    <p className="mt-1 text-[8px] leading-relaxed text-charcoal/50">
                      Pair your warm neutrals with earthy accents.
                      Terracotta and sage are your power combination.
                    </p>
                  </div>

                  {/* CTA button */}
                  <div className="mt-5 rounded-xl bg-charcoal py-2.5 text-center">
                    <span className="text-[10px] font-semibold text-cream-50">View Full Palette</span>
                  </div>
                </motion.div>

                {/* Screen fade at bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-cream via-cream/80 to-transparent" />
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-charcoal/20" />

              {/* Glass reflection overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-[40px]"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Phone shadow */}
        <div className="absolute -bottom-6 left-1/2 -z-10 h-[30px] w-[200px] -translate-x-1/2 rounded-[50%] bg-charcoal/15 blur-xl" />
      </motion.div>
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
      {/* Soft gradient background */}
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

          {/* Right: Realistic iPhone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-sm">
              {/* Subtle glow behind phone */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-hazel-200/25 via-dusty-rose/10 to-transparent blur-3xl" />

              <IPhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
