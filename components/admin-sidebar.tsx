"use client";

import * as React from "react";
import {
  IconHome,
  IconBriefcase,
  IconChartBar,
  IconUsers,
  IconShield,
  IconSettings,
  IconHelp,
  IconSearch,
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

export function AdminSidebar( { ...props }: React.ComponentProps<typeof Sidebar> ) {
  const adminData = {
    user: {
      name: "Admin User",
      email: "admin@huerray.com",
      avatar: "/avatars/admin.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/en/dashboard/admin",
        icon: IconHome,
      },
      {
        title: "Users",
        url: "/en/dashboard/admin/users",
        icon: IconUsers,
      },
      {
        title: "Campaigns",
        url: "/en/dashboard/admin/campaigns",
        icon: IconBriefcase,
      },
      {
        title: "Analytics",
        url: "/en/dashboard/admin/analytics",
        icon: IconChartBar,
      },
      {
        title: "Moderation",
        url: "/en/dashboard/admin/moderation",
        icon: IconShield,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/en/dashboard/admin/settings",
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
              <a href="/en/dashboard/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconShield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Huerray</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ adminData.navMain } />
        <NavSecondary items={ adminData.navSecondary } className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ adminData.user } />
      </SidebarFooter>
    </Sidebar>
  );
}
