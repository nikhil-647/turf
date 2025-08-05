import { Tabs } from 'expo-router';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
      <Tabs
        screenOptions={{
          header: () => <Header />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray[500],
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
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="chat" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="join-battle"
          options={{
            title: 'Join Battle',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="groups" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="global-chat"
          options={{
            title: 'Find Players',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="sports" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
  );
} 