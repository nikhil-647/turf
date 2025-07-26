import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { router } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

interface ChatListItemProps {
  id: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatarUrl?: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  userName,
  lastMessage,
  timestamp,
  unreadCount = 0,
  avatarUrl,
}) => {
  const handlePress = () => {
    // Use push so user can easily navigate back without unexpected history issues
    router.push(`/chat/${userName}`);
  };

  return (
    <StyledTouchableOpacity
      onPress={handlePress}
      className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100"
    >
      <StyledView className="h-12 w-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
        {avatarUrl ? (
          <StyledImage
            source={{ uri: avatarUrl }}
            className="h-full w-full"
          />
        ) : (
          <StyledView className="h-full w-full bg-[#00BE76] items-center justify-center">
            <StyledText className="text-white text-lg font-semibold">
              {userName.charAt(0).toUpperCase()}
            </StyledText>
          </StyledView>
        )}
      </StyledView>

      <StyledView className="flex-1">
        <StyledView className="flex-row justify-between items-center mb-1">
          <StyledText className="font-semibold text-gray-900">
            {userName}
          </StyledText>
          <StyledText className="text-xs text-gray-500">
            {timestamp}
          </StyledText>
        </StyledView>

        <StyledView className="flex-row justify-between items-center">
          <StyledText
            numberOfLines={1}
            className="text-sm text-gray-600 flex-1 mr-2"
          >
            {lastMessage}
          </StyledText>
          {unreadCount > 0 && (
            <StyledView className="bg-[#00BE76] rounded-full min-w-[20px] h-5 items-center justify-center px-1">
              <StyledText className="text-xs text-white font-medium">
                {unreadCount}
              </StyledText>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
}; 