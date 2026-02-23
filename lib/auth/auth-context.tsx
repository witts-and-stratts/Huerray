"use client";

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'brand' | 'creator' | 'admin';
  avatar?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: ( user: User | null ) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>( undefined );

const USER_COOKIE_NAME = 'userData';

function readUserFromCookie(): User | null {
  if ( typeof window === 'undefined' ) {
    return null;
  }

  const userData = Cookies.get( USER_COOKIE_NAME );
  if ( !userData ) {
    return null;
  }

  try {
    return JSON.parse( userData ) as User;
  } catch ( e ) {
    console.error( 'Failed to parse user data:', e );
    Cookies.remove( USER_COOKIE_NAME, { path: '/' } );
    return null;
  }
}

export function AuthProvider( { children }: { children: React.ReactNode; } ) {
  const [ user, setUserState ] = useState<User | null>( readUserFromCookie );
  const isLoading = false;

  // Save user to cookie whenever it changes
  const setUser = ( userData: User | null ) => {
    setUserState( userData );
    if ( userData ) {
      Cookies.set( USER_COOKIE_NAME, JSON.stringify( userData ), {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Changed from 'strict' for better localhost compatibility
        expires: 7,
      } );
    } else {
      Cookies.remove( USER_COOKIE_NAME, { path: '/' } );
    }
  };

  return (
    <AuthContext.Provider value={ { user, setUser, isLoading } }>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext( AuthContext );
  if ( context === undefined ) {
    throw new Error( 'useAuth must be used within an AuthProvider' );
  }
  return context;
}

// Helper to get user display name
export function getUserDisplayName( user: User | null ): string {
  if ( !user ) return 'Guest';
  return `${ user.firstName } ${ user.lastName }`.trim() || user.email;
}
