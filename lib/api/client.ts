/**
 * API Client Configuration
 * 
 * This file configures and exports the generated API clients with proper
 * base URL, authentication, and error handling.
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Configuration } from './generated';

// Get base URL from environment variable or use default
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.huerray.de/api/v1';

// Cookie configuration
const COOKIE_NAME = 'authToken';
const REFRESH_COOKIE_NAME = 'refreshToken';
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'lax' as const, // Changed from 'strict' for better localhost compatibility
  expires: 7, // 7 days
};

// Queue for failed requests during token refresh
interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Create an axios instance with authentication and interceptors
 */
export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 120000, // 120 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add authentication token
  instance.interceptors.request.use(
    (config) => {
      // Get token from secure cookie
      const token = getAuthToken();

      // Public paths that don't require authentication
      const PUBLIC_PATHS = [
        '/auth/login',
        '/auth/register',
        '/auth/password-reset', // Covers both init and confirm if subpaths not strictly matched by string
        '/auth/resend-verification',
        '/auth/verify-email',
      ];

      // Detailed public path check (some might be partial matches or exact)
      const isPublicPath = PUBLIC_PATHS.some(path => config.url?.includes(path));
      // Refresh token endpoint requires its own special handling (custom body, often no auth header or a specific one)
      // But usually refresh token endpoint is not authenticated with access token, so we can treat it as public or handle broadly.
      // However, below logic adds Bearer token if not public.
      if (config.url?.includes('/auth/refresh')) {
           return config;
      }

      if (token && !isPublicPath) {
        if ( config.headers && typeof ( config.headers as any ).set === 'function' ) {
            ( config.headers as any ).set( 'Authorization', `Bearer ${ token }` );
        } else {
            config.headers.Authorization = `Bearer ${ token }`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, add to queue
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              if (originalRequest.headers) {
                  if ( typeof ( originalRequest.headers as any ).set === 'function' ) {
                      ( originalRequest.headers as any ).set( 'Authorization', 'Bearer ' + token );
                  } else {
                      originalRequest.headers.Authorization = 'Bearer ' + token;
                  }
              }
              originalRequest._retry = true;
              return instance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            // No refresh token available, clear auth and redirect
            handleAuthFailure();
            return Promise.reject(error);
        }

        try {
          // Call refresh endpoint
          // using axios directly to avoid interceptors loop and to keep it simple
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken
          });

          // Assuming standard response structure where data contains tokens
          // Adjust based on actual API response if needed.
          // The models say ModelsStandardResponse { data: object }
          // We expect data.token or data.accessToken
          const data = response.data.data || response.data;
          const newToken = data.token || data.accessToken || data.access_token;
          const newRefreshToken = data.refresh_token || data.refreshToken;

          if (newToken) {
             setAuthToken(newToken);
             if (newRefreshToken) {
                 setRefreshToken(newRefreshToken);
             }
             
             processQueue(null, newToken);
             
             // Retry original request
             if (originalRequest.headers) {
                  if ( typeof ( originalRequest.headers as any ).set === 'function' ) {
                      ( originalRequest.headers as any ).set( 'Authorization', 'Bearer ' + newToken );
                  } else {
                      originalRequest.headers.Authorization = 'Bearer ' + newToken;
                  }
             }
             return instance(originalRequest);
          } else {
              throw new Error("No token returned from refresh");
          }

        } catch (refreshError: any) {
          processQueue(refreshError, null);
          handleAuthFailure();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other errors
      if (error.response) {
        switch (error.response.status) {
          case 403:
            console.error('Forbidden - insufficient permissions');
            break;
          case 404:
             // Do not log 404s as errors in console always, context dependent, but keeping existing logic
             // console.error('Resource not found');
            break;
          case 500:
            // console.error('Server error');
            break;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Internal helper to handle auth failures
const handleAuthFailure = () => {
    clearAuthToken();
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/signup') || currentPath.startsWith('/auth');
        if (!isAuthPage) {
            window.location.href = '/login';
        }
    }
};

/**
 * Global API client instance
 */
export const apiClient = createApiClient();

/**
 * OpenAPI Configuration
 */
export const apiConfiguration = new Configuration({
  basePath: BASE_URL,
  accessToken: () => getAuthToken() ?? '',
});

/**
 * Helper function to set authentication token in secure cookie
 * Call this after successful login
 * 
 * @param token - The authentication token to store
 * @param rememberMe - Whether to persist the cookie for 7 days
 */
export const setAuthToken = (token: string, rememberMe: boolean = true) => {
  if (typeof window !== 'undefined') {
    const options = {
      ...COOKIE_OPTIONS,
      expires: rememberMe ? 7 : undefined,
    };
    Cookies.set(COOKIE_NAME, token, options);
  }
};

/**
 * Helper function to set refresh token in secure cookie
 * 
 * @param token - The refresh token to store
 * @param rememberMe - Whether to persist the cookie for 7 days
 */
export const setRefreshToken = (token: string, rememberMe: boolean = true) => {
    if (typeof window !== 'undefined') {
      const options = {
        ...COOKIE_OPTIONS,
        expires: rememberMe ? 7 : undefined, 
      };
      Cookies.set(REFRESH_COOKIE_NAME, token, options);
    }
  };

/**
 * Helper function to clear authentication token
 * Call this on logout
 */
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove(COOKIE_NAME);
    Cookies.remove(REFRESH_COOKIE_NAME);
  }
};

/**
 * Helper function to get the current auth token
 * 
 * @returns The current auth token or undefined
 */
export const getAuthToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return Cookies.get(COOKIE_NAME);
  }
  return undefined;
};

/**
 * Helper function to get the current refresh token
 * 
 * @returns The current refresh token or undefined
 */
export const getRefreshToken = (): string | undefined => {
    if (typeof window !== 'undefined') {
      return Cookies.get(REFRESH_COOKIE_NAME);
    }
    return undefined;
  };

/**
 * Helper to check if user is authenticated
 * 
 * @returns True if an auth token exists
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!Cookies.get(COOKIE_NAME);
  }
  return false;
};
