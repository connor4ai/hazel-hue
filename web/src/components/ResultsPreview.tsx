import { useScrollReveal } from '../hooks/useScrollReveal';

const PREVIEW_PALETTE = [
  { hex: '#C67B5C', name: 'Burnt Sienna' },
  { hex: '#D4A574', name: 'Warm Sand' },
  { hex: '#8B6F47', name: 'Hazelnut' },
  { hex: '#A0845C', name: 'Golden Oak' },
  { hex: '#D4A5A5', name: 'Dusty Rose' },
  { hex: '#7B8E6F', name: 'Sage Leaf' },
  { hex: '#9B4F3A', name: 'Terracotta' },
  { hex: '#B8860B', name: 'Dark Gold' },
];

const PREVIEW_SECTIONS = [
  {
    title: 'Your Color Story',
    description:
      'A personalized narrative explaining why these colors harmonize with your natural features.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Style Lookbook',
    description:
      'Curated outfit concepts for every occasion, with exact color recommendations.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Makeup & Hair Guide',
    description:
      'Foundation shades, lip colors, eyeshadow palettes, and hair color recs with salon terminology.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Drape Comparison',
    description:
      'Interactive side-by-side showing exactly how your best and worst colors look on you.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function ResultsPreview() {
  const sectionRef = useScrollReveal();
  const paletteRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <section className="px-6 py-20">
      <div ref={sectionRef} className="animate-fade-in-up mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal">
          See What You&rsquo;ll Get
        </h2>
        <p className="mt-2 text-center text-sm italic text-gray-500">
          A glimpse of your personalized color analysis results
        </p>

        {/* Palette preview mockup */}
        <div
          ref={paletteRef}
          className="stagger-children mx-auto mt-12 max-w-2xl rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-white p-8 shadow-sm"
        >
          <p className="text-center text-xs uppercase tracking-widest text-gray-400">
            Example Result
          </p>
          <p className="mt-2 text-center font-display text-2xl font-bold text-charcoal">
            Soft Autumn
          </p>
          <p className="mt-1 text-center text-sm italic text-gray-400">
            &ldquo;Golden warmth meets earthy elegance&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {PREVIEW_PALETTE.map((color) => (
              <div key={color.hex} className="flex flex-col items-center gap-1.5">
                <div
                  className="h-14 w-14 rounded-xl shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] text-gray-400">{color.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-cream-200" />
            <span className="text-xs italic text-gray-400">+ 22 more colors in your full palette</span>
            <div className="h-px flex-1 bg-cream-200" />
          </div>
        </div>

        {/* Section previews */}
        <div
          ref={cardsRef}
          className="stagger-children mt-12 grid gap-4 sm:grid-cols-2"
        >
          {PREVIEW_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="flex gap-4 rounded-tl-2xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border border-cream-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cream-100 text-hazel">
                {section.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  {section.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
