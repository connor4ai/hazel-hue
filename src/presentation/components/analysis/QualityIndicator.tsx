import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@presentation/components/ui/Typography';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface QualityIndicatorProps {
  score: number;
  issues: string[];
}

export function QualityIndicator({ score, issues }: QualityIndicatorProps) {
  const passed = score >= 60;
  const barColor = passed ? colors.sage : colors.terracotta;
  const barWidth = Math.min(100, Math.max(0, score));

  return (
    <OrganicCard variant="subtle">
      <View style={styles.header}>
        <Typography variant="label" color={colors.hazel}>
          Photo Quality
        </Typography>
        <Typography
          variant="label"
          color={passed ? colors.sage : colors.terracotta}
        >
          {passed ? 'Good' : 'Needs Improvement'}
        </Typography>
      </View>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${barWidth}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      {issues.length > 0 && (
        <View style={styles.issues}>
          {issues.map((issue, i) => (
            <Typography key={i} variant="bodySmall" color={colors.gray500}>
              {'\u2022  '}{issue}
            </Typography>
          ))}
        </View>
      )}
    </OrganicCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barTrack: {
    height: 6,
    backgroundColor: colors.cream200,
    borderRadius: 3,
    marginTop: spacing[2],
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  issues: {
    gap: spacing[1],
    marginTop: spacing[3],
  },
});
