import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ShopButton } from '@presentation/components/shopping/ShopButton';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface HairData {
  bestColors: PaletteColor[];
  colorsToAvoid: PaletteColor[];
  highlightRecommendation: string;
  lowlightRecommendation: string;
  salonTerminology: string[];
}

interface HairGuideProps {
  hair: HairData;
  onShop?: (query: string) => void;
}

/** A flowing gradient strip showing hair color recommendations */
function HairColorStrip({ shades, label }: { shades: PaletteColor[]; label: string }) {
  if (shades.length === 0) return null;
  return (
    <View style={stripStyles.container}>
      <Typography variant="label" color={colors.hazel}>{label}</Typography>
      <View style={stripStyles.strip}>
        {shades.map((shade, i) => (
          <View key={i} style={[stripStyles.segment, { backgroundColor: shade.hex, flex: 1 }]} />
        ))}
      </View>
      <View style={stripStyles.labels}>
        {shades.map((shade, i) => (
          <Typography key={i} variant="caption" color={colors.gray400} style={{ flex: 1 }} align="center" numberOfLines={1}>
            {shade.name}
          </Typography>
        ))}
      </View>
    </View>
  );
}

const stripStyles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  strip: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  segment: {
    height: 28,
  },
  labels: {
    flexDirection: 'row',
    gap: spacing[1],
  },
});

/** A highlight/lowlight recommendation card with visual indicator */
function ColorTreatment({ title, description, variant }: { title: string; description: string; variant: 'highlight' | 'lowlight' }) {
  const isHighlight = variant === 'highlight';
  return (
    <View style={treatmentStyles.container}>
      <View style={treatmentStyles.iconContainer}>
        <Svg width={20} height={20} viewBox="0 0 20 20">
          <Defs>
            <LinearGradient id={`hair_${variant}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={isHighlight ? '#F5E6C0' : '#8B6F47'} />
              <Stop offset="1" stopColor={isHighlight ? '#D4B882' : '#5C4630'} />
            </LinearGradient>
          </Defs>
          {/* Strand icon */}
          <Path
            d={isHighlight
              ? 'M6 2c0 4 4 6 4 10s-4 6-4 6M10 2c0 4 4 6 4 10s-4 6-4 6'
              : 'M6 2c0 4 4 6 4 10s-4 6-4 6M10 2c0 4 4 6 4 10s-4 6-4 6'
            }
            stroke={`url(#hair_${variant})`}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </View>
      <View style={treatmentStyles.textContainer}>
        <Typography variant="label" color={colors.hazel}>{title}</Typography>
        <Typography variant="bodySmall" color={colors.gray500}>
          {description}
        </Typography>
      </View>
    </View>
  );
}

const treatmentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing[3],
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cream50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
});

/** A salon terminology chip styled like a professional instruction */
function SalonTermChip({ term }: { term: string }) {
  return (
    <View style={termStyles.chip}>
      <Svg width={10} height={10} viewBox="0 0 10 10">
        <Rect x="1" y="1" width="8" height="8" rx="2" stroke={colors.hazel} strokeWidth={0.8} fill={colors.hazel50} />
      </Svg>
      <Typography variant="caption" color={colors.hazel}>
        {term}
      </Typography>
    </View>
  );
}

const termStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    backgroundColor: colors.hazel50,
    borderWidth: 1,
    borderColor: colors.hazel100,
  },
});

export function HairGuideSection({ hair, onShop }: HairGuideProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <HandLetterHeading title="Hair Guide" subtitle="What to ask for at the salon" />
        {onShop && <ShopButton label="Shop Hair" onPress={() => onShop('hair color')} />}
      </View>

      {/* Best hair colors as a flowing gradient strip */}
      <OrganicCard variant="subtle">
        <HairColorStrip shades={hair.bestColors} label="Best Hair Colors" />
      </OrganicCard>

      {/* Highlight & lowlight recommendations */}
      <OrganicCard variant="subtle" style={styles.treatmentCard}>
        <ColorTreatment
          title="Highlights"
          description={hair.highlightRecommendation}
          variant="highlight"
        />
        <View style={styles.treatmentDivider} />
        <ColorTreatment
          title="Lowlights"
          description={hair.lowlightRecommendation}
          variant="lowlight"
        />
      </OrganicCard>

      {/* Salon terminology — styled as "show your stylist" card */}
      {hair.salonTerminology.length > 0 && (
        <OrganicCard variant="elevated">
          <View style={styles.salonHeader}>
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Path
                d="M2 14l4-4M6 10l-2 4M8 2c0 4-2 6-2 8h4c0-2-2-4-2-8z"
                stroke={colors.hazel}
                strokeWidth={1.2}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
            <Typography variant="label" color={colors.hazel}>
              Show Your Stylist
            </Typography>
          </View>
          <Typography variant="caption" color={colors.gray400} style={{ marginBottom: spacing[2] }}>
            Use these exact terms at the salon for the best results
          </Typography>
          <View style={styles.termGrid}>
            {hair.salonTerminology.map((term) => (
              <SalonTermChip key={term} term={term} />
            ))}
          </View>
        </OrganicCard>
      )}

      {/* Colors to avoid — muted, secondary treatment */}
      {hair.colorsToAvoid.length > 0 && (
        <OrganicCard variant="subtle">
          <HairColorStrip shades={hair.colorsToAvoid} label="Colors to Avoid" />
        </OrganicCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  treatmentCard: {
    gap: spacing[4],
  },
  treatmentDivider: {
    height: 1,
    backgroundColor: colors.cream200,
  },
  salonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[1],
  },
  termGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
});
