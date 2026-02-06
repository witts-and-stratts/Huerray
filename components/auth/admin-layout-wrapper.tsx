'use client';

import { EmailVerificationBanner } from './email-verification-banner';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper( { children }: AdminLayoutWrapperProps ) {
  return (
    <>
      <EmailVerificationBanner />
      { children }
    </>
  );
}
