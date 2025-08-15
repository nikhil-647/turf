export const validateDisplayName = (name: string): { isValid: boolean; error?: string } => {
  if (!name.trim()) {
    return { isValid: false, error: 'Display name is required' };
  }
  
  if (name.includes(' ')) {
    return { isValid: false, error: 'Display name should not contain spaces' };
  }

  return { isValid: true };
};

export const validateEmail = (email: string | undefined): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: true }; // Email is optional
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};
