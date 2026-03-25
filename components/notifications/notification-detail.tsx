"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";
import { cn } from "@/lib/dashboard-utils";
import { timeAgo } from "@/lib/utils";
import { ModelsNotificationResponse } from "@/lib/api/generated";
import { useNotificationAction } from "./use-notification-action";
import { useTranslations } from "next-intl";
import { ArrowLeft, Check, ChevronDown, Megaphone } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NotificationDetailProps {
  notification: ModelsNotificationResponse | null;
  onMarkAsRead: ( id: string ) => void;
  onDelete: ( id: string ) => void;
  onBack?: () => void;
}

interface NotificationDetailHeaderProps {
  notification: ModelsNotificationResponse;
  onMarkAsRead: ( id: string ) => void;
  onDelete: ( id: string ) => void;
  onBack?: () => void;
}

interface NotificationDetailBodyProps {
  notification: ModelsNotificationResponse;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotificationDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground select-none w-full">
      <Megaphone className="size-12 opacity-20" strokeWidth={ 1 } />
      <p className="text-sm">Select a notification to read it</p>
    </div>
  );
}

function NotificationDetailHeader( { notification, onMarkAsRead, onDelete, onBack }: NotificationDetailHeaderProps ) {
  const t = useTranslations( "dashboard.notifications" );
  const isUnread = !notification.is_read;

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
    <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60 shrink-0">
      { onBack && (
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -ml-2" onClick={ onBack }>
          <ArrowLeft className="size-4" />
        </Button>
      ) }

      <div className="flex-1 min-w-0">
        <h2 className={ cn(
          "text-base leading-snug",
          isUnread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
        ) }>
          { notification.title }
        </h2>

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          { notification.event_type && (
            <Badge variant="outline" className="capitalize text-[11px] font-normal px-1.5 py-0">
              { notification.event_type.replace( /_/g, " " ) }
            </Badge>
          ) }
          { notification.priority && notification.priority !== "normal" && (
            <Badge
              variant={ notification.priority === "high" ? "destructive" : "secondary" }
              className="capitalize text-[11px] font-normal px-1.5 py-0"
            >
              { notification.priority }
            </Badge>
          ) }
          <span className="text-xs text-muted-foreground">
            { timeAgo( notification.created_at! ) }
          </span>
        </div>
      </div>

      <ButtonGroup className="items-center shrink-0">
        { isUnread && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={ () => onMarkAsRead( notification.id! ) }
            title={ t( "actions.markAsRead" ) }
          >
            <Check className="size-4" />
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
  );
}

function NotificationDetailBody( { notification }: NotificationDetailBodyProps ) {
  const { action, handleAction, overlay } = useNotificationAction( notification );
  const canAct = action.kind !== "none";

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="px-6 py-5">
          <div
            className="text-base text-foreground/80 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={ { __html: notification.message?.replace( /\n/g, "<br/>" ) ?? "" } }
          />

          { canAct && (
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={ handleAction }
              >
                { action.label }
              </Button>
            </div>
          ) }
        </div>
      </ScrollArea>
      { overlay }
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function NotificationDetail( { notification, onMarkAsRead, onDelete, onBack }: NotificationDetailProps ) {
  if ( !notification ) return <NotificationDetailEmpty />;

  return (
    <div className="flex flex-col h-full flex-1">
      <NotificationDetailHeader
        notification={ notification }
        onMarkAsRead={ onMarkAsRead }
        onDelete={ onDelete }
        onBack={ onBack }
      />
      <NotificationDetailBody notification={ notification } />
    </div>
  );
}
