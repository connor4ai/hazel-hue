import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEYS = {
  AUTH_TOKEN: 'hazel_hue_auth_token',
  REFRESH_TOKEN: 'hazel_hue_refresh_token',
  USER_ID: 'hazel_hue_user_id',
  ANONYMOUS_SESSION: 'hazel_hue_anon_session',
} as const;

/**
 * Secure storage wrapper using Expo SecureStore (Keychain on iOS, EncryptedSharedPreferences on Android).
 * Falls back to in-memory storage on web.
 */

const memoryStore = new Map<string, string>();

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    memoryStore.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return memoryStore.get(key) ?? null;
  }
  return SecureStore.getItemAsync(key);
}

async function removeItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    memoryStore.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const secureStorage = {
  setAuthToken: (token: string) => setItem(KEYS.AUTH_TOKEN, token),
  getAuthToken: () => getItem(KEYS.AUTH_TOKEN),
  removeAuthToken: () => removeItem(KEYS.AUTH_TOKEN),

  setRefreshToken: (token: string) => setItem(KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => getItem(KEYS.REFRESH_TOKEN),
  removeRefreshToken: () => removeItem(KEYS.REFRESH_TOKEN),

  setUserId: (userId: string) => setItem(KEYS.USER_ID, userId),
  getUserId: () => getItem(KEYS.USER_ID),
  removeUserId: () => removeItem(KEYS.USER_ID),

  setAnonymousSession: (sessionId: string) => setItem(KEYS.ANONYMOUS_SESSION, sessionId),
  getAnonymousSession: () => getItem(KEYS.ANONYMOUS_SESSION),
  removeAnonymousSession: () => removeItem(KEYS.ANONYMOUS_SESSION),

  clearAll: async () => {
    await Promise.all([
      removeItem(KEYS.AUTH_TOKEN),
      removeItem(KEYS.REFRESH_TOKEN),
      removeItem(KEYS.USER_ID),
      removeItem(KEYS.ANONYMOUS_SESSION),
    ]);
  },
};
