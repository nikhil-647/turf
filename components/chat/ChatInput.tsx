import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <StyledView className="border-t border-gray-200 px-4 py-2 bg-white">
      <StyledView className="flex-row items-end space-x-2">
        <StyledTextInput
          className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 text-base min-h-[40px] max-h-[120px]"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
          style={{
            paddingTop: Platform.OS === 'ios' ? 8 : 4,
            paddingBottom: Platform.OS === 'ios' ? 8 : 4,
          }}
          textAlignVertical="center"
        />
        <StyledTouchableOpacity
          onPress={handleSend}
          className={`rounded-full p-2 h-10 w-10 items-center justify-center ${
            message.trim() ? 'bg-primary' : 'bg-gray-300'
          }`}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={colors.white}
          />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}; 