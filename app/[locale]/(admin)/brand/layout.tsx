'use client';

import { BrandAuthGuard } from '@/components/auth/brand-auth-guard';
import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { EmailVerificationGate } from '@/components/auth/email-verification-gate';
import { ProfileStatusBanner } from '@/components/auth/profile-status-banner';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { RoleProvider } from '@/contexts/role-context';
import { EmailVerificationProvider } from '@/lib/auth/email-verification-context';
import { PathProvider } from '@/lib/providers/path-provider';

export default function BrandAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  const locale = useLocale();
  const pathname = usePathname();
  const isCompleteProfile = pathname?.includes( '/complete-profile' );

  if ( isCompleteProfile ) {
    return (
      <BrandAuthGuard>
        <RoleProvider>
          <PathProvider basePath={ `/${locale}/brand` }>
            <EmailVerificationProvider>
              <div className="bg-background min-h-screen flex flex-col">
                <EmailVerificationBanner />
                <ProfileStatusBanner role="brand" />
                <EmailVerificationGate className="flex-1 flex flex-col">
                  { children }
                </EmailVerificationGate>
              </div>
            </EmailVerificationProvider>
          </PathProvider>
        </RoleProvider>
      </BrandAuthGuard>
    );
  }

  return (
    <BrandAuthGuard>
      <RoleProvider>
        <PathProvider basePath={ `/${locale}/brand` }>
          { children }
        </PathProvider>
      </RoleProvider>
    </BrandAuthGuard>
  );
}
