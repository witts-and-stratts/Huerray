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
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { useDeleteUser } from "@/lib/api/hooks/users";
import { getAvailableUserStatusActions, type UserStatusAction } from "@/lib/admin/user-status";

const STATUS_ACTION_LABEL_KEYS: Record<UserStatusAction, string> = {
  approved: "approve",
  active: "reactivate",
  suspended: "suspend",
  rejected: "reject",
};

interface UserActionMenuProps {
  user: ModelsUserResponse;
  onViewDetails?: ( user: ModelsUserResponse ) => void;
  trigger?: React.ReactNode;
}

export function UserActionMenu( { user, onViewDetails, trigger }: UserActionMenuProps ) {
  const menuT = useTranslations( 'dashboard.admin.userActionMenu' );
  const t = useTranslations( 'dashboard.admin.userStatus' );
  const userFallbackT = useTranslations( 'dashboard.common' );
  const userName = `${ user.first_name || "" } ${ user.last_name || "" }`.trim() || user.email || userFallbackT( 'cards.userFallback' );

  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const [ pendingStatus, setPendingStatus ] = useState<UserStatusAction>( "approved" );
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleStatusAction = ( status: UserStatusAction ) => {
    if ( !user.id ) {
      toast.error( "User profile not found" );
      return;
    }
    setPendingStatus( status );
    setIsStatusDialogOpen( true );
  };

  const handleDeleteUser = () => {
    if ( !user.id ) {
      toast.error( menuT( 'deleteUserError' ) );
      return;
    }
    deleteUser( user.id, {
      onSuccess: () => {
        toast.success( menuT( 'deleteUserSuccess' ) );
        setIsDeleteDialogOpen( false );
      },
      onError: () => {
        toast.error( menuT( 'deleteUserError' ) );
      }
    } );
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
    ...getAvailableUserStatusActions( user.user_status ).map( ( status, index ): MenuAction<ModelsUserResponse> => ( {
      label: t( STATUS_ACTION_LABEL_KEYS[ status ] ),
      action: () => handleStatusAction( status ),
      separator: index === 0,
      variant: status === "suspended" || status === "rejected" ? "destructive" : undefined,
    } ) ),
    {
      label: menuT( 'deleteUser' ),
      action: () => setIsDeleteDialogOpen( true ),
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
      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        title={ menuT( 'deleteUserTitle' ) }
        description={ menuT( 'deleteUserConfirm', { name: userName } ) }
        confirmLabel={ menuT( 'deleteUser' ) }
        onConfirm={ handleDeleteUser }
        isLoading={ isDeleting }
        loadingText={ menuT( 'deleting' ) }
        variant="destructive"
      />
    </>
  );
}
