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
import { useLocale } from 'next-intl';

export default function AdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  const locale = useLocale();

  return (
    <RoleProvider>
      <PathProvider basePath={ `/${locale}/admin` }>
        <SidebarProvider data-dashboard-theme='brand'>
          <AdminSidebar />
          <SidebarInset>
            <EmailVerificationBanner />
            <DashboardHeader />
            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
              { children }
            </div>
          </SidebarInset>
        </SidebarProvider>
      </PathProvider>
    </RoleProvider>
  );
}
