'use client';

import { ExpandableContent } from '@/components/dashboard-ui/expandable-content';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent
} from '@/components/dashboard-ui/sheet';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { getCountryFlag } from '@/lib/country-flags';
import { ageFromDate } from '@/lib/utils';
import { CreatorDetailsSheetProps, ExpandableCategories, Row, SOCIAL_PLATFORMS, SocialLink } from './creator-details-shared';
import { CreatorSheetHeader } from './creator-sheet-header';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Content } from '@/components/dashboard-ui/content';
import { useTranslations } from "next-intl";
import { CreatorConversationPanel } from '@/components/conversations/creator-conversation-panel';
import { ProtectedVideo } from '@/components/dashboard-ui/protected-video';

export function BrandCreatorDetailsSheet( { creator, open, onOpenChange, revealAddress }: CreatorDetailsSheetProps ) {
  const c = creator as any;
  const {
    first_name, last_name, email, creator_status,
    profile_image,
    city, country, gender, date_of_birth,
    instagram_handle, tiktok_handle, youtube_handle,
    street, state, zipcode,
  } = c;

  const tc = useTranslations( 'dashboard.common' );
  const t = useTranslations( 'dashboard.admin' );

  const fullName = `${ first_name || '' } ${ last_name || '' }`.trim() || email || tc( 'cards.creatorFallback' );
  const initials = fullName.slice( 0, 2 ).toUpperCase();
  const isApproved = creator_status?.toLowerCase() === 'approved';
  const age = date_of_birth ? ageFromDate( date_of_birth ) : undefined;
  const location = [ city, country ].filter( Boolean ).join( ', ' );
  const flagName = country ? getCountryFlag( country ) : undefined;
  const formattedGender = gender ? gender.charAt( 0 ).toUpperCase() + gender.slice( 1 ) : undefined;
  const fullAddress = [ street, city, state, zipcode, country ].filter( Boolean ).join( ', ' );

  const displayBio = c.bio;
  const displayVideo = c.application_video?.asset;
  const videoPoster = c.application_video?.thumbnail;
  const optimizedVideoPoster = videoPoster ? imgpresets.banner( videoPoster, { width: 1280 } ) : undefined;

  const handles: Record<string, string> = { instagram_handle, tiktok_handle, youtube_handle };
  const activeSocials = SOCIAL_PLATFORMS.filter( p => handles[ p.handleKey ] );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! overflow-y-auto bg-background/90">
        <CreatorSheetHeader creator={ creator! } />
        {/* ── Brand View (Merged & Streamlined) ── */ }
        <div className="px-6 flex flex-col gap-4 p-3 md:pb-6">
          { creator?.id && (
            <WrappedCard title={ t( 'creatorDetails.tabMessages' ) } contentClass="p-0 border-0 bg-transparent h-[320px] flex flex-col">
              <CreatorConversationPanel creatorId={ creator.id } size="sm" />
            </WrappedCard>
          ) }

          { revealAddress && (
            <WrappedCard title={ tc( 'sheets.address' ) }>
              { fullAddress ? (
                <>
                  { street && <Row label={ tc( 'sheets.street' ) } value={ street } /> }
                  { street && <Separator /> }
                  <Row label={ tc( 'sheets.city' ) } value={ city || tc( 'sheets.na' ) } />
                  <Separator />
                  <Row label={ tc( 'sheets.state' ) } value={ state || tc( 'sheets.na' ) } />
                  <Separator />
                  <Row label={ tc( 'sheets.zipcode' ) } value={ zipcode || tc( 'sheets.na' ) } />
                  <Separator />
                  <Row label={ tc( 'sheets.country' ) } value={ country || tc( 'sheets.na' ) } />
                </>
              ) : (
                <p className="py-2 text-center text-sm text-muted-foreground italic">{ tc( 'sheets.na' ) }</p>
              ) }
            </WrappedCard>
          ) }

          <WrappedCard title={ t( 'creatorDashboard.blocks.bio' ) }>
            { displayVideo && (
              <ProtectedVideo src={ displayVideo } poster={ optimizedVideoPoster } controls className="w-full aspect-video" containerClassName="w-full rounded-md mb-4" protected={ false } />
            ) }
            <ExpandableContent maxHeightClass="max-h-24">
              <Content content={ displayBio || tc( 'sheets.noBioAvailable' ) } />
            </ExpandableContent>
          </WrappedCard>

          <WrappedCard title={ tc( 'sheets.socialMedia' ) }>
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
              <p className="py-2 text-center text-sm text-muted-foreground italic">{ tc( 'sheets.noSocialAccounts' ) }</p>
            ) }
          </WrappedCard>

          { c?.preferred_categories?.length > 0 && (
            <WrappedCard title={ tc( 'sheets.preferredCategories' ) }>
              <ExpandableCategories categories={ c.preferred_categories } />
            </WrappedCard>
          ) }
        </div>

      </SheetContent>
    </Sheet>
  );
}
