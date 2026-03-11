/**
 * CIEDE2000 perceptual color distance implementation.
 *
 * This is the gold standard for measuring how different two colors appear
 * to the human eye. Used to score how well a product's color matches
 * a user's seasonal palette.
 *
 * Reference: "The CIEDE2000 Color-Difference Formula: Implementation Notes,
 * Supplementary Test Data, and Mathematical Observations" — Sharma, Wu, Dalal (2005)
 */

// ─── Color Space Types ─────────────────────────────────────────────

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface Lab {
  L: number; // 0-100 (lightness)
  a: number; // -128 to 127 (green to red)
  b: number; // -128 to 127 (blue to yellow)
}

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

// ─── Constants ─────────────────────────────────────────────────────

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// D65 standard illuminant reference white point
const REF_X = 95.047;
const REF_Y = 100.0;
const REF_Z = 108.883;

// CIEDE2000 parametric weighting factors (default = 1)
const K_L = 1;
const K_C = 1;
const K_H = 1;

// ─── Hex ↔ RGB ─────────────────────────────────────────────────────

export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (c: number) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// ─── RGB → XYZ (sRGB linearization + D65) ──────────────────────────

function linearize(c: number): number {
  const s = c / 255;
  return s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
}

export function rgbToXyz(rgb: RGB): XYZ {
  const r = linearize(rgb.r);
  const g = linearize(rgb.g);
  const b = linearize(rgb.b);

  return {
    x: (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) * 100,
    y: (r * 0.2126729 + g * 0.7151522 + b * 0.0721750) * 100,
    z: (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) * 100,
  };
}

// ─── XYZ → CIELAB ──────────────────────────────────────────────────

function labF(t: number): number {
  const delta = 6 / 29;
  return t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta * delta) + 4 / 29;
}

export function xyzToLab(xyz: XYZ): Lab {
  const fx = labF(xyz.x / REF_X);
  const fy = labF(xyz.y / REF_Y);
  const fz = labF(xyz.z / REF_Z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

// ─── Convenience: Hex → Lab ────────────────────────────────────────

export function hexToLab(hex: string): Lab {
  return xyzToLab(rgbToXyz(hexToRgb(hex)));
}

// ─── CIEDE2000 ΔE Implementation ──────────────────────────────────

/**
 * Computes the CIEDE2000 color difference between two Lab colors.
 * Returns a perceptual distance where:
 *   0      = identical
 *   ~1     = barely perceptible
 *   ~2.3   = just noticeable difference (JND)
 *   ~5     = clearly different
 *   ~12    = very different
 *   ~25+   = opposite colors
 */
export function ciede2000(lab1: Lab, lab2: Lab): number {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;

  // Step 1: Calculate Cab, hab
  const C1ab = Math.sqrt(a1 * a1 + b1 * b1);
  const C2ab = Math.sqrt(a2 * a2 + b2 * b2);
  const CabMean = (C1ab + C2ab) / 2;

  const CabMean7 = Math.pow(CabMean, 7);
  const G = 0.5 * (1 - Math.sqrt(CabMean7 / (CabMean7 + Math.pow(25, 7))));

  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);

  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  let h1p = Math.atan2(b1, a1p) * RAD_TO_DEG;
  if (h1p < 0) h1p += 360;

  let h2p = Math.atan2(b2, a2p) * RAD_TO_DEG;
  if (h2p < 0) h2p += 360;

  // Step 2: Calculate ΔL', ΔC', ΔH'
  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp: number;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    dhp = h2p - h1p;
  } else if (h2p - h1p > 180) {
    dhp = h2p - h1p - 360;
  } else {
    dhp = h2p - h1p + 360;
  }

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * DEG_TO_RAD);

  // Step 3: Calculate CIEDE2000 ΔE
  const LpMean = (L1 + L2) / 2;
  const CpMean = (C1p + C2p) / 2;

  let hpMean: number;
  if (C1p * C2p === 0) {
    hpMean = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    hpMean = (h1p + h2p) / 2;
  } else if (h1p + h2p < 360) {
    hpMean = (h1p + h2p + 360) / 2;
  } else {
    hpMean = (h1p + h2p - 360) / 2;
  }

  const T =
    1 -
    0.17 * Math.cos((hpMean - 30) * DEG_TO_RAD) +
    0.24 * Math.cos(2 * hpMean * DEG_TO_RAD) +
    0.32 * Math.cos((3 * hpMean + 6) * DEG_TO_RAD) -
    0.20 * Math.cos((4 * hpMean - 63) * DEG_TO_RAD);

  const dTheta = 30 * Math.exp(-Math.pow((hpMean - 275) / 25, 2));
  const CpMean7 = Math.pow(CpMean, 7);
  const RC = 2 * Math.sqrt(CpMean7 / (CpMean7 + Math.pow(25, 7)));
  const SL = 1 + (0.015 * Math.pow(LpMean - 50, 2)) / Math.sqrt(20 + Math.pow(LpMean - 50, 2));
  const SC = 1 + 0.045 * CpMean;
  const SH = 1 + 0.015 * CpMean * T;
  const RT = -Math.sin(2 * dTheta * DEG_TO_RAD) * RC;

  return Math.sqrt(
    Math.pow(dLp / (K_L * SL), 2) +
    Math.pow(dCp / (K_C * SC), 2) +
    Math.pow(dHp / (K_H * SH), 2) +
    RT * (dCp / (K_C * SC)) * (dHp / (K_H * SH)),
  );
}

