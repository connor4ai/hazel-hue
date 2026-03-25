import type { SeasonType, ColorSwatch } from '../data/seasons';

/**
 * Season-family backgrounds: [top, mid, bottom, orbTint]
 */
const seasonBackgrounds: Record<string, readonly [string, string, string, string]> = {
  Spring: ['#FFF8F0', '#FFF0E0', '#FFECD2', '#FF8C69'],
  Summer: ['#F8F4FF', '#F0EAFF', '#E8DFFF', '#B19CD9'],
  Autumn: ['#FDF6EE', '#F5EBD8', '#EFE0C4', '#C67B5C'],
  Winter: ['#F5F0F8', '#EDE6F2', '#E4DAEC', '#7B2D5F'],
};

function getSeasonFamily(season: SeasonType): string {
  if (season.includes('Spring')) return 'Spring';
  if (season.includes('Summer')) return 'Summer';
  if (season.includes('Autumn')) return 'Autumn';
  return 'Winter';
}

const seasonAccentColors: Record<string, string> = {
  Spring: '#FF8C69',
  Summer: '#B19CD9',
  Autumn: '#C67B5C',
  Winter: '#7B2D5F',
};

// ─── Types ───────────────────────────────────────────────────────────
export interface PaletteResultCardProps {
  season: SeasonType;
  tagline: string;
  swatches: ColorSwatch[];
  celebrityName: string;
}

// ─── Constants ───────────────────────────────────────────────────────
const W = 1080;
const H = 1920;

/**
 * Renders the palette result card as a pure inline SVG.
 * Designed to be captured via html2canvas or rendered to a <canvas> for download.
 * Aspect ratio: 9:16 (1080×1920) — optimized for Instagram Stories.
 */
