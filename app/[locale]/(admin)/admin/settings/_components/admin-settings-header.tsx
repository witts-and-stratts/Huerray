'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

interface AdminSettingsHeaderProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function AdminSettingsHeader( {
  children,
  title,
  description,
  breadcrumbs,
}: AdminSettingsHeaderProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname.includes( '/admin/settings/security' )
    ? '/admin/settings/security'
    : '/admin/settings';

  const tabItems = [
    { value: '/admin/settings', label: t( 'accountEditPage.title' ) },
    { value: '/admin/settings/security', label: t( 'settings.password.title' ) },
  ];

  return (
    <SubHeader
      breadcrumbs={ breadcrumbs }
      title={ title }
      description={ description }
      tabs={
        <SubHeaderTabs
          value={ activeTab }
          onChange={ ( value ) => router.push( value ) }
          tabItems={ tabItems }
        />
      }
    >
      {children}
    </SubHeader>
  );
}
