"use client";

import { useState } from "react";
import { ChevronDown, Eye, MoreVertical } from "lucide-react";
import { toast } from "sonner";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { ModelsPaymentResponse } from "@/lib/api/generated/models";
import { useUpdatePaymentStatus } from "@/lib/api/hooks/payments";
import { useTranslations } from "next-intl";
import { PaymentDetailsSheet } from "./payment-details-sheet";

interface PaymentActionMenuProps {
  payment: ModelsPaymentResponse;
  isAdmin?: boolean;
}

export function PaymentActionMenu( { payment, isAdmin }: PaymentActionMenuProps ) {
  const t = useTranslations( 'dashboard.common' );
  const [ viewOpen, setViewOpen ] = useState( false );
  const [ confirmOpen, setConfirmOpen ] = useState( false );

  const { mutate: updatePaymentStatus, isPending } = useUpdatePaymentStatus( {
    onSuccess: () => {
      toast.success( t( 'payments.actions.confirmSuccess' ) );
      setConfirmOpen( false );
    },
    onError: () => {
      toast.error( t( 'payments.actions.confirmError' ) );
    },
  } );

  const handleConfirm = () => {
    if ( !payment.id ) {
      toast.error( t( 'payments.actions.missingPaymentId' ) );
      return;
    }
    updatePaymentStatus( {
      id: payment.id,
      request: { payment_status: 'completed' },
    } );
  };

  const actions: MenuAction<ModelsPaymentResponse>[] = [
    ...( isAdmin ? [
      {
        label: t( 'payments.actions.confirmPayout' ),
        action: () => setConfirmOpen( true ),
        condition: ( p: ModelsPaymentResponse ) =>
          p.payment_status !== 'completed',
      } as MenuAction<ModelsPaymentResponse>,
    ] : [] ),
  ];

  return (
    <>
      <div className="flex justify-end">
        <ButtonGroup>
          <Button
            variant="outline"
            size="sm"
            className="font-regular gap-1.5"
            onClick={ () => setViewOpen( true ) }
          >
            { t( 'payments.actions.view' ) }
          </Button>
          <ActionMenu
            actions={ actions }
            data={ payment }
            align="end"
            label=""
            trigger={
              <Button variant="outline" size="icon-sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            }
          />
        </ButtonGroup>
      </div>

      <PaymentDetailsSheet payment={ payment } open={ viewOpen } onOpenChange={ setViewOpen } isAdmin={ isAdmin } />
      

      <ConfirmDialog
        open={ confirmOpen }
        onOpenChange={ setConfirmOpen }
        title={ t( 'payments.actions.confirmTitle' ) }
        description={
          <>
            { t( 'payments.actions.confirmDescription' ) }
            { payment.creator_name ? <> { t( 'payments.actions.confirmDescriptionWithCreator', { creator: payment.creator_name } ) }</> : '' }?
            {' '}{ t( 'payments.actions.confirmDescriptionSuffix' ) }
          </>
        }
        confirmLabel={ t( 'payments.actions.confirmPayout' ) }
        loadingText={ t( 'payments.actions.confirming' ) }
        isLoading={ isPending }
        onConfirm={ handleConfirm }
      />
    </>
  );
}
