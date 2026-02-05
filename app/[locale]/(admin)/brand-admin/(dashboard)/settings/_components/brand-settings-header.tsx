'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface BrandSettingsHeaderProps {
  children?: React.ReactNode;
}

export function BrandSettingsHeader( { children }: BrandSettingsHeaderProps ) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on the current path
  const getActiveTab = () => {
    if ( pathname.includes( '/settings/profile' ) ) return 'profile';
    if ( pathname.includes( '/settings/security' ) ) return 'security';
    return 'profile';
  };

  const activeTab = getActiveTab();

  const handleTabChange = ( value: string ) => {
    router.push( `/brand-admin/settings/${ value }` );
  };

  const tabItems = [
    { value: 'profile', label: 'Brand Profile' },
    { value: 'security', label: 'Security' },
  ];

  const activeLabel = tabItems.find( t => t.value === activeTab )?.label || 'Brand Profile';

  const breadcrumbs = [
    { label: 'Dashboard', href: '/brand-admin' },
    { label: 'Settings', href: '/brand-admin/settings' },
    { label: activeLabel },
  ];

  const pageDetails: Record<string, { title: string; description: string; }> = {
    profile: {
      title: 'Brand Profile',
      description: 'Update your brand details and public profile.',
    },
    security: {
      title: 'Security',
      description: 'Manage your password and security sessions.',
    },
  };

  const currentDetails = pageDetails[ activeTab ] || pageDetails.profile;

  return (
    <SubHeader
      breadcrumbs={ breadcrumbs }
      title={ currentDetails.title }
      description={ currentDetails.description }
      tabs={
        <SubHeaderTabs
          value={ activeTab }
          onChange={ handleTabChange }
          tabItems={ tabItems }
        />
      }
    >
      { children }
    </SubHeader>
  );
}
