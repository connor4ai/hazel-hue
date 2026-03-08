/**
 * Hazel & Hue typography system.
 *
 * Display: Fraunces — warm, organic serif with character
 * Body: Satoshi / system sans — clean, readable
 * Accent: Script font for decorative callouts (loaded via expo-font)
 */
export const fontFamilies = {
  display: 'Fraunces_400Regular',
  displayBold: 'Fraunces_700Bold',
  displayItalic: 'Fraunces_400Regular_Italic',
  body: 'System', // Falls back to platform default; replace with Satoshi when loaded
  bodyMedium: 'System',
  bodyBold: 'System',
  mono: 'SpaceMono-Regular',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

/**
 * Semantic text styles for consistent usage across the app.
 */
export const textStyles = {
  // Display — for the season reveal and major headings
  displayLarge: {
    fontFamily: fontFamilies.displayBold,
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamilies.displayBold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
  },

  // Headings
  h1: {
    fontFamily: fontFamilies.displayBold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontFamily: fontFamilies.displayBold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontFamily: fontFamilies.display,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
  },

  // Body
  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },

  // Labels & captions
  label: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
  },

  // Monospace — for hex codes and technical details
  code: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },
} as const;
