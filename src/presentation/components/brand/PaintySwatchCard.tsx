import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing, borderRadius } from '@presentation/theme/spacing';

interface PaintySwatchCardProps {
  hex: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { width: 48, height: 56 },
  md: { width: 72, height: 84 },
  lg: { width: 96, height: 112 },
};

/**
 * Color swatch with painterly, watercolor-inspired edges.
 * Uses organic border radius and a subtle shadow to evoke a painted card.
 */
export function PaintySwatchCard({ hex, name, size = 'md' }: PaintySwatchCardProps) {
  const dimensions = SIZES[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.swatch,
          {
            backgroundColor: hex,
            width: dimensions.width,
            height: dimensions.height,
          },
        ]}
      />
      <Typography
        variant="caption"
        color={colors.gray500}
        align="center"
        style={{ maxWidth: dimensions.width + 16 }}
        numberOfLines={2}
      >
        {name}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
  },
  swatch: {
    // Organic, asymmetric border radius for painterly feel
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.md,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.xl,
    // Subtle paint-card shadow
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
