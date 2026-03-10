import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { Typography } from '@presentation/components/ui/Typography';
import { SeasonReveal } from '@presentation/components/results/SeasonReveal';
import { ColorStory } from '@presentation/components/results/ColorStory';
import { PaletteGrid } from '@presentation/components/results/PaletteGrid';
import { DrapeRoom } from '@presentation/components/results/DrapeRoom';
import { LookbookSection } from '@presentation/components/results/LookbookSection';
import { MakeupGuideSection } from '@presentation/components/results/MakeupGuide';
import { JewelryGuideSection } from '@presentation/components/results/JewelryGuide';
import { HairGuideSection } from '@presentation/components/results/HairGuide';
import { SeasonSiblingsSection } from '@presentation/components/results/SeasonSiblings';
import { ColorsToAvoid } from '@presentation/components/results/ColorsToAvoid';
import { Toolkit } from '@presentation/components/results/Toolkit';
import { NailGuideSection } from '@presentation/components/results/NailGuide';
import { AccessoryGuideSection } from '@presentation/components/results/AccessoryGuide';
import { PinterestBoardsSection } from '@presentation/components/results/PinterestBoards';
import { ShareRefer } from '@presentation/components/results/ShareRefer';
import { useAnalysisResults } from '@presentation/hooks/useAnalysisResults';
import { getSeasonDisplayName, SEASON_METADATA, Season } from '@domain/shared/types/Season';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

function LoadingState() {
  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          {/* Animated loading dots */}
          <Svg width={60} height={20} viewBox="0 0 60 20">
            <Defs>
              <LinearGradient id="loadGrad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={colors.terracotta} />
                <Stop offset="0.5" stopColor={colors.hazel} />
                <Stop offset="1" stopColor={colors.sage} />
              </LinearGradient>
            </Defs>
            <Circle cx="10" cy="10" r="4" fill="url(#loadGrad)" opacity={0.6} />
            <Circle cx="30" cy="10" r="4" fill="url(#loadGrad)" opacity={0.4} />
            <Circle cx="50" cy="10" r="4" fill="url(#loadGrad)" opacity={0.2} />
          </Svg>
          <Typography variant="body" color={colors.gray400}>
            Loading your results...
          </Typography>
        </View>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

function ErrorState() {
  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <View style={styles.errorIcon}>
            <Typography variant="h1" color={colors.error}>
              !
            </Typography>
          </View>
          <Typography variant="body" color={colors.charcoal} align="center">
            Unable to load your results
          </Typography>
          <Typography variant="bodySmall" color={colors.gray400} align="center">
            Please try again or contact support.
          </Typography>
        </View>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: analysis, isLoading, error } = useAnalysisResults(id ?? '');

  if (isLoading) return <LoadingState />;
  if (error || !analysis) return <ErrorState />;

  const seasonName = analysis.season
    ? getSeasonDisplayName(analysis.season)
    : 'Your Season';

  const seasonAccentColor = analysis.season
    ? colors.seasonAccent[analysis.season.split('_').pop() as keyof typeof colors.seasonAccent] ?? colors.hazel
    : colors.hazel;

  const seasonMeta = analysis.season
    ? SEASON_METADATA[analysis.season as Season]
    : null;

  return (
    <WatercolorBackground tint={seasonAccentColor} opacity={0.04}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <SeasonReveal
            seasonName={seasonName}
            poeticOneLiner={analysis.colorStory?.poeticOneLiner}
            accentColor={seasonAccentColor}
          />

          <BotanicalDivider variant="vine" />

          {analysis.colorStory && (
            <>
              <ColorStory colorStory={analysis.colorStory} />
              <BotanicalDivider variant="leaves" />
            </>
          )}

          {analysis.palette && (
            <>
              <PaletteGrid palette={analysis.palette} />
              <BotanicalDivider variant="minimal" />
            </>
          )}

          <DrapeRoom />
          <BotanicalDivider variant="vine" />

          {analysis.styleGuide && (
            <>
              <LookbookSection styleGuide={analysis.styleGuide} />
              <BotanicalDivider variant="leaves" />
            </>
          )}

          {analysis.makeup && (
            <>
              <MakeupGuideSection makeup={analysis.makeup} />
              <BotanicalDivider variant="minimal" />
            </>
          )}

          {analysis.jewelry && (
            <>
              <JewelryGuideSection jewelry={analysis.jewelry} />
              <BotanicalDivider variant="vine" />
            </>
          )}

          {analysis.hair && (
            <>
              <HairGuideSection hair={analysis.hair} />
              <BotanicalDivider variant="leaves" />
            </>
          )}

          {analysis.nails && (
            <>
              <NailGuideSection nails={analysis.nails} />
              <BotanicalDivider variant="minimal" />
            </>
          )}

          {analysis.accessories && (
            <>
              <AccessoryGuideSection accessories={analysis.accessories} />
              <BotanicalDivider variant="vine" />
            </>
          )}

          {seasonMeta && (
            <>
              <PinterestBoardsSection
                seasonName={seasonName}
                makeupBoardUrl={seasonMeta.pinterest.makeup}
                outfitsBoardUrl={seasonMeta.pinterest.outfits}
              />
              <BotanicalDivider variant="leaves" />
            </>
          )}

          {analysis.siblings && analysis.siblings.celebrities.length > 0 && (
            <>
              <SeasonSiblingsSection siblings={analysis.siblings} />
              <BotanicalDivider variant="minimal" />
            </>
          )}

          {analysis.avoid && analysis.avoid.colorsToAvoid.length > 0 && (
            <>
              <ColorsToAvoid avoid={analysis.avoid} />
              <BotanicalDivider variant="vine" />
            </>
          )}

          <Toolkit analysisId={id ?? ''} />
          <BotanicalDivider variant="leaves" />

          <ShareRefer analysisId={id ?? ''} seasonName={seasonName} />

          {/* Premium footer */}
          <View style={styles.footer}>
            <View style={styles.footerDivider} />
            <Typography variant="caption" color={colors.gray400} align="center">
              Made with care by Hazel & Hue
            </Typography>
          </View>
        </ScrollView>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    paddingBottom: spacing[16],
    gap: spacing[5],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  errorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingTop: spacing[8],
    gap: spacing[4],
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.cream200,
  },
});
