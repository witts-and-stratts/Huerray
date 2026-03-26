"use client";

import React from "react";
import {
  ActionMenu,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { useState } from "react";
import { toast } from "sonner";
import { UserStatusDialog } from "./user-status-dialog";
import { useTranslations } from "next-intl";

interface UserActionMenuProps {
  user: ModelsUserResponse;
  onViewDetails?: ( user: ModelsUserResponse ) => void;
  trigger?: React.ReactNode;
}

export function UserActionMenu( { user, onViewDetails, trigger }: UserActionMenuProps ) {
  const menuT = useTranslations( 'dashboard.admin.userActionMenu' );
  const t = useTranslations( 'dashboard.admin.userStatus' );
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const [ pendingStatus, setPendingStatus ] = useState<"approved" | "rejected">( "approved" );

  const handleStatusAction = ( status: "approved" | "rejected" ) => {
    if ( !user.id ) {
      toast.error( "User profile not found" );
      return;
    }
    setPendingStatus( status );
    setIsStatusDialogOpen( true );
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText( user.id || "" );
    toast.success( menuT( 'idCopied' ) );
  };

  const actions: MenuAction<ModelsUserResponse>[] = [
    {
      label: menuT( 'copyId' ),
      action: handleCopyId,
    },
    {
      label: menuT( 'copyUsername' ),
      action: () => {
        if ( user.username ) {
          navigator.clipboard.writeText( user.username );
          toast.success( menuT( 'usernameCopied' ) );
        } else {
          toast.error( menuT( 'noUsernameAvailable' ) );
        }
      },
    },
    {
      label: menuT( 'copyEmail' ),
      action: () => {
        if ( user.email ) {
          navigator.clipboard.writeText( user.email );
          toast.success( menuT( 'emailCopied' ) );
        } else {
          toast.error( menuT( 'noEmailAvailable' ) );
        }
      },
    },
    ...( onViewDetails ? [ {
      label: menuT( 'viewDetails' ),
      action: () => onViewDetails( user ),
      separator: true,
    } ] : [] ),
    // {
    //   label: menuT( 'resendEmailVerification' ),
    //   action: handleResendVerification,
    //   condition: () => !user.email_verified,
    // },
    // {
    //   label: menuT( 'initiatePasswordReset' ),
    //   action: handleInitiatePasswordReset,
    //   condition: () => !!user.email,
    // },
    {
      label: t( 'approve' ),
      action: () => handleStatusAction( "approved" ),
      condition: ( current ) => current.user_status !== "approved",
    },
    {
      label: t( 'reject' ),
      action: () => handleStatusAction( "rejected" ),
      condition: ( current ) => current.user_status !== "rejected",
    },
    {
      label: menuT( 'deleteUser' ),
      action: () => { console.log( "Delete user clicked" ); }, // Placeholder as per original
      variant: "destructive",
      className: "text-red-600",
    }
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ user }
        trigger={ trigger }
      />
      <UserStatusDialog
        open={ isStatusDialogOpen }
        onOpenChange={ setIsStatusDialogOpen }
        user={ user }
        initialStatus={ pendingStatus }
      />
    </>
  );
}
