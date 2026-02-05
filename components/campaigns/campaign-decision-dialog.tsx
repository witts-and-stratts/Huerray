"use client";
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

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

import { useCampaignDecision } from "@/lib/api/hooks/campaigns";

type decisionType = 'yes' | 'no';

interface CampaignDecisionDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  campaignId: string;
  initialDecision?: decisionType;
  onSuccess?: () => void;
}

const decisionSchema = z.object( {
  decision: z.enum( [ "yes", "no" ] ),
  comments: z.string().optional(),
} );

export function CampaignDecisionDialog( {
  open,
  onOpenChange,
  campaignId,
  initialDecision = 'yes',
  onSuccess,
}: CampaignDecisionDialogProps ) {
  const { mutate: submitDecision, isPending } = useCampaignDecision();

  const form = useForm( {
    defaultValues: {
      decision: initialDecision,
      comments: "",
    },
    onSubmit: async ( { value } ) => {
      submitDecision(
        {
          id: campaignId,
          decision: {
            brand_accepted: value.decision === 'yes' ? true : false,
            brand_decision_comments: value.comments || ""
          }
        },
        {
          onSuccess: () => {
            toast.success( "Campaign decision submitted successfully" );
            onOpenChange( false );
            onSuccess?.();
          },
          onError: ( error ) => {
            toast.error( "Failed to submit decision", {
              richColors: true,
              description: ( error as any ).response?.data?.message,
            } );
          }
        }
      );
    },
  } );

  // Reset form when dialog opens or initial decision changes
  useEffect( () => {
    if ( open ) {
      form.reset( {
        decision: initialDecision,
        comments: "",
      } );
    }
  }, [ open, initialDecision, form ] );

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className='text-h5! font-primary text-primary font-normal'>Campaign Decision</DialogTitle>
          <DialogDescription>
            Make a decision to accept or reject this campaign. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="space-y-4">
          <form.Field
            name="decision"
            validators={ {
              onBlur: decisionSchema.shape.decision,
            } }
            children={ ( field ) => (
              <SuperField
                type="select"
                label="Accept Campaign"
                id="decision"
                value={ String( field.state.value ) }
                onValueChange={ ( val: string | null ) => field.handleChange( val as 'yes' | 'no' ) }
                onBlur={ field.handleBlur }
                placeholder="Select decision"
                options={ [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" }
                ] }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <form.Field
            name="comments"
            children={ ( field ) => (
              <SuperField
                type="textarea"
                label="Comments"
                id="comments"
                value={ field.state.value ?? "" }
                onChange={ ( e: React.ChangeEvent<HTMLTextAreaElement> ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                placeholder="Add any comments or feedback..."
                fieldClassName="resize-none min-h-[100px]"
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={ () => onOpenChange( false ) }>
              Cancel
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isPending }>
                  { ( isSubmitting || isPending ) && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                  Submit Decision
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
