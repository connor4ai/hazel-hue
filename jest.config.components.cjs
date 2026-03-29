/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  testMatch: [
    '<rootDir>/src/presentation/__tests__/**/*.test.tsx',
    '<rootDir>/src/presentation/__tests__/**/*.test.ts',
  ],
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {
      presets: ['module:@react-native/babel-preset'],
    }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@testing-library/react-native|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|nativewind|react-native-reanimated|react-native-svg|zustand)',
  ],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFiles: [
    '<rootDir>/node_modules/react-native/jest/setup.js',
    '<rootDir>/src/presentation/__tests__/setup.js',
  ],
};
