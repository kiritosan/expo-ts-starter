import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';
import { Screen } from '../components/layout/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BALL_SIZE = 40;
const SPRING_CONFIG = {
  damping: 10,
  stiffness: 100,
  mass: 1,
};

export default function GyroscopeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gyroscopeAvailable, setGyroscopeAvailable] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const insets = useSafeAreaInsets();
  
  // 计算实际可用的游戏区域
  const GAME_AREA = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - (insets.top + insets.bottom + 120), // 120是顶部分数和底部按钮的预估高度
    top: insets.top + 60, // 60是顶部分数的预估高度
  };

  // 计算游戏区域中心点
  const CENTER_POSITION = {
    x: GAME_AREA.width / 2 - BALL_SIZE / 2,
    y: GAME_AREA.top + (GAME_AREA.height / 2) - BALL_SIZE / 2
  };
  
  // 用于追踪上次碰撞时间，避免震动太频繁
  const lastCollisionTime = useRef(0);
  const COLLISION_COOLDOWN = 500; // 碰撞冷却时间（毫秒）

  // 使用 useSharedValue 来实现流畅的动画，初始位置设置在中心
  const x = useSharedValue(CENTER_POSITION.x);
  const y = useSharedValue(CENTER_POSITION.y);

  // 处理碰撞
  const handleCollision = () => {
    const now = Date.now();
    if (now - lastCollisionTime.current > COLLISION_COOLDOWN) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      lastCollisionTime.current = now;
    }
  };

  useEffect(() => {
    // 使用requestAnimationFrame确保在正确的渲染帧中设置位置
    requestAnimationFrame(() => {
      x.value = CENTER_POSITION.x;
      y.value = CENTER_POSITION.y;
    });

    checkGyroscopeAvailability();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      subscribe();
    } else {
      unsubscribe();
    }
  }, [isPlaying]);

  const checkGyroscopeAvailability = async () => {
    try {
      const available = await Gyroscope.isAvailableAsync();
      setGyroscopeAvailable(available);
      if (!available) {
        alert('您的设备不支持陀螺仪功能');
      }
    } catch (error) {
      alert('检查陀螺仪可用性时出错');
    }
  };


  const subscribe = () => {
    Gyroscope.setUpdateInterval(16);
    setSubscription(
      Gyroscope.addListener(({ x: gx, y: gy, z: gz }) => {
        // 只使用Z轴判断手机是否平放
        if (Math.abs(gz + 4.5) < 1.0) {
          x.value = withSpring(CENTER_POSITION.x, {
            damping: 15,
            stiffness: 50
          });
          y.value = withSpring(CENTER_POSITION.y, {
            damping: 15,
            stiffness: 50
          });
          return;
        }
  
        const sensitivity = 8;
        const newX = Math.max(0, Math.min(GAME_AREA.width - BALL_SIZE, x.value + (gy * sensitivity)));
        const newY = Math.max(GAME_AREA.top, Math.min(GAME_AREA.top + GAME_AREA.height - BALL_SIZE, y.value + (gx * sensitivity)));
  
        x.value = withSpring(newX, { damping: 12, stiffness: 80 });
        y.value = withSpring(newY, { damping: 12, stiffness: 80 });
      })
    );
  };

  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  const handleStartGame = async () => {
    if (!gyroscopeAvailable) {
      alert('陀螺仪在此设备上不可用');
      return;
    }
    
    // 重置游戏状态，将小球放回中心
    setScore(0);
    x.value = CENTER_POSITION.x;
    y.value = CENTER_POSITION.y;
    
    // 开始游戏
    setIsPlaying(true);
    
    // 震动反馈
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleStopGame = async () => {
    setIsPlaying(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value }
      ]
    };
  });

  if (!gyroscopeAvailable) {
    return (
      <Screen scrollable={false}>
        <Text style={styles.text}>正在检查陀螺仪...</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable={false}>
      <View style={styles.container}>
        <Text style={[styles.score, { marginTop: insets.top }]}>得分: {score}</Text>
        
        {/* 游戏区域 */}
        <View style={[styles.gameArea, { 
          height: GAME_AREA.height,
          marginTop: 10,
          position: 'relative'
        }]}>
          {/* 显示游戏边界 */}
          <View style={[styles.gameBorder, { 
            height: GAME_AREA.height,
            width: GAME_AREA.width,
          }]} />
          <Animated.View style={[styles.ball, animatedStyle]} />
        </View>

        {/* 控制按钮 */}
        <TouchableOpacity
          style={[styles.button, { marginBottom: insets.bottom + 20 }]}
          onPress={isPlaying ? handleStopGame : handleStartGame}
        >
          <Text style={styles.buttonText}>
            {isPlaying ? '停止游戏' : '开始游戏'}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBorder: {
    borderWidth: 2,
    borderColor: '#1976D2',
    borderRadius: 10,
    position: 'absolute',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#2196F3',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1976D2',
  },
});
