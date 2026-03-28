"use client";

import {
  ActionMenu,
  AllowedRoles,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { useUpdateCreatorContentType, useUpdateCreatorProfileStatus } from "@/lib/api/hooks/creators";
import { ModelsCreatorResponse, UtilsContentType, UtilsCreatorStatus } from "@/lib/api/generated/models";
import { Copy } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type CreatorActionStatus = "approved" | "rejected" | "returned";
type CreatorProfileType = "ai-generated" | "human-generated";

interface CreatorActionMenuProps {
  creator: ModelsCreatorResponse;
  creatorId?: string;
  onViewDetails?: ( creator: ModelsCreatorResponse ) => void;
  onApproveProfile?: ( creator: ModelsCreatorResponse ) => void;
  onRejectProfile?: ( creator: ModelsCreatorResponse ) => void;
  trigger?: ReactNode;
}

export function CreatorActionMenu( { creator, onViewDetails, trigger }: CreatorActionMenuProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const updateStatus = useUpdateCreatorProfileStatus();
  const updateContentType = useUpdateCreatorContentType();
  const [ pendingAction, setPendingAction ] = useState<{
    status: CreatorActionStatus;
    comments: string;
  } | null>( null );
  const [ pendingProfileType, setPendingProfileType ] = useState<CreatorProfileType | null>( null );
  const [ firstNameInput, setFirstNameInput ] = useState( "" );

  const handleStatusAction = ( status: CreatorActionStatus ) => {
    if ( !creator.id ) {
      toast.error( t( 'creatorStatus.missingId' ) );
      return;
    }
    setPendingAction( { status, comments: "" } );
  };

  const handleConfirmStatusAction = () => {
    if ( !creator.id || !pendingAction ) return;

    updateStatus.mutate(
      {
        id: creator.id,
        creator_status: pendingAction.status,
        comments: pendingAction.comments,
      },
      {
        onSuccess: () => {
          const creatorName = creator.first_name || tc( 'cards.creatorFallback' );
          setPendingAction( null );

          if ( pendingAction.status === "approved" ) {
            toast.success( t( 'creatorStatus.approvedToast', { name: creatorName } ) );
            return;
          }

          if ( pendingAction.status === "returned" ) {
            toast.success( t( 'creatorStatus.returnedToast', { name: creatorName } ) );
            return;
          }

          toast.success( t( 'creatorStatus.rejectedToast', { name: creatorName } ) );
        },
        onError: () => {
          setPendingAction( null );
          toast.error( t( 'creatorStatus.errorToast' ) );
        },
      }
    );
  };

  // const handleResendVerification = async () => {
  //   if ( !creator.email ) {
  //     toast.error( "User has no email address" );
  //     return;
  //   }

  //   toast.promise(
  //     resendVerification.mutateAsync( creator.email ),
  //     {
  //       loading: 'Sending verification email...',
  //       success: 'Verification email sent',
  //       error: ( error ) => <><span>Failed to send verification email</span><span>{ JSON.stringify( error.message ) }</span></>,
  //       richColors: true,
  //     }
  //   );
  // };

  const handleCopyId = () => {
    navigator.clipboard.writeText( creator.creator_id || "" );
    toast.success( t( 'creatorStatus.idCopied' ) );
  };

  const handleProfileTypeAction = ( contentType: CreatorProfileType ) => {
    if ( !creator.id ) {
      toast.error( t( 'creatorStatus.missingId' ) );
      return;
    }
    setFirstNameInput( "" );
    setPendingProfileType( contentType );
  };

  const handleConfirmProfileType = () => {
    if ( !creator.id || !pendingProfileType ) return;

    updateContentType.mutate(
      { id: creator.id, content_type: pendingProfileType },
      {
        onSuccess: () => {
          const creatorName = creator.first_name || tc( 'cards.creatorFallback' );
          setPendingProfileType( null );
          toast.success(
            pendingProfileType === UtilsContentType.ContentTypeAIGenerated
              ? t( 'creatorStatus.madeAiToast', { name: creatorName } )
              : t( 'creatorStatus.madeHumanToast', { name: creatorName } )
          );
        },
        onError: () => {
          setPendingProfileType( null );
          toast.error( t( 'creatorStatus.errorToast' ) );
        },
      }
    );
  };

  const actions: MenuAction<ModelsCreatorResponse>[] = [
    {
      label: t( 'creatorStatus.copyId' ),
      icon: Copy,
      action: handleCopyId,
    },
    ...( onViewDetails ? [ {
      label: tc( 'sheets.details' ),
      action: () => onViewDetails( creator ),
      separator: true,
    } ] : [] ),
    {
      label: t( 'creatorStatus.approve' ),
      action: () => handleStatusAction( "approved" ),
      allowedRoles: [ 'admin' ],
      condition: ( creator: ModelsCreatorResponse ) => creator.creator_status !== "approved",
    },
    {
      label: t( 'creatorStatus.reject' ),
      action: () => handleStatusAction( "rejected" ),
      allowedRoles: [ 'admin' ],
      condition: ( creator: ModelsCreatorResponse ) => creator.creator_status !== "rejected",
    },
    {
      label: t( 'creatorStatus.return' ),
      action: () => handleStatusAction( "returned" ),
      allowedRoles: [ 'admin' ],
      condition: ( creator: ModelsCreatorResponse ) => creator.creator_status === UtilsCreatorStatus.CreatorStatusPendingApproval,
    },
    {
      label: t( 'creatorStatus.makeAiCreator' ),
      action: () => handleProfileTypeAction( 'ai-generated' ),
      allowedRoles: [ 'admin' ],
      condition: ( creator: ModelsCreatorResponse ) => creator.content_type !== UtilsContentType.ContentTypeAIGenerated,
    },
    {
      label: t( 'creatorStatus.makeHumanCreator' ),
      action: () => handleProfileTypeAction( 'human-generated' ),
      allowedRoles: [ 'admin' ],
      condition: ( creator: ModelsCreatorResponse ) => creator.content_type !== UtilsContentType.ContentTypeHumanGenerated,
    },
    {
      label: t( 'creatorStatus.deleteCreator' ),
      action: () => { console.log( "Delete creator clicked" ); }, // Placeholder as per original
      variant: "destructive",
      allowedRoles: [ 'admin' ],
      className: "text-red-600",
    }
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ creator }
        trigger={ trigger }
      />
      <ConfirmDialog
        open={ !!pendingAction }
        onOpenChange={ ( open ) => {
          if ( !open ) setPendingAction( null );
        } }
        title={
          pendingAction?.status === "approved"
            ? t( 'creatorStatus.confirmApproveTitle' )
            : pendingAction?.status === "returned"
              ? t( 'creatorStatus.confirmReturnTitle' )
              : t( 'creatorStatus.confirmRejectTitle' )
        }
        description={
          pendingAction?.status === "approved"
            ? t( 'creatorStatus.confirmApproveDesc', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } )
            : pendingAction?.status === "returned"
              ? t( 'creatorStatus.confirmReturnDesc', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } )
              : t( 'creatorStatus.confirmRejectDesc', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } )
        }
        confirmLabel={
          pendingAction?.status === "approved"
            ? t( 'creatorStatus.approve' )
            : pendingAction?.status === "returned"
              ? t( 'creatorStatus.return' )
              : t( 'creatorStatus.reject' )
        }
        variant={ pendingAction?.status === "approved" ? "default" : "destructive" }
        onConfirm={ handleConfirmStatusAction }
        isLoading={ updateStatus.isPending }
        loadingText={
          pendingAction?.status === "approved"
            ? t( 'creatorStatus.approving' )
            : pendingAction?.status === "returned"
              ? t( 'creatorStatus.returning' )
              : t( 'creatorStatus.rejecting' )
        }
        className="w-[560px]"
      >
        <SuperField
          type="textarea"
          label={ t( 'creatorStatus.commentLabel' ) }
          placeholder={ t( 'creatorStatus.commentPlaceholder' ) }
          value={ pendingAction?.comments || "" }
          onChange={ ( e ) => {
            setPendingAction( current => current ? { ...current, comments: e.target.value } : current );
          } }
          fieldClassName="min-h-40"
        />
      </ConfirmDialog>
      <ConfirmDialog
        open={ !!pendingProfileType }
        onOpenChange={ ( open ) => {
          if ( !open ) setPendingProfileType( null );
        } }
        title={
          pendingProfileType === 'ai-generated'
            ? t( 'creatorStatus.confirmMakeAiTitle' )
            : t( 'creatorStatus.confirmMakeHumanTitle' )
        }
        description={
          pendingProfileType === 'ai-generated'
            ? t( 'creatorStatus.confirmMakeAiDesc', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } )
            : t( 'creatorStatus.confirmMakeHumanDesc', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } )
        }
        confirmLabel={
          pendingProfileType === 'ai-generated'
            ? t( 'creatorStatus.makeAiCreator' )
            : t( 'creatorStatus.makeHumanCreator' )
        }
        variant="default"
        onConfirm={ handleConfirmProfileType }
        isLoading={ updateContentType.isPending }
        loadingText={ t( 'creatorStatus.updatingProfileType' ) }
        confirmDisabled={ firstNameInput.trim() !== ( creator.first_name || '' ).trim() }
        className="w-[560px]"
      >
        <SuperField
          type="text"
          label={ t( 'creatorStatus.confirmFirstNameLabel', { name: creator.first_name || t( 'creatorStatus.thisCreator' ) } ) }
          placeholder={ t( 'creatorStatus.confirmFirstNamePlaceholder' ) }
          value={ firstNameInput }
          onChange={ ( e ) => setFirstNameInput( e.target.value ) }
        />
      </ConfirmDialog>
    </>
  );
}
