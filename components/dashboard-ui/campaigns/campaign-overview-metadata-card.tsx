'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { MediaPreview } from '@/components/campaigns/media-preview';
import { cn } from '@/lib/dashboard-utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { SquareArrowExpandIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { CalendarDays, Clock3, Globe, Tags, Users, Video, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useFormatDate } from '@/lib/hooks/format';


function MetaRow( { icon: Icon, label, value, valueClassName }: { icon: LucideIcon; label: string; value: string; valueClassName?: string; } ) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="ad-stat-label inline-flex items-center gap-1.5 text-muted-foreground/70 font-regular text-sm"><Icon className="size-3.5" strokeWidth={ 1.5 } /> { label }</span>
      <span className={ `font-regular ${ valueClassName || '' }` }>{ value }</span>
    </div>
  );
}

interface CampaignMetadataCardImageProps {
  image?: string, title?: string, url?: string;
}

function CampaignMetadataCardImage( { image, title, url }: CampaignMetadataCardImageProps ) {
  const [ previewOpen, setPreviewOpen ] = useState( false );

  if ( !image ) return null;

  return (
    <>
      <div className='w-full aspect-4/3 relative overflow-hidden group/cover'>
        <img src={ imgpresets.card( image ) } alt={ title } className='object-cover w-full h-full hover:scale-125 hover:object-bottom transition-all duration-10000' />

        { /* Expand button — matches submission card style */ }
        <motion.button
          type="button"
          onClick={ () => setPreviewOpen( true ) }
          className="absolute top-2 left-2 z-10 inline-flex items-center justify-center rounded-full text-white opacity-0 group-hover/cover:opacity-100 transition-opacity duration-200"
          aria-label="Expand image"
          initial={ { opacity: 0, scale: 0.9 } }
          whileHover={ { scale: 1.1 } }
          whileFocus={ { scale: 1.1 } }
          animate={ { opacity: 1, scale: 1 } }
          transition={ { duration: 0.6, ease: 'easeOut' } }
        >
          <HugeiconsIcon icon={ SquareArrowExpandIcon } className="size-5" strokeWidth={ 1 } />
        </motion.button>

        { url && (
          <Link href={ url } title={ title } target="_blank">
            <Globe strokeWidth={ 1.5 } className='size-4 absolute top-2 right-2 text-foreground invert hover:scale-150 transition-transform duration-300 cursor-pointer' />
          </Link>
        ) }
      </div>

      <MediaPreview
        items={ [ { kind: 'image', url: image, name: title } ] }
        initialIndex={ previewOpen ? 0 : null }
        onOpenChange={ ( open ) => setPreviewOpen( open ) }
      />
    </>
  );
}

interface CampaignMetadataCardProps {
  campaign: ModelsCampaignResponse;
}

export function CampaignMetadataCard( { campaign }: CampaignMetadataCardProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.metadata' );
  const formatDate = useFormatDate;

  return (
    <Card className="ad-summary-card pt-0">
      <CampaignMetadataCardImage title={ campaign.campaign_name } image={ campaign.product_image?.asset } url={ campaign.product_url } />
      <CardHeader className={ cn( "py-4 bg-white", { "-mt-14 z-20 rounded-t-lg bg-background": campaign.product_image?.asset } ) }>
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="text-sm bg-white *:py-2 *:last-of-type:border-0">
        <MetaRow icon={ CalendarDays } label={ t( 'labels.created' ) } value={ formatDate( campaign.created_at! ) } />
        <MetaRow icon={ Clock3 } label={ t( 'labels.updated' ) } value={ formatDate( campaign.updated_at! ) } />
        <MetaRow icon={ Video } label={ t( 'labels.format' ) } value={ campaign.video_format || t( 'labels.na' ) } valueClassName="uppercase" />
        <MetaRow icon={ Users } label={ t( 'labels.multiVideo' ) } value={ campaign.allow_multiple_videos ? t( 'values.allowed' ) : t( 'values.singleVideo' ) } />
        <MetaRow icon={ Tags } label={ t( 'labels.brand' ) } value={ campaign.brand?.company_name || campaign.brand_name || t( 'labels.na' ) } />
      </CardContent>
    </Card>
  );
}
