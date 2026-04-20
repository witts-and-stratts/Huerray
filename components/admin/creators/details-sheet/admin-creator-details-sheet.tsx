'use client';

import { ExpandableContent } from '@/components/dashboard-ui/expandable-content';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter
} from '@/components/dashboard-ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { useCreator, useCreatorBankDetails } from '@/lib/api/hooks/creators';
import { useUser } from '@/lib/api/hooks/users';
import * as React from 'react';
import { Activity } from 'react';
import { CreatorDetailsSheetProps, ExpandableCategories, Row, SOCIAL_PLATFORMS, SocialLink } from './creator-details-shared';
import { CreatorSheetHeader } from './creator-sheet-header';
import { Content } from '@/components/dashboard-ui/content';
import { useFormatDate } from '@/lib/hooks/format';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { useTranslations } from 'next-intl';
import { CreatorActionMenu } from '../creator-action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ChevronDown } from 'lucide-react';
import { RoleGuard } from '@/components/auth/role-guard';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { cn } from '@/lib/dashboard-utils';


export function AdminCreatorDetailsSheet( { creator, open, onOpenChange, onApproveProfile, onRejectProfile }: CreatorDetailsSheetProps ) {
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

  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const [ activeTab, setActiveTab ] = React.useState( 'overview' );

  const { data: bankDetails } = useCreatorBankDetails( id! );
  const joinedLabel = useFormatDate( created_at || '' );
  const userCreatedLabel = useFormatDate( userDetails?.created_at || '' );
  const userUpdatedLabel = useFormatDate( userDetails?.updated_at || '' );

  const handles: Record<string, string> = { instagram_handle, tiktok_handle, youtube_handle };
  const activeSocials = SOCIAL_PLATFORMS.filter( p => handles[ p.handleKey ] );
  const isPendingApproval = creator?.creator_status === 'pending_approval';



  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! overflow-y-auto bg-background/90 overflow-x-hidden">
        <CreatorSheetHeader creator={ creator! } />

        {/* ── Admin View (Tabbed) ── */ }
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-3 md:px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="overview" className="tab-trigger">{ t( 'creatorDetails.tabOverview' ) }</TabsTrigger>
            <TabsTrigger value="bio" className="tab-trigger">{ t( 'creatorDetails.tabBio' ) }</TabsTrigger>
            <TabsTrigger value="bank" className="tab-trigger">{ t( 'creatorDetails.tabBank' ) }</TabsTrigger>
            <TabsTrigger value="user" className="tab-trigger">{ t( 'creatorDetails.tabUser' ) }</TabsTrigger>
          </TabsList>

          {/* Overview */ }
          <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
            <div className="space-y-3 rounded-lg">
              <WrappedCard title={ t( 'creatorDetails.contactPersonal' ) }>
                <Row label={ tc( 'sheets.email' ) } value={
                  <CopyText text={ email } iconSide='left' clamp className='text-right'>
                    <span className='font-normal'>{ email || tc( 'sheets.na' ) }</span>
                  </CopyText> } />
                <Separator />
                <Row label={ tc( 'sheets.phone' ) } value={ <CopyText text={ phone } iconSide='left'>
                  <span className='font-normal'>{ phone || tc( 'sheets.na' ) }</span></CopyText> } />
                <Separator />
                <Row label={ tc( 'sheets.address' ) } value={ address || tc( 'sheets.na' ) } />
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

              <WrappedCard title={ t( 'creatorDetails.systemDetails' ) }>
                <Row label={ tc( 'sheets.joined' ) } value={ created_at ? joinedLabel : tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.creatorId' ) } value={ <CopyText text={ id } iconSide='left' className='font-mono text-[13px] text-right' clamp>{ id }</CopyText> } />
                <Separator />
                <Row label={ t( 'creatorDetails.userId' ) } value={ <CopyText text={ user_id } iconSide='left' className='font-mono text-[13px] text-right' clamp>{ user_id }</CopyText> } />
              </WrappedCard>
            </div>
          </Activity>

          {/* Bio */ }
          <Activity mode={ activeTab === 'bio' ? 'visible' : 'hidden' }>
            <div className="pt-4 flex flex-col gap-4">
              { displayVideo && (
                <WrappedCard title={ t( 'creatorDetails.applicationVideo' ) }>
                  <video src={ displayVideo } controls className="w-full aspect-video" poster={ videoPoster } />
                </WrappedCard>
              ) }
              <WrappedCard title={ tc( 'sheets.bio' ) }>
                <ExpandableContent maxHeightClass="max-h-24">
                  <Content content={ displayBio || tc( 'sheets.noBioAvailable' ) } />
                </ExpandableContent>
              </WrappedCard>
            </div>
          </Activity>

          {/* Bank Details */ }
          <Activity mode={ activeTab === 'bank' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title={ t( 'creatorDetails.bankAccount' ) }>
                <Row label={ t( 'creatorDetails.accountName' ) } value={ bankDetails?.bank_account_name || tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.accountNumber' ) } value={ bankDetails?.bank_account_number || tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.bankName' ) } value={ bankDetails?.bank_name || tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.routingNumber' ) } value={ bankDetails?.bank_routing_number || tc( 'sheets.na' ) } />
              </WrappedCard>
              <WrappedCard title={ t( 'creatorDetails.taxDetails' ) }>
                <Row label={ t( 'creatorDetails.taxCountry' ) } value={ bankDetails?.tax_residence_country || tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.taxId' ) } value={ bankDetails?.tax_id || tc( 'sheets.na' ) } />
              </WrappedCard>
            </div>
          </Activity>

          {/* User */ }
          <Activity mode={ activeTab === 'user' ? 'visible' : 'hidden' }>
            <div className="pt-4 space-y-3">
              <WrappedCard title={ t( 'creatorDetails.accountSection' ) }>
                <Row label={ t( 'creatorDetails.username' ) } value={
                  <CopyText text={ userDetails?.username || tc( 'sheets.na' ) } iconSide='left'>
                    <span className='font-normal'>{ userDetails?.username || tc( 'sheets.na' ) }</span>
                  </CopyText> } />
                <Separator />
                <Row label={ tc( 'sheets.email' ) } value={
                  <CopyText text={ userDetails?.email || tc( 'sheets.na' ) } iconSide='left'>
                    <span className='font-normal'>{ userDetails?.email || tc( 'sheets.na' ) }</span>
                  </CopyText> } />
                <Separator />
                <Row label={ tc( 'sheets.phone' ) } value={
                  <CopyText text={ userDetails?.phone_number || tc( 'sheets.na' ) } iconSide='left'>
                    <span className='font-normal'>{ userDetails?.phone_number || tc( 'sheets.na' ) }</span>
                  </CopyText> } />
                <Separator />
                <Row label={ tc( 'sheets.type' ) } value={ userDetails?.user_type || tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ tc( 'status' ) } value={ userDetails?.user_status || tc( 'sheets.na' ) } />
                <Separator />
                <Row label="Verified" value={ userDetails?.email_verified ? tc( 'sheets.yes' ) : tc( 'sheets.no' ) } />
              </WrappedCard>
              <WrappedCard title={ t( 'creatorDetails.systemSection' ) }>
                <Row label={ t( 'creatorDetails.userId' ) } value={ <CopyText text={ userDetails?.id || user_id } iconSide='left' className='font-mono text-[13px]'>{ userDetails?.id || user_id }</CopyText> } />
                <Separator />
                <Row label={ t( 'creatorDetails.createdLabel' ) } value={ userDetails?.created_at ? userCreatedLabel : tc( 'sheets.na' ) } />
                <Separator />
                <Row label={ t( 'creatorDetails.updatedLabel' ) } value={ userDetails?.updated_at ? userUpdatedLabel : tc( 'sheets.na' ) } />
              </WrappedCard>
            </div>
          </Activity>
        </Tabs>

        <RoleGuard allowedRoles={ [ 'admin' ] }>
          <SheetFooter className="sticky bottom-0 px-6 pb-6 pt-3 shrink-0 border-t border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
            <ButtonGroup className={ cn( "self-start min-w-[240px]", { "w-full": isPendingApproval } ) }>
              { isPendingApproval && onApproveProfile ? (
                <Button
                  size="sm"
                  className="font-regular flex-1"
                  onClick={ () => onApproveProfile( creator! ) }
                >
                  { t( 'creatorStatus.approve' ) }
                </Button>
              ) : null }
              { isPendingApproval && onRejectProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="font-regular text-destructive flex-1"
                  onClick={ () => onRejectProfile( creator! ) }
                >
                  { t( 'creatorStatus.return' ) }
                </Button>
              ) : null }
              <CreatorActionMenu
                creator={ creator! }
                onApproveProfile={ onApproveProfile }
                onRejectProfile={ onRejectProfile }
                trigger={
                  <Button variant="outline" size="sm" className="font-regular flex-1 w-full">
                    { !isPendingApproval ? tc( 'actions' ) : null }
                    <ChevronDown className="size-4" />
                  </Button>
                }
              />
            </ButtonGroup>
          </SheetFooter>
        </RoleGuard>

      </SheetContent>
    </Sheet>
  );
}
