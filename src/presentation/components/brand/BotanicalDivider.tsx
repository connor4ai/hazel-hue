import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface BotanicalDividerProps {
  color?: string;
  width?: number;
  variant?: 'vine' | 'leaves' | 'minimal';
}

/**
 * Hand-drawn botanical vine divider between sections.
 * Uses SVG paths that feel organic and hand-illustrated.
 */
export function BotanicalDivider({
  color = colors.sage,
  width = 200,
  variant = 'vine',
}: BotanicalDividerProps) {
  return (
    <View style={styles.container}>
      <Svg width={width} height={40} viewBox="0 0 200 40">
        {variant === 'vine' && (
          <G opacity={0.6}>
            {/* Main vine stem — organic, slightly wavy */}
            <Path
              d="M0 20 Q25 15 50 20 Q75 25 100 20 Q125 15 150 20 Q175 25 200 20"
              stroke={color}
              strokeWidth={1.2}
              fill="none"
              strokeLinecap="round"
            />
            {/* Small leaf left */}
            <Path
              d="M45 20 Q40 10 50 12 Q55 14 50 20"
              fill={color}
              opacity={0.4}
            />
            {/* Small leaf center */}
            <Path
              d="M100 20 Q95 28 105 30 Q110 28 105 20"
              fill={color}
              opacity={0.4}
            />
            {/* Small leaf right */}
            <Path
              d="M155 20 Q150 10 160 12 Q165 14 160 20"
              fill={color}
              opacity={0.4}
            />
          </G>
        )}
        {variant === 'leaves' && (
          <G opacity={0.5}>
            <Path
              d="M80 20 Q75 10 85 8 Q95 6 90 20"
              fill={color}
            />
            <Path
              d="M100 20 Q95 30 105 32 Q115 30 110 20"
              fill={color}
            />
            <Path
              d="M120 20 Q115 10 125 8 Q135 6 130 20"
              fill={color}
            />
          </G>
        )}
        {variant === 'minimal' && (
          <G opacity={0.4}>
            <Path
              d="M60 20 L140 20"
              stroke={color}
              strokeWidth={0.8}
              strokeDasharray="4,8"
              strokeLinecap="round"
            />
            <Path
              d="M98 16 Q100 12 102 16"
              stroke={color}
              strokeWidth={1}
              fill="none"
            />
          </G>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
});
