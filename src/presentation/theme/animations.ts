import { Easing } from 'react-native-reanimated';

/**
 * Shared animation constants for the Hazel & Hue design system.
 * All timing and easing values are centralized here.
 */

export const duration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  reveal: 800,
  theater: 1200,
} as const;

export const easing = {
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  decelerate: Easing.bezier(0, 0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0, 1, 1),
  botanical: Easing.bezier(0.34, 1.56, 0.64, 1),
  gentle: Easing.bezier(0.25, 0.1, 0.25, 1),
} as const;

export const spring = {
  gentle: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
  bouncy: {
    damping: 12,
    stiffness: 150,
    mass: 0.8,
  },
  snappy: {
    damping: 25,
    stiffness: 200,
    mass: 0.6,
  },
  reveal: {
    damping: 18,
    stiffness: 80,
    mass: 1.2,
  },
} as const;

export const stagger = {
  fast: 50,
  normal: 80,
  slow: 120,
  palette: 60,
} as const;
