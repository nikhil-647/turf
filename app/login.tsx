import { useRouter } from 'expo-router';
import { LoginScreen } from '../components/Login';

export default function Login() {
  const router = useRouter();

  const handleSendOTP = (mobileNo: string) => {
    console.log('Sending OTP to:', mobileNo);
    // Add OTP sending logic here
    router.push({
      pathname: '/verify-otp',
      params: { phoneNumber: mobileNo }
    });
  };

  return <LoginScreen onSendOTP={handleSendOTP} />;
} 