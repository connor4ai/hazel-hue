import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Upload a selfie',
    description: 'Take a photo in natural light. No makeup, no filters — just you. We guide you through it.',
    gradient: 'from-dusty-rose/20 to-dusty-rose/5',
    iconBg: 'bg-dusty-rose/15',
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
    gradient: 'from-sage/20 to-sage/5',
    iconBg: 'bg-sage/15',
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
    description: 'Receive 10 personalized guides — palette, style lookbook, makeup, hair, nails, jewelry, accessories & more — in under 60 seconds.',
    gradient: 'from-hazel-100 to-hazel-50/50',
    iconBg: 'bg-hazel-100',
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
      <div className="mx-auto max-w-6xl">
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
            perfect palette
          </motion.h2>
        </div>

        {/* Bento grid layout */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`bento-card group relative overflow-hidden rounded-3xl p-8 ${
                i === 0 ? 'md:row-span-1' : ''
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative">
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-cream-200">
                    {step.number}
                  </span>
                  {/* Connector line (except last) */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden h-px w-8 bg-gradient-to-r from-cream-200 to-transparent md:block" />
                  )}
                </div>

                {/* Icon */}
                <div className={`mt-6 flex h-14 w-14 items-center justify-center rounded-2xl ${step.iconBg} ${step.iconColor} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                  {step.icon}
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/45">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-3 rounded-full border border-cream-200 bg-white/60 px-6 py-3 backdrop-blur-sm"
        >
          <svg className="h-4 w-4 text-hazel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-charcoal/50">
            The entire process takes <span className="font-semibold text-charcoal/70">under 60 seconds</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
