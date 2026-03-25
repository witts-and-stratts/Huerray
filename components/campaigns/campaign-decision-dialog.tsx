"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Textarea } from "@/components/dashboard-ui/textarea";
import { useCampaignDecision } from "@/lib/api/hooks/campaigns";
import { useTranslations } from "next-intl";

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
  const actionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const pageT = useTranslations( 'dashboard.brand.campaignsPage' );
  const t = ( key: string, values?: Record<string, any> ) => (
    actionsT.has( key ) ? actionsT( key, values ) : pageT.has( key ) ? pageT( key, values ) : key
  );
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
          toast.success( t( 'campaignDecisionSubmitted' ), {
            richColors: true,
            description: t( initialDecision === 'yes' ? 'campaignDecisionAccepted' : 'campaignDecisionRejected' ),
          } );
          onOpenChange( false );
          onSuccess?.();
          setComments( "" );
        },
        onError: ( error: any ) => {
          toast.error( t( 'campaignDecisionFailed' ), {
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
      title={ initialDecision === 'yes' ? t( 'acceptCampaignTitle' ) : t( 'rejectCampaignTitle' ) }
      description={ initialDecision === 'yes' ? t( 'acceptCampaignDescription' ) : t( 'rejectCampaignDescription' ) }
      confirmLabel={ initialDecision === 'yes' ? t( 'accept' ) : t( 'reject' ) }
      onConfirm={ handleConfirm }
      isLoading={ isPending }
      loadingText={ initialDecision === 'yes' ? t( 'accepting' ) : t( 'rejecting' ) }
    >
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="decision-comments" className="text-sm font-medium">
          { t( 'commentsOptional' ) }
        </label>
        <Textarea
          id="decision-comments"
          value={ comments }
          onChange={ ( e ) => setComments( e.target.value ) }
          placeholder={ t( 'commentsPlaceholder' ) }
          className="resize-none min-h-[100px]"
        />
      </div>
    </ConfirmDialog>
  );
}
