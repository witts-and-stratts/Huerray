import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { CreatorStatusBadge } from '@/components/admin/creators/creator-status-badge';
import { getCountryFlag } from '@/lib/country-flags';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { toDateLabel } from './creator-dashboard-utils';

interface CreatorProfileBlockProps {
  creator: ModelsCreatorResponse;
  creatorName: string;
  creatorAvatar: string;
}

export function CreatorProfileBlock( { creator, creatorName, creatorAvatar }: CreatorProfileBlockProps ) {
  const status = ( creator as any )?.status || 'inactive';
  const flagName = getCountryFlag( creator?.country );
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );

  return (
    <Card className="ad-summary-card border-primary/20 bg-emerald-50 grow-0 h-full">
      <CardHeader className="py-3">
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="size-24 bg-background">
            <AvatarImage src={ creatorAvatar } alt={ creatorName } />
            <AvatarFallback>{ creatorName.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <Link
              href={ `/admin/creators/${ creator.id }` }
              className="hover:underline hover:text-primary transition-colors cursor-pointer"
            >
              <CardTitle className="ad-card-title">{ creatorName }</CardTitle>
            </Link>
            <CardDescription className="ad-card-description">{ creator?.email || 'No contact email' }</CardDescription>
            <div className="mt-2 text-[10px] sm:text-xs">
              <CreatorStatusBadge status={ status as string } />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Location</p>
              <div className="flex items-center gap-1.5 text-right text-sm font-normal">
                { flagName && (
                  <Image
                    src={ `/images/flags/${ flagName }.svg` }
                    alt={ creator?.country || 'Country' }
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
              <p className="ad-stat-label">Gender</p>
              <p className="text-right text-sm font-normal capitalize">{ ( creator?.gender || 'N/A' ).toLowerCase() }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Language</p>
              <p className="text-right text-sm font-normal">{ ( creator as any )?.primary_language || 'N/A' }</p>
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
            <div className="flex items-start justify-between gap-3">
              <p className="ad-stat-label">Phone</p>
              <p className="text-right text-sm font-normal">{ ( creator as any )?.phone || 'N/A' }</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Social Links Here - Check what exists on the backend first */ }
        <div className="space-y-2">
          <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5 flex flex-col gap-2">
            <p className="ad-stat-label mb-1">Social Media</p>
            { creator?.instagram_handle && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Instagram</span>
                <a href={ `https://instagram.com/${ creator.instagram_handle.replace( '@', '' ) }` } target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  @{ creator.instagram_handle.replace( '@', '' ) }
                </a>
              </div>
            ) }
            { creator?.tiktok_handle && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">TikTok</span>
                <a href={ `https://tiktok.com/@${ creator.tiktok_handle.replace( '@', '' ) }` } target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  @{ creator.tiktok_handle.replace( '@', '' ) }
                </a>
              </div>
            ) }
            { !creator?.instagram_handle && !creator?.tiktok_handle && (
              <p className="text-sm text-muted-foreground italic text-center w-full">No social accounts connected</p>
            ) }
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="ad-stat-label">Joined</span>
            <span className="text-right">{ toDateLabel( ( creator as any )?.created_at as string ) }</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
