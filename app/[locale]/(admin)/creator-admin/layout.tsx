'use client';

import { CreatorAuthGuard } from '@/components/auth/creator-auth-guard';
import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { CreatorSidebar } from '@/components/dashboard/creator-sidebar';
import { RoleProvider } from '@/contexts/role-context';
import { usePathname } from 'next/navigation';

export default function CreatorAdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  const pathname = usePathname();
  const isCompleteProfile = pathname?.includes( '/complete-profile' );

  if ( isCompleteProfile ) {
    return (
      <CreatorAuthGuard>
        <RoleProvider>
          <div className="bg-background min-h-screen flex flex-col">
            <EmailVerificationBanner />
            { children }
          </div>
        </RoleProvider>
      </CreatorAuthGuard>
    );
  }

  return (
    <SidebarProvider data-dashboard-theme='creator'>
      <CreatorAuthGuard>
        <RoleProvider>
          <CreatorSidebar />
          <SidebarInset>
            <EmailVerificationBanner />
            <DashboardHeader />
            <section className='bg-background flex flex-1 flex-col gap-4 overflow-y-auto'>
              { children }
            </section>
          </SidebarInset>
        </RoleProvider>
      </CreatorAuthGuard>
    </SidebarProvider>
  );
}
