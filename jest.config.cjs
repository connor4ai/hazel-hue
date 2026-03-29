/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        types: ['jest'],
        baseUrl: '.',
        paths: {
          '@domain/*': ['src/domain/*'],
          '@application/*': ['src/application/*'],
          '@infrastructure/*': ['src/infrastructure/*'],
          '@presentation/*': ['src/presentation/*'],
          '@config/*': ['src/config/*'],
        },
      },
    }],
  },
  testMatch: ['<rootDir>/src/{domain,application}/**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
};
