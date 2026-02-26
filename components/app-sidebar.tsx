"use client";

import { NavDocuments } from "@/components/dashboard-ui/nav-documents";
import { NavMain } from "@/components/dashboard-ui/nav-main";
import { NavSecondary } from "@/components/dashboard-ui/nav-secondary";
import { NavUser } from "@/components/dashboard-ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/dashboard-ui/sidebar";
import Image from "next/image";
import * as React from "react";
import type { Icon } from "@tabler/icons-react";
import type { HugeiconsIcon } from '@hugeicons/react';

// Type for HugeIcons icon data (it's an array)
type HugeIconData = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export interface SidebarNavMainItem {
  title: string;
  url: string;
  icon?: Icon | HugeIconData;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface SidebarNavigationData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: SidebarNavMainItem[];
  documents?: {
    name: string;
    url: string;
    icon: Icon | HugeIconData;
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: Icon | HugeIconData;
  }[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navigationData: SidebarNavigationData;
}

export function AppSidebar( { navigationData, ...props }: AppSidebarProps ) {
  return (
    <Sidebar collapsible="icon" { ...props }>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="#">
              <div className="relative w-10 h-10 group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7 transition-[width,height] duration-200 ease-linear">
                <Image src="/images/huerray-symbol.svg" alt="Huerray" fill className="object-contain" />
              </div>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ navigationData.navMain } />
        { navigationData.documents && <NavDocuments items={ navigationData.documents } /> }
        <NavSecondary items={ navigationData.navSecondary } className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ navigationData.user } />
      </SidebarFooter>
    </Sidebar>
  );
}
