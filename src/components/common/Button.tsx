import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import type { Theme } from '../../styles/theme';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  disabled: boolean;
  fullWidth: boolean;
  theme: Theme;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `${theme.spacing.xs}px ${theme.spacing.sm}px`;
      case 'large':
        return `${theme.spacing.md}px ${theme.spacing.lg}px`;
      default:
        return `${theme.spacing.sm}px ${theme.spacing.md}px`;
    }
  }};
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  }};
  border-width: ${({ variant }) => (variant === 'outline' ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ButtonText = styled.Text<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  theme: Theme;
}>`
  color: ${({ variant, theme }) =>
    variant === 'outline' ? theme.colors.primary : '#ffffff'};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return theme.typography.caption.fontSize;
      case 'large':
        return theme.typography.h2.fontSize;
      default:
        return theme.typography.body.fontSize;
    }
  }}px;
  font-weight: bold;
`;

export function Button({
  onPress,
  label,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const theme = useTheme() as Theme;

  return (
    <ButtonContainer
      onPress={onPress}
      disabled={disabled || isLoading}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      testID="button"
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : '#ffffff'} />
      ) : (
        <ButtonText variant={variant} size={size}>
          {label}
        </ButtonText>
      )}
    </ButtonContainer>
  );
}
