import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
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

  return (
    <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="ad-card-title">Brand Profile</CardTitle>
        <CardDescription className="ad-card-description">Core brand information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <Avatar className="size-16">
              <AvatarImage src={ brandLogo } alt={ brandName } />
              <AvatarFallback>{ brandName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-primary font-medium text-primary">{ brandName }</p>
              <p className="text-xs text-muted-foreground">{ brand?.preferred_contact_email || 'No contact email' }</p>
              <div className="mt-2">
                <BrandStatusBadge status={ status } />
              </div>
            </div>
          </div>

          { ( brand?.category || brand?.company_size ) && (
            <div className="mt-3 flex flex-wrap gap-2">
              { brand?.category && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap">
                  { brand.category }
                </Badge>
              ) }
              { brand?.company_size && (
                <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap text-muted-foreground capitalize">
                  { String( brand.company_size ).replace( /_/g, ' ' ) }
                </Badge>
              ) }
            </div>
          ) }

          { location && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              { flagName && (
                <Image
                  src={ `/images/flags/${ flagName }.svg` }
                  alt={ brand?.country || 'Country' }
                  width={ 14 }
                  height={ 10 }
                  className="h-3 w-auto"
                />
              ) }
              <span>{ location }</span>
            </div>
          ) }
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Website</p>
              <p className="text-right text-sm font-medium">{ brand?.website_url || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Company Size</p>
              <p className="text-right text-sm font-medium capitalize">{ String( brand?.company_size || 'N/A' ).replace( /_/g, ' ' ) }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Registered</p>
              <p className="text-right text-sm font-medium">{ brand?.registration_number || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">VAT ID</p>
              <p className="text-right text-sm font-medium">{ brand?.vat_id || 'N/A' }</p>
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
