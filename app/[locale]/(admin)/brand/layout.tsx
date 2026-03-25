'use client';

import { BrandAuthGuard } from '@/components/auth/brand-auth-guard';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { RoleProvider } from '@/contexts/role-context';
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
            <div className="bg-background min-h-screen flex flex-col">
              { children }
            </div>
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
