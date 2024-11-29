import { TextInput, TextInputProps, Platform } from 'react-native';
import styled from '@emotion/native';
import type { Theme } from '../../styles/theme';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
}

const Container = styled.View<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-vertical: ${({ theme }) => theme.spacing.xs}px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledTextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding: ${Platform.OS === 'ios' ? 15 : 10}px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  min-height: 48px;
`;

const ErrorInput = styled(StyledTextInput)`
  border-color: ${({ theme }) => theme.colors.error};
`;

const HelperText = styled.Text<{ isError: boolean }>`
  color: ${({ theme, isError }) =>
    isError ? theme.colors.error : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export function TextField({
  label,
  error,
  helper,
  fullWidth = false,
  ...props
}: TextFieldProps) {
  const InputComponent = error ? ErrorInput : StyledTextInput;
  
  return (
    <Container fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputComponent
        placeholderTextColor="#999"
        {...props}
        testID="text-field"
        accessibilityRole="text"
        accessibilityLabel={label}
        accessibilityHint={helper}
        accessibilityState={{ error: !!error }}
      />
      {(error || helper) && (
        <HelperText isError={!!error}>{error || helper}</HelperText>
      )}
    </Container>
  );
}
