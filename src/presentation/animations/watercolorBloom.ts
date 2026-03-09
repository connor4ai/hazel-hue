import {
  withTiming,
  withDelay,
  type SharedValue,
} from 'react-native-reanimated';
import { duration, easing } from '@presentation/theme/animations';

/**
 * Watercolor bloom animation — opacity + scale bloom effect
 * for background washes and color transitions.
 */

export function animateWatercolorBloom(
  opacity: SharedValue<number>,
  scale: SharedValue<number>,
  delay: number = 0,
) {
  opacity.value = 0;
  scale.value = 0.6;

  opacity.value = withDelay(
    delay,
    withTiming(1, {
      duration: duration.theater,
      easing: easing.gentle,
    }),
  );
  scale.value = withDelay(
    delay,
    withTiming(1, {
      duration: duration.theater * 1.2,
      easing: easing.decelerate,
    }),
  );
}

/**
 * Subtle color wash transition — crossfade between two tints.
 */
export function animateColorWash(
  currentOpacity: SharedValue<number>,
  nextOpacity: SharedValue<number>,
  transitionDuration: number = duration.reveal,
) {
  currentOpacity.value = withTiming(0, {
    duration: transitionDuration,
    easing: easing.gentle,
  });
  nextOpacity.value = withDelay(
    transitionDuration * 0.3,
    withTiming(1, {
      duration: transitionDuration,
      easing: easing.gentle,
    }),
  );
}
