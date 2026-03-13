import Link from 'next/link';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ArrowRight, Bell, Briefcase, CreditCard, ShieldCheck, Users } from 'lucide-react';

const actions = [
  {
    label: 'Review Brand Profiles',
    href: '/admin/brands',
    detail: 'Pending verifications and profile quality checks',
    icon: ShieldCheck,
    priority: 'high',
  },
  {
    label: 'Review Creator Profiles',
    href: '/admin/creators',
    detail: 'Approval and return workflows for creator onboarding',
    icon: Users,
    priority: 'high',
  },
  {
    label: 'Review Campaign Pipeline',
    href: '/admin/campaigns',
    detail: 'Monitor approvals, live activity, and completion pacing',
    icon: Briefcase,
    priority: 'medium',
  },
  {
    label: 'Inspect Notifications',
    href: '/admin/notifications',
    detail: 'Investigate recent platform and moderation signals',
    icon: Bell,
    priority: 'medium',
  },
  {
    label: 'Open User Management',
    href: '/admin/users',
    detail: 'User status, access controls, and account maintenance',
    icon: Users,
    priority: 'normal',
  },
  {
    label: 'Check Payments',
    href: '/admin/payouts',
    detail: 'Payout health, transaction anomalies, and reconciliation',
    icon: CreditCard,
    priority: 'normal',
  },
];

export function ActionCenterBlock() {
  const primaryActions = actions.slice( 0, 3 );
  const secondaryActions = actions.slice( 3 );

  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Action Center</CardTitle>
        <CardDescription className="ad-card-description">Jump to the areas that require direct admin action</CardDescription>
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
                  { item.priority.toUpperCase() }
                </Badge>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">{ item.detail }</p>
              <div className="ad-action-link-open">
                Open
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
