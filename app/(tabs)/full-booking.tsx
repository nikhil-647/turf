import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import WeeklyCalendar from '../../components/WeeklyCalendar';
import { colors } from '../../constants/colors';

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
    // Display as `3 AM to 4 AM` instead of `3 to 4AM`
    range: `${time.format('h A')} to ${time.add(1, 'hour').format('h A')}`
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

interface SlotWithDate extends TimeSlot {
  date: string; // YYYY-MM-DD
}

// Mock: fetch slot data for a given date from DB (replace with real API call)
const fetchTimeSlotsFromDB = async (date: string): Promise<TimeSlot[]> => {
  // TODO: Integrate your real backend logic here
  return TIME_SLOTS.map(({ time, range }) => ({
    time,
    range,
    price: 900,
    status: 'available'
  }));
};

export default function FullBookingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const today = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlotsGlobal, setSelectedSlotsGlobal] = useState<SlotWithDate[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // Fetch slots whenever the selected date or selections change (to maintain selected indications)
  useEffect(() => {
    fetchTimeSlotsFromDB(selectedDate).then(slots => {
      const updated = slots.map(slot => {
        const isSel = selectedSlotsGlobal.some(sel => sel.date === selectedDate && sel.time === slot.time);
        return { ...slot, status: isSel ? 'selected' : slot.status };
      });
      setTimeSlots(updated);
    });
  }, [selectedDate, selectedSlotsGlobal]);

  const totalPrice = selectedSlotsGlobal.reduce((sum, slot) => sum + slot.price, 0);

  // Helper: ensure chosen date stays within allowed range
  const isDateWithinRange = (date: string) => {
    const d = dayjs(date);
    return (
      d.isSame(dayjs(today), 'day') ||
      d.isSame(dayjs(maxDate), 'day') ||
      (d.isAfter(dayjs(today), 'day') && d.isBefore(dayjs(maxDate), 'day'))
    );
  };

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
    // Prevent selecting dates outside the allowed range
    if (!isDateWithinRange(date)) {
      return;
    }

    setSelectedDate(date);
  };

  const handleSlotSelect = (index: number) => {
    if (timeSlots[index].status === 'booked') return;
    
    const currentSlot = timeSlots[index];
    const newTimeSlots = [...timeSlots];

    // Check if this is one of the last two slots (10 PM to 12 AM)
    const isLateNightSlot = currentSlot.time.includes('10:00 PM') || currentSlot.time.includes('11:00 PM');

    if (currentSlot.status === 'selected') {
      // Deselect
      newTimeSlots[index].status = 'available';
      setTimeSlots(newTimeSlots);
      setSelectedSlotsGlobal(prev => prev.filter(sel => !(sel.date === selectedDate && sel.time === currentSlot.time)));
    } else {
      // Select
      newTimeSlots[index].status = 'selected';
      setTimeSlots(newTimeSlots);
      setSelectedSlotsGlobal(prev => [...prev, { ...currentSlot, status: 'selected', date: selectedDate }]);

      // If it's a late night slot, scroll to the bottom
      if (isLateNightSlot) {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }
  };

  // Calculate the start and end of the current week
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const endOfWeek = dayjs(selectedDate).endOf('week');

  // Generate marked dates for the current week
  const markedDates = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
    const isNextMonth = dayjs(date).month() > dayjs(selectedDate).month();
    const isDisabled = !isDateWithinRange(date) || isNextMonth;
    
    return date;
  }).reduce((acc, date) => {
    const isNextMonth = dayjs(date).month() > dayjs(selectedDate).month();
    const isDisabled = !isDateWithinRange(date) || isNextMonth;
    
    acc[date] = {
      textColor: isDisabled ? '#CCCCCC' : 
                date === selectedDate ? 'white' : 
                date === today ? colors.primary : 'black',
      selected: date === selectedDate && !isDisabled,
      selectedColor: colors.primary,
      marked: date === today && date !== selectedDate,
      dotColor: colors.primary,
      disabled: isDisabled
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <>
      <StyledScrollView
        ref={scrollViewRef}
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: selectedSlotsGlobal.length > 0 ? 140 : 20 }}>
        {/* Header with date and navigation */}
        <StyledView className="p-4 bg-white border-b border-gray-200">
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-xl font-bold text-gray-800">
              Full Booking
            </StyledText>
            <StyledView className="flex-row space-x-4">
              <TouchableOpacity 
                onPress={() => handleDateSelect(dayjs(selectedDate).subtract(7, 'day').format('YYYY-MM-DD'))}
                disabled={!isDateWithinRange(dayjs(selectedDate).subtract(7, 'day').format('YYYY-MM-DD'))}
              >
                <MaterialIcons 
                  name="chevron-left" 
                  size={28} 
                  color={isDateWithinRange(dayjs(selectedDate).subtract(7, 'day').format('YYYY-MM-DD')) ? colors.primary : '#CCCCCC'} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDateSelect(dayjs(selectedDate).add(7, 'day').format('YYYY-MM-DD'))}
                disabled={!isDateWithinRange(dayjs(selectedDate).add(7, 'day').format('YYYY-MM-DD'))}
              >
                <MaterialIcons 
                  name="chevron-right" 
                  size={28} 
                  color={isDateWithinRange(dayjs(selectedDate).add(7, 'day').format('YYYY-MM-DD')) ? colors.primary : '#CCCCCC'} 
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>
          {selectedDate && (
            <StyledView className="flex-row justify-between items-center mt-4">
              <StyledText className="text-gray-600 font-bold">
                {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
              </StyledText>
              <StyledView className="flex-row items-center space-x-4">
                <StyledText className="text-gray-500 text-sm">
                  Available until {dayjs(maxDate).format('MMM D')}
                </StyledText>
                <StyledTouchableOpacity onPress={() => handleDateSelect(today)}>
                  <StyledText className="text-primary font-medium">Today</StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </StyledView>
          )}
        </StyledView>

        {/* Weekly Calendar */}
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          minDate={today}
          maxDate={maxDate}
        />

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

      {/* Bottom fixed action bar & Summary */}
      {selectedSlotsGlobal.length > 0 && (
        <>
          {/* Summary Modal */}
          <Modal
            visible={showSummary}
            animationType="slide"
            transparent
            onRequestClose={() => setShowSummary(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowSummary(false)}>
              <StyledView className="flex-1 justify-end bg-black/50">
                <TouchableWithoutFeedback onPress={() => { /* prevent close when tapping inside */ }}>
                  <StyledView className="bg-white p-6 rounded-t-xl max-h-[70%]">
                    <StyledText className="text-lg font-bold mb-4">Selected Slots</StyledText>
                    <StyledScrollView className="max-h-[40vh]">
                      {selectedSlotsGlobal.map((slot, idx) => (
                        <StyledView key={idx} className="flex-row justify-between items-center mb-2 p-3 rounded-lg bg-gray-100">
                          <StyledText className="text-sm font-medium text-gray-700">
                            {dayjs(slot.date).format('DD MMM')} • {slot.range}
                          </StyledText>
                          <StyledText className="text-sm font-medium text-gray-800">
                            ₹{slot.price}
                          </StyledText>
                        </StyledView>
                      ))}
                    </StyledScrollView>
                    <StyledView className="mt-4 flex-row justify-end border-t border-gray-200 pt-3">
                      <StyledText className="text-base font-bold">Total: ₹{totalPrice}</StyledText>
                    </StyledView>

                    {/* Proceed button */}
                    <StyledTouchableOpacity
                      onPress={() => {
                        setShowSummary(false);
                        router.push({
                          pathname: '/booking-summary',
                          params: {
                            slots: JSON.stringify(selectedSlotsGlobal),
                            total: String(totalPrice)
                          }
                        });
                      }}
                      className="mt-4 bg-primary py-3 rounded-lg items-center"
                    >
                      <StyledText className="text-white font-bold text-base">
                        Proceed
                      </StyledText>
                    </StyledTouchableOpacity>
                  </StyledView>
                </TouchableWithoutFeedback>
              </StyledView>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Action Bar */}
          <StyledView className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setShowSummary(prev => !prev)} className="items-center">
              <MaterialIcons
                name={showSummary ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                size={32}
                color={colors.primary}
              />
              <StyledText className="text-xs text-gray-700">Selected Slots</StyledText>
            </TouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => router.push({
                pathname: '/booking-summary',
                params: {
                  slots: JSON.stringify(selectedSlotsGlobal),
                  total: String(totalPrice)
                }
              })}
              className="bg-primary px-6 py-3 rounded-lg"
            >
              <StyledText className="text-white font-bold text-base">Proceed</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </>
      )}
    </>
  );
} 