"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { getNavigationData } from "@/lib/dashboard/navigation-data";
import { useAuth, getUserDisplayName } from "@/lib/auth/auth-context";
import { useTranslations } from "next-intl";
import { useBrandProfile } from "@/lib/api/hooks/brands";
import { useCreatorProfile } from "@/lib/api/hooks/creators";
import { imgpresets } from "@/lib/utils/imgproxy";

interface RoleSidebarProps {
  role: 'admin' | 'brand' | 'creator';
}

export function RoleSidebar( { role }: RoleSidebarProps ) {
  const { user } = useAuth();
  const tNavigation = useTranslations( "dashboard.navigation" );

  const { data: brandProfile } = useBrandProfile( { enabled: role === 'brand' } );
  const { data: creatorProfile } = useCreatorProfile( { enabled: role === 'creator' } );

  const rawAvatar =
    role === 'brand' ? brandProfile?.data?.profile_photo?.asset :
    role === 'creator' ? creatorProfile?.profile_image?.asset :
    user?.avatar;

  const profileAvatar = rawAvatar ? imgpresets.avatar( rawAvatar ) : user?.avatar;

  const navigationData = getNavigationData( role, user ? {
    name: getUserDisplayName( user ),
    email: user.email,
    avatar: profileAvatar,
  } : undefined, tNavigation );

  return <AppSidebar navigationData={ navigationData } />;
}
