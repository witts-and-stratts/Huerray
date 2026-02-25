import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { BrandStatusBadge } from '@/components/admin/brands/brand-status-badge';
import { getCountryFlag } from '@/lib/country-flags';
import type { ModelsBrandResponse } from '@/lib/api/generated/models';
import { toDateLabel } from './brand-dashboard-utils';

interface BrandProfileBlockProps {
  brand: ModelsBrandResponse;
  brandName: string;
  brandLogo: string;
}

export function BrandProfileBlock( { brand, brandName, brandLogo }: BrandProfileBlockProps ) {
  const status = ( brand as ModelsBrandResponse & { status?: string; } ).status || brand?.brand_status || 'inactive';
  const flagName = getCountryFlag( brand?.country );
  const location = [ brand?.city, brand?.country ].filter( Boolean ).join( ', ' );
  const legacyNumber = ( brand as ModelsBrandResponse & { number?: string; } ).number;
  const address = [ brand?.street, brand?.building_number || legacyNumber, brand?.city, brand?.state, brand?.postal_code, brand?.country ]
    .filter( Boolean )
    .join( ', ' );

  return (
    <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full">
      <CardHeader className="py-3">
        {/* <CardTitle className="ad-card-title">Brand Profile</CardTitle>
        <CardDescription className="ad-card-description">Core brand information</CardDescription> */}
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="size-24 bg-background">
            <AvatarImage src={ brandLogo } alt={ brandName } />
            <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <CardTitle className="ad-card-title">{ brandName }</CardTitle>
            <CardDescription className="ad-card-description">{ brand?.preferred_contact_email || 'No contact email' }</CardDescription>
            <div className="mt-2">
              <BrandStatusBadge status={ status } />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>


        </div>

        <div className="space-y-2">
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Category</p>
              <p className="text-right text-sm font-normal">{ brand?.category || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Location</p>
              <div className="flex items-center gap-1.5 text-right text-sm font-normal">
                { flagName && (
                  <Image
                    src={ `/images/flags/${ flagName }.svg` }
                    alt={ brand?.country || 'Country' }
                    width={ 14 }
                    height={ 10 }
                    className="h-3 w-auto"
                  />
                ) }
                <span>{ location || 'N/A' }</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Website</p>
              <p className="flex items-center gap-1 text-right text-sm font-normal">{ brand?.website_url || 'N/A' }
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Company Size</p>
              <p className="text-right text-sm font-normal capitalize">{ String( brand?.company_size || 'N/A' ).replace( /_/g, ' ' ) }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Registered</p>
              <p className="text-right text-sm font-normal">{ brand?.registration_number || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">VAT ID</p>
              <p className="text-right text-sm font-normal">{ brand?.vat_id || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Email</p>
              <p className="text-right text-sm font-normal">{ brand?.preferred_contact_email || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Phone</p>
              <p className="text-right text-sm font-normal">{ brand?.preferred_contact_phone || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Address</p>
              <p className="text-right text-sm font-normal">{ address || 'N/A' }</p>
            </div>
          </div>
        </div>

        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="ad-stat-label">Created</span>
            <span className="text-right">{ toDateLabel( brand?.created_at ) }</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
