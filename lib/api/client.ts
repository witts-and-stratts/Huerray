/**
 * API Client Configuration
 * 
 * This file configures and exports the generated API clients with proper
 * base URL, authentication, and error handling.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { Configuration } from './generated';

// Get base URL from environment variable or use default
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.huerray.de/api/v1';

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
      // Get token from localStorage or your auth state management
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('authToken') 
        : null;

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
            // Unauthorized - redirect to login or refresh token
            console.error('Unauthorized access - token may be invalid');
            // You can add your auth logic here
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
 * Helper function to set authentication token
 * Call this after successful login
 */
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

/**
 * Helper function to clear authentication token
 * Call this on logout
 */
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

/**
 * Helper to check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('authToken');
  }
  return false;
};
