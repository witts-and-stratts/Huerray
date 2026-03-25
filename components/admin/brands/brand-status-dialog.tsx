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
import { ModelsBrandStatusUpdateRequestBrandStatusEnum } from "@/lib/api/generated";
import { useUpdateBrandStatus } from "@/lib/api/hooks/brands";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";

const statusToEnum = {
  approved: ModelsBrandStatusUpdateRequestBrandStatusEnum.Approved,
  rejected: ModelsBrandStatusUpdateRequestBrandStatusEnum.Rejected,
  returned: ModelsBrandStatusUpdateRequestBrandStatusEnum.Returned,
};

interface BrandStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  brandId: string;
  currentStatus?: string;
  onSuccess?: () => void;
}

const statusSchema = z.object( {
  status: z.string().min( 1, "Status is required" ),
  comment: z.string(),
} );

export function BrandStatusDialog( {
  open,
  onOpenChange,
  brandId,
  currentStatus,
  onSuccess,
}: BrandStatusDialogProps ) {
  const t = useTranslations('dashboard.admin');
  const { mutateAsync: updateStatus, isPending } = useUpdateBrandStatus( brandId );


  const form = useForm( {
    defaultValues: {
      status: currentStatus || "approved",
      comment: "",
    },
    validators: {
      onChange: statusSchema,
    },
    onSubmit: async ( { value } ) => {
      if ( !brandId ) {
        toast.error( "Brand ID is missing" );
        return;
      }

      try {
        await updateStatus( {
          brand_status: statusToEnum[ value.status as keyof typeof statusToEnum ],
          status_change_comments: value.comment,
        } );
        toast.success( "Brand status updated successfully", {
          richColors: true,
        } );
        onOpenChange( false );
        onSuccess?.();
      } catch ( error: any ) {
        console.error( "Failed to update status:", error );
        toast.error( "Failed to update brand status", {
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
          <DialogTitle className='font-primary text-h5 font-normal text-primary!'>{t('brandStatusDialog.updateBrandStatus')}</DialogTitle>
          <DialogDescription>
            {t('brandStatusDialog.reviewTheBrandsProfile')}</DialogDescription>
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
                  { value: "returned", label: "Reject" },
                  { value: "rejected", label: "Total Rejection" }
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
              {t('brandStatusDialog.cancel')}</Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isPending }>
                  { ( isSubmitting || isPending ) && <Loader2 className="mr-2 size-4 animate-spin" /> }
                  {t('brandStatusDialog.updateStatus')}</Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
