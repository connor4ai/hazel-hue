import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable, Alert, ScrollView, Platform } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Svg, { Path } from 'react-native-svg';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Typography } from '@presentation/components/ui/Typography';
import { PaletteResultCard, type PaletteResultCardProps } from './PaletteResultCard';
import { shareResultCard, type ShareTarget } from '@infrastructure/sharing/shareResultCard';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing, shadows } from '@presentation/theme/spacing';
import { fontFamilies } from '@presentation/theme/typography';

// ─── Types ───────────────────────────────────────────────────────────
interface ShareResultCardSectionProps extends PaletteResultCardProps {
  analysisId: string;
}

// ─── Share button icons (inline SVG for crisp rendering) ─────────────
function InstagramIcon({ color = colors.white }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"
        fill={color}
      />
    </Svg>
  );
}

function TikTokIcon({ color = colors.white }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z"
        fill={color}
      />
    </Svg>
  );
}

function SaveIcon({ color = colors.white }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 20h14v-2H5v2zm7-18L5.33 8.67l1.42 1.41L11 5.83V16h2V5.83l4.25 4.25 1.42-1.41L12 2z"
        fill={color}
        transform="rotate(180, 12, 12)"
      />
    </Svg>
  );
}

function ShareIcon({ color = colors.white }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 000-6 3 3 0 00-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 000 6c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65a2.92 2.92 0 002.92 2.92A2.92 2.92 0 0021 18.92 2.92 2.92 0 0018 16.08z"
        fill={color}
      />
    </Svg>
  );
}

// ─── Share button component ──────────────────────────────────────────
interface ShareButtonProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  backgroundColor: string;
  onPress: () => void;
  loading?: boolean;
}

function ShareButton({ icon, label, sublabel, backgroundColor, onPress, loading }: ShareButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        shareButtonStyles.button,
        { backgroundColor, opacity: pressed ? 0.85 : loading ? 0.6 : 1 },
      ]}
    >
      <View style={shareButtonStyles.iconContainer}>{icon}</View>
      <View style={shareButtonStyles.labelContainer}>
        <Typography
          variant="label"
          color={colors.white}
          style={shareButtonStyles.labelText}
        >
          {label}
        </Typography>
        {sublabel && (
          <Typography variant="caption" color="rgba(255,255,255,0.7)">
            {sublabel}
          </Typography>
        )}
      </View>
    </Pressable>
  );
}

const shareButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.lg,
    gap: spacing[3],
    ...shadows.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  labelText: {
    textTransform: 'none' as const,
    letterSpacing: 0.3,
  },
});

