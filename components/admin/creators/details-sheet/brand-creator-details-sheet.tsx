'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { getCountryFlag } from '@/lib/country-flags';
import { cn } from '@/lib/dashboard-utils';
import { calculateAge, stripTags } from '@/lib/utils';
import Image from 'next/image';
import { CreatorStatusBadge } from '../creator-status-badge';
import { ExpandableContent } from '@/components/dashboard-ui/expandable-content';
import { CreatorDetailsSheetProps, MetaBadge, SocialLink, ExpandableCategories, SOCIAL_PLATFORMS } from './creator-details-shared';
import { CreatorSheetHeader } from './creator-sheet-header';

export function BrandCreatorDetailsSheet( { creator, open, onOpenChange }: CreatorDetailsSheetProps ) {
  const c = creator as any;
  const {
    first_name, last_name, email, creator_status,
    profile_image_url,
    city, country, gender, date_of_birth,
    instagram_handle, tiktok_handle, youtube_handle,
  } = c;

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || email || 'Unknown';
  const initials = fullName.slice( 0, 2 ).toUpperCase();
  const isApproved = creator_status?.toLowerCase() === 'approved';
  const age = date_of_birth ? calculateAge( date_of_birth ) : undefined;
  const location = [ city, country ].filter( Boolean ).join( ', ' );
  const flagName = country ? getCountryFlag( country ) : undefined;
  const formattedGender = gender ? gender.charAt( 0 ).toUpperCase() + gender.slice( 1 ) : undefined;

  const displayBio = c.bio;
  const displayVideo = c.application_video;

  const handles: Record<string, string> = { instagram_handle, tiktok_handle, youtube_handle };
  const activeSocials = SOCIAL_PLATFORMS.filter( p => handles[ p.handleKey ] );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[500px]! overflow-y-auto bg-background/70">

        <CreatorSheetHeader creator={ creator! } />

        {/* ── Brand View (Merged & Streamlined) ── */ }
        <div className="px-6 flex flex-col gap-4 pb-6">
          <WrappedCard title="Bio & Introduction">
            { displayVideo && (
              <video src={ displayVideo } controls className="w-full aspect-video rounded-md mb-4" />
            ) }
            <ExpandableContent maxHeightClass="max-h-24">
              <p
                className="text-sm text-muted-foreground *:text-sm *:font-normal"
                dangerouslySetInnerHTML={ {
                  __html: displayBio || 'No bio available'
                } }
              />
            </ExpandableContent>
          </WrappedCard>

          <WrappedCard title="Social Media">
            { activeSocials.length > 0 ? (
              <div className="flex items-center gap-6">
                { activeSocials.map( p => (
                  <SocialLink
                    key={ p.handleKey }
                    href={ p.href( handles[ p.handleKey ].replace( '@', '' ) ) }
                    icon={ p.icon }
                    alt={ p.alt }
                  />
                ) ) }
              </div>
            ) : (
              <p className="py-2 text-center text-sm text-muted-foreground italic">No social accounts connected</p>
            ) }
          </WrappedCard>

          { c?.preferred_categories?.length > 0 && (
            <WrappedCard title="Preferred Categories">
              <ExpandableCategories categories={ c.preferred_categories } />
            </WrappedCard>
          ) }
        </div>

      </SheetContent>
    </Sheet>
  );
}
