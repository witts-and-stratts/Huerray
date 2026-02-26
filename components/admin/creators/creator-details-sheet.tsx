'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import * as React from 'react';
import { Activity } from 'react';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { ChevronDown } from 'lucide-react';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { getCountryFlag } from '@/lib/country-flags';
import { cn } from '@/lib/dashboard-utils';
import { calculateAge } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';
import { CreatorStatusBadge } from './creator-status-badge';
import { CreatorCategories } from './creator-categories';
import { toDateLabel } from './dashboard/creator-dashboard-utils';

export const Row = ( { label, value }: { label: string; value: ReactNode; } ) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-xs text-muted-foreground">{ label }</span>
    <span className="text-xs text-muted-foreground">{ value }</span>
  </div>
);

const MetaBadge = ( { children }: { children: ReactNode; } ) => (
  <Badge className="bg-background/80 inline-flex items-center gap-2 py-3" variant="outline">
    { children }
  </Badge>
);

const SocialLink = ( { href, icon, alt }: { href: string; icon: string; alt: string; } ) => (
  <a href={ href } target="_blank" rel="noopener noreferrer">
    <img src={ icon } alt={ alt } className="h-8 w-auto" />
  </a>
);

const ExpandableCategories = ( { categories }: { categories: string[]; } ) => {
  const [ expanded, setExpanded ] = React.useState( false );
  const [ overflows, setOverflows ] = React.useState( false );
  const ref = React.useRef<HTMLDivElement>( null );

  React.useEffect( () => {
    const el = ref.current;
    if ( el ) setOverflows( el.scrollHeight > el.clientHeight );
  }, [ categories ] );

  return (
    <div className="space-y-1.5">
      <div ref={ ref } className={ cn( 'overflow-hidden transition-all duration-300', expanded ? 'max-h-96' : 'max-h-12' ) }>
        <CreatorCategories categories={ categories } showAll />
      </div>
      { ( overflows || expanded ) && (
        <button
          onClick={ () => setExpanded( p => !p ) }
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className={ cn( 'size-3 transition-transform duration-300', expanded && 'rotate-180' ) } />
          { expanded ? 'Show less' : 'Show all' }
        </button>
      ) }
    </div>
  );
};

const SOCIAL_PLATFORMS = [
  { handleKey: 'instagram_handle', href: ( h: string ) => `https://instagram.com/${ h }`, icon: '/svg/instagram.svg', alt: 'Instagram' },
  { handleKey: 'tiktok_handle', href: ( h: string ) => `https://tiktok.com/@${ h }`, icon: '/svg/tiktok.svg', alt: 'TikTok' },
  { handleKey: 'youtube_handle', href: ( h: string ) => `https://youtube.com/${ h }`, icon: '/svg/youtube.svg', alt: 'YouTube' },
] as const;

