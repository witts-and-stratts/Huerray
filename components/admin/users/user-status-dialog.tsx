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

interface UserStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  user: ModelsUserResponse;
  onSuccess?: () => void;
}

const statusSchema = z.object( {
  status: z.string().min( 1, "Status is required" ),
  comment: z.string(),
} );

export function UserStatusDialog( {
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserStatusDialogProps ) {
  const { mutateAsync: updateStatus, isPending } = useUpdateUserStatus();


  const form = useForm( {
    defaultValues: {
      status: user.user_status || "approved",
      comment: "",
    },
    validators: {
      onChange: statusSchema,
    },
    onSubmit: async ( { value } ) => {
      if ( !user.id ) {
        toast.error( "User ID is missing" );
        return;
      }

      try {
        await updateStatus( {
          id: user.id,
          status: value.status,
          user: user, // Pass full user object for API reconstruction
        } );
        toast.success( "User status updated successfully", {
          richColors: true,
        } );
        onOpenChange( false );
        onSuccess?.();
      } catch ( error: any ) {
        console.error( "Failed to update status:", error );
        toast.error( "Failed to update user status", {
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
        status: user.user_status || "approved",
        comment: "",
      } );
    }
  }, [ open, user.user_status, form ] );

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='font-primary text-h5 font-normal text-primary!'>Update User Status</DialogTitle>
          <DialogDescription>
            Review the user's profile and update their status.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="grid gap-4 py-4">
          <form.Field
            name="status"
            children={ ( field ) => (
              <SuperField
                type="select"
                label="Status"
                value={ field.state.value }
                onValueChange={ ( value ) => field.handleChange( value! ) }
                options={ [
                  { value: "approved", label: "Approve" },
                  { value: "rejected", label: "Reject" },
                ] }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />
          <form.Field
            name="comment"
            children={ ( field ) => (
              <SuperField
                type="textarea"
                label="Comments"
                value={ field.state.value || "" }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder="Add a comment or reason for this decision..."
                fieldClassName="min-h-[100px]"
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isPending }>
              Cancel
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isPending }>
                  { ( isSubmitting || isPending ) && <Loader2 className="mr-2 size-4 animate-spin" /> }
                  Update Status
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
