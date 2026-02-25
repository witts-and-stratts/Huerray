'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelCampaign } from '@/components/campaigns/types';

interface CampaignBriefCardProps {
  campaign: ModelCampaign;
  keywordList: string[];
}

export function CampaignBriefCard( { campaign, keywordList }: CampaignBriefCardProps ) {
  const brandName = campaign.brand?.company_name || campaign.brand_name || 'Unknown Brand';

  return (
    <Card className="ad-summary-card grow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="ad-card-title">Campaign Brief</CardTitle>
            <CardDescription className="ad-card-description">Core details and messaging requirements</CardDescription>
          </div>
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={ campaign.brand?.profile_photo_url || '' } alt={ brandName } />
            <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="ad-stat-label">Description</p>
          <p className="mt-1 leading-relaxed text-foreground/85">{ campaign.description || 'No description provided.' }</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="ad-stat-label">Do&apos;s</p>
            <p className="mt-1 leading-relaxed text-foreground/85">{ campaign.dos || 'No guidance provided.' }</p>
          </div>
          <div>
            <p className="ad-stat-label">Don&apos;ts</p>
            <p className="mt-1 leading-relaxed text-foreground/85">{ campaign.donts || 'No restrictions provided.' }</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="ad-stat-label">Category</p>
            <p className="mt-1 font-medium capitalize">{ campaign.category || 'N/A' }</p>
          </div>
          <div>
            <p className="ad-stat-label">Tone of Voice</p>
            <p className="mt-1 font-medium capitalize">{ campaign.tone_of_voice || 'N/A' }</p>
          </div>
        </div>

        <div>
          <p className="ad-stat-label">Keywords</p>
          { keywordList.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              { keywordList.map( ( keyword ) => (
                <span
                  key={ keyword }
                  className="inline-flex items-center rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-xs text-foreground/80"
                >
                  { keyword }
                </span>
              ) ) }
            </div>
          ) : (
            <p className="mt-1 text-foreground/70">No keywords defined.</p>
          ) }
        </div>
      </CardContent>
    </Card>
  );
}
