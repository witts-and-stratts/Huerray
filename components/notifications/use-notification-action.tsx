"use client";

import { GigDetailsSheet } from "@/components/campaigns/gig-details-sheet";
import { SubmissionViewDialog } from "@/components/campaigns/submission-view-dialog";
import { Button } from "@/components/dashboard-ui/button";
import { Dialog, DialogContent } from "@/components/dashboard-ui/dialog";
import { InvoiceDetailsSheet } from "@/components/invoices/invoice-details-sheet";
import type { ModelsNotificationResponse } from "@/lib/api/generated";
import type { ModelsInvoiceResponse } from "@/lib/api/generated/models";
import { useGig } from "@/lib/api/hooks/gigs";
import { useVideoSubmission } from "@/lib/api/hooks/video-submissions";
import { useAuth } from "@/lib/auth/auth-context";
import { resolveNotificationAction } from "@/lib/notification-utils";
import { useBasePath } from "@/lib/providers/path-provider";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export function useNotificationAction(notification: ModelsNotificationResponse) {
  const { user } = useAuth();
  const locale = useLocale();
  const t = useTranslations( "dashboard.notifications" );
  const router = useRouter();
  const basePath = useBasePath();
  const [ invoiceOpen, setInvoiceOpen ] = useState( false );
  const [ gigOpen, setGigOpen ] = useState( false );
  const [ submissionOpen, setSubmissionOpen ] = useState( false );

  const action = useMemo(
    () => {
      const resolvedAction = resolveNotificationAction( notification, user?.role, locale, basePath );
      return {
        ...resolvedAction,
        label: t( `actions.${ resolvedAction.labelKey }` ),
      };
    },
    [ basePath, locale, notification, t, user?.role ]
  );

  const { data: submissionResponse, isLoading: isSubmissionLoading } = useVideoSubmission(
    action.kind === "submission-dialog" ? action.submissionId || "" : "",
    {
      enabled: action.kind === "submission-dialog" && submissionOpen && !!action.submissionId,
    }
  );

  const { data: gigResponse, isLoading: isGigLoading } = useGig(
    action.kind === "gig-sheet" ? action.gigId || "" : "",
    {
      enabled: action.kind === "gig-sheet" && gigOpen && !!action.gigId,
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
      case "gig-sheet":
        setGigOpen( true );
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

      { action.kind === "gig-sheet" && action.gigId && (
        gigResponse?.data ? (
          <GigDetailsSheet
            gig={ gigResponse.data }
            open={ gigOpen }
            onOpenChange={ setGigOpen }
          />
        ) : (
          <Dialog open={ gigOpen } onOpenChange={ setGigOpen }>
            <DialogContent className="flex min-h-48 items-center justify-center">
              { isGigLoading ? (
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              ) : (
                <Button variant="outline" onClick={ () => setGigOpen( false ) }>
                  { t( "actions.close" ) }
                </Button>
              ) }
            </DialogContent>
          </Dialog>
        )
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
                  { t( "actions.close" ) }
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
