import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming
} from 'react-native-reanimated';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.2; // Reduced threshold to 20%

interface WeeklyCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  minDate: string;
  maxDate: string;
}

export default function WeeklyCalendar({ selectedDate, onDateSelect, minDate, maxDate }: WeeklyCalendarProps) {
  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });
  
  // Get the start of the week for the selected date
  const startOfWeek = dayjs(selectedDate).startOf('week');

  const canNavigate = (direction: 'next' | 'prev'): boolean => {
    const newDate = direction === 'next' 
      ? dayjs(selectedDate).add(7, 'day')
      : dayjs(selectedDate).subtract(7, 'day');
    
    return newDate.isSameOrAfter(dayjs(minDate), 'day') && 
           newDate.isSameOrBefore(dayjs(maxDate), 'day');
  };

  const handleWeekChange = (direction: 'next' | 'prev') => {
    if (!canNavigate(direction)) return;
    
    const newDate = direction === 'next' 
      ? dayjs(selectedDate).add(7, 'day').format('YYYY-MM-DD')
      : dayjs(selectedDate).subtract(7, 'day').format('YYYY-MM-DD');
    
    onDateSelect(newDate);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      const velocity = event.velocityX;
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD || 
                         Math.abs(velocity) > 500;

      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'prev' : 'next';
        
        // Animate to the edge before resetting
        translateX.value = withTiming(
          direction === 'prev' ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 150 },
          (finished) => {
            if (finished) {
              runOnJS(handleWeekChange)(direction);
              translateX.value = withTiming(0, { duration: 0 });
            }
          }
        );
      } else {
        // Spring back to center if swipe wasn't far enough
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  
  // Generate array of 7 days starting from startOfWeek
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day');
    const dateStr = date.format('YYYY-MM-DD');
    const isToday = date.isSame(dayjs(), 'day');
    const isSelected = dateStr === selectedDate;
    
    // Only disable if the date is outside the min/max range
    const isDisabled = !date.isSameOrAfter(minDate, 'day') || 
                      !date.isSameOrBefore(maxDate, 'day');

    return {
      date: dateStr,
      dayName: date.format('ddd'),
      dayNumber: date.format('D'),
      isToday,
      isSelected,
      isDisabled
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <AnimatedView style={[{ flex: 1 }, animatedStyle]}>
          <StyledView className="bg-white py-2">
            {/* Day names row */}
            <StyledView className="flex-row justify-around mb-2">
              {weekDays.map((day) => (
                <StyledView key={`header-${day.date}`} className="items-center w-10">
                  <StyledText 
                    className={`text-xs font-medium ${
                      day.isDisabled ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {day.dayName}
                  </StyledText>
                </StyledView>
              ))}
            </StyledView>

            {/* Days row */}
            <StyledView className="flex-row justify-around">
              {weekDays.map((day) => (
                <StyledTouchableOpacity
                  key={day.date}
                  onPress={() => !day.isDisabled && onDateSelect(day.date)}
                  disabled={day.isDisabled}
                  className={`items-center justify-center w-10 h-10 rounded-full ${
                    day.isSelected && !day.isDisabled
                      ? 'bg-[#00BE76]'
                      : 'bg-transparent'
                  }`}
                >
                  <StyledText
                    className={`text-base ${
                      day.isDisabled
                        ? 'text-gray-300'
                        : day.isSelected
                        ? 'text-white font-bold'
                        : day.isToday
                        ? 'text-[#00BE76] font-bold'
                        : 'text-gray-800'
                    }`}
                  >
                    {day.dayNumber}
                  </StyledText>
                  {day.isToday && !day.isSelected && (
                    <StyledView 
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00BE76]" 
                    />
                  )}
                </StyledTouchableOpacity>
              ))}
            </StyledView>
          </StyledView>
        </AnimatedView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
} 