"use client";

import { Tabs as AnimTabs, TabsList as AnimTabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { MediaPreview, type LegacyMediaItem } from '@/components/campaigns/media-preview';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';
import { InvitationActionMenu } from '@/components/creator/invitation-action-menu';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { DocumentsTabContent } from '@/components/dashboard-ui/campaigns/assets-block/documents-tab-content';
import { ImagesTabContent } from '@/components/dashboard-ui/campaigns/assets-block/images-tab-content';
import { VideosTabContent } from '@/components/dashboard-ui/campaigns/assets-block/videos-tab-content';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { useRole } from '@/contexts/role-context';
import type { ModelsBrandResponse } from '@/lib/api/generated';
import { ModelsGigResponse } from '@/lib/api/generated';
import type { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models/models-campaign-response';
import type { ModelsContentMedia } from '@/lib/api/generated/models/models-content-media';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models/models-video-submission-response';
import { useCreatorApplications } from '@/lib/api/hooks/creators';
import { useApplyToGig, useCreatorInvitations, useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { useFormatCurrency } from '@/lib/hooks/format';
import { formatDate } from '@/lib/utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ArrowRight, ChevronDown, Globe, Loader2, Plus, VideoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { toast } from 'sonner';
import { Row } from '../admin/creators/creator-details-sheet';
import { EmptySubmission } from '../admin/empty-states/empty-submissions';
import { RoleGuard } from '../auth/role-guard';
import { Card, CardContent } from '../dashboard-ui/card';
import { Content } from '../dashboard-ui/content';
import { ExpandableContent } from '../dashboard-ui/expandable-content';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { SentenceCase } from '../text-case';
import { BrandAvatar } from './brand-avatar';
import { BrandHoverCard } from './brand-hover-card';
import { GigActionMenu } from './gig-action-menu';
import { GigStatusBadge } from './gig-status-badge';
import { SubmissionCard } from './submission-card';

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
  const t = useTranslations( 'dashboard.creator' );
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
          { t( 'common.product' ) } <Globe className="size-3" />
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
  const t = useTranslations( 'dashboard.creator' );
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
              { t( 'common.videoCount', { count: numberOfVideos } ) }
              { videoDuration ? ` · ${ videoDuration }s` : '' }
            </div>
          ) }
          <Separator orientation="vertical" className="bg-muted-foreground/30" />
          { postingEndDate && (
            <>
              <span className="text-muted-foreground/70">{ t( 'common.deadline' ) } </span>
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

      <SheetDescription className="sr-only">{ t( 'gigDetailsFor', { title: title! } ) }</SheetDescription>
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
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  return (
    <TabsPanel value="details" className="pt-0 gap-2 flex flex-col">
      <WrappedCard title={ t( 'creatorRequirements' ) } className="m-1">
        <div className="flex items-start gap-3 py-2">
          { /* Gender */ }
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{ t( 'gender' ) }</span>
            <div className="flex items-end gap-2">
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'female' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-male.svg" alt={ t( 'male' ) } className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">{ t( 'male' ) }</span>
              </div>
              <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ genderRequirement === 'male' ? 'opacity-20' : '' }` }>
                <img src="/svg/avatar-female.svg" alt={ t( 'female' ) } className="size-16" />
                <span className="text-xs text-muted-foreground mt-2">{ t( 'female' ) }</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="self-stretch" />

          { /* Age range */ }
          <div className="flex flex-col gap-2 flex-1 items-end">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{ t( 'ageRange' ) }</span>
            { ( ageMin || ageMax ) ? (
              <div className="relative flex items-center">
                <span className="relative z-10 text-xl mt-2 font-light bg-background px-2.5 py-1 rounded-md pr-5 border border-border shadow-md z-90">{ ageMin ?? '—' }</span>
                <ArrowRight strokeWidth={ 1 } className="relative z-10 size-8 text-muted-foreground bg-background rounded-full -ml-3 mt-2 shadow-md p-1 z-100" />
                <span className="relative z-10 text-xl mt-2 -ml-8 pl-10 font-light bg-background px-2.5 py-1 rounded-md border border-border shadow-md">{ ageMax ?? '—' }</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">{ t( 'any' ) }</span>
            ) }
          </div>
        </div>

        <Separator />
        <Row label={ t( 'ambience' ) } value={ ambience ? <span className="capitalize"><Content content={ ambience } /></span> : t( 'na' ) } />
        { requirements && (
          <>
            <Separator />
            <Row label={ t( 'requirements' ) } value={ requirements } />
          </>
        ) }
      </WrappedCard>

      { contentGuidelines && (
        <WrappedCard title={ t( 'contentGuidelines' ) } className="m-1">
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
  const summaryT = useTranslations( 'dashboard.brand.newCampaignPage.summary' );
  const gigsT = useTranslations( 'dashboard.brand.gigsPage' );
  const keywords = React.useMemo(
    () => campaign.keywords?.split( ',' ).map( ( k ) => k.trim() ).filter( Boolean ) ?? [],
    [ campaign.keywords ]
  );

  const assetsDefault = imageItems.length > 0 ? 'images' : videoItems.length > 0 ? 'videos' : 'documents';

  return (
    <TabsPanel value="campaign" className="space-y-3 pt-0 m-1">
      { campaign.description && (
        <WrappedCard title={ summaryT( 'campaignBriefTitle' ) }>
          <ExpandableContent><Content content={ campaign.description } /></ExpandableContent>
        </WrappedCard>
      ) }

      { ( campaign.dos || campaign.donts ) && (
        <WrappedCard title={ summaryT( 'campaignBriefDescription' ) }>
          { campaign.dos && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-emerald-600">{ summaryT( 'dos' ) }</p>
              <ExpandableContent><Content content={ campaign.dos } /></ExpandableContent>
            </div>
          ) }
          { campaign.dos && campaign.donts && <Separator /> }
          { campaign.donts && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-rose-500">{ summaryT( 'donts' ) }</p>
              <ExpandableContent><Content content={ campaign.donts } /></ExpandableContent>
            </div>
          ) }
        </WrappedCard>
      ) }

      { ( campaign.tone_of_voice || keywords.length > 0 || campaign.category ) && (
        <WrappedCard title={ summaryT( 'details' ) }>
          { campaign.tone_of_voice && (
            <>
              <Row label={ summaryT( 'toneOfVoice' ) } value={ <Content content={ campaign.tone_of_voice } /> } />
              { ( keywords.length > 0 || campaign.category ) && <Separator /> }
            </>
          ) }
          { keywords.length > 0 && (
            <>
              <Row label={ summaryT( 'keywords' ) } value={
                <div className="flex flex-wrap justify-end gap-1">
                  { keywords.map( ( kw ) => <Badge key={ kw } variant="secondary" className="text-xs font-normal">{ kw }</Badge> ) }
                </div>
              } />
              { campaign.category && <Separator /> }
            </>
          ) }
          { campaign.category && (
            <Row label={ gigsT( 'category' ) } value={ <Badge variant="outline" className="capitalize text-xs font-normal">{ campaign.category }</Badge> } />
          ) }
        </WrappedCard>
      ) }

      { hasAssets && (
        <WrappedCard title={ summaryT( 'assets' ) }>
          <AnimTabs defaultValue={ assetsDefault }>
            <AnimTabsList variant="default" className="w-full mb-3">
              <TabsTab value="images" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'images' ) }
                { imageItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ imageItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="documents" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'docs' ) }
                { documentItems.length > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ documentItems.length }</Badge> }
              </TabsTab>
              <TabsTab value="videos" className="text-xs font-normal flex items-center gap-1.5">
                { summaryT( 'videos' ) }
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
  showAddSubmissionButton: boolean;
  onOpenSubmission: () => void;
}

function GigSubmissionsTab( { submissions, isLoading, error, canSubmit, showAddSubmissionButton, onOpenSubmission }: GigSubmissionsTabProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const creatorInvitationActionsT = useTranslations( 'dashboard.creator.invitations.actions' );
  const shouldShowAddSubmissionButton = canSubmit && showAddSubmissionButton;
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
          { t( 'errorLoadingSubmissions' ) }: { error.message }
        </div>
      </TabsPanel>
    );
  }

  if ( submissions.length === 0 ) {
    return (
      <TabsPanel value="submissions" className="pt-0 flex-1 h-full">
        { shouldShowAddSubmissionButton ? (
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="h-52 w-full border-dashed border-2 border-muted-foreground/40 bg-transparent hover:bg-muted/40"
              onClick={ onOpenSubmission }
            >
              <span className="flex items-center justify-center gap-2 text-muted-foreground">
                <Plus className="size-5" />
                { creatorInvitationActionsT( 'createSubmission' ) }
              </span>
            </Button>
          </div>
        ) : (
          <EmptySubmission
            title={ t( 'noSubmissionsYet' ) }
            imageWidth={ 140 }
            description={ t( 'noSubmissionsYetDescription' ) }
          />
        ) }
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
        { shouldShowAddSubmissionButton && (
          <Button
            variant="outline"
            size="icon-lg"
            className="border-dashed border-px border-muted-foreground/20 bg-transparent hover:bg-muted/40 rounded-full mx-auto hover:shadow-lg cursor-pointer"
            onClick={ onOpenSubmission }
          >
            <Plus className="size-5 text-muted-foreground" strokeWidth={ 1 } />
            <span className="sr-only">
              { creatorInvitationActionsT( 'createSubmission' ) }
            </span>
          </Button>
        ) }
      </div>
    </TabsPanel>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface GigFooterProps {
  gig: ModelsGigResponse;
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
  onSelectTab: ( tab: Tab ) => void;
}

function GigFooter( {
  gig,
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
  onSelectTab,
}: GigFooterProps ) {
  const commonT = useTranslations( 'dashboard.creator.common' );
  const invitationActionsT = useTranslations( 'dashboard.creator.invitations.actions' );
  const invitationDialogsT = useTranslations( 'dashboard.creator.invitations.dialogs' );
  const tc = useTranslations( 'dashboard.common' );
  return (
    <SheetFooter className="px-6 pb-6 pt-3 shrink-0 flex flex-col gap-3 border-t border-border/50">
      { ( compensationValue || gigCostValue ) && (
        <Card className="w-full flex flex-col p-2 bg-background/40 ring-primary/20 shadow-2xl">
          <CardContent className="flex flex-col gap-2 px-2">
            <RoleGuard excludedRoles={ [ 'brand' ] }>
              { compensationValue && (
                <Row label={ commonT( 'reward' ) } value={ <span className="text-xl font-primary text-primary leading-none">{ formattedCompensation }</span> } />
              ) }
            </RoleGuard>
            <RoleGuard allowedRoles={ [ 'admin' ] }>
              { compensationValue && gigCostValue ? <Separator /> : null }
            </RoleGuard>
            <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
              { gigCostValue && (
                <Row label={ commonT( 'gigCost' ) } value={ <span className="text-xl font-primary text-primary leading-none">{ formattedGigCost }</span> } />
              ) }
            </RoleGuard>
          </CardContent>
        </Card>
      ) }

      <RoleGuard allowedRoles={ [ 'creator' ] }>
        { isFooterLoading ? null : invitationId && invitationStatus === 'pending' ? (
          <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" className="w-full" onClick={ () => onRespond( 'declined' ) } disabled={ isResponding }>
              { invitationActionsT( 'decline' ) }
            </Button>
            <Button className="w-full" onClick={ () => onRespond( 'accepted' ) } disabled={ isResponding }>
              { isResponding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{ invitationDialogsT( 'accepting' ) }</> : invitationActionsT( 'accept' ) }
            </Button>
          </div>
        ) : isParticipating ? (
          submissionsCount === 0 && (
            <Button className="w-full" onClick={ onOpenSubmission }>
              { invitationActionsT( 'createSubmission' ) }
            </Button>
          )
        ) : hasAppliedPending ? (
          <Button className="w-full" disabled>
            { commonT( 'applicationPending' ) }
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={ onApply }
            disabled={ isApplying || gigStatus !== 'open' }
          >
            { isApplying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{ commonT( 'applying' ) }</> : commonT( 'applyForGig' ) }
          </Button>
        ) }
      </RoleGuard>

      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <GigActionMenu
          gig={ gig }
          onViewGig={ ( _, tab ) => onSelectTab( tab ?? 'details' ) }
          trigger={
            <ButtonGroup className="self-start min-w-[240px]">
              <Button variant="outline" size="sm" className="font-regular flex-1">
                { tc( 'actions' ) }
              </Button>
              <Button variant="outline" size="sm" className="font-regular shrink-0">
                <ChevronDown className="size-4" />
              </Button>
            </ButtonGroup>
          }
        />
      </RoleGuard>

      <RoleGuard allowedRoles={ [ 'creator' ] }>
        { invitationId && invitationStatus !== 'pending' ? (
          <InvitationActionMenu
            invitation={ {
              id: invitationId,
              gig_id: gig.id,
              status: invitationStatus,
            } as any }
            trigger={
              <ButtonGroup className="self-start min-w-[240px]">
                <Button variant="outline" size="sm" className="font-regular flex-1">
                  { tc( 'actions' ) }
                </Button>
                <Button variant="outline" size="sm" className="font-regular shrink-0">
                  <ChevronDown className="size-4" />
                </Button>
              </ButtonGroup>
            }
          />
        ) : null }
      </RoleGuard>
    </SheetFooter>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GigDetailsSheet( { gig, open, onOpenChange, invitationId, invitationStatus, initialTab, onCreateSubmission }: GigDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  const campaignT = useTranslations( 'dashboard.brand.campaignsPage' );
  const campaignActionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const creatorCommonT = useTranslations( 'dashboard.creator.common' );
  const creatorInvitationToastsT = useTranslations( 'dashboard.creator.invitations.toasts' );
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
  const { data: creatorInvitationsData, isLoading: isInvitationLoading } = useCreatorInvitations(
    { enabled: needsFetch && open }
  );
  const { data: creatorApplicationsData, isLoading: isApplicationsLoading } = useCreatorApplications(
    { enabled: needsFetch && open }
  );

  // Find the creator's invitation for this specific gig
  const creatorInvitations = ( creatorInvitationsData?.data || [] ) as ModelsGigInvitationResponse[];
  const gigInvitation = creatorInvitations.find( ( inv ) => inv.gig_id === gig?.id );

  // Derive effective invitation state — props take priority (invitations view already has the data)
  const effectiveInvitationId = invitationId ?? gigInvitation?.id;
  const effectiveInvitationStatus = invitationStatus ?? gigInvitation?.status;

  // Application state for this gig
  const gigApplication = creatorApplicationsData?.data?.find( ( a ) => a.gig_id === gig?.id );
  const hasAcceptedApplication = gigApplication?.status === 'accepted';
  const hasAppliedPending = !effectiveInvitationId && gigApplication?.status === 'pending';

  // Creator is participating after accepted invitation or accepted application
  const isParticipating = hasAcceptedApplication || effectiveInvitationStatus === 'accepted';

  // Wait for all creator-specific queries before showing action buttons to avoid flashing
  const isFooterLoading = isCreator && ( isSubmissionsLoading || ( needsFetch && ( isInvitationLoading || isApplicationsLoading ) ) );

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
  const shouldShowAddSubmissionButton = React.useMemo(
    () => (
      isCreator
      && gig?.enforce_single_creator_submission === true
      && typeof gig?.number_of_videos === 'number'
      && submissions.length !== gig.number_of_videos
    ),
    [ isCreator, gig?.enforce_single_creator_submission, gig?.number_of_videos, submissions.length ]
  );
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
      onSuccess: () => { toast.success( creatorCommonT( 'toasts.appliedSuccess' ) ); onOpenChange( false ); },
      onError: ( error ) => {
        toast.error( creatorCommonT( 'toasts.appliedError' ), {
          richColors: true,
          description: <SentenceCase>{ error?.response?.data?.error?.message ?? creatorCommonT( 'toasts.appliedError' ) }</SentenceCase>,
          dismissible: true,
        } );
      },
    } );
  }, [ gig, applyToGig, onOpenChange, creatorCommonT ] );

  const handleRespond = React.useCallback( ( status: 'accepted' | 'declined' ) => {
    if ( !effectiveInvitationId ) return;
    respondToInvitation( { invitationId: effectiveInvitationId, response: { status } }, {
      onSuccess: () => {
        toast.success( status === 'accepted' ? creatorInvitationToastsT( 'accepted' ) : creatorInvitationToastsT( 'declined' ) );
        onOpenChange( false );
      },
      onError: () => { toast.error( creatorInvitationToastsT( 'error' ) ); },
    } );
  }, [ effectiveInvitationId, respondToInvitation, onOpenChange, creatorInvitationToastsT ] );

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
              <TabsTab value="details" className="text-xs font-normal">{ t( 'details' ) }</TabsTab>
              { campaign && <TabsTab value="campaign" className="text-xs font-normal">{ campaignT( 'title' ) }</TabsTab> }
              <TabsTab value="submissions" className="text-xs font-normal">
                <RoleGuard allowedRoles={ [ 'creator' ] }>My Submissions</RoleGuard>
                <RoleGuard excludedRoles={ [ 'creator' ] }>{ campaignActionsT( 'submissions' ) }</RoleGuard>
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
                showAddSubmissionButton={ shouldShowAddSubmissionButton }
                onOpenSubmission={ () => setSubmissionSheetOpen( true ) }
              />
            </div>
          </AnimTabs>

          <GigFooter
            gig={ gig }
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
            onSelectTab={ setActiveTab }
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
          onSuccess={ () => setActiveTab( 'submissions' ) }
        />
      ) }
    </>
  );
}
