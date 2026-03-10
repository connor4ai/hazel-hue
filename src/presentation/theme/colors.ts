/**
 * Hazel & Hue brand color palette.
 * Premium, artisanal aesthetic — warm, earthy, organic.
 */
export const colors = {
  // Primary brand colors
  hazel: '#8B6F47',
  cream: '#FDF6EE',
  sage: '#A8B5A0',
  terracotta: '#C67B5C',
  dustyRose: '#D4A5A5',
  charcoal: '#3D3D3D',

  // Functional
  white: '#FFFFFF',
  black: '#1A1A1A',
  error: '#C0392B',
  success: '#27AE60',
  warning: '#F39C12',

  // Neutrals
  cream50: '#FEFCF9',
  cream100: '#FDF6EE',
  cream200: '#F9EDD9',
  cream300: '#F2DFC0',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',

  // Hazel shades
  hazel50: '#F5F0EA',
  hazel100: '#E6D9C7',
  hazel200: '#D4C0A0',
  hazel300: '#B89B6F',
  hazel400: '#8B6F47',
  hazel500: '#6B5535',

  // Extended palette
  lavender: '#B19CD9',
  plum: '#7B2D5F',
  coral: '#FF8C69',
  midnight: '#1A1A2E',

  // Season accent colors (used to tint the results experience)
  seasonAccent: {
    SPRING: '#FF8C69', // warm coral
    SUMMER: '#B19CD9', // soft lavender
    AUTUMN: '#C67B5C', // burnt sienna (terracotta)
    WINTER: '#7B2D5F', // deep plum
  },

  // Season gradient triplets for premium visual treatments
  seasonGradient: {
    SPRING: ['#FF8C69', '#FFB347', '#FFD700'] as const,
    SUMMER: ['#B19CD9', '#9FAFD1', '#C8A2C8'] as const,
    AUTUMN: ['#C67B5C', '#D4A574', '#A8B5A0'] as const,
    WINTER: ['#7B2D5F', '#1A1A2E', '#C0392B'] as const,
  },
} as const;

export type BrandColor = keyof typeof colors;
