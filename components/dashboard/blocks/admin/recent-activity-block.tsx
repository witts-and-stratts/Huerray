'use client';

import { ActionMenu, type MenuAction } from '@/components/dashboard-ui/action-menu';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/dashboard-ui/table';
import type { ModelsNotificationResponse } from '@/lib/api/generated/models';
import { useDeleteNotification, useMarkNotificationAsRead, useNotifications } from '@/lib/api/hooks/notifications';
import { timeAgo } from '@/lib/utils';

export function RecentActivityBlock() {
  const { data: response, isLoading, isError } = useNotifications( 1, 10, false );
  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();
  const notifications = response?.data?.notifications || [];

  const rows = notifications.map( ( notification ) => {
    const actorFromMessage = notification.message?.match( /'([^']+)'/ )?.[ 1 ];

    return {
      id: notification.id || `${ notification.event_name }-${ notification.created_at }`,
      eventName: notification.event_name || 'Unknown Event',
      eventType: notification.event_type || 'Unknown',
      actor: actorFromMessage || notification.title || 'System',
      when: notification.created_at ? timeAgo( notification.created_at ) : 'N/A',
      notification,
    };
  } );

  const actions: MenuAction<ModelsNotificationResponse>[] = [
    {
      label: 'Mark as read',
      action: ( item ) => {
        if ( !item.id ) return;
        markAsRead.mutate( item.id );
      },
      condition: ( item ) => !item.is_read,
    },
    {
      label: 'View',
      condition: ( item ) => !!item.action_url,
      action: ( item ) => {
        if ( item.action_url ) window.open( item.action_url, '_blank', 'noopener,noreferrer' );
      },
    },
    {
      label: 'Delete',
      variant: 'destructive',
      separator: true,
      condition: ( item ) => !!item.id,
      action: ( item ) => {
        if ( !item.id ) return;
        deleteNotification.mutate( item.id );
      },
    },
  ];

  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Recent Activity</CardTitle>
        <CardDescription className="ad-card-description">Latest event stream from notification activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px] rounded-lg border border-border/60" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
          <Table>
            <TableHeader className="bg-slate-50" sticky>
              <TableRow className="border-b border-border/60 bg-slate-50">
                <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Event Name</TableHead>
                <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Event Type</TableHead>
                <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">Actor</TableHead>
                <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">When</TableHead>
                <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { isLoading && Array.from( { length: 4 } ).map( ( _, index ) => (
                <TableRow key={ `recent-activity-skeleton-${ index }` } className="border-b border-border/40 bg-white">
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="px-4 py-3"><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="px-4 py-3 text-right"><Skeleton className="ml-auto h-8 w-8 rounded-md" /></TableCell>
                </TableRow>
              ) ) }

              { !isLoading && isError && (
                <TableRow className="border-b border-border/40 bg-white">
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground" colSpan={ 5 }>
                    Unable to load recent activity.
                  </TableCell>
                </TableRow>
              ) }

              { !isLoading && !isError && rows.length === 0 && (
                <TableRow className="border-b border-border/40 bg-white">
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground" colSpan={ 5 }>
                    No recent activity yet.
                  </TableCell>
                </TableRow>
              ) }

              { !isLoading && !isError && rows.map( ( item ) => (
                <TableRow key={ item.id } className="border-b border-border/40 bg-white">
                  <TableCell className="px-4 py-3 text-xs font-medium">{ item.eventName }</TableCell>
                  <TableCell className="px-4 py-3 text-xs">
                    <Badge variant="outline">{ item.eventType }</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">{ item.actor }</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground">{ item.when }</TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <ActionMenu actions={ actions } data={ item.notification } label="" />
                  </TableCell>
                </TableRow>
              ) ) }
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
