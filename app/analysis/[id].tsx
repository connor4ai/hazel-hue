import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { ColorSwatch } from '@presentation/components/ui/ColorSwatch';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

/**
 * The full scrollable results experience — 12 sections flowing
 * like a beautifully designed editorial magazine spread.
 *
 * This is the MOST IMPORTANT screen in the entire app.
 * Each section should be screenshot-worthy.
 */
export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: Fetch full analysis results from API via TanStack Query
  // const { data: analysis } = useQuery({ queryKey: ['analysis', id], queryFn: ... });

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ─── SECTION 1: THE REVEAL ─── */}
          <View style={styles.revealSection}>
            <Typography variant="label" color={colors.gray400} align="center">
              You are a
            </Typography>
            <Typography variant="displayLarge" color={colors.hazel} align="center">
              Soft Autumn
            </Typography>
            <Typography
              variant="bodyLarge"
              color={colors.gray500}
              align="center"
              style={{ fontStyle: 'italic' }}
            >
              Warm, muted, golden — like sunlight through autumn leaves
            </Typography>
            {/* TODO: Season reveal animation (SeasonReveal.tsx) */}
            {/* TODO: Share + Save buttons */}
          </View>

          <BotanicalDivider variant="vine" />

          {/* ─── SECTION 2: YOUR COLOR STORY ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Your Color Story" />
            <OrganicCard variant="subtle">
              <Typography variant="body" color={colors.gray500}>
                Your coloring has a quiet warmth that comes alive in muted, earthy
                tones. Think terracotta pottery, olive groves, aged leather...
              </Typography>
              {/* TODO: Key traits with hand-illustrated icons */}
              {/* TODO: Confidence score gauge */}
            </OrganicCard>
          </View>

          <BotanicalDivider variant="leaves" />

          {/* ─── SECTION 3: YOUR PALETTE ─── */}
          <View style={styles.section}>
            <HandLetterHeading
              title="Your Palette"
              subtitle="Colors curated for your natural warmth"
            />
            {/* Placeholder palette grid */}
            <View style={styles.paletteGrid}>
              {['#C67B5C', '#8B6F47', '#A8B5A0', '#D4A5A5', '#8E7B54', '#B89B6F'].map(
                (hex, i) => (
                  <ColorSwatch key={i} hex={hex} name="Color name" size="lg" />
                ),
              )}
            </View>
            {/* TODO: Full PaletteGrid component with categories */}
            {/* TODO: Save Palette Image button */}
            {/* TODO: Palette Lock Screen generator */}
          </View>

          <BotanicalDivider variant="minimal" />

          {/* ─── SECTION 4: THE DRAPE ROOM ─── */}
          <View style={styles.section}>
            <HandLetterHeading
              title="The Drape Room"
              subtitle="See why your colors work"
            />
            <OrganicCard>
              <Typography variant="body" color={colors.gray500} align="center">
                Interactive drape comparison coming soon.
              </Typography>
              {/* TODO: DrapeRoom component with swipeable carousel */}
            </OrganicCard>
          </View>

          <BotanicalDivider variant="vine" />

          {/* ─── SECTION 5: STYLE GUIDE / LOOKBOOK ─── */}
          <View style={styles.section}>
            <HandLetterHeading
              title="Your Lookbook"
              subtitle="Outfit inspiration in your colors"
            />
            {/* TODO: LookbookSection with outfit cards */}
            <OrganicCard variant="subtle">
              <Typography variant="h3" color={colors.hazel}>The Weekend</Typography>
              <Typography variant="bodySmall" color={colors.gray500}>
                Olive linen pants, cream knit, tan leather sandals, gold hoops
              </Typography>
            </OrganicCard>
          </View>

          <BotanicalDivider variant="leaves" />

          {/* ─── SECTION 6: MAKEUP GUIDE ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Makeup Guide" subtitle="Your most flattering shades" />
            {/* TODO: MakeupGuide component with lip, eye, blush swatches */}
          </View>

          <BotanicalDivider variant="minimal" />

          {/* ─── SECTION 7: JEWELRY & METALS ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Jewelry & Metals" />
            {/* TODO: JewelryGuide component */}
          </View>

          <BotanicalDivider variant="vine" />

          {/* ─── SECTION 8: HAIR GUIDE ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Hair Guide" subtitle="What to ask for at the salon" />
            {/* TODO: HairGuide component with salon terminology card */}
          </View>

          <BotanicalDivider variant="leaves" />

          {/* ─── SECTION 9: SEASON SIBLINGS ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Season Siblings" subtitle="You share your season with..." />
            {/* TODO: SeasonSiblings component with celebrity cards */}
          </View>

          <BotanicalDivider variant="minimal" />

          {/* ─── SECTION 10: COLORS TO AVOID ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Colors to Minimize" subtitle="These compete with your natural warmth" />
            {/* TODO: ColorsToAvoid grid */}
          </View>

          <BotanicalDivider variant="vine" />

          {/* ─── SECTION 11: YOUR TOOLKIT ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Your Toolkit" subtitle="Take your colors everywhere" />
            {/* TODO: Toolkit with downloadable assets */}
          </View>

          <BotanicalDivider variant="leaves" />

          {/* ─── SECTION 12: SHARE + REFER ─── */}
          <View style={styles.section}>
            <HandLetterHeading title="Share Your Colors" />
            {/* TODO: Share buttons + referral code */}
          </View>

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
  },
  revealSection: {
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[8],
  },
  section: {
    gap: spacing[4],
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing[4],
  },
  footer: {
    paddingTop: spacing[8],
  },
});
