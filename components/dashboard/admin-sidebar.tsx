"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { getNavigationData } from "@/lib/dashboard/navigation-data";
import { useAuth, getUserDisplayName } from "@/lib/auth/auth-context";

export function AdminSidebar() {
  const { user } = useAuth();

  const navigationData = getNavigationData( 'admin', user ? {
    name: getUserDisplayName( user ),
    email: user.email,
    avatar: user.avatar,
  } : undefined );

  return <AppSidebar navigationData={ navigationData } />;
}
