import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface AvoidData {
  colorsToAvoid: { hex: string; name: string; reason: string }[];
}

interface ColorsToAvoidProps {
  avoid: AvoidData;
}

export function ColorsToAvoid({ avoid }: ColorsToAvoidProps) {
  if (!avoid.colorsToAvoid.length) return null;

  return (
    <View style={styles.container}>
      <HandLetterHeading title="Colors to Minimize" subtitle="These compete with your natural warmth" />
      <View style={styles.grid}>
        {avoid.colorsToAvoid.map((color, i) => (
          <View key={i} style={styles.item}>
            <ColorSwatch hex={color.hex} name={color.name} size="sm" />
            <Typography variant="caption" color={colors.gray400} style={{ maxWidth: 120 }}>
              {color.reason}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  grid: {
    gap: spacing[3],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
});
