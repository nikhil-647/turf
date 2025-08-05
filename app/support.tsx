import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

// Mock data for previous tickets - replace with actual data from your backend
const mockPreviousTickets = [
  {
    id: '1',
    status: 'Open',
    description: 'Issue with payment processing - Unable to complete transaction for booking ID #12345',
    createdAt: '2024-03-20',
  },
  {
    id: '2',
    status: 'Resolved',
    description: 'Unable to join match #789 - Getting network error',
    createdAt: '2024-03-18',
  },
  {
    id: '3',
    status: 'In Progress',
    description: 'App crashes when trying to view team statistics during live match',
    createdAt: '2024-03-17',
  },
  {
    id: '4',
    status: 'Resolved',
    description: 'Need help with refund for cancelled match on March 15th',
    createdAt: '2024-03-15',
  },
  {
    id: '5',
    status: 'Open',
    description: 'Chat feature not working in match lobby',
    createdAt: '2024-03-14',
  },
  {
    id: '6',
    status: 'Resolved',
    description: 'Profile picture not updating after multiple attempts',
    createdAt: '2024-03-12',
  },
  {
    id: '7',
    status: 'In Progress',
    description: 'Unable to view match history from last week',
    createdAt: '2024-03-10',
  },
  {
    id: '8',
    status: 'Resolved',
    description: 'Notification settings not saving properly',
    createdAt: '2024-03-08',
  }
];

export default function SupportScreen() {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // TODO: Implement ticket creation logic
    console.log('Creating ticket:', { description });
    setDescription(''); // Clear the input after submission
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'text-yellow-600 bg-yellow-50';
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Resolved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="p-6">
        {/* Header */}
        <StyledView className="mb-8">
          <StyledText className="text-2xl font-bold text-gray-800 mb-2">🎫 Raise a Support Ticket</StyledText>
          <StyledText className="text-gray-600">
            Having trouble or need assistance? Let us know what's going on — we'll get back to you as soon as possible.
          </StyledText>
        </StyledView>

        {/* Description Input */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-medium text-gray-700 mb-2">
            Describe your issue
          </StyledText>
          <StyledTextInput
            className="border border-gray-300 rounded-lg p-4 min-h-[120px] text-gray-800"
            multiline
            placeholder="Please provide as much detail as possible..."
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </StyledView>

        {/* Submit Button */}
        <StyledTouchableOpacity
          onPress={handleSubmit}
          className="bg-primary rounded-lg py-4 items-center mb-6"
        >
          <StyledText className="text-white font-semibold text-lg">
            Create Ticket
          </StyledText>
        </StyledTouchableOpacity>

        {/* Info Box */}
        <StyledView className="bg-gray-50 rounded-lg p-4 mb-8">
          <StyledText className="text-gray-600 mb-2">
            🕒 Most tickets are resolved within 24–48 hours.
          </StyledText>
          <StyledText className="text-gray-600">
            Track your ticket status below.
          </StyledText>
        </StyledView>

        {/* Previous Tickets Section */}
        <StyledView>
          <StyledText className="text-xl font-semibold text-gray-800 mb-4">
            Previous Tickets
          </StyledText>
          
          {mockPreviousTickets.map((ticket) => (
            <StyledTouchableOpacity 
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-5 mb-4 active:bg-gray-50"
            >
              <StyledView className="flex-row justify-between items-start mb-3">
                <StyledView>
                  <StyledText className="text-base font-medium text-gray-800 mb-1">
                    Ticket #{ticket.id}
                  </StyledText>
                  <StyledText className="text-sm text-gray-500">
                    {ticket.createdAt}
                  </StyledText>
                </StyledView>
                <StyledText 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </StyledText>
              </StyledView>
              <StyledText className="text-gray-700 text-base leading-relaxed">
                {ticket.description}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
} 