'use client';

import { ExpandableContent } from '@/components/dashboard-ui/expandable-content';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent
} from '@/components/dashboard-ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { useCreator, useCreatorBankDetails } from '@/lib/api/hooks/creators';
import { useUser } from '@/lib/api/hooks/users';
import { stripTags } from '@/lib/utils';
import * as React from 'react';
import { Activity } from 'react';
import { toDateLabel } from '../dashboard/creator-dashboard-utils';
import { CreatorDetailsSheetProps, ExpandableCategories, Row, SOCIAL_PLATFORMS, SocialLink } from './creator-details-shared';
import { CreatorSheetHeader } from './creator-sheet-header';
import { Content } from '@/components/dashboard-ui/content';


export function AdminCreatorDetailsSheet( { creator, open, onOpenChange }: CreatorDetailsSheetProps ) {
  const c = creator as any;
  let {
    email,
    id, user_id,
    instagram_handle, tiktok_handle, youtube_handle,
    phone, created_at,
  } = c;

  const { data: creatorDetails } = useCreator( id! );
  const { data: userDetails } = useUser( user_id || '', {
    enabled: open && !!user_id // Only fetch user if the sheet is open
  } );

  email = userDetails?.email || email;
  phone = userDetails?.phone_number || phone;
  const address = [ creatorDetails?.street, creatorDetails?.city, creatorDetails?.state, creatorDetails?.zipcode ].filter( Boolean ).join( ', ' );

  const displayBio = creatorDetails?.bio || c.bio;
  const displayVideo = creatorDetails?.application_video?.asset || c.application_video?.asset;
  const videoPoster = creatorDetails?.application_video?.thumbnail || c.application_video?.thumbnail || undefined;

  const [ activeTab, setActiveTab ] = React.useState( 'overview' );

  const { data: bankDetails } = useCreatorBankDetails( id! );

  const handles: Record<string, string> = { instagram_handle, tiktok_handle, youtube_handle };
  const activeSocials = SOCIAL_PLATFORMS.filter( p => handles[ p.handleKey ] );



  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! overflow-y-auto bg-background/90">

        {/* ── Header ── */ }
        <CreatorSheetHeader creator={ creator! } />

        {/* ── Admin View (Tabbed) ── */ }
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="overview" className="text-sm font-normal">Overview</TabsTrigger>
            <TabsTrigger value="bio" className="text-sm font-normal">Bio</TabsTrigger>
            <TabsTrigger value="bank" className="text-sm font-normal">Bank Details</TabsTrigger>
            <TabsTrigger value="user" className="text-sm font-normal">User</TabsTrigger>
          </TabsList>

          {/* Overview */ }
          <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
            <div className="space-y-3 rounded-lg">
              <WrappedCard title="Contact & Personal Info">
                <Row label="Email" value={ email || 'N/A' } />
                <Separator />
                <Row label="Phone" value={ phone || 'N/A' } />
                <Separator />
                <Row label="Address" value={ address || 'N/A' } />
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
              { displayVideo && (
                <WrappedCard title="Application Video">
                  <video src={ displayVideo } controls className="w-full aspect-video" poster={ videoPoster } />
                </WrappedCard>
              ) }
              <WrappedCard title="Bio">
                <ExpandableContent maxHeightClass="max-h-24">
                  <Content content={ displayBio || 'No bio available' } />
                </ExpandableContent>
              </WrappedCard>
            </div>
          </Activity>

          {/* Bank Details */ }
          <Activity mode={ activeTab === 'bank' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title="Bank Account">
                <Row label="Account Name" value={ bankDetails?.bank_account_name || 'N/A' } />
                <Separator />
                <Row label="Account Number" value={ bankDetails?.bank_account_number || 'N/A' } />
                <Separator />
                <Row label="Bank Name" value={ bankDetails?.bank_name || 'N/A' } />
                <Separator />
                <Row label="Routing Number" value={ bankDetails?.bank_routing_number || 'N/A' } />
              </WrappedCard>
              <WrappedCard title="Tax Details">
                <Row label="Tax Country" value={ bankDetails?.tax_residence_country || 'N/A' } />
                <Separator />
                <Row label="Tax ID" value={ bankDetails?.tax_id || 'N/A' } />
              </WrappedCard>
            </div>
          </Activity>

          {/* User */ }
          <Activity mode={ activeTab === 'user' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title="Account">
                <Row label="Username" value={ userDetails?.username || 'N/A' } />
                <Separator />
                <Row label="Email" value={ userDetails?.email || 'N/A' } />
                <Separator />
                <Row label="Phone" value={ userDetails?.phone_number || 'N/A' } />
                <Separator />
                <Row label="Type" value={ userDetails?.user_type || 'N/A' } />
                <Separator />
                <Row label="Status" value={ userDetails?.user_status || 'N/A' } />
                <Separator />
                <Row label="Verified" value={ userDetails?.email_verified ? 'Yes' : 'No' } />
              </WrappedCard>
              <WrappedCard title="System">
                <Row label="User ID" value={ <span className="font-mono break-all">{ userDetails?.id || user_id }</span> } />
                <Separator />
                <Row label="Created" value={ userDetails?.created_at ? toDateLabel( userDetails.created_at ) : 'N/A' } />
                <Separator />
                <Row label="Updated" value={ userDetails?.updated_at ? toDateLabel( userDetails.updated_at ) : 'N/A' } />
              </WrappedCard>
            </div>
          </Activity>
        </Tabs>

      </SheetContent>
    </Sheet>
  );
}
