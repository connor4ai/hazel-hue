import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { OrganicCard } from '@presentation/components/brand/OrganicCard';
import { Typography } from '@presentation/components/ui/Typography';
import { Button } from '@presentation/components/ui/Button';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function ProfileScreen() {
  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading title="Profile" subtitle="Your account & settings" />

          <OrganicCard variant="subtle" style={styles.card}>
            <Typography variant="body" color={colors.gray500}>
              Sign in to save your results across devices and access your complete color profile.
            </Typography>
            <View style={styles.actions}>
              <Button variant="primary" size="md">
                Sign in with Apple
              </Button>
              <Button variant="secondary" size="md">
                Sign in with Google
              </Button>
            </View>
          </OrganicCard>

          <OrganicCard variant="subtle" style={styles.card}>
            <Typography variant="label" color={colors.hazel}>
              About Hazel & Hue
            </Typography>
            <Typography variant="bodySmall" color={colors.gray400}>
              Version 2.0.0
            </Typography>
          </OrganicCard>
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
    paddingTop: spacing[12],
    gap: spacing[6],
  },
  card: {
    gap: spacing[4],
  },
  actions: {
    gap: spacing[3],
  },
});
