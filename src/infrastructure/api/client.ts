type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

interface ApiError {
  status: number;
  message: string;
  code?: string;
}

let authTokenProvider: (() => Promise<string | null>) | null = null;

/**
 * Register a function that returns the current auth token.
 * Called by CognitoAuthProvider on initialization.
 */
export function setAuthTokenProvider(provider: () => Promise<string | null>) {
  authTokenProvider = provider;
}

/**
 * Core API client with automatic auth token injection.
 */
async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, signal } = options;

  // Inject auth token
  if (authTokenProvider) {
    const token = await authTokenProvider();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal,
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    const error: ApiError = {
      status: response.status,
      message: errorBody.message ?? response.statusText,
      code: errorBody.code,
    };
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(url: string, signal?: AbortSignal) =>
    request<T>(url, { method: 'GET', signal }),

  post: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: 'POST', body }),

  put: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: 'PUT', body }),

  patch: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: 'PATCH', body }),

  delete: <T>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};
