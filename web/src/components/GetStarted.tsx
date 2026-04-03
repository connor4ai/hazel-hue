import { motion } from 'framer-motion';

interface Props {
  onGetStarted?: () => void;
}

export function GetStarted({ onGetStarted }: Props) {
  return (
    <section id="get-started" className="relative overflow-hidden">
      {/* Dark cinematic background */}
      <div className="relative bg-midnight px-6 py-32 lg:px-12">
        {/* Mesh gradient overlay */}
        <div className="pointer-events-none absolute inset-0 mesh-gradient-dark" />

        {/* Noise texture */}
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.04]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel-200/60"
          >
            Ready?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-display-lg font-bold text-cream-50 text-balance"
          >
            Your colors are waiting
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream-100/40"
          >
            Upload a selfie and discover your seasonal color palette in under 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            {/* Primary web CTA */}
            <button
              onClick={onGetStarted}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-10 py-5 font-semibold text-charcoal shadow-2xl shadow-white/10 transition-all duration-500 hover:shadow-white/20"
            >
              <span className="relative z-10">Start My Color Analysis</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-hazel-100 to-cream-100 transition-transform duration-500 group-hover:translate-x-0" />
            </button>

          </motion.div>

          {/* How it's free */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-14 flex max-w-md items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-hazel/20">
              <svg className="h-5 w-5 text-hazel-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.784l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.784.785l.24 1.192a1 1 0 001.96 0l.24-1.192a1 1 0 01.784-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.784-.784l-.24-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-cream-50/90">Completely free on the web</p>
              <p className="mt-1 text-sm leading-relaxed text-cream-100/35">
                Try your color analysis right here — no download required.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
