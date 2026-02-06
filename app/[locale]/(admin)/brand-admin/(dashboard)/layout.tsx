'use client';

import { EmailVerificationBanner } from '@/components/auth/email-verification-banner';
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
        <DashboardHeader />
        <section className='bg-background flex flex-1 flex-col gap-4 overflow-y-auto'>
          { children }
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
