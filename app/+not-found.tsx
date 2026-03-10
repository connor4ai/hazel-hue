import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="displaySmall" color={colors.hazel}>
        Page not found
      </Typography>
      <Link href="/" style={styles.link}>
        <Typography variant="body" color={colors.hazel}>
          Go home
        </Typography>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
  },
  link: {
    paddingVertical: spacing[2],
  },
});
