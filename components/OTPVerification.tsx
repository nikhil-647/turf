import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Button } from './Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

type OTPVerificationProps = {
  phoneNumber: string;
  onVerifyOTP?: (otp: string) => void;
  onResendOTP?: () => void;
};

export const OTPVerification = ({ phoneNumber, onVerifyOTP, onResendOTP }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, canResend]);

  const handleOTPChange = (value: string) => {
    // Only allow numbers and max 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      onVerifyOTP?.(otp);
      // Navigate to welcome screen after successful verification
      router.push('/welcome');
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(180);
      setCanResend(false);
      setOtp('');
      onResendOTP?.();
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number || number.length < 6) return number;
    return number.slice(0, 2) + '*'.repeat(number.length - 6) + number.slice(-4);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderOTPBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      boxes.push(
        <StyledPressable
          key={i}
          onPress={() => {
            inputRef.current?.focus();
            setIsFocused(true);
          }}
          className={`w-12 h-14 border-2 rounded-xl items-center justify-center mx-1
            ${isFocused ? 'border-primary' : 'border-gray-300'}
            ${otp[i] ? 'bg-gray-50' : 'bg-white'}`}
        >
          <StyledText className="text-2xl font-bold text-gray-800">
            {otp[i] || ''}
          </StyledText>
        </StyledPressable>
      );
    }
    return boxes;
  };

  return (
    <StyledKeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StyledPressable 
        className="flex-1" 
        onPress={() => Keyboard.dismiss()}
      >
        <StyledView className="items-center flex-1 justify-center px-6 py-8">
          <StyledView className="items-center mb-6">
            <StyledView className="w-20 h-20 bg-primary-light rounded-full items-center justify-center mb-4">
              <MaterialIcons name="verified-user" size={40} color={colors.primary} />
            </StyledView>
            <StyledText className="text-3xl font-bold text-gray-800 mb-2">
              Verification
            </StyledText>
            <StyledText className="text-base text-gray-600 text-center">
              We've sent a verification code to{'\n'}
              <StyledText className="font-semibold text-gray-800">
                {formatPhoneNumber(phoneNumber)}
              </StyledText>
            </StyledText>
          </StyledView>

          <StyledView className="w-full mb-6">
            <StyledView className="flex-row justify-center mb-4">
              {renderOTPBoxes()}
            </StyledView>
            <StyledTextInput
              ref={inputRef}
              className="absolute opacity-0"
              maxLength={6}
              keyboardType="number-pad"
              value={otp}
              onChangeText={handleOTPChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </StyledView>

          <Button 
            onPress={handleSubmit} 
            fullWidth 
            className={`mb-4 ${otp.length === 6 ? 'opacity-100' : 'opacity-50'}`}
          >
            Verify Code
          </Button>

          <StyledView className="items-center">
            <StyledText className="text-gray-600 mb-2">
              Didn't receive the code? {canResend ? '' : `(${formatTime(timer)})`}
            </StyledText>
            {canResend ? (
              <StyledPressable onPress={handleResend}>
                <StyledText className="text-primary font-semibold text-base">
                  Resend Code
                </StyledText>
              </StyledPressable>
            ) : (
              <StyledText className="text-gray-400 font-semibold text-base">
                Resend Code
              </StyledText>
            )}
          </StyledView>
        </StyledView>
      </StyledPressable>
    </StyledKeyboardAvoidingView>
  );
}; 