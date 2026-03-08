import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { useAuthStore } from '@presentation/stores/useAuthStore';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function SignUpScreen() {
  const router = useRouter();
  const { signIn, signUp, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialSignUp = async (provider: 'apple' | 'google') => {
    clearError();
    await signIn(provider);
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      router.back();
    }
  };

  const handleEmailSignUp = async () => {
    if (!email.trim() || !password.trim()) return;
    clearError();
    await signUp(email.trim(), password);
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
            title="Create Account"
            subtitle="Save your results across devices"
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
              onPress={() => handleSocialSignUp('apple')}
            >
              Sign up with Apple
            </Button>
            <Button
              variant="secondary"
              size="lg"
              loading={isLoading}
              onPress={() => handleSocialSignUp('google')}
            >
              Sign up with Google
            </Button>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Typography variant="caption" color={colors.gray400}>
              or
            </Typography>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.gray400}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.gray400}
              secureTextEntry
              autoComplete="new-password"
              value={password}
              onChangeText={setPassword}
            />
            <Button
              variant="primary"
              size="lg"
              loading={isLoading}
              onPress={handleEmailSignUp}
            >
              Create Account
            </Button>
          </View>

          <Button variant="ghost" size="md" onPress={() => router.back()}>
            Already have an account? Sign in
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
    paddingTop: spacing[16],
    gap: spacing[6],
  },
  buttons: {
    gap: spacing[3],
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: spacing[3],
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
  form: {
    gap: spacing[3],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.cream200,
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
    color: colors.charcoal,
    backgroundColor: colors.cream50,
  },
});
