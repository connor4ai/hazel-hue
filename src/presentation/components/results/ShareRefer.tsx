import React, { useState } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
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
}

export function ShareRefer({ analysisId }: ShareReferProps) {
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
    <View style={styles.container}>
      <HandLetterHeading title="Share Your Colors" />
      <OrganicCard variant="subtle" style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  card: {
    gap: spacing[3],
    alignItems: 'center',
  },
});
