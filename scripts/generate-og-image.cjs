#!/usr/bin/env node
/**
 * Generate a premium OG share image using Playwright for high-fidelity rendering.
 * Dark editorial design with bold color palette showcase.
 *
 * Run: node scripts/generate-og-image.cjs
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const OUTPUT = path.join(__dirname, '..', 'web', 'public', 'og-image.png');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    background: #1a1615;
  }

  .canvas {
    position: relative;
    width: 1200px;
    height: 630px;
    overflow: hidden;
    display: flex;
  }

  /* ── Rich dark background ── */
  .bg-base {
    position: absolute; inset: 0;
    background: linear-gradient(145deg, #1e1a18 0%, #251f1d 35%, #1a1615 65%, #14110f 100%);
  }

  /* Ambient color orbs */
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); }
  .orb-1 { width: 550px; height: 550px; top: -150px; left: -100px; background: radial-gradient(circle, rgba(198,123,92,0.28) 0%, transparent 70%); }
  .orb-2 { width: 500px; height: 500px; bottom: -180px; right: -50px; background: radial-gradient(circle, rgba(177,156,217,0.18) 0%, transparent 70%); }
  .orb-3 { width: 450px; height: 450px; top: 40%; left: 45%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(168,181,160,0.1) 0%, transparent 70%); }
  .orb-4 { width: 400px; height: 400px; bottom: -100px; left: 200px; background: radial-gradient(circle, rgba(212,165,165,0.15) 0%, transparent 70%); }

  /* ── Left panel ── */
  .left {
    position: relative;
    z-index: 2;
    width: 480px;
    padding: 52px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 18px;
    border-radius: 100px;
    background: rgba(168,181,160,0.12);
    border: 1px solid rgba(168,181,160,0.22);
    width: fit-content;
    margin-bottom: 28px;
  }
  .badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #A8B5A0;
    box-shadow: 0 0 10px rgba(168,181,160,0.7);
  }
  .badge-text {
    font-size: 11px; font-weight: 600;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(253,246,238,0.65);
  }

  .brand-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 76px; font-weight: 800;
    line-height: 0.92; color: #FDF6EE;
    margin-bottom: 14px;
  }
  .brand-name .amp {
    font-style: italic;
    background: linear-gradient(135deg, #C67B5C, #D4A5A5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-style: italic;
    color: rgba(253,246,238,0.4);
    margin-bottom: 32px; line-height: 1.4;
  }

  .features {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 32px;
  }
  .pill {
    padding: 7px 15px; border-radius: 100px;
    font-size: 12.5px; font-weight: 600;
    border: 1px solid rgba(253,246,238,0.08);
    color: rgba(253,246,238,0.55);
    background: rgba(253,246,238,0.04);
  }
  .pill.a1 { border-color: rgba(198,123,92,0.35); color: #D4956E; background: rgba(198,123,92,0.1); }
  .pill.a2 { border-color: rgba(168,181,160,0.3); color: #B8C5B0; background: rgba(168,181,160,0.08); }
  .pill.a3 { border-color: rgba(212,165,165,0.3); color: #E0B8B8; background: rgba(212,165,165,0.08); }
  .pill.a4 { border-color: rgba(177,156,217,0.3); color: #C4ACE0; background: rgba(177,156,217,0.08); }

  .cta-btn {
    display: inline-block;
    padding: 16px 40px; border-radius: 100px;
    background: linear-gradient(135deg, #C67B5C 0%, #D4956E 100%);
    color: white; font-size: 17px; font-weight: 700;
    box-shadow: 0 10px 40px rgba(198,123,92,0.4), 0 2px 8px rgba(198,123,92,0.25);
    letter-spacing: 0.3px;
    margin-bottom: 16px;
  }

  .social-proof {
    font-size: 13px; color: rgba(253,246,238,0.3);
  }
  .social-proof strong { color: rgba(253,246,238,0.55); font-weight: 600; }
  .stars { color: #F7DC6F; font-size: 14px; letter-spacing: 1px; }

  /* ── Right panel: palette showcase ── */
  .right {
    position: relative; z-index: 2;
    flex: 1; display: flex;
    align-items: center; justify-content: center;
    padding: 30px 36px 30px 16px;
  }

  .palette-card {
    position: relative;
    width: 600px; height: 550px;
    border-radius: 24px;
    background: rgba(253,246,238,0.05);
    border: 1px solid rgba(253,246,238,0.08);
    overflow: hidden; padding: 32px 28px;
  }
  .palette-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(253,246,238,0.15), transparent);
  }

  .card-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 16px; color: rgba(253,246,238,0.45);
    text-align: center; margin-bottom: 22px; letter-spacing: 0.5px;
  }

  /* Season columns with big swatches */
  .seasons {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .season { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .season-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 15px; font-weight: 700; margin-bottom: 2px;
  }
  .season-name.sp { color: #FFB347; }
  .season-name.su { color: #B19CD9; }
  .season-name.au { color: #D4956E; }
  .season-name.wi { color: #87CEEB; }

  .grid3x2 {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
  }
  .sw {
    width: 44px; height: 44px; border-radius: 10px;
    box-shadow: 0 3px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.06);
  }

  /* Color fan — bold radiating arcs */
  .fan {
    position: absolute;
    bottom: -10px; left: 50%; transform: translateX(-50%);
    width: 500px; height: 180px;
  }
  .arc {
    position: absolute; bottom: 0; left: 50%;
    width: 140px; height: 70px;
    border-radius: 70px 70px 0 0;
    transform-origin: bottom center;
    box-shadow: 0 -2px 16px rgba(0,0,0,0.2);
  }

  /* Frosted result card */
  .result-bar {
    position: absolute; bottom: 24px; left: 50%;
    transform: translateX(-50%);
    background: rgba(20,17,15,0.82);
    border: 1px solid rgba(253,246,238,0.1);
    border-radius: 16px;
    padding: 14px 24px;
    display: flex; align-items: center; gap: 14px;
    width: 460px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .result-label {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px; font-weight: 700; color: #FDF6EE;
  }
  .result-desc { font-size: 11px; color: rgba(253,246,238,0.35); margin-top: 2px; }
  .result-dots { display: flex; gap: 6px; margin-left: auto; }
  .dot {
    width: 28px; height: 28px; border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    border: 2px solid rgba(255,255,255,0.1);
  }

  /* Divider */
  .divider {
    position: absolute; left: 480px; top: 80px; bottom: 80px;
    width: 1px; z-index: 3;
    background: linear-gradient(180deg, transparent, rgba(253,246,238,0.06), rgba(253,246,238,0.1), rgba(253,246,238,0.06), transparent);
  }

  /* Grain */
  .grain {
    position: absolute; inset: 0; z-index: 10; opacity: 0.025; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
</style>
</head>
<body>
<div class="canvas">
  <div class="bg-base"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <div class="orb orb-4"></div>
  <div class="divider"></div>
  <div class="grain"></div>

  <!-- LEFT -->
  <div class="left">
    <div class="badge">
      <div class="badge-dot"></div>
      <span class="badge-text">AI Color Analysis</span>
    </div>

    <div class="brand-name">Hazel<br><span class="amp">&amp;</span> Hue</div>
    <div class="tagline">Discover the colors made for you</div>

    <div class="features">
      <div class="pill a1">Palette</div>
      <div class="pill a2">Style Guide</div>
      <div class="pill a3">Makeup</div>
      <div class="pill a4">Hair</div>
      <div class="pill">Nails</div>
      <div class="pill">Jewelry</div>
    </div>

    <div class="cta-btn">Try Free &mdash; 60 Seconds</div>
    <div class="social-proof">
      <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>&nbsp;
      <strong>4.8</strong> &middot; <strong>2,400+</strong> analyses
    </div>
  </div>

  <!-- RIGHT -->
  <div class="right">
    <div class="palette-card">
      <div class="card-heading">Your Season, Your Colors</div>

      <div class="seasons">
        <div class="season">
          <div class="season-name sp">Spring</div>
          <div class="grid3x2">
            <div class="sw" style="background:#FF8C69"></div>
            <div class="sw" style="background:#FFB347"></div>
            <div class="sw" style="background:#FFDAB9"></div>
            <div class="sw" style="background:#98D8C8"></div>
            <div class="sw" style="background:#F7DC6F"></div>
            <div class="sw" style="background:#FFE4B5"></div>
          </div>
        </div>

        <div class="season">
          <div class="season-name su">Summer</div>
          <div class="grid3x2">
            <div class="sw" style="background:#B19CD9"></div>
            <div class="sw" style="background:#FFB6C1"></div>
            <div class="sw" style="background:#87CEEB"></div>
            <div class="sw" style="background:#C9A0DC"></div>
            <div class="sw" style="background:#E6E6FA"></div>
            <div class="sw" style="background:#B0C4DE"></div>
          </div>
        </div>

        <div class="season">
          <div class="season-name au">Autumn</div>
          <div class="grid3x2">
            <div class="sw" style="background:#C67B5C"></div>
            <div class="sw" style="background:#8B6F47"></div>
            <div class="sw" style="background:#A8B5A0"></div>
            <div class="sw" style="background:#D4A574"></div>
            <div class="sw" style="background:#8B4513"></div>
            <div class="sw" style="background:#CD853F"></div>
          </div>
        </div>

        <div class="season">
          <div class="season-name wi">Winter</div>
          <div class="grid3x2">
            <div class="sw" style="background:#7B2D5F"></div>
            <div class="sw" style="background:#1B4F72"></div>
            <div class="sw" style="background:#C0392B"></div>
            <div class="sw" style="background:#2C3E50"></div>
            <div class="sw" style="background:#E8E8E8"></div>
            <div class="sw" style="background:#4A0E4E"></div>
          </div>
        </div>
      </div>

      <!-- Color fan -->
      <div class="fan">
        <div class="arc" style="background:linear-gradient(to top, #FF8C69, #FFB374); opacity:0.85; transform:translateX(-50%) rotate(-49deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #FFB347, #F7DC6F); opacity:0.8; transform:translateX(-50%) rotate(-35deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #98D8C8, #A8B5A0); opacity:0.8; transform:translateX(-50%) rotate(-21deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #B19CD9, #C9A0DC); opacity:0.85; transform:translateX(-50%) rotate(-7deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #FFB6C1, #D4A5A5); opacity:0.8; transform:translateX(-50%) rotate(7deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #C67B5C, #D4956E); opacity:0.85; transform:translateX(-50%) rotate(21deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #A8B5A0, #8B6F47); opacity:0.8; transform:translateX(-50%) rotate(35deg);"></div>
        <div class="arc" style="background:linear-gradient(to top, #7B2D5F, #4A0E4E); opacity:0.85; transform:translateX(-50%) rotate(49deg);"></div>
      </div>

      <!-- Result bar -->
      <div class="result-bar">
        <div>
          <div class="result-label">Soft Autumn</div>
          <div class="result-desc">Your personalized palette &mdash; 30+ colors</div>
        </div>
        <div class="result-dots">
          <div class="dot" style="background:#C67B5C"></div>
          <div class="dot" style="background:#D4A5A5"></div>
          <div class="dot" style="background:#A8B5A0"></div>
          <div class="dot" style="background:#8B6F47"></div>
          <div class="dot" style="background:#B19CD9"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

async function generate() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Render to temp file then optimize with sharp
  const tmpPath = OUTPUT + '.tmp.png';
  await page.screenshot({ path: tmpPath, type: 'png' });
  await browser.close();

  // Optimize: re-encode with sharp for smaller file size
  await sharp(tmpPath)
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(OUTPUT);

  fs.unlinkSync(tmpPath);
  const stats = fs.statSync(OUTPUT);
  console.log(`  ✓ og-image.png (${(stats.size / 1024).toFixed(1)} KB) → ${OUTPUT}`);
}

generate().catch((err) => {
  console.error('OG image generation failed:', err);
  process.exit(1);
});