export function PaletteResultCard({
  season,
  tagline,
  swatches,
  celebrityName,
}: PaletteResultCardProps) {
  const family = getSeasonFamily(season);
  const bg = seasonBackgrounds[family];
  const accent = seasonAccentColors[family];
  const words = season.split(' ');
  const hasSubtype = words.length === 2;
  const display = swatches.slice(0, 12);
  const cols = 4;
  const swatchSize = 168;
  const gap = 42;
  const totalGridW = cols * swatchSize + (cols - 1) * gap;
  const startX = (W - totalGridW) / 2;
  const gridStartY = 990;
  const rows = Math.ceil(display.length / cols);

  // Truncate tagline
  const desc = tagline.length > 80 ? tagline.slice(0, 77) + '…' : tagline;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      style={{ display: 'block', maxWidth: 360, margin: '0 auto' }}
    >
      <defs>
        <linearGradient id="cardBg" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={bg[0]} />
          <stop offset="0.4" stopColor={bg[1]} />
          <stop offset="1" stopColor={bg[2]} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill="url(#cardBg)" />

      {/* Decorative orbs */}
      <g opacity="0.08">
        <circle cx={930} cy={240} r={300} fill={bg[3]} />
        <circle cx={150} cy={1680} r={240} fill={bg[3]} />
        <ellipse cx={90} cy={900} rx={120} ry={165} fill={bg[3]} />
        <circle cx={180} cy={90} r={75} fill={bg[3]} />
      </g>

      {/* Grain texture */}
      <g opacity="0.03">
        {Array.from({ length: 40 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 219 + 51) % W}
            cy={(i * 141 + 93) % H}
            r={((i % 3) + 1) * 2.4}
            fill="#2A2A2A"
          />
        ))}
      </g>

      {/* Soft accent wash */}
      <ellipse cx={W / 2} cy={360} rx={660} ry={420} fill={accent} opacity="0.04" />

      {/* Corner accents */}
      <g opacity="0.06">
        <circle cx={0} cy={0} r={180} fill={accent} />
        <circle cx={W} cy={H} r={150} fill={accent} />
      </g>

      {/* ─── Top brand mark ─── */}
      <text
        x={W / 2}
        y={126}
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize={27}
        fill="#A3A3A3"
        letterSpacing="12"
        opacity="0.7"
      >
        HAZEL &amp; HUE
      </text>

      {/* Thin line */}
      <rect x={W * 0.2} y={168} width={W * 0.6} height={1.5} fill={accent} opacity="0.15" rx="0.75" />

      {/* ─── "YOU ARE A" label ─── */}
      <text
        x={W / 2}
        y={285}
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize={36}
        fill="#A3A3A3"
        letterSpacing="9"
      >
        YOU ARE A
      </text>

      {/* ─── Season name (hero typography) ─── */}
      {hasSubtype ? (
        <g>
          <text
            x={W / 2}
            y={405}
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize={66}
            fill="#737373"
            letterSpacing="15"
          >
            {words[0].toUpperCase()}
          </text>
          <text
            x={W / 2}
            y={555}
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="700"
            fontSize={138}
            fill={accent}
            letterSpacing="6"
          >
            {words[1]}
          </text>
        </g>
      ) : (
        <text
          x={W / 2}
          y={510}
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize={126}
          fill={accent}
          letterSpacing="6"
        >
          {season}
        </text>
      )}

      {/* ─── Poetic tagline ─── */}
      <text
        x={W / 2}
        y={654}
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize={31.5}
        fill="#737373"
        opacity="0.9"
        fontStyle="italic"
      >
        {desc}
      </text>

      {/* Decorative line before swatches */}
      <rect x={W * 0.2} y={750} width={W * 0.6} height={1.5} fill={accent} opacity="0.15" rx="0.75" />

      {/* ─── "Your Palette" label ─── */}
      <text
        x={W / 2}
        y={825}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={48}
        fill="#2A2A2A"
        letterSpacing="3"
      >
        Your Palette
      </text>

      {/* ─── Signature color indicator ─── */}
      {display.length > 0 && (
        <g>
          <circle
            cx={W / 2}
            cy={915}
            r={30}
            fill={display[0].hex}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="4.5"
          />
          <text
            x={W / 2}
            y={975}
            textAnchor="middle"
            fontFamily="'DM Sans', system-ui, sans-serif"
            fontSize={21}
            fill="#A3A3A3"
            letterSpacing="4.5"
          >
            SIGNATURE
          </text>
        </g>
      )}

      {/* ─── Color Swatch Grid ─── */}
      {display.map((swatch, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (swatchSize + gap);
        const y = gridStartY + row * (swatchSize + gap);
        const r = i % 2 === 0 ? 42 : 48;

        return (
          <g key={i}>
            {/* Shadow */}
            <rect
              x={x + 3}
              y={y + 6}
              width={swatchSize}
              height={swatchSize}
              rx={r}
              fill="rgba(0,0,0,0.06)"
            />
            {/* Swatch */}
            <rect
              x={x}
              y={y}
              width={swatchSize}
              height={swatchSize}
              rx={r}
              fill={swatch.hex}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={3}
            />
            {/* Name */}
            <text
              x={x + swatchSize / 2}
              y={y + swatchSize + 39}
              textAnchor="middle"
              fontFamily="'DM Sans', system-ui, sans-serif"
              fontSize={22.5}
              fill="#737373"
              opacity="0.8"
            >
              {swatch.name.length > 10 ? swatch.name.slice(0, 9) + '…' : swatch.name}
            </text>
          </g>
        );
      })}

      {/* ─── Celebrity comparison ─── */}
      <g>
        <rect
          x={W * 0.2}
          y={rows * 210 + gridStartY + 60}
          width={W * 0.6}
          height={1.5}
          fill={accent}
          opacity="0.15"
          rx="0.75"
        />
        <text
          x={W / 2}
          y={rows * 210 + gridStartY + 144}
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize={30}
          fill="#A3A3A3"
          letterSpacing="6"
        >
          YOU SHARE A PALETTE WITH
        </text>
        <text
          x={W / 2}
          y={rows * 210 + gridStartY + 222}
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize={72}
          fill="#2A2A2A"
          letterSpacing="1.5"
        >
          {celebrityName}
        </text>
      </g>

      {/* ─── Bottom watermark ─── */}
      <g opacity="0.4">
        <circle cx={W / 2} cy={H - 150} r={6} fill={accent} />
        <text
          x={W / 2}
          y={H - 84}
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize={27}
          fill="#737373"
          letterSpacing="6"
        >
          hazelandhue.com
        </text>
      </g>
    </svg>
  );
}
