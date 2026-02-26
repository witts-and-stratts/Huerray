"use client";

import { NotificationsHeaderActions } from '@/components/notifications/notifications-header-actions';
import { NotificationsView } from '@/components/notifications/notifications-view';
import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';

export default function CreatorNotificationsPage() {
  const t = useTranslations( "dashboard.notifications" );
  return (
    <>
      <SubHeader
        title={ t( "title" ) }
        description={ t( "description" ) }
      >
        <NotificationsHeaderActions />
      </SubHeader>
      <NotificationsView />
    </>
  );
}
