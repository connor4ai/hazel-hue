import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WatercolorBackground } from '@presentation/components/brand/WatercolorBackground';
import { HandLetterHeading } from '@presentation/components/brand/HandLetterHeading';
import { Button } from '@presentation/components/ui/Button';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <WatercolorBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <HandLetterHeading
            title="Create Account"
            subtitle="Save your results across devices"
          />

          <View style={styles.buttons}>
            <Button variant="primary" size="lg">
              Sign up with Apple
            </Button>
            <Button variant="secondary" size="lg">
              Sign up with Google
            </Button>
            {/* TODO: Email/password form */}
            <Button variant="ghost" size="md" onPress={() => router.back()}>
              Already have an account? Sign in
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
});
