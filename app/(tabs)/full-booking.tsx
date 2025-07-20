import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function FullBookingScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 p-4">
      <StyledText className="text-xl font-bold text-gray-800 mb-4">
        Full Booking
      </StyledText>
      <StyledText className="text-gray-600">
        Full ground booking options will be displayed here.
      </StyledText>
    </StyledView>
  );
} 