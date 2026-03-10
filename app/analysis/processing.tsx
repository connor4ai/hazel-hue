import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { Typography } from '@presentation/components/ui/Typography';
import { useAnalysisStore } from '@presentation/stores/useAnalysisStore';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

const STAGES = [
  { text: 'Analyzing your undertone', emoji: '', duration: 8000, color: colors.terracotta },
  { text: 'Mapping contrast level', emoji: '', duration: 8000, color: colors.sage },
  { text: 'Identifying your season', emoji: '', duration: 10000, color: colors.dustyRose },
  { text: 'Curating your palette', emoji: '', duration: 10000, color: colors.hazel },
  { text: 'Preparing your results', emoji: '', duration: 9000, color: colors.hazel },
];

const POLL_INTERVAL_MS = 3000;

const LEAF_PATHS = [
  { d: 'M0 -30 Q8 -15 0 0 Q-8 -15 0 -30Z', fill: colors.sage },
  { d: 'M21 -21 Q20 -8 7 -7 Q14 -16 21 -21Z', fill: colors.terracotta },
  { d: 'M30 0 Q15 0 7 -7 Q18 -2 30 0Z', fill: colors.dustyRose },
  { d: 'M21 21 Q14 16 7 7 Q20 8 21 21Z', fill: colors.hazel },
  { d: 'M-21 -21 Q-20 -8 -7 -7 Q-14 -16 -21 -21Z', fill: colors.dustyRose },
  { d: 'M-30 0 Q-15 0 -7 -7 Q-18 -2 -30 0Z', fill: colors.hazel },
  { d: 'M-21 21 Q-14 16 -7 7 Q-20 8 -21 21Z', fill: colors.sage },
];

function BotanicalSpinner() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
      false,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [rotation, scale, glowOpacity]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.spinnerWrapper}>
      {/* Glow ring */}
      <Animated.View style={[styles.glow, glowStyle]} />

      <Animated.View style={[styles.spinner, spinnerStyle]}>
        <Svg width={100} height={100} viewBox="-40 -40 80 80">
          <Defs>
            <RadialGradient id="leafGlow" cx="0" cy="0" r="40">
              <Stop offset="0" stopColor={colors.hazel} stopOpacity="0.15" />
              <Stop offset="1" stopColor={colors.hazel} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="0" cy="0" r="38" fill="url(#leafGlow)" />
          {LEAF_PATHS.map((leaf, i) => (
            <Path key={i} d={leaf.d} fill={leaf.fill} opacity={0.7} />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}

function StageIndicator({ currentStage }: { currentStage: number }) {
  return (
    <View style={styles.stageIndicator}>
      {STAGES.map((_, i) => (
        <View
          key={i}
          style={[
            styles.stageDot,
            {
              backgroundColor: i <= currentStage ? colors.hazel : colors.cream200,
              width: i === currentStage ? 20 : 6,
            },
          ]}
        />
      ))}
    </View>
  );
}

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [email, setEmail] = useState('');
  const stageOpacity = useSharedValue(0);
  const stageTranslateY = useSharedValue(10);
  const progressWidth = useSharedValue(0);

  const { analysisId, status, error, pollStatus } = useAnalysisStore();
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!analysisId) return;
    pollRef.current = setInterval(() => {
      pollStatus();
    }, POLL_INTERVAL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [analysisId, pollStatus]);

  useEffect(() => {
    if (status === 'COMPLETED' && analysisId) {
      if (pollRef.current) clearInterval(pollRef.current);
      router.replace(`/analysis/${analysisId}`);
    }
  }, [status, analysisId, router]);

  useEffect(() => {
    stageOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    stageTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) });

    const timer = setTimeout(() => {
      if (currentStage < STAGES.length - 1) {
        stageOpacity.value = withTiming(0, { duration: 300 });
        stageTranslateY.value = withTiming(-10, { duration: 300 });
        setTimeout(() => {
          setCurrentStage((s) => s + 1);
          stageTranslateY.value = 10;
        }, 300);
      }
    }, STAGES[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage, stageOpacity, stageTranslateY]);

  useEffect(() => {
    const totalDuration = STAGES.reduce((sum, s) => sum + s.duration, 0);
    progressWidth.value = withTiming(100, {
      duration: totalDuration,
      easing: Easing.linear,
    });
  }, [progressWidth]);

  const stageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: stageOpacity.value,
    transform: [{ translateY: stageTranslateY.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const stage = STAGES[currentStage];

  return (
    <WatercolorBackground tint={stage.color} opacity={0.06}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.center}>
            <BotanicalSpinner />

            <Animated.View style={[styles.stageContainer, stageAnimatedStyle]}>
              <Typography
                variant="h1"
                color={colors.charcoal}
                align="center"
              >
                {stage.text}
              </Typography>
            </Animated.View>

            <StageIndicator currentStage={currentStage} />

            {status === 'FAILED' && error && (
              <View style={styles.errorBox}>
                <Typography variant="bodySmall" color={colors.error} align="center">
                  {error}
                </Typography>
                <Typography variant="caption" color={colors.gray400} align="center">
                  Please try again or contact support.
                </Typography>
              </View>
            )}
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

          {/* Email collection */}
          <View style={styles.emailSection}>
            <Typography variant="bodySmall" color={colors.gray500} align="center">
              Get your results via email too
            </Typography>
            <TextInput
              style={styles.emailInput}
              placeholder="your@email.com"
              placeholderTextColor={colors.gray400}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
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
    gap: spacing[6],
  },
  spinnerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  glow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.hazel,
    opacity: 0.1,
  },
  spinner: {
    // empty — animation applied via useAnimatedStyle
  },
  stageContainer: {
    paddingHorizontal: spacing[4],
  },
  stageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  stageDot: {
    height: 6,
    borderRadius: 3,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: spacing[5],
    gap: spacing[2],
    marginTop: spacing[4],
  },
  progressContainer: {
    gap: spacing[3],
  },
  progressTrack: {
    height: 4,
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
    gap: spacing[3],
    paddingTop: spacing[6],
  },
  emailInput: {
    borderWidth: 1.5,
    borderColor: colors.cream200,
    borderRadius: 16,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    fontSize: 16,
    color: colors.charcoal,
    backgroundColor: colors.cream50,
    textAlign: 'center',
  },
});
