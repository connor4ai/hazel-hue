import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
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
    icon: { color: colors.terracotta, symbol: 'sun' },
  },
  {
    title: 'Bare skin is best',
    description: 'Remove heavy makeup if possible. Bare skin gives the most accurate results.',
    icon: { color: colors.dustyRose, symbol: 'face' },
  },
  {
    title: 'Plain background',
    description: 'A neutral wall or backdrop works perfectly. Avoid busy patterns behind you.',
    icon: { color: colors.sage, symbol: 'frame' },
  },
  {
    title: 'Hair visible',
    description: "Let your natural hair show — it's part of your color profile.",
    icon: { color: colors.hazel, symbol: 'hair' },
  },
];

function TipIcon({ color }: { color: string }) {
  return (
    <View style={[styles.iconCircle, { backgroundColor: color + '18' }]}>
      <View style={[styles.iconDot, { backgroundColor: color }]} />
    </View>
  );
}

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
                <View style={styles.tipRow}>
                  <TipIcon color={tip.icon.color} />
                  <View style={styles.tipText}>
                    <Typography variant="h3" color={colors.charcoal}>
                      {tip.title}
                    </Typography>
                    <Typography variant="bodySmall" color={colors.gray500}>
                      {tip.description}
                    </Typography>
                  </View>
                </View>
              </OrganicCard>
            ))}
          </View>

          {/* Time estimate */}
          <View style={styles.timeEstimate}>
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Circle cx="12" cy="12" r="9" stroke={colors.hazel} strokeWidth="1.5" fill="none" />
              <Path d="M12 7v5l3 3" stroke={colors.hazel} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </Svg>
            <Typography variant="caption" color={colors.gray400}>
              The entire process takes under 60 seconds
            </Typography>
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
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[4],
  },
  tipText: {
    flex: 1,
    gap: spacing[1],
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  iconDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[6],
  },
  cta: {
    alignItems: 'center',
  },
});
