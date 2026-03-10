import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

const TIPS = [
  {
    title: 'Natural lighting',
    description: 'Face a window with natural daylight — no harsh overhead lights or flash.',
  },
  {
    title: 'Bare skin is best',
    description: 'Remove heavy makeup if possible. Bare skin gives the most accurate results.',
  },
  {
    title: 'Plain background',
    description: 'A neutral wall or backdrop works perfectly. Avoid busy patterns behind you.',
  },
  {
    title: 'Hair visible',
    description: 'Let your natural hair show — it\'s part of your color profile.',
  },
];

export default function OnboardScreen() {
  const router = useRouter();

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <HandLetterHeading
            title="Before We Begin"
            subtitle="A few tips for the best results"
          />

          <BotanicalDivider variant="leaves" />

          <View style={styles.tips}>
            {TIPS.map((tip, index) => (
              <OrganicCard key={index} variant="subtle">
                <Typography variant="h3" color={colors.hazel}>
                  {tip.title}
                </Typography>
                <Typography variant="bodySmall" color={colors.gray500}>
                  {tip.description}
                </Typography>
              </OrganicCard>
            ))}
          </View>

          <View style={styles.cta}>
            <Button size="lg" onPress={() => router.push('/analysis/capture')}>
              I'm Ready — Take My Photo
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </WatercolorBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    paddingBottom: spacing[8],
  },
  tips: {
    gap: spacing[3],
  },
  cta: {
    paddingTop: spacing[6],
    alignItems: 'center',
  },
});
