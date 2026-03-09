#!/usr/bin/env node
/**
 * Generate all brand assets for Hazel & Hue.
 * Uses sharp to convert SVG markup → PNG at required dimensions.
 *
 * Run: node scripts/generate-assets.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Brand colors
const HAZEL = '#8B6F47';
const CREAM = '#FDF6EE';
const SAGE = '#A8B5A0';
const TERRACOTTA = '#C67B5C';
const DUSTY_ROSE = '#D4A5A5';
const CHARCOAL = '#3D3D3D';
const HAZEL_LIGHT = '#B89B6F';

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const WEB_PUBLIC = path.join(__dirname, '..', 'web', 'public');

/**
 * Main app icon SVG — a stylized leaf/color-drop motif with H&H monogram.
 * The design: overlapping organic leaf shapes in brand colors arranged in
 * a radial pattern, like a color fan or palette bloom. Center has the
 * monogram in the display font style.
 */
function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <clipPath id="rounded">
      <rect width="512" height="512" rx="80" ry="80"/>
    </clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <!-- Background -->
    <rect width="512" height="512" fill="${CREAM}"/>

    <!-- Subtle radial glow -->
    <circle cx="256" cy="240" r="200" fill="${HAZEL}" opacity="0.04"/>

    <!-- Leaf cluster — overlapping organic shapes forming a bloom -->
    <!-- Top leaf -->
    <path d="M256 100 Q280 160 256 220 Q232 160 256 100Z" fill="${SAGE}" opacity="0.7"/>
    <!-- Top-right leaf -->
    <path d="M310 130 Q330 200 280 240 Q290 170 310 130Z" fill="${TERRACOTTA}" opacity="0.6"/>
    <!-- Right leaf -->
    <path d="M340 190 Q340 260 280 270 Q320 230 340 190Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
    <!-- Bottom-right leaf -->
    <path d="M320 260 Q310 330 260 300 Q300 290 320 260Z" fill="${HAZEL_LIGHT}" opacity="0.5"/>
    <!-- Top-left leaf -->
    <path d="M202 130 Q182 200 232 240 Q222 170 202 130Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
    <!-- Left leaf -->
    <path d="M172 190 Q172 260 232 270 Q192 230 172 190Z" fill="${HAZEL_LIGHT}" opacity="0.6"/>
    <!-- Bottom-left leaf -->
    <path d="M192 260 Q202 330 252 300 Q212 290 192 260Z" fill="${SAGE}" opacity="0.5"/>

    <!-- Center circle -->
    <circle cx="256" cy="225" r="52" fill="${CREAM}"/>
    <circle cx="256" cy="225" r="52" fill="${HAZEL}" opacity="0.08"/>
    <circle cx="256" cy="225" r="50" fill="none" stroke="${HAZEL}" stroke-width="1.5" opacity="0.3"/>

    <!-- H&H monogram -->
    <text x="256" y="237" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="${HAZEL}" letter-spacing="1">H&amp;H</text>

    <!-- Brand name below -->
    <text x="256" y="350" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="bold" fill="${HAZEL}">Hazel &amp; Hue</text>
    <text x="256" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="${CHARCOAL}" opacity="0.5" letter-spacing="3">COLOR ANALYSIS</text>

    <!-- Decorative botanical vine at bottom -->
    <g opacity="0.25" transform="translate(106, 420)">
      <path d="M0 10 Q75 0 150 10 Q225 20 300 10" stroke="${SAGE}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M70 10 Q65 2 75 3 Q80 5 75 10" fill="${SAGE}" opacity="0.5"/>
      <path d="M150 10 Q145 18 155 19 Q160 17 155 10" fill="${SAGE}" opacity="0.5"/>
      <path d="M230 10 Q225 2 235 3 Q240 5 235 10" fill="${SAGE}" opacity="0.5"/>
    </g>
  </g>
