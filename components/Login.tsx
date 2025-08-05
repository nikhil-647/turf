import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { styled } from 'nativewind';
import Football from '../assets/football.svg';
import { Button } from './Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

type LoginScreenProps = {
  onSendOTP?: (mobileNo: string) => void;
};

export const LoginScreen = ({ onSendOTP }: LoginScreenProps) => {
  const [mobileNo, setMobileNo] = useState('');

  const handleSendOTP = () => {
      onSendOTP?.(mobileNo);
  };

  return (
    <StyledView className="flex-1 bg-white">
      <StyledView className="items-center flex-1 justify-center px-6">
        <StyledText className="text-4xl font-bold text-primary mb-2">Enter Mobile No</StyledText>
        <StyledText className="text-xl text-gray-600 mb-8">Have Fun with Friends!</StyledText>
        
        <StyledView className="w-full mb-6">
          <StyledTextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
            placeholder="Mobile No"
            value={mobileNo}
            onChangeText={setMobileNo}
            keyboardType="phone-pad"
          />
        </StyledView>

        <Button 
          onPress={handleSendOTP}
          className="mb-8"
          fullWidth
        >
          Send OTP
        </Button>

        <StyledView className="w-full h-[300px]">
          <Football width="100%" height={350} />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}; 