import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';
import { ANALYSIS_PRICE_DISPLAY } from '@config/constants';

export function PriceAnchor() {
  return (
    <OrganicCard variant="subtle">
      <View style={styles.container}>
        <View style={styles.row}>
          <Typography variant="bodySmall" color={colors.gray400}>
            In-person color analysis
          </Typography>
          <Typography
            variant="bodySmall"
            color={colors.gray400}
            style={styles.strikethrough}
          >
            $150–$300
          </Typography>
        </View>
        <View style={styles.row}>
          <Typography variant="label" color={colors.hazel}>
            Hazel & Hue
          </Typography>
          <Typography variant="h2" color={colors.hazel}>
            {ANALYSIS_PRICE_DISPLAY}
          </Typography>
        </View>
        <Typography variant="caption" color={colors.gray400} align="center">
          Same quality analysis, powered by AI
        </Typography>
      </View>
    </OrganicCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[3],
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});
