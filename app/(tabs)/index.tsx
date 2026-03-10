import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { BotanicalDivider } from '@presentation/components/brand/BotanicalDivider';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

const FLOATING_COLORS = [
  { color: colors.terracotta, size: 48, x: 30, y: 0, delay: 0 },
  { color: colors.dustyRose, size: 36, x: 260, y: 20, delay: 300 },
  { color: colors.sage, size: 42, x: 10, y: 60, delay: 600 },
  { color: colors.lavender, size: 32, x: 240, y: 80, delay: 900 },
  { color: colors.hazel, size: 38, x: 140, y: 10, delay: 1200 },
];

const FEATURES = [
  { title: '30+ Colors', subtitle: 'Your personal palette' },
  { title: 'Style Guide', subtitle: 'Curated outfits' },
  { title: 'Makeup Recs', subtitle: 'Foundation to lips' },
  { title: '45 Seconds', subtitle: 'AI-powered speed' },
];

function FloatingSwatches() {
  return (
    <View style={styles.swatchContainer}>
      {FLOATING_COLORS.map((swatch, i) => (
        <FloatingSwatch key={i} {...swatch} index={i} />
      ))}
    </View>
  );
}

function FloatingSwatch({ color, size, x, y, delay, index }: {
  color: string; size: number; x: number; y: number; delay: number; index: number;
}) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0.25, { duration: 800 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }));
    translateY.value = withDelay(delay,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 2500 + index * 500, easing: Easing.inOut(Easing.ease) }),
          withTiming(8, { duration: 2500 + index * 500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, [delay, index, opacity, scale, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size * 0.35,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  );
}

function MiniPalettePreview() {
  const paletteColors = ['#C67B5C', '#D4A574', '#8B6F47', '#A8B5A0', '#D4A5A5', '#7B8E6F'];

  return (
    <Svg width={200} height={140} viewBox="0 0 200 140">
      <Defs>
        <LinearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#FEFCF9" stopOpacity="0.7" />
        </LinearGradient>
      </Defs>
      {/* Card background */}
      <Rect x="0" y="0" width="200" height="140" rx="16" fill="url(#cardGrad)" stroke={colors.cream200} strokeWidth="1" />
      {/* Color swatches */}
      {paletteColors.map((c, i) => (
        <React.Fragment key={i}>
          <Rect
            x={16 + (i % 3) * 58}
            y={40 + Math.floor(i / 3) * 44}
            width={48}
            height={36}
            rx="8"
            fill={c}
          />
        </React.Fragment>
      ))}
      {/* Season label */}
      <Circle cx="100" cy="18" r="3" fill={colors.hazel} />
    </Svg>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 800 });
    heroTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
  }, [heroOpacity, heroTranslateY]);

  const heroAnimStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Floating color swatches */}
          <FloatingSwatches />

          {/* Hero */}
          <Animated.View style={[styles.hero, heroAnimStyle]}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Typography variant="caption" color={colors.hazel500}>
                AI-POWERED
              </Typography>
            </View>

            <Typography variant="displayLarge" color={colors.charcoal} align="center">
              Hazel & Hue
            </Typography>
            <Typography
              variant="bodyLarge"
              color={colors.gray500}
              align="center"
              style={styles.tagline}
            >
              Discover the colors{'\n'}made for you
            </Typography>
          </Animated.View>

          {/* Mini palette preview */}
          <View style={styles.previewCard}>
            <MiniPalettePreview />
            <Typography variant="caption" color={colors.gray400} align="center">
              Soft Autumn — Example Result
            </Typography>
          </View>

          <BotanicalDivider variant="vine" />

          {/* Features grid */}
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, i) => (
              <OrganicCard key={i} variant="subtle">
                <View style={styles.featureItem}>
                  <Typography variant="h3" color={colors.hazel}>
                    {feature.title}
                  </Typography>
                  <Typography variant="caption" color={colors.gray400}>
                    {feature.subtitle}
                  </Typography>
                </View>
              </OrganicCard>
            ))}
          </View>

          {/* Free badge */}
          <View style={styles.freeSection}>
            <View style={styles.freeBadge}>
              <Typography variant="displayMedium" color={colors.hazel} align="center">
                100% Free
              </Typography>
            </View>
            <Typography variant="bodySmall" color={colors.gray400} align="center">
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
              No payment required — just share the love.
            </Typography>
          </View>

          {/* Social proof */}
          <View style={styles.socialProof}>
            <View style={styles.avatarStack}>
              {[colors.terracotta, colors.lavender, colors.plum, colors.coral, colors.sage].map((c, i) => (
                <View
                  key={i}
                  style={[
                    styles.avatar,
                    { backgroundColor: c, marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i },
                  ]}
                />
              ))}
            </View>
            <View>
              <Typography variant="bodySmall" color={colors.charcoal} style={{ fontWeight: '600' }}>
                2,400+ analyses
              </Typography>
              <Typography variant="caption" color={colors.gray400}>
                4.8 average rating
              </Typography>
            </View>
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
    paddingTop: spacing[10],
    paddingBottom: spacing[10],
  },
  swatchContainer: {
    height: 100,
    marginBottom: spacing[2],
  },
  hero: {
    alignItems: 'center',
    gap: spacing[2],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: 'rgba(139, 111, 71, 0.08)',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[1],
    borderRadius: 20,
    marginBottom: spacing[3],
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.sage,
  },
  tagline: {
    fontStyle: 'italic',
    marginTop: spacing[1],
  },
  previewCard: {
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[6],
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    justifyContent: 'center',
    paddingVertical: spacing[4],
  },
  featureItem: {
    alignItems: 'center',
    gap: spacing[1],
    minWidth: 130,
  },
  freeSection: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    gap: spacing[2],
  },
  freeBadge: {
    borderWidth: 2,
    borderColor: colors.hazel200,
    borderRadius: 20,
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[3],
  },
  ctaSection: {
    alignItems: 'center',
    gap: spacing[3],
    paddingTop: spacing[2],
  },
  guarantee: {
    fontStyle: 'italic',
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[4],
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.cream,
  },
});
