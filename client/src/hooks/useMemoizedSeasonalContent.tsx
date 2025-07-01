import { useMemo } from 'react';

// Memoized seasonal content processing to avoid expensive recalculations
export const useMemoizedSeasonalContent = (seasonalContent: any) => {
  return useMemo(() => {
    if (!seasonalContent) return null;

    // Parse and memoize signature colors
    const signatureColors = seasonalContent.signatureColors?.map((color: string) => {
      const match = color.match(/#[0-9A-Fa-f]{6}/);
      const hex = match ? match[0] : '#000000';
      const name = color.replace(/#[0-9A-Fa-f]{6}/, '').trim().replace(/^-\s*/, '');
      return { hex, name: name || 'Color' };
    }) || [];

    // Parse and memoize makeup palettes  
    const makeupPalettes = seasonalContent.makeup ? {
      foundation: seasonalContent.makeup.foundation || [],
      eyeshadow: seasonalContent.makeup.eyeshadow || [],
      blush: seasonalContent.makeup.blush || [],
      lipstick: seasonalContent.makeup.lipstick || [],
      eyeliner: seasonalContent.makeup.eyeliner || []
    } : null;

    // Parse and memoize jewelry recommendations
    const jewelryData = seasonalContent.jewelry ? {
      metals: seasonalContent.jewelry.bestMetals || [],
      styles: seasonalContent.jewelry.recommendedStyles || [],
      description: seasonalContent.jewelry.description || ''
    } : null;

    // Parse and memoize hair colors to avoid
    const hairColorsToAvoid = seasonalContent.hairColorsToAvoid || [];

    return {
      signatureColors,
      makeupPalettes,
      jewelryData,
      hairColorsToAvoid,
      characteristics: seasonalContent.characteristics || [],
      colorsToAvoid: seasonalContent.colorsToAvoid || [],
      pinterestBoards: seasonalContent.pinterestBoards || [],
      celebrities: seasonalContent.celebrities || []
    };
  }, [seasonalContent]);
};

// Memoized color parsing utility
export const useMemoizedColorParsing = (colors: string[]) => {
  return useMemo(() => {
    return colors.map(color => {
      const match = color.match(/#[0-9A-Fa-f]{6}/);
      const hex = match ? match[0] : '#000000';
      const name = color.replace(/#[0-9A-Fa-f]{6}/, '').trim().replace(/^-\s*/, '');
      return { hex, name: name || 'Color' };
    });
  }, [colors]);
};