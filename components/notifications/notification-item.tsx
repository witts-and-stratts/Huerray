"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ModelsNotificationResponse } from "@/lib/api/generated";
import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { Card, CardContent } from "@/components/dashboard-ui/card";
import { cn } from "@/lib/dashboard-utils";
import { useTimeAgo } from "@/lib/hooks/format";

interface NotificationItemProps {
  notification: ModelsNotificationResponse;
  onMarkAsRead: ( id: string, e?: React.MouseEvent ) => void;
  onDelete: ( id: string, e?: React.MouseEvent ) => void;
}

export function NotificationItem( { notification, onMarkAsRead, onDelete }: NotificationItemProps ) {
  const t = useTranslations( "dashboard.notifications" );
  const formatTimeAgo = useTimeAgo();
  const [ isExpanded, setIsExpanded ] = useState( false );
  const shouldTruncate = notification.message ? notification.message.length > 140 : false;
  const eventType = notification.event_type || t( "item.eventTypeFallback" );

  const actions: MenuAction<ModelsNotificationResponse>[] = [
    {
      label: t( "actions.markAsRead" ),
      condition: ( item ) => !item.is_read,
      action: ( item ) => onMarkAsRead( item.id! ),
    },
    {
      label: t( "actions.delete" ),
      variant: "destructive",
      separator: true,
      action: ( item ) => onDelete( item.id! ),
    },
  ];

  return (
    <Card
      className={ cn(
        "group relative transition-all hover:shadow-sm py-0 hover:bg-background",
        !notification.is_read ? "bg-card border-primary/40" : "bg-muted/20 border-border/70"
      ) }
    >
      <CardContent className="flex w-full gap-4 px-6 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-1.5">
                <p className={ cn( "font-medium", !notification.is_read ? "text-primary" : "text-muted-foreground" ) }>
                  { notification.title }
                </p>
                { !notification.is_read && (
                  <Badge variant="destructive" className="h-1.5 w-1.5 rounded-full p-0 overflow-hidden text-transparent" />
                ) }
              </div>
              <div className="relative">
                <p
                  className={ cn(
                    "mt-1 text-sm text-muted-foreground/90! font-normal! text-regular max-w-[500px]",
                    !isExpanded && "line-clamp-4"
                  ) }
                  dangerouslySetInnerHTML={ { __html: notification.message?.replace( "/n", "<br/>" ) ?? "" } }
                />
                { shouldTruncate && (
                  <button
                    onClick={ () => setIsExpanded( !isExpanded ) }
                    className="mt-1 flex items-center text-xs text-primary hover:underline focus:outline-hidden"
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
                  </button>
                ) }
              </div>
              <div className="mt-5 flex items-center justify-between gap-2 opacity-90">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-1.5 py-0 capitalize">
                    { eventType.replace( /_/g, " " ) }
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    { formatTimeAgo( notification.created_at! ) }
                  </p>
                </div>
              </div>
            </div>
            <ButtonGroup className="items-center">
              { !notification.is_read && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={ ( e ) => onMarkAsRead( notification.id!, e ) }
                  title={ t( "actions.markAsRead" ) }
                >
                  <Check className="h-4 w-4" />
                </Button>
              ) }
              <ActionMenu
                actions={ actions }
                data={ notification }
                label=""
                trigger={
                  <Button variant="outline" size="sm" className="font-regular">
                    <ChevronDown className="size-4" />
                  </Button>
                }
              />
            </ButtonGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
