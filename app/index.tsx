import { useRouter, Redirect } from 'expo-router';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { useAuthStore } from '../lib/stores/auth';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isOTPVerified, phoneNumber } = useAuthStore();

  // If user is authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  // If phone number is verified with OTP, redirect to login
  if (isOTPVerified && phoneNumber) {
    return <Redirect href="/login" />;
  }

  const handleGetStarted = () => {
    router.push('/login');
  };

  return <WelcomeScreen onGetStarted={handleGetStarted} />;
} 