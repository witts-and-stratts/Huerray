'use client';

import { CampaignActionMenu } from './campaign-action-menu';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { BrandAvatar } from './brand-avatar';
import { AvatarCollage } from './avatar-collage';
import { ModelCampaign } from './types';
import { StatusBadge } from './status-badge';

import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';

interface CampaignCardProps {
  campaign: ModelCampaign;
  basePath: string;
}

export function CampaignCard( { campaign, basePath }: CampaignCardProps ) {
  const {
    id,
    campaign_name,
    description,
    campaign_status,
    updated_at,
    creators,
    brand_id,
  } = campaign;

  // Fetch applications
  const { data: applicationsData } = useCampaignApplications( id || '' );
  const applications = ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[];

  // Map applications to Person type for AvatarCollage
  const applicationPeople = applications.map( app => ( {
    first_name: app.creator?.first_name || '',
    last_name: app.creator?.last_name || '',
    avatar: app.creator?.profile_image_url || '',
    username: app.creator?.username || ''
  } ) );

  return (
    <Card className='py-3 justify-between gap-1'>
      <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
        <div className="flex flex-col flex-1 min-w-0">
          <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
            <CardTitle className='capitalize text-[18px] font-normal text-primary font-primary truncate'>
              { campaign_name }
            </CardTitle>
          </Link>
          <CardDescription dangerouslySetInnerHTML={ { __html: description! } } className="text-muted-foreground/70 text-sm line-clamp-2"></CardDescription>
        </div>
        <div className="flex shrink-0 text-right gap-2 items-start">
          { brand_id && (
            <BrandAvatar brandId={ brand_id } className="size-10 border bg-white rounded-full shrink-0" />
          ) }
          <CampaignActionMenu
            campaign={ campaign }
            basePath={ basePath }
          />
        </div>
      </CardHeader>
      <CardContent className='space-y-3 pb-2'>
        { creators && creators.length > 0 && (
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-medium text-muted-foreground'>
              Creators
            </span>
            <div className='flex min-h-10'>
              <AnimatePresence>
                <AvatarCollage people={ creators || [] } />
              </AnimatePresence>
            </div>
          </div>
        ) }
        { applicationPeople.length > 0 && (
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-medium text-muted-foreground'>
              Applications
            </span>
            <div className='flex min-h-10'>
              <AvatarCollage people={ applicationPeople } />
            </div>
          </div>
        ) }

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className='text-xs text-muted-foreground/60'>
            Updated{ ' ' }
            { Intl.DateTimeFormat( 'en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            } ).format( new Date( updated_at! ) ) }
          </span>
        </div>

        <div className="mt-2">
          <StatusBadge status={ campaign_status! } />
        </div>
      </CardContent>
    </Card>
  );
}
