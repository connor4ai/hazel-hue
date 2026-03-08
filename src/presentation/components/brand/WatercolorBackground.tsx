import React from 'react';
import { View, StyleSheet, type ViewProps, ImageBackground } from 'react-native';
import { colors } from '@presentation/theme/colors';

interface WatercolorBackgroundProps extends ViewProps {
  tint?: string;
  opacity?: number;
  children: React.ReactNode;
}

/**
 * A warm, textured background with subtle watercolor wash effect.
 * Uses the cream base with optional color tinting.
 * In production, this would overlay a real watercolor texture PNG.
 */
export function WatercolorBackground({
  tint,
  opacity = 0.08,
  children,
  style,
  ...props
}: WatercolorBackgroundProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {/* Base cream */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.cream }]} />

      {/* Tint overlay */}
      {tint && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: tint, opacity },
          ]}
        />
      )}

      {/* Subtle noise/grain overlay for texture */}
      {/* TODO: Add real watercolor texture PNG from assets/textures/ */}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
