"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { cn } from "@/lib/dashboard-utils";
import { timeAgo } from "@/lib/utils";
import { ModelsNotificationResponse } from "@/lib/api/generated";
import { useTranslations } from "next-intl";

interface NotificationRowProps {
  notification: ModelsNotificationResponse;
  isSelected: boolean;
  onClick: () => void;
}

export function NotificationRow( { notification, isSelected, onClick }: NotificationRowProps ) {
  const t = useTranslations( "dashboard.notifications" );
  const isUnread = !notification.is_read;

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "w-full text-left px-4 py-3 border-b border-border/50 transition-colors cursor-pointer",
        "hover:bg-primary/5",
        isSelected && "bg-primary/10 border-l-2 border-l-primary",
        isUnread && !isSelected && "bg-card",
        !isUnread && !isSelected && "bg-muted/20",
      ) }
    >
      <div className="flex items-start gap-3">
        {/* Unread dot */ }
        <div className="mt-1.5 shrink-0">
          { isUnread
            ? <span className="block w-2 h-2 rounded-full bg-primary" />
            : <span className="block w-2 h-2 rounded-full bg-transparent" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className={ cn(
              "text-sm truncate",
              isUnread ? "font-medium text-foreground" : "font-normal text-muted-foreground"
            ) }>
              { notification.title }
            </p>
            <span className="text-[11px] text-muted-foreground shrink-0">
              { timeAgo( notification.created_at! ) }
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            { notification.message?.replace( /<[^>]*>/g, "" ) }
          </p>

          { notification.event_type && (
            <Badge variant="outline" className="mt-1.5 h-4 px-1.5 text-[10px] capitalize font-normal">
              { t( `eventTypes.${ notification.event_type }` ) }
            </Badge>
          ) }
        </div>
      </div>
    </button>
  );
}
