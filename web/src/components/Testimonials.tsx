import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    quote: "I've been wearing the wrong colors my entire life. Seeing my Soft Autumn palette was like unlocking a cheat code for getting dressed.",
    name: 'Sarah M.',
    role: 'Creative Director',
    season: 'Soft Autumn',
    seasonColors: ['#C67B5C', '#D4A574', '#A8B5A0'],
    initials: 'SM',
  },
  {
    quote: "Way more accurate than any online quiz I've tried. The AI picked up on warm undertones that I could never figure out on my own.",
    name: 'Jessica L.',
    role: 'UX Designer',
    season: 'Warm Spring',
    seasonColors: ['#FF8C69', '#FFB347', '#FFD700'],
    initials: 'JL',
  },
  {
    quote: "The salon card alone made it worth sharing. I showed my stylist exactly what hair tones work for me — no more guessing.",
    name: 'Priya K.',
    role: 'Marketing Lead',
    season: 'Deep Winter',
    seasonColors: ['#7B2D5F', '#1A1A2E', '#C0392B'],
    initials: 'PK',
  },
  {
    quote: "I was skeptical about AI doing this, but the results were spot-on. My friends keep asking why I look so put together lately.",
    name: 'Emily R.',
    role: 'Product Manager',
    season: 'Cool Summer',
    seasonColors: ['#B19CD9', '#9FAFD1', '#C8A2C8'],
    initials: 'ER',
  },
  {
    quote: "Shared it with two friends and we all got our palettes. Now we go shopping together and actually know what works. Life-changing.",
    name: 'Aisha T.',
    role: 'Fashion Stylist',
    season: 'Bright Spring',
    seasonColors: ['#E8A87C', '#FF69B4', '#FFD700'],
    initials: 'AT',
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    checkScroll();
  }, []);

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.clientWidth || 400;
    el.scrollBy({ left: dir === 'right' ? cardWidth + 24 : -(cardWidth + 24), behavior: 'smooth' });
  }

  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel"
            >
              Real Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-display-lg font-bold text-charcoal text-balance"
            >
              People who found
              <br className="hidden sm:block" />
              <span className="italic">their colors</span>
            </motion.h2>
          </div>

          {/* Scroll controls */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden gap-3 md:flex"
          >
            <button
              onClick={() => scroll('left')}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream-50'
                  : 'border-cream-200 text-cream-300 cursor-default'
              }`}
              disabled={!canScrollLeft}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream-50'
                  : 'border-cream-200 text-cream-300 cursor-default'
              }`}
              disabled={!canScrollRight}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="mt-12 flex snap-x gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide lg:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Left spacer for alignment */}
        <div className="w-0 flex-shrink-0 lg:w-[calc((100vw-1280px)/2)]" />

        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-[340px] flex-shrink-0 snap-center sm:w-[400px]"
          >
            <div className="bento-card group h-full rounded-2xl p-7">
              {/* Season gradient bar */}
              <div
                className="h-1 w-16 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${t.seasonColors[0]}, ${t.seasonColors[1]}, ${t.seasonColors[2]})`,
                }}
              />

              {/* Stars */}
              <div className="mt-5 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-charcoal/65">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-4">
                {/* Avatar with gradient */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${t.seasonColors[0]}, ${t.seasonColors[1]})`,
                  }}
                >
                  {t.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/35">{t.role}</p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold text-white shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${t.seasonColors[0]}, ${t.seasonColors[1]})`,
                  }}
                >
                  {t.season}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="w-6 flex-shrink-0 lg:w-[calc((100vw-1280px)/2)]" />
      </div>
    </section>
  );
}
