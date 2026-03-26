"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconKey,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/dashboard-ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard-ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/dashboard-ui/sidebar";
import { useAuth } from "@/lib/auth/auth-context";
import { getNotificationsPagePath } from "@/lib/notification-utils";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { apiClient } from "@/lib/api/client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearBrandProfile } from "@/lib/redux/features/brand/brandSlice";
import { clearCreatorProfile } from "@/lib/redux/features/creator/creatorSlice";
import { Bell, KeyIcon } from "lucide-react";

export function NavUser( {
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
} ) {
  const { isMobile } = useSidebar();
  const { setUser, user: authUser } = useAuth();
  const t = useTranslations( 'dashboard.common' );
  const tNav = useTranslations( 'dashboard.navigation' );
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // Call logout API
      const authApi = new AuthenticationApi( undefined, undefined, apiClient );
      await authApi.authLogoutPost();
    } catch ( error ) {
      console.error( "Logout error:", error );
      // Continue with logout even if API call fails
    } finally {
      // Clear user state
      setUser( null );
      // Clear brand and creator profiles from Redux
      dispatch( clearBrandProfile() );
      dispatch( clearCreatorProfile() );
      // Redirect to login
      router.push( "/login" );
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={ user.avatar } alt={ user.name } />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{ user.name }</span>
                  <span className="text-muted-foreground truncate text-xs">
                    { user.email }
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={ isMobile ? "bottom" : "right" }
            align="end"
            sideOffset={ 4 }
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={ user.avatar } alt={ user.name } />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{ user.name }</span>
                    <span className="text-muted-foreground truncate text-xs">
                      { user.email }
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              { authUser?.role && (
                <>
                  { authUser.role === 'creator' ? (
                    <>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/creator/settings` ) }>
                        {/* <IconUserCircle /> */ }
                        { tNav( 'creator.profileSettings' ) }
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/creator/account` ) }>
                        {/* <IconUserCircle /> */ }
                        { tNav( 'creator.account' ) }
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/creator/account/change-password` ) }>
                        <KeyIcon />
                        { tNav( 'creator.changePassword' ) }
                      </DropdownMenuItem>
                    </>
                  ) : authUser.role === 'brand' ? (
                    <>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/brand/settings/profile` ) }>
                        {/* <IconUserCircle /> */ }
                        { tNav( 'brand.profileSettings' ) }
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/brand/settings/user-information` ) }>
                        {/* <IconUserCircle /> */ }
                        { tNav( 'brand.accountSettings' ) }
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/brand/settings/security` ) }>
                        <KeyIcon />
                        { tNav( 'brand.changePassword' ) }
                      </DropdownMenuItem>
                    </>
                  ) : authUser.role === 'admin' ? (
                    <>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/admin/settings` ) }>
                        {/* <IconUserCircle /> */ }
                        { tNav( 'admin.accountSettings' ) }
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={ () => router.push( `/${ locale }/admin/settings/security` ) }>
                        <KeyIcon />
                        { tNav( 'admin.changePassword' ) }
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={ () => {
                      const rolePath = '/settings';
                      router.push( `/${ locale }/${ authUser.role }${ rolePath }` );
                    } }>
                      <IconUserCircle />
                      { t( 'account' ) }
                    </DropdownMenuItem>
                  ) }
                </>
              ) }
              <DropdownMenuItem onClick={ () => router.push( `/${ locale }${ getNotificationsPagePath( authUser?.role ) }` ) }>
                <Bell />
                { t( 'notifications' ) }
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={ handleLogout }>
              <IconLogout />
              { t( 'logout' ) }
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
