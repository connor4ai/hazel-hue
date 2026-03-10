import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <Typography variant="displayLarge" color={colors.hazel} align="center">
              Hazel & Hue
            </Typography>
            <Typography
              variant="bodyLarge"
              color={colors.gray500}
              align="center"
              style={styles.tagline}
            >
              Discover the colors that were made for you
            </Typography>
          </View>

          <BotanicalDivider variant="vine" />

          {/* Value proposition */}
          <View style={styles.section}>
            <HandLetterHeading
              title="Your Personal Color Analysis"
              subtitle="Powered by AI, designed with care"
            />
            <Typography
              variant="body"
              color={colors.gray500}
              align="center"
              style={styles.description}
            >
              Upload a selfie and receive a complete seasonal color palette,
              style guide, makeup recommendations, and more — personalized
              to your unique coloring.
            </Typography>
          </View>

          {/* Free badge */}
          <View style={styles.freeSection}>
            <Typography variant="displayMedium" color={colors.hazel} align="center">
              100% Free
            </Typography>
            <Typography variant="caption" color={colors.gray400} align="center">
              Share with 2 friends to unlock your analysis
            </Typography>
          </View>

          <BotanicalDivider variant="minimal" />

          {/* CTA */}
          <View style={styles.ctaSection}>
            <Button
              size="lg"
              onPress={() => router.push('/analysis/onboard')}
            >
              Get My Colors
            </Button>
            <Typography
              variant="caption"
              color={colors.gray400}
              align="center"
              style={styles.guarantee}
            >
              No payment required. Just share the love.
            </Typography>
          </View>
        </ScrollView>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[12],
    paddingBottom: spacing[10],
  },
  hero: {
    alignItems: 'center',
    gap: spacing[3],
  },
  tagline: {
    fontStyle: 'italic',
  },
  section: {
    alignItems: 'center',
    gap: spacing[4],
  },
  description: {
    maxWidth: 320,
  },
  freeSection: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    gap: spacing[1],
  },
  ctaSection: {
    alignItems: 'center',
    gap: spacing[3],
  },
  guarantee: {
    fontStyle: 'italic',
  },
});
