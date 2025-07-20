import { useRouter, useLocalSearchParams } from 'expo-router';
import { OTPVerification } from '../components/OTPVerification';

export default function VerifyOTP() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();

  const handleVerifyOTP = (otp: string) => {
    console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
    // Add OTP verification logic here
    
    // After successful verification, navigate to welcome form
    router.push('/welcome');
  };

  return <OTPVerification onVerifyOTP={handleVerifyOTP} phoneNumber={phoneNumber as string} />;
} 