'use client';

import { CalendarDays, Clock3, Globe, Tags, Users, Video, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/ui/separator';
import type { ModelCampaign } from '@/components/campaigns/types';
import { formatDate } from './campaign-overview-utils';
import Link from 'next/link';
import { cn } from '@/lib/dashboard-utils';
import { imgpresets } from '@/lib/utils/imgproxy';


function MetaRow( { icon: Icon, label, value, valueClassName }: { icon: LucideIcon; label: string; value: string; valueClassName?: string; } ) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="ad-stat-label inline-flex items-center gap-1.5 text-muted-foreground/70 font-normal"><Icon className="size-3.5" strokeWidth={ 1.5 } /> { label }</span>
      <span className={ `font-regular ${ valueClassName || '' }` }>{ value }</span>
    </div>
  );
}

interface CampaignMetadataCardImageProps {
  image?: string, title?: string, url?: string;
}

function CampaignMetadataCardImage( { image, title, url }: CampaignMetadataCardImageProps ) {
  return <>
    { image &&
      <div className='w-full aspect-4/3 relative overflow-hidden'>
        <img src={ imgpresets.banner( image ) } alt={ title } className='object-cover w-full h-full hover:scale-125 hover:object-bottom transition-all duration-10000' />
        { url && <Link href={ url } title={ title } target="_blank">
          <Globe strokeWidth={ 1.5 } className='size-4 absolute top-2 right-2 text-foreground invert hover:scale-150 transition-transform duration-300 cursor-pointer' />
        </Link> }
      </div> }
  </>;
}

export function CampaignMetadataCard( { campaign }: { campaign: ModelCampaign; } ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.metadata' );

  return (
    <Card className="ad-summary-card pt-0">
      <CampaignMetadataCardImage title={ campaign.campaign_name } image={ campaign.product_image_url } url={ campaign.product_url } />
      <CardHeader className={ cn( "py-4 bg-white", { "-mt-14 z-20 rounded-t-lg bg-background": campaign.product_image_url } ) }>
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="text-sm bg-white *:border-b *:border-b-border/80 *:py-2 *:last-of-type:border-0">
        <MetaRow icon={ CalendarDays } label={ t( 'labels.created' ) } value={ formatDate( campaign.created_at ) } />
        <MetaRow icon={ Clock3 } label={ t( 'labels.updated' ) } value={ formatDate( campaign.updated_at ) } />
        <MetaRow icon={ Video } label={ t( 'labels.format' ) } value={ campaign.video_format || t( 'labels.na' ) } valueClassName="uppercase" />
        <MetaRow icon={ Users } label={ t( 'labels.multiVideo' ) } value={ campaign.allow_multiple_videos ? t( 'values.allowed' ) : t( 'values.singleVideo' ) } />
        <MetaRow icon={ Tags } label={ t( 'labels.brand' ) } value={ campaign.brand?.company_name || campaign.brand_name || t( 'labels.na' ) } />
      </CardContent>
    </Card>
  );
}
