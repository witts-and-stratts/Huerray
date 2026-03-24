'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardHeader } from '@/components/dashboard-ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { CreatorStatusBadge } from '@/components/admin/creators/creator-status-badge';
import { getCountryFlag } from '@/lib/country-flags';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Content } from '@/components/dashboard-ui/content';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useFormatDate } from '@/lib/hooks/format';
import { useUser, useUserProfile } from '@/lib/api/hooks/users';
import { useCreatorBankDetails } from '@/lib/api/hooks/creators';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { Separator } from '@/components/dashboard-ui/separator';
import { UserStatusBadge } from '@/components/admin/users/user-status-badge';
import { EmailStatusBadge } from '@/components/dashboard-ui/status-badge';
import { cn } from '@/lib/dashboard-utils';

interface CreatorProfileBlockProps {
  creator: ModelsCreatorResponse;
  creatorName: string;
  creatorAvatar: string;
  children?: React.ReactNode;
  useProfileEndpoint?: boolean;
}

function Row( { label, value, col1ClassName, col2ClassName }: { label: string; value: React.ReactNode; col1ClassName?: string; col2ClassName?: string; } ) {
  return (
    <div className="flex items-start justify-between gap-10 max-w-full overflow-x-hidden">
      <div className={ cn( 'ad-stat-label font-regular text-muted-foreground/80 shrink-0', col1ClassName ) }>{ label }</div>
      <div className={ cn( 'text-right font-regular leading-relaxed min-w-0', col2ClassName ) }>{ value }</div>
    </div>
  );
}

function EmptyState( { label }: { label: string; } ) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 py-6">
      <p className="text-xs italic text-muted-foreground">{ label }</p>
    </div>
  );
}

