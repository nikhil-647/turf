import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Text, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatInput } from '../../components/chat/ChatInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

export default function ChatWindowScreen() {
  const { userName } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! How can I help you today?',
      timestamp: '10:00 AM',
      isSent: false,
    },
    {
      id: '2',
      text: 'I need help with my booking.',
      timestamp: '10:01 AM',
      isSent: true,
    },
    {
      id: '3',
      text: 'Sure, I can help you with that. What seems to be the issue?',
      timestamp: '10:02 AM',
      isSent: false,
    },
  ]);

  const handleSend = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      isSent: true,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <StyledView 
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}
      >
        <StyledView className="flex-row items-center p-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <MaterialIcons name="arrow-back" size={28} color="#00BE76" />
          </TouchableOpacity>
          <StyledText className="flex-1 text-xl font-bold text-gray-800">
            {userName as string}
          </StyledText>
        </StyledView>
      </StyledView>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage
              message={item.text}
              timestamp={item.timestamp}
              isSent={item.isSent}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
          inverted={true}
          style={{ flex: 1, backgroundColor: '#f9fafb' }}
        />
        <StyledView 
          style={{ 
            paddingBottom: insets.bottom,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb'
          }}
        >
          <ChatInput onSend={handleSend} />
        </StyledView>
      </KeyboardAvoidingView>
    </View>
  );
} 