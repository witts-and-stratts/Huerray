'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import type { ModelsNotificationResponse } from '@/lib/api/generated/models';
import { useDeleteNotification, useMarkAllNotificationsAsRead, useNotifications } from '@/lib/api/hooks/notifications';

interface NotificationActionsData {
  notifications: ModelsNotificationResponse[];
}

export function NotificationsHeaderActions() {
  const t = useTranslations( 'dashboard.notifications' );
  const [ isDeleteAllOpen, setIsDeleteAllOpen ] = React.useState( false );
  const { data: response } = useNotifications( 1, 200, false );
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = response?.data?.notifications || [];
  const unreadCount = response?.data?.unread_count || 0;

  const handleDeleteAll = async () => {
    if ( notifications.length === 0 ) return;

    try {
      await Promise.all(
        notifications
          .filter( ( notification ) => Boolean( notification.id ) )
          .map( ( notification ) => deleteNotification.mutateAsync( notification.id! ) )
      );
      toast.success( t( 'toast.deleteAllSuccess' ) );
    } catch {
      toast.error( t( 'toast.deleteAllError' ) );
    }
  };

  const actions: MenuAction<NotificationActionsData>[] = [
    {
      label: t( 'actions.markAllAsRead' ),
      action: () => markAllAsRead.mutate(),
      disabled: unreadCount === 0,
    },
    {
      label: t( 'actions.deleteAll' ),
      variant: 'destructive',
      separator: true,
      action: () => setIsDeleteAllOpen( true ),
      condition: () => notifications.length > 0,
    },
  ];

  if ( unreadCount === 0 && notifications.length === 0 ) {
    return null;
  }

  return (
    <>
      <ButtonGroup className='items-center'>
        <Button
          variant='outline'
          size='default'
          className='hidden sm:flex'
          onClick={ () => markAllAsRead.mutate() }
          disabled={ markAllAsRead.isPending || unreadCount === 0 }
        >
          <Check className='mr-2 size-4' />
          { t( 'actions.markAllAsRead' ) }
        </Button>

        <ActionMenu
          actions={ actions }
          data={ { notifications } }
          label=''
          trigger={
            <Button variant='outline' size='default' className='font-regular max-md:border-l max-md:rounded-l-md'>
              <ChevronDown className='size-4' />
            </Button>
          }
        />
      </ButtonGroup>

      <ConfirmDialog
        open={ isDeleteAllOpen }
        onOpenChange={ setIsDeleteAllOpen }
        title={ t( 'confirm.deleteAllTitle' ) }
        description={ t( 'confirm.deleteAllDescription' ) }
        confirmLabel={ t( 'confirm.deleteAllConfirm' ) }
        variant='destructive'
        onConfirm={ async () => {
          await handleDeleteAll();
          setIsDeleteAllOpen( false );
        } }
        isLoading={ deleteNotification.isPending }
        loadingText={ t( 'confirm.deleting' ) }
      />
    </>
  );
}
