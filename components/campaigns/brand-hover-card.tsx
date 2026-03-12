'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/dashboard-ui/hover-card';
import type { ModelsCampaignBrandResponse } from '@/lib/api/generated/models';
import { Building2, Globe, MapPin, Tag } from 'lucide-react';
import { SentenceCase } from '@/components/text-case';
import Link from 'next/link';
import { WrappedCard } from '../dashboard-ui/wrapped-card';

interface BrandHoverCardProps {
  brand?: ModelsCampaignBrandResponse;
  brandName?: string;
  children: React.ReactNode;
}

function BrandDetailRow( { label, value }: { label: string; value?: string; } ) {
  if ( !value ) return null;
  return (
    <div className="flex items-center gap-2 text-xs">
      {/* <Icon className="size-3.5 text-muted-foreground/60 shrink-0" /> */ }
      <span className="text-muted-foreground/80">{ label }:</span>
      <span className="font-normal text-foreground/90 truncate">{ value }</span>
    </div>
  );
}

export function BrandHoverCard( { brand, brandName, children }: BrandHoverCardProps ) {
  const name = brand?.company_name || brandName || 'Unknown Brand';
  const photoUrl = brand?.profile_photo_url;

  // If there's no brand data at all, just render children
  if ( !brand ) {
    return <>{ children }</>;
  }

  return (
    <HoverCard>
      <HoverCardTrigger
        render={ <span className="cursor-pointer" /> }
      >
        { children }
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="end" sideOffset={ 8 } className="w-80 p-0 shadow-none">
        <WrappedCard title='Brand Details' titleClass='text-xs'>
          <div className="flex items-center gap-3">
            <Avatar className="size-12 shrink-0 ring-0">
              { photoUrl && <AvatarImage src={ photoUrl } alt={ name } /> }
              <AvatarFallback className="text-sm font-medium">
                { name.slice( 0, 2 ).toUpperCase() }
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="card__title mb-0">{ name }</p>
              { brand.category && (
                <p className="card__description mt-0">
                  <SentenceCase>{ brand.category.replaceAll( '_', ' ' ) }</SentenceCase>
                </p>
              ) }
            </div>
          </div>

          <div className="border-t border-border/60 pt-2.5 space-y-1.5">
            <BrandDetailRow label="Company" value={ brand.company_name } />
            <BrandDetailRow label="Country" value={ brand.country } />
            <BrandDetailRow label="Category" value={ brand.category ? brand.category.replaceAll( '_', ' ' ) : undefined } />
            { brand.website_url && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Website:</span>
                <Link
                  href={ brand.website_url }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary truncate hover:underline"
                >
                  { brand.website_url.replace( /^https?:\/\//, '' ).replace( /\/$/, '' ) }
                </Link>
              </div>
            ) }
          </div>
        </WrappedCard>
      </HoverCardContent>
    </HoverCard>
  );
}
