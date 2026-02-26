"use client";

import { HugeiconsIcon } from '@hugeicons/react';
import { type Icon } from "@tabler/icons-react";
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/dashboard-ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import type { SidebarNavMainItem } from '@/components/app-sidebar';

// Type for HugeIcons icon data (it's an array)
type HugeIconData = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export function NavMain( {
  items,
}: {
  items: SidebarNavMainItem[];
} ) {
  const locale = useLocale();
  const rawPathname = usePathname();
  // Strip locale prefix so nav URLs (/brand/...) match regardless of locale (/en/brand/...)
  const segments = rawPathname?.split( '/' ) ?? [];
  const pathname = locales.includes( segments[ 1 ] as typeof locales[ number ] )
    ? '/' + segments.slice( 2 ).join( '/' )
    : rawPathname ?? '';
  // Prefix every nav URL with the current locale so the middleware always
  // receives a locale-prefixed path (e.g. /en/admin/creators, not /admin/creators)
  const localisedUrl = ( url: string ) => `/${ locale }${ url }`;

  // Find the longest nav URL that matches the current pathname so that
  // e.g. /brand/campaigns wins over /brand, preventing Dashboard from
  // always appearing active.
  const allNavUrls = items.flatMap( item => [ item.url, ...( item.items?.map( s => s.url ) ?? [] ) ] );
  const longestMatchUrl = allNavUrls
    .filter( url => pathname === url || pathname.startsWith( `${ url }/` ) )
    .reduce( ( longest, url ) => url.length > longest.length ? url : longest, '' );
  const isActivePath = ( url: string ) => url === longestMatchUrl;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          { items.map( ( item ) => {
            const hasChildren = !!item.items?.length;
            const isParentActive = isActivePath( item.url );
            const isAnyChildActive = item.items?.some( ( subItem ) => isActivePath( subItem.url ) ) || false;

            if ( hasChildren ) {
              return (
                <Collapsible
                  key={ item.title }
                  asChild
                  defaultOpen={ isParentActive || isAnyChildActive }
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="font-regular">
                    <Link href={ localisedUrl( item.url ) }>
                      <SidebarMenuButton
                        tooltip={ item.title }
                        isActive={ isParentActive || isAnyChildActive }
                      >
                        { item.icon && (
                          Array.isArray( item.icon )
                            ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 1.5 } />
                            : ( () => {
                              const IconComponent = item.icon as Icon;
                              return <IconComponent />;
                            } )()
                        ) }
                        <span>{ item.title }</span>
                      </SidebarMenuButton>
                    </Link>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="transition-transform group-data-[state=open]/collapsible:rotate-90"
                      >
                        <ChevronRight />
                        <span className="sr-only">Toggle submenu</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        { item.items?.map( ( subItem ) => (
                          <SidebarMenuSubItem key={ subItem.title }>
                            <SidebarMenuSubButton
                              render={ <Link href={ localisedUrl( subItem.url ) } /> }
                              isActive={ isActivePath( subItem.url ) }
                            >
                              <span>{ subItem.title }</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ) ) }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={ item.title } className="font-regular">
                <Link href={ localisedUrl( item.url ) }>
                  <SidebarMenuButton
                    tooltip={ item.title }
                    isActive={ isParentActive }
                  >
                    { item.icon && (
                      Array.isArray( item.icon )
                        ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 1.5 } />
                        : ( () => {
                          const IconComponent = item.icon as Icon;
                          return <IconComponent />;
                        } )()
                    ) }
                    <span>{ item.title }</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          } ) }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
