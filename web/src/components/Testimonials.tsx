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
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal">
          What People Are Saying
        </h2>
        <p className="mt-2 text-center text-sm italic text-gray-500">
          Real results from real people who discovered their colors
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-white p-6"
            >
              <p className="text-sm leading-relaxed text-gray-500 italic">
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
