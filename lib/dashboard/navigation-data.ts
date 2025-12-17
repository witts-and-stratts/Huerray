import {
  DashboardSquareAddIcon,
  ChartLineData01Icon,
  UserGroupIcon,
  DatabaseIcon,
  FileScriptIcon,
  Settings01Icon,
  HelpCircleIcon,
  Search01Icon,
  Task02Icon,
  WalletDone01Icon,
  ImageUpload01Icon,
  UserMultiple02Icon,
  ShieldUserIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { IconReport } from "@tabler/icons-react";
import type { SidebarNavigationData } from "@/components/app-sidebar";

// Helper function to build navigation data with actual user info
export function getNavigationData(
  role: 'brand' | 'creator' | 'admin',
  user?: { name: string; email: string; avatar?: string }
): SidebarNavigationData {
  const defaultUser = {
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || "/avatars/shadcn.jpg",
  };

  const navigationMap = {
    brand: brandNavigationData,
    creator: creatorNavigationData,
    admin: adminNavigationData,
  };

  return {
    ...navigationMap[role],
    user: defaultUser,
  };
}

// Brand Dashboard Navigation
export const brandNavigationData: Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } = {
  user: {
    name: "Brand User",
    email: "brand@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/brand",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Campaigns",
      url: "/dashboard/brand/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: "Creators",
      url: "/dashboard/brand/creators",
      icon: UserGroupIcon,
    },
    {
      title: "Analytics",
      url: "/dashboard/brand/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Billing",
      url: "/dashboard/brand/billing",
      icon: FileScriptIcon,
    },
  ],
  documents: [
    { name: "Saved Lists", url: "/dashboard/brand/saved-lists", icon: DatabaseIcon },
    { name: "Templates", url: "/dashboard/brand/templates", icon: FileScriptIcon },
    { name: "Reports", url: "/dashboard/brand/reports", icon: IconReport },
  ],
  navSecondary: [
    { title: "Settings", url: "/dashboard/brand/settings", icon: Settings01Icon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: Search01Icon },
  ],
};

// Creator Dashboard Navigation
export const creatorNavigationData: Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } = {
  user: {
    name: "Creator User",
    email: "creator@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/creator",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Available Gigs",
      url: "/dashboard/creator/gigs",
      icon: Task02Icon,
    },
    {
      title: "Active Gigs",
      url: "/dashboard/creator/gigs/active",
      icon: Task02Icon,
    },
    {
      title: "Portfolio",
      url: "/dashboard/creator/portfolio",
      icon: ImageUpload01Icon,
    },
    {
      title: "Analytics",
      url: "/dashboard/creator/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Earnings",
      url: "/dashboard/creator/earnings",
      icon: WalletDone01Icon,
    },
  ],
  navSecondary: [
    { title: "Settings", url: "/dashboard/creator/settings", icon: Settings01Icon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: Search01Icon },
  ],
};

// Admin Dashboard Navigation
export const adminNavigationData: Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Users",
      url: "/dashboard/admin/users",
      icon: UserMultiple02Icon,
    },
    {
      title: "Campaigns",
      url: "/dashboard/admin/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Moderation",
      url: "/dashboard/admin/moderation",
      icon: ShieldUserIcon,
    },
  ],
  documents: [
    { name: "Platform Reports", url: "/dashboard/admin/reports", icon: IconReport },
    { name: "System Logs", url: "/dashboard/admin/logs", icon: DatabaseIcon },
    { name: "Alerts", url: "/dashboard/admin/alerts", icon: AlertCircleIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings01Icon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: Search01Icon },
  ],
};
