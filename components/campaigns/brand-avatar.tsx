'use client';

import { useBrand } from '@/lib/api/hooks';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { imgpresets } from '@/lib/utils/imgproxy';

interface BrandAvatarProps {
  brandId: string;
  className?: string;
}

function BrandAvatarContent( { brandId, className }: BrandAvatarProps ) {
  console.log( "Branding id inside Brand Avatar", brandId );
  const { data, isLoading } = useBrand( brandId, {
    enabled: !!brandId,
  } );

  // ModelsStandardResponse has `data?: object`
  const brandData = ( data as any )?.data || ( data as any );

  if ( isLoading || !brandId ) return <BrandAvatarSkeleton className={ className } />;
  if ( !brandData ) return <BrandAvatarSkeleton className={ className } />;

  const { company_name, profile_photo_url, logo_url, logo } = brandData;
  const brandLogo = profile_photo_url || logo_url || logo;
  const brandName = company_name || 'Brand';

  return (
    <Avatar className={ className }>
      <AvatarImage
        src={ imgpresets.avatar( brandLogo ) }
        alt={ brandName }
        className="object-cover"
      />
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
