"use client";

import { HugeiconsIcon } from '@hugeicons/react';
import { type Icon } from "@tabler/icons-react";
import { ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';
import { useState, useCallback, useEffect } from 'react';

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
import { Badge } from "@/components/dashboard-ui/badge";
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
  const searchParams = useSearchParams();
  // Strip locale prefix so nav URLs (/brand/...) match regardless of locale (/en/brand/...)
  const segments = rawPathname?.split( '/' ) ?? [];
  const pathname = locales.includes( segments[ 1 ] as typeof locales[ number ] )
    ? '/' + segments.slice( 2 ).join( '/' )
    : rawPathname ?? '';
  // Prefix every nav URL with the current locale so the middleware always
  // receives a locale-prefixed path (e.g. /en/admin/creators, not /admin/creators)
  const localisedUrl = ( url: string ) => `/${ locale }${ url }`;
  const hasMatchingQueryParams = ( url: string ) => {
    const [ targetPath, targetQuery = '' ] = url.split( '?' );
    const targetParams = new URLSearchParams( targetQuery );

    if ( targetParams.size === 0 ) {
      return pathname === targetPath || pathname.startsWith( `${ targetPath }/` );
    }

    if ( pathname !== targetPath ) {
      return false;
    }

    return Array.from( targetParams.entries() ).every( ( [ key, value ] ) => searchParams.get( key ) === value );
  };

  // Find the longest nav URL that matches the current pathname so that
  // e.g. /brand/campaigns wins over /brand, preventing Dashboard from
  // always appearing active.
  const allNavUrls = items.flatMap( item => [ item.url, ...( item.items?.map( s => s.url ) ?? [] ) ] );
  const longestMatchUrl = allNavUrls
    .filter( hasMatchingQueryParams )
    .reduce( ( longest, url ) => url.length > longest.length ? url : longest, '' );
  const isActivePath = ( url: string ) => url === longestMatchUrl;

  // Controlled open state for collapsible items
  const [ openItems, setOpenItems ] = useState<Record<string, boolean>>( () => {
    const initial: Record<string, boolean> = {};
    items.forEach( item => {
      if ( item.items?.length ) {
        const isParentActive = item.url === longestMatchUrl;
        const isAnyChildActive = item.items.some( s => s.url === longestMatchUrl );
        if ( isParentActive || isAnyChildActive ) {
          initial[ item.title ] = true;
        }
      }
    } );
    return initial;
  } );

  useEffect( () => {
    setOpenItems( prev => {
      const next = { ...prev };
      items.forEach( item => {
        if ( item.items?.length ) {
          const isParentActive = item.url === longestMatchUrl;
          const isAnyChildActive = item.items.some( s => s.url === longestMatchUrl );
          if ( isParentActive || isAnyChildActive ) {
            next[ item.title ] = true;
          }
        }
      } );
      return next;
    } );
  }, [ items, longestMatchUrl ] );

  const toggleItem = useCallback( ( title: string ) => {
    setOpenItems( prev => ( { ...prev, [ title ]: !prev[ title ] } ) );
  }, [] );

  const openItem = useCallback( ( title: string ) => {
    setOpenItems( prev => ( { ...prev, [ title ]: true } ) );
  }, [] );

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          { items.map( ( item ) => {
            const hasChildren = !!item.items?.length;
            const isParentActive = isActivePath( item.url );
            const isAnyChildActive = item.items?.some( ( subItem ) => isActivePath( subItem.url ) ) || false;

            if ( hasChildren ) {
              const isOpen = openItems[ item.title ] ?? false;

              return (
                <Collapsible
                  key={ item.title }
                  asChild
                  open={ isOpen }
                  onOpenChange={ ( open ) => setOpenItems( prev => ( { ...prev, [ item.title ]: open } ) ) }
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="font-regular">
                <Link href={ localisedUrl( item.url ) } onClick={ () => openItem( item.title ) }>
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
                    { typeof item.badge === "number" && item.badge > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-5 min-w-5 rounded-full px-1 text-[10px] leading-none pointer-events-none"
                      >
                        { item.badge > 99 ? "99+" : item.badge }
                      </Badge>
                    ) }
                  </SidebarMenuButton>
                </Link>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="transition-transform group-data-[state=open]/collapsible:rotate-90"
                    onClick={ ( e ) => { e.preventDefault(); toggleItem( item.title ); } }
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
                    { typeof item.badge === "number" && item.badge > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-5 min-w-5 rounded-full px-1 text-[10px] leading-none pointer-events-none"
                      >
                        { item.badge > 99 ? "99+" : item.badge }
                      </Badge>
                    ) }
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
