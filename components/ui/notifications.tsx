"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { ModelsNotificationListResponse, ModelsNotificationResponse } from "@/lib/api/generated";
import { useDeleteNotification, useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotifications } from "@/lib/api/hooks/notifications";
import { config } from "@/lib/config";
import { useAuth } from "@/lib/auth/auth-context";
import { cn } from "@/lib/dashboard-utils";
import { getNotificationsPagePath } from "@/lib/notification-utils";
import { useTimeAgo } from "@/lib/hooks/format";
import { Bell, Check, ChevronDown, ChevronUp, EllipsisVertical, MegaphoneOff } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotificationAction } from "../notifications/use-notification-action";
import { Badge } from "../dashboard-ui/badge";
import { Button, buttonVariants } from "../dashboard-ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dashboard-ui/dropdown-menu";
import { AnimatePresence } from "motion/react";

export function Notifications() {
  const [ isOpen, setIsOpen ] = useState( false );
  const { user } = useAuth();
  const locale = useLocale();
  const tCommon = useTranslations( "dashboard.common" );
  const router = useRouter();

  // Fetch notifications
  const { data: response, isLoading } = useNotifications( 1, 20, false, {
    refetchInterval: config.polling.notificationsInterval,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  } );

  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = response?.data?.notifications || [];
  const unreadCount = response?.data?.unread_count || 0;
  const notificationsPagePath = `/${ locale }${ getNotificationsPagePath( user?.role ) }`;

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
        <div className="p-2 border-t w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center text-xs"
            onClick={ () => {
              setIsOpen( false );
              router.push( notificationsPagePath );
            } }
          >
            { tCommon( "viewAllNotifications" ) }
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationsTriggerProps {
  unreadCount: number;
}

function NotificationsTrigger( { unreadCount }: NotificationsTriggerProps ) {
  const tCommon = useTranslations( "dashboard.common" );

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
      <span className="sr-only">{ tCommon( "notifications" ) }</span>
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
  const t = useTranslations( "dashboard.notifications" );

  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <span className="font-normal font-primary text-primary">{ t( "title" ) }</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">{ t( "actions.menu" ) }</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={ onMarkAllAsRead } disabled={ unreadCount === 0 || isMarkAllPending }>
            <span>{ t( "actions.markAllAsRead" ) }</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={ !hasNotifications }>
            <span>{ t( "actions.deleteAll" ) }</span>
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
  const t = useTranslations( "dashboard.notifications" );
  const tCommon = useTranslations( "dashboard.common" );

  return (
    <DropdownMenuGroup className="max-h-[300px] overflow-y-auto overflow-x-hidden">
      { isLoading ? (
        <div className="p-4 text-center text-sm text-muted-foreground">{ tCommon( "loading" ) }</div>
      ) : notifications?.length === 0 ? (
        <div className="p-10 text-center text-xs text-muted-foreground/60 flex flex-col items-center gap-2">
          <MegaphoneOff className="size-6" strokeWidth={ 1 } />
          { t( "empty.overlayTitle" ) }
        </div>
      ) : (
        notifications?.map( ( notification ) => (
          <DropdownNotificationItem
            key={ notification.id! }
            notification={ notification }
            onMarkAsRead={ onMarkAsRead }
            onDelete={ onDelete }
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
}

function DropdownNotificationItem( { notification, onMarkAsRead, onDelete }: DropdownNotificationItemProps ) {
  const formatTimeAgo = useTimeAgo();
  const [ isExpanded, setIsExpanded ] = useState( false );
  const shouldTruncate = notification.message ? notification.message.length > 140 : false;
  const { action, handleAction, overlay } = useNotificationAction( notification );
  const t = useTranslations( "dashboard.notifications" );
  const tCommon = useTranslations( "dashboard.common" );

  const actions: MenuAction<ModelsNotificationResponse>[] = [
    {
      label: t( "actions.markAsRead" ),
      action: ( data ) => onMarkAsRead( data.id! ),
      condition: ( data ) => !data.is_read,
    },
    {
      label: action.label,
      action: handleAction,
      condition: () => action.kind !== "none",
    },
    {
      label: t( "actions.delete" ),
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
            <p className={ cn( "text-sm flex items-start gap-2", !notification.is_read ? "font-semibold text-primary" : "font-medium text-muted-foreground" ) }>
              {/* { !notification.is_read && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              ) } */}
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
                      { t( "item.showLess" ) } <ChevronUp className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      { t( "item.showMore" ) } <ChevronDown className="ml-1 h-3 w-3" />
                    </>
                  ) }
                </Button>
              ) }
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              { formatTimeAgo( notification.created_at! ) }
            </p>
            <AnimatePresence>
              { action.kind !== "none" && (
                <Button variant='outline' size='xs' onClick={ handleAction } className={ 'mt-2' }>
                  { action.label }
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
                title={ t( "actions.markAsRead" ) }
              >
                <Check className="h-3 w-3" />
                <span className="sr-only">{ t( "actions.markAsRead" ) }</span>
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
                  <span className="sr-only">{ tCommon( "actions" ) }</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
      { overlay }
      <DropdownMenuSeparator className="my-0" />
    </div>
  );
}
