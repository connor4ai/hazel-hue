import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface PaletteData {
  signatureColor: PaletteColor;
  neutrals: PaletteColor[];
  statements: PaletteColor[];
  accents: PaletteColor[];
}

interface PaletteGridProps {
  palette: PaletteData;
}

export function PaletteGrid({ palette }: PaletteGridProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Your Palette"
        subtitle="Colors curated for your natural warmth"
      />
      {palette.signatureColor && (
        <View style={styles.signatureColor}>
          <ColorSwatch
            hex={palette.signatureColor.hex}
            name={palette.signatureColor.name}
            size="lg"
          />
          <Typography variant="caption" color={colors.gray400}>
            Your signature color
          </Typography>
        </View>
      )}
      <PaletteCategory title="Neutrals" colors={palette.neutrals} />
      <PaletteCategory title="Statement Colors" colors={palette.statements} />
      <PaletteCategory title="Accents" colors={palette.accents} />
    </View>
  );
}

export function PaletteCategory({ title, colors: swatchColors }: { title: string; colors: PaletteColor[] }) {
  if (!swatchColors || swatchColors.length === 0) return null;
  return (
    <View style={styles.category}>
      <Typography variant="label" color={colors.gray500}>{title}</Typography>
      <View style={styles.grid}>
        {swatchColors.map((c, i) => (
          <ColorSwatch key={i} hex={c.hex} name={c.name} size="md" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  signatureColor: {
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
  },
  category: {
    gap: spacing[3],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
  },
});
