import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking, Animated } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ImageView from 'react-native-image-viewing';
import PagerView from 'react-native-pager-view';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledPagerView = styled(PagerView);

const { width } = Dimensions.get('window');

interface CarouselItem {
  uri: string;
}

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;
type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface BookingStep {
  step: number;
  text: string;
  icon: MaterialIconName;
}

interface AmenityItem {
  icon: MaterialIconName | MaterialCommunityIconName;
  text: string;
  isCustomIcon?: boolean;
}

export default function HomeScreen() {
  const router = useRouter();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const pagerRef = useRef<PagerView>(null);

  // Sample images - replace URLs with your actual turf images
  const images: CarouselItem[] = [
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

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  const bookingSteps: BookingStep[] = [
    { step: 1, text: "Recharge Your Wallet", icon: "account-balance-wallet" },
    { step: 2, text: "Select slots Timing", icon: "access-time" },
    { step: 3, text: "Book Your Slot", icon: "event-available" },
    { step: 4, text: "Enjoy your Game", icon: "sports-soccer" },
  ];

  const amenities: AmenityItem[] = [
    { icon: "stadium", text: "Covered Turf" },
    { icon: "lightbulb", text: "Flood Lights" },
    { icon: "payment", text: "UPI Accepted" },
    { icon: "credit-card", text: "Card Accepted" },
    { icon: "local-parking", text: "Free Parking" },
    { icon: "toilet", text: "Toilets", isCustomIcon: true }
  ];

  return (
    <StyledView className="flex-1 bg-white">
      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <Animated.View
          style={{ transform: [{ scale: headerScale }] }}
          className="bg-[#00BE76] p-6 rounded-b-3xl"
        >
          <StyledText className="text-3xl font-bold text-white mb-2">
            Jai Hanuman Turf
          </StyledText>
          <StyledView className="flex-row items-center">
            <MaterialIcons name="sports-soccer" size={20} color="#fff" />
            <StyledText className="text-white ml-2 opacity-90">
              Where Champions Play, Every Day
            </StyledText>
          </StyledView>
        </Animated.View>

        {/* Gallery Carousel */}
        <StyledView className="py-6">
          <StyledPagerView
            ref={pagerRef}
            className="h-64 mx-4"
            initialPage={0}
            onPageSelected={(e) => setCurrentImageIndex(e.nativeEvent.position)}
          >
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setIsImageViewVisible(true)}
                className="overflow-hidden rounded-2xl"
              >
                <StyledImage
                  source={{ uri: image.uri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </StyledPagerView>
          
          {/* Page Indicator */}
          <StyledView className="flex-row justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <StyledView
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? 'bg-[#00BE76]' : 'bg-gray-300'
                }`}
              />
            ))}
          </StyledView>
        </StyledView>

        <ImageView
          images={images}
          imageIndex={currentImageIndex}
          visible={isImageViewVisible}
          onRequestClose={() => setIsImageViewVisible(false)}
          swipeToCloseEnabled={true}
          doubleTapToZoomEnabled={true}
        />

        {/* Location Card */}
        <StyledView className="mx-4 bg-white rounded-2xl p-4 shadow-md mb-6">
          <StyledView className="flex-row items-start">
            <MaterialIcons name="location-on" size={24} color="#00BE76" />
            <StyledView className="flex-1 ml-3">
              <StyledText className="text-gray-600">
                Kalika Mata Gate, Thane Rd, near Gaurav Dairy Farm, Bangar Nagar, Rajlaxmi Complex, Kalher, Bhiwandi, Maharashtra 421302
              </StyledText>
              <StyledTouchableOpacity 
                className="bg-[#00BE76] px-4 py-2 rounded-full mt-3 self-start flex-row items-center"
                onPress={() => {
                  Linking.openURL('https://maps.app.goo.gl/aWJurdpFw7y9zBrx9?g_st=iw');
                }}
              >
                <Ionicons name="navigate" size={16} color="white" />
                <StyledText className="text-white font-medium ml-2">
                  Get Directions
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Booking Process */}
        <StyledView className="mx-4 bg-white rounded-2xl p-6 shadow-md mb-6">
          <StyledText className="text-xl font-bold text-gray-800 mb-4">
            How to Book?
          </StyledText>
          <StyledView style={{ rowGap: 16 }}>
            {bookingSteps.map((item, index) => (
              <StyledView key={index} className="flex-row items-center">
                <StyledView className="w-8 h-8 bg-[#00BE76]/10 rounded-full items-center justify-center">
                  <MaterialIcons name={item.icon} size={20} color="#00BE76" />
                </StyledView>
                <StyledText className="text-gray-700 ml-3 flex-1">
                  {item.text}
                </StyledText>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Team Challenge Section */}
        <StyledView className="mx-4 bg-white rounded-2xl p-6 shadow-md mb-6">
          <StyledText className="text-xl font-bold text-gray-800 mb-4">
            Team Challenge
          </StyledText>
          <StyledView style={{ rowGap: 12 }}>
            {[
              "Create a Team",
              "Book a temporary Slot",
              "Other team will join your slot",
              "Your booking would be completed"
            ].map((text, index) => (
              <StyledView key={index} className="flex-row items-center">
                <StyledView className="w-6 h-6 bg-[#00BE76]/10 rounded-full items-center justify-center mr-3">
                  <StyledText className="text-[#00BE76] font-bold">{index + 1}</StyledText>
                </StyledView>
                <StyledText className="text-gray-700">{text}</StyledText>
              </StyledView>
            ))}
            <StyledText className="text-red-500 mt-2 italic text-sm">
              Note: Your slot would be cancelled if other member did full payment on same slot. No money would be deducted from your wallet.
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Join Battle Section */}
        <StyledView className="mx-4 bg-white rounded-2xl p-6 shadow-md mb-6">
          <StyledView className="flex-row items-center justify-between mb-4">
            <StyledText className="text-xl font-bold text-gray-800">
              Join Battle
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => router.push('/join-battle')}
              className="bg-[#00BE76]/10 px-4 py-2 rounded-full"
            >
              <StyledText className="text-[#00BE76] font-semibold">View All</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledView className="bg-[#00BE76]/5 p-4 rounded-xl mb-4">
            <StyledView className="flex-row items-center mb-2">
              <MaterialIcons name="sports-soccer" size={20} color="#00BE76" />
              <StyledText className="text-gray-800 font-semibold ml-2">How to Join a Battle?</StyledText>
            </StyledView>
            <StyledText className="text-gray-600 text-sm mb-2">
              Join exciting matches and compete with other teams. Accept challenges and show your skills!
            </StyledText>
          </StyledView>

          <StyledView style={{ rowGap: 12 }}>
            {[
              { text: "Browse Available Challenges", icon: "search" },
              { text: "Check Team Details & Time Slot", icon: "info" },
              { text: "Pay Your Share & Join", icon: "payments" },
              { text: "Get Ready for the Game!", icon: "sports" }
            ].map((item, index) => (
              <StyledView key={index} className="flex-row items-center">
                <StyledView className="w-8 h-8 bg-[#00BE76]/10 rounded-full items-center justify-center">
                  <MaterialIcons name={item.icon as MaterialIconName} size={20} color="#00BE76" />
                </StyledView>
                <StyledView className="flex-1 ml-3">
                  <StyledText className="text-gray-700">{item.text}</StyledText>
                </StyledView>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Amenities Section */}
        <StyledView className="mx-4 bg-white rounded-2xl p-6 shadow-md mb-6">
          <StyledText className="text-xl font-bold text-gray-800 mb-6">
            Amenities
          </StyledText>
          <StyledView className="flex-row flex-wrap justify-between">
            {[
              { icon: "stadium", text: "Indoor Turf" },
              { icon: "lightbulb", text: "LED Lights" },
              { icon: "local-parking", text: "Free Parking" },
              { icon: "water-drop", text: "Water" },
              { icon: "shower", text: "Washroom" },
              { icon: "sports-cricket", text: "Equipment" }
            ].map((item, index) => (
              <StyledView 
                key={index} 
                className="bg-gray-50 rounded-xl p-3 mb-3" 
                style={{ width: '31%' }}
              >
                <StyledView className="items-center">
                  <StyledView className="w-9 h-9 bg-[#00BE76]/10 rounded-full items-center justify-center mb-2">
                    <MaterialIcons name={item.icon as MaterialIconName} size={20} color="#00BE76" />
                  </StyledView>
                  <StyledText className="text-gray-800 font-medium text-center text-sm">
                    {item.text}
                  </StyledText>
                </StyledView>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <StyledTouchableOpacity 
        className="absolute bottom-6 right-6 bg-[#00BE76] rounded-full shadow-lg flex-row items-center px-4 py-3"
        onPress={() => router.push('/full-booking')}
      >
        <MaterialIcons name="event-available" size={24} color="white" />
        <StyledText className="text-white font-semibold ml-2">
          Book Now
        </StyledText>
      </StyledTouchableOpacity>

    </StyledView>
  );
} 