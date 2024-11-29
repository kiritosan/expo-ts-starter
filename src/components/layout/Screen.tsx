import { ReactNode } from 'react';
import { ScrollView, StatusBar, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  padding?: boolean;
}

const Container = styled.View<{ padding: boolean }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentContainer = styled.View<{ padding: boolean }>`
  flex: 1;
  padding: ${({ padding, theme }) => (padding ? theme.spacing.md : 0)}px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export function Screen({ children, scrollable = true, padding = true }: ScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Container padding={padding}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {scrollable ? (
            <ScrollContainer
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <ContentContainer padding={padding}>
                {children}
              </ContentContainer>
            </ScrollContainer>
          ) : (
            <ContentContainer padding={padding}>
              {children}
            </ContentContainer>
          )}
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
}
