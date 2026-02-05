/**
 * JWT Utility functions
 *
 * Provides helper functions for parsing JWT tokens and checking expiration
 * without external dependencies like jwt-decode.
 */

interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

/**
 * Parse a JWT token and return its payload
 *
 * @param token The JWT token string
 * @returns The decoded payload object or null if invalid
 */
export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
};

/**
 * Check if a token is expiring soon
 *
 * @param token The JWT token string
 * @param thresholdSeconds Seconds before expiration to consider "soon" (default: 300s / 5m)
 * @returns True if token is expired or will expire within the threshold
 */
export const isTokenExpiringSoon = (token: string, thresholdSeconds: number = 300): boolean => {
  const payload = parseJwt(token);
  
  // If we can't parse it or it has no expiration, assume it's valid or let the backend handle 401
  if (!payload || !payload.exp) {
    return false;
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiration = payload.exp - currentTime;
  
  return timeUntilExpiration < thresholdSeconds;
};
