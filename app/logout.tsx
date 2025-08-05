import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Add real logout logic (clear tokens, etc.)
    setTimeout(() => {
      router.replace('/login');
    }, 500);
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color={colors.primary} />
      <StyledText className="mt-4 text-gray-700">Logging out...</StyledText>
    </StyledView>
  );
} 