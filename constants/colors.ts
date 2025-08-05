export const colors = {
  primary: '#00BE76',
  primaryLight: 'rgba(0, 190, 118, 0.1)', // equivalent to #00BE76/10
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    200: '#E5E7EB',
    500: '#6B7280',
    600: '#4B5563',
    800: '#1F2937',
  },
  red: {
    500: '#EF4444',
  },
} as const;

// Type for our colors object to ensure type safety
export type Colors = typeof colors; 