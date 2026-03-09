import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface DrapeComparison {
  goodHex: string;
  goodName: string;
  badHex: string;
  badName: string;
  explanation: string;
}

interface DrapeRoomProps {
  comparisons?: DrapeComparison[];
}

export function DrapeRoom({ comparisons }: DrapeRoomProps) {
  if (!comparisons || comparisons.length === 0) {
    return (
      <View style={styles.container}>
        <HandLetterHeading
          title="The Drape Room"
          subtitle="See why your colors work"
        />
        <OrganicCard>
          <Typography variant="body" color={colors.gray500} align="center">
            Interactive drape comparison coming soon.
          </Typography>
        </OrganicCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="The Drape Room"
        subtitle="See why your colors work"
      />
      {comparisons.map((comparison, i) => (
        <OrganicCard key={i} variant="subtle">
          <View style={styles.comparisonRow}>
            <View style={styles.swatchColumn}>
              <ColorSwatch hex={comparison.goodHex} name={comparison.goodName} size="md" />
              <Typography variant="caption" color={colors.sage}>Yes</Typography>
            </View>
            <View style={styles.swatchColumn}>
              <ColorSwatch hex={comparison.badHex} name={comparison.badName} size="md" />
              <Typography variant="caption" color={colors.gray400}>Avoid</Typography>
            </View>
          </View>
          <Typography variant="bodySmall" color={colors.gray500} align="center">
            {comparison.explanation}
          </Typography>
        </OrganicCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing[3],
  },
  swatchColumn: {
    alignItems: 'center',
    gap: spacing[2],
  },
});
