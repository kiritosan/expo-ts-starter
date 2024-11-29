import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
  Home: undefined;
  HabitDetail: { habitName: string };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};


// 日历数据
const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const DATES = [12, 13, 14, 15, 16, 17, 18, 19, 20];

// MOE 角色组件
const MoeCharacter = () => (
  <Svg width={80} height={80} viewBox="0 0 100 100">
    <Path
      d="M50 90c22.1 0 40-17.9 40-40S72.1 10 50 10 10 27.9 10 50s17.9 40 40 40z"
      fill="#4CAF50"
    />
    <Path
      d="M35 45c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm38 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm-19 15c8.3 0 15-3.6 15-8h-30c0 4.4 6.7 8 15 8z"
      fill="#263238"
    />
  </Svg>
);

// 水杯组件
const WaterGlass = () => (
  <Svg width={60} height={60} viewBox="0 0 100 100">
    <Path
      d="M30 20h40v60c0 5.5-4.5 10-10 10H40c-5.5 0-10-4.5-10-10V20z"
      fill="#E3F2FD"
      stroke="#90CAF9"
      strokeWidth="4"
    />
    <Path
      d="M35 45c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm30 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm-15 10c5 0 9-2 9-4.5h-18c0 2.5 4 4.5 9 4.5z"
      fill="#90CAF9"
    />
  </Svg>
);


type HabitItemProps = {
  icon: string;
  title: string;
  status: 'new' | 'skip' | 'done';
  time: string;
  isLast?: boolean;
  onPress?: () => void;
};

// 习惯项组件
const HabitItem = ({ icon, title, status, time, isLast = false, onPress }: HabitItemProps) => (
  <TouchableOpacity
    style={[styles.habitItemContainer, !isLast && styles.habitItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.habitLeft}>
      <Text style={styles.habitIcon}>{icon}</Text>
      <Text style={[
        styles.habitTitle,
        status === 'done' && styles.habitTitleDone
      ]}>
        {title}
      </Text>
      {status === 'new' && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      {status === 'skip' && (
        <Text style={styles.skipText}>Skip</Text>
      )}
      {status === 'done' && (
        <Text style={styles.doneText}>Done</Text>
      )}
    </View>
    <Text style={styles.habitTime}>{time}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }: Props) {

  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const dates = useMemo(() => {
    const result = [];
    const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    for (let i = -4; i <= 4; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      result.push({
        date,
        dayName: daysOfWeek[date.getDay()]
      });
    }

    return result;
  }, [selectedDate]);

  // 添加习惯点击处理函数
  const handleHabitPress = (habitName: string) => {
    navigation.navigate('HabitDetail', { habitName });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.greeting}>Hey, George!</Text>

        {/* 日历条 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.calendar}
        >
          {dates.map(({ date, dayName }) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={date.toISOString()}
                style={styles.dateContainer}
                onPress={() => handleDateSelect(date)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.dayText,
                  isSelected && { color: '#4CAF50', fontWeight: 'bold' }
                ]}>{dayName}</Text>
                <View style={[
                  styles.dateCircle,
                  isSelected && { backgroundColor: '#4CAF50' }
                ]}>
                  <Text style={[
                    styles.dateText,
                    isSelected && { color: '#FFFFFF', fontWeight: 'bold' }
                  ]}>{date.getDate()}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 提示区域 */}
        <View style={styles.tipContainer}>
          <View style={styles.charactersContainer}>
            <MoeCharacter />
            <WaterGlass />
          </View>
          <View style={styles.tipBubble}>
            <Text style={styles.tipText}>
              START YOUR DAY WITH WATER. ONE GLASS WILL ENERGIZE YOU!
            </Text>
          </View>
        </View>

        {/* 习惯列表 */}
        <View style={styles.habitsList}>
          <HabitItem
            icon="🚶"
            title="Go for a walk"
            status="new"
            time="25 min"
            onPress={() => handleHabitPress('Go for a walk')}
          />
          <HabitItem
            icon="📚"
            title="Read fiction"
            status="skip"
            time="15 min"
            onPress={() => handleHabitPress('Read fiction')}  // Add this line
          />
          <HabitItem
            icon="🛏️"
            title="To inhabit the bed"
            status="done"
            time="1 time"
            isLast={true}
            onPress={() => handleHabitPress('To inhabit the bed')}  // Add this line
          />
        </View>
      </ScrollView>

      {/* 底部工具栏 */}
      <View style={[styles.toolbar, {
        paddingBottom: Math.max(insets.bottom + 15, 25) // 确保至少有25的底部间距
      }]}>
        <TouchableOpacity style={styles.newHabitButton}>
          <Text style={styles.newHabitText}>+ New habit</Text>
        </TouchableOpacity>
        <View style={styles.toolbarActions}>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarButtonText}>⏸️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  calendar: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  dateCircleActive: {
    backgroundColor: '#1A1A1A',
  },
  dateText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  tipContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  charactersContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tipBubble: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  tipText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  habitsList: {
    marginTop: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 15,
  },
  habitItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  habitItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  habitTitle: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  habitTitleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  habitTime: {
    fontSize: 14,
    color: '#666',
  },
  newBadge: {
    backgroundColor: '#FF4081',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  skipText: {
    color: '#2196F3',
    marginLeft: 10,
  },
  doneText: {
    color: '#4CAF50',
    marginLeft: 10,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  newHabitButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newHabitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolbarActions: {
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  toolbarButtonText: {
    fontSize: 24,
  },
});
