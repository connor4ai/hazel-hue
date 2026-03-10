import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography';
import { colors } from '@presentation/theme/colors';
import { spacing } from '@presentation/theme/spacing';

interface HandLetterHeadingProps {
  title: string;
  subtitle?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Display heading with the warm Fraunces serif font.
 * Used for section titles throughout the results experience.
 * The display font gives a hand-lettered, boutique feel.
 */
export function HandLetterHeading({
  title,
  subtitle,
  color: textColor = colors.charcoal,
  align = 'center',
}: HandLetterHeadingProps) {
  return (
    <View style={[styles.container, { alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }]}>
      <Typography variant="displaySmall" color={textColor} align={align}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="bodySmall"
          color={colors.gray500}
          align={align}
          style={styles.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[1],
  },
  subtitle: {
    fontStyle: 'italic',
    marginTop: spacing[1],
  },
});
