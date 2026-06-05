'use client';

import { useEmailVerification } from '@/lib/auth/email-verification-context';
import { cn } from '@/lib/dashboard-utils';
import type { ReactNode } from 'react';

/**
 * Wraps the main work surface of a dashboard page and makes it fully
 * non-interactive while the user's email is unverified. The verification
 * banner lives OUTSIDE this gate, so it stays usable. The header/sidebar are
 * also left interactive so the user can still log out.
 */
export function EmailVerificationGate( {
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
} ) {
  const { isLocked } = useEmailVerification();

  return (
    <div
      className={ cn(
        className,
        isLocked && 'pointer-events-none select-none opacity-50'
      ) }
      inert={ isLocked }
      aria-hidden={ isLocked || undefined }
    >
      { children }
    </div>
  );
}
