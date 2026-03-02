import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Film, Inbox, Settings } from 'lucide-react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

const actions = [
  {
    label: 'Browse Gigs',
    href: '/creator/gigs',
    detail: 'Discover new gig opportunities that match your profile',
    icon: BriefcaseBusiness,
    priority: 'high',
  },
  {
    label: 'View Invitations',
    href: '/creator/invitations',
    detail: 'Review invitations from brands and accept or decline',
    icon: Inbox,
    priority: 'medium',
  },
  {
    label: 'My Submissions',
    href: '/creator/my-gigs',
    detail: 'Track your video submissions and approval status',
    icon: Film,
    priority: 'medium',
  },
  {
    label: 'Update Profile',
    href: '/creator/settings',
    detail: 'Keep your profile up-to-date for better gig matches',
    icon: Settings,
    priority: 'low',
  },
];

export function CreatorActionCenterBlock() {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Action Center</CardTitle>
        <CardDescription className="ad-card-description">Quick actions for your creator workflow</CardDescription>
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
