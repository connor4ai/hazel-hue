import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { PriceAnchor } from './PriceAnchor';
import { purchaseAnalysis } from '@infrastructure/payments/RevenueCatProvider';
import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';
import { ANALYSIS_PRICE_DISPLAY } from '@config/constants';

interface CheckoutSheetProps {
  onPurchaseComplete: () => void;
}

export function CheckoutSheet({ onPurchaseComplete }: CheckoutSheetProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await purchaseAnalysis();

      // Verify purchase on backend
      await apiClient.post(endpoints.user.purchases, {
        platform: result.platform,
        receiptId: result.transactionId,
        productId: result.productId,
      });

      onPurchaseComplete();
    } catch (error) {
      if (error instanceof Error && error.message.includes('cancelled')) {
        // User cancelled — do nothing
        return;
      }
      Alert.alert(
        'Purchase Failed',
        'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HandLetterHeading title="Unlock Your Colors" />

      <PriceAnchor />

      <OrganicCard variant="elevated">
        <View style={styles.features}>
          <FeatureItem text="Your 12-season color type" />
          <FeatureItem text="Personalized palette of 24+ colors" />
          <FeatureItem text="Makeup, hair & jewelry guides" />
          <FeatureItem text="Style lookbook with outfit ideas" />
          <FeatureItem text="Lock screen & salon card" />
          <FeatureItem text="Shareable season card" />
        </View>
      </OrganicCard>

      <Button
        variant="primary"
        size="lg"
        loading={loading}
        onPress={handlePurchase}
      >
        {`Get My Colors — ${ANALYSIS_PRICE_DISPLAY}`}
      </Button>

      <Typography variant="caption" color={colors.gray400} align="center">
        One-time purchase. Satisfaction guaranteed.
      </Typography>
    </View>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureRow}>
      <Typography variant="body" color={colors.sage}>
        {'\u2713'}
      </Typography>
      <Typography variant="bodySmall" color={colors.gray500}>
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[5],
    paddingVertical: spacing[6],
  },
  features: {
    gap: spacing[3],
  },
  featureRow: {
    flexDirection: 'row',
    gap: spacing[3],
    alignItems: 'center',
  },
});
