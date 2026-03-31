'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/dashboard-ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { BrandStatusBadge } from '@/components/admin/brands/brand-status-badge';
import { getCountryFlag } from '@/lib/country-flags';
import type { ModelsBrandResponse } from '@/lib/api/generated/models';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { UserStatusBadge } from '@/components/admin/users/user-status-badge';
import { EmailStatusBadge } from '@/components/dashboard-ui/status-badge';
import { useFormatDate } from '@/lib/hooks/format';
import { useUser } from '@/lib/api/hooks/users';
import { cn } from '@/lib/dashboard-utils';
import { Loader2 } from 'lucide-react';
import { useTranslations } from "next-intl";
import { imgpresets } from '@/lib/utils/imgproxy';

interface BrandProfileBlockProps {
  brand: ModelsBrandResponse;
  brandName: string;
  brandLogo: string;
  children?: React.ReactNode;
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

function UserTab( { userId }: { userId: string; } ) {
  const t = useTranslations( 'dashboard.admin' );
  const { data: userDetails, isLoading } = useUser( userId );
  const joinedLabel = useFormatDate( userDetails?.created_at || '' );
  const updatedLabel = useFormatDate( userDetails?.updated_at || '' );

  if ( isLoading ) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( !userDetails ) {
    return <EmptyState label={ t( 'brandProfileBlock.failedToLoadUser' ) } />;
  }

  const {
    first_name, last_name, username, email,
    user_type, user_status, email_verified, id,
  } = userDetails;

  const toLabel = ( value?: string ) =>
    value ? value.replace( /_/g, ' ' ).replace( /\b\w/g, c => c.toUpperCase() ) : t( 'brandProfileBlock.na' );

  return (
    <div className="space-y-3">
      <WrappedCard title={ t( 'brandProfileBlock.identity' ) }>
        <div className="flex items-center gap-2 flex-wrap pb-1">
          <UserStatusBadge status={ user_status || 'unknown' } />
          <EmailStatusBadge
            status={ email_verified ? t( 'brandProfileBlock.emailVerified' ) : t( 'brandProfileBlock.emailUnverified' ) }
            className={ email_verified ? 'border-green-400/40 text-green-600' : 'border-amber-400/40 text-amber-600' }
          />
        </div>
        <Row label={ t( 'brandProfileBlock.name' ) } value={ [ first_name, last_name ].filter( Boolean ).join( ' ' ) || username || t( 'brandProfileBlock.na' ) } />
        <Row label={ t( 'brandProfileBlock.username' ) } value={
          <CopyText text={ username! } iconSide="left" copyMessage={ t( 'brandProfileBlock.usernameCopied' ) } clamp={ true }>
            { username ? `@${ username }` : t( 'brandProfileBlock.na' ) }
          </CopyText>
        } />
        <Row label={ t( 'brandProfileBlock.type' ) } value={ toLabel( user_type ) } />
        <Row label={ t( 'brandProfileBlock.email' ) } value={
          <CopyText text={ email! } iconSide="left" clamp={ true }>
            { email ?? t( 'brandProfileBlock.na' ) }
          </CopyText>
        } />
      </WrappedCard>

      <WrappedCard title={ t( 'brandProfileBlock.system' ) }>
        <Row
          label={ t( 'brandProfileBlock.userId' ) }
          col2ClassName="self-center"
          value={
            id ? (
              <CopyText text={ id } iconSide="left" copyMessage={ t( 'brandProfileBlock.userIdCopied' ) } className="font-mono font-light text-[13px]" clamp={ true }>
                { id }
              </CopyText>
            ) : t( 'brandProfileBlock.na' )
          }
        />
        <Row label={ t( 'brandProfileBlock.joined' ) } value={ joinedLabel } />
        <Row label={ t( 'brandProfileBlock.updated' ) } value={ updatedLabel } />
      </WrappedCard>
    </div>
  );
}

export function BrandProfileBlock( { brand, brandName, brandLogo, children }: BrandProfileBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const status = ( brand as ModelsBrandResponse & { status?: string; } ).status || brand?.brand_status || 'inactive';
  const flagName = getCountryFlag( brand?.country );
  const location = [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' );
  const legacyNumber = ( brand as ModelsBrandResponse & { number?: string; } ).number;
  const address = [ brand?.street, brand?.building_number || legacyNumber, brand?.city, brand?.state, brand?.postal_code, brand?.country ]
    .filter( Boolean )
    .join( ', ' );
  const joinedLabel = useFormatDate( brand?.created_at || '' );

  return (
    <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full">
      <CardHeader className="py-3">
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="size-24 bg-background">
            <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            { brandLogo && <AvatarImage src={ imgpresets.avatar( brandLogo ) } alt={ brandName } /> }
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="ad-card-title card__title font-medium text-foreground">{ brandName }</span>
            <span className="ad-card-description text-muted-foreground text-sm">{ brand?.preferred_contact_email || t( 'brandProfileBlock.noContactEmail' ) }</span>
            <div className="mt-2 text-[10px] sm:text-xs">
              <BrandStatusBadge status={ status } />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="overview" className="flex-1 text-xs">{ t( 'brandProfileBlock.overview' ) }</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 text-xs">{ t( 'brandProfileBlock.contact' ) }</TabsTrigger>
            <TabsTrigger value="user" className="flex-1 text-xs">{ t( 'brandProfileBlock.user' ) }</TabsTrigger>
          </TabsList>

          {/* Overview Tab */ }
          <TabsContent value="overview">
            <WrappedCard title={ t( 'brandProfileBlock.details' ) }>
              <Row label={ t( 'brandProfileBlock.category' ) } value={ brand?.category || t( 'brandProfileBlock.na' ) } />
              <Row label={ t( 'brandProfileBlock.location' ) } value={
                <span className="flex items-center gap-1.5 justify-end">
                  { flagName && (
                    <Image
                      src={ `/images/flags/${ flagName }.svg` }
                      alt={ brand?.country || t( 'brandProfileBlock.country' ) }
                      width={ 14 }
                      height={ 10 }
                      className="h-3 w-auto"
                    />
                  ) }
                  <span>{ location || t( 'brandProfileBlock.na' ) }</span>
                </span>
              } />
              <Row label={ t( 'brandProfileBlock.companySize' ) } value={ String( brand?.company_size || t( 'brandProfileBlock.na' ) ).replace( /_/g, ' ' ) } />
              <Row label={ t( 'brandProfileBlock.registered' ) } value={ brand?.registration_number || t( 'brandProfileBlock.na' ) } />
              <Row label={ t( 'brandProfileBlock.vatId' ) } value={ brand?.vat_id || t( 'brandProfileBlock.na' ) } />
              <Row label={ t( 'brandProfileBlock.joined' ) } value={ joinedLabel } />
            </WrappedCard>
          </TabsContent>

          {/* Contact Tab */ }
          <TabsContent value="contact" className="space-y-3">
            <WrappedCard title={ t( 'brandProfileBlock.contact' ) }>
              <Row label={ t( 'brandProfileBlock.email' ) } value={
                brand?.preferred_contact_email ? (
                  <CopyText text={ brand.preferred_contact_email } iconSide="left" clamp={ true }>
                    { brand.preferred_contact_email }
                  </CopyText>
                ) : t( 'brandProfileBlock.na' )
              } />
              <Row label={ t( 'brandProfileBlock.phone' ) } value={ brand?.preferred_contact_phone || t( 'brandProfileBlock.na' ) } />
              <Row label={ t( 'brandProfileBlock.website' ) } value={ brand?.website_url || t( 'brandProfileBlock.na' ) } />
            </WrappedCard>

            <WrappedCard title={ t( 'brandProfileBlock.addressTitle' ) }>
              { address ? (
                <p className="text-sm leading-relaxed">{ address }</p>
              ) : (
                <EmptyState label={ t( 'brandProfileBlock.noAddress' ) } />
              ) }
            </WrappedCard>
          </TabsContent>

          {/* User Tab */ }
          <TabsContent value="user">
            { brand?.user_id ? (
              <UserTab userId={ brand.user_id } />
            ) : (
              <EmptyState label={ t( 'brandProfileBlock.noLinkedUser' ) } />
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
