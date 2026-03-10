import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography } from './Typography';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';

interface ColorSwatchProps {
  hex: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

const sizes = {
  sm: 40,
  md: 60,
  lg: 80,
};

export function ColorSwatch({ hex, name, size = 'md', onPress }: ColorSwatchProps) {
  const dimension = sizes[size];

  const content = (
    <View style={styles.container}>
      <View
        style={[
          styles.swatch,
          shadows.sm,
          {
            backgroundColor: hex,
            width: dimension,
            height: dimension,
            // Organic, slightly irregular border radius for a painterly feel
            borderTopLeftRadius: borderRadius.lg,
            borderTopRightRadius: borderRadius.xl,
            borderBottomLeftRadius: borderRadius.xl,
            borderBottomRightRadius: borderRadius.lg,
          },
        ]}
      />
      {name && (
        <Typography
          variant="caption"
          color={colors.gray500}
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Typography>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
  },
  swatch: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  name: {
    maxWidth: 80,
    textAlign: 'center',
  },
});
