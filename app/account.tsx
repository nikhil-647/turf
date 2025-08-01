import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type ValidationErrors = {
  name?: string;
  username?: string;
  email?: string;
};

export default function AccountScreen() {
  const [userData, setUserData] = useState({
    name: 'John Doe', // Replace with actual user data
    username: 'johndoe123', // Replace with actual username
    email: 'john@example.com',
    phone: '+91 9876543210',
    profilePicture: null as string | null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    
    // Validate name
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (userData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!userData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(userData.username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the errors before saving');
      return;
    }

    // TODO: Implement API call to update profile
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleFieldChange = (field: 'name' | 'username' | 'email', value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      // Check file size (1MB = 1024 * 1024 bytes)
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      
      if (blob.size > 1024 * 1024) {
        Alert.alert('Error', 'Image size must be less than 1MB');
        return;
      }

      setUserData(prev => ({
        ...prev,
        profilePicture: result.assets[0].uri
      }));
    }
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="p-6">
        {/* Profile Picture Section */}
        <StyledView className="items-center mb-8">
          <StyledView className="relative">
            {userData.profilePicture ? (
              <Image
                source={{ uri: userData.profilePicture }}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <StyledView className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center">
                <MaterialIcons name="person" size={64} color="#9CA3AF" />
              </StyledView>
            )}
            <StyledTouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-[#00BE76] p-2 rounded-full"
            >
              <MaterialIcons name="camera-alt" size={20} color="white" />
            </StyledTouchableOpacity>
          </StyledView>
          <StyledText className="text-sm text-gray-500 mt-2">
            Max size: 1 MB
          </StyledText>
        </StyledView>

        {/* Profile Details Section */}
        <StyledView className="mb-6">
          <StyledView className="flex-row justify-between items-center mb-6">
            <StyledText className="text-lg font-bold text-gray-800">
              Personal Details
            </StyledText>

            {/* Edit/Save Button */}
            <StyledTouchableOpacity
              onPress={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
              className={`flex-row items-center px-4 py-2 rounded-full ${
                isEditing ? 'bg-[#00BE76]' : 'bg-[#00BE76]/10'
              }`}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name={isEditing ? "check" : "edit"} 
                size={18} 
                color={isEditing ? "#FFFFFF" : "#00BE76"} 
                style={{ marginRight: 4 }}
              />
              <StyledText 
                className={`font-medium ${
                  isEditing ? 'text-white' : 'text-[#00BE76]'
                }`}
              >
                {isEditing ? 'Save' : 'Edit'}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Name Field */}
          <StyledView className="mb-4">
            <StyledText className="text-sm text-gray-600 mb-1">Full Name</StyledText>
            <StyledTextInput
              className={`border rounded-lg p-3 text-base ${
                isEditing ? errors.name ? 'border-red-500' : 'border-[#00BE76]' : 'border-gray-200'
              }`}
              value={userData.name}
              onChangeText={(text) => handleFieldChange('name', text)}
              editable={isEditing}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
            {errors.name && (
              <StyledText className="text-red-500 text-xs mt-1">{errors.name}</StyledText>
            )}
          </StyledView>

          {/* Username Field */}
          <StyledView className="mb-4">
            <StyledText className="text-sm text-gray-600 mb-1">Username</StyledText>
            <StyledTextInput
              className={`border rounded-lg p-3 text-base ${
                isEditing ? errors.username ? 'border-red-500' : 'border-[#00BE76]' : 'border-gray-200'
              }`}
              value={userData.username}
              onChangeText={(text) => handleFieldChange('username', text)}
              editable={isEditing}
              placeholder="Choose a username"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.username && (
              <StyledText className="text-red-500 text-xs mt-1">{errors.username}</StyledText>
            )}
            <StyledText className="text-xs text-gray-500 mt-1">
              Username can contain letters, numbers, and underscores
            </StyledText>
          </StyledView>

          {/* Email Field */}
          <StyledView className="mb-4">
            <StyledText className="text-sm text-gray-600 mb-1">Email</StyledText>
            <StyledTextInput
              className={`border rounded-lg p-3 text-base ${
                isEditing ? errors.email ? 'border-red-500' : 'border-[#00BE76]' : 'border-gray-200'
              }`}
              value={userData.email}
              onChangeText={(text) => handleFieldChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={isEditing}
              placeholder="Enter your email"
            />
            {errors.email && (
              <StyledText className="text-red-500 text-xs mt-1">{errors.email}</StyledText>
            )}
          </StyledView>

          {/* Phone Field (Read-only) */}
          <StyledView>
            <StyledText className="text-sm text-gray-600 mb-1">Phone Number</StyledText>
            <StyledView className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <StyledText className="text-base text-gray-600">{userData.phone}</StyledText>
            </StyledView>
            <StyledText className="text-xs text-gray-500 mt-1">
              Phone number cannot be changed
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
} 