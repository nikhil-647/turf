import { Drawer } from 'expo-router/drawer';
import { View, Text, Alert } from 'react-native';
import Header from '../components/Header';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { colors } from '../constants/colors';
import { useAuthStore } from '../lib/stores/auth';
import { useRouter } from 'expo-router';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

export default function RootLayout() {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout? You'll need to verify via OTP again to login.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace('/login');
          }
        }
      ]
    );
  };

  // Hide specific routes from appearing in the drawer while keeping them available in the app.
  const hiddenRoutes = ['index', 'login', 'welcome', 'verify-otp', 'booking-summary', 'chat/[userName]'];

  const CustomDrawerContent = (props: any) => {
    const user = useAuthStore((state) => state.user);
    
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

    console.log('user -->', );

    return (
      <DrawerContentScrollView {...filteredProps} contentContainerStyle={{ flex: 1 }}>
        {/* User Avatar & Details */}
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          {/* Placeholder avatar icon until user uploads a profile picture */}
          <MaterialIcons name="account-circle" size={80} color={colors.primary} />
          <Text style={{ fontWeight: 'bold', marginTop: 12, fontSize: 16 }}>
            {user?.user_metadata?.display_name || 'Guest'}
          </Text>
          <Text style={{ color: colors.gray[500] }}>
            {`+${user?.phone}` || 'No phone number'}
          </Text>
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
          backgroundColor: colors.white,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.gray[500],
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
          )
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: () => {
            handleLogout();
            navigation.closeDrawer();
            return false; // Prevents navigation
          }
        })}
      />
    </Drawer>
  );
} 