</svg>`;
}

/**
 * Adaptive icon foreground — same motif but no background (transparent).
 * Android composites its own background shape.
 */
function adaptiveIconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <!-- Leaf cluster -->
  <path d="M256 100 Q280 160 256 220 Q232 160 256 100Z" fill="${SAGE}" opacity="0.8"/>
  <path d="M310 130 Q330 200 280 240 Q290 170 310 130Z" fill="${TERRACOTTA}" opacity="0.7"/>
  <path d="M340 190 Q340 260 280 270 Q320 230 340 190Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M320 260 Q310 330 260 300 Q300 290 320 260Z" fill="${HAZEL_LIGHT}" opacity="0.6"/>
  <path d="M202 130 Q182 200 232 240 Q222 170 202 130Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M172 190 Q172 260 232 270 Q192 230 172 190Z" fill="${HAZEL_LIGHT}" opacity="0.7"/>
  <path d="M192 260 Q202 330 252 300 Q212 290 192 260Z" fill="${SAGE}" opacity="0.6"/>

  <!-- Center -->
  <circle cx="256" cy="225" r="52" fill="${CREAM}"/>
  <circle cx="256" cy="225" r="50" fill="none" stroke="${HAZEL}" stroke-width="1.5" opacity="0.4"/>
  <text x="256" y="237" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="${HAZEL}" letter-spacing="1">H&amp;H</text>

  <!-- Brand name -->
  <text x="256" y="350" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="bold" fill="${HAZEL}">Hazel &amp; Hue</text>
  <text x="256" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="${CHARCOAL}" opacity="0.5" letter-spacing="3">COLOR ANALYSIS</text>
</svg>`;
}

/**
 * Splash icon — simplified, just the leaf bloom + monogram, no text below.
 */
function splashSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <!-- Leaf cluster -->
  <path d="M256 120 Q280 180 256 240 Q232 180 256 120Z" fill="${SAGE}" opacity="0.7"/>
  <path d="M310 150 Q330 220 280 260 Q290 190 310 150Z" fill="${TERRACOTTA}" opacity="0.6"/>
  <path d="M340 210 Q340 280 280 290 Q320 250 340 210Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
  <path d="M320 280 Q310 340 260 320 Q300 310 320 280Z" fill="${HAZEL_LIGHT}" opacity="0.5"/>
  <path d="M202 150 Q182 220 232 260 Q222 190 202 150Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
  <path d="M172 210 Q172 280 232 290 Q192 250 172 210Z" fill="${HAZEL_LIGHT}" opacity="0.6"/>
  <path d="M192 280 Q202 340 252 320 Q212 310 192 280Z" fill="${SAGE}" opacity="0.5"/>

  <!-- Center -->
  <circle cx="256" cy="245" r="52" fill="${CREAM}"/>
  <circle cx="256" cy="245" r="50" fill="none" stroke="${HAZEL}" stroke-width="1.5" opacity="0.3"/>
  <text x="256" y="257" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="${HAZEL}" letter-spacing="1">H&amp;H</text>
</svg>`;
}

/**
 * Favicon — tiny version, just the leaf bloom, no text.
 */
function faviconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${CREAM}"/>
  <path d="M32 12 Q36 22 32 30 Q28 22 32 12Z" fill="${SAGE}" opacity="0.8"/>
  <path d="M40 16 Q42 26 36 30 Q38 22 40 16Z" fill="${TERRACOTTA}" opacity="0.7"/>
  <path d="M44 24 Q44 34 36 35 Q42 30 44 24Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M24 16 Q22 26 28 30 Q26 22 24 16Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M20 24 Q20 34 28 35 Q22 30 20 24Z" fill="${HAZEL_LIGHT}" opacity="0.7"/>
  <circle cx="32" cy="28" r="8" fill="${CREAM}"/>
  <circle cx="32" cy="28" r="7" fill="none" stroke="${HAZEL}" stroke-width="0.8" opacity="0.4"/>
  <text x="32" y="32" text-anchor="middle" font-family="Georgia, serif" font-size="8" font-weight="bold" fill="${HAZEL}">H</text>
  <text x="32" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="7" font-weight="bold" fill="${HAZEL}">H&amp;H</text>
</svg>`;
}

/**
 * Web favicon SVG — vector version for the web.
 */
function webFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${CREAM}"/>
  <path d="M32 12 Q36 22 32 30 Q28 22 32 12Z" fill="${SAGE}" opacity="0.8"/>
  <path d="M40 16 Q42 26 36 30 Q38 22 40 16Z" fill="${TERRACOTTA}" opacity="0.7"/>
  <path d="M44 24 Q44 34 36 35 Q42 30 44 24Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M24 16 Q22 26 28 30 Q26 22 24 16Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
  <path d="M20 24 Q20 34 28 35 Q22 30 20 24Z" fill="${HAZEL_LIGHT}" opacity="0.7"/>
  <circle cx="32" cy="28" r="8" fill="${CREAM}"/>
  <circle cx="32" cy="28" r="7" fill="none" stroke="${HAZEL}" stroke-width="0.8" opacity="0.4"/>
  <text x="32" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="7" font-weight="bold" fill="${HAZEL}">H&amp;H</text>
