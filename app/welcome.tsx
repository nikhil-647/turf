import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

export default function WelcomeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Store user data if needed
    // You might want to store this in AsyncStorage or your backend
    const userData = {
      name,
      email
    };
    console.log('User Data:', userData);
    
    // Navigate to the main app tabs
    router.replace('/home');
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
          
          <StyledView className="mb-4">
            <StyledTextInput
              className="border border-primary rounded-lg p-4 text-base"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </StyledView>

          <StyledView className="mb-8">
            <StyledTextInput
              className="border border-primary rounded-lg p-4 text-base"
              placeholder="Email Id (Optional)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </StyledView>

          <Button 
            onPress={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
} 