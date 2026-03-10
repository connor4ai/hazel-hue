const SEASONS = [
  { name: 'Light Spring', colors: ['#FFD700', '#FFDAB9', '#FFA07A'] },
  { name: 'True Spring', colors: ['#FF8C69', '#FFB347', '#FF6B6B'] },
  { name: 'Bright Spring', colors: ['#E8A87C', '#FF69B4', '#FFD700'] },
  { name: 'Light Summer', colors: ['#B0C4DE', '#E6E6FA', '#ADD8E6'] },
  { name: 'True Summer', colors: ['#B19CD9', '#9FAFD1', '#C8A2C8'] },
  { name: 'Soft Summer', colors: ['#C8A2C8', '#D4B5B0', '#B5B5D0'] },
  { name: 'Soft Autumn', colors: ['#C67B5C', '#D4A574', '#A8B5A0'] },
  { name: 'True Autumn', colors: ['#B8860B', '#CD853F', '#8B4513'] },
  { name: 'Deep Autumn', colors: ['#8B4513', '#6B3A2A', '#704214'] },
  { name: 'Deep Winter', colors: ['#7B2D5F', '#1A1A2E', '#C0392B'] },
  { name: 'True Winter', colors: ['#1A1A2E', '#000080', '#8B0000'] },
  { name: 'Bright Winter', colors: ['#FF1493', '#00BFFF', '#FF4500'] },
];

export function SeasonMarquee() {
  const items = [...SEASONS, ...SEASONS];

  return (
    <section className="relative overflow-hidden border-y border-cream-200/60 py-6">
      {/* Subtle gradient overlay at edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-cream to-transparent" />

      <div className="marquee-track">
        {items.map((season, i) => (
          <div key={i} className="group flex items-center gap-3 px-8">
            {/* Mini gradient swatch */}
            <div
              className="h-6 w-6 flex-shrink-0 rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${season.colors[0]}, ${season.colors[1]}, ${season.colors[2]})`,
              }}
            />
            <span className="whitespace-nowrap font-display text-sm font-medium text-charcoal/35 transition-colors duration-300 group-hover:text-charcoal/60">
              {season.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
