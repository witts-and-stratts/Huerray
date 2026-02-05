"use client";

import {
  ActionMenu,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { useResendVerification } from "@/lib/api/hooks/users";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { UserStatusDialog } from "./user-status-dialog";

interface UserActionMenuProps {
  user: ModelsUserResponse;
  onViewDetails: ( user: ModelsUserResponse ) => void;
}

export function UserActionMenu( { user, onViewDetails }: UserActionMenuProps ) {
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

  const handleCopyId = () => {
    navigator.clipboard.writeText( user.id || "" );
    toast.success( "ID copied to clipboard" );
  };

  const actions: MenuAction<ModelsUserResponse>[] = [
    {
      label: "Copy ID",
      icon: Copy,
      action: handleCopyId,
    },
    {
      label: "View details",
      action: () => onViewDetails( user ),
      separator: true,
    },
    {
      label: "Edit profile",
      action: () => { console.log( "Edit profile clicked" ); } // Placeholder as per original
    },
    {
      label: "Resend Email Verification",
      action: handleResendVerification,
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
      />
      <UserStatusDialog
        open={ isStatusDialogOpen }
        onOpenChange={ setIsStatusDialogOpen }
        user={ user }
      />
    </>
  );
}
