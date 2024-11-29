import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';



const { width, height } = Dimensions.get('window');

const MoeCharacter = () => (
  <Svg width={200} height={200} viewBox="0 0 100 100">
    {/* 绿色圆形身体 */}
    <Path
      d="M50 90c22.1 0 40-17.9 40-40S72.1 10 50 10 10 27.9 10 50s17.9 40 40 40z"
      fill="#4CAF50"
    />
    {/* 笑脸 */}
    <Path
      d="M35 45c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm38 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm-19 20c8.3 0 15-3.6 15-8h-30c0 4.4 6.7 8 15 8z"
      fill="#263238"
    />
  </Svg>
);

const SpeechBubble = () => (
  <View style={styles.speechBubbleContainer}>
    <View style={styles.speechBubble}>
      <Text style={styles.speechText}>IT'S MORE FUN TOGETHER!</Text>
    </View>
    <View style={styles.speechTriangle} />
  </View>
);

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    // 3秒后自动跳转到主界面
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={handleSkip}
      activeOpacity={1}
    >
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Animated.View
          entering={FadeIn.duration(1000)}
          style={styles.contentContainer}
        >
          <View style={styles.textContainer}>
            <Text style={styles.goForText}>GO FOR</Text>
            <Text style={styles.habitsText}>BETTER{'\n'}HABITS</Text>
            <View style={styles.withContainer}>
              <Text style={styles.withText}>WITH</Text>
              <Text style={styles.moeText}>MOE</Text>
              <View style={styles.underline} />
            </View>
          </View>

          <View style={styles.characterContainer}>
            <MoeCharacter />
            <SpeechBubble />
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  textContainer: {
    alignItems: 'center',
  },
  goForText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  habitsText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  withContainer: {
    alignItems: 'center',
  },
  withText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  moeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    marginTop: 8,
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -60,
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  speechText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  speechTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    transform: [{ translateY: -1 }],
  },
});
