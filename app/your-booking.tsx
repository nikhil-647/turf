import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import dayjs from 'dayjs';
import { colors } from '../constants/colors';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type BookingType = 'all' | 'personal' | 'team' | 'challenge';
type Booking = {
  id: string;
  date: Date;
  time: string;
  type: BookingType;
  status: 'upcoming' | 'completed' | 'cancelled';
  title: string;
};

// Sample data
const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: '1',
    date: new Date(),
    time: '10:00 AM',
    type: 'personal',
    status: 'upcoming',
    title: 'Football Practice'
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000), // yesterday
    time: '2:00 PM',
    type: 'team',
    status: 'completed',
    title: 'Cricket Match vs Team Eagles'
  },
  {
    id: '3',
    date: new Date(Date.now() + 86400000), // tomorrow
    time: '4:00 PM',
    type: 'challenge',
    status: 'upcoming',
    title: 'Basketball Challenge'
  },
  {
    id: '4',
    date: new Date(),
    time: '6:00 PM',
    type: 'personal',
    status: 'cancelled',
    title: 'Tennis Session'
  }
];

export default function YourBookingScreen() {
  const [selectedTab, setSelectedTab] = useState<BookingType>('all');
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const tabs: { key: BookingType; title: string }[] = [
    { key: 'all', title: 'All Bookings' },
    { key: 'personal', title: 'Personal' },
    { key: 'team', title: 'Team' },
    { key: 'challenge', title: 'Challenges' },
  ];

  const loadMoreBookings = () => {
    setLoading(true);
    // Simulating API call with sample data
    setTimeout(() => {
      const newBookings = [...SAMPLE_BOOKINGS].map(booking => ({
        ...booking,
        id: `${booking.id}-${page}`
      }));
      setBookings([...bookings, ...newBookings]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const filteredBookings = selectedTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.type === selectedTab);

  const renderTab = ({ key, title }: { key: BookingType; title: string }) => (
    <StyledTouchableOpacity
      key={key}
      onPress={() => setSelectedTab(key)}
      className={`flex-1 py-2.5 rounded-lg mx-1 ${
        selectedTab === key ? 'bg-primary' : 'bg-gray-100'
      }`}
    >
      <StyledText
        className={`text-center ${
          selectedTab === key ? 'text-white' : 'text-gray-800'
        } font-medium`}
      >
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <StyledView className="bg-white p-4 rounded-lg mb-2 shadow-sm border border-gray-100">
      <StyledView className="flex-row justify-between items-center">
        <StyledText className="text-lg font-medium text-gray-900">{item.title}</StyledText>
        <StyledView
          className={`px-2 py-1 rounded ${
            item.status === 'upcoming'
              ? 'bg-primary-light'
              : item.status === 'completed'
              ? 'bg-blue-100'
              : 'bg-red-100'
          }`}
        >
          <StyledText
            className={`${
              item.status === 'upcoming'
                ? 'text-primary'
                : item.status === 'completed'
                ? 'text-blue-700'
                : 'text-red-700'
            } text-sm font-medium`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledText className="text-gray-600 mt-2">
        {dayjs(item.date).format('MMM DD, YYYY')} at {item.time}
      </StyledText>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="p-4 bg-white border-b border-gray-200">
        <StyledText className="text-2xl font-bold mb-4 text-gray-900">Booking History</StyledText>
        
        {/* Tabs */}
        <StyledView className="flex-row">
          {tabs.map(renderTab)}
        </StyledView>
      </StyledView>

      {/* Booking List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={loadMoreBookings}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <StyledView className="items-center justify-center py-8">
            <StyledText className="text-gray-500">
              No bookings found
            </StyledText>
          </StyledView>
        }
        ListFooterComponent={
          loading ? (
            <StyledView className="py-4">
              <ActivityIndicator size="small" color={colors.primary} />
            </StyledView>
          ) : null
        }
      />
    </StyledView>
  );
} 