import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, { FadeIn } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// MOE 角色组件
const MoeCharacter = () => (
  <Svg width={120} height={120} viewBox="0 0 100 100">
    <Path
      d="M50 90c22.1 0 40-17.9 40-40S72.1 10 50 10 10 27.9 10 50s17.9 40 40 40z"
      fill="#4CAF50"
    />
    <Path
      d="M35 45c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm38 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm-19 10c8.3 0 15-3.6 15-8h-30c0 4.4 6.7 8 15 8z"
      fill="#263238"
    />
    {/* 添加手臂 */}
    <Path
      d="M20 50l-10 5M80 50l10 5"
      stroke="#263238"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// 装饰元素组件
const Decorations = () => (
  <View style={styles.decorations}>
    {/* 添加各种形状和颜色的装饰 */}
    {[...Array(15)].map((_, i) => (
      <View
        key={i}
        style={[
          styles.decoration,
          {
            top: Math.random() * 300,
            left: Math.random() * 300,
            backgroundColor: ['#FF4081', '#2196F3', '#FFD700'][i % 3],
            width: Math.random() * 15 + 5,
            height: Math.random() * 15 + 5,
            borderRadius: Math.random() > 0.5 ? 50 : 3,
            transform: [{ rotate: `${Math.random() * 360}deg` }],
          },
        ]}
      />
    ))}
  </View>
);

type RootStackParamList = {
  Home: undefined;
  HabitDetail: { habitName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'HabitDetail'>;

export default function HabitDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const habitName = route.params?.habitName || 'Go for a walk';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 顶部标题和关闭按钮 */}
      <View style={styles.header}>
        <Text style={styles.title}>{habitName}</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* 主要内容区域 */}
      <View style={styles.content}>
        <Decorations />
        
        <Animated.View 
          entering={FadeIn.duration(1000)}
          style={styles.characterContainer}
        >
          <MoeCharacter />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>GOOD JOB!</Text>
          </View>
        </Animated.View>

        {/* 时间显示 */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>👤 20:30</Text>
        </View>

        {/* 提示部分 */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Helpful tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🍶</Text>
            <Text style={styles.tipText}>Bring a water bottle with you</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>ℹ️</Text>
            <Text style={styles.tipText}>If you start to feel tired, take a break</Text>
          </View>
        </View>

        {/* 完成按钮 */}
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={() => {
            // TODO: 处理完成逻辑
            navigation.goBack();
          }}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 28,
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decoration: {
    position: 'absolute',
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  speechBubble: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  speechText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  timeContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 40,
  },
  timeText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  tipsContainer: {
    width: '100%',
    marginTop: 30,
  },
  tipsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
