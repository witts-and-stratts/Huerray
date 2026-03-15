import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import type { ModelsBrandResponse } from '@/lib/api/generated/models';

interface BrandProfileSnapshotBlockProps {
  brand: ModelsBrandResponse | null;
  fallbackName: string;
  fallbackEmail?: string;
}

export function BrandProfileSnapshotBlock( { brand, fallbackName, fallbackEmail }: BrandProfileSnapshotBlockProps ) {
  const brandName = brand?.company_name || fallbackName || 'Brand account';
  const brandAvatar = brand?.profile_photo?.asset || '';

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <div className="text-center">
          <CardTitle className="ad-card-title">Brand Snapshot</CardTitle>
          <CardDescription className="ad-card-description">Profile and account essentials</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg border border-border/60 bg-white p-4">
          <Avatar className="size-24 border border-border/60 bg-white mx-auto">
            <AvatarImage src={ brandAvatar } alt={ brandName } />
            <AvatarFallback className="text-xl">{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Brand</p>
          <p className="text-sm font-medium">{ brandName }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Preferred Contact</p>
          <p className="text-sm">{ brand?.preferred_contact_email || fallbackEmail || 'N/A' }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Category</p>
          <p className="text-sm capitalize">{ String( brand?.category || 'N/A' ).replace( /_/g, ' ' ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Location</p>
          <p className="text-sm">{ [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' ) || 'N/A' }</p>
        </div>
      </CardContent>
    </Card>
  );
}
