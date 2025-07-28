import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import WeeklyCalendar from '../../components/WeeklyCalendar';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Mock data for open challenges with more details
const MOCK_CHALLENGES = [
  {
    id: 1,
    sport: 'cricket',
    teamName: 'Thunder Strikers',
    date: dayjs().format('YYYY-MM-DD'),
    time: '4 PM to 6 PM',
    playersNeeded: 8,
    pricePerPlayer: 300,
    totalPlayers: 11
  },
  {
    id: 2,
    sport: 'football',
    teamName: 'Red Dragons FC',
    date: dayjs().format('YYYY-MM-DD'),
    time: '5 PM to 7 PM',
    playersNeeded: 9,
    pricePerPlayer: 250,
    totalPlayers: 7
  },
  {
    id: 3,
    sport: 'cricket',
    teamName: 'Royal Challengers',
    date: dayjs().format('YYYY-MM-DD'),
    time: '3 PM to 5 PM',
    playersNeeded: 10,
    pricePerPlayer: 350,
    totalPlayers: 11
  },
  {
    id: 4,
    sport: 'football',
    teamName: 'Blue Panthers',
    date: dayjs().format('YYYY-MM-DD'),
    time: '6 PM to 8 PM',
    playersNeeded: 8,
    pricePerPlayer: 280,
    totalPlayers: 7
  },
  {
    id: 5,
    sport: 'cricket',
    teamName: 'Golden Eagles',
    date: dayjs().format('YYYY-MM-DD'),
    time: '2 PM to 4 PM',
    playersNeeded: 7,
    pricePerPlayer: 320,
    totalPlayers: 11
  }
];

export default function TeamsScreen() {
  const router = useRouter();
  const today = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSport, setSelectedSport] = useState<'cricket' | 'football'>('cricket'); // Set cricket as default
  const [filteredChallenges, setFilteredChallenges] = useState(MOCK_CHALLENGES);

  // Update filtered challenges whenever date or sport changes
  useEffect(() => {
    const filtered = MOCK_CHALLENGES.filter(challenge => {
      const dateMatches = challenge.date === selectedDate;
      const sportMatches = challenge.sport === selectedSport;
      return dateMatches && sportMatches;
    });
    
    setFilteredChallenges(filtered);
  }, [selectedDate, selectedSport]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <StyledScrollView className="flex-1 bg-gray-50">
      {/* Header with date and navigation */}
      <StyledView className="p-4 bg-white border-b border-gray-200">
        <StyledView className="flex-row justify-between items-center">
          <StyledText className="text-xl font-bold text-gray-800">
            Open Challenges
          </StyledText>
        </StyledView>
        {selectedDate && (
          <StyledView className="flex-row justify-between items-center mt-4">
            <StyledText className="text-gray-600 font-bold">
              {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
            </StyledText>
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

      {/* Sport Selection */}
      <StyledView className="flex-row justify-around p-4 bg-white">
        <StyledTouchableOpacity
          onPress={() => setSelectedSport('cricket')}
          className={`flex-1 mr-2 p-3 rounded-lg ${
            selectedSport === 'cricket' ? 'bg-[#00BE76]' : 'bg-gray-100'
          }`}
        >
          <StyledView className="items-center mb-2">
            <MaterialIcons 
              name="sports-cricket" 
              size={32} 
              color={selectedSport === 'cricket' ? '#FFFFFF' : '#00BE76'} 
            />
          </StyledView>
          <StyledText className={`text-center font-medium ${
            selectedSport === 'cricket' ? 'text-white' : 'text-gray-800'
          }`}>
            Cricket
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={() => setSelectedSport('football')}
          className={`flex-1 p-3 rounded-lg ${
            selectedSport === 'football' ? 'bg-[#00BE76]' : 'bg-gray-100'
          }`}
        >
          <StyledView className="items-center mb-2">
            <MaterialIcons 
              name="sports-soccer" 
              size={32} 
              color={selectedSport === 'football' ? '#FFFFFF' : '#00BE76'} 
            />
          </StyledView>
          <StyledText className={`text-center font-medium ${
            selectedSport === 'football' ? 'text-white' : 'text-gray-800'
          }`}>
            Football
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Challenges List */}
      <StyledView className="p-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <StyledTouchableOpacity
              key={challenge.id}
              onPress={() => router.push(`/chat/${challenge.teamName}`)}
              className="bg-white rounded-lg p-4 mb-4 border border-gray-200"
            >
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledView className="flex-row items-center">
                  <MaterialIcons
                    name={challenge.sport === 'cricket' ? 'sports-cricket' : 'sports-soccer'}
                    size={24}
                    color="#00BE76"
                  />
                  <StyledText className="ml-2 text-lg font-bold text-gray-800">
                    {challenge.teamName}
                  </StyledText>
                </StyledView>
                <MaterialIcons name="chat" size={24} color="#00BE76" />
              </StyledView>

              <StyledView className="space-y-2">
                <StyledText className="text-gray-600">
                  🕒 {challenge.time}
                </StyledText>

                <StyledView className="flex-row justify-between">
                  <StyledText className="text-green-600 font-medium">
                    🏃‍♂️ {challenge.playersNeeded} vs {challenge.playersNeeded} Match
                  </StyledText>
                  <StyledText className="text-gray-600">
                    ₹{challenge.pricePerPlayer}/player
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledTouchableOpacity>
          ))
        ) : (
          <StyledView className="bg-white rounded-lg p-6 items-center">
            <MaterialIcons name="search-off" size={48} color="#9CA3AF" />
            <StyledText className="text-gray-600 text-center mt-4">
              No open challenges found for {dayjs(selectedDate).format('MMM D')}
            </StyledText>
          </StyledView>
        )}
      </StyledView>
    </StyledScrollView>
  );
} 