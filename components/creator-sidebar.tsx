"use client";

import * as React from "react";
import {
  IconHome,
  IconBriefcase,
  IconChartBar,
  IconWallet,
  IconSettings,
  IconHelp,
  IconSearch,
  IconPhoto,
} from "@tabler/icons-react";

import { NavMain } from "@/components/dashboard-ui/nav-main";
import { NavSecondary } from "@/components/dashboard-ui/nav-secondary";
import { NavUser } from "@/components/dashboard-ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/dashboard-ui/sidebar";

export function CreatorSidebar( { ...props }: React.ComponentProps<typeof Sidebar> ) {
  const creatorData = {
    user: {
      name: "Creator User",
      email: "creator@huerray.com",
      avatar: "/avatars/creator.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/en/dashboard/creator",
        icon: IconHome,
      },
      {
        title: "Gigs",
        url: "/en/dashboard/creator/gigs",
        icon: IconBriefcase,
      },
      {
        title: "Portfolio",
        url: "/en/dashboard/creator/portfolio",
        icon: IconPhoto,
      },
      {
        title: "Analytics",
        url: "/en/dashboard/creator/analytics",
        icon: IconChartBar,
      },
      {
        title: "Earnings",
        url: "/en/dashboard/creator/earnings",
        icon: IconWallet,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/en/dashboard/creator/settings",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" { ...props }>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/en/dashboard/creator">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconBriefcase className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Huerray</span>
                  <span className="truncate text-xs">for Creators</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ creatorData.navMain } />
        <NavSecondary items={ creatorData.navSecondary } className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ creatorData.user } />
      </SidebarFooter>
    </Sidebar>
  );
}
