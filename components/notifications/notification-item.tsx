"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dashboard-ui/dropdown-menu";
import { cn } from "@/lib/dashboard-utils";
import { timeAgo } from "@/lib/utils";
import { Bell, Check, ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { ModelsNotificationResponse } from "@/lib/api/generated";

interface NotificationItemProps {
  notification: ModelsNotificationResponse;
  onMarkAsRead: ( id: string, e?: React.MouseEvent ) => void;
  onDelete: ( id: string, e?: React.MouseEvent ) => void;
}

export function NotificationItem( { notification, onMarkAsRead, onDelete }: NotificationItemProps ) {
  const [ isExpanded, setIsExpanded ] = useState( false );
  const shouldTruncate = notification.message ? notification.message.length > 140 : false;

  return (
    <div
      className={ cn(
        "group relative flex w-full gap-4 p-4 rounded-lg border transition-all hover:shadow-sm",
        !notification.is_read ? "bg-card border-l-4 border-l-primary" : "bg-muted/30 border-muted"
      ) }
    >
      <div className="mt-1">
        <div className={ cn( "flex h-8 w-8 items-center justify-center rounded-full", !notification.is_read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground" ) }>
          <Bell className="h-4 w-4" strokeWidth={ 1 } />
        </div>
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <p className={ cn( "font-medium", !notification.is_read ? "text-primary" : "text-muted-foreground" ) }>
              { notification.title }
              { !notification.is_read && (
                <Badge variant="destructive" className="ml-2 h-1.5 w-1.5 rounded-full p-0 overflow-hidden text-transparent" />
              ) }
            </p>
            <div className="relative">
              <p className={ cn(
                "mt-1 text-sm text-muted-foreground text-regular",
                !isExpanded && "line-clamp-4"
              ) }>
                { notification.message }
              </p>
              { shouldTruncate && (
                <button
                  onClick={ () => setIsExpanded( !isExpanded ) }
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
            <p className="mt-2 text-xs text-muted-foreground">
              { timeAgo( notification.created_at! ) }
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 transition-opacity absolute top-4 right-2">
        { !notification.is_read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={ ( e ) => onMarkAsRead( notification.id!, e ) }
            title="Mark as read"
          >
            <Check className="h-4 w-4" />
          </Button>
        ) }
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <EllipsisVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            { !notification.is_read && (
              <DropdownMenuItem onClick={ ( e ) => onMarkAsRead( notification.id!, e ) }>
                <span>Mark as read</span>
              </DropdownMenuItem>
            ) }
            <DropdownMenuItem
              onClick={ ( e ) => onDelete( notification.id!, e ) }
              className="text-destructive focus:text-destructive text-sm"
            >
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