// ─── Main component ─────────────────────────────────────────────────
export function ShareResultCard({
  analysisId: _analysisId,
  seasonName,
  seasonFamily,
  poeticDescription,
  accentColor,
  swatches,
  celebrityName,
}: ShareResultCardSectionProps) {
  const viewShotRef = useRef<ViewShot>(null);
  const [activeShare, setActiveShare] = useState<ShareTarget | null>(null);
  const [savedToRoll, setSavedToRoll] = useState(false);

  const captureCard = useCallback(async (): Promise<string | null> => {
    try {
      if (!viewShotRef.current?.capture) return null;
      const uri = await viewShotRef.current.capture();
      return uri;
    } catch {
      Alert.alert('Error', 'Failed to capture your palette card. Please try again.');
      return null;
    }
  }, []);

  const handleShare = useCallback(async (target: ShareTarget) => {
    setActiveShare(target);
    try {
      const uri = await captureCard();
      if (!uri) return;

      const success = await shareResultCard(uri, target, { seasonName });

      if (success && target === 'camera-roll') {
        setSavedToRoll(true);
        Alert.alert('Saved!', 'Your palette card has been saved to your camera roll.');
      }
    } finally {
      setActiveShare(null);
    }
  }, [captureCard, seasonName]);

  const cardProps: PaletteResultCardProps = useMemo(() => ({
    seasonName,
    seasonFamily,
    poeticDescription,
    accentColor,
    swatches,
    celebrityName,
  }), [seasonName, seasonFamily, poeticDescription, accentColor, swatches, celebrityName]);

  return (
    <View style={styles.container}>
      <HandLetterHeading
        title="Share Your Colors"
        subtitle="Tap your card to share it with the world"
      />

      {/* ─── Card preview ─── */}
      <View style={styles.cardPreviewContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardScroll}
          snapToInterval={376}
          decelerationRate="fast"
        >
          <View style={styles.cardWrapper}>
            <ViewShot
              ref={viewShotRef}
              options={{
                format: 'png',
                quality: 1,
                // Capture at 3x for 1080×1920 output from 360×640 render
                width: 1080,
                height: 1920,
              }}
            >
              <PaletteResultCard {...cardProps} />
            </ViewShot>
          </View>
        </ScrollView>
      </View>

      {/* ─── Share buttons ─── */}
      <View style={styles.shareSection}>
        <Typography
          variant="label"
          color={colors.gray400}
          align="center"
          style={styles.shareLabel}
        >
          ONE-TAP SHARE
        </Typography>

        <View style={styles.shareButtons}>
          {/* Instagram Stories — primary CTA */}
          <ShareButton
            icon={<InstagramIcon />}
            label="Instagram Stories"
            sublabel="Story-optimized 1080×1920"
            backgroundColor="#E1306C"
            loading={activeShare === 'instagram-stories'}
            onPress={() => handleShare('instagram-stories')}
          />

          {/* TikTok */}
          <ShareButton
            icon={<TikTokIcon />}
            label="TikTok"
            sublabel="Saves & opens TikTok"
            backgroundColor="#010101"
            loading={activeShare === 'tiktok'}
            onPress={() => handleShare('tiktok')}
          />

          {/* Two smaller buttons in a row */}
          <View style={styles.smallButtonRow}>
            {/* Save to Camera Roll */}
            <Pressable
              onPress={() => handleShare('camera-roll')}
              disabled={activeShare === 'camera-roll'}
              style={({ pressed }) => [
                styles.smallButton,
                {
                  backgroundColor: savedToRoll ? colors.success : colors.hazel,
                  opacity: pressed ? 0.85 : activeShare === 'camera-roll' ? 0.6 : 1,
                },
              ]}
            >
              <SaveIcon />
              <Typography variant="caption" color={colors.white} style={styles.smallBtnLabel}>
                {savedToRoll ? 'Saved!' : 'Camera Roll'}
              </Typography>
            </Pressable>

            {/* More sharing options */}
            <Pressable
              onPress={() => handleShare('generic')}
              disabled={activeShare === 'generic'}
              style={({ pressed }) => [
                styles.smallButton,
                {
                  backgroundColor: colors.charcoal,
                  opacity: pressed ? 0.85 : activeShare === 'generic' ? 0.6 : 1,
                },
              ]}
            >
              <ShareIcon />
              <Typography variant="caption" color={colors.white} style={styles.smallBtnLabel}>
                More
              </Typography>
            </Pressable>
          </View>
        </View>

        {/* Hint text */}
        <Typography
          variant="caption"
          color={colors.gray400}
          align="center"
          style={styles.hint}
        >
          {Platform.OS === 'ios'
            ? 'Share via Messages, WhatsApp, Snapchat & more'
            : 'Share via any app on your device'}
        </Typography>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  cardPreviewContainer: {
    marginHorizontal: -spacing[6], // Bleed to screen edges
  },
  cardScroll: {
    paddingHorizontal: spacing[6],
  },
  cardWrapper: {
    // Add a subtle platform-appropriate shadow around the card
    borderRadius: 20,
    ...shadows.xl,
  },
  shareSection: {
    gap: spacing[3],
  },
  shareLabel: {
    letterSpacing: 3,
    marginBottom: spacing[1],
  },
  shareButtons: {
    gap: spacing[3],
  },
  smallButtonRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  smallButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  smallBtnLabel: {
    fontFamily: fontFamilies.bodyMedium,
  },
  hint: {
    marginTop: spacing[1],
    fontStyle: 'italic',
  },
});
