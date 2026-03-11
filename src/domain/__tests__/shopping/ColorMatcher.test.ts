import {
  hexToRgb,
  rgbToHex,
  hexToLab,
  ciede2000,
  colorDistance,
  paletteMatchScore,
  rankByPaletteMatch,
} from '../../shopping/services/ColorMatcher';

describe('ColorMatcher', () => {
  describe('hexToRgb', () => {
    it('parses standard hex colors', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('handles lowercase hex', () => {
      expect(hexToRgb('#ff8c69')).toEqual({ r: 255, g: 140, b: 105 });
    });

    it('handles hex without #', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('rejects invalid hex', () => {
      expect(() => hexToRgb('#GGG')).toThrow('Invalid hex color');
      expect(() => hexToRgb('#12345')).toThrow('Invalid hex color');
      expect(() => hexToRgb('')).toThrow('Invalid hex color');
    });
  });

  describe('rgbToHex', () => {
    it('converts RGB to hex', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
      expect(rgbToHex({ r: 139, g: 111, b: 71 })).toBe('#8b6f47'); // hazel brand color
    });

    it('clamps out-of-range values', () => {
      expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe('#ff0080');
    });
  });

  describe('hexToLab', () => {
    it('converts white correctly', () => {
      const lab = hexToLab('#FFFFFF');
      expect(lab.L).toBeCloseTo(100, 0);
      expect(lab.a).toBeCloseTo(0, 0);
      expect(lab.b).toBeCloseTo(0, 0);
    });

    it('converts black correctly', () => {
      const lab = hexToLab('#000000');
      expect(lab.L).toBeCloseTo(0, 0);
    });

    it('converts pure red to Lab with positive a*', () => {
      const lab = hexToLab('#FF0000');
      expect(lab.L).toBeGreaterThan(40);
      expect(lab.a).toBeGreaterThan(50); // Red is positive a*
    });

    it('converts pure green to Lab with negative a*', () => {
      const lab = hexToLab('#00FF00');
      expect(lab.a).toBeLessThan(-50); // Green is negative a*
    });
  });

  describe('ciede2000', () => {
    it('returns 0 for identical colors', () => {
      const lab = hexToLab('#8B6F47');
      expect(ciede2000(lab, lab)).toBe(0);
    });

    it('returns small distance for similar colors', () => {
      const lab1 = hexToLab('#8B6F47'); // hazel
      const lab2 = hexToLab('#8B7050'); // very similar
      expect(ciede2000(lab1, lab2)).toBeLessThan(5);
    });

    it('returns large distance for very different colors', () => {
      const lab1 = hexToLab('#FF0000'); // red
      const lab2 = hexToLab('#0000FF'); // blue
      expect(ciede2000(lab1, lab2)).toBeGreaterThan(30);
    });

    it('returns moderate distance for somewhat different colors', () => {
      const lab1 = hexToLab('#FF8C69'); // coral
      const lab2 = hexToLab('#FFB347'); // orange
      const dist = ciede2000(lab1, lab2);
      expect(dist).toBeGreaterThan(5);
      expect(dist).toBeLessThan(25);
    });

    // Sharma et al. (2005) test pairs — these are the published verification values
    it('matches Sharma test pair 1', () => {
      // L1=50.0000, a1=2.6772, b1=-79.7751
      // L2=50.0000, a2=0.0000, b2=-82.7485
      const dE = ciede2000(
        { L: 50.0, a: 2.6772, b: -79.7751 },
        { L: 50.0, a: 0.0, b: -82.7485 },
      );
      expect(dE).toBeCloseTo(2.0425, 3);
    });

    it('produces consistent near-neutral color difference', () => {
      // Near-neutral test: colors close to the achromatic axis
      const dE = ciede2000(
        { L: 50.0, a: 2.5, b: 0.0 },
        { L: 50.0, a: 0.0, b: -2.5 },
      );
      // These near-neutral colors should have a moderate perceptual difference
      expect(dE).toBeGreaterThan(2);
      expect(dE).toBeLessThan(6);
    });

    it('is symmetric', () => {
      const lab1 = hexToLab('#FF8C69');
      const lab2 = hexToLab('#B19CD9');
      expect(ciede2000(lab1, lab2)).toBeCloseTo(ciede2000(lab2, lab1), 10);
    });
  });

  describe('colorDistance', () => {
    it('computes distance between hex colors', () => {
      expect(colorDistance('#FF0000', '#FF0000')).toBe(0);
      expect(colorDistance('#FF0000', '#00FF00')).toBeGreaterThan(50);
    });
  });

  describe('paletteMatchScore', () => {
    const springPalette = ['#F5C16C', '#FFB88C', '#E8A0BF', '#98D8C8', '#FADADD'];

    it('returns 100 for exact match', () => {
      expect(paletteMatchScore(['#F5C16C'], springPalette)).toBe(100);
    });

    it('returns high score for close match', () => {
      const score = paletteMatchScore(['#F5C070'], springPalette);
      expect(score).toBeGreaterThan(85);
    });

    it('returns low score for distant colors', () => {
      const score = paletteMatchScore(['#000080'], springPalette); // navy vs spring palette
      expect(score).toBeLessThan(40);
    });

    it('returns 0 for empty inputs', () => {
      expect(paletteMatchScore([], springPalette)).toBe(0);
      expect(paletteMatchScore(['#FF0000'], [])).toBe(0);
    });

    it('finds the best match across multiple product colors', () => {
      // Product has multiple colors, one is close to palette
      const score = paletteMatchScore(
        ['#000000', '#F5C16C', '#333333'], // middle one matches
        springPalette,
      );
      expect(score).toBe(100);
    });
  });

  describe('rankByPaletteMatch', () => {
    const palette = ['#FF0000', '#00FF00'];

    it('sorts products by descending match score', () => {
      const products = [
        { id: 'far', dominantColors: ['#0000FF'] },   // far from palette
        { id: 'exact', dominantColors: ['#FF0000'] },  // exact match
        { id: 'close', dominantColors: ['#FF1111'] },  // close match
      ];

      const ranked = rankByPaletteMatch(products, palette);
      expect(ranked[0].id).toBe('exact');
      expect(ranked[0].matchScore).toBe(100);
      expect(ranked[1].id).toBe('close');
      expect(ranked[1].matchScore).toBeGreaterThan(ranked[2].matchScore);
    });

    it('attaches the matched palette hex', () => {
      const products = [
        { id: 'green-match', dominantColors: ['#00FF00'] },
      ];

      const ranked = rankByPaletteMatch(products, palette);
      expect(ranked[0].matchedPaletteHex).toBe('#00FF00');
    });

    it('handles empty product list', () => {
      expect(rankByPaletteMatch([], palette)).toEqual([]);
    });
  });
});
