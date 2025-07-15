import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';
import Cricket from '../assets/Cricket.svg';
import { Button } from './Button';

const StyledView = styled(View);
const StyledText = styled(Text);

type WelcomeScreenProps = {
  onGetStarted?: () => void;
};

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <StyledView className="flex-1 bg-white">
      <StyledView className="items-center flex-1 justify-center px-6">
        <StyledText className="text-4xl font-bold text-[#00BE76] mb-2">Green Turf</StyledText>
        <StyledText className="text-2xl text-gray-700 mb-8">Play Chat Challenge</StyledText>
        <StyledView className="w-full h-[300px] mb-8">
          <Cricket width="100%" height={350} />
        </StyledView>
        <StyledText className="text-xl text-gray-600 mb-8">Have Fun with Friends!</StyledText>
        <Button onPress={onGetStarted}>
          Get Started
        </Button>
      </StyledView>
    </StyledView>
  );
};
