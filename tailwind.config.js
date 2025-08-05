/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00BE76',
        'primary-light': 'rgba(0, 190, 118, 0.1)',
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
      },
    },
  },
  plugins: [],
};
