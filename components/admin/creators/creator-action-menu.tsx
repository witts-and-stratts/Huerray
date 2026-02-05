"use client";

import {
  ActionMenu,
  MenuAction
} from "@/components/dashboard-ui/action-menu";
import { ModelsUserResponse, ModelsCreatorResponse } from "@/lib/api/generated/models";
import { useCreator } from "@/lib/api/hooks/creators";
import { useResendVerification } from "@/lib/api/hooks/users";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useState, ReactNode } from "react";
import { CreatorStatusDialog } from "./creator-status-dialog";

interface CreatorActionMenuProps {
  creator: ModelsCreatorResponse;
  creatorId?: string;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  trigger?: ReactNode;
}

export function CreatorActionMenu( { creator, onViewDetails, trigger }: CreatorActionMenuProps ) {
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const resendVerification = useResendVerification();

  const handleReviewProfile = () => {
    if ( !creator.id ) {
      toast.error( "Creator profile not found" );
      return;
    }
    setIsStatusDialogOpen( true );
  };

  const handleResendVerification = async () => {
    if ( !creator.email ) {
      toast.error( "User has no email address" );
      return;
    }

    toast.promise(
      resendVerification.mutateAsync( creator.email ),
      {
        loading: 'Sending verification email...',
        success: 'Verification email sent',
        error: ( error ) => <><span>Failed to send verification email</span><span>{ JSON.stringify( error.message ) }</span></>,
        richColors: true,
      }
    );
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText( creator.creator_id || "" );
    toast.success( "ID copied to clipboard" );
  };

  const actions: MenuAction<ModelsCreatorResponse>[] = [
    {
      label: "Copy ID",
      icon: Copy,
      action: handleCopyId,
    },
    {
      label: "View details",
      action: () => onViewDetails( creator ),
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
      label: "Delete creator",
      action: () => { console.log( "Delete creator clicked" ); }, // Placeholder as per original
      variant: "destructive",
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
