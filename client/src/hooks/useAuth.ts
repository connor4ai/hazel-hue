import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  sessionToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(
    localStorage.getItem('sessionToken')
  );

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest('GET', '/api/auth/me', undefined, {
        Authorization: `Bearer ${token}`
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setSessionToken(token);
      } else {
        localStorage.removeItem('sessionToken');
        setSessionToken(null);
      }
    } catch (error) {
      localStorage.removeItem('sessionToken');
      setSessionToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiRequest('POST', '/api/auth/login', {
      email,
      password
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    setSessionToken(data.sessionToken);
    localStorage.setItem('sessionToken', data.sessionToken);
  };

  const register = async (
    email: string, 
    password: string, 
    confirmPassword: string,
    firstName?: string, 
    lastName?: string
  ) => {
    const response = await apiRequest('POST', '/api/auth/register', {
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    setUser(data.user);
    setSessionToken(data.sessionToken);
    localStorage.setItem('sessionToken', data.sessionToken);
  };

  const logout = async () => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      try {
        await apiRequest('POST', '/api/auth/logout', undefined, {
          Authorization: `Bearer ${token}`
        });
      } catch (error) {
        // Continue with logout even if request fails
      }
    }

    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('sessionToken');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    sessionToken
  };
}

export { AuthContext };