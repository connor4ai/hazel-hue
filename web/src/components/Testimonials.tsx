import { useScrollReveal } from '../hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    quote:
      "I've been wearing the wrong colors my entire life. Seeing my Soft Autumn palette was like unlocking a cheat code for getting dressed.",
    name: 'Sarah M.',
    season: 'Soft Autumn',
    seasonColor: '#C67B5C',
  },
  {
    quote:
      "Way more accurate than any online quiz I've tried. The AI picked up on warm undertones that I could never figure out on my own.",
    name: 'Jessica L.',
    season: 'Warm Spring',
    seasonColor: '#FF8C69',
  },
  {
    quote:
      "The salon card alone is worth it. I showed my stylist exactly what hair tones work for me — no more guessing.",
    name: 'Priya K.',
    season: 'Deep Winter',
    seasonColor: '#7B2D5F',
  },
  {
    quote:
      "I was skeptical about AI doing this, but the results were spot-on. My friends keep asking why I look so put together lately.",
    name: 'Emily R.',
    season: 'Cool Summer',
    seasonColor: '#B19CD9',
  },
  {
    quote:
      "Bought it on a whim and now I can't stop shopping for my palette. My closet finally makes sense. Worth 10x the price.",
    name: 'Aisha T.',
    season: 'Bright Spring',
    seasonColor: '#E8A87C',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const gridRef = useScrollReveal();

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal">
          What People Are Saying
        </h2>
        <p className="mt-2 text-center text-sm italic text-gray-500">
          Real results from real people who discovered their colors
        </p>

        <div
          ref={gridRef}
          className="stagger-children mt-12 grid gap-6 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <StarRating />
              <p className="mt-3 text-sm leading-relaxed text-gray-500 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal">
                  {t.name}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: t.seasonColor }}
                >
                  {t.season}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
