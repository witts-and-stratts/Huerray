'use client';

import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { EmailVerificationGate } from '@/components/auth/email-verification-gate';
import { ProfileStatusBanner } from '@/components/auth/profile-status-banner';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { BrandSidebar } from '@/components/dashboard/brand-sidebar';
import { EmailVerificationProvider } from '@/lib/auth/email-verification-context';

export default function BrandAdminDashboardLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <EmailVerificationProvider>
      <SidebarProvider data-dashboard-theme='brand'>
        <BrandSidebar />
        <SidebarInset>
          <EmailVerificationBanner />
          <ProfileStatusBanner role="brand" />
          <DashboardHeader />
          <EmailVerificationGate className="flex-1 overflow-y-auto min-h-0 flex flex-col">
            { children }
          </EmailVerificationGate>
        </SidebarInset>
      </SidebarProvider>
    </EmailVerificationProvider>
  );
}
