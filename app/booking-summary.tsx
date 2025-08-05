import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import dayjs from 'dayjs';
import { MaterialIcons } from '@expo/vector-icons';
import { SecondaryHeader } from '../components/Header';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Types copied locally – could be extracted to a shared types file
interface SlotWithDate {
  time: string;
  range: string;
  price: number;
  status: 'available' | 'booked' | 'selected';
  date: string; // YYYY-MM-DD
}

type BookingMode = 'SELF_FULL' | 'TEAM_FULL' | 'TEAM_CHALLENGE';

export default function BookingSummaryScreen() {
  const router = useRouter();
  const { slots = '[]', total = '0' } = useLocalSearchParams<{ slots: string; total: string }>();
  const scrollViewRef = useRef<ScrollView>(null);

  // Parse params
  const selectedSlots = useMemo<SlotWithDate[]>(() => {
    try {
      return JSON.parse(slots as string);
    } catch {
      return [];
    }
  }, [slots]);

  const totalPrice = Number(total);

  const [bookingMode, setBookingMode] = useState<BookingMode>('SELF_FULL');

  // Sport selection for Team Challenge mode
  const [selectedSport, setSelectedSport] = useState<'CRICKET' | 'FOOTBALL'>('CRICKET');

  // Reset sport selection when leaving Team Challenge mode
  useEffect(() => {
    if (bookingMode !== 'TEAM_CHALLENGE') {
      setSelectedSport('CRICKET');
    }
  }, [bookingMode]);

  // Displayed total: half for challenge mode
  const displayTotal = useMemo(() => (bookingMode === 'TEAM_CHALLENGE' ? totalPrice / 2 : totalPrice), [bookingMode, totalPrice]);

  // Wallet selection state
  const [walletType, setWalletType] = useState<'PERSONAL' | 'TEAM'>('PERSONAL');
  const isAdmin = true; // TODO: replace with real user role check

  // Mock wallet balances – replace with real data from API/store
  const personalBalance = 100;
  type TeamInfo = { name: string; balance: number };
  const teams: TeamInfo[] = [
    { name: 'Team A', balance: 400 },
    { name: 'Team B', balance: 250 },
    { name: 'Team C', balance: 150 },
  ];

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamModalVisible, setTeamModalVisible] = useState(false);

  // Keep wallet selection valid for chosen booking mode
  useEffect(() => {
    if (bookingMode === 'SELF_FULL' && walletType === 'TEAM') {
      setWalletType('PERSONAL');
    } else if ((bookingMode === 'TEAM_FULL' || bookingMode === 'TEAM_CHALLENGE') && walletType === 'PERSONAL') {
      setWalletType('TEAM');
    }
  }, [bookingMode, walletType]);

  const payableNow = useMemo(() => {
    switch (bookingMode) {
      case 'TEAM_CHALLENGE':
        return 0; // collect when matched
      case 'SELF_FULL':
      case 'TEAM_FULL':
      default:
        return totalPrice;
    }
  }, [bookingMode, totalPrice]);

  const payableLater = bookingMode === 'TEAM_CHALLENGE' ? displayTotal : 0;

  const handleConfirm = () => {
    if (payableNow === 0) {
      Alert.alert('Booking Confirmed', 'Your slot is reserved. Payment will be collected when another team joins.');
      router.push('/');
      return;
    }
    // TODO: integrate payment gateway
    Alert.alert('Proceed to Payment', `Collect ₹${payableNow} now.`);
  };

  return (
    <StyledView className="flex-1 bg-gray-50">
      <SecondaryHeader title="Booking Summary" />

      <StyledScrollView ref={scrollViewRef} className="flex-1 p-4">
        {/* Selected slots */}
        <StyledText className="text-lg font-bold mb-2">Your Selection</StyledText>
        {selectedSlots.map((slot, idx) => (
          <StyledView key={idx} className="flex-row justify-between items-center mb-2 p-3 rounded-lg bg-white border border-gray-200">
            <StyledText className="text-sm font-medium text-gray-700">
              {dayjs(slot.date).format('DD MMM')} • {slot.range}
            </StyledText>
            <StyledText className="text-sm font-medium text-gray-800">₹{slot.price}</StyledText>
          </StyledView>
        ))}

        {/* Price Summary (moved up) */}
        <StyledView className="p-4 rounded-lg bg-white border border-gray-200 my-1">
          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-base text-gray-700">Total Price</StyledText>
            <StyledText className="text-base font-medium text-gray-800">₹{displayTotal}</StyledText>
          </StyledView>

          {bookingMode === 'TEAM_CHALLENGE' && (
            <StyledView className="flex-row justify-between mb-1">
              <StyledText className="text-xs text-gray-500">Full Price</StyledText>
              <StyledText className="text-xs text-gray-500">₹{totalPrice}</StyledText>
            </StyledView>
          )}
        </StyledView>

        {bookingMode === 'TEAM_CHALLENGE' && (
          <StyledText className="text-xs font-medium text-red-500 mb-2">
            The price is shown as half because, in Team Challenge mode, each team pays only their share now. The remaining half will be collected once an opponent team joins.
          </StyledText>
        )}

        {/* Booking type selector */}
        <StyledText className="text-lg font-bold mt-4 mb-2">Booking For</StyledText>
        <StyledView className="flex-row justify-between mb-4">
          <StyledTouchableOpacity
            onPress={() => setBookingMode('SELF_FULL')}
            className={`flex-1 mr-2 p-3 rounded-lg border ${bookingMode === 'SELF_FULL' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
          >
            <StyledText className={`text-center font-medium ${bookingMode === 'SELF_FULL' ? 'text-white' : 'text-gray-800'}`}>Self (Private)</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => setBookingMode('TEAM_FULL')}
            className={`flex-1 mr-2 p-3 rounded-lg border ${bookingMode === 'TEAM_FULL' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
          >
            <StyledText className={`text-center font-medium ${bookingMode === 'TEAM_FULL' ? 'text-white' : 'text-gray-800'}`}>Team (Private)</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => setBookingMode('TEAM_CHALLENGE')}
            className={`flex-1 p-3 rounded-lg border ${bookingMode === 'TEAM_CHALLENGE' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
          >
            <StyledText className={`text-center font-medium ${bookingMode === 'TEAM_CHALLENGE' ? 'text-white' : 'text-gray-800'}`}>Team (Challenge)</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="p-3 rounded-lg -mt-2 mb-4">
          {bookingMode === 'SELF_FULL' && (
            <StyledText className="text-xs text-gray-500 text-center">
              Book for yourself and your friends. This is a private game, so you'll need all your players.
            </StyledText>
          )}
          {bookingMode === 'TEAM_FULL' && (
            <StyledText className="text-xs text-gray-500 text-center">
              Book for your team using the team wallet. This private game is not shared with unknown players.
            </StyledText>
          )}
          {bookingMode === 'TEAM_CHALLENGE' && (
            <StyledText className="text-xs text-gray-500 text-center">
              Create a challenge or accept one. An unknown team will join to compete against you.
            </StyledText>
          )}
        </StyledView>

        {/* Sport selection for Team Challenge */}
        {bookingMode === 'TEAM_CHALLENGE' && (
          <>
            <StyledText className="text-lg font-bold mt-4 mb-2">Select Sport</StyledText>
            <StyledView className="flex-row justify-between mb-4">
              <StyledTouchableOpacity
                onPress={() => setSelectedSport('CRICKET')}
                className={`flex-1 mr-2 p-3 rounded-lg border ${selectedSport === 'CRICKET' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
              >
                <StyledView className="items-center mb-2">
                  <MaterialIcons name="sports-cricket" size={32} color={selectedSport === 'CRICKET' ? '#FFFFFF' : '#00BE76'} />
                </StyledView>
                <StyledText className={`text-center font-medium ${selectedSport === 'CRICKET' ? 'text-white' : 'text-gray-800'}`}>Cricket</StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                onPress={() => setSelectedSport('FOOTBALL')}
                className={`flex-1 p-3 rounded-lg border ${selectedSport === 'FOOTBALL' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
              >
                <StyledView className="items-center mb-2">
                  <MaterialIcons name="sports-soccer" size={32} color={selectedSport === 'FOOTBALL' ? '#FFFFFF' : '#00BE76'} />
                </StyledView>
                <StyledText className={`text-center font-medium ${selectedSport === 'FOOTBALL' ? 'text-white' : 'text-gray-800'}`}>Football</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </>
        )}

        {/* Wallet selection */}
        <StyledText className="text-lg font-bold mt-4 mb-2">Pay Using</StyledText>
        <StyledView className="flex-row justify-between mb-4">
          <StyledTouchableOpacity
            onPress={() => setWalletType('PERSONAL')}
            disabled={bookingMode === 'TEAM_FULL' || bookingMode === 'TEAM_CHALLENGE'}
            className={`flex-1 mr-2 p-3 rounded-lg border ${
              bookingMode === 'TEAM_FULL' || bookingMode === 'TEAM_CHALLENGE' 
                ? 'bg-gray-200 border-gray-300' 
                : walletType === 'PERSONAL' 
                  ? 'bg-[#00BE76] border-[#00BE76]' 
                  : 'border-gray-300 bg-white'
            }`}
          >
            <StyledText className={`text-center font-medium ${walletType === 'PERSONAL' && bookingMode === 'SELF_FULL' ? 'text-white' : 'text-gray-800'}`}>Personal Wallet</StyledText>
            {walletType === 'PERSONAL' && (
              <StyledText className="text-center text-xs mt-1 text-white">₹{personalBalance}</StyledText>
            )}
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => {
              setWalletType('TEAM');
              // Add a small delay to ensure the UI updates before scrolling
              setTimeout(() => {
                scrollViewRef.current?.scrollTo({ y: 1000, animated: true });
              }, 100);
            }}
            disabled={bookingMode === 'SELF_FULL'}
            className={`flex-1 p-3 rounded-lg border ${bookingMode === 'SELF_FULL' ? 'bg-gray-200 border-gray-300' : walletType === 'TEAM' ? 'bg-[#00BE76] border-[#00BE76]' : 'border-gray-300 bg-white'}`}
          >
            <StyledText className={`text-center font-medium ${walletType === 'TEAM' && bookingMode !== 'SELF_FULL' ? 'text-white' : 'text-gray-800'}`}>Team Wallet</StyledText>
            {walletType === 'TEAM' && (
              <StyledText className="text-center text-xs mt-1 text-white">
                {selectedTeam ? `${selectedTeam} (₹${teams.find(t => t.name === selectedTeam)?.balance ?? 0})` : 'Select Team'}
              </StyledText>
            )}
          </StyledTouchableOpacity>
        </StyledView>

        {(bookingMode === 'TEAM_FULL' || bookingMode === 'TEAM_CHALLENGE') && (
          <StyledText className="text-xs text-gray-500 mb-4">Personal Wallet is unavailable for Team bookings.</StyledText>
        )}

        {bookingMode === 'SELF_FULL' && (
          <StyledText className="text-xs text-gray-500 mb-4">Team Wallet is unavailable for Self bookings.</StyledText>
        )}

        {/* Team dropdown – only for admins */}
        {walletType === 'TEAM' && (
          isAdmin ? (
            <>
              <StyledTouchableOpacity
                onPress={() => setTeamModalVisible(true)}
                className="mb-4 p-3 rounded-lg border border-gray-300 bg-white"
              >
                <StyledText className="text-center text-gray-800 font-medium">
                  {selectedTeam ? `${selectedTeam} (₹${teams.find(t => t.name === selectedTeam)?.balance}) ▾` : 'Select Team Wallet ▾'}
                </StyledText>
              </StyledTouchableOpacity>

              {/* Team selection modal */}
              <Modal
                visible={teamModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setTeamModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={() => setTeamModalVisible(false)}>
                  <StyledView className="flex-1 justify-end bg-black/50">
                    <TouchableWithoutFeedback onPress={() => {}}>
                      <StyledView className="bg-white p-6 rounded-t-xl">
                        <StyledText className="text-lg font-bold mb-4 text-center">Select Team Wallet</StyledText>
                        <StyledView className="h-72">
                          <StyledScrollView className="flex-1" showsVerticalScrollIndicator={true}>
                            {teams.map(team => (
                              <TouchableOpacity
                                key={team.name}
                                onPress={() => {
                                  setSelectedTeam(team.name);
                                  setTeamModalVisible(false);
                                }}
                                className="p-4 mb-2 rounded-lg border border-gray-200"
                              >
                                <StyledText className="text-center text-gray-800 font-medium">
                                  {team.name} (₹{team.balance})
                                </StyledText>
                              </TouchableOpacity>
                            ))}
                          </StyledScrollView>
                        </StyledView>
                      </StyledView>
                    </TouchableWithoutFeedback>
                  </StyledView>
                </TouchableWithoutFeedback>
              </Modal>
            </>
          ) : (
            <StyledText className="text-sm text-red-500 mb-4">
              Team Wallet can be used only by Team Admins.
            </StyledText>
          )
        )}

        {/* Spacing for bottom area */}
        <StyledView style={{ height: 120 }} />
      </StyledScrollView>

      {/* Bottom action button */}
      <StyledView className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <StyledTouchableOpacity
          onPress={handleConfirm}
          disabled={walletType === 'TEAM' && (!isAdmin || bookingMode === 'SELF_FULL' || !selectedTeam)}
          className={`py-4 rounded-lg items-center ${
            walletType === 'TEAM' && (!isAdmin || bookingMode === 'SELF_FULL' || !selectedTeam) ? 'bg-gray-400' : 'bg-[#00BE76]'
          }`}
        >
          <StyledText className="text-white font-bold text-base">
            {payableNow === 0 ? 'Confirm Booking' : `Pay ₹${payableNow}`}
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}