'use client';

import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ModelsBrandResponse } from '@/lib/api/generated';

interface BrandAvatarProps {
  brand?: ModelsBrandResponse;
  className?: string;
}

function BrandAvatarSkeleton( { className }: { className?: string; } ) {
  return (
    <Skeleton className={ `rounded-full ${ className }` } />
  );
}

export function BrandAvatar( { brand, className }: BrandAvatarProps ) {
  if ( !brand ) return <BrandAvatarSkeleton className={ className } />;

  const brandLogo = brand.profile_photo?.asset;
  const brandName = brand.company_name || 'Brand';

  return (
    <Avatar className={ className }>
      { brandLogo &&
        <AvatarImage
          src={ imgpresets.avatar( brandLogo ) }
          alt={ brandName }
          className="object-cover"
        /> }
      <AvatarFallback className="rounded-full">
        { brandName.substring( 0, 2 ).toUpperCase() }
      </AvatarFallback>
    </Avatar>
  );
}
