"use client";

import { NotificationsHeaderActions } from '@/components/notifications/notifications-header-actions';
import { NotificationsView } from '@/components/notifications/notifications-view';
import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';

export default function NotificationsPage() {
  const t = useTranslations( "dashboard.notifications" );
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <SubHeader
        title={ t( "title" ) }
        description={ t( "descriptionBrand" ) }
      >
        <NotificationsHeaderActions />
      </SubHeader>
      <NotificationsView />
    </div>
  );
}
