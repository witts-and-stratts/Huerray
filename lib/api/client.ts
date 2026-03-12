/**
 * API Client Configuration
 *
 * This file configures and exports the generated API clients with proper
 * base URL, cookie-based authentication, and error handling.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Configuration } from './generated';
import { toast } from 'sonner';
import { config } from '@/lib/config';

export const BASE_URL = config.api.baseUrl;

// Internal helper to handle auth failures
const handleAuthFailure = () => {
  if (typeof window !== 'undefined') {
    // Clear client-side user data
    Cookies.remove('userData', { path: '/' });
    Cookies.remove('authToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });

    const currentPath = window.location.pathname;
    // Checks for paths starting with /login, /signup, /auth OR /[locale]/login, /[locale]/signup, etc.
    const isAuthPage = /^(?:\/[a-zA-Z]{2})?\/(login|signup|auth)/.test(currentPath);

    if (!isAuthPage) {
      const redirectUrl = encodeURIComponent(currentPath + window.location.search);
      window.location.href = `/login?redirect=${redirectUrl}`;
    }
  }
};

/**
 * Create an axios instance with cookie-based auth and interceptors
 */
export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: config.api.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
    maxRedirects: 0,
    withCredentials: true, // Send cookies with every request
  });

  // Response interceptor for token refresh and error handling
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequestUrl = error.config?.url || '';
      const isAuthEndpoint = originalRequestUrl.includes('/auth/');

      // For authenticated endpoints, a 401 means session is invalid -> log out user.
      if (error.response?.status === 401 && !isAuthEndpoint) {
        if (typeof window !== 'undefined') {
          const method = (error.config?.method || 'GET').toUpperCase();
          const baseURL = error.config?.baseURL || BASE_URL;
          const url = error.config?.url || '';
          const requestUrl = /^https?:\/\//.test(url) ? url : `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
          const backendMessage =
            (error.response.data as { message?: string } | undefined)?.message || error.message || 'Unauthorized';

          console.log(
            `401 detected before logout.\n\nRequest: ${method} ${requestUrl}\nMessage: ${backendMessage}`
          );
        }
        handleAuthFailure();
      }

      // Handle other errors
      if (error.response) {
        switch (error.response.status) {
          case 403:
            console.error( 'Forbidden - insufficient permissions' );
            toast.error( 'You don\t have permission to perform this action', { richColors: true } );
            break;
          case 404:
            break;
          case 500:
            break;
        }
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
