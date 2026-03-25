"use client";

import React from "react";
import {
  ActionMenu,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { apiClient } from "@/lib/api/client";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { useResendVerification } from "@/lib/api/hooks/users";
import { useState } from "react";
import { toast } from "sonner";
import { UserStatusDialog } from "./user-status-dialog";
import { useTranslations } from "next-intl";

interface UserActionMenuProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
  trigger?: React.ReactNode;
}

export function UserActionMenu( { user, onViewDetails, trigger }: UserActionMenuProps ) {
  const t = useTranslations('dashboard.admin');
  const menuT = useTranslations('dashboard.admin.userActionMenu');
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const resendVerification = useResendVerification();

  const handleReviewProfile = () => {
    if ( !user.id ) {
      toast.error( "User profile not found" );
      return;
    }
    setIsStatusDialogOpen( true );
  };

  const handleResendVerification = async () => {
    if ( !user.email ) {
      toast.error( "User has no email address" );
      return;
    }

    toast.promise(
      resendVerification.mutateAsync( user.email ),
      {
        loading: menuT( 'sendingVerification' ),
        success: menuT( 'verificationSent' ),
        error: ( error ) => <><span>{ menuT( 'failedToSendVerification' ) }</span><span>{ JSON.stringify( error.message ) }</span></>,
        richColors: true,
      }
    );
  };

  const handleInitiatePasswordReset = async () => {
    if ( !user.email ) {
      toast.error( "User has no email address" );
      return;
    }

    const authApi = new AuthenticationApi( undefined, undefined, apiClient );

    toast.promise(
      authApi.authPasswordResetPost( { email: { email: user.email } } ),
      {
        loading: menuT( 'initiatingPasswordReset' ),
        success: menuT( 'passwordResetSent' ),
        error: ( error ) => {
          const errorMessage = error.response?.data?.message || error.message || menuT( 'failedToInitiatePasswordReset' );
          return <span>{ errorMessage }</span>;
        },
        richColors: true,
      }
    );
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
    {
      label: menuT( 'viewDetails' ),
      action: () => onViewDetails( user ),
      separator: true,
    },
    {
      label: menuT( 'resendEmailVerification' ),
      action: handleResendVerification,
      condition: () => !user.email_verified,
    },
    {
      label: menuT( 'initiatePasswordReset' ),
      action: handleInitiatePasswordReset,
      condition: () => !!user.email,
    },
    {
      label: menuT( 'reviewProfile' ),
      action: handleReviewProfile,
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
      />
    </>
  );
}
