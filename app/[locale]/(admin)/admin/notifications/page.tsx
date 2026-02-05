"use client";

import { SubHeader } from '@/components/subheader';
import { NotificationsView } from '@/components/notifications/notifications-view';
import { Button } from '@/components/dashboard-ui/button';
import { Check } from 'lucide-react';
import { useNotifications, useMarkAllNotificationsAsRead } from '@/lib/api/hooks/notifications';

export default function AdminNotificationsPage() {
  const { data: response } = useNotifications( 1, 50, false );
  const unreadCount = response?.data?.unread_count || 0;
  const markAllAsRead = useMarkAllNotificationsAsRead();

  return (
    <>
      <SubHeader
        title="Notifications"
        description="View and manage all notifications"
      >
        { unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={ () => markAllAsRead.mutate() }
            disabled={ markAllAsRead.isPending }
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        ) }
      </SubHeader>
      <NotificationsView />
    </>
  );
}
