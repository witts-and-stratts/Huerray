import Link from 'next/link';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ArrowRight, BriefcaseBusiness, CirclePlus, UsersRound } from 'lucide-react';

const actions = [
  {
    label: 'Create Campaign',
    href: '/brand/campaigns/new',
    detail: 'Launch a new campaign briefing and approval request',
    icon: CirclePlus,
    priority: 'high',
  },
  {
    label: 'Find Creators',
    href: '/brand/creators',
    detail: 'Search creators that match your campaign goals',
    icon: UsersRound,
    priority: 'medium',
  },
  {
    label: 'Manage Gigs',
    href: '/brand/gigs',
    detail: 'Track gig setup, status, and creator activity',
    icon: BriefcaseBusiness,
    priority: 'medium',
  },
];

export function BrandActionCenterBlock() {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Action Center</CardTitle>
        <CardDescription className="ad-card-description">Common actions for campaign operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { actions.map( ( item ) => (
          <Link
            key={ item.label }
            href={ item.href }
            className="group rounded-lg border border-border/60 bg-white p-3 transition-colors hover:bg-muted/40"
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </span>
                <p className="text-sm font-medium text-foreground">{ item.label }</p>
              </div>
              <Badge variant={ item.priority === 'high' ? 'destructive' : 'secondary' }>
                { item.priority.toUpperCase() }
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{ item.detail }</p>
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ) ) }
      </CardContent>
    </Card>
  );
}
