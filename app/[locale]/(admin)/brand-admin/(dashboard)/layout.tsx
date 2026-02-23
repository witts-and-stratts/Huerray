'use client';

import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
import { ProfileStatusBanner } from '@/components/auth/profile-status-banner';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { BrandSidebar } from '@/components/dashboard/brand-sidebar';

export default function BrandAdminDashboardLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <SidebarProvider data-dashboard-theme='brand'>
      <BrandSidebar />
      <SidebarInset>
        <EmailVerificationBanner />
        <ProfileStatusBanner role="brand" />
        <DashboardHeader />
        { children }
      </SidebarInset>
    </SidebarProvider>
  );
}
