'use client';

import { BrandAuthGuard } from '@/components/auth/brand-auth-guard';
import { usePathname } from 'next/navigation';
import { RoleProvider } from '@/contexts/role-context';
import { PathProvider } from '@/lib/providers/path-provider';

export default function BrandAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  const pathname = usePathname();
  const isCompleteProfile = pathname?.includes( '/complete-profile' );

  if ( isCompleteProfile ) {
    return (
      <BrandAuthGuard>
        <RoleProvider>
          <PathProvider basePath="/brand">
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
        <PathProvider basePath="/brand">
          { children }
        </PathProvider>
      </RoleProvider>
    </BrandAuthGuard>
  );
}
