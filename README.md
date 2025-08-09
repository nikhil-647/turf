# Sports Facility Booking App

A React Native mobile application built with Expo for booking sports facilities, managing teams, and connecting players. The app provides a comprehensive platform for sports enthusiasts to book facilities, join games, and communicate with other players.

## 🌟 Features

### 1. Authentication & User Management
- Phone number-based authentication
- OTP verification system
- User profile management
- Wallet system for payments

### 2. Facility Booking System
- Full facility booking
- Interactive slot selection
- Real-time availability checking
- Booking summary and confirmation
- Multiple booking modes:
  - Self booking (full facility)
  - Team booking (full facility)
  - Team challenge mode

### 3. Social & Communication Features
- Private chat system
- Global chat for finding players
- Team formation and management
- Player requests and team joining
- Battle/Challenge system for teams

### 4. Facility Features & Amenities
- Indoor turf
- LED lights
- Free parking
- Water facilities
- Washrooms
- Sports equipment
- UPI and card payments accepted

## 📱 App Structure

The app follows a tab-based navigation structure with a drawer menu for additional options:

### Main Tabs
- Home: Facility overview and quick booking
- Full Booking: Detailed booking interface
- Chats: Private conversations
- Join Battle: Team challenges
- Find Players: Global player discovery

### Drawer Menu
- Home
- Account
- Your Bookings
- Wallet
- Support
- Terms & Privacy

## 🛠 Technical Stack

- React Native
- Expo Router for navigation
- Firebase (Authentication & Real-time Database)
- NativeWind (Tailwind CSS for React Native)
- Expo Vector Icons
- React Native Safe Area Context

## 📂 Project Structure

```
my-expo-app/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based screens
│   ├── chat/              # Chat-related screens
│   └── ...                # Other app screens
├── components/            # Reusable components
│   ├── chat/             # Chat-specific components
│   └── ...               # Other components
├── constants/            # App constants
└── assets/              # Images and other static assets
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

## 📱 Key Screens

1. **Welcome Screen**: Initial app introduction
2. **Login**: Phone number authentication
3. **Home**: Facility overview and quick booking
4. **Full Booking**: Detailed booking interface
5. **Chat System**: Private and global chat features
6. **Booking Summary**: Confirmation and payment
7. **Your Bookings**: Booking history and management

## 🔐 Security Features

- Phone number verification
- Secure payment integration
- Protected chat system
- User data privacy

## 🎨 UI/UX Features

- Modern, clean interface
- Intuitive booking flow
- Real-time updates
- Interactive calendars
- Smooth animations
- Responsive design

## 📋 Booking Process

1. Recharge wallet
2. Select slot timing
3. Book your slot
4. Enjoy your game

## 🔄 State Management

The app uses React's built-in state management along with context for global state handling:
- User authentication state
- Booking information
- Chat messages
- Wallet balance

## 🌐 Network Features

- Real-time chat updates
- Live booking status
- Instant notifications
- Offline support

This README provides a comprehensive overview of the sports facility booking application. For more detailed information about specific features or technical implementation, please refer to the corresponding files in the codebase.
