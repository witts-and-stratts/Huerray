'use client';

import { CreatorAuthGuard } from '@/components/auth/creator-auth-guard';
import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { ProfileStatusBanner } from '@/components/auth/profile-status-banner';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { CreatorSidebar } from '@/components/dashboard/creator-sidebar';
import { RoleProvider } from '@/contexts/role-context';
import { usePathname } from 'next/navigation';
import { CreatorBreadcrumbs } from '@/components/creator/creator-breadcrumbs';
import { PathProvider } from '@/lib/providers/path-provider';

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
          <PathProvider basePath="/creator">
            <div className="bg-background min-h-screen flex flex-col">
              <EmailVerificationBanner />
              <ProfileStatusBanner role="creator" />
              <CreatorBreadcrumbs />
              { children }
            </div>
          </PathProvider>
        </RoleProvider>
      </CreatorAuthGuard>
    );
  }

  return (
    <SidebarProvider data-dashboard-theme='creator'>
      <CreatorAuthGuard>
        <RoleProvider>
          <PathProvider basePath="/creator">
            <CreatorSidebar />
            <SidebarInset>
              <EmailVerificationBanner />
              <ProfileStatusBanner role="creator" />
              <DashboardHeader />
              <CreatorBreadcrumbs />
              { children }
            </SidebarInset>
          </PathProvider>
        </RoleProvider>
      </CreatorAuthGuard>
    </SidebarProvider>
  );
}
