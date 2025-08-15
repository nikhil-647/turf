import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';
import { useAuthStore } from '../lib/stores/auth';
import { validateDisplayName, validateEmail } from '../lib/validation';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

export default function WelcomeScreen() {
  const router = useRouter();
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Reset errors
    setNameError(undefined);

    // Validate input
    const nameValidation = validateDisplayName(name);

    if (!nameValidation.isValid) {
      setNameError(nameValidation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        display_name: name.trim()
      });
      
      // Navigate to the main app tabs
      router.replace('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledView className="flex-1 px-6 pt-4">
        {/* Welcome Section */}
        <StyledView className="items-center justify-center mb-8">
          <StyledView className="w-20 h-20 bg-primary-light rounded-full items-center justify-center mb-6">
            <MaterialIcons name="celebration" size={40} color={colors.primary} />
          </StyledView>
          
          <StyledText className="text-3xl font-bold text-gray-800 mb-3 text-center">
            Welcome!
          </StyledText>
          
          <StyledText className="text-base text-gray-600 text-center mb-4">
            Your phone number has been verified successfully. You're all set to start using the app!
          </StyledText>
        </StyledView>

        {/* Form Section */}
        <StyledView>
          <StyledText className="text-2xl font-bold text-primary mb-6 text-center">
            What should we call you?
          </StyledText>
          
          <StyledView className="mb-8">
            <StyledTextInput
              className={`border ${nameError ? 'border-red-500' : 'border-primary'} rounded-lg p-4 text-base`}
              placeholder="Display Name (no spaces)"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError(undefined);
              }}
              autoCapitalize="none"
            />
            {nameError && (
              <StyledText className="text-red-500 text-sm mt-1">{nameError}</StyledText>
            )}
          </StyledView>

          <Button 
            onPress={handleSubmit}
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </Button>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
} 