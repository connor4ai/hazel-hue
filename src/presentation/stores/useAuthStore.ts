import { create } from 'zustand';
import {
  createCognitoAuthProvider,
  type AuthState,
  type CognitoAuthProvider,
} from '@infrastructure/auth/CognitoAuthProvider';
import { secureStorage } from '@infrastructure/storage/SecureStorage';
import { identifyUser } from '@infrastructure/payments/RevenueCatProvider';

type AuthProvider = 'apple' | 'google' | 'email';

interface AuthStore {
  user: { userId: string; email: string | null } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (provider: AuthProvider, email?: string, password?: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

let authProvider: CognitoAuthProvider | null = null;

function getAuthProvider(): CognitoAuthProvider {
  if (!authProvider) {
    authProvider = createCognitoAuthProvider();
  }
  return authProvider;
}

function syncFromAuthState(state: AuthState) {
  return {
    user: state.isAuthenticated && state.userId
      ? { userId: state.userId, email: state.email }
      : null,
    isAuthenticated: state.isAuthenticated,
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const provider = getAuthProvider();
      await provider.initialize();

      // Listen for auth state changes
      provider.onAuthStateChange(async (state) => {
        set(syncFromAuthState(state));

        // Persist tokens
        if (state.accessToken) {
          await secureStorage.setAuthToken(state.accessToken);
        }
        if (state.userId) {
          await secureStorage.setUserId(state.userId);
          await identifyUser(state.userId);
        }
        if (!state.isAuthenticated) {
          await secureStorage.clearAll();
        }
      });

      const state = await provider.getAuthState();
      set({ ...syncFromAuthState(state), isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  signIn: async (provider, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const auth = getAuthProvider();
      let state: AuthState;

      switch (provider) {
        case 'apple':
          state = await auth.signInWithApple();
          break;
        case 'google':
          state = await auth.signInWithGoogle();
          break;
        case 'email':
          if (!email || !password) throw new Error('Email and password required');
          state = await auth.signInWithEmail(email, password);
          break;
      }

      set({ ...syncFromAuthState(state), isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const auth = getAuthProvider();
      await auth.signUp(email, password);
      // After sign-up, sign in automatically
      const state = await auth.signInWithEmail(email, password);
      set({ ...syncFromAuthState(state), isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const auth = getAuthProvider();
      await auth.signOut();
      await secureStorage.clearAll();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      });
    }
  },

  clearError: () => set({ error: null }),
}));
