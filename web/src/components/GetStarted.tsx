import { motion } from 'framer-motion';

const FLOATING_COLORS = [
  { hex: '#C67B5C', size: 80, x: '10%', y: '15%', blur: 40 },
  { hex: '#D4A5A5', size: 100, x: '85%', y: '20%', blur: 50 },
  { hex: '#A8B5A0', size: 70, x: '75%', y: '70%', blur: 35 },
  { hex: '#B19CD9', size: 90, x: '15%', y: '75%', blur: 45 },
  { hex: '#8B6F47', size: 60, x: '50%', y: '10%', blur: 30 },
];

export function GetStarted() {
  return (
    <section id="get-started" className="relative overflow-hidden">
      {/* Dark cinematic background */}
      <div className="relative bg-midnight px-6 py-32 lg:px-12">
        {/* Mesh gradient overlay */}
        <div className="pointer-events-none absolute inset-0 mesh-gradient-dark" />

        {/* Floating color orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOATING_COLORS.map((c, i) => (
            <motion.div
              key={i}
              animate={{ y: [-15, 15, -15], scale: [1, 1.1, 1] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-full opacity-20"
              style={{
                backgroundColor: c.hex,
                width: c.size,
                height: c.size,
                left: c.x,
                top: c.y,
                filter: `blur(${c.blur}px)`,
              }}
            />
          ))}
        </div>

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
            Download the app, share with 2 friends, and unlock your complete
            seasonal color analysis. No payment, no strings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="https://apps.apple.com/app/hazel-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-white/10 px-8 py-4 text-cream-50 backdrop-blur-sm transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/5"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-60">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.hazelhue"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-white/10 px-8 py-4 text-cream-50 backdrop-blur-sm transition-all duration-500 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/5"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.433.289.744.765.744 1.19 0 .425-.311.901-.744 1.19l-2.56 1.484-2.544-2.544 2.802-2.622zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-60">Get it on</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </a>
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
              <p className="text-sm font-semibold text-cream-50/90">How is this free?</p>
              <p className="mt-1 text-sm leading-relaxed text-cream-100/35">
                Just share Hazel & Hue with 2 friends from your contacts. That&apos;s it.
                No credit card, no trial, no catch. We grow through word of mouth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
