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

type NavigationTranslator = ( key: string ) => string;

const withFallback = ( t: NavigationTranslator | undefined, key: string, fallback: string ) => {
  if ( !t ) return fallback;
  try {
    const translated = t( key );
    return translated || fallback;
  } catch {
    return fallback;
  }
};

// Helper function to build navigation data with actual user info
export function getNavigationData(
  role: 'brand' | 'creator' | 'admin',
  user?: { name: string; email: string; avatar?: string },
  t?: NavigationTranslator
): SidebarNavigationData {
  const defaultUser = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  };

  const navigationMap = {
    brand: brandNavigationData( t ),
    creator: creatorNavigationData( t ),
    admin: adminNavigationData( t ),
  };

  return {
    ...navigationMap[role],
    user: defaultUser,
  };
}

// Brand Dashboard Navigation
export const brandNavigationData = ( t?: NavigationTranslator ): Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } => ( {
  user: {
    name: "Brand User",
    email: "brand@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: withFallback( t, "brand.dashboard", "Dashboard" ),
      url: "/brand-admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: withFallback( t, "brand.campaigns", "Campaigns" ),
      url: "/brand-admin/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "brand.gigs", "Gigs" ),
      url: "/brand-admin/gigs",
      icon: Task02Icon,
    },
    {
      title: withFallback( t, "brand.creators", "Creators" ),
      url: "/brand-admin/creators",
      icon: UserGroupIcon,
    },
    {
      title: withFallback( t, "brand.analytics", "Analytics" ),
      url: "/brand-admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "brand.invoices", "Invoices" ),
      url: "/brand-admin/invoices",
      icon: FileScriptIcon,
    },
  ],
  documents: [
    { name: withFallback( t, "brand.savedLists", "Saved Lists" ), url: "/brand-admin/saved-lists", icon: DatabaseIcon },
    { name: withFallback( t, "brand.templates", "Templates" ), url: "/brand-admin/templates", icon: FileScriptIcon },
    { name: withFallback( t, "brand.reports", "Reports" ), url: "/brand-admin/reports", icon: IconReport },
  ],
  navSecondary: [
    { title: withFallback( t, "brand.settings", "Settings" ), url: "/brand-admin/settings", icon: Settings01Icon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon },
  ],
} );

// Creator Dashboard Navigation
export const creatorNavigationData = ( t?: NavigationTranslator ): Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } => ( {
  user: {
    name: "Creator User",
    email: "creator@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: withFallback( t, "creator.dashboard", "Dashboard" ),
      url: "/creator-admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: withFallback( t, "creator.invitations", "Invitations" ),
      url: "/creator-admin/invitations",
      icon: Task02Icon,
    },
    {
      title: withFallback( t, "creator.myGigs", "My Gigs" ),
      url: "/creator-admin/my-gigs",
      icon: Task02Icon,
      items: [
        {
          title: withFallback( t, "creator.allGigs", "All Gigs" ),
          url: "/creator-admin/my-gigs",
        },
        {
          title: withFallback( t, "creator.availableGigs", "Available Gigs" ),
          url: "/creator-admin/gigs",
        },
        {
          title: withFallback( t, "creator.activeGigs", "Active Gigs" ),
          url: "/creator-admin/gigs/active",
        },
      ],
    },
    {
      title: withFallback( t, "creator.portfolio", "Portfolio" ),
      url: "/creator-admin/portfolio",
      icon: ImageUpload01Icon,
    },
    {
      title: withFallback( t, "creator.analytics", "Analytics" ),
      url: "/creator-admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "creator.earnings", "Earnings" ),
      url: "/creator-admin/earnings",
      icon: WalletDone01Icon,
    },
  ],
  navSecondary: [
    { title: withFallback( t, "creator.settings", "Settings" ), url: "/creator-admin/settings", icon: Settings01Icon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon },
  ],
} );

// Admin Dashboard Navigation
export const adminNavigationData = ( t?: NavigationTranslator ): Omit<SidebarNavigationData, 'user'> & { user: { name: string; email: string; avatar: string } } => ( {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: withFallback( t, "admin.dashboard", "Dashboard" ),
      url: "/admin",
      icon: DashboardSquareAddIcon,
    },
    {
      title: withFallback( t, "admin.users", "Users" ),
      url: "/admin/users",
      icon: UserMultiple02Icon
    },
    {
      title: withFallback( t, "admin.creators", "Creators" ),
      url: "/admin/creators",
      icon: AiUserIcon
    },
    {
      title: withFallback( t, "admin.brands", "Brands" ),
      url: "/admin/brands",
      icon: Store01Icon,
    },
    {
      title: withFallback( t, "admin.campaigns", "Campaigns" ),
      url: "/admin/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "admin.gigs", "Gigs" ),
      url: "/admin/gigs",
      icon: Task02Icon,
    },
    {
      title: withFallback( t, "admin.analytics", "Analytics" ),
      url: "/admin/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "admin.moderation", "Moderation" ),
      url: "/admin/moderation",
      icon: ShieldUserIcon,
    },
  ],
  documents: [
    { name: withFallback( t, "admin.platformReports", "Platform Reports" ), url: "/admin/reports", icon: IconReport },
    { name: withFallback( t, "admin.systemLogs", "System Logs" ), url: "/admin/logs", icon: DatabaseIcon },
    { name: withFallback( t, "admin.alerts", "Alerts" ), url: "/admin/alerts", icon: AlertCircleIcon },
  ],
  navSecondary: [
    { title: withFallback( t, "admin.settings", "Settings" ), url: "/admin/settings", icon: Settings01Icon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon },
  ],
} );