function UserTab( { userId, useProfileEndpoint }: { userId: string; useProfileEndpoint?: boolean; } ) {
  const userQuery = useUser( userId, { enabled: !useProfileEndpoint && !!userId } );
  const profileQuery = useUserProfile();
  const { data: userDetails, isLoading } = useProfileEndpoint ? profileQuery : userQuery;
  const joinedLabel = useFormatDate( userDetails?.created_at || '' );
  const updatedLabel = useFormatDate( userDetails?.updated_at || '' );

  if ( isLoading ) {
    return (
      <div className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          {[ ...Array( 4 ) ].map( ( _, i ) => (
            <div key={ i } className="flex justify-between gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ) )}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          {[ ...Array( 3 ) ].map( ( _, i ) => (
            <div key={ i } className="flex justify-between gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ) )}
        </div>
      </div>
    );
  }

  if ( !userDetails ) {
    return <EmptyState label="Failed to load user details" />;
  }

  const {
    first_name, last_name, username, email,
    user_type, user_status, email_verified, id,
  } = userDetails;

  const toLabel = ( value?: string ) =>
    value ? value.replace( /_/g, ' ' ).replace( /\b\w/g, c => c.toUpperCase() ) : 'N/A';

  return (
    <div className="space-y-3">
      <WrappedCard title="Identity">
        <div className="flex items-center gap-2 flex-wrap pb-1">
          <UserStatusBadge status={ user_status || 'unknown' } />
          <EmailStatusBadge
            status={ email_verified ? 'Email verified' : 'Email unverified' }
            className={ email_verified ? 'border-green-400/40 text-green-600' : 'border-amber-400/40 text-amber-600' }
          />
        </div>
        <Row label="Name" value={ [ first_name, last_name ].filter( Boolean ).join( ' ' ) || username || 'N/A' } />
        <Row label="Username" value={
          <CopyText text={ username! }
            iconSide="left"
            copyMessage="Username copied" clamp={ true }>
            { username ? `@${ username }` : 'N/A' }
          </CopyText> } />
        <Row label="Type" value={ toLabel( user_type ) } />
        <Row label="Email"
          value={
            <CopyText text={ email! } iconSide='left' clamp={ true }>
              { email ? email : 'N/A' }
            </CopyText> } />
      </WrappedCard>

      <WrappedCard title="System">
        <Row label="User ID"
          col2ClassName='self-center'
          value={
            id ? (
              <CopyText text={ id } iconSide="left" copyMessage="User ID copied" className='font-mono font-light text-[13px]' clamp={ true }>
                { id }
              </CopyText>
            ) : 'N/A'
          } />
        <Row label="Joined" value={ joinedLabel } />
        <Row label="Updated" value={ updatedLabel } />
      </WrappedCard>
    </div>
  );
}

function BankTab( { creatorId }: { creatorId: string; } ) {
  const { data: bankDetails, isLoading } = useCreatorBankDetails( creatorId );

  if ( isLoading ) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        {[ ...Array( 4 ) ].map( ( _, i ) => (
          <div key={ i } className="flex justify-between gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) )}
      </div>
    );
  }

  if ( !bankDetails || !bankDetails.has_bank_details ) {
    return <EmptyState label="No bank details on file" />;
  }

  return (
    <div className="space-y-3">
      <WrappedCard title="Bank Details">
        { bankDetails.bank_name && <Row label="Bank Name" value={ bankDetails.bank_name } /> }
        { bankDetails.bank_account_name && <Row label="Account Name" value={ bankDetails.bank_account_name } /> }
        { bankDetails.bank_account_number && (
          <Row label="Account No." value={ bankDetails.bank_account_number.replace( /(.{4})/g, '$1 ' ).trim() } />
        ) }
        { bankDetails.bank_routing_number && (
          <Row label="Routing No." value={ bankDetails.bank_routing_number } />
        ) }
        { bankDetails.bank_address && <Row label="Bank Address" value={ bankDetails.bank_address } /> }
        { bankDetails.has_tax_details && bankDetails.tax_id && <Row label="Tax ID" value={ bankDetails.tax_id } /> }
        { bankDetails.tax_residence_country && <Row label="Tax Country" value={ bankDetails.tax_residence_country } /> }
      </WrappedCard>
    </div>
  );
}

export function CreatorProfileBlock( { creator, creatorName, creatorAvatar, children, useProfileEndpoint }: CreatorProfileBlockProps ) {
  const status = creator?.creator_status || 'inactive';
  const flagName = getCountryFlag( creator?.country );
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );

  return (
    <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full">
      <CardHeader className="py-3">
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="size-48 bg-background">
            { creatorAvatar && <AvatarImage src={ imgpresets.card( creatorAvatar ) } alt={ creatorName } /> }
            <AvatarFallback className="text-2xl">{ creatorName.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="ad-card-title card__title font-medium text-foreground">{ creatorName }</span>
            <span className="ad-card-description text-muted-foreground text-sm">{ creator?.email || 'No contact email' }</span>
            <div className="mt-2 text-[10px] sm:text-xs">
              <CreatorStatusBadge status={ status as string } />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
            <TabsTrigger value="bio" className="flex-1 text-xs">Bio</TabsTrigger>
            <TabsTrigger value="bank" className="flex-1 text-xs">Bank</TabsTrigger>
            <TabsTrigger value="user" className="flex-1 text-xs">User</TabsTrigger>
          </TabsList>

          {/* Overview Tab */ }
          <TabsContent value="overview">
            <WrappedCard title="Details">
              <Row label="Location" value={
                <span className="flex items-center gap-1.5 justify-end">
                  { flagName && (
                    <Image
                      src={ `/images/flags/${ flagName }.svg` }
                      alt={ creator?.country || 'Country' }
                      width={ 14 }
                      height={ 10 }
                      className="h-3 w-auto"
                    />
                  ) }
                  <span>{ location || 'N/A' }</span>
                </span>
              } />
              <Row label="Birthday" value={ creator?.date_of_birth ? useFormatDate( creator.date_of_birth ) : 'N/A' } />
              <Row label="Gender" value={ ( creator?.gender || 'N/A' ).toLowerCase() } />
              <Row label="Phone" value={ creator?.phone_number || 'N/A' } />
              <Row label="Joined" value={ useFormatDate( creator?.created_at! ) } />
            </WrappedCard>
          </TabsContent>

          {/* Bio Tab */ }
          <TabsContent value="bio" className="space-y-3">
            { creator?.application_video?.asset && (
              <WrappedCard title="Application Video">
                <video
                  src={ creator.application_video.asset }
                  poster={ creator.application_video.thumbnail }
                  controls
                  className="w-full rounded-md"
                />
              </WrappedCard>
            ) }

            <WrappedCard title="Biography">
              { creator?.bio ? (
                <Content content={ creator.bio } className="text-sm" />
              ) : (
                <EmptyState label="No biography provided" />
              ) }
            </WrappedCard>

            { creator?.preferred_categories && creator.preferred_categories.length > 0 && (
              <WrappedCard title="Preferred Categories">
                <div className="flex flex-wrap gap-1.5">
                  { creator.preferred_categories.map( ( cat ) => (
                    <Badge key={ String( cat ) } variant="secondary" className="font-normal capitalize text-xs">
                      { String( cat ).replace( /_/g, ' ' ) }
                    </Badge>
                  ) ) }
                </div>
              </WrappedCard>
            ) }
          </TabsContent>

          {/* Bank Details Tab */ }
          <TabsContent value="bank">
            { creator?.id ? (
              <BankTab creatorId={ creator.id } />
            ) : (
              <EmptyState label="No bank details on file" />
            ) }
          </TabsContent>

          {/* User Tab */ }
          <TabsContent value="user">
            { creator?.user_id ? (
              <UserTab userId={ creator.user_id } useProfileEndpoint={ useProfileEndpoint } />
            ) : (
              <EmptyState label="No linked user account" />
            ) }
          </TabsContent>
        </Tabs>

        { children && (
          <div className="pt-4 border-t border-border/40 mt-3">
            { children }
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
