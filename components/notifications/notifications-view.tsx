"use client";

import { useDeleteNotification, useMarkNotificationAsRead, useNotifications } from "@/lib/api/hooks/notifications";
import { NotificationItem } from "./notification-item";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { NotificationsSkeleton } from "./notifications-skeleton";

export function NotificationsView() {
  const { data: response, isLoading } = useNotifications( 1, 50, false, {
    refetchInterval: 30000,
  } );

  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = response?.data?.notifications || [];

  const handleMarkAsRead = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    markAsRead.mutate( id );
  };

  const handleDelete = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    deleteNotification.mutate( id );
  };

  if ( isLoading ) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="px-5 w-full mx-auto flex-1">
      <div className="space-y-4 h-full">
        { notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          notifications.map( ( notification ) => (
            <NotificationItem
              key={ notification.id }
              notification={ notification }
              onMarkAsRead={ handleMarkAsRead }
              onDelete={ handleDelete }
            />
          ) )
        ) }
      </div>
    </div>
  );
}
