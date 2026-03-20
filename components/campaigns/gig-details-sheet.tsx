"use client";

import * as React from 'react';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ModelsGigResponse } from '@/lib/api/generated';
import type { ModelsBrandResponse } from '@/lib/api/generated';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models/models-campaign-response';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/dashboard-ui/sheet';
import { Tabs as AnimTabs, TabsList as AnimTabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { GigStatusBadge } from './gig-status-badge';
import { formatDate } from '@/lib/utils';
import { useFormatCurrency } from '@/lib/hooks/format';
import { Button } from '@/components/dashboard-ui/button';
import { useApplyToGig, useGigInvitations, useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { useCreatorApplications, useCreatorGigs } from '@/lib/api/hooks/creators';
import { useRole } from '@/contexts/role-context';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { SubmissionCard } from './submission-card';
import { toast } from 'sonner';
import { ArrowRight, Globe, Loader2, VideoIcon } from 'lucide-react';
import { RoleGuard } from '../auth/role-guard';
import { Badge } from '@/components/dashboard-ui/badge';
import { Separator } from '@/components/dashboard-ui/separator';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { BrandAvatar } from './brand-avatar';
import { BrandHoverCard } from './brand-hover-card';
import { Row } from '../admin/creators/creator-details-sheet';
import { Content } from '../dashboard-ui/content';
import { ImagesTabContent } from '@/components/dashboard-ui/campaigns/assets-block/images-tab-content';
import { DocumentsTabContent } from '@/components/dashboard-ui/campaigns/assets-block/documents-tab-content';
import { VideosTabContent } from '@/components/dashboard-ui/campaigns/assets-block/videos-tab-content';
import { MediaPreview, type LegacyMediaItem } from '@/components/campaigns/media-preview';
import { ExpandableContent } from '../dashboard-ui/expandable-content';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models/models-video-submission-response';
import { Card, CardContent } from '../dashboard-ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '../dashboard-ui/empty';
import { SentenceCase } from '../text-case';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'details' | 'campaign' | 'submissions' | 'guidelines';

export interface GigDetailsSheetProps {
  gig: ModelsGigResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  invitationId?: string;
  invitationStatus?: string;
  initialTab?: Tab;
  onCreateSubmission?: () => void;
}

// ─── Cover image ──────────────────────────────────────────────────────────────

function GigCoverImage( { src, productUrl, alt }: { src: string; productUrl?: string; alt?: string; } ) {
  return (
    <div className="relative w-full aspect-4/3 shrink-0 overflow-hidden">
      <img src={ imgpresets.banner( src ) } alt={ alt } className="w-full h-full object-cover object-[50%_20%]" />
      { productUrl && (
        <a
          href={ productUrl }
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-40 right-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Product <Globe className="size-3" />
        </a>
      ) }
    </div>
  );
}

// ─── Sheet header ─────────────────────────────────────────────────────────────

interface GigSheetHeaderProps {
  title?: string;
  gigStatus?: string;
  numberOfVideos?: number;
  videoDuration?: number;
  postingEndDate?: string;
  hasCoverImage: boolean;
  brand?: ModelsCampaignResponse[ 'brand' ];
  compensationValue?: number;
  gigCostValue?: number;
  formattedCompensation: string;
  formattedGigCost: string;
}

function GigSheetHeader( {
  title,
  gigStatus,
  numberOfVideos,
  videoDuration,
  postingEndDate,
  hasCoverImage,
  brand,
  compensationValue,
  gigCostValue,
  formattedCompensation,
  formattedGigCost,
}: GigSheetHeaderProps ) {
  return (
    <SheetHeader className={ `relative flex flex-row items-start gap-4 bg-burgundy-50/70 mx-6 rounded-lg border border-primary/20 mb-0 ${ hasCoverImage ? '-mt-32 z-10 backdrop-blur-lg' : 'mt-16' }` }>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <SheetTitle className="text-xl font-normal text-primary font-primary tracking-tight leading-snug">
          { title }
        </SheetTitle>

        <div className="flex flex-wrap gap-2 items-center">
          { numberOfVideos && (
            <div className="flex items-center gap-2">
              <VideoIcon strokeWidth={ 1 } />
              { numberOfVideos } video{ numberOfVideos > 1 ? 's' : '' }
              { videoDuration ? ` · ${ videoDuration }s` : '' }
            </div>
          ) }
          <Separator orientation="vertical" className="bg-muted-foreground/30" />
          { postingEndDate && (
            <>
              <span className="text-muted-foreground/70">Deadline </span>
              { formatDate( postingEndDate ) }
            </>
          ) }
        </div>

        <GigStatusBadge status={ gigStatus } className="self-start" />
      </div>

      { brand && (
        <BrandHoverCard brand={ brand } brandName={ brand.company_name }>
          <BrandAvatar
            brand={ brand as ModelsBrandResponse }
            className="size-12 shrink-0 cursor-pointer bg-background ring-2 ring-background hover:ring-primary/30 transition-shadow"
          />
        </BrandHoverCard>
      ) }

      <SheetDescription className="sr-only">Details for gig: { title }</SheetDescription>
    </SheetHeader>
  );
}

// ─── Details tab ──────────────────────────────────────────────────────────────

interface GigDetailsTabProps {
  genderRequirement?: string;
  ageMin?: number;
  ageMax?: number;
  ambience?: string;
  requirements?: string;
  contentGuidelines?: string;
}

function GigDetailsTab( { genderRequirement, ageMin, ageMax, ambience, requirements, contentGuidelines }: GigDetailsTabProps ) {
  return (
    <TabsPanel value="details" className="pt-0 gap-2 flex flex-col">
      <WrappedCard title="Creator Requirements" className="m-1">
        <div className="flex items-start gap-3 py-2">
          { /* Gender */ }
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Gender</span>
            <div className="flex items-end gap-2">
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'female' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-male.svg" alt="Male" className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">Male</span>
              </div>
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'male' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-female.svg" alt="Female" className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">Female</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="self-stretch" />

          { /* Age range */ }
          <div className="flex flex-col gap-2 flex-1 items-end">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Age range</span>
            { ( ageMin || ageMax ) ? (
              <div className="relative flex items-center">
                <span className="relative z-10 text-xl mt-2 font-light bg-background px-2.5 py-1 rounded-md pr-5 border border-border shadow-md z-90">{ ageMin ?? '—' }</span>
                <ArrowRight strokeWidth={ 1 } className="relative z-10 size-8 text-muted-foreground bg-background rounded-full -ml-3 mt-2 shadow-md p-1 z-100" />
                <span className="relative z-10 text-xl mt-2 -ml-8 pl-10 font-light bg-background px-2.5 py-1 rounded-md border border-border shadow-md">{ ageMax ?? '—' }</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">Any</span>
            ) }
          </div>
        </div>

        <Separator />
        <Row label="Ambience" value={ ambience ? <span className="capitalize">{ ambience }</span> : 'N/A' } />
        { requirements && (
          <>
            <Separator />
            <Row label="Requirements" value={ requirements } />
          </>
        ) }
      </WrappedCard>

      { contentGuidelines && (
        <WrappedCard title="Content Guidelines" className="m-1">
          <Content content={ contentGuidelines } />
        </WrappedCard>
      ) }
    </TabsPanel>
  );
}

// ─── Campaign tab ─────────────────────────────────────────────────────────────

interface GigCampaignTabProps {
  campaign: ModelsCampaignResponse;
  imageItems: ModelsContentMedia[];
  documentItems: ModelsContentMedia[];
  videoItems: ModelsContentMedia[];
  hasAssets: boolean;
  onPreview: ( index: number, items: ModelsContentMedia[] ) => void;
}

function GigCampaignTab( { campaign, imageItems, documentItems, videoItems, hasAssets, onPreview }: GigCampaignTabProps ) {
  const keywords = React.useMemo(
    () => campaign.keywords?.split( ',' ).map( ( k ) => k.trim() ).filter( Boolean ) ?? [],
    [ campaign.keywords ]
  );

  const assetsDefault = imageItems.length > 0 ? 'images' : videoItems.length > 0 ? 'videos' : 'documents';

  return (
    <TabsPanel value="campaign" className="space-y-3 pt-0 m-1">
      { campaign.description && (
        <WrappedCard title="About this campaign">
          <ExpandableContent><Content content={ campaign.description } /></ExpandableContent>
        </WrappedCard>
      ) }

      { ( campaign.dos || campaign.donts ) && (
        <WrappedCard title="Do's & Don'ts">
          { campaign.dos && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-emerald-600">Do's</p>
              <ExpandableContent><Content content={ campaign.dos } /></ExpandableContent>
            </div>
          ) }
          { campaign.dos && campaign.donts && <Separator /> }
          { campaign.donts && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-rose-500">Don'ts</p>
              <ExpandableContent><Content content={ campaign.donts } /></ExpandableContent>
            </div>
          ) }
        </WrappedCard>
      ) }

      { ( campaign.tone_of_voice || keywords.length > 0 || campaign.category ) && (
        <WrappedCard title="Direction">
          { campaign.tone_of_voice && (
            <>
              <Row label="Tone of voice" value={ campaign.tone_of_voice } />
              { ( keywords.length > 0 || campaign.category ) && <Separator /> }
            </>
          ) }
          { keywords.length > 0 && (
            <>
              <Row label="Keywords" value={
                <div className="flex flex-wrap justify-end gap-1">
                  { keywords.map( ( kw ) => <Badge key={ kw } variant="secondary" className="text-xs font-normal">{ kw }</Badge> ) }
                </div>
              } />
              { campaign.category && <Separator /> }
            </>
          ) }
          { campaign.category && (
            <Row label="Category" value={ <Badge variant="outline" className="capitalize text-xs font-normal">{ campaign.category }</Badge> } />
          ) }
        </WrappedCard>
      ) }

      { hasAssets && (
        <WrappedCard title="Assets">
          <AnimTabs defaultValue={ assetsDefault }>
            <AnimTabsList variant="default" className="w-full mb-3">
              <TabsTab value="images" className="text-xs font-normal flex items-center gap-1.5">
                Images
                { imageItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ imageItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="documents" className="text-xs font-normal flex items-center gap-1.5">
                Documents
                { documentItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ documentItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="videos" className="text-xs font-normal flex items-center gap-1.5">
                Videos
                { videoItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ videoItems.length }</Badge> }
              </TabsTab>
            </AnimTabsList>
            <TabsPanels>
              <TabsPanel value="images">
                <ImagesTabContent imageItems={ imageItems } onPreview={ ( i ) => onPreview( i, imageItems ) } />
              </TabsPanel>
              <TabsPanel value="documents">
                <DocumentsTabContent documentItems={ documentItems } onPreview={ ( i ) => onPreview( i, documentItems ) } />
              </TabsPanel>
              <TabsPanel value="videos">
                <VideosTabContent videoItems={ videoItems } onPreview={ ( i ) => onPreview( i, videoItems ) } />
              </TabsPanel>
            </TabsPanels>
          </AnimTabs>
        </WrappedCard>
      ) }
    </TabsPanel>
  );
}

// ─── Submissions tab ──────────────────────────────────────────────────────────

interface GigSubmissionsTabProps {
  submissions: ModelsVideoSubmissionResponse[];
  isLoading: boolean;
  error: Error | null;
  canSubmit: boolean;
  onOpenSubmission: () => void;
}

function GigSubmissionsTab( { submissions, isLoading, error, canSubmit, onOpenSubmission }: GigSubmissionsTabProps ) {
  if ( isLoading ) {
    return (
      <TabsPanel value="submissions" className="pt-0 flex-1 h-full">
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </TabsPanel>
    );
  }

  if ( error ) {
    return (
      <TabsPanel value="submissions" className="pt-0 flex-1 h-full">
        <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200 text-sm">
          Error loading submissions: { error.message }
        </div>
      </TabsPanel>
    );
  }

  if ( submissions.length === 0 ) {
    return (
      <TabsPanel value="submissions" className="pt-0 flex-1 h-full">
        <Empty className="flex h-full flex-col items-center justify-center p-10 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
          <img src="/svg/ugc-creator.svg" className="max-w-3/4" alt="No submissions" />
          <EmptyContent>
            <EmptyHeader>
              <EmptyTitle className="card__title font-normal">No submissions yet</EmptyTitle>
              <EmptyDescription>Submissions will appear here once creators start submitting.</EmptyDescription>
            </EmptyHeader>
            { canSubmit && (
              <RoleGuard allowedRoles={ [ 'creator' ] }>
                <Button className="w-full mt-2" onClick={ onOpenSubmission }>
                  Create a Submission
                </Button>
              </RoleGuard>
            ) }
          </EmptyContent>
        </Empty>
      </TabsPanel>
    );
  }

  return (
    <TabsPanel value="submissions" className="pt-0 flex-1 h-full">
      <div className="grid grid-cols-1 gap-4">
        { submissions.map( ( submission, index ) => (
          <SubmissionCard
            key={ submission.id || `${ submission.gig_id || 'submission' }-${ index }` }
            submission={ submission }
            overlayDetailsMode="hover"
            layout="media-overlay"
          />
        ) ) }
      </div>
    </TabsPanel>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface GigFooterProps {
  compensationValue?: number;
  gigCostValue?: number;
  formattedCompensation: string;
  formattedGigCost: string;
  invitationId?: string;
  invitationStatus?: string;
  gigStatus?: string;
  isApplying: boolean;
  isResponding: boolean;
  isParticipating: boolean;
  hasAppliedPending: boolean;
  submissionsCount: number;
  isFooterLoading: boolean;
  onApply: () => void;
  onRespond: ( status: 'accepted' | 'declined' ) => void;
  onOpenSubmission: () => void;
}

function GigFooter( {
  compensationValue,
  gigCostValue,
  formattedCompensation,
  formattedGigCost,
  invitationId,
  invitationStatus,
  gigStatus,
  isApplying,
  isResponding,
  isParticipating,
  hasAppliedPending,
  submissionsCount,
  isFooterLoading,
  onApply,
  onRespond,
  onOpenSubmission,
}: GigFooterProps ) {
  return (
    <SheetFooter className="px-6 pb-6 pt-3 shrink-0 flex flex-col gap-3 border-t border-border/50">
      { ( compensationValue || gigCostValue ) && (
        <Card className="w-full flex flex-col p-2 bg-background/40 ring-primary/20 shadow-2xl">
          <CardContent className="flex flex-col gap-2 px-2">
            <RoleGuard excludedRoles={ [ 'brand' ] }>
              { compensationValue && (
                <Row label="Reward" value={ <span className="text-xl font-primary text-primary leading-none">{ formattedCompensation }</span> } />
              ) }
            </RoleGuard>
            <RoleGuard allowedRoles={ [ 'admin' ] }>
              { compensationValue && gigCostValue ? <Separator /> : null }
            </RoleGuard>
            <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
              { gigCostValue && (
                <Row label="Gig Cost" value={ <span className="text-xl font-primary text-primary leading-none">{ formattedGigCost }</span> } />
              ) }
            </RoleGuard>
          </CardContent>
        </Card>
      ) }

      <RoleGuard allowedRoles={ [ 'creator' ] }>
        { isFooterLoading ? null : invitationId && invitationStatus === 'pending' ? (
          <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" className="w-full" onClick={ () => onRespond( 'declined' ) } disabled={ isResponding }>
              Decline
            </Button>
            <Button className="w-full" onClick={ () => onRespond( 'accepted' ) } disabled={ isResponding }>
              { isResponding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</> : 'Accept Invitation' }
            </Button>
          </div>
        ) : ( invitationId && invitationStatus === 'accepted' ) || isParticipating ? (
          submissionsCount === 0 && (
            <Button className="w-full" onClick={ onOpenSubmission }>
              Create a Submission
            </Button>
          )
        ) : invitationId && invitationStatus === 'declined' ? null : hasAppliedPending ? (
          <Button className="w-full" disabled>
            Application Pending
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={ onApply }
            disabled={ isApplying || gigStatus !== 'open' }
          >
            { isApplying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Applying...</> : 'Apply for Gig' }
          </Button>
        ) }
      </RoleGuard>
    </SheetFooter>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GigDetailsSheet( { gig, open, onOpenChange, invitationId, invitationStatus, initialTab, onCreateSubmission }: GigDetailsSheetProps ) {
  const [ activeTab, setActiveTab ] = React.useState<Tab>( initialTab ?? 'details' );
  const [ gallery, setGallery ] = React.useState<{ index: number; items: ModelsContentMedia[]; } | null>( null );
  const [ submissionSheetOpen, setSubmissionSheetOpen ] = React.useState( false );

  const role = useRole();
  const isCreator = role === 'creator';

  const { mutate: applyToGig, isPending: isApplying } = useApplyToGig();
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const { data: submissionsResponse, isLoading: isSubmissionsLoading, error: submissionsError } = useVideoSubmissionsByGig(
    gig?.id || '',
    { enabled: !!gig?.id && open }
  );

  // Fetch invitation and participation data for creator role when not provided via props
  const needsFetch = isCreator && !invitationId;
  const { data: gigInvitationData, isLoading: isInvitationLoading } = useGigInvitations(
    gig?.id || '',
    { enabled: needsFetch && open && !!gig?.id }
  );
  const { data: creatorGigsData, isLoading: isCreatorGigsLoading } = useCreatorGigs(
    { campaignId: gig?.campaign?.id },
    { enabled: needsFetch && open && !!gig?.campaign?.id }
  );
  const { data: creatorApplicationsData, isLoading: isApplicationsLoading } = useCreatorApplications(
    { enabled: needsFetch && open }
  );

  // Derive effective invitation state — props take priority (invitations view already has the data)
  const effectiveInvitationId = invitationId ?? gigInvitationData?.data?.id;
  const effectiveInvitationStatus = invitationStatus ?? gigInvitationData?.data?.status;

  // Check if creator has a pending application for this gig (applied but not yet accepted)
  const gigApplication = creatorApplicationsData?.data?.find( ( a ) => a.gig_id === gig?.id );
  const hasAppliedPending = !effectiveInvitationId && gigApplication?.status === 'pending';

  // Only considered "participating" if gig is in creator's list AND application is accepted (not pending)
  const isParticipating = !effectiveInvitationId && !hasAppliedPending && ( creatorGigsData?.data?.some( ( g ) => g.id === gig?.id ) ?? false );

  // Wait for all creator-specific queries before showing action buttons to avoid flashing
  const isFooterLoading = isCreator && ( isSubmissionsLoading || ( needsFetch && ( isInvitationLoading || isCreatorGigsLoading || isApplicationsLoading ) ) );

  const formattedCompensation = useFormatCurrency( gig?.compensation?.value ?? 0, gig?.compensation?.currency || 'EUR' );
  const formattedGigCost = useFormatCurrency( gig?.gig_cost?.value ?? 0, gig?.gig_cost?.currency || 'EUR' );

  React.useEffect( () => {
    if ( !open ) return;
    setActiveTab( initialTab ?? 'details' );
  }, [ open, gig?.id, initialTab ] );

  const campaign = gig?.campaign;

  const imageItems = React.useMemo<ModelsContentMedia[]>( () => campaign?.campaign_images ?? [], [ campaign ] );
  const documentItems = React.useMemo<ModelsContentMedia[]>( () => campaign?.campaign_documents ?? [], [ campaign ] );
  const videoItems = React.useMemo<ModelsContentMedia[]>( () => campaign?.sample_videos ?? [], [ campaign ] );
  const hasAssets = React.useMemo( () => imageItems.length > 0 || documentItems.length > 0 || videoItems.length > 0, [ imageItems, documentItems, videoItems ] );
  const submissions = React.useMemo( () => submissionsResponse?.data ?? [], [ submissionsResponse ] );
  const coverImage = React.useMemo( () =>
    campaign?.product_image?.asset !== '' ? campaign?.product_image?.asset : campaign?.campaign_images?.[ 0 ]?.asset,
    [ campaign ]
  );

  const handleApply = React.useCallback( () => {
    if ( !gig?.id ) return;
    applyToGig( {
      id: gig.id,
      application: { message: "I am interested in this gig!", number_of_videos: gig.number_of_videos || 1 },
    }, {
      onSuccess: () => { toast.success( "Application submitted successfully!" ); onOpenChange( false ); },
      onError: ( error ) => {
        toast.error( "Failed to submit application. Please try again.", {
          richColors: true,
          description: <SentenceCase>{ error?.response?.data?.error?.message ?? "Failed to submit application. Please try again." }</SentenceCase>,
          dismissible: true,
        } );
      },
    } );
  }, [ gig, applyToGig, onOpenChange ] );

  const handleRespond = React.useCallback( ( status: 'accepted' | 'declined' ) => {
    if ( !effectiveInvitationId ) return;
    respondToInvitation( { invitationId: effectiveInvitationId, response: { status } }, {
      onSuccess: () => { toast.success( `Invitation ${ status === 'accepted' ? 'accepted' : 'declined' } successfully` ); onOpenChange( false ); },
      onError: () => { toast.error( "Failed to update invitation status" ); },
    } );
  }, [ effectiveInvitationId, respondToInvitation, onOpenChange ] );

  const handlePreview = React.useCallback( ( index: number, items: ModelsContentMedia[] ) => {
    setGallery( { index, items } );
  }, [] );

  if ( !gig ) return null;

  const { title, gig_status, posting_end_date, compensation: compensationMoney, number_of_videos, video_duration_in_seconds, requirements, content_guidelines, ambience, gender_requirement, age_min, age_max } = gig;

  return (
    <>
      <Sheet open={ open } onOpenChange={ onOpenChange }>
        <SheetContent className="w-[97%]! max-w-[550px]! overflow-hidden bg-background/80 flex flex-col p-0!">
          { coverImage && (
            <GigCoverImage src={ coverImage } productUrl={ campaign?.product_url } alt={ campaign?.campaign_name } />
          ) }

          <GigSheetHeader
            title={ title }
            gigStatus={ gig_status }
            numberOfVideos={ number_of_videos }
            videoDuration={ video_duration_in_seconds }
            postingEndDate={ posting_end_date }
            hasCoverImage={ !!coverImage }
            brand={ campaign?.brand }
            compensationValue={ compensationMoney?.value }
            gigCostValue={ gig.gig_cost?.value }
            formattedCompensation={ formattedCompensation }
            formattedGigCost={ formattedGigCost }
          />

          <AnimTabs
            value={ activeTab }
            onValueChange={ ( v ) => setActiveTab( v as Tab ) }
            className="px-6 flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            <AnimTabsList variant="default" className="w-full">
              <TabsTab value="details" className="text-sm font-normal">Details</TabsTab>
              { campaign && <TabsTab value="campaign" className="text-sm font-normal">Campaign</TabsTab> }
              <TabsTab value="submissions" className="text-sm font-normal">
                <RoleGuard allowedRoles={ [ 'creator' ] }>My Submissions</RoleGuard>
                <RoleGuard excludedRoles={ [ 'creator' ] }>Submissions</RoleGuard>
              </TabsTab>
            </AnimTabsList>

            <div className="flex-1 overflow-y-auto h-full">
              <GigDetailsTab
                genderRequirement={ gender_requirement }
                ageMin={ age_min }
                ageMax={ age_max }
                ambience={ ambience }
                requirements={ requirements }
                contentGuidelines={ content_guidelines }
              />

              { campaign && (
                <GigCampaignTab
                  campaign={ campaign }
                  imageItems={ imageItems }
                  documentItems={ documentItems }
                  videoItems={ videoItems }
                  hasAssets={ hasAssets }
                  onPreview={ handlePreview }
                />
              ) }

              <GigSubmissionsTab
                submissions={ submissions }
                isLoading={ isSubmissionsLoading }
                error={ submissionsError }
                canSubmit={ ( !!effectiveInvitationId && effectiveInvitationStatus === 'accepted' ) || isParticipating }
                onOpenSubmission={ () => setSubmissionSheetOpen( true ) }
              />
            </div>
          </AnimTabs>

          <GigFooter
            compensationValue={ compensationMoney?.value }
            gigCostValue={ gig.gig_cost?.value }
            formattedCompensation={ formattedCompensation }
            formattedGigCost={ formattedGigCost }
            invitationId={ effectiveInvitationId }
            invitationStatus={ effectiveInvitationStatus }
            gigStatus={ gig_status }
            isApplying={ isApplying }
            isResponding={ isResponding }
            isParticipating={ isParticipating }
            hasAppliedPending={ hasAppliedPending }
            submissionsCount={ submissions.length }
            isFooterLoading={ isFooterLoading }
            onApply={ handleApply }
            onRespond={ handleRespond }
            onOpenSubmission={ () => setSubmissionSheetOpen( true ) }
          />
        </SheetContent>
      </Sheet>

      <MediaPreview
        items={ ( gallery?.items ?? [] ).map( ( m ): LegacyMediaItem => ( { url: m.asset ?? '', thumbnail: m.thumbnail } ) ) }
        initialIndex={ gallery?.index ?? null }
        onOpenChange={ ( open ) => { if ( !open ) setGallery( null ); } }
        animation={ { preset: 'fade', duration: 1 } }
      />

      { gig?.id && (
        <CreateSubmissionSheet
          open={ submissionSheetOpen }
          onOpenChange={ setSubmissionSheetOpen }
          gigId={ gig.id }
        />
      ) }
    </>
  );
}
