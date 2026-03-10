import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import { setAuthTokenProvider } from '@infrastructure/api/client';
import { secureStorage } from '@infrastructure/storage/SecureStorage';
import ENV from '@config/env';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  idToken: string | null;
  accessToken: string | null;
}

export interface CognitoAuthProvider {
  initialize(): Promise<void>;
  signInWithApple(): Promise<AuthState>;
  signInWithGoogle(): Promise<AuthState>;
  signInWithEmail(email: string, password: string): Promise<AuthState>;
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  getAuthState(): Promise<AuthState>;
  getAccessToken(): Promise<string | null>;
  onAuthStateChange(callback: (state: AuthState) => void): () => void;
}

const EMPTY_STATE: AuthState = {
  isAuthenticated: false,
  userId: null,
  email: null,
  idToken: null,
  accessToken: null,
};

function stateFromSession(session: CognitoUserSession, email: string): AuthState {
  const idToken = session.getIdToken();
  return {
    isAuthenticated: true,
    userId: idToken.payload.sub as string,
    email,
    idToken: idToken.getJwtToken(),
    accessToken: session.getAccessToken().getJwtToken(),
  };
}

export function createCognitoAuthProvider(): CognitoAuthProvider {
  const userPool = new CognitoUserPool({
    UserPoolId: ENV.COGNITO_USER_POOL_ID,
    ClientId: ENV.COGNITO_CLIENT_ID,
  });

  let currentState: AuthState = { ...EMPTY_STATE };
  const listeners = new Set<(state: AuthState) => void>();

  function setState(state: AuthState) {
    currentState = state;
    listeners.forEach((cb) => cb(state));
  }

  async function persistTokens(state: AuthState) {
    if (state.accessToken) {
      await secureStorage.setAuthToken(state.accessToken);
    }
    if (state.userId) {
      await secureStorage.setUserId(state.userId);
    }
  }

  // Cognito Hosted UI endpoints for federated auth
  const cognitoDomain = `${ENV.COGNITO_USER_POOL_ID.split('_')[0]}.auth.${ENV.COGNITO_REGION}.amazoncognito.com`;
  const hostedUiDiscovery = {
    authorizationEndpoint: `https://${cognitoDomain}/oauth2/authorize`,
    tokenEndpoint: `https://${cognitoDomain}/oauth2/token`,
  };

  const provider: CognitoAuthProvider = {
    async initialize() {
      setAuthTokenProvider(() => provider.getAccessToken());

      // Try to restore existing Cognito session
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        try {
          const session = await new Promise<CognitoUserSession>((resolve, reject) => {
            cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
              if (err || !session) return reject(err ?? new Error('No session'));
              resolve(session);
            });
          });

          if (session.isValid()) {
            const email = (session.getIdToken().payload.email as string) ?? '';
            const state = stateFromSession(session, email);
            await persistTokens(state);
            setState(state);
            return;
          }
        } catch {
          // Session expired or invalid — fall through to unauthenticated
        }
      }

      // Check for stored token (from federated auth)
      const storedToken = await secureStorage.getAuthToken();
      const storedUserId = await secureStorage.getUserId();
      if (storedToken && storedUserId) {
        setState({
          isAuthenticated: true,
          userId: storedUserId,
          email: null,
          idToken: null,
          accessToken: storedToken,
        });
      }
    },

    async signInWithApple() {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple Sign-In failed: no identity token');
      }

      // Exchange Apple authorization code with Cognito Hosted UI token endpoint
      const response = await fetch(hostedUiDiscovery.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: ENV.COGNITO_CLIENT_ID,
          code: credential.authorizationCode ?? '',
          redirect_uri: AuthSession.makeRedirectUri(),
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange Apple token with Cognito');
      }

      const tokens = await response.json();
      const state: AuthState = {
        isAuthenticated: true,
        userId: credential.user,
        email: credential.email ?? null,
        idToken: tokens.id_token ?? null,
        accessToken: tokens.access_token,
      };

      await persistTokens(state);
      setState(state);
      return state;
    },

    async signInWithGoogle() {
      const redirectUri = AuthSession.makeRedirectUri();
      const request = new AuthSession.AuthRequest({
        clientId: ENV.COGNITO_CLIENT_ID,
        redirectUri,
        scopes: ['openid', 'email', 'profile'],
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          identity_provider: 'Google',
        },
      });

      const result = await request.promptAsync(hostedUiDiscovery);

      if (result.type !== 'success' || !result.params.code) {
        throw new Error('Google Sign-In cancelled');
      }

      // Exchange authorization code for tokens
      const tokenResponse = await fetch(hostedUiDiscovery.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: ENV.COGNITO_CLIENT_ID,
          code: result.params.code,
          redirect_uri: redirectUri,
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange Google token');
      }

      const tokens = await tokenResponse.json();

      // Decode the ID token to get user info (header.payload.signature)
      const idPayload = JSON.parse(atob(tokens.id_token.split('.')[1]));

      const state: AuthState = {
        isAuthenticated: true,
        userId: idPayload.sub,
        email: idPayload.email ?? null,
        idToken: tokens.id_token,
        accessToken: tokens.access_token,
      };

      await persistTokens(state);
      setState(state);
      return state;
    },

    async signInWithEmail(email: string, password: string) {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const session = await new Promise<CognitoUserSession>((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (session) => resolve(session),
          onFailure: (err) => reject(err),
        });
      });

      const state = stateFromSession(session, email);
      await persistTokens(state);
      setState(state);
      return state;
    },

    async signUp(email: string, password: string) {
      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
      ];

      await new Promise<void>((resolve, reject) => {
        userPool.signUp(email, password, attributes, [], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    },

    async signOut() {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
      }
      await secureStorage.clearAll();
      setState({ ...EMPTY_STATE });
    },

    async getAuthState() {
      return currentState;
    },

    async getAccessToken() {
      // Try to refresh token from Cognito session
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        try {
          const session = await new Promise<CognitoUserSession>((resolve, reject) => {
            cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
              if (err || !session) return reject(err ?? new Error('No session'));
              resolve(session);
            });
          });
          if (session.isValid()) {
            return session.getAccessToken().getJwtToken();
          }
        } catch {
          // Fall through to stored token
        }
      }
      return currentState.accessToken;
    },

    onAuthStateChange(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };

  return provider;
}
