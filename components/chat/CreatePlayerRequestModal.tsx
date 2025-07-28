import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledPressable = styled(Pressable);

interface CreatePlayerRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export const CreatePlayerRequestModal: React.FC<CreatePlayerRequestModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [sport, setSport] = useState<'football' | 'cricket'>('football');
  const [playersNeeded, setPlayersNeeded] = useState('5');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(() => {
    const now = new Date();
    // Round to nearest 30 minutes
    const minutes = Math.round(now.getMinutes() / 30) * 30;
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  });
  const [showPicker, setShowPicker] = useState<'date' | 'time' | null>(null);
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(() => {
    const now = new Date();
    // Round to nearest 30 minutes
    const minutes = Math.round(now.getMinutes() / 30) * 30;
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  });
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = () => {
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const message = `Need ${playersNeeded} players for ${sport} on ${formattedDate} at ${formattedTime}${
      additionalInfo ? `. ${additionalInfo}` : ''
    }`;
    onSubmit(message);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSport('football');
    setPlayersNeeded('5');
    setDate(new Date());
    setTime(new Date());
    setTempDate(new Date());
    setTempTime(new Date());
    setAdditionalInfo('');
    setShowPicker(null);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(null);
      if (selectedDate) {
        setDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(null);
      if (selectedTime) {
        const newTime = new Date(selectedTime);
        // Preserve only time part
        newTime.setFullYear(date.getFullYear());
        newTime.setMonth(date.getMonth());
        newTime.setDate(date.getDate());
        setTime(newTime);
      }
    } else {
      if (selectedTime) {
        const newTime = new Date(selectedTime);
        // Preserve only time part
        newTime.setFullYear(tempDate.getFullYear());
        newTime.setMonth(tempDate.getMonth());
        newTime.setDate(tempDate.getDate());
        setTempTime(newTime);
      }
    }
  };

  const handleCancel = () => {
    setShowPicker(null);
    setTempDate(date);
    setTempTime(time);
  };

  const handleDone = () => {
    if (showPicker === 'date') {
      setDate(tempDate);
    } else if (showPicker === 'time') {
      setTime(tempTime);
    }
    setShowPicker(null);
  };

  const SportButton = ({ type, sportIcon }: { type: 'football' | 'cricket'; sportIcon: 'sports-soccer' | 'sports-cricket' }) => (
    <StyledTouchableOpacity
      onPress={() => setSport(type)}
      className={`flex-1 flex-row items-center justify-center p-4 rounded-lg mr-2 ${
        sport === type ? 'bg-[#00BE76]' : 'bg-gray-100'
      }`}
    >
      <MaterialIcons
        name={sportIcon}
        size={24}
        color={sport === type ? 'white' : '#6B7280'}
      />
      <StyledText
        className={`ml-2 font-medium ${
          sport === type ? 'text-white' : 'text-gray-600'
        }`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </StyledText>
    </StyledTouchableOpacity>
  );

  const DateTimeField = ({ 
    mode, 
    value, 
    onChange 
  }: { 
    mode: 'date' | 'time';
    value: Date;
    onChange: (event: any, date?: Date) => void;
  }) => {
    const isIOS = Platform.OS === 'ios';
    const tempValue = mode === 'date' ? tempDate : tempTime;
    
    return (
      <StyledView className="mb-6">
        <StyledText className="text-sm font-medium text-gray-700 mb-2">
          {mode === 'date' ? 'Date' : 'Time'}
        </StyledText>
        <StyledPressable
          onPress={() => {
            if (!isIOS) {
              setShowPicker(mode);
            } else {
              setTempDate(date);
              setTempTime(time);
              setShowPicker(mode);
            }
          }}
          className="w-full flex-row items-center bg-gray-100 px-4 py-3.5 rounded-lg"
        >
          <MaterialIcons
            name={mode === 'date' ? 'event' : 'access-time'}
            size={24}
            color="#4B5563"
            style={{ marginRight: 12 }}
          />
          <StyledText className="text-base text-gray-900 flex-1">
            {mode === 'date' 
              ? value.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : value.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
            }
          </StyledText>
          {!isIOS && <MaterialIcons name="arrow-drop-down" size={24} color="#4B5563" />}
        </StyledPressable>

        {isIOS && showPicker === mode ? (
          <StyledView className="w-full mt-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <StyledView className="flex-row justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
              <StyledTouchableOpacity onPress={handleCancel}>
                <StyledText className="text-[#00BE76] font-medium">Cancel</StyledText>
              </StyledTouchableOpacity>
              <StyledText className="text-base font-medium text-gray-900">
                Select {mode === 'date' ? 'Date' : 'Time'}
              </StyledText>
              <StyledTouchableOpacity onPress={handleDone}>
                <StyledText className="text-[#00BE76] font-medium">Done</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <DateTimePicker
              value={tempValue}
              mode={mode}
              is24Hour={false}
              display="spinner"
              onChange={onChange}
              minimumDate={mode === 'date' ? new Date() : undefined}
              textColor="#000000"
              style={{ 
                height: 200,
                backgroundColor: 'white',
                width: '100%'
              }}
            />
          </StyledView>
        ) : !isIOS && showPicker === mode ? (
          <DateTimePicker
            value={value}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
            minimumDate={mode === 'date' ? new Date() : undefined}
          />
        ) : null}
      </StyledView>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 bg-black/50 justify-end">
        <StyledView className="bg-white rounded-t-3xl">
          <StyledView className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <StyledText className="text-xl font-semibold text-gray-900">
              Create Player Request
            </StyledText>
            <StyledTouchableOpacity 
              onPress={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <MaterialIcons name="close" size={24} color="#6B7280" />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledScrollView className="max-h-[70%]">
            <StyledView className="p-4">
              <StyledView className="mb-6">
                <StyledText className="text-sm font-medium text-gray-700 mb-2">
                  Sport
                </StyledText>
                <StyledView className="flex-row">
                  <SportButton type="football" sportIcon="sports-soccer" />
                  <SportButton type="cricket" sportIcon="sports-cricket" />
                </StyledView>
              </StyledView>

              <StyledView className="mb-6">
                <StyledText className="text-sm font-medium text-gray-700 mb-2">
                  Players Needed
                </StyledText>
                <StyledView className="flex-row items-center bg-gray-100 px-4 py-3.5 rounded-lg">
                  <MaterialIcons name="group" size={24} color="#4B5563" style={{ marginRight: 12 }} />
                  <StyledTextInput
                    className="flex-1 text-base text-gray-900 p-0 m-0"
                    value={playersNeeded}
                    onChangeText={setPlayersNeeded}
                    keyboardType="number-pad"
                    placeholder="Number of players"
                  />
                </StyledView>
              </StyledView>

              <DateTimeField mode="date" value={date} onChange={handleDateChange} />
              <DateTimeField mode="time" value={time} onChange={handleTimeChange} />

              <StyledView className="mb-6">
                <StyledText className="text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </StyledText>
                <StyledView className="bg-gray-100 rounded-lg p-2">
                  <StyledTextInput
                    className="text-base text-gray-900 p-2"
                    value={additionalInfo}
                    onChangeText={setAdditionalInfo}
                    placeholder="Any additional details"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </StyledView>
              </StyledView>
            </StyledView>
          </StyledScrollView>

          <StyledView className="p-4 border-t border-gray-200">
            <StyledTouchableOpacity
              onPress={handleSubmit}
              className="bg-[#00BE76] p-4 rounded-lg flex-row items-center justify-center"
            >
              <MaterialIcons name="send" size={24} color="white" style={{ marginRight: 8 }} />
              <StyledText className="text-white text-center font-semibold text-base">
                Post Player Request
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}; 