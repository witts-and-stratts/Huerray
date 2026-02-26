"use client";

import * as React from 'react';
import { ModelsGigResponse } from '@/lib/api/generated';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/dashboard-ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { GigStatusBadge } from './gig-status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/dashboard-ui/button';
import { useApplyToGig, useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { SubmissionCard } from './submission-card';
import { toast } from 'sonner';
import { Globe, Loader2, Video } from 'lucide-react';
import { RoleGuard } from '../auth/role-guard';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { getCountryFlag, getCountryName } from '@/lib/country-flags';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { Row } from '../admin/creators/creator-details-sheet';

interface GigDetailsSheetProps {
  gig: ModelsGigResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  invitationId?: string;
  invitationStatus?: string;
}

export function GigDetailsSheet( { gig, open, onOpenChange, invitationId, invitationStatus }: GigDetailsSheetProps ) {
  const [ activeTab, setActiveTab ] = React.useState<'details' | 'guidelines' | 'submissions'>( 'details' );
  const { mutate: applyToGig, isPending: isApplying } = useApplyToGig();
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const { data: submissionsResponse, isLoading: isSubmissionsLoading, error: submissionsError } = useVideoSubmissionsByGig(
    gig?.id || '',
    { enabled: !!gig?.id && open }
  );

  React.useEffect( () => {
    if ( !open ) return;
    setActiveTab( 'details' );
  }, [ open, gig?.id ] );

  if ( !gig ) return null;

  const {
    title,
    gig_status,
    posting_start_date,
    posting_end_date,
    compensation,
    number_of_videos,
    video_duration_in_seconds,
    requirements,
    content_guidelines,
    ambience,
    gender_requirement,
    age_min,
    age_max,
  } = gig;

  const handleApply = () => {
    if ( !gig.id ) return;
    applyToGig( {
      id: gig.id,
      application: {
        message: "I am interested in this gig!",
        number_of_videos: gig.number_of_videos || 1,
      }
    }, {
      onSuccess: () => {
        toast.success( "Application submitted successfully!" );
        onOpenChange( false );
      },
      onError: ( error ) => {
        toast.error( "Failed to submit application. Please try again.", {
          richColors: true,
          description: error?.response?.data?.error?.message,
          dismissible: true,
        } );
      }
    } );
  };

  const handleRespond = ( status: 'accepted' | 'declined' ) => {
    if ( !invitationId ) return;
    respondToInvitation( {
      invitationId,
      response: { status }
    }, {
      onSuccess: () => {
        toast.success( `Invitation ${ status === 'accepted' ? 'accepted' : 'declined' } successfully` );
        onOpenChange( false );
      },
      onError: () => {
        toast.error( "Failed to update invitation status" );
      }
    } );
  };

  const submissions = submissionsResponse?.data || [];


  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[90%]! max-w-[500px]! overflow-y-auto bg-background/70 flex flex-col">
        <SheetHeader className="relative flex flex-col items-center gap-4 bg-burgundy-50/60 p-6 pb-8 m-6 rounded-lg mt-16 border border-primary/20 mb-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <GigStatusBadge status={ gig_status } />
            <SheetTitle className="text-xl font-normal text-primary font-primary tracking-tight leading-snug">
              { title }
            </SheetTitle>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            { compensation && (
              <Badge className="bg-background/80 py-1" variant="outline">
                { formatCurrency( compensation ) }
              </Badge>
            ) }
            { number_of_videos && (
              <Badge className="bg-background/80 py-1" variant="outline">
                { number_of_videos } video{ number_of_videos > 1 ? 's' : '' }
                { video_duration_in_seconds ? ` · ${ video_duration_in_seconds }s` : '' }
              </Badge>
            ) }
            { ( posting_start_date || posting_end_date ) && (
              <Badge className="bg-background/80 py-1" variant="outline">
                { formatDate( posting_start_date! ) } → { formatDate( posting_end_date! ) }
              </Badge>
            ) }
          </div>

          <SheetDescription className="sr-only">
            Details for gig: { title }
          </SheetDescription>
        </SheetHeader>

        { ( gig.campaign?.brand || gig.campaign_name ) && ( () => {
          const brand = gig.campaign?.brand;
          const name = brand?.company_name || gig.campaign_name;
          return (
            <div className="px-6">
              <Card>
                <CardContent className="flex items-center gap-3 py-3">
                  <Avatar className="size-10 rounded-full">
                    <AvatarImage src={ brand?.profile_photo_url } alt={ name } className="object-cover" />
                    <AvatarFallback className="rounded-md text-sm">
                      { name?.slice( 0, 2 ).toUpperCase() }
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-primary truncate">{ name }</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      { brand?.category && <span className="capitalize">{ brand.category }</span> }
                      { brand?.category && brand?.country && <span>·</span> }
                      { brand?.country && ( () => {
                        const flagName = getCountryFlag( brand.country );
                        const countryName = getCountryName( brand.country );
                        return (
                          <span className="inline-flex items-center gap-1">
                            { flagName && <img src={ `/images/flags/${ flagName }.svg` } alt={ countryName ?? brand.country } className="h-3 w-auto" /> }
                            { countryName }
                          </span>
                        );
                      } )() }
                    </div>
                  </div>
                  { brand?.website_url && (
                    <a
                      href={ brand.website_url }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs flex items-center gap-1.5 text-muted-foreground hover:text-primary hover:underline hover:underline-offset-2 shrink-0"
                    >
                      Website
                      <Globe className="size-3.5 mb-0.5" />
                    </a>
                  ) }
                </CardContent>
              </Card>
            </div>
          );
        } )() }

        <Tabs
          value={ activeTab }
          onValueChange={ ( v ) => setActiveTab( v as typeof activeTab ) }
          className="px-6 flex-1"
        >
          <TabsList className="w-full border">
            <TabsTrigger value="details" className="text-sm font-normal">
              Details
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="text-sm font-normal">
              Guidelines
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-sm font-normal">
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-3 pt-0">
            <WrappedCard title='Compensation & Scope'>
              <Row label="Compensation" value={ compensation ? formatCurrency( compensation ) : 'N/A' } />
              <Separator />
              <Row label="Videos required" value={ number_of_videos ?? 'N/A' } />
              <Separator />
              <Row label="Video duration" value={ video_duration_in_seconds ? `${ video_duration_in_seconds }s` : 'N/A' } />
            </WrappedCard>

            <WrappedCard title='Timeline'>
              <Row label="Start date" value={ posting_start_date ? formatDate( posting_start_date ) : 'N/A' } />
              <Separator />
              <Row label="End date" value={ posting_end_date ? formatDate( posting_end_date ) : 'N/A' } />
            </WrappedCard>

            <WrappedCard title='Creator Requirements'>
              <Row label="Gender" value={ gender_requirement ? <span className="capitalize">{ gender_requirement }</span> : 'Any' } />
              <Separator />
              <Row label="Age range" value={ ( age_min || age_max ) ? `${ age_min ?? '—' } – ${ age_max ?? '—' }` : 'Any' } />
              <Separator />
              <Row label="Ambience" value={ ambience ? <span className="capitalize">{ ambience }</span> : 'N/A' } />
              { requirements && (
                <>
                  <Separator />
                  <div className="text-xs text-muted-foreground pt-1">{ requirements }</div>
                </>
              ) }
            </WrappedCard>
          </TabsContent>

          <TabsContent value="guidelines" className="pt-0">
            <WrappedCard title='Content Guidelines'>
              { content_guidelines ? (
                <p className="text-xs text-muted-foreground leading-relaxed">{ content_guidelines }</p>
              ) : (
                <p className="text-xs text-muted-foreground italic py-6 text-center">No specific guidelines provided.</p>
              ) }
            </WrappedCard>
          </TabsContent>

          <TabsContent value="submissions" className="pt-0">
            { isSubmissionsLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : submissionsError ? (
              <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200 text-sm">
                Error loading submissions: { submissionsError.message }
              </div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
                <div className="p-4 bg-background rounded-full border shadow-sm">
                  <Video className="size-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No submissions yet</p>
                <p className="text-sm text-muted-foreground">Create your first submission for this gig.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                { submissions.map( ( submission, index ) => (
                  <SubmissionCard key={ submission.id || `${ submission.gig_id || 'submission' }-${ index }` } submission={ submission } overlayDetailsMode='hover' layout='media-overlay' />
                ) ) }
              </div>
            ) }
          </TabsContent>
        </Tabs>

        <SheetFooter className="px-6 pb-6 pt-2">
          <RoleGuard allowedRoles={ [ 'creator' ] }>
            { invitationId && invitationStatus === 'pending' ? (
              <div className="flex flex-col gap-2 w-full">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={ () => handleRespond( 'declined' ) }
                  disabled={ isResponding }
                >
                  Decline
                </Button>
                <Button
                  className="w-full"
                  onClick={ () => handleRespond( 'accepted' ) }
                  disabled={ isResponding }
                >
                  { isResponding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</> : 'Accept Invitation' }
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={ handleApply }
                disabled={ isApplying || gig_status !== 'open' || ( !!invitationId && invitationStatus !== 'pending' ) }
              >
                { isApplying ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Applying...</>
                ) : (
                  !!invitationId && invitationStatus === 'accepted' ? 'Invitation Accepted' :
                    !!invitationId && invitationStatus === 'declined' ? 'Invitation Declined' :
                      'Apply for Gig'
                ) }
              </Button>
            ) }
          </RoleGuard>
        </SheetFooter>
      </SheetContent>
    </Sheet >
  );
}
