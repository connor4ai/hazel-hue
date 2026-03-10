import React, { useState } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Button } from '@presentation/components/ui/Button';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import { spacing } from '@presentation/theme/spacing';

interface ToolkitProps {
  analysisId: string;
}

export function Toolkit({ analysisId }: ToolkitProps) {
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
    <View style={styles.container}>
      <HandLetterHeading title="Your Toolkit" subtitle="Take your colors everywhere" />
      <OrganicCard variant="subtle" style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  card: {
    gap: spacing[3],
    alignItems: 'center',
  },
});
