import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelsBrandResponse } from '@/lib/api/generated/models';

interface BrandContactBlockProps {
  brand: ModelsBrandResponse;
}

export function BrandContactBlock({ brand }: BrandContactBlockProps) {
  const legacyNumber = ( brand as ModelsBrandResponse & { number?: string; } ).number;
  const address = [ brand?.street, brand?.building_number || legacyNumber, brand?.city, brand?.state, brand?.postal_code, brand?.country ]
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-3">
        <CardTitle className="ad-card-title">Contact & Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-start justify-between gap-3">
          <span className="ad-stat-label">Email</span>
          <span className="text-right">{brand?.preferred_contact_email || 'N/A'}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <span className="ad-stat-label">Phone</span>
          <span className="text-right">{brand?.preferred_contact_phone || 'N/A'}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <span className="ad-stat-label">Address</span>
          <span className="text-right">{address || 'N/A'}</span>
        </div>
      </CardContent>
    </Card>
  );
}
