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
import { cn } from '@/lib/dashboard-utils';
import { Button } from '@/components/dashboard-ui/button';
import { useApplyToGig, useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { SubmissionCard } from './submission-card';
import { useAuth } from '@/lib/auth/auth-context';
import { toast } from 'sonner';
import { Loader2, Video } from 'lucide-react';
import { RoleGuard } from '../auth/role-guard';

interface GigDetailsSheetProps {
  gig: ModelsGigResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  invitationId?: string;
  invitationStatus?: string;
}

export function GigDetailsSheet( { gig, open, onOpenChange, invitationId, invitationStatus }: GigDetailsSheetProps ) {
  const { user } = useAuth();
  const [ activeTab, setActiveTab ] = React.useState<'overview' | 'submissions'>( 'overview' );
  const { mutate: applyToGig, isPending: isApplying } = useApplyToGig();
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const isCreator = user?.role === 'creator';
  const { data: submissionsResponse, isLoading: isSubmissionsLoading, error: submissionsError } = useVideoSubmissionsByGig(
    gig?.id || '',
    { enabled: isCreator && !!gig?.id && open }
  );

  React.useEffect( () => {
    if ( !open ) return;
    setActiveTab( 'overview' );
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
        console.error( error?.response?.data );
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
      onError: ( error ) => {
        toast.error( "Failed to update invitation status" );
        console.error( error );
      }
    } );
  };

  const submissions = submissionsResponse?.data || [];

  const overviewContent = (
    <div className="space-y-6 p-4 pt-0">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/30 rounded-lg space-y-1">
          <span className="text-xs text-muted-foreground font-medium uppercase">Compensation</span>
          <div className="text-lg font-semibold">{ formatCurrency( compensation! ) }</div>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg space-y-1">
          <span className="text-xs text-muted-foreground font-medium uppercase">Videos</span>
          <div className="flex items-center gap-2 font-medium">
            { number_of_videos } ({ video_duration_in_seconds }s)
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Timeline</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Start Date</span>
              { formatDate( posting_start_date! ) }
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">End Date</span>
              { formatDate( posting_end_date! ) }
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Requirements</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            { requirements ? <p>{ requirements }</p> : <p className="italic">No specific requirements.</p> }
            <div className="flex flex-wrap gap-2 mt-2">
              { gender_requirement && (
                <span className="px-2 py-1 bg-secondary rounded text-xs capitalize">
                  { gender_requirement }
                </span>
              ) }
              { ( age_min || age_max ) && (
                <span className="px-2 py-1 bg-secondary rounded text-xs">
                  Age: { age_min ?? '?' } - { age_max ?? '?' }
                </span>
              ) }
              { ambience && (
                <span className="px-2 py-1 bg-secondary rounded text-xs capitalize">
                  { ambience }
                </span>
              ) }
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Content Guidelines</h4>
          <div className="text-sm text-muted-foreground">
            { content_guidelines ? <p>{ content_guidelines }</p> : <p className="italic">No specific guidelines.</p> }
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2 mb-2">
            <GigStatusBadge status={ gig_status } />
          </div>
          <SheetTitle className="text-xl">{ title }</SheetTitle>
          <SheetDescription>
            Review the details for this gig below.
          </SheetDescription>
        </SheetHeader>

        { isCreator ? (
          <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'overview' | 'submissions' ) } className="px-4 pb-4">
            <TabsList className="bg-background gap-4">
              <TabsTrigger
                value="overview"
                className={ cn(
                  "font-normal shadow-none! rounded-none! pb-3 text-primary border-b border-b-transparent -mb-5 px-0! transition-all duration-600 ease-out",
                  activeTab === "overview" ? "text-primary! border-b-dark-burgundy" : "text-gray-500!"
                ) }
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className={ cn(
                  "font-normal shadow-none! rounded-none! pb-3 text-primary border-b border-b-transparent -mb-5 px-0! transition-all duration-600 ease-out",
                  activeTab === "submissions" ? "text-primary! border-b-dark-burgundy" : "text-gray-500!"
                ) }
              >
                Submissions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              { overviewContent }
            </TabsContent>
            <TabsContent value="submissions" className="mt-4">
              { isSubmissionsLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : submissionsError ? (
                <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
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
                    <SubmissionCard key={ submission.id || `${ submission.gig_id || 'submission' }-${ index }` } submission={ submission } />
                  ) ) }
                </div>
              ) }
            </TabsContent>
          </Tabs>
        ) : overviewContent }

        <SheetFooter className="p-4 border-t mt-auto">
          <RoleGuard allowedRoles={ [ 'creator' ] }>
            { invitationId && invitationStatus === 'pending' ? (
              <div className="flex flex-col gap-2 w-full">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={ () => handleRespond( 'declined' ) }
                  disabled={ isResponding }
                >
                  Reject
                </Button>
                <Button
                  className="w-full"
                  onClick={ () => handleRespond( 'accepted' ) }
                  disabled={ isResponding }
                >
                  { isResponding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Accept Invitation'
                  ) }
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={ handleApply }
                disabled={ isApplying || gig_status !== 'open' || ( !!invitationId && invitationStatus !== 'pending' ) }
              >
                { isApplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
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
    </Sheet>
  );
}
