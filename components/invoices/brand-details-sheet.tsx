'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/dashboard-ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Separator } from '@/components/dashboard-ui/separator';
import { BrandStatusBadge } from '@/components/admin/brands/brand-status-badge';
import { useBrand } from '@/lib/api/hooks/brands';
import { getCountryFlag } from '@/lib/country-flags';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRole } from '@/contexts/role-context';
import { ExternalLink } from 'lucide-react';
import { useLocale } from 'next-intl';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

const Row = ( { label, value }: { label: string; value: React.ReactNode } ) => (
  <div className="flex items-start justify-between gap-3">
    <span className="text-xs text-muted-foreground shrink-0">{ label }</span>
    <span className="text-xs text-right">{ value ?? '—' }</span>
  </div>
);

interface BrandDetailsSheetProps {
  brandId?: string;
  brandName?: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function BrandDetailsSheet( { brandId, brandName, open, onOpenChange }: BrandDetailsSheetProps ) {
  const { data } = useBrand( brandId || '', { enabled: !!brandId && open } );
  const role = useRole();
  const locale = useLocale();

  const brand = data?.data;
  const name = brand?.company_name || brandName || '—';
  const flagName = brand?.country ? getCountryFlag( brand.country ) : undefined;
  const location = [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' );
  const address = [ brand?.street, brand?.building_number, brand?.city, brand?.state, brand?.postal_code, brand?.country ]
    .filter( Boolean )
    .join( ', ' );

  const brandPageUrl = role === 'admin'
    ? `/${ locale }/admin/brands/${ brandId }`
    : `/${ locale }/brand/brands/${ brandId }`;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[440px]! overflow-y-auto">
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col items-center gap-3 pr-8 text-center">
            <Avatar className="size-20">
              { brand?.profile_photo_url && (
                <AvatarImage src={ brand.profile_photo_url } alt={ name } />
              ) }
              <AvatarFallback>{ getInitials( name ) }</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-lg font-medium">{ name }</SheetTitle>
              { brand?.preferred_contact_email && (
                <SheetDescription>{ brand.preferred_contact_email }</SheetDescription>
              ) }
              { brand?.brand_status && (
                <div className="mt-2 flex justify-center">
                  <BrandStatusBadge status={ brand.brand_status } />
                </div>
              ) }
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 space-y-4 pb-8">
          <Separator />

          <div className="space-y-2">
            { brand?.category && <Row label="Category" value={ brand.category } /> }
            { brand?.company_size && (
              <Row label="Company Size" value={ String( brand.company_size ).replace( /_/g, ' ' ) } />
            ) }
            { location && (
              <Row
                label="Location"
                value={
                  <span className="flex items-center gap-1.5 justify-end">
                    { flagName && (
                      <Image
                        src={ `/images/flags/${ flagName }.svg` }
                        alt={ brand?.country || '' }
                        width={ 14 }
                        height={ 10 }
                        className="h-3 w-auto"
                      />
                    ) }
                    { location }
                  </span>
                }
              />
            ) }
            { address && <Row label="Address" value={ address } /> }
          </div>

          <Separator />

          <div className="space-y-2">
            { brand?.preferred_contact_phone && (
              <Row label="Phone" value={ brand.preferred_contact_phone } />
            ) }
            { brand?.website_url && (
              <Row
                label="Website"
                value={
                  <a
                    href={ brand.website_url }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    { brand.website_url.replace( /^https?:\/\//, '' ) }
                    <ExternalLink className="size-3" />
                  </a>
                }
              />
            ) }
            { brand?.registration_number && (
              <Row label="Registration" value={ brand.registration_number } />
            ) }
            { brand?.vat_id && (
              <Row label="VAT ID" value={ brand.vat_id } />
            ) }
          </div>

          { brand?.created_at && (
            <>
              <Separator />
              <Row label="Registered" value={ formatDate( brand.created_at ) } />
            </>
          ) }

          { brandId && role === 'admin' && (
            <>
              <Separator />
              <Link
                href={ brandPageUrl }
                className="flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                View full brand profile
              </Link>
            </>
          ) }
        </div>
      </SheetContent>
    </Sheet>
  );
}

