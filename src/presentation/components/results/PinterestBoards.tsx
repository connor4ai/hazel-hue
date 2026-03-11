import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';

interface PinterestBoardsProps {
  seasonName: string;
  makeupBoardUrl: string;
  outfitsBoardUrl: string;
  accentColor?: string;
}

function PinterestIcon({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="pinGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.terracotta} />
          <Stop offset="1" stopColor={colors.dustyRose} />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"
        fill="url(#pinGrad)"
      />
    </Svg>
  );
}

/** A decorative mini moodboard grid rendered in SVG to evoke Pinterest's visual feel */
function MoodboardPreview({ palette, variant }: { palette: string[]; variant: 'makeup' | 'outfits' }) {
  const c = palette.length >= 3 ? palette : [colors.dustyRose, colors.hazel, colors.sage];
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Defs>
        <LinearGradient id={`bg_${variant}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={c[0]} stopOpacity={0.15} />
          <Stop offset="1" stopColor={c[2]} stopOpacity={0.08} />
        </LinearGradient>
      </Defs>
      <Rect width="80" height="80" rx="12" fill={`url(#bg_${variant})`} />
      {/* Pinterest-style pin grid */}
      <Rect x="6" y="6" width="32" height="42" rx="6" fill={c[0]} opacity={0.6} />
      <Rect x="42" y="6" width="32" height="20" rx="6" fill={c[1]} opacity={0.5} />
      <Rect x="42" y="30" width="32" height="18" rx="6" fill={c[2]} opacity={0.4} />
      <Rect x="6" y="52" width="20" height="22" rx="6" fill={c[1]} opacity={0.35} />
      <Rect x="30" y="52" width="44" height="22" rx="6" fill={c[0]} opacity={0.25} />
      {/* Center icon overlay */}
      <Circle cx="40" cy="40" r="14" fill="white" opacity={0.85} />
      {variant === 'makeup' ? (
        <Rect x="36" y="30" width="8" height="16" rx="2" fill={c[0]} />
      ) : (
        <Path
          d="M40 32C40 32 42 32 42 33.5C42 35 40 35 40 35L33 41H47L40 35"
          stroke={c[0]}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </Svg>
  );
}

function ExternalLinkIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        stroke={colors.gray400}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function BoardCard({
  label,
  description,
  url,
  palette,
  variant,
}: {
  label: string;
  description: string;
  url: string;
  palette: string[];
  variant: 'makeup' | 'outfits';
}) {
  return (
    <TouchableOpacity
      style={cardStyles.container}
      onPress={() => Linking.openURL(url)}
      activeOpacity={0.7}
    >
      <MoodboardPreview palette={palette} variant={variant} />
      <View style={cardStyles.content}>
        <View style={cardStyles.titleRow}>
          <PinterestIcon />
          <Typography variant="label" color={colors.charcoal}>
            {label}
          </Typography>
        </View>
        <Typography variant="caption" color={colors.gray500} numberOfLines={2}>
          {description}
        </Typography>
        <View style={cardStyles.ctaRow}>
          <Typography variant="caption" color={colors.terracotta}>
            View board
          </Typography>
          <ExternalLinkIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.cream200,
    ...shadows.sm,
  },
  content: {
    flex: 1,
    gap: spacing[1],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginTop: spacing[1],
  },
});

export function PinterestBoardsSection({
  seasonName,
  makeupBoardUrl,
  outfitsBoardUrl,
  accentColor,
}: PinterestBoardsProps) {
  const palette = accentColor
    ? [accentColor, colors.hazel, colors.sage]
    : [colors.dustyRose, colors.hazel, colors.sage];

  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Curated Inspiration"
        subtitle={`Hand-picked ${seasonName} boards on Pinterest`}
      />
      <BoardCard
        label={`${seasonName} Makeup`}
        description={`Lipstick, eyeshadow & blush looks curated for your ${seasonName} palette`}
        url={makeupBoardUrl}
        palette={palette}
        variant="makeup"
      />
      <BoardCard
        label={`${seasonName} Outfits`}
        description="Complete outfits, color combos & seasonal styling in your colors"
        url={outfitsBoardUrl}
        palette={palette}
        variant="outfits"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
});