// ─── High-Level Matching API ───────────────────────────────────────

/**
 * Computes the CIEDE2000 distance between two hex colors.
 */
export function colorDistance(hex1: string, hex2: string): number {
  return ciede2000(hexToLab(hex1), hexToLab(hex2));
}

/**
 * Scores how well a product's dominant colors match a user's palette.
 *
 * Returns 0-100 where 100 = perfect match. The algorithm finds the
 * best pairing between any product color and any palette color,
 * then converts the perceptual distance to a score.
 *
 * Scoring curve:
 *   ΔE 0   → 100 (identical)
 *   ΔE 5   → 90  (excellent match)
 *   ΔE 12  → 76  (good match)
 *   ΔE 25  → 50  (fair match)
 *   ΔE 50+ → 0   (no match)
 */
export function paletteMatchScore(
  productColorHexes: string[],
  paletteHexes: string[],
): number {
  if (productColorHexes.length === 0 || paletteHexes.length === 0) return 0;

  let bestDistance = Infinity;

  for (const productHex of productColorHexes) {
    const productLab = hexToLab(productHex);
    for (const paletteHex of paletteHexes) {
      const paletteLab = hexToLab(paletteHex);
      const dist = ciede2000(productLab, paletteLab);
      if (dist < bestDistance) {
        bestDistance = dist;
      }
    }
  }

  // Convert distance to 0-100 score with sigmoid-like curve
  // ΔE 0 → 100, ΔE 50 → 0
  return Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - bestDistance / 50), 1.5)));
}

/**
 * Given a list of products with extracted colors, rank them by palette match.
 * Returns the same array sorted by descending match score, with scores attached.
 */
export function rankByPaletteMatch<T extends { dominantColors: string[] }>(
  products: T[],
  paletteHexes: string[],
): (T & { matchScore: number; matchedPaletteHex: string })[] {
  return products
    .map((product) => {
      let bestScore = 0;
      let bestPaletteHex = paletteHexes[0] ?? '';

      for (const productHex of product.dominantColors) {
        const productLab = hexToLab(productHex);
        for (const paletteHex of paletteHexes) {
          const paletteLab = hexToLab(paletteHex);
          const dist = ciede2000(productLab, paletteLab);
          const score = Math.max(0, Math.round(100 * Math.pow(Math.max(0, 1 - dist / 50), 1.5)));
          if (score > bestScore) {
            bestScore = score;
            bestPaletteHex = paletteHex;
          }
        }
      }

      return { ...product, matchScore: bestScore, matchedPaletteHex: bestPaletteHex };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
