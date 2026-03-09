import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { ShareRefer } from '@presentation/components/results/ShareRefer';
import { useAnalysisResults } from '@presentation/hooks/useAnalysisResults';
import { getSeasonDisplayName } from '@domain/shared/types/Season';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: analysis, isLoading, error } = useAnalysisResults(id ?? '');

  if (isLoading) {
    return (
      <WatercolorBackground>
        <SafeAreaView style={styles.safe}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.hazel} />
            <Typography variant="body" color={colors.gray400}>
              Loading your results...
            </Typography>
          </View>
        </SafeAreaView>
      </WatercolorBackground>
    );
  }

  if (error || !analysis) {
    return (
      <WatercolorBackground>
        <SafeAreaView style={styles.safe}>
          <View style={styles.loadingContainer}>
            <Typography variant="body" color={colors.error} align="center">
              Unable to load your results. Please try again.
            </Typography>
          </View>
        </SafeAreaView>
      </WatercolorBackground>
    );
  }

  const seasonName = analysis.season
    ? getSeasonDisplayName(analysis.season)
    : 'Your Season';

  const seasonAccentColor = analysis.season
    ? colors.seasonAccent[analysis.season.split('_').pop() as keyof typeof colors.seasonAccent] ?? colors.hazel
    : colors.hazel;

  return (
    <WatercolorBackground tint={seasonAccentColor} opacity={0.03}>
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

          <ShareRefer analysisId={id ?? ''} />

          <View style={styles.footer}>
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
    gap: spacing[4],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  footer: {
    paddingTop: spacing[8],
  },
});
