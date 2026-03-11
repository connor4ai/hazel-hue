import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Upload a selfie',
    description: 'Take a photo in natural light. No makeup, no filters — just you. We guide you through it.',
    gradient: 'from-dusty-rose/30 via-dusty-rose/10 to-transparent',
    accentColor: '#D4A5A5',
    iconBg: 'bg-gradient-to-br from-dusty-rose/25 to-dusty-rose/10',
    iconColor: 'text-dusty-rose',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI analyzes your coloring',
    description: 'Computer vision examines your skin undertone, eye color, and natural hair to classify your season.',
    gradient: 'from-sage/30 via-sage/10 to-transparent',
    accentColor: '#A8B5A0',
    iconBg: 'bg-gradient-to-br from-sage/25 to-sage/10',
    iconColor: 'text-sage-dark',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get your complete guide',
    description: 'Receive 10 personalized guides — palette, style lookbook, makeup, hair, nails, jewelry, accessories & more.',
    gradient: 'from-hazel-200/40 via-hazel-100/20 to-transparent',
    accentColor: '#8B6F47',
    iconBg: 'bg-gradient-to-br from-hazel-200/40 to-hazel-100/20',
    iconColor: 'text-hazel',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32 lg:px-12">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-radial from-dusty-rose/10 via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-radial from-sage-light/10 via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-hazel"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-display-lg font-bold text-charcoal text-balance"
          >
            Three steps to your
            <br className="hidden sm:block" />
            <span className="italic text-gradient">perfect palette</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-md text-charcoal/45"
          >
            From selfie to personalized color guide in under 60 seconds.
            No appointments, no guesswork.
          </motion.p>
        </div>

        {/* Steps — stacked cards with connecting line */}
        <div className="relative mt-20">
          {/* Vertical connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cream-200 via-hazel/15 to-cream-200 md:block" />

          <div className="grid gap-8 md:gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative md:flex md:items-center md:gap-16 ${
                  i % 2 === 0 ? '' : 'md:flex-row-reverse'
                } ${i > 0 ? 'md:mt-[-2rem]' : ''}`}
              >
                {/* Step number badge on the connecting line (desktop) */}
                <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-cream bg-white shadow-lg"
                    style={{ boxShadow: `0 8px 30px -6px ${step.accentColor}30` }}
                  >
                    <span className="font-display text-lg font-bold text-charcoal">{step.number}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className={`md:w-[calc(50%-3.5rem)] ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div
                    className="group relative overflow-hidden rounded-3xl border border-cream-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-10"
                    style={{
                      boxShadow: `0 4px 20px -4px ${step.accentColor}15`,
                    }}
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    <div className="relative">
                      {/* Mobile step number */}
                      <div className="mb-5 flex items-center gap-4 md:hidden">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-cream-200 bg-white shadow-sm"
                        >
                          <span className="font-display text-sm font-bold text-charcoal">{step.number}</span>
                        </div>
                        <div className="h-px flex-1 bg-cream-200" />
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.iconBg} ${step.iconColor} shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                        {step.icon}
                      </div>

                      <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-charcoal/50">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-[calc(50%-3.5rem)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Time indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 flex max-w-xs items-center justify-center gap-3 rounded-full border border-cream-200 bg-white/70 px-8 py-4 shadow-md shadow-hazel/5 backdrop-blur-sm"
        >
          <svg className="h-5 w-5 text-hazel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold text-charcoal/55">
            The entire process takes <span className="font-bold text-charcoal/75">under 60 seconds</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
