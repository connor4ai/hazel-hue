import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';

interface PaletteColor {
  hex: string;
  name: string;
}

interface StyleGuideData {
  outfits: {
    name: string;
    description: string;
    pieces: { item: string; color: PaletteColor }[];
  }[];
  bestPatterns: string[];
  bestFabrics: string[];
  patternsToAvoid: string[];
}

interface LookbookSectionProps {
  styleGuide: StyleGuideData;
}

/** A mini hanger icon rendered in SVG */
function HangerIcon({ color: iconColor }: { color: string }) {
  return (
    <Svg width={18} height={14} viewBox="0 0 18 14">
      <Path
        d="M9 0C9 0 10.5 0 10.5 1.5C10.5 3 9 3 9 3L1 10H17L9 3"
        stroke={iconColor}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Line x1="1" y1="10" x2="17" y2="10" stroke={iconColor} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

/** Visual outfit piece showing a color chip + garment name */
function OutfitPiece({ item, color: pieceColor }: { item: string; color: PaletteColor }) {
  return (
    <View style={pieceStyles.container}>
      <View
        style={[
          pieceStyles.colorChip,
          {
            backgroundColor: pieceColor.hex,
            borderTopLeftRadius: borderRadius.lg,
            borderTopRightRadius: borderRadius.xl,
            borderBottomLeftRadius: borderRadius.xl,
            borderBottomRightRadius: borderRadius.lg,
          },
        ]}
      />
      <View style={pieceStyles.textContainer}>
        <Typography variant="bodySmall" color={colors.charcoal} numberOfLines={1}>
          {item}
        </Typography>
        <Typography variant="caption" color={colors.gray400} numberOfLines={1}>
          {pieceColor.name}
        </Typography>
      </View>
    </View>
  );
}

const pieceStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  colorChip: {
    width: 44,
    height: 44,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
    ...shadows.sm,
  },
  textContainer: {
    flex: 1,
    gap: 1,
  },
});

/** Visual outfit card that looks like a styled moodboard entry */
function OutfitCard({ outfit, index }: { outfit: StyleGuideData['outfits'][number]; index: number }) {
  // Extract a mini color palette strip from the outfit pieces
  const outfitColors = outfit.pieces.map((p) => p.color.hex);

  return (
    <OrganicCard variant="elevated">
      {/* Outfit header with number badge + color strip */}
      <View style={cardStyles.header}>
        <View style={cardStyles.numberBadge}>
          <Typography variant="caption" color={colors.white}>
            {String(index + 1).padStart(2, '0')}
          </Typography>
        </View>
        <View style={cardStyles.headerText}>
          <Typography variant="h3" color={colors.hazel}>
            {outfit.name}
          </Typography>
          <Typography variant="bodySmall" color={colors.gray500} style={{ fontStyle: 'italic' }}>
            {outfit.description}
          </Typography>
        </View>
      </View>

      {/* Color palette strip — the visual "mood" of this outfit */}
      {outfitColors.length > 0 && (
        <View style={cardStyles.paletteStrip}>
          {outfitColors.map((hex, i) => (
            <View
              key={i}
              style={[cardStyles.paletteSegment, { backgroundColor: hex, flex: 1 }]}
            />
          ))}
        </View>
      )}

      {/* Individual pieces with color chips */}
      <View style={cardStyles.piecesContainer}>
        <View style={cardStyles.piecesHeader}>
          <HangerIcon color={colors.gray400} />
          <Typography variant="label" color={colors.gray400}>
            The Pieces
          </Typography>
        </View>
        {outfit.pieces.map((piece, i) => (
          <OutfitPiece key={i} item={piece.item} color={piece.color} />
        ))}
      </View>
    </OrganicCard>
  );
}

const cardStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.hazel,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  headerText: {
    flex: 1,
    gap: spacing[1],
  },
  paletteStrip: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: spacing[3],
  },
  paletteSegment: {
    height: 8,
  },
  piecesContainer: {
    marginTop: spacing[4],
    gap: spacing[1],
  },
  piecesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[1],
  },
});

