"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { getNavigationData } from "@/lib/dashboard/navigation-data";
import { useAuth, getUserDisplayName } from "@/lib/auth/auth-context";
import { useTranslations } from "next-intl";

interface RoleSidebarProps {
  role: 'admin' | 'brand' | 'creator';
}

export function RoleSidebar( { role }: RoleSidebarProps ) {
  const { user } = useAuth();
  const tNavigation = useTranslations( "dashboard.navigation" );

  const navigationData = getNavigationData( role, user ? {
    name: getUserDisplayName( user ),
    email: user.email,
    avatar: user.avatar,
  } : undefined, tNavigation );

  return <AppSidebar navigationData={ navigationData } />;
}
