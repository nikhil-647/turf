import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function PoolBookingScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 p-4">
      <StyledText className="text-xl font-bold text-gray-800 mb-4">
        Pool Booking
      </StyledText>
      <StyledText className="text-gray-600">
        Available pool booking options will be displayed here.
      </StyledText>
    </StyledView>
  );
} 