</svg>`;
}

/**
 * Watercolor texture — overlapping semi-transparent organic shapes
 * to create a subtle wash effect.
 */
function watercolorSvg(width, height) {
  const shapes = [];
  // Seed positions for a natural, organic scatter
  const blobs = [
    { cx: 200, cy: 300, rx: 280, ry: 200, color: HAZEL, opacity: 0.03 },
    { cx: 600, cy: 400, rx: 300, ry: 250, color: SAGE, opacity: 0.04 },
    { cx: 400, cy: 800, rx: 350, ry: 200, color: DUSTY_ROSE, opacity: 0.03 },
    { cx: 100, cy: 600, rx: 200, ry: 300, color: TERRACOTTA, opacity: 0.02 },
    { cx: 700, cy: 200, rx: 250, ry: 180, color: HAZEL_LIGHT, opacity: 0.03 },
    { cx: 300, cy: 100, rx: 300, ry: 150, color: SAGE, opacity: 0.03 },
    { cx: 500, cy: 600, rx: 200, ry: 250, color: HAZEL, opacity: 0.02 },
    { cx: 150, cy: 900, rx: 280, ry: 200, color: DUSTY_ROSE, opacity: 0.03 },
    { cx: 650, cy: 800, rx: 250, ry: 220, color: SAGE, opacity: 0.02 },
    { cx: 400, cy: 400, rx: 350, ry: 300, color: CREAM, opacity: 0.05 },
    // Second layer — smaller, more saturated
    { cx: 350, cy: 250, rx: 120, ry: 100, color: HAZEL, opacity: 0.04 },
    { cx: 550, cy: 550, rx: 130, ry: 110, color: SAGE, opacity: 0.05 },
    { cx: 200, cy: 700, rx: 140, ry: 90, color: TERRACOTTA, opacity: 0.03 },
    { cx: 600, cy: 150, rx: 100, ry: 120, color: DUSTY_ROSE, opacity: 0.04 },
    { cx: 300, cy: 500, rx: 110, ry: 130, color: HAZEL_LIGHT, opacity: 0.03 },
  ];

  for (const blob of blobs) {
    shapes.push(
      `<ellipse cx="${blob.cx}" cy="${blob.cy}" rx="${blob.rx}" ry="${blob.ry}" fill="${blob.color}" opacity="${blob.opacity}" transform="rotate(${Math.floor(blob.cx * 0.3 % 360)}, ${blob.cx}, ${blob.cy})"/>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${CREAM}"/>
  ${shapes.join('\n  ')}
