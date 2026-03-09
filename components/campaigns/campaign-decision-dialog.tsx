"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Textarea } from "@/components/dashboard-ui/textarea";
import { useCampaignDecision } from "@/lib/api/hooks/campaigns";

type decisionType = 'yes' | 'no';

interface CampaignDecisionDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  campaignId: string;
  initialDecision?: decisionType;
  onSuccess?: () => void;
}

export function CampaignDecisionDialog( {
  open,
  onOpenChange,
  campaignId,
  initialDecision = 'yes',
  onSuccess,
}: CampaignDecisionDialogProps ) {
  const { mutate: submitDecision, isPending } = useCampaignDecision();
  const [ comments, setComments ] = useState( "" );

  const handleConfirm = () => {
    submitDecision(
      {
        id: campaignId,
        decision: {
          brand_accepted: initialDecision === 'yes',
          brand_decision_comments: comments
        }
      },
      {
        onSuccess: () => {
          toast.success( "Campaign decision submitted successfully", {
            richColors: true,
            description: `Campaign decision ${ initialDecision === 'yes' ? 'accepted' : 'rejected' }.`,
          } );
          onOpenChange( false );
          onSuccess?.();
          setComments( "" );
        },
        onError: ( error: any ) => {
          toast.error( "Failed to submit decision", {
            richColors: true,
            description: error.response?.data?.message,
          } );
        }
      }
    );
  };

  useEffect( () => {
    if ( open ) {
      setComments( "" );
    }
  }, [ open, initialDecision ] );

  return (
    <ConfirmDialog
      open={ open }
      onOpenChange={ onOpenChange }
      title={ initialDecision === 'yes' ? 'Accept Campaign' : 'Reject Campaign' }
      description={ `Are you sure you want to ${ initialDecision === 'yes' ? 'accept' : 'reject' } this campaign? This action cannot be undone.` }
      confirmLabel={ initialDecision === 'yes' ? 'Accept' : 'Reject' }
      onConfirm={ handleConfirm }
      isLoading={ isPending }
      loadingText={ initialDecision === 'yes' ? 'Accepting...' : 'Rejecting...' }
    >
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="decision-comments" className="text-sm font-medium">
          Comments (Optional)
        </label>
        <Textarea
          id="decision-comments"
          value={ comments }
          onChange={ ( e ) => setComments( e.target.value ) }
          placeholder="Add any comments or feedback..."
          className="resize-none min-h-[100px]"
        />
      </div>
    </ConfirmDialog>
  );
}
