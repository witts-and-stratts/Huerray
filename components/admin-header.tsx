"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Globe,
  User,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/dashboard-ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/dashboard-ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Separator } from "@/components/dashboard-ui/separator";
import { SidebarTrigger } from "@/components/dashboard-ui/sidebar";
import { Badge } from "@/components/dashboard-ui/badge";
import { useTranslations } from "next-intl";

export function AdminHeader() {
  const router = useRouter();
  const [ open, setOpen ] = React.useState( false );
  const t = useTranslations( 'dashboard.common' );
  const ta = useTranslations( 'dashboard.admin' );
  const handleShortcut = React.useEffectEvent( ( e: KeyboardEvent ) => {
    if ( e.key === "k" && ( e.metaKey || e.ctrlKey ) ) {
      e.preventDefault();
      setOpen( ( open ) => !open );
    }
  } );

  // Toggle command dialog with Cmd+K
  React.useEffect( () => {
    document.addEventListener( "keydown", handleShortcut );
    return () => document.removeEventListener( "keydown", handleShortcut );
  }, [] );

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
        <div className="flex w-full items-center gap-2 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />

          {/* Search Command */ }
          <Button
            variant="outline"
            className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-72 lg:w-96"
            onClick={ () => setOpen( true ) }
          >
            <Search className="mr-2 h-4 w-4" />
            <span>{ t( 'search.placeholder' ).split( ' ' )[ 0 ] }...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Right Side Actions */ }
          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */ }
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    5
                  </Badge>
                  <span className="sr-only">{ t( 'notifications' ) }</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{ t( 'notifications' ) }</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="px-2 py-3">
                      <p className="text-sm">New user registration report</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-3">
                      <p className="text-sm">System update completed</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-center text-sm">
                    { t( 'viewAllNotifications' ) }
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher */ }
            {/* Language Switcher */ }
            <LanguageSelector showLabel={ false } />

            {/* User Menu */ }
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 gap-2 pl-2 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/admin.jpg" alt="User" />
                    <AvatarFallback className="bg-gray-800 text-white text-sm">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start text-left md:flex">
                    <span className="text-sm font-medium">{ ta( 'welcome' ).split( ',' )[ 1 ] || 'Admin' }</span>
                    <span className="text-xs text-muted-foreground">admin@huerray.de</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{ t( 'myAccount' ) }</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>{ t( 'profile' ) }</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>{ t( 'billing' ) }</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{ t( 'settings' ) }</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>{ t( 'support' ) }</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{ t( 'logout' ) }</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Command Dialog */ }
      <CommandDialog open={ open } onOpenChange={ setOpen }>
        <CommandInput placeholder={ t( 'searchPlaceholderHeader' ) } />
        <CommandList>
          <CommandEmpty>{ t( 'search.noResultsDesc' ) }</CommandEmpty>
          <CommandGroup heading={ t( 'quickActions' ) }>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/users' ); } }>
              <span>{ ta( 'manageUsers' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/moderation' ); } }>
              <span>{ ta( 'reviewReports' ) }</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={ t( 'navigation' ) }>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin' ); } }>
              <span>{ t( 'dashboard' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/users' ); } }>
              <span>{ t( 'cards.applications' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/campaigns' ); } }>
              <span>{ t( 'cards.submissions' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/analytics' ); } }>
              <span>{ t( 'analytics' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/moderation' ); } }>
              <span>{ t( 'overview' ) }</span>
            </CommandItem>
            <CommandItem onSelect={ () => { setOpen( false ); router.push( '/en/dashboard/admin/settings' ); } }>
              <span>{ t( 'settings' ) }</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
