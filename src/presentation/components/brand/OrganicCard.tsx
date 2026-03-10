import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';

interface OrganicCardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'subtle';
  children: React.ReactNode;
}

/**
 * Card component with organic, slightly asymmetric border radius.
 * Avoids the sharp, cookie-cutter feel of standard UI cards.
 */
export function OrganicCard({
  variant = 'default',
  children,
  style,
  ...props
}: OrganicCardProps) {
  const variantStyle = cardVariants[variant];

  return (
    <View
      style={[
        styles.base,
        variantStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const cardVariants = {
  default: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: colors.white,
    ...shadows.md,
  },
  subtle: {
    backgroundColor: colors.cream50,
    borderWidth: 1,
    borderColor: colors.cream200,
  },
};

const styles = StyleSheet.create({
  base: {
    padding: spacing[5],
    // Organic, slightly irregular border radius
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
});
