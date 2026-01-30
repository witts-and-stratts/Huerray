'use client';

import { CreatorAuthGuard } from '@/components/auth/creator-auth-guard';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { CreatorSidebar } from '@/components/dashboard/creator-sidebar';
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
        <div className="bg-background min-h-screen flex flex-col">
          {/* Minimal Header could go here if needed, or just the content */ }
          {/* User requested no searchbar at top, so likely no DashboardHeader. 
               We can just render children. */}
          { children }
        </div>
      </CreatorAuthGuard>
    );
  }

  return (
    <SidebarProvider data-dashboard-theme='creator'>
      <CreatorAuthGuard>
        <CreatorSidebar />
        <SidebarInset>
          <DashboardHeader />
          <section className='bg-background flex flex-1 flex-col gap-4 overflow-y-auto'>
            { children }
          </section>
        </SidebarInset>
      </CreatorAuthGuard>
    </SidebarProvider>
  );
}
