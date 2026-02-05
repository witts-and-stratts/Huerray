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
  Store01Icon,
  AiUserIcon,
} from "@hugeicons/core-free-icons";
import { IconReport } from "@tabler/icons-react";
import type { SidebarNavigationData } from "@/components/app-sidebar";

// Helper function to build navigation data with actual user info
export function getNavigationData(
  role: 'brand' | 'creator' | 'admin',
  user?: { name: string; email: string; avatar?: string }
): SidebarNavigationData {
  const defaultUser = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
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
      url: "/brand-admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Campaigns",
      url: "/brand-admin/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: "Gigs",
      url: "/brand-admin/gigs",
      icon: Task02Icon,
    },
    {
      title: "Creators",
      url: "/brand-admin/creators",
      icon: UserGroupIcon,
    },
    {
      title: "Analytics",
      url: "/brand-admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Invoices",
      url: "/brand-admin/invoices",
      icon: FileScriptIcon,
    },
  ],
  documents: [
    { name: "Saved Lists", url: "/brand-admin/saved-lists", icon: DatabaseIcon },
    { name: "Templates", url: "/brand-admin/templates", icon: FileScriptIcon },
    { name: "Reports", url: "/brand-admin/reports", icon: IconReport },
  ],
  navSecondary: [
    { title: "Settings", url: "/brand-admin/settings", icon: Settings01Icon },
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
      url: "/creator-admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Available Gigs",
      url: "/creator-admin/gigs",
      icon: Task02Icon,
    },
    {
      title: "Active Gigs",
      url: "/creator-admin/gigs/active",
      icon: Task02Icon,
    },
    {
      title: "Portfolio",
      url: "/creator-admin/portfolio",
      icon: ImageUpload01Icon,
    },
    {
      title: "Analytics",
      url: "/creator-admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Earnings",
      url: "/creator-admin/earnings",
      icon: WalletDone01Icon,
    },
  ],
  navSecondary: [
    { title: "Settings", url: "/creator-admin/settings", icon: Settings01Icon },
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
      url: "/admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: UserMultiple02Icon
    },
    {
      title: "Creators",
      url: "/admin/creators",
      icon: AiUserIcon
    },
    {
      title: "Brands",
      url: "/admin/brands",
      icon: Store01Icon,
    },
    {
      title: "Campaigns",
      url: "/admin/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: "Gigs",
      url: "/admin/gigs",
      icon: Task02Icon,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: "Moderation",
      url: "/admin/moderation",
      icon: ShieldUserIcon,
    },
  ],
  documents: [
    { name: "Platform Reports", url: "/admin/reports", icon: IconReport },
    { name: "System Logs", url: "/admin/logs", icon: DatabaseIcon },
    { name: "Alerts", url: "/admin/alerts", icon: AlertCircleIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "/admin/settings", icon: Settings01Icon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: Search01Icon },
  ],
};
