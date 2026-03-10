import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface StyleGuideData {
  outfits: {
    name: string;
    description: string;
    pieces: { item: string; color: PaletteColor }[];
  }[];
  bestPatterns: string[];
  bestFabrics: string[];
  patternsToAvoid: string[];
}

interface LookbookSectionProps {
  styleGuide: StyleGuideData;
}

export function LookbookSection({ styleGuide }: LookbookSectionProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Your Lookbook"
        subtitle="Outfit inspiration in your colors"
      />
      {styleGuide.outfits.map((outfit, i) => (
        <OrganicCard key={i} variant="subtle">
          <Typography variant="h3" color={colors.hazel}>
            {outfit.name}
          </Typography>
          <Typography variant="bodySmall" color={colors.gray500}>
            {outfit.description}
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
});
