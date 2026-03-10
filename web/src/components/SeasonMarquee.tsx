const SEASONS = [
  { name: 'Light Spring', color: '#FFD700' },
  { name: 'True Spring', color: '#FF8C69' },
  { name: 'Bright Spring', color: '#E8A87C' },
  { name: 'Light Summer', color: '#B0C4DE' },
  { name: 'True Summer', color: '#B19CD9' },
  { name: 'Soft Summer', color: '#C8A2C8' },
  { name: 'Soft Autumn', color: '#C67B5C' },
  { name: 'True Autumn', color: '#B8860B' },
  { name: 'Deep Autumn', color: '#8B4513' },
  { name: 'Deep Winter', color: '#7B2D5F' },
  { name: 'True Winter', color: '#1A1A2E' },
  { name: 'Bright Winter', color: '#FF1493' },
];

export function SeasonMarquee() {
  // Double the items for seamless loop
  const items = [...SEASONS, ...SEASONS];

  return (
    <section className="overflow-hidden border-y border-cream-200 bg-cream-50/50 py-5">
      <div className="marquee-track">
        {items.map((season, i) => (
          <div key={i} className="flex items-center gap-3 px-6">
            <div
              className="h-3 w-3 flex-shrink-0 rounded-full"
              style={{ backgroundColor: season.color }}
            />
            <span className="whitespace-nowrap font-display text-sm font-medium text-charcoal/40">
              {season.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
