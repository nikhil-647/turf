import { useRouter, useLocalSearchParams } from 'expo-router';
import { OTPVerification } from '../components/OTPVerification';
import { useAuthStore } from '../lib/stores/auth';
import { useEffect } from 'react';

export default function VerifyOTP() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const { isOTPVerified, setOTPVerified } = useAuthStore();

  useEffect(() => {
    // If OTP is already verified, redirect to home page
    if (isOTPVerified) {
      router.replace('/(tabs)/home');
    }
  }, [isOTPVerified]);

  const handleVerifyOTP = async (otp: string) => {
    try {
      // TODO: Add actual OTP verification logic here
      console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
      
      // Set OTP as verified in the store
      setOTPVerified(true);
      
      // After successful verification, navigate to welcome form if user is new
      // or home page if user already exists
      const isNewUser = true; // TODO: Replace with actual check
      if (isNewUser) {
        router.push('/welcome');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      // TODO: Show error message to user
    }
  };

  return <OTPVerification onVerifyOTP={handleVerifyOTP} phoneNumber={phoneNumber as string} />;
} 