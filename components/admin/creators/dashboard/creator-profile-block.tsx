import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { CreatorStatusBadge } from '@/components/admin/creators/creator-status-badge';
import { getCountryFlag } from '@/lib/country-flags';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { toDateLabel } from './creator-dashboard-utils';
import { imgpresets } from '@/lib/utils/imgproxy';

interface CreatorProfileBlockProps {
  creator: ModelsCreatorResponse;
  creatorName: string;
  creatorAvatar: string;
  children?: React.ReactNode;
}

function Row( { label, value }: { label: string; value: React.ReactNode; } ) {
  return (
    <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-10">
        <p className="ad-stat-label font-regular text-muted-foreground/80">{ label }</p>
        <p className="text-right font-regular leading-relaxed">{ value }</p>
      </div>
    </div>
  );
}

export function CreatorProfileBlock( { creator, creatorName, creatorAvatar, children }: CreatorProfileBlockProps ) {
  const status = ( creator as any )?.status || 'inactive';
  const flagName = getCountryFlag( creator?.country );
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );


  return (
    <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full">
      <CardHeader className="py-3">
        <div className="flex flex-col items-center text-center gap-3">
          <Avatar className="size-48 bg-background">
            { creatorAvatar && <AvatarImage src={ imgpresets.card( creatorAvatar ) } alt={ creatorName } /> }
            <AvatarFallback>{ creatorName.substring( 0, 2 ).toUpperCase() }</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <div
              className="transition-colors"
            >
              <CardTitle className="ad-card-title">{ creatorName }</CardTitle>
            </div>
            <CardDescription className="ad-card-description">{ creator?.email || 'No contact email' }</CardDescription>
            <div className="mt-2 text-[10px] sm:text-xs">
              <CreatorStatusBadge status={ status as string } />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1 md:space-y-2">
          <Row label="Location" value={
            <span className="flex items-center gap-1.5 text-right">
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
            </span>
          } />
          <Row label="Birthday" value={ creator?.date_of_birth ? toDateLabel( creator.date_of_birth ) : 'N/A' } />
          <Row label="Gender" value={ ( creator?.gender || 'N/A' ).toLowerCase() } />
          <Row label="Language" value={ ( creator as any )?.primary_language || 'N/A' } />
          <Row label="Phone" value={ ( creator as any )?.phone || 'N/A' } />
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="ad-stat-label font-regular text-muted-foreground/80">Joined</span>
            <span className="text-right">{ toDateLabel( ( creator as any )?.created_at as string ) }</span>
          </div>
        </div>

        { children && (
          <div className="pt-4 border-t border-border/40">
            { children }
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
