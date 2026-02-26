import Link from 'next/link';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { campaignStatusVariant, toShortDate } from './types';

interface BrandRecentCampaignsBlockProps {
  campaigns: ModelsCampaignResponse[];
}

export function BrandRecentCampaignsBlock( { campaigns }: BrandRecentCampaignsBlockProps ) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Campaigns</CardTitle>
        <CardDescription className="ad-card-description">Latest activity from your campaign list</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { campaigns.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">No campaigns yet.</p>
        ) }
        { campaigns.map( ( campaign ) => {
          const id = campaign.id || campaign.campaign_id;
          const status = String( campaign.campaign_status || 'created' );
          return (
            <div key={ id || campaign.campaign_name } className="rounded-lg border border-border/60 bg-white p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <Link href={ id ? `/brand/campaigns/${ id }` : '/brand/campaigns' } className="text-sm font-medium text-primary hover:underline">
                  { campaign.campaign_name || 'Untitled Campaign' }
                </Link>
                <Badge variant={ campaignStatusVariant( status ) } className="capitalize">
                  { status.replace( /_/g, ' ' ) }
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Updated { toShortDate( campaign.updated_at || campaign.created_at ) }</p>
            </div>
          );
        } ) }
      </CardContent>
    </Card>
  );
}
