import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Transaction = {
  id: string;
  type: 'recharge' | 'group' | 'booking';
  amount: number;
  description: string;
  date: string;
  icon: string;
};

// Mock data for transactions - in real app, this would come from an API
const allTransactions: Transaction[] = [
  {
    id: '1',
    type: 'recharge',
    amount: 500,
    description: '+500 added to wallet',
    date: '2024-03-20',
    icon: '⚡️'
  },
  {
    id: '2',
    type: 'group',
    amount: -100,
    description: '-100 added into Cricket Scorpion group',
    date: '2024-03-19',
    icon: '🏏'
  },
  {
    id: '3',
    type: 'booking',
    amount: -700,
    description: '-700 for turf booking at 7PM–8PM on 19 Mar 2024',
    date: '2024-03-18',
    icon: '🏟️'
  },
  {
    id: '4',
    type: 'recharge',
    amount: 1000,
    description: '+1000 added to wallet',
    date: '2024-03-17',
    icon: '⚡️'
  },
  {
    id: '5',
    type: 'group',
    amount: -150,
    description: '-150 added into Football Warriors group',
    date: '2024-03-16',
    icon: '⚽'
  },
  {
    id: '6',
    type: 'booking',
    amount: -800,
    description: '-800 for turf booking at 6PM–7PM on 16 Mar 2024',
    date: '2024-03-15',
    icon: '🏟️'
  },
  {
    id: '7',
    type: 'recharge',
    amount: 2000,
    description: '+2000 added to wallet',
    date: '2024-03-14',
    icon: '⚡️'
  },
  {
    id: '8',
    type: 'group',
    amount: -200,
    description: '-200 added into Cricket Masters group',
    date: '2024-03-13',
    icon: '🏏'
  },
  {
    id: '9',
    type: 'booking',
    amount: -900,
    description: '-900 for turf booking at 8PM–9PM on 13 Mar 2024',
    date: '2024-03-12',
    icon: '🏟️'
  },
  {
    id: '10',
    type: 'recharge',
    amount: 1500,
    description: '+1500 added to wallet',
    date: '2024-03-11',
    icon: '⚡️'
  },
  {
    id: '11',
    type: 'group',
    amount: -250,
    description: '-250 added into Football Legends group',
    date: '2024-03-10',
    icon: '⚽'
  },
  {
    id: '12',
    type: 'booking',
    amount: -750,
    description: '-750 for turf booking at 5PM–6PM on 10 Mar 2024',
    date: '2024-03-09',
    icon: '🏟️'
  },
  {
    id: '13',
    type: 'recharge',
    amount: 3000,
    description: '+3000 added to wallet',
    date: '2024-03-08',
    icon: '⚡️'
  },
  {
    id: '14',
    type: 'group',
    amount: -300,
    description: '-300 added into Cricket Titans group',
    date: '2024-03-07',
    icon: '🏏'
  },
  {
    id: '15',
    type: 'booking',
    amount: -1000,
    description: '-1000 for turf booking at 7PM–8PM on 07 Mar 2024',
    date: '2024-03-06',
    icon: '🏟️'
  }
];

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isCredit = transaction.amount > 0;
  
  return (
    <StyledView className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
      <StyledText className="text-2xl mr-3">{transaction.icon}</StyledText>
      <StyledView className="flex-1">
        <StyledText className="text-base font-medium text-gray-800">
          {transaction.description}
        </StyledText>
        <StyledText className="text-sm text-gray-500">{transaction.date}</StyledText>
      </StyledView>
      <StyledText 
        className={`text-base font-semibold ${
          isCredit ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isCredit ? '+' : ''}{transaction.amount}
      </StyledText>
    </StyledView>
  );
};

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currentBalance = 2150; // Updated balance based on transactions
  const [displayedTransactions, setDisplayedTransactions] = React.useState<Transaction[]>(
    allTransactions.slice(0, 10)
  );
  const [page, setPage] = React.useState(1);
  const transactionsPerPage = 10;

  const handleRecharge = () => {
    // TODO: Implement recharge functionality
    console.log('Recharge wallet');
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * transactionsPerPage;
    setDisplayedTransactions(allTransactions.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  const hasMoreTransactions = displayedTransactions.length < allTransactions.length;

  const LoadMoreButton = () => {
    if (!hasMoreTransactions) return null;

    return (
      <StyledTouchableOpacity
        className="bg-gray-100 py-3 px-6 rounded-full mx-4 mb-4"
        onPress={handleLoadMore}
      >
        <StyledText className="text-gray-700 text-center font-medium">
          Load More Transactions
        </StyledText>
      </StyledTouchableOpacity>
    );
  };

  return (
    <StyledView 
      className="flex-1 bg-gray-50"
    >
      {/* Header */}
      <StyledView className="px-4 py-4 bg-white shadow-sm">
        <StyledText className="text-base text-gray-600 mb-2">Current Balance</StyledText>
        <StyledView className="flex-row items-center">
          <MaterialIcons name="account-balance-wallet" size={24} color="#00BE76" />
          <StyledText className="text-3xl font-bold text-gray-800 ml-2">
            ₹{currentBalance}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Recharge Button */}
      <StyledView className="px-4 py-4">
        <StyledTouchableOpacity
          className="bg-[#00BE76] py-3 rounded-full"
          onPress={handleRecharge}
        >
          <StyledText className="text-white text-center font-semibold text-lg">
            Recharge Wallet
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Transaction History */}
      <StyledView className="flex-1 px-4">
        <StyledText className="text-base font-semibold text-gray-700 mb-4">
          Transaction History
        </StyledText>
        
        <FlatList
          data={displayedTransactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={LoadMoreButton}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
      </StyledView>
    </StyledView>
  );
} 