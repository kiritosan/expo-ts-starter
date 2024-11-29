import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { lightTheme, darkTheme } from './src/styles/theme';
import GyroscopeGame from './src/screens/GyroscopeGame';
import SplashScreen from './src/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import HabitDetailScreen from './src/screens/HabitDetailScreen';



const Stack = createNativeStackNavigator();


const queryClient = new QueryClient();

// export default function App() {
//   const colorScheme = useColorScheme();
//   const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <QueryClientProvider client={queryClient}>
//         <ThemeProvider theme={theme}>
//           <SafeAreaProvider>
//             <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
//             <GyroscopeGame />
//           </SafeAreaProvider>
//         </ThemeProvider>
//       </QueryClientProvider>
//     </GestureHandlerRootView>
//   );
// }

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                  headerShown: false,
                  animation: 'fade'
                }}
              >
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                />
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen
                  name="HabitDetail"
                  component={HabitDetailScreen}
                  options={{
                    animation: 'slide_from_bottom'
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}