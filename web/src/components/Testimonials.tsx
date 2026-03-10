import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "I've been wearing the wrong colors my entire life. Seeing my Soft Autumn palette was like unlocking a cheat code for getting dressed.",
    name: 'Sarah M.',
    season: 'Soft Autumn',
    seasonColor: '#C67B5C',
  },
  {
    quote: "Way more accurate than any online quiz I've tried. The AI picked up on warm undertones that I could never figure out on my own.",
    name: 'Jessica L.',
    season: 'Warm Spring',
    seasonColor: '#FF8C69',
  },
  {
    quote: "The salon card alone made it worth sharing. I showed my stylist exactly what hair tones work for me — no more guessing.",
    name: 'Priya K.',
    season: 'Deep Winter',
    seasonColor: '#7B2D5F',
  },
  {
    quote: "I was skeptical about AI doing this, but the results were spot-on. My friends keep asking why I look so put together lately.",
    name: 'Emily R.',
    season: 'Cool Summer',
    seasonColor: '#B19CD9',
  },
  {
    quote: "Shared it with two friends and we all got our palettes. Now we go shopping together and actually know what works. Life-changing.",
    name: 'Aisha T.',
    season: 'Bright Spring',
    seasonColor: '#E8A87C',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-hazel"
          >
            Real Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-display-lg font-bold text-charcoal text-balance"
          >
            People who found
            <br className="hidden sm:block" />
            <span className="italic">their colors</span>
          </motion.h2>
        </div>

        <div className="mt-16 columns-1 gap-6 md:columns-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 break-inside-avoid"
            >
              <div className="card-hover rounded-2xl border border-cream-200 bg-white/60 p-6 backdrop-blur-sm">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-charcoal">
                    {t.name}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-medium text-white"
                    style={{ backgroundColor: t.seasonColor }}
                  >
                    {t.season}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
