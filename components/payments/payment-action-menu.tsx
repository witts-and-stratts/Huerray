"use client";

import { ReactNode, useEffect, useState } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { SuperField } from "@/components/dashboard-ui/super-field";
import {
  ModelsPaymentResponse,
  ModelsUpdatePaymentRequest,
  ModelsUpdatePaymentStatusRequest,
} from "@/lib/api/generated/models";
import { useDeletePayment, useUpdatePayment, useUpdatePaymentStatus } from "@/lib/api/hooks/payments";
import { useTranslations } from "next-intl";

import { PaymentDetailsSheet } from "./payment-details-sheet";
import { PaymentStatusDialog } from "./payment-status-dialog";
import { PaymentUpdateSheet } from "./payment-update-sheet";

interface PaymentActionMenuProps {
  payment: ModelsPaymentResponse;
  isAdmin?: boolean;
  trigger?: ReactNode;
  showViewButton?: boolean;
  align?: "center" | "start" | "end";
}

type DialogKey = "confirm" | "setStatus" | "update" | "delete";

export function PaymentActionMenu( {
  payment,
  isAdmin,
  trigger,
  showViewButton = true,
  align = "end",
}: PaymentActionMenuProps ) {
  const t = useTranslations( 'dashboard.common' );
  const [ viewOpen, setViewOpen ] = useState( false );
  const [ openDialog, setOpenDialog ] = useState<DialogKey | null>( null );
  const [ deleteConfirmation, setDeleteConfirmation ] = useState( '' );

  const paymentId = payment.id || '';
  const paymentLabel = payment.reference || payment.payment_id || payment.id || '';

  useEffect( () => {
    if ( !openDialog ) {
      setDeleteConfirmation( '' );
      return;
    }

    setDeleteConfirmation( '' );
  }, [ openDialog ] );

  const { mutate: updatePaymentStatus, isPending: isUpdatingStatus } = useUpdatePaymentStatus( {
    onSuccess: () => {
      toast.success( t( 'payments.actions.statusSuccess' ) );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( t( 'payments.actions.statusError' ) );
    },
  } );

  const { mutate: updatePayment, isPending: isUpdatingPayment } = useUpdatePayment( {
    onSuccess: () => {
      toast.success( t( 'payments.actions.updateSuccess' ) );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( t( 'payments.actions.updateError' ) );
    },
  } );

  const { mutate: deletePayment, isPending: isDeletingPayment } = useDeletePayment( {
    onSuccess: () => {
      toast.success( t( 'payments.actions.deleteSuccess' ) );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( t( 'payments.actions.deleteError' ) );
    },
  } );

  const handleMissingId = () => {
    if ( paymentId ) return false;
    toast.error( t( 'payments.actions.missingPaymentId' ) );
    return true;
  };

  const handleConfirm = () => {
    if ( handleMissingId() ) return;

    updatePaymentStatus( {
      id: paymentId,
      request: { payment_status: 'completed' },
    } );
  };

  const handlePaymentUpdate = ( request: ModelsUpdatePaymentRequest ) => {
    if ( handleMissingId() ) return;

    updatePayment( {
      id: paymentId,
      request,
    } );
  };

  const handleStatusUpdate = ( request: ModelsUpdatePaymentStatusRequest ) => {
    if ( handleMissingId() ) return;

    updatePaymentStatus( {
      id: paymentId,
      request,
    } );
  };

  const handleDelete = () => {
    if ( handleMissingId() ) return;
    deletePayment( paymentId );
  };

  const actions: MenuAction<ModelsPaymentResponse>[] = [
    ...( isAdmin ? [
      {
        label: t( 'payments.actions.setStatus' ),
        action: () => setOpenDialog( 'setStatus' ),
      } as MenuAction<ModelsPaymentResponse>,
      {
        label: t( 'payments.actions.update' ),
        icon: Pencil,
        action: () => setOpenDialog( 'update' ),
      } as MenuAction<ModelsPaymentResponse>,
      // {
      //   label: t( 'payments.actions.confirmPayout' ),
      //   action: () => setOpenDialog( 'confirm' ),
      //   condition: ( current: ModelsPaymentResponse ) => current.payment_status !== 'completed',
      // } as MenuAction<ModelsPaymentResponse>,
      {
        label: t( 'delete' ),
        icon: Trash2,
        action: () => setOpenDialog( 'delete' ),
        variant: 'destructive',
        className: 'text-destructive focus:text-destructive',
      } as MenuAction<ModelsPaymentResponse>,
    ] : [] ),
  ];

  const confirmDescription = (
    <>
      { t( 'payments.actions.confirmDescription' ) }
      { payment.creator_name ? <> { t( 'payments.actions.confirmDescriptionWithCreator', { creator: payment.creator_name } ) }</> : '' }?
      { ' ' }{ t( 'payments.actions.confirmDescriptionSuffix' ) }
    </>
  );

  const deleteDescription = t( 'payments.actions.deleteDescription' );

  const deletePlaceholder = paymentLabel
    ? t( 'payments.actions.deleteConfirmPlaceholder', { reference: paymentLabel } )
    : '';

  const handleDialogChange = ( open: boolean ) => {
    if ( !open ) {
      setOpenDialog( null );
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <ButtonGroup>
          { showViewButton && (
            <Button
              variant="outline"
              size="sm"
              className="font-regular gap-1.5"
              onClick={ () => setViewOpen( true ) }
            >
              { t( 'payments.actions.view' ) }
            </Button>
          ) }
          <ActionMenu
            actions={ actions }
            data={ payment }
            align={ align }
            label=""
            trigger={
              trigger || (
                <Button variant="outline" size="icon-sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )
            }
          />
        </ButtonGroup>
      </div>

      { showViewButton && <PaymentDetailsSheet payment={ payment } open={ viewOpen } onOpenChange={ setViewOpen } isAdmin={ isAdmin } /> }

      <ConfirmDialog
        open={ openDialog === 'confirm' }
        onOpenChange={ handleDialogChange }
        title={ t( 'payments.actions.confirmTitle' ) }
        description={ confirmDescription }
        confirmLabel={ t( 'payments.actions.confirmPayout' ) }
        loadingText={ t( 'payments.actions.confirming' ) }
        isLoading={ isUpdatingStatus }
        onConfirm={ handleConfirm }
      />

      <PaymentStatusDialog
        open={ openDialog === 'setStatus' }
        onOpenChange={ handleDialogChange }
        payment={ payment }
        isSubmitting={ isUpdatingStatus }
        onSubmit={ handleStatusUpdate }
      />

      <PaymentUpdateSheet
        open={ openDialog === 'update' }
        onOpenChange={ handleDialogChange }
        payment={ payment }
        isSubmitting={ isUpdatingPayment }
        onSubmit={ handlePaymentUpdate }
      />

      <ConfirmDialog
        open={ openDialog === 'delete' }
        onOpenChange={ handleDialogChange }
        title={ t( 'payments.actions.deleteTitle' ) }
        description={ deleteDescription }
        confirmLabel={ t( 'delete' ) }
        loadingText={ t( 'payments.actions.deleting' ) }
        isLoading={ isDeletingPayment }
        onConfirm={ handleDelete }
        confirmDisabled={ !!paymentLabel && deleteConfirmation.trim() !== paymentLabel.trim() }
        variant="destructive"
      >
        { paymentLabel ? (
          <div className="grid gap-3">
            <p className="text-sm text-muted-foreground">{ deletePlaceholder }</p>
            <SuperField
              type="text"
              value={ deleteConfirmation }
              onChange={ ( e ) => setDeleteConfirmation( e.target.value ) }
              placeholder={ deletePlaceholder }
              aria-label={ deletePlaceholder }
            />
          </div>
        ) : null }
      </ConfirmDialog>
    </>
  );
}
