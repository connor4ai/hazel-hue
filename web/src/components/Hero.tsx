import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  {
    number: '1',
    title: 'Upload a selfie',
    description: 'Take a photo in natural light — no makeup needed. We guide you through it.',
  },
  {
    number: '2',
    title: 'AI analyzes your coloring',
    description: 'Our AI examines your skin undertone, eye color, and hair to determine your season among 12 types.',
  },
  {
    number: '3',
    title: 'Get your complete guide',
    description: 'Receive your palette, style lookbook, makeup guide, hair recommendations, and more — in under a minute.',
  },
];

const FEATURES = [
  'Your seasonal color type (1 of 12 seasons)',
  'Personal palette with 30+ curated colors',
  'Interactive drape comparison tool',
  'Complete style lookbook with outfit ideas',
  'Makeup guide — foundation to lip color',
  'Hair color guide with salon terminology',
  'Jewelry & metals recommendations',
  'Shareable results + lock screen wallpaper',
];

export function Hero() {
  const stepsRef = useScrollReveal();
  const featuresRef = useScrollReveal();

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-sage">
            AI-Powered Seasonal Color Analysis
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-hazel sm:text-5xl md:text-6xl">
            Discover the colors that were made for you
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg italic leading-relaxed text-gray-500">
            Your personal palette, style guide, makeup and hair recommendations —
            all personalized to your unique coloring. In under a minute.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href="#get-started"
              className="animate-glow inline-block rounded-xl bg-hazel px-10 py-4 text-sm font-semibold uppercase tracking-widest text-cream transition hover:bg-hazel-500"
            >
              Get My Colors — $19
            </a>
            <p className="text-xs italic text-gray-400">
              What costs $300+ with a stylist. Not your colors? Full refund.
            </p>
          </div>

          {/* Social proof nudge */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {['#C67B5C', '#B19CD9', '#7B2D5F', '#FF8C69'].map((color) => (
                <div
                  key={color}
                  className="h-8 w-8 rounded-full border-2 border-cream"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-charcoal">2,400+</span> color analyses completed
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-4">
        <svg width="200" height="40" viewBox="0 0 200 40" className="animate-float opacity-40">
          <path
            d="M0 20 Q25 15 50 20 Q75 25 100 20 Q125 15 150 20 Q175 25 200 20"
            stroke="#A8B5A0"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M45 20 Q40 10 50 12 Q55 14 50 20" fill="#A8B5A0" opacity="0.4" />
          <path d="M100 20 Q95 28 105 30 Q110 28 105 20" fill="#A8B5A0" opacity="0.4" />
          <path d="M155 20 Q150 10 160 12 Q165 14 160 20" fill="#A8B5A0" opacity="0.4" />
        </svg>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-bold text-charcoal">
            How It Works
          </h2>
          <p className="mt-2 text-center text-sm italic text-gray-500">
            Three simple steps to your personalized color palette
          </p>
          <div
            ref={stepsRef}
            className="stagger-children mt-12 grid gap-8 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-cream-50 p-6 transition-shadow hover:shadow-md"
              >
                <span className="font-display text-4xl font-bold text-hazel-200">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal">
            Everything You Get
          </h2>
          <p className="mt-2 text-sm italic text-gray-500">
            More than a quiz — a comprehensive personal color guide
          </p>
          <div
            ref={featuresRef}
            className="stagger-children mt-8 grid gap-4 text-left sm:grid-cols-2"
          >
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl p-3">
                <span className="mt-0.5 text-sage">&#10003;</span>
                <span className="text-sm text-gray-500">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
