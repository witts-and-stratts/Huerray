"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import { HugeiconsIcon } from '@hugeicons/react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/dashboard-ui/sidebar";
import Link from "next/link";

// Type for HugeIcons icon data (it's an array)
type HugeIconData = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export function NavSecondary( {
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon | HugeIconData;
    onClick?: () => void;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup> ) {
  return (
    <SidebarGroup { ...props }>
      <SidebarGroupContent>
        <SidebarMenu>
          { items.map( ( item ) => (
            <SidebarMenuItem key={ item.title } className="font-regular">
              { item.onClick ? (
                <SidebarMenuButton
                  render={
                    <button onClick={ item.onClick }>
                      { Array.isArray( item.icon )
                        ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 1.5 } />
                        : ( () => {
                          const IconComponent = item.icon as Icon;
                          return <IconComponent />;
                        } )()
                      }
                      <span>{ item.title }</span>
                    </button>
                  }
                />
              ) : (
                <SidebarMenuButton
                  render={
                    <Link href={ item.url }>
                      { Array.isArray( item.icon )
                        ? <HugeiconsIcon icon={ item.icon } strokeWidth={ 1.5 } />
                        : ( () => {
                          const IconComponent = item.icon as Icon;
                          return <IconComponent />;
                        } )()
                      }
                      <span>{ item.title }</span>
                    </Link>
                  }
                />
              ) }
            </SidebarMenuItem>
          ) ) }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
