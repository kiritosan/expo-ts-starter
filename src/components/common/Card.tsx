import { ReactNode } from 'react';
import styled from '@emotion/native';
import type { Theme } from '../../styles/theme';

interface CardProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined';
  padding?: keyof Theme['spacing'];
}

const CardContainer = styled.View<{
  variant: CardProps['variant'];
  padding: keyof Theme['spacing'];
  theme: Theme;
}>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme, padding }) => theme.spacing[padding]}px;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
  
  ${({ variant, theme }) =>
    variant === 'elevated'
      ? `
    shadow-color: ${theme.colors.text};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
    `
      : `
    border-width: 1px;
    border-color: ${theme.colors.border};
  `}
`;

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
}: CardProps) {
  return (
    <CardContainer
      variant={variant}
      padding={padding}
      testID="card"
      accessibilityRole="none"
    >
      {children}
    </CardContainer>
  );
}
