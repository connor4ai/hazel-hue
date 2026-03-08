import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import { Button } from '@presentation/components/ui/Button';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
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
          {/* SECTION 1: THE REVEAL */}
          <View style={styles.revealSection}>
            <Typography variant="label" color={colors.gray400} align="center">
              You are a
            </Typography>
            <Typography variant="displayLarge" color={colors.hazel} align="center">
              {seasonName}
            </Typography>
            {analysis.colorStory?.poeticOneLiner && (
              <Typography
                variant="bodyLarge"
                color={colors.gray500}
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {analysis.colorStory.poeticOneLiner}
              </Typography>
            )}
          </View>

          <BotanicalDivider variant="vine" />

          {/* SECTION 2: YOUR COLOR STORY */}
          {analysis.colorStory && (
            <View style={styles.section}>
              <HandLetterHeading title="Your Color Story" />
              <OrganicCard variant="subtle">
                <Typography variant="body" color={colors.gray500}>
                  {analysis.colorStory.narrative}
                </Typography>
                {analysis.colorStory.keyTraits.length > 0 && (
                  <View style={styles.traits}>
                    {analysis.colorStory.keyTraits.map((trait, i) => (
                      <View key={i} style={styles.traitRow}>
                        <Typography variant="label" color={colors.hazel}>
                          {trait.label}
                        </Typography>
                        <Typography variant="bodySmall" color={colors.gray500}>
                          {trait.description}
                        </Typography>
                      </View>
                    ))}
                  </View>
                )}
              </OrganicCard>
            </View>
          )}

          <BotanicalDivider variant="leaves" />

          {/* SECTION 3: YOUR PALETTE */}
          {analysis.palette && (
            <View style={styles.section}>
              <HandLetterHeading
                title="Your Palette"
                subtitle="Colors curated for your natural warmth"
              />
              {analysis.palette.signatureColor && (
                <View style={styles.signatureColor}>
                  <ColorSwatch
                    hex={analysis.palette.signatureColor.hex}
                    name={analysis.palette.signatureColor.name}
                    size="lg"
                  />
                  <Typography variant="caption" color={colors.gray400}>
                    Your signature color
                  </Typography>
                </View>
              )}
              <PaletteCategory title="Neutrals" colors={analysis.palette.neutrals} />
              <PaletteCategory title="Statement Colors" colors={analysis.palette.statements} />
              <PaletteCategory title="Accents" colors={analysis.palette.accents} />
            </View>
          )}

          <BotanicalDivider variant="minimal" />

          {/* SECTION 4: THE DRAPE ROOM */}
          <View style={styles.section}>
            <HandLetterHeading
              title="The Drape Room"
              subtitle="See why your colors work"
            />
            <OrganicCard>
              <Typography variant="body" color={colors.gray500} align="center">
                Interactive drape comparison coming soon.
              </Typography>
            </OrganicCard>
          </View>

          <BotanicalDivider variant="vine" />

          {/* SECTION 5: STYLE GUIDE / LOOKBOOK */}
          {analysis.styleGuide && (
            <View style={styles.section}>
              <HandLetterHeading
                title="Your Lookbook"
                subtitle="Outfit inspiration in your colors"
              />
              {analysis.styleGuide.outfits.map((outfit, i) => (
                <OrganicCard key={i} variant="subtle">
                  <Typography variant="h3" color={colors.hazel}>
                    {outfit.name}
                  </Typography>
                  <Typography variant="bodySmall" color={colors.gray500}>
                    {outfit.description}
                  </Typography>
                </OrganicCard>
              ))}
            </View>
          )}

          <BotanicalDivider variant="leaves" />

          {/* SECTION 6: MAKEUP GUIDE */}
          {analysis.makeup && (
            <View style={styles.section}>
              <HandLetterHeading title="Makeup Guide" subtitle="Your most flattering shades" />
              <OrganicCard variant="subtle">
                <Typography variant="label" color={colors.hazel}>Foundation</Typography>
                <Typography variant="bodySmall" color={colors.gray500}>
                  {analysis.makeup.foundationTone}
                </Typography>
              </OrganicCard>
              <PaletteCategory title="Lip Colors" colors={analysis.makeup.lipColors} />
              <PaletteCategory title="Eye Shadows" colors={analysis.makeup.eyeShadows} />
              <PaletteCategory title="Blush" colors={analysis.makeup.blushColors} />
              {analysis.makeup.yourRed && (
                <View style={styles.signatureColor}>
                  <ColorSwatch
                    hex={analysis.makeup.yourRed.hex}
                    name={analysis.makeup.yourRed.name}
                    size="lg"
                  />
                  <Typography variant="caption" color={colors.gray400}>
                    Your perfect red
                  </Typography>
                </View>
              )}
            </View>
          )}

          <BotanicalDivider variant="minimal" />

          {/* SECTION 7: JEWELRY & METALS */}
          {analysis.jewelry && (
            <View style={styles.section}>
              <HandLetterHeading title="Jewelry & Metals" />
              <OrganicCard variant="subtle">
                <Typography variant="label" color={colors.hazel}>Best Metals</Typography>
                <Typography variant="body" color={colors.gray500}>
                  {analysis.jewelry.bestMetals.join(', ')}
                </Typography>
                {analysis.jewelry.gemstoneRecommendations.length > 0 && (
                  <>
                    <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
                      Recommended Gemstones
                    </Typography>
                    <Typography variant="body" color={colors.gray500}>
                      {analysis.jewelry.gemstoneRecommendations.join(', ')}
                    </Typography>
                  </>
                )}
              </OrganicCard>
            </View>
          )}

          <BotanicalDivider variant="vine" />

          {/* SECTION 8: HAIR GUIDE */}
          {analysis.hair && (
            <View style={styles.section}>
              <HandLetterHeading title="Hair Guide" subtitle="What to ask for at the salon" />
              <PaletteCategory title="Best Colors" colors={analysis.hair.bestColors} />
              <OrganicCard variant="subtle">
                <Typography variant="label" color={colors.hazel}>Highlights</Typography>
                <Typography variant="bodySmall" color={colors.gray500}>
                  {analysis.hair.highlightRecommendation}
                </Typography>
                <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
                  Lowlights
                </Typography>
                <Typography variant="bodySmall" color={colors.gray500}>
                  {analysis.hair.lowlightRecommendation}
                </Typography>
                {analysis.hair.salonTerminology.length > 0 && (
                  <>
                    <Typography variant="label" color={colors.hazel} style={{ marginTop: spacing[3] }}>
                      Ask Your Stylist For
                    </Typography>
                    {analysis.hair.salonTerminology.map((term, i) => (
                      <Typography key={i} variant="bodySmall" color={colors.gray500}>
                        {'  \u2022  '}{term}
                      </Typography>
                    ))}
                  </>
                )}
              </OrganicCard>
            </View>
          )}

          <BotanicalDivider variant="leaves" />

          {/* SECTION 9: SEASON SIBLINGS */}
          {analysis.siblings && analysis.siblings.celebrities.length > 0 && (
            <View style={styles.section}>
              <HandLetterHeading title="Season Siblings" subtitle="You share your season with..." />
              {analysis.siblings.celebrities.map((celeb, i) => (
                <OrganicCard key={i} variant="subtle">
                  <Typography variant="h3" color={colors.hazel}>
                    {celeb.name}
                  </Typography>
                  <Typography variant="bodySmall" color={colors.gray500}>
                    {celeb.description}
                  </Typography>
                </OrganicCard>
              ))}
            </View>
          )}

          <BotanicalDivider variant="minimal" />

          {/* SECTION 10: COLORS TO AVOID */}
          {analysis.avoid && analysis.avoid.colorsToAvoid.length > 0 && (
            <View style={styles.section}>
              <HandLetterHeading title="Colors to Minimize" subtitle="These compete with your natural warmth" />
              <View style={styles.avoidGrid}>
                {analysis.avoid.colorsToAvoid.map((color, i) => (
                  <View key={i} style={styles.avoidItem}>
                    <ColorSwatch hex={color.hex} name={color.name} size="sm" />
                    <Typography variant="caption" color={colors.gray400} style={{ maxWidth: 120 }}>
                      {color.reason}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
          )}

          <BotanicalDivider variant="vine" />

          {/* SECTION 11: YOUR TOOLKIT */}
          <ToolkitSection analysisId={id ?? ''} />

          <BotanicalDivider variant="leaves" />

          {/* SECTION 12: SHARE + REFER */}
          <ShareSection analysisId={id ?? ''} />

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

function ToolkitSection({ analysisId }: { analysisId: string }) {
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const download = async (type: 'lock-screen' | 'salon-card', body: Record<string, unknown>) => {
    setLoadingItem(type);
    try {
      const endpoint = type === 'lock-screen'
        ? endpoints.experience.lockScreen
        : endpoints.experience.salonCard;
      const result = await apiClient.post<{ downloadUrl: string }>(endpoint, body);
      await Linking.openURL(result.downloadUrl);
    } catch {
      Alert.alert('Error', 'Failed to generate. Please try again.');
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <View style={styles.section}>
      <HandLetterHeading title="Your Toolkit" subtitle="Take your colors everywhere" />
      <OrganicCard variant="subtle" style={styles.toolkitCard}>
        <Button
          variant="secondary"
          size="md"
          loading={loadingItem === 'lock-screen'}
          onPress={() => download('lock-screen', { analysisId, layout: 'gradient' })}
        >
          Gradient Wallpaper
        </Button>
        <Button
          variant="secondary"
          size="md"
          loading={loadingItem === 'lock-screen'}
          onPress={() => download('lock-screen', { analysisId, layout: 'swatches' })}
        >
          Swatch Wallpaper
        </Button>
        <Button
          variant="secondary"
          size="md"
          loading={loadingItem === 'salon-card'}
          onPress={() => download('salon-card', { analysisId })}
        >
          Salon Instruction Card
        </Button>
      </OrganicCard>
    </View>
  );
}

function ShareSection({ analysisId }: { analysisId: string }) {
  const [loading, setLoading] = useState(false);

  const generateShareImage = async () => {
    setLoading(true);
    try {
      const result = await apiClient.post<{ downloadUrl: string }>(
        endpoints.experience.shareImage,
        { analysisId },
      );
      await Linking.openURL(result.downloadUrl);
    } catch {
      Alert.alert('Error', 'Failed to generate share image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.section}>
      <HandLetterHeading title="Share Your Colors" />
      <OrganicCard variant="subtle" style={styles.toolkitCard}>
        <Typography variant="body" color={colors.gray500} align="center">
          Show the world your season
        </Typography>
        <Button
          variant="primary"
          size="md"
          loading={loading}
          onPress={generateShareImage}
        >
          Generate Share Image
        </Button>
        <Typography variant="caption" color={colors.gray400} align="center">
          Creates an Instagram-ready story image with your palette
        </Typography>
      </OrganicCard>
    </View>
  );
}

function PaletteCategory({ title, colors: swatchColors }: { title: string; colors: { hex: string; name: string }[] }) {
  if (!swatchColors || swatchColors.length === 0) return null;
  return (
    <View style={styles.paletteCategory}>
      <Typography variant="label" color={colors.gray500}>{title}</Typography>
      <View style={styles.paletteGrid}>
        {swatchColors.map((c, i) => (
          <ColorSwatch key={i} hex={c.hex} name={c.name} size="md" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    paddingBottom: spacing[16],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  revealSection: {
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[8],
  },
  section: {
    gap: spacing[4],
  },
  traits: {
    gap: spacing[3],
    marginTop: spacing[4],
  },
  traitRow: {
    gap: spacing[1],
  },
  signatureColor: {
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
  },
  paletteCategory: {
    gap: spacing[3],
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
  },
  avoidGrid: {
    gap: spacing[3],
  },
  avoidItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  toolkitCard: {
    gap: spacing[3],
    alignItems: 'center',
  },
  footer: {
    paddingTop: spacing[8],
  },
});
