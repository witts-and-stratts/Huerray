'use client';

import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { AdminSidebar } from '@/components/dashboard/admin-sidebar';
import { RoleProvider } from '@/contexts/role-context';

export default function AdminLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <RoleProvider>
      <SidebarProvider data-dashboard-theme='brand'>
        <AdminSidebar />
        <SidebarInset>
          <DashboardHeader />
          <section className='bg-background flex flex-1 flex-col gap-4 overflow-y-auto'>
            { children }
          </section>
        </SidebarInset>
      </SidebarProvider>
    </RoleProvider>
  );
}
