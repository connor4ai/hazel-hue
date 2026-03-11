import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ShopButton } from '@presentation/components/shopping/ShopButton';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface AccessoryData {
  sunglassesFrames: string[];
  bagColors: PaletteColor[];
  scarfColors: PaletteColor[];
  shoeColors: PaletteColor[];
  beltColors: string[];
}

interface AccessoryGuideProps {
  accessories: AccessoryData;
  onShop?: (query: string) => void;
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

export function AccessoryGuideSection({ accessories, onShop }: AccessoryGuideProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <HandLetterHeading title="Accessories" />
        {onShop && <ShopButton label="Shop" onPress={() => onShop('accessories')} />}
      </View>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Sunglasses Frames</Typography>
        <Typography variant="body" color={colors.gray500}>
          {accessories.sunglassesFrames.join(' · ')}
        </Typography>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Bag Colors</Typography>
        <View style={styles.swatchGrid}>
          {accessories.bagColors.map((color) => (
            <ColorSwatchRow key={color.hex} color={color} />
          ))}
        </View>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Scarves & Wraps</Typography>
        <View style={styles.swatchGrid}>
          {accessories.scarfColors.map((color) => (
            <ColorSwatchRow key={color.hex} color={color} />
          ))}
        </View>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Shoe Colors</Typography>
        <View style={styles.swatchGrid}>
          {accessories.shoeColors.map((color) => (
            <ColorSwatchRow key={color.hex} color={color} />
          ))}
        </View>
      </OrganicCard>

      <OrganicCard variant="subtle">
        <Typography variant="label" color={colors.hazel}>Belts</Typography>
        <Typography variant="body" color={colors.gray500}>
          {accessories.beltColors.join(' · ')}
        </Typography>
      </OrganicCard>
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
