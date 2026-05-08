import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ActionCenterCard, type ActionItem } from '@/components/dashboard/blocks/shared/action-center-card';
import { ModelsNotificationResponse } from '@/lib/api/generated/models';
import { useNotifications } from '@/lib/api/hooks/notifications';
import { BellIcon, BriefcaseBusiness, CirclePlus, UsersRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const startOfToday = new Date();
startOfToday.setHours( 0, 0, 0, 0 );

function getUnreadCount( notifications: ModelsNotificationResponse[], unreadCount?: number, total?: number ) {
  if ( typeof unreadCount === 'number' ) return unreadCount;
  if ( typeof total === 'number' ) return total;
  return notifications.length;
}

export function BrandActionCenterBlock() {
  const t = useTranslations( 'dashboard.brand.landing.actionCenter' );
  const ta = useTranslations( 'dashboard.notifications.summaryCard' );
  const { data: response, isLoading, isError } = useNotifications( 1, 20, true );
  const unreadNotifications = response?.data?.notifications || [];

  const unreadCount = getUnreadCount(
    unreadNotifications,
    response?.data?.unread_count,
    response?.data?.total
  );

  const newToday = unreadNotifications.filter( ( notification ) => {
    if ( !notification.created_at ) return false;
    return new Date( notification.created_at ).getTime() >= startOfToday.getTime();
  } ).length;

  const actions: ActionItem[] = [
    {
      label: t( 'createCampaign.label' ),
      href: '/brand/campaigns/new',
      image: "/images/creators-taking-pictures.jpg",
      detail: t( 'createCampaign.detail' ),
      icon: CirclePlus,
      priority: 'high',
      fullBackground: true,
    },
    {
      label: t( 'findCreators.label' ),
      href: '/brand/creators',
      image: "/images/creators-collage.jpg",
      detail: t( 'findCreators.detail' ),
      icon: UsersRound,
      priority: 'medium',
      fullBackground: true,
    },
    {
      label: t( 'manageGigs.label' ),
      href: '/brand/campaigns',
      detail: t( 'manageGigs.detail' ),
      icon: BriefcaseBusiness,
      priority: 'medium',
      elem: <Card className="ad-summary-card flex flex-col h-full">
        <CardHeader>
          <CardTitle className="ad-card-title">{ ta( 'title' ) }</CardTitle>
          <CardDescription className="ad-card-description">{ ta( 'description' ) }</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 min-h-0 grow">
          <div className="ad-list-item-sm flex justify-between">
            <div>
              <p className="ad-stat-label mb-1.5">{ ta( 'unreadTotal' ) }</p>
              <p className="ad-stat-number">{ unreadCount }</p>
              <span className="ad-delta-neutral">{ ta( 'newToday', { count: newToday } ) }</span>
            </div>
            <BellIcon className="text-slate-200 size-15" strokeWidth={ 0.5 } />
          </div>

          { isLoading && <p className="text-xs text-muted-foreground">{ ta( 'loading' ) }</p> }
          { isError && <p className="text-xs text-destructive">{ ta( 'error' ) }</p> }
        </CardContent>
        <CardFooter className="flex-col justify-end gap-2 text-sm grow">
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full font-normal"
            nativeButton={ false }
            render={ <Link href={ '/brand/notifications' } /> }
          >
            { ta( 'viewAll' ) }
          </Button>
        </CardFooter>
      </Card>
    },
  ];

  return (
    <ActionCenterCard
      actions={ actions }
      description={ t( 'description' ) }
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
      noShell={ true }
    />
  );
}