</svg>`;
}

/**
 * OG share image — optimized for social card previews (1200x630).
 * Shows brand name, tagline, price anchor, and leaf motif.
 */
function ogImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CREAM}"/>

  <!-- Subtle texture blobs -->
  <ellipse cx="100" cy="100" rx="200" ry="150" fill="${SAGE}" opacity="0.04" transform="rotate(20, 100, 100)"/>
  <ellipse cx="1100" cy="530" rx="200" ry="150" fill="${TERRACOTTA}" opacity="0.04" transform="rotate(-15, 1100, 530)"/>
  <ellipse cx="1000" cy="100" rx="180" ry="120" fill="${DUSTY_ROSE}" opacity="0.03"/>
  <ellipse cx="200" cy="500" rx="160" ry="130" fill="${HAZEL_LIGHT}" opacity="0.03"/>

  <!-- Leaf cluster (left side) -->
  <g transform="translate(180, 315) scale(1.8)">
    <path d="M0 -30 Q8 -15 0 0 Q-8 -15 0 -30Z" fill="${SAGE}" opacity="0.6"/>
    <path d="M21 -21 Q20 -8 7 -7 Q14 -16 21 -21Z" fill="${TERRACOTTA}" opacity="0.5"/>
    <path d="M30 0 Q15 0 7 -7 Q18 -2 30 0Z" fill="${DUSTY_ROSE}" opacity="0.5"/>
    <path d="M-21 -21 Q-20 -8 -7 -7 Q-14 -16 -21 -21Z" fill="${DUSTY_ROSE}" opacity="0.5"/>
    <path d="M-30 0 Q-15 0 -7 -7 Q-18 -2 -30 0Z" fill="${HAZEL_LIGHT}" opacity="0.5"/>
    <circle cx="0" cy="-5" r="14" fill="${CREAM}"/>
    <circle cx="0" cy="-5" r="13" fill="none" stroke="${HAZEL}" stroke-width="0.8" opacity="0.3"/>
    <text x="0" y="0" text-anchor="middle" font-family="Georgia, serif" font-size="10" font-weight="bold" fill="${HAZEL}">H&amp;H</text>
  </g>

  <!-- Brand name -->
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="${HAZEL}">Hazel &amp; Hue</text>

  <!-- Tagline -->
  <text x="600" y="290" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="${CHARCOAL}" opacity="0.6">Discover the colors that were made for you</text>

  <!-- Divider line -->
  <line x1="480" y1="320" x2="720" y2="320" stroke="${SAGE}" stroke-width="1" opacity="0.4"/>

  <!-- Features -->
  <text x="600" y="370" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" fill="${CHARCOAL}" opacity="0.5">AI-Powered Seasonal Color Analysis</text>
  <text x="600" y="400" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="${CHARCOAL}" opacity="0.4">Palette  ·  Style Guide  ·  Makeup  ·  Hair  ·  Jewelry</text>

  <!-- Price -->
  <rect x="520" y="440" width="160" height="50" rx="12" fill="${HAZEL}" opacity="0.9"/>
  <text x="600" y="473" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="${CREAM}">Just $19</text>

  <!-- Sub-price -->
  <text x="600" y="520" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="${CHARCOAL}" opacity="0.35" font-style="italic">vs. $300+ for an in-person consultation</text>

  <!-- Bottom botanical vine -->
  <g opacity="0.2" transform="translate(350, 580)">
    <path d="M0 10 Q125 0 250 10 Q375 20 500 10" stroke="${SAGE}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M120 10 Q115 2 125 3 Q130 5 125 10" fill="${SAGE}" opacity="0.5"/>
    <path d="M250 10 Q245 18 255 19 Q260 17 255 10" fill="${SAGE}" opacity="0.5"/>
    <path d="M380 10 Q375 2 385 3 Q390 5 385 10" fill="${SAGE}" opacity="0.5"/>
  </g>
</svg>`;
}

async function generate() {
  // Ensure directories exist
  fs.mkdirSync(path.join(ASSETS_DIR, 'textures'), { recursive: true });
  fs.mkdirSync(WEB_PUBLIC, { recursive: true });

  const tasks = [
    {
      name: 'icon.png',
      svg: iconSvg(1024),
      output: path.join(ASSETS_DIR, 'icon.png'),
      size: 1024,
    },
    {
      name: 'splash-icon.png',
      svg: splashSvg(512),
      output: path.join(ASSETS_DIR, 'splash-icon.png'),
      size: 200,
    },
    {
      name: 'adaptive-icon.png',
      svg: adaptiveIconSvg(1024),
      output: path.join(ASSETS_DIR, 'adaptive-icon.png'),
      size: 1024,
    },
    {
      name: 'favicon.png',
      svg: faviconSvg(48),
      output: path.join(ASSETS_DIR, 'favicon.png'),
      size: 48,
    },
    {
      name: 'watercolor-wash.png',
      svg: watercolorSvg(800, 1200),
      output: path.join(ASSETS_DIR, 'textures', 'watercolor-wash.png'),
      width: 800,
      height: 1200,
    },
  ];

  for (const task of tasks) {
    const svgBuffer = Buffer.from(task.svg);
    let pipeline = sharp(svgBuffer);

    if (task.width && task.height) {
      pipeline = pipeline.resize(task.width, task.height);
    } else {
      pipeline = pipeline.resize(task.size, task.size);
    }

    await pipeline.png().toFile(task.output);
    const stats = fs.statSync(task.output);
    console.log(`  ✓ ${task.name} (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  // OG share image
  const ogSvgBuffer = Buffer.from(ogImageSvg());
  await sharp(ogSvgBuffer).resize(1200, 630).png().toFile(path.join(WEB_PUBLIC, 'og-image.png'));
  const ogStats = fs.statSync(path.join(WEB_PUBLIC, 'og-image.png'));
  console.log(`  ✓ og-image.png (${(ogStats.size / 1024).toFixed(1)} KB)`);

  // Web favicon SVG
  const webFavPath = path.join(WEB_PUBLIC, 'favicon.svg');
  fs.writeFileSync(webFavPath, webFaviconSvg());
  console.log(`  ✓ web/public/favicon.svg`);

  console.log('\nAll assets generated successfully!');
}

generate().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
