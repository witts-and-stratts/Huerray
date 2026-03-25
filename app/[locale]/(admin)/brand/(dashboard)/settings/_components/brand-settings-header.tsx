'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

interface BrandSettingsHeaderProps {
  children?: React.ReactNode;
}

export function BrandSettingsHeader( { children }: BrandSettingsHeaderProps ) {
  const t = useTranslations('dashboard.brand.settingsPage');
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on the current path
  const getActiveTab = () => {
    if ( pathname.includes( '/settings/profile' ) ) return 'profile';
    if ( pathname.includes( '/settings/user-information' ) ) return 'user-information';
    if ( pathname.includes( '/settings/security' ) ) return 'security';
    return 'profile';
  };

  const activeTab = getActiveTab();

  const handleTabChange = ( value: string ) => {
    router.push( `/brand/settings/${ value }` );
  };

  const tabItems = [
    { value: 'user-information', label: t('tabs.userInformation') },
    { value: 'security', label: t('tabs.security') },
  ];

  const activeLabel = activeTab === 'profile'
    ? t( 'tabs.profile' )
    : tabItems.find( tab => tab.value === activeTab )?.label || t( 'tabs.profile' );

  const breadcrumbs = [
    { label: t('breadcrumbs.dashboard'), href: '/brand' },
    { label: t('breadcrumbs.settings'), href: '/brand/settings' },
    { label: activeLabel },
  ];

  const pageDetails: Record<string, { title: string; description: string; }> = {
    profile: {
      title: t('profileTitle'),
      description: t('profileDescription'),
    },
    'user-information': {
      title: t('userInformationTitle'),
      description: t('userInformationDescription'),
    },
    security: {
      title: t('securityTitle'),
      description: t('securityDescription'),
    },
  };

  const currentDetails = pageDetails[ activeTab ] || pageDetails.profile;

  return (
    <SubHeader
      breadcrumbs={ breadcrumbs }
      title={ currentDetails.title }
      description={ currentDetails.description }
      tabs={ activeTab === 'profile'
        ? undefined
        : (
          <SubHeaderTabs
            value={ activeTab }
            onChange={ handleTabChange }
            tabItems={ tabItems }
          />
        )
      }
    >
      { children }
    </SubHeader>
  );
}
