import React from 'react';
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '@presentation/theme/colors';
import { borderRadius, spacing } from '@presentation/theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: string;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.hazel, text: colors.cream },
  secondary: { bg: 'transparent', text: colors.hazel, border: colors.hazel },
  ghost: { bg: 'transparent', text: colors.hazel },
};

const sizeStyles: Record<ButtonSize, { paddingH: number; paddingV: number; fontSize: keyof typeof import('@presentation/theme/typography').fontSizes }> = {
  sm: { paddingH: spacing[4], paddingV: spacing[2], fontSize: 'sm' as any },
  md: { paddingH: spacing[6], paddingV: spacing[3], fontSize: 'base' as any },
  lg: { paddingH: spacing[8], paddingV: spacing[4], fontSize: 'lg' as any },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: vs.bg,
          borderColor: vs.border ?? 'transparent',
          borderWidth: vs.border ? 1.5 : 0,
          paddingHorizontal: ss.paddingH,
          paddingVertical: ss.paddingV,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style as any,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={vs.text} size="small" />
      ) : (
        <Typography
          variant="label"
          color={vs.text}
          style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}
        >
          {children}
        </Typography>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
