import { useLocalSearchParams, useRouter } from 'expo-router';
import { OTPVerification } from '../components/OTPVerification';

export default function VerifyOTP() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phoneNumber: string }>();
  const phoneNumber = typeof params.phoneNumber === 'string' ? params.phoneNumber : '';

  const handleVerifyOTP = (otp: string) => {
    console.log('Verifying OTP:', otp);
    // Add OTP verification logic here
    // On successful verification, navigate to the next screen
    // router.push('/home');
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', phoneNumber);
    // Add OTP resend logic here
  };

  return (
    <OTPVerification
      phoneNumber={phoneNumber}
      onVerifyOTP={handleVerifyOTP}
      onResendOTP={handleResendOTP}
    />
  );
} 