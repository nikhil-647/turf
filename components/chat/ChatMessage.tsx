import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isSent: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, timestamp, isSent }) => {
  return (
    <StyledView
      className={`mb-4 max-w-[80%] ${
        isSent ? 'self-end' : 'self-start'
      }`}
    >
      <StyledView
        className={`rounded-2xl px-4 py-3 ${
          isSent
            ? 'bg-[#00BE76] rounded-tr-none'
            : 'bg-gray-200 rounded-tl-none'
        }`}
      >
        <StyledText
          className={`text-base ${
            isSent ? 'text-white' : 'text-gray-800'
          }`}
        >
          {message}
        </StyledText>
      </StyledView>
      <StyledText className="text-xs text-gray-500 mt-1 px-2">
        {timestamp}
      </StyledText>
    </StyledView>
  );
}; 