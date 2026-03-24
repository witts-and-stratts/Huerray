'use client';

import { BrandActionMenu } from './brand-action-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { getCountryFlag } from '@/lib/country-flags';
import { BrandStatusBadge } from './brand-status-badge';
import { Brand } from './brands-data';
import { imgpresets } from '@/lib/utils/imgproxy';

interface BrandCardProps {
  brand: Brand;
  onViewDetails?: ( brand: Brand ) => void;
}

export function BrandCard( { brand, onViewDetails }: BrandCardProps ) {
  const {
    id,
    name,
    logo,
    brand_status,
    website,
    contact_email,
    category,
    company_size,
    city,
    country,
  } = brand;

  const flagName = getCountryFlag( country );
  const location = [ city, country ].filter( Boolean ).join( ', ' );

  return (
    <Card className='py-3 justify-between gap-1 h-full'>
      <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
        <div className="flex flex-col flex-1 min-w-0">
          <button onClick={ () => onViewDetails?.( brand ) } className='text-left hover:underline'>
            <CardTitle>
              { name }
            </CardTitle>
          </button>
          <CardDescription className="text-muted-foreground/70 text-sm truncate">{ contact_email }</CardDescription>
        </div>
        <div className='flex shrink-0 text-right'>
          <Avatar className="h-10 w-10">
            <AvatarImage src={ imgpresets.avatar( logo ) } alt={ name } />
            <AvatarFallback>{ name.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <BrandActionMenu brand={ brand } onViewDetails={ onViewDetails } />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        { ( category || company_size ) && (
          <div className="flex flex-wrap gap-2">
            { category && <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap">{ category }</Badge> }
            { company_size && <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-normal whitespace-nowrap text-muted-foreground">{ company_size }</Badge> }
          </div>
        ) }

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          { location && (
            <div className="flex items-center gap-1">
              { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ country } className="h-3 w-auto" /> }
              <span>{ city || country }</span>
            </div>
          ) }
        </div>

        <div className="mt-2">
          <BrandStatusBadge status={ brand_status || 'active' } />
        </div>
      </CardContent>
    </Card>
  );
}
