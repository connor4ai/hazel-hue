import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface JewelryData {
  bestMetals: string[];
  metalsToMinimize: string[];
  gemstoneRecommendations: string[];
}

interface JewelryGuideProps {
  jewelry: JewelryData;
}

export function JewelryGuideSection({ jewelry }: JewelryGuideProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Jewelry & Metals" />
      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Best Metals</Typography>
        <Typography variant="body" color={colors.gray500}>
          {jewelry.bestMetals.join(', ')}
        </Typography>
        {jewelry.gemstoneRecommendations.length > 0 && (
          <>
            <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
              Recommended Gemstones
            </Typography>
            <Typography variant="body" color={colors.gray500}>
              {jewelry.gemstoneRecommendations.join(', ')}
            </Typography>
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
