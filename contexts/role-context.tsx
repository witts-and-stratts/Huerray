'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/lib/auth/auth-context';

export type UserRole = 'admin' | 'brand' | 'creator';

interface RoleContextValue {
  role: UserRole;
}

const RoleContext = createContext<RoleContextValue | undefined>( undefined );

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider( { children }: RoleProviderProps ) {
  const { user } = useAuth();
  const role: UserRole = user?.role ?? 'brand'; // Default fallback

  return (
    <RoleContext.Provider value={ { role } }>
      { children }
    </RoleContext.Provider>
  );
}

export function useRole(): UserRole {
  const context = useContext( RoleContext );
  if ( context === undefined ) {
    throw new Error( 'useRole must be used within a RoleProvider' );
  }
  return context.role;
}
