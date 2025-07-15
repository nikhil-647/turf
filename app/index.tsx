import { useRouter } from 'expo-router';
import { WelcomeScreen } from '../components/WelcomeScreen';

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return <WelcomeScreen onGetStarted={handleGetStarted} />;
} 