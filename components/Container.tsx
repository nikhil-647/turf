import { SafeAreaView } from 'react-native';
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledSafeAreaView className="flex-1 m-6">{children}</StyledSafeAreaView>;
};
