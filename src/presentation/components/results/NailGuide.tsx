import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';

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

/** A nail polish bottle swatch rendered in SVG */
function PolishBottle({ color: polishColor, size = 48 }: { color: string; size?: number }) {
  const gradId = `polish_${polishColor.replace('#', '')}`;
  return (
    <Svg width={size * 0.6} height={size} viewBox="0 0 30 48">
      <Defs>
        <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={polishColor} stopOpacity={0.9} />
          <Stop offset="1" stopColor={polishColor} />
        </LinearGradient>
      </Defs>
      {/* Cap */}
      <Rect x="10" y="0" width="10" height="10" rx="2" fill={colors.gray300} />
      {/* Neck */}
      <Rect x="12" y="10" width="6" height="4" fill={colors.gray200} />
      {/* Bottle body */}
      <Path
        d="M6 14h18c0 0 2 2 2 6v18c0 4-2 6-4 6H8c-2 0-4-2-4-6V20c0-4 2-6 2-6z"
        fill={`url(#${gradId})`}
      />
      {/* Shine highlight */}
      <Path
        d="M10 18c0 0 1-1 2-1s2 2 2 6"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.35}
      />
    </Svg>
  );
}

/** A polish swatch with bottle + name */
function PolishSwatch({ color: polishColor }: { color: PaletteColor }) {
  return (
    <View style={swatchStyles.container}>
      <PolishBottle color={polishColor.hex} />
      <Typography variant="caption" color={colors.gray500} align="center" numberOfLines={2} style={swatchStyles.label}>
        {polishColor.name}
      </Typography>
    </View>
  );
}

const swatchStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
    width: 60,
  },
  label: {
    maxWidth: 64,
  },
});

/** A polish collection section */
function PolishCollection({ title, shades, muted = false }: { title: string; shades: PaletteColor[]; muted?: boolean }) {
  if (shades.length === 0) return null;
  return (
    <OrganicCard variant="subtle">
      <Typography variant="label" color={muted ? colors.gray400 : colors.hazel}>
        {title}
      </Typography>
      <View style={collectionStyles.grid}>
        {shades.map((shade) => (
          <PolishSwatch key={shade.hex} color={shade} />
        ))}
      </View>
    </OrganicCard>
  );
}

const collectionStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
    marginTop: spacing[3],
  },
});

/** Hero treatment for the French tip recommendation */
function FrenchTipHero({ color: tipColor }: { color: PaletteColor }) {
  return (
    <OrganicCard variant="elevated">
      <View style={heroStyles.container}>
        <View style={heroStyles.nailShape}>
          {/* Fingernail shape with french tip */}
          <Svg width={40} height={56} viewBox="0 0 40 56">
            <Defs>
              <LinearGradient id="nailBase" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FCEAE8" />
                <Stop offset="1" stopColor="#F5D5D0" />
              </LinearGradient>
            </Defs>
            {/* Nail bed */}
            <Path
              d="M4 20c0-8 6-16 16-16s16 8 16 16v20c0 8-6 12-16 12S4 48 4 40V20z"
              fill="url(#nailBase)"
            />
            {/* French tip */}
            <Path
              d="M4 38c0 0 8 4 16 4s16-4 16-4v2c0 8-6 12-16 12S4 48 4 40V38z"
              fill={tipColor.hex}
            />
            {/* Shine */}
            <Path
              d="M12 14c0 0 2-2 4-2s4 4 4 10"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              opacity={0.4}
            />
          </Svg>
        </View>
        <View style={heroStyles.textContainer}>
          <Typography variant="label" color={colors.gray400}>
            Your French Tip
          </Typography>
          <Typography variant="h3" color={colors.hazel}>
            {tipColor.name}
          </Typography>
          <View style={[heroStyles.colorDot, { backgroundColor: tipColor.hex }]} />
        </View>
      </View>
    </OrganicCard>
  );
}

const heroStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[5],
  },
  nailShape: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: spacing[1],
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: spacing[1],
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
});

export function NailGuideSection({ nails }: NailGuideProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Nail Polish Guide" subtitle="Shades curated for your hands" />

      <PolishCollection title="Everyday Shades" shades={nails.everyday} />
      <PolishCollection title="Statement Shades" shades={nails.statement} />
      <FrenchTipHero color={nails.frenchTip} />
      <PolishCollection title="Shades to Skip" shades={nails.avoidShades} muted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
});
