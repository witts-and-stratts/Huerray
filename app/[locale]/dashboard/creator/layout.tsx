import { CreatorSidebar } from "@/components/dashboard/creator-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';

export default function CreatorDashboardLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <SidebarProvider data-dashboard-theme="creator">
      <CreatorSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          { children }
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
