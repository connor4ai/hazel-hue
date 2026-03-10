import {
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  type SharedValue,
} from 'react-native-reanimated';
import { duration, easing, spring } from '@presentation/theme/animations';

/**
 * Season reveal animation sequence.
 * Orchestrates scale, opacity, and color transitions for the big reveal moment.
 */

export function animateSeasonReveal(
  scale: SharedValue<number>,
  opacity: SharedValue<number>,
  titleY: SharedValue<number>,
) {
  // Title slides up from below
  titleY.value = 40;
  opacity.value = 0;
  scale.value = 0.8;

  opacity.value = withDelay(200, withTiming(1, { duration: duration.reveal, easing: easing.decelerate }));
  scale.value = withDelay(200, withSpring(1, spring.reveal));
  titleY.value = withDelay(200, withSpring(0, spring.gentle));
}

export function animateSubtitleFadeIn(
  opacity: SharedValue<number>,
  translateY: SharedValue<number>,
) {
  opacity.value = 0;
  translateY.value = 20;

  opacity.value = withDelay(600, withTiming(1, { duration: duration.slow, easing: easing.decelerate }));
  translateY.value = withDelay(600, withSpring(0, spring.gentle));
}

export function animateConfetti(
  particles: SharedValue<number>[],
) {
  particles.forEach((particle, index) => {
    particle.value = withDelay(
      800 + index * 40,
      withSequence(
        withTiming(1, { duration: duration.fast }),
        withTiming(0.6, { duration: duration.theater }),
      ),
    );
  });
}
