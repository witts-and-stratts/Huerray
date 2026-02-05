'use client';

import { ReactNode } from 'react';
import { useRole, UserRole } from '@/contexts/role-context';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  excludedRoles?: UserRole[];
}

/**
 * RoleGuard - Conditionally renders children based on user role
 * 
 * @example
 * ```tsx
 * // Show only for brand users
 * <RoleGuard allowedRoles={['brand']}>
 *   <Button>Brand Only Action</Button>
 * </RoleGuard>
 * 
 * // Hide from admins
 * <RoleGuard excludedRoles={['admin']}>
 *   <Button>Not for Admins</Button>
 * </RoleGuard>
 * ```
 */
export function RoleGuard( { children, allowedRoles, excludedRoles }: RoleGuardProps ) {
  const role = useRole();

  // Check if role is excluded
  if ( excludedRoles?.includes( role ) ) {
    return null;
  }

  // Check if role is allowed (if allowedRoles is specified)
  if ( allowedRoles && !allowedRoles.includes( role ) ) {
    return null;
  }

  return <>{ children }</>;
}
