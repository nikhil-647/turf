import { Drawer } from 'expo-router/drawer';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export default function RootLayout() {
  // Hide specific routes from appearing in the drawer while keeping them available in the app.
  const hiddenRoutes = ['index', 'login', 'welcome', 'verify-otp', 'booking-summary', 'chat/[userName]'];

  const CustomDrawerContent = (props: any) => {
    // Filter out unwanted routes for the drawer list
    const filteredRoutes = props.state.routes.filter((route: any) => !hiddenRoutes.includes(route.name));
    const filteredRouteNames = filteredRoutes.map((route: any) => route.name);

    // Figure out the currently focused route *after* filtering.
    const currentRouteKey = props.state.routes[props.state.index]?.key;
    const newIndex = filteredRoutes.findIndex((r: any) => r.key === currentRouteKey);

    const filteredProps = {
      ...props,
      state: {
        ...props.state,
        index: newIndex === -1 ? 0 : newIndex, // default to first if current route is hidden
        routeNames: filteredRouteNames,
        routes: filteredRoutes,
      },
    };

    return (
      <DrawerContentScrollView {...filteredProps} contentContainerStyle={{ flex: 1 }}>
        {/* User Avatar & Details */}
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          {/* Placeholder avatar icon until user uploads a profile picture */}
          <MaterialIcons name="account-circle" size={80} color="#00BE76" />
          <Text style={{ fontWeight: 'bold', marginTop: 12, fontSize: 16 }}>User Name</Text>
          <Text style={{ color: '#6B7280' }}>+91 9876543210</Text>
        </View>

        {/* Drawer items */}
        <DrawerItemList {...filteredProps} />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer
      screenOptions={({ route }) => ({
        // Hide header for specific routes (welcome, login, OTP, etc.)
        headerShown: !hiddenRoutes.includes(route.name),
        header: () => <Header />,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
        },
        drawerActiveTintColor: '#00BE76',
        drawerInactiveTintColor: '#6B7280',
      })}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          headerShown: false, // Tabs layout includes its own header component
        }}
      />
      <Drawer.Screen
        name="account"
        options={{
          drawerLabel: 'Account',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="your-booking"
        options={{
          drawerLabel: 'Your Booking',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="event-note" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="wallet"
        options={{
          drawerLabel: 'Wallet',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="account-balance-wallet" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="support"
        options={{
          drawerLabel: 'Support',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="support-agent" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          drawerLabel: 'Privacy Policy',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="policy" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="terms-of-use"
        options={{
          drawerLabel: 'Terms of Use',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="gavel" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          drawerLabel: 'Logout',
          drawerIcon: ({ color }) => (
            <MaterialIcons name="logout" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
} 