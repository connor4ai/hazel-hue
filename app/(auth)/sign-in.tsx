import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { useAuthStore } from '@presentation/stores/useAuthStore';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, isLoading, error, clearError } = useAuthStore();

  const handleSignIn = async (provider: 'apple' | 'google') => {
    clearError();
    await signIn(provider);
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      router.back();
    }
  };

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Decorative color dots */}
          <View style={styles.decoration}>
            <Svg width={120} height={40} viewBox="0 0 120 40">
              <Circle cx="20" cy="20" r="12" fill={colors.terracotta} opacity={0.2} />
              <Circle cx="50" cy="15" r="8" fill={colors.sage} opacity={0.2} />
              <Circle cx="75" cy="22" r="10" fill={colors.dustyRose} opacity={0.2} />
              <Circle cx="100" cy="18" r="7" fill={colors.lavender} opacity={0.2} />
            </Svg>
          </View>

          <HandLetterHeading
            title="Welcome Back"
            subtitle="Sign in to access your color results"
          />

          {error && (
            <View style={styles.errorBox}>
              <Typography variant="bodySmall" color={colors.error}>
                {error}
              </Typography>
            </View>
          )}

          <View style={styles.buttons}>
            <Button
              variant="primary"
              size="lg"
              loading={isLoading}
              onPress={() => handleSignIn('apple')}
            >
              Continue with Apple
            </Button>
            <Button
              variant="secondary"
              size="lg"
              loading={isLoading}
              onPress={() => handleSignIn('google')}
            >
              Continue with Google
            </Button>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Typography variant="caption" color={colors.gray400}>
              or
            </Typography>
            <View style={styles.dividerLine} />
          </View>

          <Button
            variant="ghost"
            size="md"
            onPress={() => router.push('/(auth)/sign-up')}
          >
            Create an account
          </Button>
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
    gap: spacing[8],
  },
  decoration: {
    alignItems: 'center',
    paddingTop: spacing[4],
  },
  buttons: {
    gap: spacing[3],
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cream200,
  },
});
