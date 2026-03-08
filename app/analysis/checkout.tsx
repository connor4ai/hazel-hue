import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function CheckoutScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // TODO: Trigger RevenueCat/Stripe purchase flow
      // On success:
      router.replace('/analysis/processing');
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading
            title="Your Analysis Awaits"
            subtitle="One step away from discovering your colors"
          />

          <BotanicalDivider variant="vine" />

          {/* What you'll get */}
          <OrganicCard variant="elevated">
            <Typography variant="h2" color={colors.hazel}>
              What's included
            </Typography>
            <View style={styles.features}>
              {[
                'Your seasonal color type (1 of 12 seasons)',
                'Personal palette with 30+ curated colors',
                'Interactive drape comparison',
                'Complete style lookbook',
                'Makeup, hair, and jewelry guides',
                'Celebrity season matches',
                'Downloadable palette wallpaper',
                'Salon instruction card',
              ].map((feature, i) => (
                <Typography key={i} variant="bodySmall" color={colors.gray500}>
                  {'  \u2022  '}{feature}
                </Typography>
              ))}
            </View>
          </OrganicCard>

          {/* Price */}
          <View style={styles.priceBlock}>
            <Typography variant="caption" color={colors.gray400} align="center">
              vs. $300+ for an in-person consultation
            </Typography>
            <Typography variant="displayMedium" color={colors.hazel} align="center">
              $19
            </Typography>
            <Typography variant="caption" color={colors.gray400} align="center">
              one time, forever yours
            </Typography>
          </View>

          {/* CTA */}
          <View style={styles.cta}>
            <Button size="lg" loading={loading} onPress={handlePurchase}>
              Get My Colors — $19
            </Button>
            <Typography variant="caption" color={colors.gray400} align="center">
              Not happy? Full refund, no questions asked.
            </Typography>
          </View>
        </View>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    gap: spacing[4],
  },
  features: {
    gap: spacing[2],
    marginTop: spacing[3],
  },
  priceBlock: {
    alignItems: 'center',
    paddingVertical: spacing[4],
    gap: spacing[1],
  },
  cta: {
    alignItems: 'center',
    gap: spacing[3],
    paddingTop: spacing[2],
  },
});
