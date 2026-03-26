"use client";

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
import { ModelsCreatorStatusUpdateRequestCreatorStatusEnum } from "@/lib/api/generated";
import { useUpdateCreatorStatus } from "@/lib/api/hooks/creators";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslations } from "next-intl";

const statusToEnum = {
  approved: ModelsCreatorStatusUpdateRequestCreatorStatusEnum.Approved,
  rejected: ModelsCreatorStatusUpdateRequestCreatorStatusEnum.Rejected,
  returned: ModelsCreatorStatusUpdateRequestCreatorStatusEnum.Returned,
};

interface CreatorStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  creatorId: string;
  currentStatus?: string;
  onSuccess?: () => void;
}

const statusSchema = z.object( {
  status: z.string().min( 1, "Status is required" ),
  comment: z.string(),
} );

export function CreatorStatusDialog( {
  open,
  onOpenChange,
  creatorId,
  currentStatus,
  onSuccess,
}: CreatorStatusDialogProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const { mutateAsync: updateStatus, isPending } = useUpdateCreatorStatus( creatorId );


  const form = useForm( {
    defaultValues: {
      status: currentStatus || "approved",
      comment: "",
    },
    validators: {
      onChange: statusSchema,
    },
    onSubmit: async ( { value } ) => {
      console.log( "creatorId inside onSubmit", creatorId );

      if ( !creatorId ) {
        toast.error( t( 'creatorStatus.missingId' ) );
        return;
      }

      try {
        await updateStatus( {
          creator_status: statusToEnum[ value.status as keyof typeof statusToEnum ],
          comments: value.comment,
        } );
        toast.success( t( 'creatorStatus.successToast' ), {
          richColors: true,
        } );
        onOpenChange( false );
        onSuccess?.();
      } catch ( error: any ) {
        console.error( "Failed to update status:", error );
        toast.error( t( 'creatorStatus.errorToast' ), {
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
        status: currentStatus || "approved",
        comment: "",
      } );
    }
  }, [ open, currentStatus, form ] );

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='font-primary text-h5 font-normal text-primary!'>{ t( 'creatorStatus.title' ) }</DialogTitle>
          <DialogDescription>
            { t( 'creatorStatus.description' ) }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="grid gap-4 py-4">
          <form.Field
            name="status"
            children={ ( field ) => (
              <SuperField
                type="select"
                label={ t( 'creatorStatus.statusLabel' ) }
                value={ field.state.value }
                onValueChange={ ( value ) => field.handleChange( value! ) }
                options={ [
                  { value: "approved", label: t( 'creatorStatus.approve' ) },
                  { value: "returned", label: t( 'creatorStatus.return' ) },
                  { value: "rejected", label: t( 'creatorStatus.totalRejection' ) }
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
                label={ tc( 'sheets.comments' ) }
                value={ field.state.value || "" }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ tc( 'sheets.commentPlaceholder' ) }
                fieldClassName="min-h-[100px]"
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isPending }>
              { tc( 'cancel' ) }
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isPending }>
                  { ( isSubmitting || isPending ) && <Loader2 className="mr-2 size-4 animate-spin" /> }
                  { tc( 'sheets.updateStatus' ) }
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
