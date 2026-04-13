'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { CreateNotificationSheet } from '@/components/notifications/create-notification-sheet';
import type { ModelsNotificationResponse } from '@/lib/api/generated/models';
import { useAuth } from '@/lib/auth/auth-context';
import { useDeleteNotification, useMarkAllNotificationsAsRead, useNotifications } from '@/lib/api/hooks/notifications';
import { RoleGuard } from '../auth/role-guard';

interface NotificationActionsData {
  notifications: ModelsNotificationResponse[];
}

export function NotificationsHeaderActions() {
  const t = useTranslations( 'dashboard.notifications' );
  const [ isDeleteAllOpen, setIsDeleteAllOpen ] = React.useState( false );
  const [ isCreateOpen, setIsCreateOpen ] = React.useState( false );
  const { user } = useAuth();
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

  const isAdmin = user?.role === 'admin';

  if ( !isAdmin && unreadCount === 0 && notifications.length === 0 ) {
    return null;
  }

  return (
    <div className='flex gap-2 max-md:self-end'>
      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <Button
          variant='outline'
          size='icon'
          onClick={ () => setIsCreateOpen( true ) }
          className={ 'rounded-full border-dashed' }
        >
          <Plus className='size-4' strokeWidth={ 1 } />
        </Button>
      </RoleGuard>
      <ButtonGroup className='items-center items-start'>
        <Button
          variant='outline'
          size='default'
          className='hidden md:flex'
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
            <Button variant='outline' size='default' className='font-regular max-md:border-l-1! max-md:rounded-l-md!'>
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

      <CreateNotificationSheet
        open={ isCreateOpen }
        onOpenChange={ setIsCreateOpen }
      />
    </div>
  );
}
