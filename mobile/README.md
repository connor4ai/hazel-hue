# HueMatcher Mobile App

AI-powered personal color analysis mobile application built with React Native and Expo.

## Features

- **Camera Integration**: Take photos directly in the app with guided instructions
- **Photo Upload**: Select photos from device gallery
- **AI Color Analysis**: Professional 12-season color analysis
- **Interactive Color Palette**: Complete 64-color palette with copy-to-clipboard functionality
- **Style Guidance**: Personalized clothing, makeup, and accessory recommendations
- **Mobile Optimized**: Native iOS and Android experience

## Getting Started

### Prerequisites

- Node.js 16 or later
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on Devices

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web (for testing)
```bash
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── screens/           # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── UploadScreen.tsx
│   └── components/        # Reusable components
│       └── ColorPalette.tsx
├── App.tsx               # Main app component
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## Key Features

### Camera Integration
- Real-time camera with overlay guides
- Front/back camera switching
- Photo capture with quality optimization
- Permission handling

### Photo Management
- Multiple photo selection
- Image preview and management
- Photo requirements validation
- Gallery integration

### Color Analysis
- Mock True Winter analysis results
- Interactive color swatches
- Copy-to-clipboard functionality
- Haptic feedback

### Navigation
- Tab-based navigation
- Stack navigation for flows
- Deep linking support

## Development

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add navigation route in `App.tsx`
3. Implement screen-specific logic and UI

### Styling
- Uses React Native Paper for consistent theming
- Custom color scheme matching web app
- Responsive design for different screen sizes

### State Management
- Local state management with React hooks
- Future: Integration with Redux or Zustand for complex state

## Integration with Web Backend

The mobile app is designed to integrate with the existing web backend:

- API endpoints for color analysis
- User authentication
- Order management
- Result storage

### API Integration (Future)
```typescript
// Example API service
const apiService = {
  startAnalysis: async (photos: string[], email: string) => {
    // Upload photos and start analysis
  },
  getResults: async (orderId: string) => {
    // Fetch analysis results
  },
  saveResults: async (results: any) => {
    // Save results to user profile
  }
};
```

## Building for Production

### iOS
1. Configure iOS bundle identifier in `app.json`
2. Run: `expo build:ios`
3. Upload to App Store Connect

### Android
1. Configure Android package name in `app.json`
2. Run: `expo build:android`
3. Upload to Google Play Console

## Future Enhancements

- Push notifications for analysis completion
- Offline mode for viewing saved results
- Social sharing features
- Advanced color customization
- Integration with e-commerce platforms
- Apple Wallet integration for color cards

## Dependencies

### Core
- React Native 0.72.3
- Expo ~49.0.10
- React Navigation 6.x

### UI Components
- React Native Paper 5.x
- React Native Vector Icons
- Expo Linear Gradient

### Camera & Media
- Expo Camera
- Expo Image Picker
- Expo File System

### Utilities
- Expo Clipboard
- Expo Haptics
- Expo Sharing

## License

This project is part of the HueMatcher application suite.