import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@presentation/components/ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface SeasonRevealProps {
  seasonName: string;
  poeticOneLiner?: string;
  accentColor?: string;
}

export function SeasonReveal({ seasonName, poeticOneLiner, accentColor }: SeasonRevealProps) {
  return (
    <View style={styles.container}>
      <Typography variant="label" color={colors.gray400} align="center">
        You are a
      </Typography>
      <Typography variant="displayLarge" color={accentColor ?? colors.hazel} align="center">
        {seasonName}
      </Typography>
      {poeticOneLiner && (
        <Typography
          variant="bodyLarge"
          color={colors.gray500}
          align="center"
          style={{ fontStyle: 'italic' }}
        >
          {poeticOneLiner}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[8],
  },
});
