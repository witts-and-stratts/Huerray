import Link from 'next/link';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

const actions = [
  { label: 'Review Brand Profiles', href: '/admin/brands' },
  { label: 'Review Creator Profiles', href: '/admin/creators' },
  { label: 'Review Campaign Pipeline', href: '/admin/campaigns' },
  { label: 'Inspect Notifications', href: '/admin/notifications' },
  { label: 'Open User Management', href: '/admin/users' },
  { label: 'Check Payments', href: '/admin/payments' },
];

export function ActionCenterBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Action Center</CardTitle>
        <CardDescription className="ad-card-description">Jump to the areas that require direct admin action</CardDescription>
      </CardHeader>
      <CardContent className="ad-action-grid">
        { actions.map( ( item ) => (
          <Button
            key={ item.label }
            variant="outline"
            className="ad-action-btn"
            render={ <Link href={ item.href } /> }
          >
            { item.label }
          </Button>
        ) ) }
      </CardContent>
    </Card>
  );
}
