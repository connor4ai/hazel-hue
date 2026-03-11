import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { ShopButton } from '@presentation/components/shopping/ShopButton';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing } from '@presentation/theme/spacing';

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
  onShop?: (query: string) => void;
}

/** A horizontal color bar showing a curated set of shades */
function ColorBar({ shades }: { shades: PaletteColor[] }) {
  if (shades.length === 0) return null;
  return (
    <View style={barStyles.container}>
      <View style={barStyles.strip}>
        {shades.map((shade, i) => (
          <View
            key={i}
            style={[barStyles.segment, { backgroundColor: shade.hex, flex: 1 }]}
          />
        ))}
      </View>
      <View style={barStyles.labels}>
        {shades.map((shade, i) => (
          <Typography key={i} variant="caption" color={colors.gray400} style={{ flex: 1 }} align="center" numberOfLines={1}>
            {shade.name}
          </Typography>
        ))}
      </View>
    </View>
  );
}

const barStyles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  strip: {
    flexDirection: 'row',
    height: 36,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  segment: {
    height: 36,
  },
  labels: {
    flexDirection: 'row',
    gap: spacing[1],
  },
});

/** Face-zone category card with icon + color bar */
function MakeupZone({ title, icon, shades }: { title: string; icon: React.ReactNode; shades: PaletteColor[] }) {
  if (shades.length === 0) return null;
  return (
    <OrganicCard variant="subtle">
      <View style={zoneStyles.header}>
        {icon}
        <Typography variant="label" color={colors.hazel}>{title}</Typography>
      </View>
      <ColorBar shades={shades} />
    </OrganicCard>
  );
}

const zoneStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
});

function LipsIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M12 18c-4 0-8-3-8-6 0 0 2-2 4-1s4 3 4 3 2-2 4-3 4 1 4 1c0 3-4 6-8 6z"
        fill={colors.dustyRose}
        opacity={0.5}
      />
      <Path
        d="M4 12s2-2 4-1 4 3 4 3 2-2 4-3 4 1 4 1"
        stroke={colors.dustyRose}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

function EyeIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
        stroke={colors.lavender}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle cx="12" cy="12" r="3" fill={colors.lavender} opacity={0.4} />
    </Svg>
  );
}

function BlushIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle cx="8" cy="14" r="4" fill={colors.dustyRose} opacity={0.25} />
      <Circle cx="16" cy="14" r="4" fill={colors.dustyRose} opacity={0.25} />
      <Circle cx="8" cy="14" r="2.5" fill={colors.dustyRose} opacity={0.15} />
      <Circle cx="16" cy="14" r="2.5" fill={colors.dustyRose} opacity={0.15} />
    </Svg>
  );
}

/** Hero treatment for the signature red */
function SignatureRedHero({ color: redColor }: { color: PaletteColor }) {
  return (
    <OrganicCard variant="elevated">
      <View style={heroStyles.container}>
        <View style={heroStyles.swatchWrapper}>
          <View style={[heroStyles.glowRing, { backgroundColor: redColor.hex }]} />
          <ColorSwatch hex={redColor.hex} size="lg" />
        </View>
        <View style={heroStyles.textContainer}>
          <Typography variant="label" color={colors.gray400}>
            Your Perfect Red
          </Typography>
          <Typography variant="h3" color={colors.hazel}>
            {redColor.name}
          </Typography>
          <Typography variant="caption" color={colors.gray500} style={{ fontStyle: 'italic' }}>
            The one shade that makes you glow
          </Typography>
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
  swatchWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.12,
  },
  textContainer: {
    flex: 1,
    gap: spacing[1],
  },
});

export function MakeupGuideSection({ makeup, onShop }: MakeupGuideProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <HandLetterHeading title="Makeup Guide" subtitle="Your most flattering shades" />
        {onShop && <ShopButton label="Shop Makeup" onPress={() => onShop('makeup')} />}
      </View>

      {/* Foundation zone */}
      <OrganicCard variant="subtle">
        <View style={styles.foundationRow}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="foundGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={colors.hazel200} />
                <Stop offset="1" stopColor={colors.hazel400} />
              </LinearGradient>
            </Defs>
            <Circle cx="12" cy="12" r="8" fill="url(#foundGrad)" opacity={0.4} />
            <Circle cx="12" cy="12" r="4" fill="url(#foundGrad)" opacity={0.6} />
          </Svg>
          <View style={styles.foundationText}>
            <Typography variant="label" color={colors.hazel}>Foundation</Typography>
            <Typography variant="body" color={colors.gray500}>
              {makeup.foundationTone}
            </Typography>
          </View>
        </View>
      </OrganicCard>

      {/* Face zones with color bars */}
      <MakeupZone title="Lip Colors" icon={<LipsIcon />} shades={makeup.lipColors} />
      <MakeupZone title="Eye Shadows" icon={<EyeIcon />} shades={makeup.eyeShadows} />
      <MakeupZone title="Blush" icon={<BlushIcon />} shades={makeup.blushColors} />

      {/* Hero red */}
      {makeup.yourRed && <SignatureRedHero color={makeup.yourRed} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  foundationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  foundationText: {
    flex: 1,
    gap: 2,
  },
});
