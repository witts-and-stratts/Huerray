'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { ModelCampaign } from '@/components/campaigns/types';
import { WrappedCard } from '../wrapped-card';
import { Badge } from '@/components/ui/badge';
import { stripTags } from '@/lib/utils';
import { SentenceCase } from '@/components/text-case';
import { BrandHoverCard } from '@/components/campaigns/brand-hover-card';

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
          <BrandHoverCard brand={ campaign.brand } brandName={ brandName }>
            <Avatar className="size-10 shrink-0 hover:ring-2 hover:ring-primary/30 transition-shadow cursor-pointer">
              <AvatarImage src={ campaign.brand?.profile_photo_url || '' } alt={ brandName } />
              <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
          </BrandHoverCard>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <WrappedCard title='Description' variant='flush'>
          <p className="font-regular leading-relaxed text-foreground/85" dangerouslySetInnerHTML={ { __html: stripTags( campaign.description!, [ 'p', ] ) || 'No description provided.' } } />
        </WrappedCard>

        <div className="grid grid-cols-1 gap-4">
          <WrappedCard title='Do&apos;s' variant='flush'>
            <p className="font-regular leading-relaxed text-foreground/85" dangerouslySetInnerHTML={ { __html: stripTags( campaign.dos!, [ 'p', ] ) || 'No guidance provided.' } } />
          </WrappedCard>
          <WrappedCard title='Don&apos;ts' variant='flush'>
            <p className="font-regular leading-relaxed text-foreground/85" dangerouslySetInnerHTML={ { __html: stripTags( campaign.donts!, [ 'p', ] ) || 'No restrictions provided.' } } />
          </WrappedCard>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <WrappedCard title='Category' variant='flush'>
            <p className="font-regular capitalize"><Badge variant={ 'outline' }><SentenceCase>{ campaign.category?.replaceAll( "_", " " ) ?? "" }</SentenceCase></Badge></p>
          </WrappedCard>
          <WrappedCard title='Tone of Voice' variant='flush'>
            <p className="font-regular capitalize">{ stripTags( campaign.tone_of_voice!, [ 'p', ] ) || 'N/A' }</p>
          </WrappedCard>
        </div>

        <WrappedCard title='Keywords'>
          { keywordList.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              { keywordList.map( ( keyword ) => (
                <Badge
                  key={ keyword }
                  className="inline-flex items-center rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-xs text-foreground/80"
                >
                  { keyword }
                </Badge>
              ) ) }
            </div>
          ) : (
            <p className="mt-1 text-foreground/70 text-sm">No keywords defined.</p>
          ) }
        </WrappedCard>
      </CardContent>
    </Card >
  );
}
