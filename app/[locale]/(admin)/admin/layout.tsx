'use client';

import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { AdminSidebar } from '@/components/dashboard/admin-sidebar';
import { RoleProvider } from '@/contexts/role-context';
import { PathProvider } from '@/lib/providers/path-provider';

export default function AdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <RoleProvider>
      <PathProvider basePath='/admin'>
        <SidebarProvider data-dashboard-theme='brand'>
          <AdminSidebar />
          <SidebarInset>
            <EmailVerificationBanner />
            <DashboardHeader />
            { children }
          </SidebarInset>
        </SidebarProvider>
      </PathProvider>
    </RoleProvider>
  );
}
