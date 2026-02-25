"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { getNavigationData } from "@/lib/dashboard/navigation-data";
import { useAuth, getUserDisplayName } from "@/lib/auth/auth-context";
import { useTranslations } from "next-intl";

export function BrandSidebar() {
  const { user } = useAuth();
  const tNavigation = useTranslations( "dashboard.navigation" );

  const navigationData = getNavigationData( 'brand', user ? {
    name: getUserDisplayName( user ),
    email: user.email,
    avatar: user.avatar,
  } : undefined, tNavigation );

  return <AppSidebar navigationData={ navigationData } />;
}
