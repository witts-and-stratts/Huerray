"use client";

import { SidebarInset, SidebarProvider } from "@/components/dashboard-ui/sidebar";
import { useAuth } from "@/lib/auth/auth-context";
import { BrandSidebar } from "@/components/dashboard/brand-sidebar";
import { CreatorSidebar } from "@/components/dashboard/creator-sidebar";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

export function DashboardLayoutClient( { children }: { children: React.ReactNode; } ) {
  const { user } = useAuth();

  // Determine which sidebar to show based on user role
  const getSidebar = () => {
    switch ( user?.role ) {
      case "brand":
        return <BrandSidebar />;
      case "creator":
        return <CreatorSidebar />;
      case "admin":
        return <AdminSidebar />;
      default:
        return <CreatorSidebar />;
    }
  };

  return (
    <SidebarProvider data-dashboard-theme={ user?.role || "brand" }>
      { getSidebar() }
      <SidebarInset>
        <DashboardHeader />
        <main className="bg-background flex flex-1 flex-col gap-4 p-4 px-8!">
          { children }
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
