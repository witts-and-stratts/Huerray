'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

interface CreatorAccountHeaderProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string; }[];
}

export function CreatorAccountHeader( { children, title, description, breadcrumbs }: CreatorAccountHeaderProps ) {
  const t = useTranslations( 'dashboard.creator' );
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname.includes( '/creator/account/change-password' ) ? '/creator/account/change-password' : '/creator/account/edit';

  const tabItems = [
    { value: '/creator/account/edit', label: t( 'accountEditPage.title' ) },
    { value: '/creator/account/change-password', label: t( 'settings.password.title' ) },
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
      { children }
    </SubHeader>
  );
}
