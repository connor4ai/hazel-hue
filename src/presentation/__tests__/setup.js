// Define React Native globals needed in test environment
globalThis.__DEV__ = true;

// Mock react-native-reanimated if imported
jest.mock('react-native-reanimated', () => ({
  default: { call: () => {} },
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn(() => ({})),
  withTiming: jest.fn((v) => v),
  withSpring: jest.fn((v) => v),
  withSequence: jest.fn(),
  withDelay: jest.fn(),
  Easing: { linear: jest.fn(), inOut: jest.fn() },
  FadeIn: { duration: jest.fn().mockReturnThis() },
  FadeOut: { duration: jest.fn().mockReturnThis() },
}));

// Mock expo modules commonly needed
jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
