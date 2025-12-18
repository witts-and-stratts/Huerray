'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Briefcase,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  LogOut,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Icon mapping
const iconMap = {
  Home,
  Briefcase,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  LogOut,
  Globe,
};

interface DashboardShellProps {
  children: React.ReactNode;
  navigation: Array<{
    key: string;
    label: string;
    href: string;
    icon: string; // Changed to string
  }>;
  theme: 'brand' | 'creator' | 'admin';
}

export function DashboardShell( { children, navigation, theme }: DashboardShellProps ) {
  const [ collapsed, setCollapsed ] = React.useState( false );
  const pathname = usePathname();
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }
    return (user.firstName?.[0] || user.email?.[0] || 'U').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50" data-dashboard-theme={ theme }>
      {/* Sidebar */ }
      <aside
        className={ `${ collapsed ? 'w-16' : 'w-64'
          } bg-white border-r border-gray-200 flex flex-col transition-all duration-300` }
      >
        {/* Logo */ }
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          { !collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">Huerray</span>
            </Link>
          ) }
          { collapsed && (
            <Link href="/dashboard" className="flex items-center justify-center w-full">
              <span className="text-xl font-bold text-gray-900">H</span>
            </Link>
          ) }
        </div>

        {/* Navigation */ }
        <nav className="flex-1 p-4 space-y-1">
          { navigation.map( ( item ) => {
            const Icon = iconMap[ item.icon as keyof typeof iconMap ];
            const isActive = pathname === item.href || pathname.startsWith( item.href + '/' );

            return (
              <Link
                key={ item.key }
                href={ item.href }
                className={ `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${ isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
                  } ${ collapsed ? 'justify-center' : '' }` }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                { !collapsed && <span>{ item.label }</span> }
              </Link>
            );
          } ) }
        </nav>

        {/* Collapse Button */ }
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={ () => setCollapsed( !collapsed ) }
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            { collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="text-sm">Collapse</span>
              </>
            ) }
          </button>
        </div>
      </aside>

      {/* Main Content */ }
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */ }
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search */ }
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */ }
          <div className="flex items-center gap-4">
            {/* Notifications */ }
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {/* User Menu */ }
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      { getUserInitials() }
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      { user ? `${user.firstName} ${user.lastName}` : 'User' }
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{ user?.role || 'Guest' }</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              } />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Account & Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Language</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */ }
        <main className="flex-1 overflow-y-auto p-6">
          { children }
        </main>
      </div>
    </div>
  );
}
