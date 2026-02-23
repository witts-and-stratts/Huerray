"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { ModelsNotificationListResponse, ModelsNotificationResponse } from "@/lib/api/generated";
import { useDeleteNotification, useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotifications } from "@/lib/api/hooks/notifications";
import { cn } from "@/lib/dashboard-utils";
import { getNotificationActionLabel } from "@/lib/notification-utils";
import { timeAgo } from "@/lib/utils";
import { Bell, Check, ChevronDown, ChevronUp, EllipsisVertical, MegaphoneOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../dashboard-ui/badge";
import { Button, buttonVariants } from "../dashboard-ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dashboard-ui/dropdown-menu";
import { AnimatePresence } from "motion/react";

export function Notifications() {
  const [ isOpen, setIsOpen ] = useState( false );

  // Fetch notifications
  const { data: response, isLoading } = useNotifications( 1, 20, false, {
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  } );

  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = response?.data?.notifications || [];
  const unreadCount = response?.data?.unread_count || 0;

  const handleMarkAsRead = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    markAsRead.mutate( id );
  };

  const handleDelete = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    deleteNotification.mutate( id );
  };

  return (
    <DropdownMenu open={ isOpen } onOpenChange={ setIsOpen }>
      <NotificationsTrigger unreadCount={ unreadCount } />

      <DropdownMenuContent align="end" className="w-80 flex flex-col">
        <NotificationsHeader
          unreadCount={ unreadCount }
          hasNotifications={ notifications.length > 0 }
          isMarkAllPending={ markAllAsRead.isPending }
          onMarkAllAsRead={ () => markAllAsRead.mutate() }
        />
        <DropdownMenuSeparator />

        <NotificationsList
          isLoading={ isLoading }
          notifications={ notifications }
          onMarkAsRead={ handleMarkAsRead }
          onDelete={ handleDelete }
        />
        <Link href='notifications' className="p-2 border-t w-full">
          <Button variant="outline" size={ 'sm' } className="w-full justify-center text-xs">
            View all notifications
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationsTriggerProps {
  unreadCount: number;
}

function NotificationsTrigger( { unreadCount }: NotificationsTriggerProps ) {
  return (
    <DropdownMenuTrigger className={ cn( buttonVariants( { variant: "ghost", size: "icon" } ), "relative" ) }>
      <Bell className="h-5 w-5" />
      { unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center pointer-events-none"
        >
          { unreadCount > 99 ? '99+' : unreadCount }
        </Badge>
      ) }
      <span className="sr-only">Notifications</span>
    </DropdownMenuTrigger>
  );
}

interface NotificationsHeaderProps {
  unreadCount: number;
  hasNotifications: boolean;
  isMarkAllPending: boolean;
  onMarkAllAsRead: () => void;
}

function NotificationsHeader( {
  unreadCount,
  hasNotifications,
  isMarkAllPending,
  onMarkAllAsRead,
}: NotificationsHeaderProps ) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <span className="font-normal font-primary text-primary">Notifications</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={ onMarkAllAsRead } disabled={ unreadCount === 0 || isMarkAllPending }>
            <span>Mark all as read</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={ !hasNotifications }>
            <span>Delete all</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface NotificationsListProps {
  isLoading: boolean;
  notifications: ModelsNotificationListResponse[ "notifications" ];
  onMarkAsRead: ( id: string, e?: React.MouseEvent ) => void;
  onDelete: ( id: string, e?: React.MouseEvent ) => void;
}

function NotificationsList( { isLoading, notifications, onMarkAsRead, onDelete }: NotificationsListProps ) {
  return (
    <DropdownMenuGroup className="max-h-[300px] overflow-y-auto overflow-x-hidden">
      { isLoading ? (
        <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
      ) : notifications?.length === 0 ? (
        <div className="p-10 text-center text-xs text-muted-foreground/60 flex flex-col items-center gap-2">
          <MegaphoneOff className="size-6" strokeWidth={ 1 } />
          No notifications
        </div>
      ) : (
        notifications?.map( ( notification ) => (
          <DropdownNotificationItem
            key={ notification.id! }
            notification={ notification }
            onMarkAsRead={ onMarkAsRead }
            onDelete={ onDelete }
            timeAgo={ timeAgo }
          />
        ) )
      ) }
    </DropdownMenuGroup>
  );
}

interface DropdownNotificationItemProps {
  notification: ModelsNotificationResponse;
  onMarkAsRead: ( id: string, e?: React.MouseEvent ) => void;
  onDelete: ( id: string, e?: React.MouseEvent ) => void;
  timeAgo: ( dateStr: string ) => string;
}

function DropdownNotificationItem( { notification, onMarkAsRead, onDelete, timeAgo }: DropdownNotificationItemProps ) {
  const [ isExpanded, setIsExpanded ] = useState( false );
  const shouldTruncate = notification.message ? notification.message.length > 140 : false;
  const actionUrl = notification.action_url;

  const onAction = () => {
    window.open( actionUrl, '_blank' );
  };

  const actions: MenuAction<ModelsNotificationResponse>[] = [
    {
      label: "Mark as read",
      action: ( data ) => onMarkAsRead( data.id! ),
      condition: ( data ) => !data.is_read,
    },
    {
      label: "View",
      action: onAction,
      condition: () => Boolean( actionUrl ),
    },
    {
      label: "Delete",
      action: ( data ) => onDelete( data.id! ),
      variant: "destructive",
      separator: true,
    },
  ];

  return (
    <div key={ notification.id } className="relative group">
      <div
        className={ cn(
          "pl-4 py-3 hover:bg-muted/50 transition-colors cursor-default",
          !notification.is_read && "bg-muted/20"
        ) }
      >
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <p className={ cn( "text-sm", !notification.is_read ? "font-semibold text-foreground" : "font-medium text-muted-foreground" ) }>
              { notification.title }
            </p>
            <div className="relative">
              <p className={ cn(
                "text-sm text-muted-foreground leading-snug wrap-break-word",
                !isExpanded && "line-clamp-4"
              ) }>
                { notification.message }
              </p>
              { shouldTruncate && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={ ( e ) => {
                    e.stopPropagation();
                    setIsExpanded( !isExpanded );
                  } }
                >
                  { isExpanded ? (
                    <>
                      Show less <ChevronUp className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="ml-1 h-3 w-3" />
                    </>
                  ) }
                </Button>
              ) }
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              { timeAgo( notification.created_at! ) }
            </p>
            <AnimatePresence>
              { notification.action_url && (
                <Button variant='outline' size='xs' onClick={ () => window.open( notification.action_url, '_blank' ) } className={ 'mt-2' }>
                  { getNotificationActionLabel( notification ) }
                </Button>
              ) }
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            { !notification.is_read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary hover:bg-muted"
                onClick={ ( e ) => onMarkAsRead( notification.id!, e ) }
                title="Mark as read"
              >
                <Check className="h-3 w-3" />
                <span className="sr-only">Mark as read</span>
              </Button>
            ) }
            <ActionMenu
              actions={ actions }
              data={ notification }
              label=""
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={ ( e ) => e.stopPropagation() }
                >
                  <EllipsisVertical className="h-3 w-3" />
                  <span className="sr-only">Actions</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className="my-0" />
    </div>
  );
}
