import React from 'react';
import { View, StyleSheet, type ViewProps, ImageBackground } from 'react-native';
import { colors } from '@presentation/theme/colors';

const watercolorTexture = require('../../../../assets/textures/watercolor-wash.png');

interface WatercolorBackgroundProps extends ViewProps {
  tint?: string;
  opacity?: number;
  children: React.ReactNode;
}

/**
 * A warm, textured background with subtle watercolor wash effect.
 * Uses the cream base with a real watercolor texture overlay.
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

      {/* Watercolor texture overlay */}
      <ImageBackground
        source={watercolorTexture}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { opacity: 0.15 }]}
      />

      {/* Tint overlay */}
      {tint && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: tint, opacity },
          ]}
        />
      )}

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
