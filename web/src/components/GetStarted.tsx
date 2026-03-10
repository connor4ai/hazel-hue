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
            Try it right here on the web, or download the app.
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

            {/* Secondary app links */}
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
              <span className="text-xs text-cream-100/25">or get the app</span>
              <div className="flex gap-3">
                <a
                  href="https://apps.apple.com/app/hazel-hue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-cream-50 backdrop-blur-sm transition-all duration-500 hover:bg-white/20"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-xs font-medium">iOS</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.hazelhue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-cream-50 backdrop-blur-sm transition-all duration-500 hover:bg-white/20"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.433.289.744.765.744 1.19 0 .425-.311.901-.744 1.19l-2.56 1.484-2.544-2.544 2.802-2.622zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
                  </svg>
                  <span className="text-xs font-medium">Android</span>
                </a>
              </div>
            </div>
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
                Try your color analysis right here — no download required. Want to save your results
                and get ongoing recommendations? Download the app.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
