'use client';

import { EllipsisVertical } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { AvatarCollage } from './avatar-collage';
import { ModelCampaign } from './types';
import { StatusBadge } from './status-badge';
import { useEffect } from 'react';

interface CampaignCardProps {
  campaign: ModelCampaign;
}

export function CampaignCard( { campaign }: CampaignCardProps ) {
  const {
    campaign_name,
    description,
    campaign_status,
    updated_at,
    creators,
    applications,
  } = campaign;

  return (
    <Card className='p-0 py-3 pb-0 justify-between'>
      <CardHeader>
        <CardTitle className='capitalize text-[18px] font-medium! text-primary'>
          { campaign_name }
        </CardTitle>
        <CardDescription>{ description }</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical
                className='size-5 cursor-pointer text-muted-foreground translate-x-4 mt-1'
                strokeWidth={ '1' }
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className={ 'min-w-30 text-sm' }>
              <DropdownMenuItem className='text-sm'>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className='text-sm'>Rename</DropdownMenuItem>
              <DropdownMenuItem className='text-sm'>Replicate</DropdownMenuItem>
              <DropdownMenuItem className='text-sm'>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <StatusBadge status={ campaign_status } />
        <span className='text-xs text-muted-foreground/60'>
          Updated{ ' ' }
          { Intl.DateTimeFormat( 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          } ).format( new Date( updated_at ) ) }
        </span>
      </CardFooter>
    </Card>
  );
}
