import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatListItem } from '../../components/chat/ChatListItem';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useFocusEffect } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ChatPreview {
  id: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatarUrl?: string;
}

// Simulated chat data - in a real app, this would come from a backend or storage
const initialChats: ChatPreview[] = [
  {
    id: '1',
    userName: 'Support Team',
    lastMessage: 'How can we help you today?',
    timestamp: '10:30 AM',
    unreadCount: 1,
    avatarUrl: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    userName: 'Booking Assistant',
    lastMessage: 'Your court is confirmed for tomorrow',
    timestamp: '9:45 AM',
    unreadCount: 0,
    avatarUrl: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    userName: 'Sports Club',
    lastMessage: 'New facilities available for booking!',
    timestamp: 'Yesterday',
    unreadCount: 2,
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    userName: 'Facility Updates',
    lastMessage: 'Pool maintenance scheduled for next week',
    timestamp: 'Yesterday',
    unreadCount: 0,
    avatarUrl: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    userName: 'Booking Notifications',
    lastMessage: 'Upcoming pool session reminder',
    timestamp: 'Wed',
    unreadCount: 1,
  }
];

export default function ChatScreen() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading chats from storage/backend
  const loadChats = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      setChats(initialChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadData = async () => {
        if (isActive) {
          await loadChats();
        }
      };
      loadData();
      return () => {
        isActive = false;
        // Reset state when screen loses focus
        setChats([]);
        setIsLoading(true);
      };
    }, [loadChats])
  );

  return (
    <StyledView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: true }} />
      <StyledView className="bg-white px-4 py-4 border-b border-gray-100">
        <StyledText className="text-xl font-semibold text-gray-900">
          Messages
        </StyledText>
      </StyledView>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            id={item.id}
            userName={item.userName}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
            unreadCount={item.unreadCount}
            avatarUrl={item.avatarUrl}
          />
        )}
        className="bg-white"
      />
    </StyledView>
  );
} 