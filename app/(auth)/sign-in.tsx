import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          <HandLetterHeading
            title="Welcome Back"
            subtitle="Sign in to access your results"
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
            <Button
              variant="ghost"
              size="md"
              onPress={() => router.push('/(auth)/sign-up')}
            >
              Create an account
            </Button>
          </View>
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
    paddingTop: spacing[16],
    gap: spacing[10],
  },
  buttons: {
    gap: spacing[3],
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: spacing[3],
  },
});
