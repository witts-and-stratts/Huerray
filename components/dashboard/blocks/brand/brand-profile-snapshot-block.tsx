import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import type { ModelsBrandResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

interface BrandProfileSnapshotBlockProps {
  brand: ModelsBrandResponse | null;
  fallbackName: string;
  fallbackEmail?: string;
}

export function BrandProfileSnapshotBlock( { brand, fallbackName, fallbackEmail }: BrandProfileSnapshotBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.profileSnapshot' );
  const brandName = brand?.company_name || fallbackName || t( 'brandAccount' );
  const brandAvatar = brand?.profile_photo?.asset || '';

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <div className="text-center">
          <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
          <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
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
          <p className="ad-stat-label">{ t( 'brand' ) }</p>
          <p className="text-sm font-medium">{ brandName }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'preferredContact' ) }</p>
          <p className="text-sm">{ brand?.preferred_contact_email || fallbackEmail || t( 'na' ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'category' ) }</p>
          <p className="text-sm capitalize">{ String( brand?.category || t( 'na' ) ).replace( /_/g, ' ' ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'location' ) }</p>
          <p className="text-sm">{ [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' ) || t( 'na' ) }</p>
        </div>
      </CardContent>
    </Card>
  );
}
