/**
 * ShopButton — React Native version.
 * A contextual shopping pill that appears next to color swatches and guide items.
 */

import React from 'react';
import { Pressable, View, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing, borderRadius } from '@presentation/theme/spacing';

interface ShopButtonProps {
  onPress: () => void;
  compact?: boolean;
  label?: string;
  loading?: boolean;
}

export function ShopButton({
  onPress,
  compact = false,
  label = 'Shop',
  loading = false,
}: ShopButtonProps) {
  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        disabled={loading}
        style={({ pressed }) => [
          compactStyles.container,
          pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.hazel} />
        ) : (
          <>
            <ShoppingBagIcon size={10} />
            <Typography variant="caption" color={colors.hazel} style={compactStyles.label}>
              {label}
            </Typography>
          </>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.hazel} />
      ) : (
        <>
          <ShoppingBagIcon size={14} />
          <Typography variant="caption" color={colors.hazel} style={styles.label}>
            {label}
          </Typography>
          <Svg width={10} height={10} viewBox="0 0 24 24">
            <Path
              d="M9 5l7 7-7 7"
              stroke={colors.hazel}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.5}
            />
          </Svg>
        </>
      )}
    </Pressable>
  );
}

function ShoppingBagIcon({ size = 14 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke={colors.hazel}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Line x1="3" y1="6" x2="21" y2="6" stroke={colors.hazel} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M16 10a4 4 0 01-8 0"
        stroke={colors.hazel}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const compactStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(139,111,71,0.2)',
    backgroundColor: 'rgba(139,111,71,0.05)',
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(139,111,71,0.2)',
    backgroundColor: 'rgba(139,111,71,0.05)',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
