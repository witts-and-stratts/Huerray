"use client";

import {
  ActionMenu,
  AllowedRoles,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { useResendVerification } from "@/lib/api/hooks/users";
import { Copy } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { CreatorStatusDialog } from "./creator-status-dialog";
import { useTranslations } from "next-intl";

interface CreatorActionMenuProps {
  creator: ModelsCreatorResponse;
  creatorId?: string;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  onApproveProfile?: ( creator: ModelsCreatorResponse ) => void;
  onRejectProfile?: ( creator: ModelsCreatorResponse ) => void;
  trigger?: ReactNode;
}

export function CreatorActionMenu( { creator, onViewDetails, onApproveProfile, onRejectProfile, trigger }: CreatorActionMenuProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const resendVerification = useResendVerification();

  const handleReviewProfile = () => {
    if ( !creator.id ) {
      toast.error( t( 'creatorStatus.missingId' ) );
      return;
    }
    setIsStatusDialogOpen( true );
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

  const actions: MenuAction<ModelsCreatorResponse>[] = [
    {
      label: t( 'creatorStatus.copyId' ),
      icon: Copy,
      action: handleCopyId,
    },
    {
      label: tc( 'sheets.details' ),
      action: () => onViewDetails( creator ),
      separator: true,
    },
    ...( onApproveProfile ? [ {
      label: t( 'creatorStatus.approve' ),
      action: () => onApproveProfile( creator ),
      allowedRoles: [ 'admin' ] as AllowedRoles[],
      condition: ( creator: ModelsCreatorResponse ) => creator.creator_status !== "approved",
    } ] : [] ),
    ...( onRejectProfile ? [ {
      label: t( 'creatorStatus.reject' ),
      action: () => onRejectProfile( creator ),
      allowedRoles: [ 'admin' ] as AllowedRoles[],
      condition: ( creator: ModelsCreatorResponse ) => creator.creator_status !== "rejected",
    } ] : [] ),
    {
      label: t( 'creatorStatus.reviewProfile' ),
      action: handleReviewProfile,
      allowedRoles: [ 'admin' ]
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
      <CreatorStatusDialog
        open={ isStatusDialogOpen }
        onOpenChange={ setIsStatusDialogOpen }
        creatorId={ creator.id! }
      />
    </>
  );
}
