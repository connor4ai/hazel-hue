import React, { useState } from 'react';
import { View, StyleSheet, Alert, Linking, Share, Platform } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface ShareReferProps {
  analysisId: string;
  seasonName?: string;
}

export function ShareRefer({ analysisId, seasonName }: ShareReferProps) {
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const generateShareImage = async () => {
    setLoadingImage(true);
    try {
      const result = await apiClient.post<{ downloadUrl: string }>(
        endpoints.experience.shareImage,
        { analysisId },
      );
      await Linking.openURL(result.downloadUrl);
    } catch {
      Alert.alert('Error', 'Failed to generate share image.');
    } finally {
      setLoadingImage(false);
    }
  };

  const shareResults = async () => {
    setLoadingShare(true);
    try {
      const season = seasonName ?? 'my season';
      await Share.share({
        message: `I just discovered I'm a ${season}! Find your perfect colors with Hazel & Hue — it's free and takes 30 seconds.`,
        url: 'https://hazelandhue.com',
      });
    } catch {
      // User cancelled share
    } finally {
      setLoadingShare(false);
    }
  };

  return (
    <View style={styles.container}>
      <HandLetterHeading title="Share Your Colors" />
      <OrganicCard variant="subtle" style={styles.card}>
        <Typography variant="body" color={colors.gray500} align="center">
          Show the world your season — share your results with friends
        </Typography>

        <View style={styles.buttonRow}>
          <Button
            variant="primary"
            size="md"
            loading={loadingImage}
            onPress={generateShareImage}
            style={styles.button}
          >
            Instagram Story
          </Button>
          <Button
            variant="secondary"
            size="md"
            loading={loadingShare}
            onPress={shareResults}
            style={styles.button}
          >
            Share Link
          </Button>
        </View>

        <Typography variant="caption" color={colors.gray400} align="center">
          {Platform.OS === 'ios'
            ? 'Creates a beautiful story card or shares via Messages, WhatsApp & more'
            : 'Creates a beautiful story card or shares via your favorite apps'}
        </Typography>
      </OrganicCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  card: {
    gap: spacing[3],
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing[3],
    width: '100%',
  },
  button: {
    flex: 1,
  },
});
