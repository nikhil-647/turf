import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ImageView from 'react-native-image-viewing';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images - replace URLs with your actual turf images
  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=2070',
    },
    {
      uri: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070',
    },
    {
      uri: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=2068',
    },
    {
      uri: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070',
    },
  ];

  return (
    <StyledView className="flex-1 bg-gray-50">
      <StyledScrollView className="flex-1">
        {/* Gallery Section */}
        <StyledView className="p-4">
          <StyledText className="text-xl font-bold text-gray-800 mb-4">
            Gallery
          </StyledText>
          
          <StyledView className="mb-4">
            <TouchableOpacity
              onPress={() => {
                setCurrentImageIndex(0);
                setIsImageViewVisible(true);
              }}
            >
              <StyledImage 
                source={{ uri: images[0].uri }}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <StyledView className="flex-row justify-between mt-2">
              {images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCurrentImageIndex(index);
                    setIsImageViewVisible(true);
                  }}
                  className="w-[23%]"
                >
                  <StyledImage 
                    source={{ uri: image.uri }}
                    className="h-16 rounded"
                    style={{ width: (width - 48) * 0.23 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </StyledView>
          </StyledView>

          {/* ImageView component for full-screen gallery */}
          <ImageView
            images={images}
            imageIndex={currentImageIndex}
            visible={isImageViewVisible}
            onRequestClose={() => setIsImageViewVisible(false)}
            swipeToCloseEnabled={true}
            doubleTapToZoomEnabled={true}
          />

          {/* Venue Details */}
          <StyledView className="mb-6">
            <StyledText className="text-2xl font-bold text-gray-800 mb-2">
              Jai Hanuman Turf
            </StyledText>
            <StyledView className="flex-row items-center">
              <MaterialIcons name="location-on" size={16} color="#00BE76" />
              <StyledText className="text-gray-600 ml-1 flex-1">
                Kalika Mata Gate, Thane Rd, near Gaurav Dairy Farm, Bangar Nagar, Rajlaxmi Complex, Kalher, Bhiwandi, Maharashtra 421302
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity 
              className="bg-[#FF3B2F] px-4 py-2 rounded mt-3 self-start"
              onPress={() => {
                Linking.openURL('https://maps.app.goo.gl/aWJurdpFw7y9zBrx9?g_st=iw').catch(err => 
                  console.error('Error opening maps:', err)
                );
              }}
            >
              <StyledText className="text-white font-medium">
                Get Direction
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="mb-6">
            <StyledText className="text-xl font-bold text-gray-800 mb-3">
              How to Book?
            </StyledText>
            <StyledView className="gap-2">
              <StyledText className="text-gray-700">1. Recharge Your Wallet</StyledText>
              <StyledText className="text-gray-700">2. Select slots Timing</StyledText>
              <StyledText className="text-gray-700">3. Book Your Slot.</StyledText>
              <StyledText className="text-gray-700">4. Enjoy your Game.</StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="mb-6">
            <StyledText className="text-xl font-bold text-gray-800 mb-3">
              Team Challenge
            </StyledText>
            <StyledView className="gap-2">
              <StyledText className="text-gray-700">1. Create a Team</StyledText>
              <StyledText className="text-gray-700">2. Book a temporary Slot</StyledText>
              <StyledText className="text-gray-700">3. Other team will join your slot</StyledText>
              <StyledText className="text-gray-700">4. Your booking would be completed</StyledText>
              <StyledText className="text-red-500">Note. Your slot would be cancelled if other member did full payment on same slot. and no money would be deducted from your wallet.</StyledText>
            </StyledView>
          </StyledView>

          {/* Amenities Section */}
          <StyledView className="mb-6">
            <StyledText className="text-xl font-bold text-gray-800 mb-3">
              Amenities
            </StyledText>
            <StyledView className="flex-row flex-wrap gap-4">
              <StyledView className="flex-row items-center">
                <MaterialIcons name="stadium" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">Covered Turf</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <MaterialIcons name="lightbulb" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">Flood Lights</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <MaterialIcons name="payment" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">UPI Accepted</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <MaterialIcons name="credit-card" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">Card Accepted</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <MaterialIcons name="local-parking" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">Free Parking</StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <MaterialCommunityIcons name="toilet" size={20} color="#00BE76" />
                <StyledText className="text-gray-700 ml-2">Toilets</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Quick Actions */}
        <StyledView className="p-4">
          <StyledText className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </StyledText>
          
          <StyledView className="flex-row flex-wrap justify-between">
            {[
              { icon: "event-available" as const, title: 'Pool Booking', route: '/pool-booking' },
              { icon: "calendar-today" as const, title: 'Full Booking', route: '/full-booking' },
              { icon: "groups" as const, title: 'Join Team', route: '/teams' },
              { icon: "chat" as const, title: 'Chat', route: '/chat' },
            ].map((item, index) => (
              <StyledTouchableOpacity 
                key={index}
                className="w-[48%] bg-white rounded-lg p-4 mb-4 items-center shadow-sm"
                onPress={() => router.push(item.route)}
              >
                <StyledView className="w-12 h-12 bg-[#00BE76]/10 rounded-full items-center justify-center mb-2">
                  <MaterialIcons name={item.icon} size={24} color="#00BE76" />
                </StyledView>
                <StyledText className="text-gray-800 font-medium">
                  {item.title}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
} 