"use client";

import { SubmissionViewDialog } from "@/components/campaigns/submission-view-dialog";
import { Button } from "@/components/dashboard-ui/button";
import { Dialog, DialogContent } from "@/components/dashboard-ui/dialog";
import { InvoiceDetailsSheet } from "@/components/invoices/invoice-details-sheet";
import type { ModelsNotificationResponse } from "@/lib/api/generated";
import type { ModelsInvoiceResponse } from "@/lib/api/generated/models";
import { useVideoSubmission } from "@/lib/api/hooks/video-submissions";
import { useAuth } from "@/lib/auth/auth-context";
import { resolveNotificationAction } from "@/lib/notification-utils";
import { useBasePath } from "@/lib/providers/path-provider";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function useNotificationAction(notification: ModelsNotificationResponse) {
  const { user } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const basePath = useBasePath();
  const [ invoiceOpen, setInvoiceOpen ] = useState( false );
  const [ submissionOpen, setSubmissionOpen ] = useState( false );

  const action = useMemo(
    () => resolveNotificationAction( notification, user?.role, locale, basePath ),
    [ basePath, locale, notification, user?.role ]
  );

  const { data: submissionResponse, isLoading: isSubmissionLoading } = useVideoSubmission(
    action.kind === "submission-dialog" ? action.submissionId || "" : "",
    {
      enabled: action.kind === "submission-dialog" && submissionOpen && !!action.submissionId,
    }
  );

  const invoice = useMemo<ModelsInvoiceResponse | null>( () => {
    if ( action.kind !== "invoice-sheet" || !action.invoiceId ) return null;
    return { id: action.invoiceId };
  }, [ action ] );

  const handleAction = useCallback( () => {
    switch ( action.kind ) {
      case "invoice-sheet":
        setInvoiceOpen( true );
        break;
      case "submission-dialog":
        setSubmissionOpen( true );
        break;
      case "internal-route":
        if ( action.href ) {
          router.push( action.href );
        }
        break;
      case "external-url":
        if ( action.href ) {
          window.open( action.href, "_blank", "noopener,noreferrer" );
        }
        break;
      default:
        break;
    }
  }, [ action, router ] );

  const overlay = (
    <>
      { action.kind === "invoice-sheet" && invoice && (
        <InvoiceDetailsSheet
          invoice={ invoice }
          open={ invoiceOpen }
          onOpenChange={ setInvoiceOpen }
        />
      ) }

      { action.kind === "submission-dialog" && action.submissionId && (
        submissionResponse?.data ? (
          <SubmissionViewDialog
            open={ submissionOpen }
            onOpenChange={ setSubmissionOpen }
            submission={ submissionResponse.data }
          />
        ) : (
          <Dialog open={ submissionOpen } onOpenChange={ setSubmissionOpen }>
            <DialogContent className="flex min-h-48 items-center justify-center">
              { isSubmissionLoading ? (
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              ) : (
                <Button variant="outline" onClick={ () => setSubmissionOpen( false ) }>
                  Close
                </Button>
              ) }
            </DialogContent>
          </Dialog>
        )
      ) }
    </>
  );

  return {
    action,
    handleAction,
    overlay,
  };
}
