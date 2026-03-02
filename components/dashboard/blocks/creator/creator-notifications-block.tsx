'use client';

import Link from 'next/link';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { useNotifications } from '@/lib/api/hooks/notifications';
import { useAuth } from '@/lib/auth/auth-context';

export function CreatorNotificationsBlock() {
  const { user } = useAuth();
  const { data: response, isLoading, isError } = useNotifications( 1, 20, true );
  const unreadNotifications = response?.data?.notifications || [];

  const unreadCount = typeof response?.data?.unread_count === 'number'
    ? response.data.unread_count
    : typeof response?.data?.total === 'number'
      ? response.data.total
      : unreadNotifications.length;

  const startOfToday = new Date();
  startOfToday.setHours( 0, 0, 0, 0 );

  const newToday = unreadNotifications.filter( ( notification ) => {
    if ( !notification.created_at ) return false;
    return new Date( notification.created_at ).getTime() >= startOfToday.getTime();
  } ).length;

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Unread Notifications</CardTitle>
        <CardDescription className="ad-card-description">Unread inbox count and latest pending items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg border border-border/60 bg-white p-2.5">
          <p className="ad-stat-label mb-1.5">Unread Total</p>
          <p className="text-2xl leading-none font-primary font-medium">{ unreadCount }</p>
          <span className="ad-delta-neutral">{ newToday > 0 ? `+${ newToday } today` : 'No new notifications today' }</span>
        </div>

        { isLoading && <p className="text-xs text-muted-foreground">Loading unread notifications...</p> }
        { isError && <p className="text-xs text-destructive">Unable to load unread notifications.</p> }
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full font-normal"
          render={ <Link href="/creator/notifications" /> }
        >
          View all notifications
        </Button>
      </CardFooter>
    </Card>
  );
}
