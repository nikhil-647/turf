import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Adjust the sorting logic to ensure correct AM/PM order
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const time = dayjs().startOf('day').add(i, 'hour');
  return {
    time: time.format('h:mm A'),
    range: `${time.format('h')} to ${time.add(1, 'hour').format('h A')}`
  };
}).sort((a, b) => {
  const timeA = dayjs(a.time, 'h:mm A');
  const timeB = dayjs(b.time, 'h:mm A');
  return timeA.hour() - timeB.hour() || timeA.minute() - timeB.minute();
});

const getTimePeriodInfo = (time: string) => {
  console.log('Checking time:', time); // Log the time being checked
  const parsedTime = dayjs(time, 'h:mm A'); // Parse the time
  const hour = parsedTime.isValid() ? parsedTime.hour() : NaN; // Check if parsing is valid
  console.log('Interpreted hour:', hour); // Log the interpreted hour
  const periodInfo = hour >= 6 && hour < 18
    ? { icon: 'sunny' as const, label: 'Day Time', color: '#FF9800' }
    : { icon: 'nightlight' as const, label: 'Night Time', color: '#1A237E' };
  console.log('Period Info:', periodInfo); // Log the period info
  return periodInfo;
};

// Log the generated time slots
console.log('Generated TIME_SLOTS:', TIME_SLOTS);

type SlotStatus = 'available' | 'booked' | 'selected';

interface TimeSlot {
  time: string;
  range: string;
  price: number;
  status: SlotStatus;
}

export default function FullBookingScreen() {
  const today = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    TIME_SLOTS.map(({ time, range }) => ({
      time,
      range,
      price: 900,
      status: Math.random() > 0.5 ? 'available' : 'booked'
    }))
  );

  const getSlotStatusColor = (status: SlotStatus) => {
    switch (status) {
      case 'available':
        return 'bg-white';
      case 'booked':
        return 'bg-red-100';
      case 'selected':
        return 'bg-green-100';
      default:
        return 'bg-white';
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Here you would typically fetch availability for the selected date
    setTimeSlots(TIME_SLOTS.map(({ time, range }) => ({
      time,
      range,
      price: 900,
      status: Math.random() > 0.5 ? 'available' : 'booked'
    })));
  };

  const handleSlotSelect = (index: number) => {
    if (timeSlots[index].status === 'booked') return;
    
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].status = 
      newTimeSlots[index].status === 'selected' ? 'available' : 'selected';
    setTimeSlots(newTimeSlots);
  };

  // Calculate the start and end of the current week
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const endOfWeek = dayjs(selectedDate).endOf('week');

  // Generate marked dates for the current week
  const markedDates = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
    return date;
  }).reduce((acc, date) => {
    acc[date] = {
      textColor: date === selectedDate ? 'white' : date === today ? '#00BE76' : 'black',
      selected: date === selectedDate,
      selectedColor: '#00BE76',
      marked: date === today && date !== selectedDate,
      dotColor: '#00BE76'
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <StyledScrollView className="flex-1 bg-gray-50">
      {/* Header with date and navigation */}
      <StyledView className="p-4 bg-white border-b border-gray-200">
        <StyledView className="flex-row justify-between items-center">
          <StyledText className="text-xl font-bold text-gray-800">
            Full Booking
          </StyledText>
          <StyledView className="flex-row space-x-4">
            <TouchableOpacity 
              onPress={() => handleDateSelect(dayjs(selectedDate).subtract(7, 'day').format('YYYY-MM-DD'))}
            >
              <MaterialIcons name="chevron-left" size={24} color="#00BE76" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleDateSelect(dayjs(selectedDate).add(7, 'day').format('YYYY-MM-DD'))}
            >
              <MaterialIcons name="chevron-right" size={24} color="#00BE76" />
            </TouchableOpacity>
          </StyledView>
        </StyledView>
        {selectedDate && (
          <StyledText className="text-gray-600 mt-2">
            {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
          </StyledText>
        )}
      </StyledView>

      {/* Weekly Calendar */}
      <CalendarProvider date={selectedDate}>
        <WeekCalendar
          current={selectedDate}
          onDayPress={day => handleDateSelect(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#00BE76',
            selectedDayBackgroundColor: '#00BE76',
            arrowColor: '#00BE76',
          }}
          minDate={today}
          firstDay={1}
          hideDayNames={false}
        />
      </CalendarProvider>
      {/* Time slots */}
      {selectedDate && (
        <StyledView className="p-4">
          <StyledView className="flex-row flex-wrap justify-between">
            {timeSlots.map((slot, index) => {
              const periodInfo = getTimePeriodInfo(slot.time);
              return (
                <StyledTouchableOpacity
                  key={index}
                  onPress={() => handleSlotSelect(index)}
                  className={`relative w-[48%] mb-4 p-4 rounded-lg border border-gray-200 ${getSlotStatusColor(slot.status)}`}
                  disabled={slot.status === 'booked'}
                >
                  {/* Period icon */}
                  <MaterialIcons
                    name={periodInfo.icon}
                    size={24}
                    color={periodInfo.color}
                    style={{ position: 'absolute', top: 8, right: 8 }}
                  />
                  <StyledText className="text-base font-medium text-gray-800 mb-1">
                    {slot.range}
                  </StyledText>
                  <StyledText className="text-sm text-gray-600">
                    ₹{slot.price}
                  </StyledText>
                </StyledTouchableOpacity>
              );
            })}
          </StyledView>
        </StyledView>
      )}
    </StyledScrollView>
  );
} 