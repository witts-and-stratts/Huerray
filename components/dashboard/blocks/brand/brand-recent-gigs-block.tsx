import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import { calculateGigSpend, toMoney, toShortDate } from './types';
import { useTranslations } from 'next-intl';

interface BrandRecentGigsBlockProps {
  gigs: ModelsGigResponse[];
}

export function BrandRecentGigsBlock( { gigs }: BrandRecentGigsBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.recentGigs' );
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { gigs.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
        ) }
        { gigs.map( ( gig ) => (
          <div key={ gig.id || `${ gig.title }-${ gig.created_at }` } className="rounded-lg border border-border/60 bg-white p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{ gig.title || t( 'untitledGig' ) }</p>
              <Badge variant="outline" className="capitalize">
                { String( gig.gig_status || 'created' ).replace( /_/g, ' ' ) }
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{ gig.campaign_name || t( 'noCampaignLinked' ) }</p>
            <p className="mt-1 text-xs text-muted-foreground">
              { t( 'budget' ) } { toMoney( calculateGigSpend( gig ) ) } { t( 'updated' ) } { toShortDate( gig.updated_at || gig.created_at ) }
            </p>
          </div>
        ) ) }
      </CardContent>
    </Card>
  );
}
