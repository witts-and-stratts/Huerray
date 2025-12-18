"use client";

import { HugeiconsIcon } from '@hugeicons/react';
import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/dashboard-ui/sidebar";
import Link from 'next/link';

// Type for HugeIcons icon data (it's an array)
type HugeIconData = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export function NavMain( {
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon | HugeIconData;
  }[];
} ) {
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
          { items.map( ( item ) => (
            <Link href={ item.url } key={ item.title }>
              <SidebarMenuItem key={ item.title } className="font-regular">
                <SidebarMenuButton tooltip={ item.title }>
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
              </SidebarMenuItem>
            </Link>
          ) ) }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
