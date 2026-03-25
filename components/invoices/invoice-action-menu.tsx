"use client";

import { useState } from "react";
import { Ban, CheckCircle, ChevronDown, Download, Eye, FileCheck, MoreVertical, Send, Wallet } from "lucide-react";
import { SuperField } from "@/components/dashboard-ui/super-field";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { ModelsInvoiceResponse, UtilsInvoiceStatus } from "@/lib/api/generated/models";
import { useGenerateInvoicePdf, useUpdateInvoiceStatus } from "@/lib/api/hooks/invoices";
import { InvoiceDetailsSheet } from "./invoice-details-sheet";
import { ButtonGroup } from "../dashboard-ui/button-group";
import { BASE_URL } from "@/lib/api/client";
import { toast } from "sonner";
import { useTranslations } from 'next-intl';

interface InvoiceActionMenuProps {
  invoice: ModelsInvoiceResponse;
}

type DialogKey = 'generatePayment' | 'issueInvoice' | 'sendInvoice' | 'invoicePaid' | 'cancelInvoice';

export function InvoiceActionMenu( { invoice }: InvoiceActionMenuProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const [ viewOpen, setViewOpen ] = useState( false );
  const [ openDialog, setOpenDialog ] = useState<DialogKey | null>( null );
  const [ paymentNotes, setPaymentNotes ] = useState( 'Payment made' );

  const { mutate: generatePdf, isPending: isPdfPending } = useGenerateInvoicePdf( {
    onSuccess: ( data ) => {
      const pdfPath = data?.data?.pdf_path;
      if ( pdfPath ) window.open( `${ BASE_URL }/${ pdfPath }`, "_blank" );
    },
  } );

  const { mutate: updateInvoiceStatus, isPending: isInvoiceStatusPending } = useUpdateInvoiceStatus( {
    onSuccess: () => {
      toast.success( t( 'actions.paymentGeneratedSuccess' ) );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( t( 'actions.paymentGeneratedError' ) );
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

  const actions: MenuAction<ModelsInvoiceResponse>[] = [
    {
      label: isPdfPending ? t( 'actions.generatingPdf' ) : t( 'actions.downloadPdf' ),
      icon: Download,
      disabled: isPdfPending,
      action: ( inv ) => {
        if ( inv.id ) generatePdf( inv.id );
      },
    },
    // {
    //   label: "Generate payment",
    //   icon: Wallet,
    //   action: () => setOpenDialog( 'generatePayment' ),
    // },
    // {
    //   label: "Issue Invoice",
    //   icon: FileCheck,
    //   action: () => setOpenDialog( 'issueInvoice' ),
    // },
    // {
    //   label: "Send Invoice",
    //   icon: Send,
    //   action: () => setOpenDialog( 'sendInvoice' ),
    // },
    // {
    //   label: "Invoice Paid",
    //   icon: CheckCircle,
    //   action: () => setOpenDialog( 'invoicePaid' ),
    // },
    {
      label: t( 'actions.cancelInvoice' ),
      icon: Ban,
      action: () => setOpenDialog( 'cancelInvoice' ),
      className: "text-destructive focus:text-destructive",
      condition: () => invoice.invoice_status !== 'cancelled',
    },
  ];

  return (
    <div className="flex justify-end">
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          className="font-regular gap-1.5"
          onClick={ () => setViewOpen( true ) }
        >
          { t( 'actions.view' ) }
        </Button>
        <ActionMenu
          actions={ actions }
          data={ invoice }
          align="end"
          label=""
          trigger={
            <Button variant="outline" size="icon-sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          }
        />
      </ButtonGroup>

      <InvoiceDetailsSheet invoice={ invoice } open={ viewOpen } onOpenChange={ setViewOpen } />

      <ConfirmDialog
        open={ openDialog === 'generatePayment' }
        onOpenChange={ ( open ) => { if ( !open ) { setOpenDialog( null ); setPaymentNotes( 'Payment made' ); } } }
        title={ t( 'dialogs.generatePayment.title' ) }
        description={ t( 'dialogs.generatePayment.description' ) }
        confirmLabel={ t( 'dialogs.generatePayment.confirmLabel' ) }
        onConfirm={ () => {
          if ( invoice.id ) updateInvoiceStatus( {
            id: invoice.id,
            request: {
              invoice_status: 'paid',
              due_date: invoice.due_date,
              notes: paymentNotes,
              paid_date: new Date().toISOString(),
            },
          } );
        } }
        isLoading={ isInvoiceStatusPending }
        loadingText={ t( 'dialogs.generatePayment.loading' ) }
      >
        <SuperField
          type="textarea"
          label={ t( 'dialogs.generatePayment.notes' ) }
          value={ paymentNotes }
          onChange={ ( e ) => setPaymentNotes( e.target.value ) }
          rows={ 3 }
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={ openDialog === 'issueInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title={ t( 'dialogs.issueInvoice.title' ) }
        description={ t( 'dialogs.issueInvoice.description' ) }
        confirmLabel={ t( 'dialogs.issueInvoice.confirmLabel' ) }
        onConfirm={ () => handleInvoiceStatusUpdate( 'issued' ) }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.issueInvoice.loading' ) }
      />

      <ConfirmDialog
        open={ openDialog === 'sendInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title={ t( 'dialogs.sendInvoice.title' ) }
        description={ t( 'dialogs.sendInvoice.description' ) }
        confirmLabel={ t( 'dialogs.sendInvoice.confirmLabel' ) }
        onConfirm={ () => handleInvoiceStatusUpdate( 'sent' ) }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.sendInvoice.loading' ) }
      />

      <ConfirmDialog
        open={ openDialog === 'invoicePaid' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title={ t( 'dialogs.invoicePaid.title' ) }
        description={ t( 'dialogs.invoicePaid.description' ) }
        confirmLabel={ t( 'dialogs.invoicePaid.confirmLabel' ) }
        onConfirm={ () => handleInvoiceStatusUpdate( 'paid' ) }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.invoicePaid.loading' ) }
      />

      <ConfirmDialog
        open={ openDialog === 'cancelInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title={ t( 'dialogs.cancelInvoice.title' ) }
        description={ t( 'dialogs.cancelInvoice.description' ) }
        confirmLabel={ t( 'dialogs.cancelInvoice.confirmLabel' ) }
        onConfirm={ () => handleInvoiceStatusUpdate( 'cancelled' ) }
        isLoading={ isStatusActionPending }
        loadingText={ t( 'dialogs.cancelInvoice.loading' ) }
        variant="destructive"
      />
    </div>
  );
}
