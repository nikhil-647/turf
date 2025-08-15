import React, { useState } from 'react';
import { Text, View, TextInput, ActivityIndicator, Alert } from 'react-native';
import { styled } from 'nativewind';
import Football from '../assets/football.svg';
import { Button } from './Button';
import { auth } from '../lib/auth';
import { colors } from '../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

type LoginScreenProps = {
  onSendOTP?: (mobileNo: string) => void;
};

export const LoginScreen = ({ onSendOTP }: LoginScreenProps) => {
  const [mobileNo, setMobileNo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!mobileNo) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    // Format phone number to international format if not already
    const formattedPhone = mobileNo.startsWith('+') ? mobileNo : `+91${mobileNo}`;
    
    setLoading(true);
    try {
      const { error } = await auth.sendOTP(formattedPhone);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        onSendOTP?.(formattedPhone);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
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

        <StyledView className="mb-8">
          <Button 
            onPress={handleSendOTP}
            fullWidth
            disabled={loading}
          >
            Send OTP
          </Button>
          {loading && (
            <StyledView className="absolute inset-0 items-center justify-center">
              <ActivityIndicator color={colors.primary} />
            </StyledView>
          )}
        </StyledView>

        <StyledView className="w-full h-[300px]">
          <Football width="100%" height={350} />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}; 