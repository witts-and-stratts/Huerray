import Link from 'next/link';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ArrowRight, Bell, Briefcase, CreditCard, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ActionCenterBlock() {
  const t = useTranslations( 'dashboard.admin' );

  const actions = [
    {
      label: t( 'dashboardBlocks.actionCenter.actions.reviewBrands.label' ),
      href: '/admin/brands',
      detail: t( 'dashboardBlocks.actionCenter.actions.reviewBrands.detail' ),
      icon: ShieldCheck,
      priority: 'high',
    },
    {
      label: t( 'dashboardBlocks.actionCenter.actions.reviewCreators.label' ),
      href: '/admin/creators',
      detail: t( 'dashboardBlocks.actionCenter.actions.reviewCreators.detail' ),
      icon: Users,
      priority: 'high',
    },
    {
      label: t( 'dashboardBlocks.actionCenter.actions.reviewCampaigns.label' ),
      href: '/admin/campaigns',
      detail: t( 'dashboardBlocks.actionCenter.actions.reviewCampaigns.detail' ),
      icon: Briefcase,
      priority: 'medium',
    },
    {
      label: t( 'dashboardBlocks.actionCenter.actions.inspectNotifications.label' ),
      href: '/admin/notifications',
      detail: t( 'dashboardBlocks.actionCenter.actions.inspectNotifications.detail' ),
      icon: Bell,
      priority: 'medium',
    },
    {
      label: t( 'dashboardBlocks.actionCenter.actions.openUsers.label' ),
      href: '/admin/users',
      detail: t( 'dashboardBlocks.actionCenter.actions.openUsers.detail' ),
      icon: Users,
      priority: 'normal',
    },
    {
      label: t( 'dashboardBlocks.actionCenter.actions.checkPayments.label' ),
      href: '/admin/payouts',
      detail: t( 'dashboardBlocks.actionCenter.actions.checkPayments.detail' ),
      icon: CreditCard,
      priority: 'normal',
    },
  ];

  const primaryActions = actions.slice( 0, 3 );
  const secondaryActions = actions.slice( 3 );

  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.actionCenter.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'dashboardBlocks.actionCenter.description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          { primaryActions.map( ( item ) => (
            <Link key={ item.label } href={ item.href } className="ad-action-link group block">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <item.icon className="size-4" />
                  </span>
                  <p className="text-sm font-medium text-foreground">{ item.label }</p>
                </div>
                <Badge variant={ item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'secondary' : 'outline' }>
                  { item.priority === 'high' ? t( 'dashboardBlocks.actionCenter.labels.priorityHigh' ) : item.priority === 'medium' ? t( 'dashboardBlocks.actionCenter.labels.priorityMedium' ) : t( 'dashboardBlocks.actionCenter.labels.priorityNormal' ) }
                </Badge>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">{ item.detail }</p>
              <div className="ad-action-link-open">
                { t( 'dashboardBlocks.actionCenter.labels.open' ) }
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ) ) }
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          { secondaryActions.map( ( item ) => (
            <Link
              key={ item.label }
              href={ item.href }
              className="ad-action-link group flex items-center justify-between px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2">
                <item.icon className="size-4 text-muted-foreground" />
                <span>{ item.label }</span>
              </span>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ) ) }
        </div>
      </CardContent>
    </Card>
  );
}
