import {
  withTiming,
  withDelay,
  type SharedValue,
} from 'react-native-reanimated';
import { duration, easing } from '@presentation/theme/animations';

/**
 * Botanical vine/leaf growth animation.
 * Uses stroke-dashoffset technique to reveal SVG paths progressively.
 */

export function animateBotanicalGrow(
  strokeProgress: SharedValue<number>,
  delay: number = 0,
) {
  strokeProgress.value = 0;
  strokeProgress.value = withDelay(
    delay,
    withTiming(1, {
      duration: duration.theater,
      easing: easing.botanical,
    }),
  );
}

export function animateLeafAppear(
  opacity: SharedValue<number>,
  scale: SharedValue<number>,
  rotation: SharedValue<number>,
  delay: number = 0,
) {
  opacity.value = 0;
  scale.value = 0.3;
  rotation.value = -15;

  opacity.value = withDelay(
    delay,
    withTiming(1, { duration: duration.slow, easing: easing.decelerate }),
  );
  scale.value = withDelay(
    delay,
    withTiming(1, { duration: duration.reveal, easing: easing.botanical }),
  );
  rotation.value = withDelay(
    delay,
    withTiming(0, { duration: duration.reveal, easing: easing.gentle }),
  );
}

/**
 * Staggered vine growth — animate multiple segments in sequence.
 */
export function animateVineSequence(
  segments: SharedValue<number>[],
  baseDelay: number = 0,
) {
  segments.forEach((segment, index) => {
    animateBotanicalGrow(segment, baseDelay + index * 150);
  });
}
