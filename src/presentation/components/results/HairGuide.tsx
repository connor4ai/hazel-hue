import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { PaletteCategory } from './PaletteGrid';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface HairData {
  bestColors: PaletteColor[];
  colorsToAvoid: PaletteColor[];
  highlightRecommendation: string;
  lowlightRecommendation: string;
  salonTerminology: string[];
}

interface HairGuideProps {
  hair: HairData;
}

export function HairGuideSection({ hair }: HairGuideProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Hair Guide" subtitle="What to ask for at the salon" />
      <PaletteCategory title="Best Colors" colors={hair.bestColors} />
      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Highlights</Typography>
        <Typography variant="bodySmall" color={colors.gray500}>
          {hair.highlightRecommendation}
        </Typography>
        <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
          Lowlights
        </Typography>
        <Typography variant="bodySmall" color={colors.gray500}>
          {hair.lowlightRecommendation}
        </Typography>
        {hair.salonTerminology.length > 0 && (
          <>
            <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
              Ask Your Stylist For
            </Typography>
            {hair.salonTerminology.map((term, i) => (
              <Typography key={i} variant="bodySmall" color={colors.gray500}>
                {'  \u2022  '}{term}
              </Typography>
            ))}
          </>
        )}
      </OrganicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
});
