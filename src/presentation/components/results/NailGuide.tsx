import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface NailData {
  everyday: PaletteColor[];
  statement: PaletteColor[];
  frenchTip: PaletteColor;
  avoidShades: PaletteColor[];
}

interface NailGuideProps {
  nails: NailData;
}

function ColorSwatchRow({ color }: { color: PaletteColor }) {
  return (
    <View style={styles.swatchRow}>
      <View style={[styles.swatch, { backgroundColor: color.hex }]} />
      <Typography variant="bodySmall" color={colors.gray500}>
        {color.name}
      </Typography>
    </View>
  );
}

export function NailGuideSection({ nails }: NailGuideProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Nail Polish Guide" />

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Everyday Shades</Typography>
        <View style={styles.swatchGrid}>
          {nails.everyday.map((color) => (
            <ColorSwatchRow key={color.hex} color={color} />
          ))}
        </View>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Statement Shades</Typography>
        <View style={styles.swatchGrid}>
          {nails.statement.map((color) => (
            <ColorSwatchRow key={color.hex} color={color} />
          ))}
        </View>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Your French Tip</Typography>
        <ColorSwatchRow color={nails.frenchTip} />
      </OrganicCard>

      {nails.avoidShades.length > 0 && (
        <OrganicCard variant="subtle">
          <Typography variant="label" color={colors.gray400}>Shades to Skip</Typography>
          <View style={styles.swatchGrid}>
            {nails.avoidShades.map((color) => (
              <ColorSwatchRow key={color.hex} color={color} />
            ))}
          </View>
        </OrganicCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  swatchGrid: {
    gap: spacing[2],
    marginTop: spacing[2],
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});
