import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { PaletteCategory } from './PaletteGrid';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface MakeupData {
  foundationTone: string;
  lipColors: PaletteColor[];
  eyeShadows: PaletteColor[];
  blushColors: PaletteColor[];
  yourRed: PaletteColor;
}

interface MakeupGuideProps {
  makeup: MakeupData;
}

export function MakeupGuideSection({ makeup }: MakeupGuideProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Makeup Guide" subtitle="Your most flattering shades" />
      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Foundation</Typography>
        <Typography variant="bodySmall" color={colors.gray500}>
          {makeup.foundationTone}
        </Typography>
      </OrganicCard>
      <PaletteCategory title="Lip Colors" colors={makeup.lipColors} />
      <PaletteCategory title="Eye Shadows" colors={makeup.eyeShadows} />
      <PaletteCategory title="Blush" colors={makeup.blushColors} />
      {makeup.yourRed && (
        <View style={styles.signatureColor}>
          <ColorSwatch
            hex={makeup.yourRed.hex}
            name={makeup.yourRed.name}
            size="lg"
          />
          <Typography variant="caption" color={colors.gray400}>
            Your perfect red
          </Typography>
        </View>
      )}
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
});
