import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@presentation/components/ui/Typography';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import type { AnalysisStatus } from '@domain/analysis/entities/Analysis';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';
import { PROCESSING_THEATER_DURATION_MS } from '@config/constants';

interface ProcessingTheaterProps {
  status: AnalysisStatus;
  onComplete: () => void;
}

const THEATER_STAGES = [
  { message: 'Studying your unique features...', duration: 8000 },
  { message: 'Analyzing your natural undertones...', duration: 8000 },
  { message: 'Mapping your color harmony...', duration: 8000 },
  { message: 'Curating your perfect palette...', duration: 8000 },
  { message: 'Generating your personalized guides...', duration: 8000 },
  { message: 'Putting the finishing touches...', duration: 5000 },
];

export function ProcessingTheater({ status, onComplete }: ProcessingTheaterProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'COMPLETED') {
      setProgress(100);
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, onComplete]);

  useEffect(() => {
    if (status === 'COMPLETED' || status === 'FAILED') return;

    const totalDuration = PROCESSING_THEATER_DURATION_MS;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(95, (elapsed / totalDuration) * 100);
      setProgress(newProgress);

      // Advance stage based on elapsed time
      let accumulated = 0;
      for (let i = 0; i < THEATER_STAGES.length; i++) {
        accumulated += THEATER_STAGES[i].duration;
        if (elapsed < accumulated) {
          setStageIndex(i);
          break;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  const currentStage = THEATER_STAGES[stageIndex] ?? THEATER_STAGES[THEATER_STAGES.length - 1];

  return (
    <WatercolorBackground>
      <View style={styles.container}>
        <BotanicalDivider variant="vine" />

        <View style={styles.content}>
          <Typography variant="displayLarge" color={colors.hazel} align="center">
            Creating Your
          </Typography>
          <Typography variant="displayLarge" color={colors.hazel} align="center">
            Color Story
          </Typography>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Typography variant="caption" color={colors.gray400}>
              {Math.round(progress)}%
            </Typography>
          </View>

          <Typography variant="body" color={colors.gray500} align="center">
            {currentStage.message}
          </Typography>
        </View>

        <BotanicalDivider variant="leaves" />
      </View>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  content: {
    alignItems: 'center',
    gap: spacing[6],
    paddingVertical: spacing[12],
  },
  progressContainer: {
    width: '100%',
    gap: spacing[2],
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
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
});
