"use client";

import { HugeiconsIcon } from '@hugeicons/react';
import { type Icon } from "@tabler/icons-react";
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isActivePath = ( url: string ) => pathname === url || pathname?.startsWith( `${ url }/` );

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary/10 text-primary hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Create Campaign</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
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
                    <Link href={ item.url }>
                      <SidebarMenuButton
                        tooltip={ item.title }
                        isActive={ isParentActive || isAnyChildActive }
                      >
                        { item.icon && (
                          Array.isArray( item.icon )
                            ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 2 } />
                            : (() => {
                                const IconComponent = item.icon as Icon;
                                return <IconComponent />;
                              })()
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
                              render={ <Link href={ subItem.url } /> }
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
                <Link href={ item.url }>
                  <SidebarMenuButton
                    tooltip={ item.title }
                    isActive={ isParentActive }
                  >
                    { item.icon && (
                      Array.isArray( item.icon )
                        ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 2 } />
                        : (() => {
                            const IconComponent = item.icon as Icon;
                            return <IconComponent />;
                          })()
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
