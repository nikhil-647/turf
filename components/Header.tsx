import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);

// A reusable header component that shows a menu button, greeting and wallet balance.
export default function Header() {
  // We deliberately don't type-cast navigation to keep things simple for now.
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <StyledView
      className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* Menu icon + greeting */}
      <StyledView className="flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore – drawer navigation type is not properly inferred
            navigation.openDrawer?.();
          }}
        >
          <MaterialIcons name="menu" size={24} color="#00BE76" />
        </TouchableOpacity>
        <StyledText className="ml-3 text-lg font-semibold text-gray-800">
          Hi Nikhil
        </StyledText>
      </StyledView>

      {/* Wallet */}
      <TouchableOpacity 
        onPress={() => router.push('/wallet')}
        className="flex-row items-center"
      >
        <MaterialIcons name="account-balance-wallet" size={20} color="#00BE76" />
        <StyledText className="ml-2 text-base font-medium text-gray-800">₹50</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
} 