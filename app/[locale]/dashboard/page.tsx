"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { BrandDashboard } from "@/components/dashboard/brand-dashboard";
import { CreatorDashboard } from "@/components/dashboard/creator-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  // Show loading state
  if ( isLoading ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if ( !user ) {
    redirect( "/login" );
  }

  // Render dashboard based on user role
  switch ( user.role ) {
    case "brand":
      return <BrandDashboard />;
    case "creator":
      return <CreatorDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <BrandDashboard />;
  }
}
