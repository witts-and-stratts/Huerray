"use client";

import { ModelsUserResponse } from "@/lib/api/generated/models";
import { Button } from "@/components/dashboard-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { useUpdateUserStatus } from "@/lib/api/hooks/users";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslations } from "next-intl";

interface UserStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  user: ModelsUserResponse;
  initialStatus?: "approved" | "rejected";
  onSuccess?: () => void;
}

const statusSchema = z.object( {
  status: z.enum( [ "approved", "rejected" ] ),
  comment: z.string(),
} );

export function UserStatusDialog( {
  open,
  onOpenChange,
  user,
  initialStatus = "approved",
  onSuccess,
}: UserStatusDialogProps ) {
  const t = useTranslations( 'dashboard.admin.userStatus' );
  const tc = useTranslations( 'dashboard.common' );
  const { mutateAsync: updateStatus, isPending } = useUpdateUserStatus();

  const resolveUserStatusMessage = ( key: string, fallback: string, values?: Record<string, string> ) => (
    t.has( key ) ? t( key, values ) : fallback
  );


  const form = useForm( {
    defaultValues: {
      status: initialStatus,
      comment: "",
    },
    validators: {
      onChange: statusSchema,
    },
    onSubmit: async ( { value } ) => {
      if ( !user.id ) {
        toast.error( t( 'missingId' ) );
        return;
      }

      try {
        await updateStatus( {
          id: user.id,
          status: value.status,
          user: user, // Pass full user object for API reconstruction
        } );
        const userName = user.first_name || user.username || t( 'thisUser' );
        toast.success( value.status === "approved" ? t( 'approvedToast', { name: userName } ) : t( 'rejectedToast', { name: userName } ), {
          richColors: true,
        } );
        onOpenChange( false );
        onSuccess?.();
      } catch ( error: any ) {
        console.error( "Failed to update status:", error );
        toast.error( t( 'errorToast' ), {
          description: error?.response?.data?.message || error.message,
          richColors: true,
        } );
      }
    },
  } );

  // Reset form when dialog opens
  useEffect( () => {
    if ( open ) {
      form.reset( {
        status: initialStatus,
        comment: "",
      } );
    }
  }, [ open, initialStatus, form ] );

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='font-primary text-h5 font-normal text-primary!'>
            { initialStatus === "approved"
              ? resolveUserStatusMessage( 'confirmApproveTitle', 'Approve user profile?' )
              : resolveUserStatusMessage( 'confirmRejectTitle', 'Reject user profile?' ) }
          </DialogTitle>
          <DialogDescription>
            { initialStatus === "approved"
              ? resolveUserStatusMessage(
                'confirmApproveDesc',
                `${ user.first_name || user.username || resolveUserStatusMessage( 'thisUser', 'This user' ) }'s profile will be approved and they will be notified.`,
                { name: user.first_name || user.username || resolveUserStatusMessage( 'thisUser', 'This user' ) }
              )
              : resolveUserStatusMessage(
                'confirmRejectDesc',
                `${ user.first_name || user.username || resolveUserStatusMessage( 'thisUser', 'This user' ) }'s profile will be rejected and they will be notified.`,
                { name: user.first_name || user.username || resolveUserStatusMessage( 'thisUser', 'This user' ) }
              ) }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="grid gap-4 py-4">
          <form.Field
            name="comment"
            children={ ( field ) => (
              <SuperField
                type="textarea"
                label={ tc('sheets.comments') }
                value={ field.state.value || "" }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ tc('sheets.commentPlaceholder') }
                fieldClassName="min-h-[100px]"
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isPending }>
              { tc('cancel') }
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isPending }>
                  { ( isSubmitting || isPending ) && <Loader2 className="mr-2 size-4 animate-spin" /> }
                  { isPending
                    ? ( initialStatus === "approved"
                      ? resolveUserStatusMessage( 'approving', 'Approving...' )
                      : resolveUserStatusMessage( 'rejecting', 'Rejecting...' ) )
                    : ( initialStatus === "approved" ? t( 'approve' ) : t( 'reject' ) ) }
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
