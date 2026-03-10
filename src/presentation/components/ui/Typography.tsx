import React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { textStyles } from '@presentation/theme/typography';
import { colors } from '@presentation/theme/colors';

type TextVariant = keyof typeof textStyles;

interface TypographyProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  color: textColor = colors.charcoal,
  align,
  style,
  children,
  ...props
}: TypographyProps) {
  const variantStyle = textStyles[variant];

  return (
    <Text
      style={[
        variantStyle,
        { color: textColor },
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
