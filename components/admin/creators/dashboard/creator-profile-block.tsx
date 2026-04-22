'use client';

import { CreatorStatusBadge } from '@/components/admin/creators/creator-status-badge';
import { UserStatusBadge } from '@/components/admin/users/user-status-badge';
import { RoleGuard } from '@/components/auth/role-guard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardHeader } from '@/components/dashboard-ui/card';
import { Content } from '@/components/dashboard-ui/content';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { EmailStatusBadge } from '@/components/dashboard-ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { useCreatorBankDetails, useOwnBankDetails } from '@/lib/api/hooks/creators';
import { useUser, useUserProfile } from '@/lib/api/hooks/users';
import { getCountryFlag } from '@/lib/country-flags';
import { cn } from '@/lib/dashboard-utils';
import { useFormatDate } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
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
          { [ ...Array( 4 ) ].map( ( _, i ) => (
            <div key={ i } className="flex justify-between gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ) ) }
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          { [ ...Array( 3 ) ].map( ( _, i ) => (
            <div key={ i } className="flex justify-between gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ) ) }
        </div>
      </div>
    );
  }

  if ( !userDetails ) {
    return <EmptyState label={ t( 'creatorDashboard.failedLoad' ) } />;
  }

  const {
    first_name, last_name, username, email,
    user_type, user_status, email_verified, id,
  } = userDetails;

  const toLabel = ( value?: string ) =>
    value ? value.replace( /_/g, ' ' ).replace( /\b\w/g, c => c.toUpperCase() ) : tc( 'sheets.na' );

  return (
    <div className="space-y-3">
      <WrappedCard title={ t( 'userDetails.accountSection' ) }>
        <div className="flex items-center gap-2 flex-wrap pb-1">
          <UserStatusBadge status={ user_status || 'unknown' } />
          <EmailStatusBadge
            status={ email_verified ? t( 'userDetails.emailVerified' ) : t( 'userDetails.emailUnverified' ) }
            className={ email_verified ? 'border-green-400/40 text-green-600' : 'border-amber-400/40 text-amber-600' }
          />
        </div>
        <Row label={ tc( 'sheets.details' ).split( ' ' )[ 0 ] } value={ [ first_name, last_name ].filter( Boolean ).join( ' ' ) || username || tc( 'sheets.na' ) } />
        <Row label={ t( 'userDetails.username' ) } value={
          <CopyText text={ username! }
            iconSide="left"
            copyMessage={ t( 'creatorStatus.idCopied' ) } clamp={ true }>
            { username ? `@${ username }` : tc( 'sheets.na' ) }
          </CopyText> } />
        <Row label={ tc( 'sheets.type' ) } value={ toLabel( user_type ) } />
        <Row label={ tc( 'sheets.email' ) }
          value={
            <CopyText text={ email! } iconSide='left' clamp={ true }>
              { email ? email : tc( 'sheets.na' ) }
            </CopyText> } />
      </WrappedCard>

      <WrappedCard title={ t( 'userDetails.systemDetails' ) }>
        <Row label={ t( 'userDetails.userId' ) }
          col2ClassName='self-center'
          value={
            id ? (
              <CopyText text={ id } iconSide="left" copyMessage={ t( 'creatorStatus.idCopied' ) } className='font-mono font-light text-[13px]' clamp={ true }>
                { id }
              </CopyText>
            ) : tc( 'sheets.na' )
          } />
        <Row label={ t( 'creatorProfileBlock.joined' ) } value={ joinedLabel } />
        <Row label={ t( 'creatorProfileBlock.updated' ) } value={ updatedLabel } />
      </WrappedCard>
    </div>
  );
}

function BankTab( { creatorId, useProfileEndpoint }: { creatorId: string; useProfileEndpoint?: boolean; } ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const adminBankQuery = useCreatorBankDetails( creatorId, { enabled: !useProfileEndpoint && !!creatorId } );
  const ownBankQuery = useOwnBankDetails( { enabled: !!useProfileEndpoint } );

  const { data: bankDetails, isLoading } = useProfileEndpoint ? ownBankQuery : adminBankQuery;

  if ( isLoading ) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        { [ ...Array( 4 ) ].map( ( _, i ) => (
          <div key={ i } className="flex justify-between gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) ) }
      </div>
    );
  }

  if ( !bankDetails || !bankDetails.has_bank_details ) {
    return <EmptyState label={ t( 'creatorProfileBlock.noBankDetails' ) } />;
  }

  return (
    <div className="space-y-3">
      <WrappedCard title={ t( 'creatorProfileBlock.bankDetails' ) }>
        <Row label={ t( 'creatorProfileBlock.bankName' ) } value={ bankDetails.bank_name || tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.accountName' ) } value={ bankDetails.bank_account_name || tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.accountNumber' ) } value={ bankDetails.bank_account_number ? bankDetails.bank_account_number.replace( /(.{4})/g, '$1 ' ).trim() : tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.routingNumber' ) } value={ bankDetails.bank_routing_number || tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.bankAddress' ) } value={ bankDetails.bank_address || tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.taxId' ) } value={ bankDetails.tax_id || tc( 'sheets.na' ) } />
        <Row label={ t( 'creatorProfileBlock.taxCountry' ) } value={ bankDetails.tax_residence_country || tc( 'sheets.na' ) } />
      </WrappedCard>
    </div>
  );
}

export function CreatorProfileBlock( { creator, creatorName, creatorAvatar, children, useProfileEndpoint }: CreatorProfileBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const status = creator?.creator_status || 'inactive';
  const flagName = getCountryFlag( creator?.country );
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );
  const birthdayLabel = useFormatDate( creator?.date_of_birth || '' );

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
            <span className="ad-card-description text-muted-foreground text-sm">{ creator?.email || t( 'creatorProfileBlock.noContactEmail' ) }</span>
            <div className="mt-2 text-[10px] sm:text-xs">
              <CreatorStatusBadge status={ status as string } />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="overview" className="flex-1 text-xs">{ t( 'creatorProfileBlock.tabs.overview' ) }</TabsTrigger>
            <RoleGuard excludedRoles={ [ 'creator' ] }>
              <TabsTrigger value="bio" className="flex-1 text-xs">{ t( 'creatorProfileBlock.tabs.bio' ) }</TabsTrigger>
            </RoleGuard>
            <TabsTrigger value="bank" className="flex-1 text-xs">{ t( 'creatorProfileBlock.tabs.bank' ) }</TabsTrigger>
            <TabsTrigger value="user" className="flex-1 text-xs">{ t( 'creatorProfileBlock.tabs.user' ) }</TabsTrigger>
          </TabsList>

          {/* Overview Tab */ }
          <TabsContent value="overview">
            <WrappedCard title={ t( 'creatorProfileBlock.details' ) }>
              <Row label={ t( 'creatorProfileBlock.location' ) } value={
                <span className="flex items-center gap-1.5 justify-end">
                  { flagName && (
                    <Image
                      src={ `/images/flags/${ flagName }.svg` }
                      alt={ creator?.country || t( 'creatorProfileBlock.country' ) }
                      width={ 14 }
                      height={ 10 }
                      className="h-3 w-auto"
                    />
                  ) }
                  <span>{ location || tc( 'sheets.na' ) }</span>
                </span>
              } />
              <Row label={ t( 'creatorProfileBlock.birthday' ) } value={ creator?.date_of_birth ? birthdayLabel : tc( 'sheets.na' ) } />
              <Row label={ t( 'creatorProfileBlock.gender' ) } value={ creator?.gender ? String( creator.gender ).toLowerCase() : tc( 'sheets.na' ) } />
              <Row label={ t( 'creatorProfileBlock.phone' ) } value={ creator?.phone_number || tc( 'sheets.na' ) } />
            </WrappedCard>
          </TabsContent>

          {/* Bio Tab */ }
          <RoleGuard excludedRoles={ [ 'creator' ] }>
            <TabsContent value="bio" className="space-y-3">
              { creator?.application_video?.asset && (
                <WrappedCard title={ t( 'creatorProfileBlock.applicationVideo' ) }>
                  <video
                    src={ creator.application_video.asset }
                    poster={ creator.application_video.thumbnail }
                    controls
                    className="w-full rounded-md"
                  />
                </WrappedCard>
              ) }

              <WrappedCard title={ t( 'creatorProfileBlock.biography' ) }>
                { creator?.bio ? (
                  <Content content={ creator.bio } className="text-sm" />
                ) : (
                  <EmptyState label={ t( 'creatorProfileBlock.noBiography' ) } />
                ) }
              </WrappedCard>

              { creator?.preferred_categories && creator.preferred_categories.length > 0 && (
                <WrappedCard title={ t( 'creatorProfileBlock.preferredCategories' ) }>
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
          </RoleGuard>

          {/* Bank Details Tab */ }
          <TabsContent value="bank">
            { creator?.id || useProfileEndpoint ? (
              <BankTab creatorId={ creator?.id || '' } useProfileEndpoint={ useProfileEndpoint } />
            ) : (
              <EmptyState label={ t( 'creatorProfileBlock.noBankDetails' ) } />
            ) }
          </TabsContent>

          {/* User Tab */ }
          <TabsContent value="user">
            { creator?.user_id ? (
              <UserTab userId={ creator.user_id } useProfileEndpoint={ useProfileEndpoint } />
            ) : (
              <EmptyState label={ t( 'creatorProfileBlock.noLinkedUser' ) } />
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
