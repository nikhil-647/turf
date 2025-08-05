import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { CreatePlayerRequestModal } from '../../components/chat/CreatePlayerRequestModal';
import { colors } from '../../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Types for our messages
interface TeamRequest {
  id: string;
  message: string;
  timestamp: string;
  sport: 'football' | 'cricket';
  playersNeeded: number;
  joinedPlayers: string[];
  author: string;
}

export default function GlobalChatScreen() {
  const [messages, setMessages] = useState<TeamRequest[]>([
    {
      id: '1',
      message: "Need 5 players for football this Wednesday at 6 PM - Andheri Sports Complex",
      timestamp: new Date().toLocaleString(),
      sport: 'football',
      playersNeeded: 5,
      joinedPlayers: ['Player1'],
      author: 'Anonymous1'
    },
    {
      id: '2',
      message: "Looking for 3 players for cricket practice session this weekend",
      timestamp: new Date().toLocaleString(),
      sport: 'cricket',
      playersNeeded: 3,
      joinedPlayers: ['Player2', 'Player3'],
      author: 'Anonymous2'
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSend = (message: string) => {
    const newMessage: TeamRequest = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleString(),
      sport: message.toLowerCase().includes('cricket') ? 'cricket' : 'football',
      playersNeeded: 5, // Default value
      joinedPlayers: [],
      author: `Anonymous${Math.floor(Math.random() * 1000)}`
    };
    setMessages([newMessage, ...messages]);
  };

  const handleJoinTeam = (messageId: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId && msg.joinedPlayers.length < msg.playersNeeded) {
        return {
          ...msg,
          joinedPlayers: [...msg.joinedPlayers, `Player${Math.floor(Math.random() * 1000)}`]
        };
      }
      return msg;
    }));
  };

  const renderMessage = ({ item }: { item: TeamRequest }) => {
    const spotsLeft = item.playersNeeded - item.joinedPlayers.length;
    
    return (
      <StyledView className="mb-4 mx-4">
        <StyledView className="bg-white rounded-lg p-4 shadow-sm">
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledView className="flex-row items-center">
              <MaterialIcons 
                name={item.sport === 'football' ? 'sports-soccer' : 'sports-cricket'} 
                size={24} 
                color={colors.primary} 
              />
              <StyledText className="ml-2 font-semibold text-gray-900">
                {item.author}
              </StyledText>
            </StyledView>
            <StyledText className="text-xs text-gray-500">
              {item.timestamp}
            </StyledText>
          </StyledView>
          
          <StyledText className="text-gray-800 mb-2">
            {item.message}
          </StyledText>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledView>
              <StyledText className="text-sm text-gray-600">
                {spotsLeft > 0 
                  ? `${spotsLeft} spots left` 
                  : 'Team full!'
                }
              </StyledText>
              <StyledText className="text-xs text-gray-500">
                {item.joinedPlayers.length} players joined
              </StyledText>
            </StyledView>
            
            {spotsLeft > 0 && (
              <StyledTouchableOpacity
                onPress={() => handleJoinTeam(item.id)}
                className="bg-primary px-4 py-2 rounded-full"
              >
                <StyledText className="text-white font-medium">
                  Join Team
                </StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    );
  };

  return (
    <StyledView className="flex-1 bg-gray-50">
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        className="flex-1"
        inverted
      />
      
      {/* Floating Action Button */}
      <StyledTouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <MaterialIcons name="add" size={30} color={colors.white} />
      </StyledTouchableOpacity>

      <CreatePlayerRequestModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSend}
      />
    </StyledView>
  );
} 