/** Pattern/fabric chip with a subtle decorative pattern indicator */
function MaterialChip({ label, variant }: { label: string; variant: 'pattern' | 'fabric' | 'avoid' }) {
  const chipColor = variant === 'avoid' ? colors.gray400 : colors.hazel;
  const bgColor = variant === 'avoid' ? colors.gray100 : colors.hazel50;
  const borderColor = variant === 'avoid' ? colors.gray200 : colors.hazel100;

  return (
    <View style={[chipStyles.chip, { backgroundColor: bgColor, borderColor }]}>
      {variant === 'pattern' && (
        <Svg width={12} height={12} viewBox="0 0 12 12">
          <Line x1="0" y1="12" x2="12" y2="0" stroke={chipColor} strokeWidth={0.8} opacity={0.5} />
          <Line x1="0" y1="8" x2="8" y2="0" stroke={chipColor} strokeWidth={0.8} opacity={0.5} />
          <Line x1="4" y1="12" x2="12" y2="4" stroke={chipColor} strokeWidth={0.8} opacity={0.5} />
        </Svg>
      )}
      {variant === 'fabric' && (
        <Svg width={12} height={12} viewBox="0 0 12 12">
          <Circle cx="3" cy="3" r="1.5" fill={chipColor} opacity={0.3} />
          <Circle cx="9" cy="3" r="1.5" fill={chipColor} opacity={0.3} />
          <Circle cx="6" cy="9" r="1.5" fill={chipColor} opacity={0.3} />
        </Svg>
      )}
      {variant === 'avoid' && (
        <Svg width={12} height={12} viewBox="0 0 12 12">
          <Line x1="2" y1="2" x2="10" y2="10" stroke={chipColor} strokeWidth={1.2} strokeLinecap="round" />
          <Line x1="10" y1="2" x2="2" y2="10" stroke={chipColor} strokeWidth={1.2} strokeLinecap="round" />
        </Svg>
      )}
      <Typography variant="caption" color={chipColor}>
        {label}
      </Typography>
    </View>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
});

export function LookbookSection({ styleGuide }: LookbookSectionProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Your Lookbook"
        subtitle="Complete outfits styled in your palette"
      />

      {/* Outfit cards */}
      {styleGuide.outfits.map((outfit, i) => (
        <OutfitCard key={i} outfit={outfit} index={i} />
      ))}

      {/* Patterns & Fabrics section */}
      {(styleGuide.bestPatterns.length > 0 || styleGuide.bestFabrics.length > 0) && (
        <OrganicCard variant="subtle">
          {styleGuide.bestPatterns.length > 0 && (
            <View style={styles.materialSection}>
              <Typography variant="label" color={colors.hazel}>
                Your Best Patterns
              </Typography>
              <View style={styles.chipGrid}>
                {styleGuide.bestPatterns.map((pattern) => (
                  <MaterialChip key={pattern} label={pattern} variant="pattern" />
                ))}
              </View>
            </View>
          )}
          {styleGuide.bestFabrics.length > 0 && (
            <View style={[styles.materialSection, styleGuide.bestPatterns.length > 0 && { marginTop: spacing[4] }]}>
              <Typography variant="label" color={colors.hazel}>
                Your Best Fabrics
              </Typography>
              <View style={styles.chipGrid}>
                {styleGuide.bestFabrics.map((fabric) => (
                  <MaterialChip key={fabric} label={fabric} variant="fabric" />
                ))}
              </View>
            </View>
          )}
          {styleGuide.patternsToAvoid.length > 0 && (
            <View style={[styles.materialSection, { marginTop: spacing[4] }]}>
              <Typography variant="label" color={colors.gray400}>
                Patterns to Skip
              </Typography>
              <View style={styles.chipGrid}>
                {styleGuide.patternsToAvoid.map((pattern) => (
                  <MaterialChip key={pattern} label={pattern} variant="avoid" />
                ))}
              </View>
            </View>
          )}
        </OrganicCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[5],
  },
  materialSection: {
    gap: spacing[2],
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[1],
  },
});
