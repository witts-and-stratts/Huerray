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

interface UserActionMenuProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
  trigger?: React.ReactNode;
}

export function UserActionMenu( { user, onViewDetails, trigger }: UserActionMenuProps ) {
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
        loading: 'Sending verification email...',
        success: 'Verification email sent',
        error: ( error ) => <><span>Failed to send verification email</span><span>{ JSON.stringify( error.message ) }</span></>,
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
        loading: 'Initiating password reset...',
        success: 'Password reset email sent',
        error: ( error ) => {
          const errorMessage = error.response?.data?.message || error.message || "Failed to initiate password reset";
          return <span>{ errorMessage }</span>;
        },
        richColors: true,
      }
    );
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText( user.id || "" );
    toast.success( "ID copied to clipboard" );
  };

  const actions: MenuAction<ModelsUserResponse>[] = [
    {
      label: "Copy ID",
      action: handleCopyId,
    },
    {
      label: "Copy Username",
      action: () => {
        if ( user.username ) {
          navigator.clipboard.writeText( user.username );
          toast.success( "Username copied to clipboard" );
        } else {
          toast.error( "No username available" );
        }
      },
    },
    {
      label: "Copy Email",
      action: () => {
        if ( user.email ) {
          navigator.clipboard.writeText( user.email );
          toast.success( "Email copied to clipboard" );
        } else {
          toast.error( "No email available" );
        }
      },
    },
    {
      label: "View details",
      action: () => onViewDetails( user ),
      separator: true,
    },
    {
      label: "Resend Email Verification",
      action: handleResendVerification,
      condition: () => !user.email_verified,
    },
    {
      label: "Initiate Password Reset",
      action: handleInitiatePasswordReset,
      condition: () => !!user.email,
    },
    {
      label: "Review Profile",
      action: handleReviewProfile,
    },
    {
      label: "Delete user",
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
