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
import { useState } from 'react';
import { toast } from 'sonner';
import { SubmissionViewDialog } from './submission-view-dialog';
import { SubmissionDecisionDialog } from './submission-decision-dialog';
import { SubmissionUpdateDialog } from './submission-update-dialog';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';

interface SubmissionActionMenuProps {
  submission: ModelsVideoSubmissionResponse;
}

export function SubmissionActionMenu( { submission }: SubmissionActionMenuProps ) {
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
      toast.error( 'No video available for this submission' );
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
        loading: 'Submitting for approval...',
        success: 'Submission sent for approval',
        error: 'Failed to submit for approval',
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
        loading: `${ decision === ModelsBrandVideoDecisionRequestStatusEnum.Accepted ? 'Accepting' : 'Rejecting' } submission...`,
        success: `Submission ${ decision === ModelsBrandVideoDecisionRequestStatusEnum.Accepted ? 'accepted' : 'rejected' }`,
        error: 'Failed to update submission decision',
      }
    );
  };

  const handleUpdateSubmission = async () => {
    if ( !submission.id ) return;
    if ( isApprovedSubmission ) {
      setUpdateSubmissionError( 'Approved submissions cannot be updated.' );
      return false;
    }

    if ( !uploadedVideoData?.url ) {
      setUpdateSubmissionError( 'Please upload a video file before updating submission.' );
      return false;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL( uploadedVideoData.url );
    } catch {
      setUpdateSubmissionError( 'Uploaded video URL is invalid. Please upload again.' );
      return false;
    }

    if ( ![ 'http:', 'https:' ].includes( parsedUrl.protocol ) ) {
      setUpdateSubmissionError( 'Uploaded video URL must be a valid HTTP(S) URL.' );
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
        loading: 'Updating submission...',
        success: 'Submission updated',
        error: 'Failed to update submission',
      }
    );

    return true;
  };

  const actions: MenuAction<ModelsVideoSubmissionResponse>[] = [
    {
      label: 'View Submission',
      icon: ExternalLink,
      condition: ( current ) => !!current.video?.asset,
      action: () => handleViewSubmission(),
    },
    {
      label: 'Accept Submission',
      icon: Check,
      allowedRoles: [ 'brand' ],
      condition: ( current ) => !!current.id,
      action: () => setIsAcceptOpen( true ),
    },
    {
      label: 'Reject Submission',
      icon: X,
      allowedRoles: [ 'brand' ],
      condition: ( current ) => !!current.id,
      action: () => setIsRejectOpen( true ),
    },
    {
      label: 'Update Submission',
      icon: Pencil,
      allowedRoles: [ 'creator' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved,
      action: () => {
        syncSubmissionFormState();
        setIsUpdateSubmissionOpen( true );
      },
    },
    {
      label: 'Approve',
      icon: Check,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved,
      action: () => setIsAdminApproveOpen( true ),
    },
    {
      label: 'Reject',
      icon: X,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusRejected,
      action: () => setIsAdminRejectOpen( true ),
    },
    {
      label: 'Return',
      icon: Undo2,
      allowedRoles: [ 'admin' ],
      condition: ( current ) => !!current.id && ( current.status || '' ).toLowerCase() !== UtilsVideoSubmissionStatus.VideoSubmissionStatusReturned,
      action: () => setIsAdminReturnOpen( true ),
    },
    {
      label: 'Confirm Submission',
      icon: Check,
      allowedRoles: [ 'creator' ],
      condition: ( current ) => !!current.id && ( current.status === UtilsVideoSubmissionStatus.VideoStatusCreated ),
      action: () => handleConfirmSubmission(),
    },
    {
      label: 'Copy Submission ID',
      separator: true,
      condition: ( current ) => !!current.id,
      action: async ( current ) => {
        if ( current.id ) {
          await navigator.clipboard.writeText( current.id );
          toast.success( 'Submission ID copied' );
        }
      },
    },
    {
      label: 'Copy Creator ID',
      condition: ( current ) => !!current.creator_id,
      action: async ( current ) => {
        if ( current.creator_id ) {
          await navigator.clipboard.writeText( current.creator_id );
          toast.success( 'Creator ID copied' );
        }
      },
    },
    {
      label: 'Delete Submission',
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
          <Button variant="ghost" size="icon-sm" className="shrink-0 -mb-1 hover:bg-background/70">
            <MoreVertical className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />

      <SubmissionDecisionDialog
        open={ isAcceptOpen }
        onOpenChange={ setIsAcceptOpen }
        title="Accept Submission"
        description="Accept this submission as a brand decision?"
        confirmLabel="Accept"
        comment={ acceptComment }
        onCommentChange={ setAcceptComment }
        onConfirm={ async () => {
          await handleDecision( ModelsBrandVideoDecisionRequestStatusEnum.Accepted, acceptComment );
          setIsAcceptOpen( false );
          setAcceptComment( '' );
        } }
        isLoading={ submissionDecision.isPending }
        loadingText="Accepting..."
        fieldId="submission-accept-comment"
        fieldLabel="Comment (Optional)"
        fieldPlaceholder="Add a note for this decision"
      />

      <SubmissionDecisionDialog
        open={ isRejectOpen }
        onOpenChange={ setIsRejectOpen }
        title="Reject Submission"
        description="Reject this submission as a brand decision?"
        confirmLabel="Reject"
        variant="destructive"
        comment={ rejectComment }
        onCommentChange={ setRejectComment }
        onConfirm={ async () => {
          await handleDecision( ModelsBrandVideoDecisionRequestStatusEnum.Rejected, rejectComment );
          setIsRejectOpen( false );
          setRejectComment( '' );
        } }
        isLoading={ submissionDecision.isPending }
        loadingText="Rejecting..."
        fieldId="submission-reject-comment"
        fieldLabel="Reason (Optional)"
        fieldPlaceholder="Add rejection reason"
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
        title="Approve Submission"
        description="Approve this submission?"
        confirmLabel="Approve"
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
              loading: 'Approving submission...',
              success: 'Submission approved',
              error: 'Failed to approve submission',
            }
          );
          setIsAdminApproveOpen( false );
          setAdminApproveComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText="Approving..."
        fieldId="admin-approve-comment"
        fieldLabel="Comment (Optional)"
        fieldPlaceholder="Add a note"
      />

      <SubmissionDecisionDialog
        open={ isAdminRejectOpen }
        onOpenChange={ setIsAdminRejectOpen }
        title="Reject Submission"
        description="Reject this submission?"
        confirmLabel="Reject"
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
              loading: 'Rejecting submission...',
              success: 'Submission rejected',
              error: 'Failed to reject submission',
            }
          );
          setIsAdminRejectOpen( false );
          setAdminRejectComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText="Rejecting..."
        fieldId="admin-reject-comment"
        fieldLabel="Reason (Optional)"
        fieldPlaceholder="Add rejection reason"
      />

      <SubmissionDecisionDialog
        open={ isAdminReturnOpen }
        onOpenChange={ setIsAdminReturnOpen }
        title="Return Submission"
        description="Return this submission to the creator for revision?"
        confirmLabel="Return"
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
              loading: 'Returning submission...',
              success: 'Submission returned',
              error: 'Failed to return submission',
            }
          );
          setIsAdminReturnOpen( false );
          setAdminReturnComment( '' );
        } }
        isLoading={ updateSubmissionStatus.isPending }
        loadingText="Returning..."
        fieldId="admin-return-comment"
        fieldLabel="Comment (Optional)"
        fieldPlaceholder="Add a note for the creator"
      />


      <ConfirmDialog
        open={ isConfirmOpen }
        onOpenChange={ setIsConfirmOpen }
        title="Confirm Submission"
        description="Submit this video for approval? Once submitted, it will be reviewed by an admin."
        confirmLabel="Submit for Approval"
        onConfirm={ handleConfirmSubmissionSubmit }
        isLoading={ submitVideoSubmission.isPending }
        loadingText="Submitting..."
      />

      <ConfirmDialog
        open={ isDeleteOpen }
        onOpenChange={ setIsDeleteOpen }
        title="Delete Submission"
        description="Are you sure you want to delete this submission? This action cannot be undone and will also remove the associated video."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={ async () => {
          if ( !submission.id ) return;
          await toast.promise(
            deleteSubmission.mutateAsync( { id: submission.id } ),
            {
              loading: 'Deleting submission...',
              success: 'Submission deleted',
              error: 'Failed to delete submission',
            }
          );
          setIsDeleteOpen( false );
        } }
        isLoading={ deleteSubmission.isPending }
        loadingText="Deleting..."
      />
    </>
  );
}

