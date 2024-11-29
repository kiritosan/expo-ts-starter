import { useState } from 'react';
import { Keyboard } from 'react-native';
import styled from '@emotion/native';
import { Screen } from '../components/layout/Screen';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { TextField } from '../components/forms/TextField';

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export function ExampleScreen() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    Keyboard.dismiss();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Hello, ${name}!`);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setName('');
    setError('');
  };

  const handleChangeText = (text: string) => {
    setName(text);
    if (error) setError('');
  };

  return (
    <Screen scrollable={false}>
      <Title>Welcome to Expo TypeScript</Title>
      <Subtitle>
        This is an example screen showcasing our themed components
      </Subtitle>

      <Card>
        <TextField
          label="Name"
          value={name}
          onChangeText={handleChangeText}
          placeholder="Enter your name"
          helper={error ? undefined : "Type your name and press 'Submit'"}
          error={error}
          fullWidth
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          blurOnSubmit
        />

        <ButtonContainer>
          <Button
            label="Submit"
            onPress={handleSubmit}
            isLoading={isLoading}
            disabled={!name.trim()}
          />
          <Button
            label="Clear"
            variant="outline"
            onPress={handleClear}
            disabled={!name.trim() && !error}
          />
        </ButtonContainer>
      </Card>

      <Card variant="outlined" padding="lg">
        <Title>Component Variants</Title>
        <ButtonContainer>
          <Button label="Primary" variant="primary" size="small" />
          <Button label="Secondary" variant="secondary" size="medium" />
          <Button label="Outline" variant="outline" size="large" />
        </ButtonContainer>
      </Card>
    </Screen>
  );
}
