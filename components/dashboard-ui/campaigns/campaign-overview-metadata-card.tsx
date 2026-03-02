'use client';

import { CalendarDays, Clock3, Tags, Users, Video, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/ui/separator';
import type { ModelCampaign } from '@/components/campaigns/types';
import { formatDate } from './campaign-overview-utils';

function MetaRow( { icon: Icon, label, value, valueClassName }: { icon: LucideIcon; label: string; value: string; valueClassName?: string; } ) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="ad-stat-label inline-flex items-center gap-1.5 text-muted-foreground/70 font-normal"><Icon className="size-3.5" strokeWidth={ 1.5 } /> { label }</span>
      <span className={ `font-medium ${ valueClassName || '' }` }>{ value }</span>
    </div>
  );
}

export function CampaignMetadataCard( { campaign }: { campaign: ModelCampaign; } ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.metadata' );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <MetaRow icon={ CalendarDays } label={ t( 'labels.created' ) } value={ formatDate( campaign.created_at ) } />
        <Separator className="my-2.5 opacity-70" />
        <MetaRow icon={ Clock3 } label={ t( 'labels.updated' ) } value={ formatDate( campaign.updated_at ) } />
        <Separator className="my-2.5 opacity-70" />
        <MetaRow icon={ Video } label={ t( 'labels.format' ) } value={ campaign.video_format || t( 'labels.na' ) } valueClassName="uppercase" />
        <Separator className="my-2.5 opacity-70" />
        <MetaRow icon={ Users } label={ t( 'labels.multiVideo' ) } value={ campaign.allow_multiple_videos ? t( 'values.allowed' ) : t( 'values.singleVideo' ) } />
        <Separator className="my-2.5 opacity-70" />
        <MetaRow icon={ Tags } label={ t( 'labels.brand' ) } value={ campaign.brand?.company_name || campaign.brand_name || t( 'labels.na' ) } />
      </CardContent>
    </Card>
  );
}
