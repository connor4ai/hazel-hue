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
 * Bold, colorful design that communicates AI color analysis at a glance.
 * Shows seasonal palette swatches, clear value prop, and strong CTA.
 */
function ogImageSvg() {
  // Season palette colors for the swatch display
  const SPRING_COLORS = ['#FF8C69', '#FFB347', '#FFDAB9', '#98D8C8', '#F7DC6F'];
  const SUMMER_COLORS = ['#B19CD9', '#FFB6C1', '#87CEEB', '#C9A0DC', '#E6E6FA'];
  const AUTUMN_COLORS = ['#C67B5C', '#8B6F47', '#A8B5A0', '#D4A574', '#8B4513'];
  const WINTER_COLORS = ['#7B2D5F', '#1B4F72', '#C0392B', '#2C3E50', '#E8E8E8'];

  // Build swatch circles for each season column
  function seasonSwatches(colors, baseX, baseY) {
    return colors.map((c, i) =>
      `<circle cx="${baseX}" cy="${baseY + i * 34}" r="13" fill="${c}"/>`
    ).join('\n    ');
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Rich warm gradient background -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDF6EE"/>
      <stop offset="35%" stop-color="#F8EDE0"/>
      <stop offset="100%" stop-color="#F0DED0"/>
    </linearGradient>
    <!-- Accent gradient for the CTA pill -->
    <linearGradient id="ctaGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${TERRACOTTA}"/>
      <stop offset="100%" stop-color="#D4896E"/>
    </linearGradient>
    <!-- Glow behind the brand name -->
    <radialGradient id="nameGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${HAZEL}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${HAZEL}" stop-opacity="0"/>
    </radialGradient>
    <!-- Vibrant accent blob gradients -->
    <radialGradient id="blobSage" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${SAGE}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${SAGE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobRose" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${DUSTY_ROSE}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${DUSTY_ROSE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobTerra" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${TERRACOTTA}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${TERRACOTTA}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobHazel" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${HAZEL_LIGHT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${HAZEL_LIGHT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Large colorful ambient blobs — visible and vibrant -->
  <ellipse cx="0" cy="0" rx="350" ry="300" fill="url(#blobSage)" transform="rotate(-20, 0, 0)"/>
  <ellipse cx="1200" cy="630" rx="400" ry="320" fill="url(#blobRose)" transform="rotate(15, 1200, 630)"/>
  <ellipse cx="1100" cy="80" rx="280" ry="220" fill="url(#blobTerra)" transform="rotate(-10, 1100, 80)"/>
  <ellipse cx="100" cy="580" rx="300" ry="200" fill="url(#blobHazel)" transform="rotate(25, 100, 580)"/>
  <ellipse cx="600" cy="315" rx="500" ry="250" fill="url(#nameGlow)"/>

  <!-- ============ LEFT SIDE: Branding & Copy ============ -->

  <!-- Overline label -->
  <rect x="60" y="62" width="200" height="30" rx="15" fill="${SAGE}" opacity="0.18"/>
  <text x="160" y="83" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="${HAZEL}" letter-spacing="2.5" opacity="0.85">AI COLOR ANALYSIS</text>

  <!-- Brand name — large and commanding -->
  <text x="60" y="170" font-family="Georgia, 'Playfair Display', serif" font-size="80" font-weight="bold" fill="${HAZEL}">Hazel</text>
  <text x="60" y="245" font-family="Georgia, 'Playfair Display', serif" font-size="80" font-weight="bold" fill="${HAZEL}">&amp; Hue</text>

  <!-- Tagline -->
  <text x="62" y="292" font-family="system-ui, 'DM Sans', sans-serif" font-size="22" fill="${CHARCOAL}" opacity="0.7">Discover the colors that were made for you.</text>

  <!-- Feature pills row -->
  <g transform="translate(60, 322)">
    <rect x="0" y="0" width="110" height="32" rx="16" fill="${DUSTY_ROSE}" opacity="0.2"/>
    <text x="55" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="${CHARCOAL}" opacity="0.75">Your Palette</text>

    <rect x="120" y="0" width="110" height="32" rx="16" fill="${SAGE}" opacity="0.2"/>
    <text x="175" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="${CHARCOAL}" opacity="0.75">Style Guide</text>

    <rect x="240" y="0" width="90" height="32" rx="16" fill="${TERRACOTTA}" opacity="0.15"/>
    <text x="285" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="${CHARCOAL}" opacity="0.75">Makeup</text>

    <rect x="340" y="0" width="80" height="32" rx="16" fill="${HAZEL_LIGHT}" opacity="0.18"/>
    <text x="380" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="${CHARCOAL}" opacity="0.75">Hair</text>
  </g>

  <!-- CTA button -->
  <rect x="60" y="388" width="220" height="54" rx="27" fill="url(#ctaGrad)"/>
  <text x="170" y="422" text-anchor="middle" font-family="system-ui, sans-serif" font-size="19" font-weight="700" fill="white">Download Free App</text>

  <!-- Social proof -->
  <text x="62" y="474" font-family="system-ui, sans-serif" font-size="15" fill="${CHARCOAL}" opacity="0.5">
    <tspan font-weight="600" fill="${HAZEL}" opacity="1">2,400+</tspan>
    <tspan> users  </tspan>
    <tspan dx="8" fill="${HAZEL_LIGHT}" opacity="0.5">|</tspan>
    <tspan dx="8" font-weight="600" fill="${HAZEL}" opacity="1">4.9</tspan>
    <tspan> rating  </tspan>
    <tspan dx="8" fill="${HAZEL_LIGHT}" opacity="0.5">|</tspan>
    <tspan dx="8">60 seconds</tspan>
  </text>

  <!-- ============ RIGHT SIDE: Season Palette Showcase ============ -->

  <!-- Background card for swatches area -->
  <rect x="580" y="50" width="570" height="530" rx="28" fill="white" opacity="0.45"/>
  <rect x="580" y="50" width="570" height="530" rx="28" fill="none" stroke="${HAZEL}" stroke-width="1" opacity="0.08"/>

  <!-- Section heading -->
  <text x="865" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${HAZEL}" opacity="0.8">Your Season, Your Colors</text>
  <line x1="740" y1="115" x2="990" y2="115" stroke="${HAZEL}" stroke-width="0.8" opacity="0.15"/>

  <!-- Four season columns with labels and color swatches -->
  <!-- SPRING -->
  <g transform="translate(655, 140)">
    <text x="0" y="14" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#D4896E">Spring</text>
    ${seasonSwatches(SPRING_COLORS, 0, 40)}
    <!-- Warm coral highlight ring on first swatch -->
    <circle cx="0" cy="40" r="16" fill="none" stroke="#FF8C69" stroke-width="2" opacity="0.5"/>
  </g>

  <!-- SUMMER -->
  <g transform="translate(790, 140)">
    <text x="0" y="14" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#9B8EC4">Summer</text>
    ${seasonSwatches(SUMMER_COLORS, 0, 40)}
    <circle cx="0" cy="40" r="16" fill="none" stroke="#B19CD9" stroke-width="2" opacity="0.5"/>
  </g>

  <!-- AUTUMN -->
  <g transform="translate(925, 140)">
    <text x="0" y="14" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="${TERRACOTTA}">Autumn</text>
    ${seasonSwatches(AUTUMN_COLORS, 0, 40)}
    <circle cx="0" cy="40" r="16" fill="none" stroke="${TERRACOTTA}" stroke-width="2" opacity="0.5"/>
  </g>

  <!-- WINTER -->
  <g transform="translate(1060, 140)">
    <text x="0" y="14" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#5B2D4F">Winter</text>
    ${seasonSwatches(WINTER_COLORS, 0, 40)}
    <circle cx="0" cy="40" r="16" fill="none" stroke="#7B2D5F" stroke-width="2" opacity="0.5"/>
  </g>

  <!-- Large decorative color fan / bloom at bottom-right of swatch card -->
  <g transform="translate(865, 440)">
    <!-- Overlapping color petals radiating outward -->
    <ellipse cx="-70" cy="15" rx="50" ry="22" fill="${SAGE}" opacity="0.5" transform="rotate(-30, -70, 15)"/>
    <ellipse cx="-35" cy="-30" rx="50" ry="22" fill="${TERRACOTTA}" opacity="0.45" transform="rotate(-60, -35, -30)"/>
    <ellipse cx="20" cy="-45" rx="50" ry="22" fill="${DUSTY_ROSE}" opacity="0.5" transform="rotate(-85, 20, -45)"/>
    <ellipse cx="70" cy="-30" rx="50" ry="22" fill="#B19CD9" opacity="0.4" transform="rotate(-110, 70, -30)"/>
    <ellipse cx="100" cy="15" rx="50" ry="22" fill="${HAZEL_LIGHT}" opacity="0.45" transform="rotate(-140, 100, 15)"/>
    <ellipse cx="70" cy="55" rx="50" ry="22" fill="#7B2D5F" opacity="0.3" transform="rotate(-165, 70, 55)"/>
    <ellipse cx="15" cy="65" rx="50" ry="22" fill="#FF8C69" opacity="0.35" transform="rotate(-195, 15, 65)"/>
    <ellipse cx="-45" cy="50" rx="50" ry="22" fill="${SAGE}" opacity="0.35" transform="rotate(-220, -45, 50)"/>
    <!-- Center dot -->
    <circle cx="15" cy="12" r="18" fill="white" opacity="0.85"/>
    <circle cx="15" cy="12" r="16" fill="none" stroke="${HAZEL}" stroke-width="1.2" opacity="0.3"/>
    <text x="15" y="18" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="${HAZEL}">H&amp;H</text>
  </g>

  <!-- Decorative floating squares (echoing the current site style) -->
  <g opacity="0.35">
    <rect x="540" y="45" width="18" height="18" rx="3" fill="${DUSTY_ROSE}" transform="rotate(15, 549, 54)"/>
    <rect x="1125" y="555" width="22" height="22" rx="4" fill="${SAGE}" transform="rotate(-20, 1136, 566)"/>
    <rect x="565" y="560" width="14" height="14" rx="2" fill="${TERRACOTTA}" transform="rotate(25, 572, 567)"/>
    <rect x="1100" y="80" width="16" height="16" rx="3" fill="${HAZEL_LIGHT}" transform="rotate(-10, 1108, 88)"/>
  </g>

  <!-- Bottom edge accent line -->
  <rect x="0" y="620" width="1200" height="10" fill="${HAZEL}" opacity="0.08"/>
  <rect x="60" y="622" width="120" height="6" rx="3" fill="${TERRACOTTA}" opacity="0.5"/>
  <rect x="190" y="622" width="60" height="6" rx="3" fill="${SAGE}" opacity="0.4"/>
  <rect x="260" y="622" width="40" height="6" rx="3" fill="${DUSTY_ROSE}" opacity="0.4"/>
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
