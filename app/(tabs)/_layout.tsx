import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
      <Tabs
        screenOptions={{
          header: () => <Header />,
          tabBarActiveTintColor: '#00BE76',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            height: 60 + insets.bottom,
            paddingBottom: 8 + insets.bottom,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />        
        <Tabs.Screen
          name="full-booking"
          options={{
            title: 'Full Booking',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="calendar-today" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="chat" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="teams"
          options={{
            title: 'Team',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="groups" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="pool-booking"
          options={{
            title: 'Pool Booking',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="pool" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
  );
} 