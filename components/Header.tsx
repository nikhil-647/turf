import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useAuthStore } from '../lib/stores/auth';

const StyledView = styled(View);
const StyledText = styled(Text);

interface SecondaryHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

// A header component for secondary screens with a back button and title
export function SecondaryHeader({ title, showBackButton = true, rightElement }: SecondaryHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <StyledView 
      className="bg-white border-b border-gray-200"
      style={{ paddingTop: insets.top }}
    >
      <StyledView className="p-4 flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <MaterialIcons name="arrow-back" size={28} color={colors.primary} />
          </TouchableOpacity>
        )}
        <StyledText className="flex-1 text-xl font-bold text-gray-800 text-center">
          {title}
        </StyledText>
        {rightElement || <View style={{ width: 28 }} />}
      </StyledView>
    </StyledView>
  );
}

// A reusable header component that shows a menu button, greeting and wallet balance.
export default function Header() {
  // We deliberately don't type-cast navigation to keep things simple for now.
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

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
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
            <StyledText className="ml-3 text-lg font-semibold text-gray-800">
              Hi {user?.user_metadata?.display_name || 'Guest'}
            </StyledText>
          </TouchableOpacity>
      </StyledView>

      {/* Wallet */}
      <TouchableOpacity 
        onPress={() => router.push('/wallet')}
        className="flex-row items-center"
      >
        <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
        <StyledText className="ml-2 text-base font-medium text-gray-800">₹50</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
} 