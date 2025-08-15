import { useRouter, Redirect } from 'expo-router';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { useAuthStore } from '../lib/stores/auth';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If user is authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  const handleGetStarted = () => {
    router.push('/login');
  };

  return <WelcomeScreen onGetStarted={handleGetStarted} />;
} 