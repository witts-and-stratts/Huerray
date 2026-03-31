'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { useBrand } from '@/lib/api/hooks/brands';
import { getCountryFlag } from '@/lib/country-flags';
import { useFormatDate } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Activity } from 'react';
import * as React from 'react';
import { BrandStatusBadge } from './brand-status-badge';
import { Brand } from './brands-data';
import { MetaBadge } from '../creators/details-sheet/creator-details-shared';
import { Row } from '../creators/details-sheet/creator-details-shared';
import Image from 'next/image';
import { Content } from '@/components/dashboard-ui/content';
import { SentenceCase } from '@/components/text-case';
import { useTranslations } from "next-intl";
import { RoleGuard } from '@/components/auth/role-guard';
import { BrandActionMenu } from './brand-action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ChevronDown } from 'lucide-react';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';

interface BrandDetailsSheetProps {
  brand?: Brand;
  brandId?: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

function BrandSheetHeader( { brand, brandId }: { brand?: Brand; brandId?: string; } ) {
  const t = useTranslations( 'dashboard.admin' );
  const { data } = useBrand( brandId || brand?.id || '' );
  const details = data?.data;

  const name = details?.company_name || brand?.name || '';
  const logo = details?.profile_photo?.asset || brand?.logo;
  const status = details?.brand_status || brand?.brand_status;
  const city = details?.city || brand?.city;
  const country = details?.country || brand?.country;
  const location = [ city, country ].filter( Boolean ).join( ', ' );
  const flagName = getCountryFlag( country );
  const initials = name.substring( 0, 2 ).toUpperCase();

  return (
    <SheetHeader className="relative flex flex-row items-center gap-4 bg-textured p-6 pb-8 m-6 rounded-lg mt-16 mb-0">
      { logo && <Avatar className="bg-background size-28 ring-background/10 ring-10 ring-offset-0">
        <AvatarImage src={ imgpresets.card( logo ) } alt={ name } className="object-cover" />
        <AvatarFallback className="text-3xl">{ initials }</AvatarFallback>
      </Avatar> }

      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start gap-1.5">
          <SheetTitle className="text-xl font-normal text-white font-primary capitalize tracking-tight">
            { name }
          </SheetTitle>
          { brand?.contact_email && (
            <span className="text-sm text-white/60 mb-1.5">{ brand.contact_email }</span>
          ) }
          <BrandStatusBadge status={ status || 'active' } />
        </div>

        { location && (
          <div className="flex items-center gap-2 pt-3">
            <MetaBadge>
              { flagName && (
                <Image src={ `/images/flags/${ flagName }.svg` } alt={ country || 'Flag' } width={ 16 } height={ 10 } className="h-3.5 w-auto" />
              ) }
              { location }
            </MetaBadge>
          </div>
        ) }
      </div>

      <SheetDescription className="sr-only">
        { t( 'brandDetailsSheet.detailedInformationAboutBrand' ) }{ name }.
      </SheetDescription>
    </SheetHeader>
  );
}

export function BrandDetailsSheet( { brand, brandId, open, onOpenChange }: BrandDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const [ activeTab, setActiveTab ] = React.useState( 'overview' );

  const { data } = useBrand( brand?.id || brandId || '', { enabled: open && !!( brand?.id || brandId ) } );
  const details = data?.data;

  const address = `${ details?.building_number } ${ details?.street }, ${ details?.city },<br /> ${ details?.state }, ${ details?.postal_code }.`;

  const formattedCreatedAt = useFormatDate( details?.created_at || '' );
  const menuBrand = brand || {
    id: details?.brand_id || brandId || '',
    name: details?.company_name || '',
    logo: details?.profile_photo?.asset || '',
    brand_status: details?.brand_status || 'active',
    total_campaigns: 0,
    website: details?.website_url || '',
    joined_date: details?.created_at || '',
    contact_email: details?.preferred_contact_email || '',
    category: details?.category || undefined,
    company_size: details?.company_size || undefined,
    city: details?.city || undefined,
    country: details?.country || undefined,
  };

  if ( !brand && !brandId ) return null;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[95%]! max-w-[500px]! overflow-y-auto bg-background/90">

        <BrandSheetHeader brand={ brand } brandId={ brandId } />

        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="px-6">
          <TabsList className="w-full border">
            <TabsTrigger value="overview" className="text-xs font-normal">{ t( 'brandDetailsSheet.overview' ) }</TabsTrigger>
            <TabsTrigger value="company" className="text-xs font-normal">{ t( 'brandDetailsSheet.company' ) }</TabsTrigger>
          </TabsList>

          {/* Overview */ }
          <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
            <div className="space-y-3 rounded-lg">
              <WrappedCard title="Contact Info">
                <Row label="Email" value={
                  <CopyText text={ details?.preferred_contact_email || brand?.contact_email || "" } iconSide="left">
                    <span className="font-normal">{ details?.preferred_contact_email || brand?.contact_email || 'N/A' }</span>
                  </CopyText>
                } />
                <Row label="Phone" value={
                  <CopyText text={ details?.preferred_contact_phone! } iconSide="left">
                    <span className="font-normal">{ details?.preferred_contact_phone || 'N/A' }</span>
                  </CopyText>
                } />
                <Row label="Website" value={ details?.website_url
                  ? <a href={ details.website_url } target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline font-normal truncate max-w-[200px]">{ details.website_url }</a>
                  : 'N/A'
                } />
                <Row label="Address" value={ <Content content={ address || 'N/A' } className='text-right font-normal' /> } />
              </WrappedCard>

              <WrappedCard title="System Details">
                <Row label="Joined" value={ details?.created_at ? formattedCreatedAt : 'N/A' } />
                <Separator />
                <Row label="Brand ID" value={
                  <CopyText text={ details?.brand_id! } iconSide="left" className="font-mono text-[13px]">
                    { details?.brand_id || 'N/A' }
                  </CopyText>
                } />
                <Separator />
                <Row label="User ID" value={
                  <CopyText text={ details?.user_id! } iconSide="left" className="font-mono text-[13px]">
                    { details?.user_id || 'N/A' }
                  </CopyText>
                } />
              </WrappedCard>
            </div>
          </Activity>

          {/* Company */ }
          <Activity mode={ activeTab === 'company' ? 'visible' : 'hidden' }>
            <div className="space-y-3 rounded-lg">
              <WrappedCard title="Company Details">
                <Row label="Category" value={ <SentenceCase>{ details?.category || brand?.category || 'N/A' }</SentenceCase> } />
                <Separator />
                <Row label="Company Size" value={ <SentenceCase>{ details?.company_size || brand?.company_size || 'N/A' }</SentenceCase> } />
                <Separator />
                <Row label="VAT ID" value={ details?.vat_id || 'N/A' } />
                <Separator />
                <Row label="Reg. Number" value={ details?.registration_number || 'N/A' } />
              </WrappedCard>

              { details?.company_description && (
                <WrappedCard title="Description">
                  <Content content={ details.company_description } />
                </WrappedCard>
              ) }
            </div>
          </Activity>
        </Tabs>

        <RoleGuard allowedRoles={ [ 'admin' ] }>
          <SheetFooter className="sticky bottom-0 px-6 pb-6 pt-3 shrink-0 border-t border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
            <BrandActionMenu
              brand={ menuBrand }
              trigger={
                <ButtonGroup className="self-start min-w-[240px]">
                  <Button variant="outline" size="sm" className="font-regular flex-1">
                    { tc( 'actions' ) }
                  </Button>
                  <Button variant="outline" size="sm" className="font-regular shrink-0">
                    <ChevronDown className="size-4" />
                  </Button>
                </ButtonGroup>
              }
            />
          </SheetFooter>
        </RoleGuard>

      </SheetContent>
    </Sheet>
  );
}
