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

interface InvoiceActionMenuProps {
  invoice: ModelsInvoiceResponse;
}

type DialogKey = 'generatePayment' | 'issueInvoice' | 'sendInvoice' | 'invoicePaid' | 'cancelInvoice';

export function InvoiceActionMenu( { invoice }: InvoiceActionMenuProps ) {
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
      toast.success( "Payment generated successfully" );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( "Failed to generate payment" );
    },
  } );

  const { mutate: updateInvoiceStatusAction, isPending: isStatusActionPending } = useUpdateInvoiceStatus( {
    onSuccess: () => {
      toast.success( "Invoice updated successfully" );
      setOpenDialog( null );
    },
    onError: () => {
      toast.error( "Failed to update invoice" );
    },
  } );

  const handleInvoiceStatusUpdate = ( invoiceStatus: UtilsInvoiceStatus ) => {
    if ( invoice.id ) updateInvoiceStatusAction( { id: invoice.id, request: { invoice_status: invoiceStatus } } );
  };

  const actions: MenuAction<ModelsInvoiceResponse>[] = [
    {
      label: isPdfPending ? "Generating PDF..." : "Download PDF",
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
      label: "Cancel Invoice",
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
          View
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
        title="Generate payment"
        description="This will mark the invoice as paid and generate a payment record. This action cannot be undone."
        confirmLabel="Generate payment"
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
        loadingText="Generating..."
      >
        <SuperField
          type="textarea"
          label="Notes"
          value={ paymentNotes }
          onChange={ ( e ) => setPaymentNotes( e.target.value ) }
          rows={ 3 }
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={ openDialog === 'issueInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title="Issue Invoice"
        description="Mark this invoice as issued. The brand will be notified."
        confirmLabel="Issue Invoice"
        onConfirm={ () => handleInvoiceStatusUpdate( 'issued' ) }
        isLoading={ isStatusActionPending }
        loadingText="Issuing..."
      />

      <ConfirmDialog
        open={ openDialog === 'sendInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title="Send Invoice"
        description="Mark this invoice as sent to the brand."
        confirmLabel="Send Invoice"
        onConfirm={ () => handleInvoiceStatusUpdate( 'sent' ) }
        isLoading={ isStatusActionPending }
        loadingText="Sending..."
      />

      <ConfirmDialog
        open={ openDialog === 'invoicePaid' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title="Invoice Paid"
        description="Mark this invoice as paid by the brand."
        confirmLabel="Mark as Paid"
        onConfirm={ () => handleInvoiceStatusUpdate( 'paid' ) }
        isLoading={ isStatusActionPending }
        loadingText="Updating..."
      />

      <ConfirmDialog
        open={ openDialog === 'cancelInvoice' }
        onOpenChange={ ( open ) => !open && setOpenDialog( null ) }
        title="Cancel Invoice"
        description="Are you sure you want to cancel this invoice? This action cannot be undone."
        confirmLabel="Cancel Invoice"
        onConfirm={ () => handleInvoiceStatusUpdate( 'cancelled' ) }
        isLoading={ isStatusActionPending }
        loadingText="Cancelling..."
        variant="destructive"
      />
    </div>
  );
}
