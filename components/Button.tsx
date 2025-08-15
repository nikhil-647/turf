import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

type ButtonProps = {
  onPress?: () => void;
  children: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export const Button = ({ 
  onPress, 
  children, 
  className = '',
  fullWidth = false,
  disabled = false
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <StyledPressable 
      className={`bg-primary py-4 px-8 rounded-full items-center transition-all
        ${fullWidth ? 'w-full' : ''} 
        ${isPressed ? 'opacity-80 scale-95' : ''} 
        ${disabled ? 'opacity-50' : ''}
        ${className}`}
      onPress={disabled ? undefined : onPress}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => !disabled && setIsPressed(false)}
    >
      <StyledText className="text-white text-lg font-semibold">{children}</StyledText>
    </StyledPressable>
  );
}; 