interface CreatorDetailsSheetProps {
  creator: ModelsCreatorResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function CreatorDetailsSheet( { creator, open, onOpenChange }: CreatorDetailsSheetProps ) {
  if ( !creator ) return null;

  const c = creator as any;
  const {
    first_name, last_name, email, creator_status,
    id, user_id, profile_image_url,
    city, country, gender, date_of_birth,
    instagram_handle, tiktok_handle, youtube_handle,
    phone, created_at,
    bank_account_name, bank_account_number, bank_name, bank_routing_number,
    tax_country, tax_id,
  } = c;

  const { data: creatorDetails } = useCreator( id || '' );

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || email || 'Unknown';
  const initials = fullName.slice( 0, 2 ).toUpperCase();
  const isApproved = creator_status?.toLowerCase() === 'approved';
  const age = date_of_birth ? calculateAge( date_of_birth ) : undefined;
  const location = [ city, country ].filter( Boolean ).join( ', ' );
  const flagName = country ? getCountryFlag( country ) : undefined;
  const formattedGender = gender ? gender.charAt( 0 ).toUpperCase() + gender.slice( 1 ) : undefined;

  const [ activeTab, setActiveTab ] = React.useState( 'overview' );

  const handles: Record<string, string> = { instagram_handle, tiktok_handle, youtube_handle };
  const activeSocials = SOCIAL_PLATFORMS.filter( p => handles[ p.handleKey ] );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[500px]! overflow-y-auto bg-background/70">

        {/* ── Header ── */ }
        <SheetHeader className="relative flex flex-col items-center gap-4 bg-burgundy-50/60 p-6 pb-8 m-6 rounded-lg mt-16 border border-primary/20 mb-0">
          <Avatar className={ cn(
            "border bg-muted-foreground/10 size-36 ring-background",
            isApproved ? "border-emerald-400/30" : "border-border/60"
          ) }>
            { profile_image_url
              ? <AvatarImage src={ profile_image_url } alt={ fullName } className="object-cover" />
              : <AvatarFallback className="text-3xl">{ initials }</AvatarFallback>
            }
          </Avatar>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <SheetTitle className="text-xl font-normal text-primary font-primary capitalize tracking-tight">
              { fullName }
            </SheetTitle>
            { email && <span className="text-sm text-muted-foreground/80 mb-1.5">{ email }</span> }
            <CreatorStatusBadge status={ creator_status || 'active' } />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            { location && (
              <MetaBadge>
                { flagName && (
                  <Image src={ `/images/flags/${ flagName }.svg` } alt={ country || 'Flag' } width={ 16 } height={ 10 } className="h-3.5 w-auto" />
                ) }
                { location }
              </MetaBadge>
            ) }
            { formattedGender && <MetaBadge>{ formattedGender }</MetaBadge> }
            { age && <MetaBadge>{ age } y/o</MetaBadge> }
          </div>

          <SheetDescription className="sr-only">
            Detailed information about creator { fullName }.
          </SheetDescription>
        </SheetHeader>

        {/* ── Tabs ── */ }
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="overview" className="text-sm font-normal">Overview</TabsTrigger>
            <TabsTrigger value="bio" className="text-sm font-normal">Bio</TabsTrigger>
            <TabsTrigger value="bank" className="text-sm font-normal">Bank Details</TabsTrigger>
          </TabsList>

          {/* Overview */ }
          <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
            <div className="space-y-3 rounded-lg">
              <WrappedCard title="Contact & Personal Info">
                <Row label="Email" value={ email || 'N/A' } />
                <Separator />
                <Row label="Phone" value={ phone || 'N/A' } />
                <Separator />
                <Row label="Language" value={ c?.primary_language || 'N/A' } />
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

              <WrappedCard title="System Details">
                <Row label="Joined" value={ created_at ? toDateLabel( created_at as string ) : 'N/A' } />
                <Separator />
                <Row label="Creator ID" value={ <span className="font-mono break-all">{ id }</span> } />
                <Separator />
                <Row label="User ID" value={ <span className="font-mono break-all">{ user_id }</span> } />
              </WrappedCard>
            </div>
          </Activity>

          {/* Bio */ }
          <Activity mode={ activeTab === 'bio' ? 'visible' : 'hidden' }>
            <div className="pt-4 flex flex-col gap-4">
              { creatorDetails?.application_video && (
                <WrappedCard title="Application Video">
                  <video src={ creatorDetails.application_video } controls className="w-full aspect-video" />
                </WrappedCard>
              ) }
              <WrappedCard title="Bio">
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={ {
                    __html: creatorDetails?.bio?.replaceAll( '<p>', '' ).replaceAll( '</p>', '' ) || 'No bio available'
                  } }
                />
              </WrappedCard>
            </div>
          </Activity>

          {/* Bank Details */ }
          <Activity mode={ activeTab === 'bank' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title="Bank Account">
                <Row label="Account Name" value={ bank_account_name || 'N/A' } />
                <Separator />
                <Row label="Account Number" value={ bank_account_number || 'N/A' } />
                <Separator />
                <Row label="Bank Name" value={ bank_name || 'N/A' } />
                <Separator />
                <Row label="Routing Number" value={ bank_routing_number || 'N/A' } />
              </WrappedCard>
              <WrappedCard title="Tax Details">
                <Row label="Tax Country" value={ tax_country || 'N/A' } />
                <Separator />
                <Row label="Tax ID" value={ tax_id || 'N/A' } />
              </WrappedCard>
            </div>
          </Activity>
        </Tabs>

      </SheetContent>
    </Sheet>
  );
}
