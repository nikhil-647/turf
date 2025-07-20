import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function TermsOfUseScreen() {
  return (
    <StyledScrollView className="flex-1 bg-white px-4 pt-6">
      <StyledText className="text-lg font-bold mb-4 text-gray-800">Terms of Use</StyledText>
      <StyledText className="text-gray-700 mb-4">
        This is a placeholder for the terms of use content.
      </StyledText>
    </StyledScrollView>
  );
} 