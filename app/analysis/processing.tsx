import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

/**
 * The "Processing Theater" — 45 seconds of beautiful storytelling
 * while the analysis runs. This is NOT a loading spinner.
 * Each step is revealed sequentially with animated transitions.
 */
const STAGES = [
  { text: 'Analyzing your undertone...', duration: 8000, color: colors.terracotta },
  { text: 'Mapping your contrast level...', duration: 8000, color: colors.sage },
  { text: 'Identifying your season...', duration: 10000, color: colors.dustyRose },
  { text: 'Curating your palette...', duration: 10000, color: colors.hazel },
  { text: 'Preparing your results...', duration: 9000, color: colors.hazel },
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const stageOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Animate stage transitions
    stageOpacity.value = withTiming(1, { duration: 800, easing: Easing.ease });

    const timer = setTimeout(() => {
      if (currentStage < STAGES.length - 1) {
        stageOpacity.value = withTiming(0, { duration: 400 }, () => {
          // Trigger next stage
        });
        setCurrentStage((s) => s + 1);
      } else {
        // TODO: Poll analysis status, navigate to results when complete
        // For now, navigate after the last stage
        router.replace('/analysis/placeholder-id');
      }
    }, STAGES[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  // Overall progress bar
  useEffect(() => {
    const totalDuration = STAGES.reduce((sum, s) => sum + s.duration, 0);
    progressWidth.value = withTiming(100, {
      duration: totalDuration,
      easing: Easing.linear,
    });
  }, []);

  const stageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: stageOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const stage = STAGES[currentStage];

  return (
    <WatercolorBackground tint={stage.color} opacity={0.05}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.center}>
            {/* TODO: Replace with Lottie botanical animation per stage */}
            <Animated.View style={[styles.stageContainer, stageAnimatedStyle]}>
              <Typography
                variant="displaySmall"
                color={colors.hazel}
                align="center"
              >
                {stage.text}
              </Typography>
            </Animated.View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, progressAnimatedStyle]}
              />
            </View>
            <Typography variant="caption" color={colors.gray400} align="center">
              This usually takes about 45 seconds
            </Typography>
          </View>

          {/* Email collection during wait */}
          <View style={styles.emailSection}>
            <Typography variant="bodySmall" color={colors.gray500} align="center">
              Where should we send your results?
            </Typography>
            {/* TODO: Email input field */}
          </View>
        </View>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: 'space-between',
    paddingVertical: spacing[16],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageContainer: {
    paddingHorizontal: spacing[4],
  },
  progressContainer: {
    gap: spacing[2],
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.cream200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.hazel,
    borderRadius: 2,
  },
  emailSection: {
    gap: spacing[2],
    paddingTop: spacing[6],
  },
});
