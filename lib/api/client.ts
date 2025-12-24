/**
 * API Client Configuration
 * 
 * This file configures and exports the generated API clients with proper
 * base URL, authentication, and error handling.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Configuration } from './generated';

// Get base URL from environment variable or use default
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.huerray.de/api/v1';

// Cookie configuration
const COOKIE_NAME = 'authToken';
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'lax' as const, // Changed from 'strict' for better localhost compatibility
  expires: 7, // 7 days
};

/**
 * Create an axios instance with authentication and interceptors
 */
export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add authentication token
  instance.interceptors.request.use(
    (config) => {
      // Get token from secure cookie
      const token = Cookies.get(COOKIE_NAME);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
    (error: AxiosError) => {
      // Handle common errors
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            console.error('Unauthorized access - token may be invalid');
            clearAuthToken();
            // Only redirect if not already on login/signup pages
            if (typeof window !== 'undefined') {
              const currentPath = window.location.pathname;
              const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup');
              if (!isAuthPage) {
                window.location.href = '/login';
              }
            }
            break;
          case 403:
            console.error('Forbidden - insufficient permissions');
            break;
          case 404:
            console.error('Resource not found');
            break;
          case 500:
            console.error('Server error');
            break;
          default:
            console.error('API error:', error.response.status);
        }
      } else if (error.request) {
        console.error('Network error - no response received');
      } else {
        console.error('Request error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
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
});

/**
 * Helper function to set authentication token in secure cookie
 * Call this after successful login
 * 
 * @param token - The authentication token to store
 */
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    Cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  }
};

/**
 * Helper function to clear authentication token
 * Call this on logout
 */
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove(COOKIE_NAME);
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
