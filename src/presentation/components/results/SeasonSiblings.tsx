import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface SiblingsData {
  celebrities: { name: string; description: string }[];
}

interface SeasonSiblingsProps {
  siblings: SiblingsData;
}

export function SeasonSiblingsSection({ siblings }: SeasonSiblingsProps) {
  if (!siblings.celebrities.length) return null;

  return (
    <View style={styles.container}>
      <HandLetterHeading title="Season Siblings" subtitle="You share your season with..." />
      {siblings.celebrities.map((celeb, i) => (
        <OrganicCard key={i} variant="subtle">
          <Typography variant="h3" color={colors.hazel}>
            {celeb.name}
          </Typography>
          <Typography variant="bodySmall" color={colors.gray500}>
            {celeb.description}
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
