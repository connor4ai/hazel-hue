import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ShopButton } from '@presentation/components/shopping/ShopButton';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing } from '@presentation/theme/spacing';

interface JewelryData {
  bestMetals: string[];
  metalsToMinimize: string[];
  gemstoneRecommendations: string[];
}

interface JewelryGuideProps {
  jewelry: JewelryData;
  onShop?: (query: string) => void;
}

/** Map common metal names to gradient colors for visual swatches */
const metalGradients: Record<string, [string, string, string]> = {
  gold: ['#FFD700', '#F0C040', '#D4A020'],
  'yellow gold': ['#FFD700', '#F0C040', '#D4A020'],
  'rose gold': ['#E8A090', '#D4907C', '#C07868'],
  silver: ['#E8E8E8', '#C0C0C0', '#A8A8A8'],
  platinum: ['#E5E5E8', '#D0D0D8', '#B8B8C0'],
  copper: ['#D4956A', '#C07D52', '#A86840'],
  bronze: ['#C09060', '#A87848', '#906838'],
  'champagne gold': ['#F5E6C0', '#E8D4A0', '#D8C490'],
  'white gold': ['#F0F0F0', '#E0E0E5', '#D0D0D8'],
  pewter: ['#B8B8B8', '#A0A0A0', '#888888'],
};

function getMetalColors(metal: string): [string, string, string] {
  const key = metal.toLowerCase();
  if (metalGradients[key]) return metalGradients[key];
  // Fuzzy match
  for (const [name, gradient] of Object.entries(metalGradients)) {
    if (key.includes(name) || name.includes(key)) return gradient;
  }
  return [colors.hazel100, colors.hazel200, colors.hazel300];
}

/** A metallic gradient swatch that looks like a real metal sample */
function MetalSwatch({ metal }: { metal: string }) {
  const [light, mid, dark] = getMetalColors(metal);
  const gradId = `metal_${metal.replace(/\s+/g, '_')}`;

  return (
    <View style={metalStyles.container}>
      <Svg width={56} height={56} viewBox="0 0 56 56">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={light} />
            <Stop offset="0.5" stopColor={mid} />
            <Stop offset="1" stopColor={dark} />
          </LinearGradient>
        </Defs>
        <Rect
          x="2" y="2" width="52" height="52"
          rx="14" ry="16"
          fill={`url(#${gradId})`}
        />
        {/* Metallic shine highlight */}
        <Rect
          x="8" y="6" width="20" height="4"
          rx="2"
          fill="white"
          opacity={0.35}
        />
      </Svg>
      <Typography variant="caption" color={colors.charcoal} align="center" numberOfLines={1} style={metalStyles.label}>
        {metal}
      </Typography>
    </View>
  );
}

const metalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[1],
    width: 72,
  },
  label: {
    maxWidth: 72,
  },
});

/** A gemstone visual chip with a faceted look */
function GemstoneChip({ gem }: { gem: string }) {
  return (
    <View style={gemStyles.chip}>
      <Svg width={14} height={14} viewBox="0 0 14 14">
        <Path
          d="M3 2h8l3 4-7 8-7-8 3-4z"
          fill={colors.hazel}
          opacity={0.2}
        />
        <Path
          d="M3 2h8l3 4-7 8-7-8 3-4z"
          stroke={colors.hazel}
          strokeWidth={0.8}
          fill="none"
          opacity={0.5}
        />
      </Svg>
      <Typography variant="caption" color={colors.hazel}>
        {gem}
      </Typography>
    </View>
  );
}

const gemStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    backgroundColor: colors.hazel50,
    borderWidth: 1,
    borderColor: colors.hazel100,
  },
});

export function JewelryGuideSection({ jewelry, onShop }: JewelryGuideProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <HandLetterHeading title="Jewelry & Metals" subtitle="Metals and stones that complement you" />
        {onShop && <ShopButton label="Shop Jewelry" onPress={() => onShop(`${jewelry.bestMetals[0]} jewelry`)} />}
      </View>

      {/* Best metals as visual swatches */}
      {jewelry.bestMetals.length > 0 && (
        <OrganicCard variant="subtle">
          <Typography variant="label" color={colors.hazel}>Your Best Metals</Typography>
          <View style={styles.metalGrid}>
            {jewelry.bestMetals.map((metal) => (
              <MetalSwatch key={metal} metal={metal} />
            ))}
          </View>
        </OrganicCard>
      )}

      {/* Metals to minimize — subtle, muted treatment */}
      {jewelry.metalsToMinimize.length > 0 && (
        <OrganicCard variant="subtle">
          <Typography variant="label" color={colors.gray400}>Metals to Minimize</Typography>
          <Typography variant="bodySmall" color={colors.gray400}>
            {jewelry.metalsToMinimize.join(' · ')}
          </Typography>
        </OrganicCard>
      )}

      {/* Gemstones as decorative chips */}
      {jewelry.gemstoneRecommendations.length > 0 && (
        <OrganicCard variant="subtle">
          <Typography variant="label" color={colors.hazel}>Recommended Gemstones</Typography>
          <View style={styles.gemGrid}>
            {jewelry.gemstoneRecommendations.map((gem) => (
              <GemstoneChip key={gem} gem={gem} />
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
  metalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
    marginTop: spacing[3],
  },
  gemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[2],
  },
});
