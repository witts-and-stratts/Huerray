"use client";

import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { Button } from '@/components/dashboard-ui/button';
import {
  ModelsBrandVideoDecisionRequestStatusEnum,
  ModelsVideoSubmissionResponse,
  UtilsVideoSubmissionStatus,
} from '@/lib/api/generated/models';
import {
  useUpdateVideoSubmission,
  useUpdateVideoSubmissionStatus,
  useVideoSubmissionDecision,
  useSubmitVideoSubmission,
  useDeleteVideoSubmission,
} from '@/lib/api/hooks/video-submissions';
import { Check, ExternalLink, MoreVertical, Pencil, Trash2, Undo2, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { SubmissionViewDialog } from './submission-view-dialog';
import { SubmissionDecisionDialog } from './submission-decision-dialog';
import { SubmissionUpdateDialog } from './submission-update-dialog';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';
import { useTranslations } from 'next-intl';

interface SubmissionActionMenuProps {
  submission: ModelsVideoSubmissionResponse;
  trigger?: ReactNode;
  showViewAction?: boolean;
}

export function SubmissionActionMenu( { submission, trigger, showViewAction = true }: SubmissionActionMenuProps ) {
  const t = useTranslations( 'dashboard.brand.submissionsPage.actions' );
  const campaignActionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const updateSubmission = useUpdateVideoSubmission();
  const updateSubmissionStatus = useUpdateVideoSubmissionStatus();
  const submissionDecision = useVideoSubmissionDecision();
  const submitVideoSubmission = useSubmitVideoSubmission();
  const deleteSubmission = useDeleteVideoSubmission();

  const [ isAcceptOpen, setIsAcceptOpen ] = useState( false );
  const [ isRejectOpen, setIsRejectOpen ] = useState( false );
  const [ isDeleteOpen, setIsDeleteOpen ] = useState( false );
  const [ isViewOpen, setIsViewOpen ] = useState( false );
  const [ isUpdateSubmissionOpen, setIsUpdateSubmissionOpen ] = useState( false );
  const [ isAdminApproveOpen, setIsAdminApproveOpen ] = useState( false );
  const [ isAdminRejectOpen, setIsAdminRejectOpen ] = useState( false );
  const [ isAdminReturnOpen, setIsAdminReturnOpen ] = useState( false );

  const [ acceptComment, setAcceptComment ] = useState( '' );
  const [ rejectComment, setRejectComment ] = useState( '' );
  const [ adminApproveComment, setAdminApproveComment ] = useState( '' );
  const [ adminRejectComment, setAdminRejectComment ] = useState( '' );
  const [ adminReturnComment, setAdminReturnComment ] = useState( '' );
  const [ isConfirmOpen, setIsConfirmOpen ] = useState( false );
  const [ title, setTitle ] = useState( submission.title || '' );
  const [ description, setDescription ] = useState( submission.description || '' );
  const [ videoFile, setVideoFile ] = useState<File | null>( null );
  const [ uploadedVideoData, setUploadedVideoData ] = useState<{ url: string; filename: string; thumbnail?: string; } | null>( null );
  const [ updateSubmissionError, setUpdateSubmissionError ] = useState<string | null>( null );

  const syncSubmissionFormState = () => {
    setTitle( submission.title || '' );
    setDescription( submission.description || '' );
    setVideoFile( null );
    setUploadedVideoData( null );
    setUpdateSubmissionError( null );
  };

  const handleViewSubmission = () => {
    if ( !submission.video?.asset ) {
      toast.error( t( 'noVideoAvailable' ) );
      return;
    }
    setIsViewOpen( true );
  };

  const handleConfirmSubmission = () => {
    if ( !submission.id ) return;
    setIsConfirmOpen( true );
  };

  const handleConfirmSubmissionSubmit = async () => {
    if ( !submission.id ) return;
    await toast.promise(
      submitVideoSubmission.mutateAsync( { id: submission.id } ),
      {
        loading: t( 'submittingForApproval' ),
        success: t( 'submissionSentForApproval' ),
        error: t( 'submitForApprovalFailed' ),
      }
    );
    setIsConfirmOpen( false );
  };

  const isApprovedSubmission = ( submission.status || '' ).toLowerCase() === UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved;

  const handleDecision = async ( decision: ModelsBrandVideoDecisionRequestStatusEnum, comment?: string ) => {
    if ( !submission.id ) return;
    await toast.promise(
      submissionDecision.mutateAsync( {
        id: submission.id,
        data: {
          status: decision,
          comments: comment?.trim() || undefined,
        },
      } ),
      {
        loading: decision === ModelsBrandVideoDecisionRequestStatusEnum.Accepted ? t( 'acceptingSubmission' ) : t( 'rejectingSubmission' ),
        success: decision === ModelsBrandVideoDecisionRequestStatusEnum.Accepted ? t( 'submissionAccepted' ) : t( 'submissionRejected' ),
        error: t( 'updateDecisionFailed' ),
      }
    );
  };

  const handleUpdateSubmission = async () => {
    if ( !submission.id ) return;
    if ( isApprovedSubmission ) {
      setUpdateSubmissionError( t( 'approvedCannotBeUpdated' ) );
      return false;
    }

    if ( !uploadedVideoData?.url ) {
      setUpdateSubmissionError( t( 'uploadVideoBeforeUpdating' ) );
      return false;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL( uploadedVideoData.url );
    } catch {
      setUpdateSubmissionError( t( 'uploadedUrlInvalid' ) );
      return false;
    }

    if ( ![ 'http:', 'https:' ].includes( parsedUrl.protocol ) ) {
      setUpdateSubmissionError( t( 'uploadedUrlMustBeHttp' ) );
      return false;
    }

    setUpdateSubmissionError( null );

    await toast.promise(
      updateSubmission.mutateAsync( {
        id: submission.id,
        submission: {
          title: title.trim() || undefined,
          description: description.trim() || undefined,
          video: { asset: uploadedVideoData.url, thumbnail: uploadedVideoData.thumbnail },
          video_filename: uploadedVideoData?.filename || submission.video_filename,
        },
      } ),
      {
        loading: t( 'updatingSubmission' ),
        success: t( 'submissionUpdated' ),
        error: t( 'updateSubmissionFailed' ),
      }
    );

    return true;
  };

  const actions: MenuAction<ModelsVideoSubmissionResponse>[] = [
    ...( showViewAction ? [ {
      label: t( 'viewSubmission' ),
      icon: ExternalLink,
      condition: ( current: ModelsVideoSubmissionResponse ) => !!current.video?.asset,
      action: () => handleViewSubmission(),
    } ] : [] ),
    {
      label: t( 'acceptSubmission' ),
      icon: Check,
      allowedRoles: [ 'brand' ],
      condition: ( current ) => !!current.id,
      action: () => setIsAcceptOpen( true ),
    },
    {
      label: t( 'rejectSubmission' ),
      icon: X,
      allowedRoles: [ 'brand' ],
      condition: ( current ) => !!current.id,
      action: () => setIsRejectOpen( true ),
    },
    {
      label: t( 'updateSubmission' ),
      icon: Pencil,
      allowedRoles: [ 'creator' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved,
      action: () => {
        syncSubmissionFormState();
        setIsUpdateSubmissionOpen( true );
      },
    },
    {
      label: campaignActionsT( 'approve' ),
      icon: Check,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && current.status !== UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved && current.status !== UtilsVideoSubmissionStatus.VideoSubmissionStatusCreated,
      action: () => setIsAdminApproveOpen( true ),
    },
    {
      label: campaignActionsT( 'reject' ),
      icon: X,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusRejected,
      action: () => setIsAdminRejectOpen( true ),
    },
    {
      label: t( 'return' ),
      icon: Undo2,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusReturned,
      action: () => setIsAdminReturnOpen( true ),
    },
    {
      label: t( 'confirmSubmission' ),
      icon: Check,
      allowedRoles: [ 'creator' ],
      condition: ( current ) => !!current.id && ( current.status === UtilsVideoSubmissionStatus.VideoStatusCreated ),
      action: () => handleConfirmSubmission(),
    },
    {
      label: t( 'copySubmissionId' ),
      separator: true,
      condition: ( current ) => !!current.id,
      action: async ( current ) => {
        if ( current.id ) {
          await navigator.clipboard.writeText( current.id );
          toast.success( t( 'submissionIdCopied' ) );
        }
      },
    },
    {
      label: t( 'copyCreatorId' ),
      condition: ( current ) => !!current.creator_id,
      action: async ( current ) => {
        if ( current.creator_id ) {
          await navigator.clipboard.writeText( current.creator_id );
          toast.success( t( 'creatorIdCopied' ) );
        }
      },
    },
    {
      label: t( 'deleteSubmission' ),
      icon: Trash2,
      separator: true,
      variant: 'destructive',
      allowedRoles: [ 'admin', 'creator' ],
      condition: ( current ) => !!current.id,
      action: () => setIsDeleteOpen( true ),
    },
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ submission }
        label=""
        trigger={
          trigger || (
            <Button variant="ghost" size="icon-sm" className="shrink-0 -mb-1 hover:bg-background/70">
              <MoreVertical className="size-4" />
              <span className="sr-only">{ t( 'openMenu' ) }</span>
            </Button>
          )
        }
      />

      <SubmissionDecisionDialog
        open={ isAcceptOpen }
        onOpenChange={ setIsAcceptOpen }
        title={ t( 'acceptSubmissionTitle' ) }
        description={ t( 'acceptSubmissionDescription' ) }
        confirmLabel={ campaignActionsT( 'accept' ) }
        comment={ acceptComment }
        onCommentChange={ setAcceptComment }
        onConfirm={ async () => {
          await handleDecision( ModelsBrandVideoDecisionRequestStatusEnum.Accepted, acceptComment );
          setIsAcceptOpen( false );
          setAcceptComment( '' );
        } }
        isLoading={ submissionDecision.isPending }
        loadingText={ campaignActionsT( 'accepting' ) }
        fieldId="submission-accept-comment"
        fieldLabel={ t( 'commentOptional' ) }
        fieldPlaceholder={ t( 'addNoteForDecision' ) }
      />

      <SubmissionDecisionDialog
        open={ isRejectOpen }
        onOpenChange={ setIsRejectOpen }
        title={ t( 'rejectSubmissionTitle' ) }
        description={ t( 'rejectSubmissionDescription' ) }
        confirmLabel={ campaignActionsT( 'reject' ) }
        variant="destructive"
        comment={ rejectComment }
        onCommentChange={ setRejectComment }
        onConfirm={ async () => {
          await handleDecision( ModelsBrandVideoDecisionRequestStatusEnum.Rejected, rejectComment );
          setIsRejectOpen( false );
          setRejectComment( '' );
        } }
        isLoading={ submissionDecision.isPending }
        loadingText={ campaignActionsT( 'rejecting' ) }
        fieldId="submission-reject-comment"
        fieldLabel={ t( 'reasonOptional' ) }
        fieldPlaceholder={ t( 'addRejectionReason' ) }
      />

      <SubmissionViewDialog
        open={ isViewOpen }
        onOpenChange={ setIsViewOpen }
        submission={ submission }
      />

      <SubmissionUpdateDialog
        open={ isUpdateSubmissionOpen }
        onOpenChange={ setIsUpdateSubmissionOpen }
        title={ title }
        description={ description }
        videoFile={ videoFile }
        updateSubmissionError={ updateSubmissionError }
        onTitleChange={ setTitle }
        onDescriptionChange={ setDescription }
        onVideoChange={ ( file ) => {
          setVideoFile( file );
          setUpdateSubmissionError( null );
          if ( !file ) {
            setUploadedVideoData( null );
          }
        } }
        onUploadSuccess={ ( data ) => {
          setUploadedVideoData( { url: data.video_url, filename: data.filename, thumbnail: data.thumbnail_url } );
          setUpdateSubmissionError( null );
        } }
        onConfirm={ async () => {
          const updated = await handleUpdateSubmission();
          if ( updated ) {
            setIsUpdateSubmissionOpen( false );
          }
        } }
        isLoading={ updateSubmission.isPending }
      />

      <SubmissionDecisionDialog
        open={ isAdminApproveOpen }
        onOpenChange={ setIsAdminApproveOpen }
        title={ t( 'approveSubmissionTitle' ) }
        description={ t( 'approveSubmissionDescription' ) }
        confirmLabel={ campaignActionsT( 'approve' ) }
        comment={ adminApproveComment }
        onCommentChange={ setAdminApproveComment }
        onConfirm={ async () => {
          await toast.promise(
            updateSubmissionStatus.mutateAsync( {
              id: submission.id!,
              request: {
                status: UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved,
                comments: adminApproveComment.trim() || undefined,
              },
            } ),
            {
              loading: t( 'approvingSubmission' ),
              success: t( 'submissionApproved' ),
              error: t( 'approveSubmissionFailed' ),
            }
          );
          setIsAdminApproveOpen( false );
          setAdminApproveComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText={ campaignActionsT( 'approving' ) }
        fieldId="admin-approve-comment"
        fieldLabel={ t( 'commentOptional' ) }
        fieldPlaceholder={ t( 'addNote' ) }
      />

      <SubmissionDecisionDialog
        open={ isAdminRejectOpen }
        onOpenChange={ setIsAdminRejectOpen }
        title={ t( 'rejectSubmissionTitle' ) }
        description={ t( 'rejectSubmissionShort' ) }
        confirmLabel={ campaignActionsT( 'reject' ) }
        variant="destructive"
        comment={ adminRejectComment }
        onCommentChange={ setAdminRejectComment }
        onConfirm={ async () => {
          await toast.promise(
            updateSubmissionStatus.mutateAsync( {
              id: submission.id!,
              request: {
                status: UtilsVideoSubmissionStatus.VideoSubmissionStatusRejected,
                comments: adminRejectComment.trim() || undefined,
              },
            } ),
            {
              loading: t( 'rejectingSubmission' ),
              success: t( 'submissionRejected' ),
              error: t( 'rejectSubmissionFailed' ),
            }
          );
          setIsAdminRejectOpen( false );
          setAdminRejectComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText={ campaignActionsT( 'rejecting' ) }
        fieldId="admin-reject-comment"
        fieldLabel={ t( 'reasonOptional' ) }
        fieldPlaceholder={ t( 'addRejectionReason' ) }
      />

      <SubmissionDecisionDialog
        open={ isAdminReturnOpen }
        onOpenChange={ setIsAdminReturnOpen }
        title={ t( 'returnSubmissionTitle' ) }
        description={ t( 'returnSubmissionDescription' ) }
        confirmLabel={ t( 'return' ) }
        comment={ adminReturnComment }
        onCommentChange={ setAdminReturnComment }
        onConfirm={ async () => {
          await toast.promise(
            updateSubmissionStatus.mutateAsync( {
              id: submission.id!,
              request: {
                status: UtilsVideoSubmissionStatus.VideoSubmissionStatusReturned,
                comments: adminReturnComment.trim() || undefined,
              },
            } ),
            {
              loading: t( 'returningSubmission' ),
              success: t( 'submissionReturned' ),
              error: t( 'returnSubmissionFailed' ),
            }
          );
          setIsAdminReturnOpen( false );
          setAdminReturnComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText={ t( 'returning' ) }
        fieldId="admin-return-comment"
        fieldLabel={ t( 'commentOptional' ) }
        fieldPlaceholder={ t( 'addNoteForCreator' ) }
      />


      <ConfirmDialog
        open={ isConfirmOpen }
        onOpenChange={ setIsConfirmOpen }
        title={ t( 'confirmSubmissionTitle' ) }
        description={ t( 'confirmSubmissionDescription' ) }
        confirmLabel={ t( 'submitForApproval' ) }
        onConfirm={ handleConfirmSubmissionSubmit }
        isLoading={ submitVideoSubmission.isPending }
        loadingText={ t( 'submitting' ) }
      />

      <ConfirmDialog
        open={ isDeleteOpen }
        onOpenChange={ setIsDeleteOpen }
        title={ t( 'deleteSubmissionTitle' ) }
        description={ t( 'deleteSubmissionDescription' ) }
        confirmLabel={ t( 'delete' ) }
        variant="destructive"
        onConfirm={ async () => {
          if ( !submission.id ) return;
          await toast.promise(
            deleteSubmission.mutateAsync( { id: submission.id } ),
            {
              loading: t( 'deletingSubmission' ),
              success: t( 'submissionDeleted' ),
              error: t( 'deleteSubmissionFailed' ),
            }
          );
          setIsDeleteOpen( false );
        } }
        isLoading={ deleteSubmission.isPending }
        loadingText={ t( 'deleting' ) }
      />
    </>
  );
}
