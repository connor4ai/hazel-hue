import {
  withTiming,
  withSpring,
  withDelay,
  type SharedValue,
} from 'react-native-reanimated';
import { duration, easing, spring, stagger } from '@presentation/theme/animations';

/**
 * Staggered drop-in animation for palette color swatches.
 * Each swatch drops in from above with a slight bounce.
 */

export function animatePaletteDrops(
  swatches: { opacity: SharedValue<number>; translateY: SharedValue<number> }[],
  baseDelay: number = 0,
) {
  swatches.forEach((swatch, index) => {
    swatch.opacity.value = 0;
    swatch.translateY.value = -30;

    const delay = baseDelay + index * stagger.palette;

    swatch.opacity.value = withDelay(
      delay,
      withTiming(1, { duration: duration.normal, easing: easing.decelerate }),
    );
    swatch.translateY.value = withDelay(
      delay,
      withSpring(0, spring.bouncy),
    );
  });
}

/**
 * Animate a single swatch expand on tap/focus.
 */
export function animateSwatchExpand(
  scale: SharedValue<number>,
  expanded: boolean,
) {
  scale.value = withSpring(expanded ? 1.15 : 1, spring.snappy);
}

/**
 * Signature color special entrance — larger scale + glow pulse.
 */
export function animateSignatureReveal(
  opacity: SharedValue<number>,
  scale: SharedValue<number>,
  delay: number = 0,
) {
  opacity.value = 0;
  scale.value = 0.5;

  opacity.value = withDelay(
    delay,
    withTiming(1, { duration: duration.reveal, easing: easing.decelerate }),
  );
  scale.value = withDelay(
    delay,
    withSpring(1, spring.reveal),
  );
}
