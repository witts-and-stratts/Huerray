"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Ban, CheckCircle, ChevronDown, Download, Mail } from "lucide-react";
import { ReactNode } from "react";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Input } from "@/components/dashboard-ui/input";
import { ModelsInvoiceResponse, UtilsInvoiceStatus } from "@/lib/api/generated/models";
import { useDownloadInvoicePdf, useResendInvoicePdf, useUpdateInvoiceStatus } from "@/lib/api/hooks/invoices";
import { InvoiceDetailsSheet } from "./invoice-details-sheet";
import { ButtonGroup } from "../dashboard-ui/button-group";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';

interface InvoiceActionMenuProps {
  invoice: ModelsInvoiceResponse;
  trigger?: ReactNode;
  showViewButton?: boolean;
  bareTrigger?: boolean;
}

type DialogKey = 'invoicePaid' | 'cancelInvoice';

export function InvoiceActionMenu( { invoice, trigger, showViewButton = true, bareTrigger = false }: InvoiceActionMenuProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const [ viewOpen, setViewOpen ] = useState( false );
  const [ openDialog, setOpenDialog ] = useState<DialogKey | null>( null );
  const [ cancelConfirmation, setCancelConfirmation ] = useState( '' );
  const invoiceTitle = invoice.invoice_number || invoice.campaign_name || t( 'details.invoiceFallback' );

  const { mutate: downloadPdf, isPending: isPdfPending } = useDownloadInvoicePdf( {
    onSuccess: ( blob ) => {
      const objectUrl = URL.createObjectURL( blob );
      const link = document.createElement( "a" );
      link.href = objectUrl;
      link.download = `invoice-${ invoice.invoice_number || invoice.id || 'document' }.pdf`;
      document.body.appendChild( link );
      link.click();
      link.remove();
      URL.revokeObjectURL( objectUrl );
    },
    onError: () => {
      toast.error( t( 'actions.downloadPdfError' ) );
    },
  } );

  const { mutate: resendInvoicePdf, isPending: isResendPending } = useResendInvoicePdf( {
    onSuccess: () => {
      toast.success( t( 'actions.resendInvoiceSuccess' ) );
    },
    onError: ( error ) => {
      const message = error instanceof AxiosError
        ? ( error.response?.data as { message?: string; error?: string; } | undefined )?.message
        || ( error.response?.data as { message?: string; error?: string; } | undefined )?.error
        : undefined;

      toast.error( message || t( 'actions.resendInvoiceError' ) );
    },
  } );

  const { mutate: updateInvoiceStatusAction, isPending: isStatusActionPending } = useUpdateInvoiceStatus( {
    onSuccess: () => {
      toast.success( t( 'actions.invoiceUpdatedSuccess' ) );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( t( 'actions.invoiceUpdatedError' ) );
    },
  } );

  const handleInvoiceStatusUpdate = ( invoiceStatus: UtilsInvoiceStatus ) => {
    if ( invoice.id ) updateInvoiceStatusAction( { id: invoice.id, request: { invoice_status: invoiceStatus } } );
  };

  const handleMarkAsPaid = () => {
    if ( invoice.id ) {
      updateInvoiceStatusAction( {
        id: invoice.id,
        request: {
          invoice_status: 'paid',
          paid_date: new Date().toISOString(),
        },
      } );
    }
  };

  const actions: MenuAction<ModelsInvoiceResponse>[] = [
    {
      label: isPdfPending ? t( 'actions.downloadingPdf' ) : t( 'actions.downloadPdf' ),
      icon: Download,
      disabled: isPdfPending,
      action: ( inv ) => {
        if ( inv.id ) downloadPdf( inv.id );
      },
    },
    {
      label: isResendPending ? t( 'actions.resendingInvoice' ) : t( 'actions.resendInvoice' ),
      icon: Mail,
      disabled: isResendPending,
      action: ( inv ) => {
        if ( inv.id ) resendInvoicePdf( inv.id );
      },
    },
    {
      label: t( 'dialogs.invoicePaid.confirmLabel' ),
      icon: CheckCircle,
      action: () => setOpenDialog( 'invoicePaid' ),
      condition: ( current ) => current.invoice_status !== 'paid' && current.invoice_status !== 'cancelled',
      allowedRoles: [ 'admin' ],
    },
    {
      label: t( 'actions.cancelInvoice' ),
      icon: Ban,
      action: () => setOpenDialog( 'cancelInvoice' ),
      className: "text-destructive focus:text-destructive",
      condition: () => invoice.invoice_status !== 'cancelled',
      allowedRoles: [ 'admin' ]
    },
  ];

  const triggerMenu = (
    <ActionMenu
      actions={ actions }
      data={ invoice }
      align="end"
      label=""
      trigger={
        trigger || (
          <Button variant="outline" size="icon-sm">
            <ChevronDown className="h-4 w-4" />
          </Button>
        )
      }
    />
  );

  return (
    <>
      { bareTrigger ? (
        triggerMenu
      ) : (
        <div className="flex justify-end">
          <ButtonGroup>
            { showViewButton && (
              <Button
                variant="outline"
                size="sm"
                className="font-regular gap-1.5"
                onClick={ () => setViewOpen( true ) }
              >
                { t( 'actions.view' ) }
              </Button>
            ) }
            { triggerMenu }
          </ButtonGroup>
        </div>
      ) }

      { showViewButton && <InvoiceDetailsSheet invoice={ invoice } open={ viewOpen } onOpenChange={ setViewOpen } /> }

      <ConfirmDialog
        open={ openDialog === 'invoicePaid' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title={ t( 'dialogs.invoicePaid.title' ) }
        description={ t( 'dialogs.invoicePaid.description' ) }
        confirmLabel={ t( 'dialogs.invoicePaid.confirmLabel' ) }
        onConfirm={ handleMarkAsPaid }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.invoicePaid.loading' ) }
      />

      <ConfirmDialog
        open={ openDialog === 'cancelInvoice' }
        onOpenChange={ ( open ) => {
          if ( !open ) {
            setOpenDialog( null );
            setCancelConfirmation( '' );
          }
        } }
        title={ t( 'dialogs.cancelInvoice.title' ) }
        description={
          <>
            { t( 'dialogs.cancelInvoice.description' ) }{ " " }
            <span className="font-semibold text-foreground">{ invoiceTitle }</span>.
          </>
        }
        confirmLabel={ t( 'dialogs.cancelInvoice.confirmLabel' ) }
        onConfirm={ () => handleInvoiceStatusUpdate( 'cancelled' ) }
        confirmDisabled={ cancelConfirmation.trim() !== invoiceTitle.trim() }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.cancelInvoice.loading' ) }
        variant="destructive"
      >
        <Input
          value={ cancelConfirmation }
          onChange={ ( e ) => setCancelConfirmation( e.target.value ) }
          placeholder={ t( 'dialogs.cancelInvoice.confirmInvoiceTitle' ) }
          aria-label={ t( 'dialogs.cancelInvoice.confirmInvoiceTitle' ) }
        />
      </ConfirmDialog>
    </>
  );
}
