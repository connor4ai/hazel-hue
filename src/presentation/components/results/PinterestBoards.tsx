import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface PinterestBoardsProps {
  seasonName: string;
  makeupBoardUrl: string;
  outfitsBoardUrl: string;
}

function PinterestIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
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

function BoardButton({ label, url }: { label: string; url: string }) {
  return (
    <TouchableOpacity
      style={styles.boardButton}
      onPress={() => Linking.openURL(url)}
      activeOpacity={0.7}
    >
      <PinterestIcon />
      <View style={styles.boardTextContainer}>
        <Typography variant="label" color={colors.charcoal}>
          {label}
        </Typography>
        <Typography variant="caption" color={colors.gray400}>
          Curated inspiration board
        </Typography>
      </View>
      <Svg width={16} height={16} viewBox="0 0 24 24">
        <Path
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          stroke={colors.gray400}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export function PinterestBoardsSection({ seasonName, makeupBoardUrl, outfitsBoardUrl }: PinterestBoardsProps) {
  return (
    <View style={styles.container}>
      <HandLetterHeading title="Curated Inspiration" />
      <OrganicCard variant="subtle" style={styles.card}>
        <Typography variant="body" color={colors.gray500} align="center">
          Hand-picked {seasonName} inspiration boards
        </Typography>
        <BoardButton label={`${seasonName} Makeup`} url={makeupBoardUrl} />
        <BoardButton label={`${seasonName} Outfits`} url={outfitsBoardUrl} />
      </OrganicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  card: {
    gap: spacing[3],
  },
  boardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    borderRadius: 16,
    backgroundColor: colors.cream50,
    borderWidth: 1,
    borderColor: colors.cream200,
  },
  boardTextContainer: {
    flex: 1,
    gap: 2,
  },
});
