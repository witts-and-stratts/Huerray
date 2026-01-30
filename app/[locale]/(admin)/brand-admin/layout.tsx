'use client';

import { BrandAuthGuard } from '@/components/auth/brand-auth-guard';
import { usePathname } from 'next/navigation';
import { RoleProvider } from '@/contexts/role-context';

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
          <div className="bg-background min-h-screen flex flex-col">
            { children }
          </div>
        </RoleProvider>
      </BrandAuthGuard>
    );
  }

  return (
    <BrandAuthGuard>
      <RoleProvider>
        { children }
      </RoleProvider>
    </BrandAuthGuard>
  );
}
