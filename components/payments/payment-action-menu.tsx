"use client";

import { useState } from "react";
import { Eye, MoreVertical } from "lucide-react";
import { toast } from "sonner";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { ModelsPaymentResponse } from "@/lib/api/generated/models";
import { useUpdatePaymentStatus } from "@/lib/api/hooks/payments";
import { PaymentDetailsSheet } from "./payment-details-sheet";

interface PaymentActionMenuProps {
  payment: ModelsPaymentResponse;
  isAdmin?: boolean;
}

export function PaymentActionMenu( { payment, isAdmin }: PaymentActionMenuProps ) {
  const [ viewOpen, setViewOpen ] = useState( false );
  const [ confirmOpen, setConfirmOpen ] = useState( false );

  const { mutate: updatePaymentStatus, isPending } = useUpdatePaymentStatus( {
    onSuccess: () => {
      toast.success( "Payout confirmed successfully." );
      setConfirmOpen( false );
    },
    onError: () => {
      toast.error( "Failed to confirm payout. Please try again." );
    },
  } );

  const handleConfirm = () => {
    if ( !payment.id ) {
      toast.error( "Missing payment ID." );
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
        label: "Confirm payout",
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
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <ActionMenu
            actions={ actions }
            data={ payment }
            align="end"
            label=""
            trigger={
              <Button variant="outline" size="icon-sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            }
          />
        </ButtonGroup>
      </div>

      <PaymentDetailsSheet payment={ payment } open={ viewOpen } onOpenChange={ setViewOpen } />

      <ConfirmDialog
        open={ confirmOpen }
        onOpenChange={ setConfirmOpen }
        title="Confirm payout"
        description={
          <>
            Are you sure you want to confirm this payout
            { payment.creator_name ? <> for <strong>{ payment.creator_name }</strong></> : '' }?
            This will create a payment item record.
          </>
        }
        confirmLabel="Confirm payout"
        loadingText="Confirming..."
        isLoading={ isPending }
        onConfirm={ handleConfirm }
      />
    </>
  );
}
