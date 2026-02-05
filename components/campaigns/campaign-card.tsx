'use client';

import { CampaignActionMenu } from './campaign-action-menu';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import Link from 'next/link';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { BrandAvatar } from './brand-avatar';
import { AvatarCollage } from './avatar-collage';
import { ModelCampaign } from './types';
import { StatusBadge } from './status-badge';

interface CampaignCardProps {
  campaign: ModelCampaign;
  basePath: string;
}

export function CampaignCard( { campaign, basePath }: CampaignCardProps ) {
  const {
    id,
    campaign_id,
    campaign_name,
    description,
    campaign_status,
    updated_at,
    creators,
    applications,
    brand_id,
  } = campaign;

  console.log( "brand ID", brand_id );



  return (
    <Card className='p-0 py-3 pb-0 justify-between'>
      <CardHeader>
        <div className="flex items-start gap-4">
          { brand_id && (
            <BrandAvatar brandId={ brand_id } className="size-10 border bg-white rounded-full shrink-0" />
          ) }
          <div className="flex flex-col gap-1 min-w-0">
            <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
              <CardTitle className='capitalize text-[18px] font-medium! text-primary truncate'>
                { campaign_name }
              </CardTitle>
            </Link>
            <CardDescription dangerouslySetInnerHTML={ { __html: description! } } className="line-clamp-2"></CardDescription>
          </div>
        </div>
        <CardAction>
          <CampaignActionMenu
            campaign={ campaign }
            basePath={ basePath }
          />
        </CardAction>
      </CardHeader>
      <CardContent className='space-y-4'>
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
        { applications && applications.length > 0 && (
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-medium text-muted-foreground'>
              Applications
            </span>
            <div className='flex min-h-10'>
              <AvatarCollage people={ applications || [] } />
            </div>
          </div>
        ) }
      </CardContent>
      <CardFooter className='justify-between items-center bg-muted/30 py-3 px-4 rounded-b-xl border-t whitespace-nowrap gap-3 text-ellipsis overflow-x-hidden'>
        <StatusBadge status={ campaign_status! } />
        <span className='text-xs text-muted-foreground/60'>
          Updated{ ' ' }
          { Intl.DateTimeFormat( 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          } ).format( new Date( updated_at! ) ) }
        </span>
      </CardFooter>
    </Card>
  );
}
