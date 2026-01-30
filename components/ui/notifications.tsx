"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dashboard-ui/dropdown-menu";
import { Button, buttonVariants } from "../dashboard-ui/button";
import { Bell, Check, ChevronDown, ChevronUp, Ellipsis, EllipsisVertical, MegaphoneOff, Trash2 } from "lucide-react";
import type { Notification } from "@/lib/api/hooks/notifications";
import { Badge } from "../dashboard-ui/badge";
import { cn } from "@/lib/dashboard-utils";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead, useDeleteNotification } from "@/lib/api/hooks/notifications";
import { useState } from "react";
import Link from "next/link";

export function Notifications() {
  const [ isOpen, setIsOpen ] = useState( false );

  // Fetch notifications
  const { data: response, isLoading } = useNotifications( 1, 20, false, {
    refetchInterval: 30000,
  } );

  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = response?.data?.notifications || [];
  const unreadCount = response?.data?.unread_count || 0;

  // Simple relative time helper
  const timeAgo = ( dateStr: string ) => {
    try {
      const date = new Date( dateStr );
      const now = new Date();
      const diffInSeconds = Math.max( 0, Math.floor( ( now.getTime() - date.getTime() ) / 1000 ) );

      if ( diffInSeconds < 60 ) return 'Just now';
      if ( diffInSeconds < 3600 ) return `${ Math.floor( diffInSeconds / 60 ) }m ago`;
      if ( diffInSeconds < 86400 ) return `${ Math.floor( diffInSeconds / 3600 ) }h ago`;
      return `${ Math.floor( diffInSeconds / 86400 ) }d ago`;
    } catch {
      return '';
    }
  };

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

      <DropdownMenuContent align="end" className="w-80">
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
              <DropdownMenuItem onClick={ () => markAllAsRead.mutate() } disabled={ unreadCount === 0 || markAllAsRead.isPending }>
                <span>Mark all as read</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive" disabled={ notifications.length === 0 }>
                <span>Delete all</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          { isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-10 text-center text-xs text-muted-foreground/60 flex flex-col items-center gap-2">
              <MegaphoneOff className="size-6" strokeWidth={ 1 } />
              No notifications</div>
          ) : (
            notifications.map( ( notification ) => (
              <DropdownNotificationItem
                key={ notification.id }
                notification={ notification }
                onMarkAsRead={ handleMarkAsRead }
                onDelete={ handleDelete }
                timeAgo={ timeAgo }
              />
            ) )
          ) }
        </DropdownMenuGroup>

        <Link href='notifications' className="p-2 border-t">
          <Button variant="outline" size={ 'sm' } className="w-full justify-center text-xs">
            View all notifications
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DropdownNotificationItemProps {
  notification: Notification;
  onMarkAsRead: ( id: string, e?: React.MouseEvent ) => void;
  onDelete: ( id: string, e?: React.MouseEvent ) => void;
  timeAgo: ( dateStr: string ) => string;
}

function DropdownNotificationItem( { notification, onMarkAsRead, onDelete, timeAgo }: DropdownNotificationItemProps ) {
  const [ isExpanded, setIsExpanded ] = useState( false );
  const shouldTruncate = notification.message ? notification.message.length > 140 : false;
  const actionUrl = notification.action_url;

  const onAction = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    window.open( actionUrl, '_blank' );
  };

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
                <button
                  onClick={ ( e ) => {
                    e.stopPropagation();
                    setIsExpanded( !isExpanded );
                  } }
                  className="mt-1 flex items-center text-xs text-primary hover:underline focus:outline-hidden"
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
                </button>
              ) }
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              { timeAgo( notification.created_at ) }
            </p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            { !notification.is_read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary hover:bg-muted"
                onClick={ ( e ) => onMarkAsRead( notification.id, e ) }
                title="Mark as read"
              >
                <Check className="h-3 w-3" />
                <span className="sr-only">Mark as read</span>
              </Button>
            ) }
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={ ( e ) => e.stopPropagation() }
                >
                  <EllipsisVertical className="h-3 w-3" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                { !notification.is_read && (
                  <DropdownMenuItem onClick={ ( e ) => onMarkAsRead( notification.id, e ) }>
                    <span>Mark as read</span>
                  </DropdownMenuItem>
                ) }
                <DropdownMenuItem
                  onClick={ ( e ) => onDelete( notification.id, e ) }
                  className="text-destructive focus:text-destructive"
                >
                  <span>Delete</span>
                </DropdownMenuItem>
                { actionUrl && (
                  <DropdownMenuItem onClick={ ( e ) => onAction( notification.id, e ) }>
                    <span>View</span>
                  </DropdownMenuItem>
                ) }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className="my-0" />
    </div>
  );
}