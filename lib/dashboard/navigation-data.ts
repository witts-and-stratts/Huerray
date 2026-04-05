import {
  DashboardSquareAddIcon,
  ChartLineData01Icon,
  UserGroupIcon,
  DatabaseIcon,
  FileScriptIcon,
  Settings01Icon,
  HelpCircleIcon,
  Search01Icon,
  SettingsIcon,
  Task02Icon,
  WalletDone01Icon,
  ImageUpload01Icon,
  UserMultiple02Icon,
  ShieldUserIcon,
  AlertCircleIcon,
  Store01Icon,
  AiUserIcon,
  CreditCardAcceptIcon,
  CustomerSupportIcon,
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
    name: "",
    email: "",
    avatar: "",
  },
  navMain: [
    {
      title: withFallback( t, "brand.dashboard", "Dashboard" ),
      url: "/brand",
      icon: DashboardSquareAddIcon,
    },
    {
      title: withFallback( t, "brand.campaigns", "Campaigns" ),
      url: "/brand/campaigns",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "brand.creators", "Creators" ),
      url: "/brand/creators",
      icon: UserGroupIcon,
    },
    {
      title: withFallback( t, "brand.analytics", "Analytics" ),
      url: "/brand/analytics",
      icon: ChartLineData01Icon,
    },
    {
      title: withFallback( t, "brand.invoices", "Invoices" ),
      url: "/brand/invoices",
      icon: FileScriptIcon,
    },
    {
      title: withFallback( t, "brand.cases", "Cases" ),
      url: "/brand/cases",
      icon: CustomerSupportIcon,
    },
  ],
  // documents: [
  //   { name: withFallback( t, "brand.savedLists", "Saved Lists" ), url: "/brand/saved-lists", icon: DatabaseIcon },
  //   { name: withFallback( t, "brand.templates", "Templates" ), url: "/brand/templates", icon: FileScriptIcon },
  //   { name: withFallback( t, "brand.reports", "Reports" ), url: "/brand/reports", icon: IconReport },
  // ],
  navSecondary: [
    // { title: withFallback( t, "brand.settings", "Settings" ), url: "/brand/settings", icon: Settings01Icon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-help-sheet' ) ) },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-global-search' ) ) },
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
      url: "/creator",
      icon: DashboardSquareAddIcon,
    },
    {
      title: withFallback( t, "creator.invitations", "Invitations" ),
      url: "/creator/invitations",
      icon: Task02Icon,
    },
    {
      title: withFallback( t, "creator.myGigs", "Gigs" ),
      url: "/creator/gigs",
      icon: Task02Icon,
      items: [
        {
          title: withFallback( t, "creator.allGigs", "All Gigs" ),
          url: "/creator/gigs",
        },
        {
          title: withFallback( t, "creator.availableGigs", "Available Gigs" ),
          url: "/creator/gigs?tab=available",
        },
        {
          title: withFallback( t, "creator.activeGigs", "Active Gigs" ),
          url: "/creator/gigs?tab=active",
        },
      ],
    },
    {
      title: withFallback( t, "creator.earnings", "Earnings" ),
      url: "/creator/earnings",
      icon: WalletDone01Icon,
    },
    {
      title: withFallback( t, "creator.profile", "My Profile" ),
      url: "/creator/profile",
      icon: ImageUpload01Icon,
    },
    {
      title: withFallback( t, "creator.cases", "Cases" ),
      url: "/creator/cases",
      icon: CustomerSupportIcon,
    },
  ],
  navSecondary: [
    // { title: withFallback( t, "creator.settings", "Settings" ), url: "/creator/settings", icon: Settings01Icon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-help-sheet' ) ) },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-global-search' ) ) },
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
      title: withFallback( t, "admin.invoices", "Invoices" ),
      url: "/admin/invoices",
      icon: FileScriptIcon,
    },
    {
      title: withFallback( t, "admin.payments", "Payments" ),
      url: "/admin/payouts",
      icon: CreditCardAcceptIcon,
    },
    {
      title: withFallback( t, "admin.cases", "Cases" ),
      url: "/admin/cases",
      icon: CustomerSupportIcon,
    },
    // {
    //   title: withFallback( t, "admin.analytics", "Analytics" ),
    //   url: "/admin/analytics",
    //   icon: ChartLineData01Icon,
    // },
    // {
    //   title: withFallback( t, "admin.moderation", "Moderation" ),
    //   url: "/admin/moderation",
    //   icon: ShieldUserIcon,
    // },
  ],
  documents: [
    {
      name: withFallback( t, "admin.newsletter", "Newsletter" ),
      url: "/admin/newsletter",
      icon: DatabaseIcon,
    },
    //   { name: withFallback( t, "admin.platformReports", "Platform Reports" ), url: "/admin/dashboard", icon: IconReport },
    //   // { name: withFallback( t, "admin.systemLogs", "System Logs" ), url: "/admin/logs", icon: DatabaseIcon },
    //   { name: withFallback( t, "admin.alerts", "Alerts" ), url: "/admin/notifications", icon: AlertCircleIcon },
  ],
  navSecondary: [
    // { title: withFallback( t, "admin.accountSettings", "Account Settings" ), url: "/admin/settings", icon: SettingsIcon },
    { title: withFallback( t, "common.getHelp", "Get Help" ), url: "#", icon: HelpCircleIcon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-help-sheet' ) ) },
    { title: withFallback( t, "common.search", "Search" ), url: "#", icon: Search01Icon, onClick: () => document.dispatchEvent( new CustomEvent( 'open-global-search' ) ) },
  ],
} );
