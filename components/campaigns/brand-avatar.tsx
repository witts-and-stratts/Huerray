'use client';

import { useBrand } from '@/lib/api/hooks';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ModelsBrandResponse } from '@/lib/api/generated';

interface BrandAvatarProps {
  brand?: ModelsBrandResponse;
  className?: string;
}

function BrandAvatarContent( { brand, className }: BrandAvatarProps ) {
  console.log( "brand id", !brand?.id );
  const { data, isLoading } = useBrand( brand?.id!, {
    enabled: !!brand?.id,
  } );

  const brandData = ( data )?.data;
  const url = brand?.profile_photo_url;

  if ( ( isLoading || !brand?.id ) && !url ) return <BrandAvatarSkeleton className={ className } />;
  if ( !brandData && !url ) return <BrandAvatarSkeleton className={ className } />;

  const company_name = brand?.company_name || brandData?.id;
  const brandLogo = brand?.profile_photo_url || brandData?.profile_photo_url;
  const brandName = company_name || 'Brand';

  return (
    <Avatar className={ className }>
      { ( url || brandLogo ) && <AvatarImage
        src={ imgpresets.avatar( url ?? brandLogo! ) }
        alt={ brandName }
        className="object-cover"
      /> }
      <AvatarFallback className="rounded-full">
        { brandName.substring( 0, 2 ).toUpperCase() }
      </AvatarFallback>
    </Avatar>
  );
}

function BrandAvatarSkeleton( { className }: { className?: string; } ) {
  return (
    <Skeleton className={ `rounded-full ${ className }` } />
  );
}

export function BrandAvatar( props: BrandAvatarProps ) {
  return <BrandAvatarContent { ...props } />;
}
