'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { getAuthToken } from '@/lib/api/client';
import { parseJwt } from '@/lib/utils/jwt';

export type UserRole = 'admin' | 'brand' | 'creator';

interface RoleContextValue {
  role: UserRole;
}

const RoleContext = createContext<RoleContextValue | undefined>( undefined );

interface RoleProviderProps {
  children: ReactNode;
}

/**
 * Maps backend user_type to frontend UserRole
 * Backend uses: admin_user, brand_user, creator_user
 * Frontend uses: admin, brand, creator
 */
const mapUserTypeToRole = ( userType: string ): UserRole | null => {
  switch ( userType ) {
    case 'admin_user':
      return 'admin';
    case 'brand_user':
      return 'brand';
    case 'creator':
      return 'creator';
    default:
      return null;
  }
};

export function RoleProvider( { children }: RoleProviderProps ) {
  const [ role, setRole ] = useState<UserRole>( 'brand' ); // Default fallback

  useEffect( () => {
    const token = getAuthToken();

    if ( token ) {
      const payload = parseJwt( token );

      if ( payload ) {
        const userType = payload.user_type;

        if ( userType ) {
          const mappedRole = mapUserTypeToRole( userType );

          if ( mappedRole ) {
            setRole( mappedRole );
          } else {
            console.warn( '[RoleProvider] Invalid user_type in JWT:', userType );
          }
        } else {
          console.warn( '[RoleProvider] No user_type found in JWT token' );
        }
      }
    }
  }, [] );

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
