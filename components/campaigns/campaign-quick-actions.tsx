'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  FileSearch,
  FilePen,
  Plus,
  ThumbsUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { Input } from '@/components/dashboard-ui/input';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { RoleGuard } from '@/components/auth/role-guard';
import { useCampaignDecision } from '@/lib/api/hooks/campaigns';
import { SuperField } from '../dashboard-ui/super-field';
import { useTranslations } from 'next-intl';

// ── Types ─────────────────────────────────────────────────────────────────────

export type AdminDecision = 'approve' | 'reject' | 'complete';
type ActionVariant = 'primary' | 'outline' | 'destructive';

export interface ActionItem {
  key: string;
  label: string;
  icon?: LucideIcon;
  variant?: ActionVariant;
  href?: string;
  onClick?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

// ── Dialog config ─────────────────────────────────────────────────────────────

const DECISION_CONFIG: Record<AdminDecision, {
  title: string;
  description: string;
  confirmLabel: string;
  loadingText: string;
  commentPlaceholder: string;
  variant: 'default' | 'destructive';
}> = {
  approve: {
    title: 'Approve',
    description: 'This will mark the campaign as approved and make it active for creators.',
    confirmLabel: 'Approve',
    loadingText: 'Approving...',
    commentPlaceholder: 'e.g. Looks great, approved for launch',
    variant: 'default',
  },
  complete: {
    title: 'Complete',
    description: 'This will mark the campaign as completed and close it to new submissions.',
    confirmLabel: 'Complete',
    loadingText: 'Completing...',
    commentPlaceholder: 'e.g. Campaign concluded',
    variant: 'default',
  },
  reject: {
    title: 'Reject',
    description: 'This will return the campaign to the brand for revision.',
    confirmLabel: 'Reject',
    loadingText: 'Rejecting...',
    commentPlaceholder: 'e.g. Please revise the brief',
    variant: 'destructive',
  },
};

// ── State machine ─────────────────────────────────────────────────────────────

type AdminPhase =
  | 'created'
  | 'returned'
  | 'pending_approval'
  | 'gigs_approved'
  | 'running:review'
  | 'running:awaiting_confirmation'
  | 'running:awaiting_submissions'
  | 'completed';

type BrandPhase =
  | 'created'
  | 'returned'
  | 'pending_approval'
  | 'gigs_approved'
  | 'running:review'
  | 'running:invite_more'
  | 'running:awaiting_submissions'
  | 'running:invite'
  | 'completed';

function resolveAdminPhase(
  status: string,
  pendingSubmissions: number,
  approvedSubmissions: number,
  openGigs: number,
): AdminPhase {
  switch ( status ) {
    case 'created': return 'created';
    case 'returned': return 'returned';
    case 'pending_approval': return 'pending_approval';
    case 'gigs_approved': return 'gigs_approved';
    case 'completed': return 'completed';
    case 'running':
      if ( pendingSubmissions > 0 ) return 'running:review';
      if ( approvedSubmissions > 0 ) return 'running:awaiting_confirmation';
      if ( openGigs > 0 ) return 'running:awaiting_submissions';
      return 'completed';
    default: return 'created';
  }
}

function resolveBrandPhase(
  status: string,
  pendingSubmissions: number,
  approvedSubmissions: number,
  totalSubmissions: number,
  acceptedSubmissions: number,
  openGigs: number,
  inProgressGigs: number,
): BrandPhase {
  switch ( status ) {
    case 'created': return 'created';
    case 'returned': return 'returned';
    case 'pending_approval': return 'pending_approval';
    case 'gigs_approved': return 'gigs_approved';
    case 'completed': return 'completed';
    case 'running':
      if ( pendingSubmissions > 0 || approvedSubmissions > 0 ) return 'running:review';
      if ( openGigs > 0 && totalSubmissions > 0 && acceptedSubmissions === totalSubmissions ) return 'running:invite_more';
      if ( inProgressGigs > 0 ) return 'running:awaiting_submissions';
      if ( totalSubmissions === 0 ) return 'running:invite';
      return 'completed';
    default: return 'created';
  }
}

// ── Action builders ───────────────────────────────────────────────────────────

export function buildAdminActions(
  t: ( key: string ) => string,
  status: string,
  basePath: string,
  campaignId: string,
  gigsValidated: boolean,
  pendingSubmissionCount: number,
  approvedSubmissionCount: number,
  openGigCount: number,
  openDialog: ( d: AdminDecision ) => void,
  onNavigateToTab: ( tab: string ) => void,
): ActionItem[] {
  const phase = resolveAdminPhase( status, pendingSubmissionCount, approvedSubmissionCount, openGigCount );
  const gigHref = `${ basePath }/campaigns/${ campaignId }/gigs/new`;

  const phaseActions: Record<AdminPhase, ActionItem | null> = {
    'created': { key: 'create-gig', label: 'Create Gig', icon: Plus, variant: 'primary', href: gigHref },
    'returned': { key: 'awaiting-update', label: 'Awaiting brand update...', variant: 'outline', href: gigHref, disabled: true },
    'pending_approval': gigsValidated
      ? { key: 'approve', label: 'Approve', icon: CheckCircle, variant: 'primary', onClick: () => openDialog( 'approve' ) }
      : { key: 'create-gig', label: 'Create Gig', icon: Plus, variant: 'primary', href: gigHref },
    'gigs_approved': { key: 'awaiting-brand', label: 'Awaiting brand decision', icon: Clock, variant: 'outline', disabled: true },
    'running:review': { key: 'review-submissions', label: 'Review Submissions', icon: FileSearch, variant: 'primary', onClick: () => onNavigateToTab( 'submissions' ) },
    'running:awaiting_confirmation': { key: 'awaiting-confirmation', label: 'Waiting for Submission Acceptance', icon: Clock, variant: 'outline', disabled: true },
    'running:awaiting_submissions': { key: 'awaiting-submissions', label: 'Awaiting Submissions', icon: Clock, variant: 'outline', disabled: true },
    'completed': null,
  };

  const action = phaseActions[ phase ];
  return action ? [ action ] : [];
}

export function buildBrandActions(
  t: ( key: string ) => string,
  status: string,
  basePath: string,
  campaignId: string,
  submissionCount: number,
  pendingSubmissionCount: number,
  approvedSubmissionCount: number,
  acceptedSubmissionCount: number,
  openGigCount: number,
  inProgressGigCount: number,
  openAccept: () => void,
  openInviteCreators: () => void,
  onNavigateToTab: ( tab: string ) => void,
): ActionItem[] {
  const phase = resolveBrandPhase( status, pendingSubmissionCount, approvedSubmissionCount, submissionCount, acceptedSubmissionCount, openGigCount, inProgressGigCount );
  const editHref = `${ basePath }/campaigns/${ campaignId }/edit`;

  const phaseActions: Record<BrandPhase, ActionItem | null> = {
    'created': { key: 'edit', label: 'Edit', icon: FilePen, variant: 'primary', href: editHref },
    'returned': { key: 'edit', label: 'Edit', icon: FilePen, variant: 'primary', href: editHref },
    'pending_approval': { key: '', label: 'Awaiting approval', variant: 'outline', disabled: true },
    'gigs_approved': { key: 'accept', label: t( 'acceptCampaign' ), icon: ThumbsUp, variant: 'primary', onClick: openAccept },
    'running:review': { key: 'review-submissions', label: 'Review Submissions', icon: FileSearch, variant: 'primary', onClick: () => onNavigateToTab( 'submissions' ) },
    'running:invite_more': { key: 'invite-more', label: 'Invite More Creators', icon: Users, variant: 'primary', onClick: openInviteCreators },
    'running:awaiting_submissions': { key: 'awaiting-submissions', label: 'Awaiting Submissions', icon: Clock, variant: 'outline', disabled: true },
    'running:invite': { key: 'invite-creators', label: t( 'inviteCreators' ), icon: Users, variant: 'primary', onClick: openInviteCreators },
    'completed': null,
  };

  const action = phaseActions[ phase ];
  return action ? [ action ] : [];
}

// ── Campaign Action Dialogs ────────────────────────────────────────────────────

interface CampaignActionDialogsProps {
  campaignId: string;
  // Admin
  adminDecision: AdminDecision;
  approveDialogOpen: boolean;
  onApproveDialogChange: ( open: boolean ) => void;
  adminComment: string;
  onAdminCommentChange: ( value: string ) => void;
  onAdminConfirm: () => void;
  isAdminLoading: boolean;
  // Brand
  acceptDialogOpen: boolean;
  onAcceptDialogChange: ( open: boolean ) => void;
  rejectDialogOpen: boolean;
  onRejectDialogChange: ( open: boolean ) => void;
}

export function CampaignActionDialogs( {
  campaignId,
  adminDecision,
  approveDialogOpen,
  onApproveDialogChange,
  adminComment,
  onAdminCommentChange,
  onAdminConfirm,
  isAdminLoading,
  acceptDialogOpen,
  onAcceptDialogChange,
  rejectDialogOpen,
  onRejectDialogChange,
}: CampaignActionDialogsProps ) {
  const actionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const pageT = useTranslations( 'dashboard.brand.campaignsPage' );
  const t = ( key: string, values?: Record<string, any> ) => (
    actionsT.has( key ) ? actionsT( key, values ) : pageT.has( key ) ? pageT( key, values ) : key
  );
  const config = DECISION_CONFIG[ adminDecision ];
  const { mutate: submitDecision, isPending: isDecisionPending } = useCampaignDecision();
  const [ brandComment, setBrandComment ] = useState( '' );

  const handleBrandDecision = ( accepted: boolean, onClose: ( open: boolean ) => void ) => {
    submitDecision(
      { id: campaignId, decision: { brand_accepted: accepted, brand_decision_comments: brandComment } },
      {
        onSuccess: () => {
          toast.success( accepted ? t( 'campaignAccepted' ) : t( 'campaignRejected' ) );
          onClose( false );
          setBrandComment( '' );
        },
        onError: () => toast.error( accepted ? t( 'acceptCampaignFailed' ) : t( 'rejectCampaignFailed' ) ),
      },
    );
  };

  const brandCommentField = (
    <div className="flex flex-col gap-2 py-2">
      <label htmlFor="brand-comment" className="text-sm font-medium">{ t( 'commentsOptional' ) }</label>
      <SuperField
        type='textarea'
        id="brand-comment"
        value={ brandComment }
        onChange={ ( e: React.ChangeEvent<HTMLTextAreaElement> ) => setBrandComment( e.target.value ) }
        placeholder={ t( 'commentPlaceholder' ) }
        className="resize-none min-h-[80px]"
      />
    </div>
  );

  return (
    <>
      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <ConfirmDialog
          open={ approveDialogOpen }
          onOpenChange={ ( open ) => { onApproveDialogChange( open ); if ( !open ) onAdminCommentChange( '' ); } }
          title={ config.title }
          description={ config.description }
          confirmLabel={ config.confirmLabel }
          loadingText={ config.loadingText }
          variant={ config.variant }
          onConfirm={ onAdminConfirm }
          isLoading={ isAdminLoading }
        >
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="admin-comment" className="text-sm font-medium">{ t( 'adminCommentsOptional' ) }</label>
            <Input
              id="admin-comment"
              value={ adminComment }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => onAdminCommentChange( e.target.value ) }
              placeholder={ config.commentPlaceholder }
            />
          </div>
        </ConfirmDialog>
      </RoleGuard>

      <RoleGuard allowedRoles={ [ 'brand' ] }>
        <ConfirmDialog
          open={ acceptDialogOpen }
          onOpenChange={ ( open ) => { onAcceptDialogChange( open ); if ( !open ) setBrandComment( '' ); } }
          title={ t( 'acceptCampaignTitle' ) }
          description={ t( 'acceptCampaignDescription' ) }
          confirmLabel={ t( 'accept' ) }
          loadingText={ t( 'accepting' ) }
          variant="default"
          onConfirm={ () => handleBrandDecision( true, onAcceptDialogChange ) }
          isLoading={ isDecisionPending }
        >
          { brandCommentField }
        </ConfirmDialog>

        <ConfirmDialog
          open={ rejectDialogOpen }
          onOpenChange={ ( open ) => { onRejectDialogChange( open ); if ( !open ) setBrandComment( '' ); } }
          title={ t( 'rejectCampaignTitle' ) }
          description={ t( 'rejectCampaignDescription' ) }
          confirmLabel={ t( 'reject' ) }
          loadingText={ t( 'rejecting' ) }
          variant="destructive"
          onConfirm={ () => handleBrandDecision( false, onRejectDialogChange ) }
          isLoading={ isDecisionPending }
        >
          { brandCommentField }
        </ConfirmDialog>
      </RoleGuard>
    </>
  );
}
