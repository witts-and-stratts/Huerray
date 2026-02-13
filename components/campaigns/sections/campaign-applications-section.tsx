'use client';

import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Separator } from '@/components/dashboard-ui/separator';
import { format } from 'date-fns';
import { Loader2, Calendar, DollarSign, Video } from 'lucide-react';
import { calculateAge, cn } from '@/lib/utils';
import { getCountryFlag } from '@/lib/country-flags';
import { CreatorSocialLinks } from '@/components/admin/creators/creator-social-links';
import { Button } from '@/components/dashboard-ui/button';

interface CampaignApplicationsSectionProps {
  campaignId: string;
}

export function CampaignApplicationsSection( { campaignId }: CampaignApplicationsSectionProps ) {
  const { data: applicationsData, isLoading, error } = useCampaignApplications( campaignId );

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        Error loading applications: { error.message }
      </div>
    );
  }

  const applications = applicationsData?.data || [];

  if ( applications.length === 0 ) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
        <p className="text-muted-foreground font-medium">No applications yet</p>
        <p className="text-sm text-muted-foreground">Detailed applications from creators will appear here.</p>
      </div>
    );
  }

  const getStatusStyles = ( status?: string ) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return styles[ status?.toLowerCase() || '' ] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { applications.map( ( application ) => {
        const creator = application.creator;
        const gig = application.gig;
        const fullName = `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown';
        const age = creator?.date_of_birth ? calculateAge( creator.date_of_birth ) : null;
        const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );
        const flagName = creator?.country ? getCountryFlag( creator.country ) : null;

        return (
          <Card key={ application.id } className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="p-6 pb-4 flex flex-row gap-4 items-start space-y-0">
              <Avatar className="h-20 w-20 border-2 border-background shadow-sm shrink-0">
                <AvatarImage src={ creator?.profile_image_url } alt={ fullName } className="object-cover" />
                <AvatarFallback className="text-lg">{ fullName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
              </Avatar>

              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg truncate" title={ fullName }>{ fullName }</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  { age && <span>{ age } y/o</span> }
                  { age && location && <Separator orientation="vertical" className="h-3" /> }
                  { location && (
                    <div className="flex items-center gap-1">
                      { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ creator?.country || '' } className="h-3 w-auto" /> }
                      <span className="truncate max-w-[120px]" title={ location }>{ location }</span>
                    </div>
                  ) }
                </div>

                <div className="mt-1">
                  <CreatorSocialLinks
                    instagram={ creator?.instagram_handle }
                    tiktok={ creator?.tiktok_handle }
                    youtube={ creator?.youtube_handle }
                  />
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-6 pt-4 flex-1 flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Gig Details</h4>
                  <Badge variant="outline" className={ cn( "capitalize font-normal", getStatusStyles( application.status ) ) }>
                    { application.status || 'Pending' }
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-base">{ gig?.title || 'Untitled Gig' }</div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 p-2 rounded-md">
                      <DollarSign className="h-4 w-4" />
                      <span>{ gig?.compensation ? `$${ gig.compensation }` : 'Unpaid' }</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 p-2 rounded-md">
                      <Video className="h-4 w-4" />
                      <span>{ gig?.number_of_videos || 1 } Video{ ( gig?.number_of_videos || 1 ) > 1 ? 's' : '' }</span>
                    </div>
                  </div>
                </div>

                { application.message && (
                  <div className="bg-muted/20 p-3 rounded-md text-sm italic text-muted-foreground">
                    &quot;{ application.message }&quot;
                  </div>
                ) }
              </div>
            </CardContent>

            <CardFooter className="p-4 bg-muted/10 border-t flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Applied { application.applied_at ? format( new Date( application.applied_at ), 'MMM d, yyyy' ) : 'Unknown date' }</span>
              </div>

              <Button variant="ghost" size="sm" className="h-8">
                View Details
              </Button>
            </CardFooter>
          </Card>
        );
      } ) }
    </div>
  );
}
