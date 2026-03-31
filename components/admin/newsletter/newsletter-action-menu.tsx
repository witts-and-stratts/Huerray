"use client";

import * as React from "react";
import { type ReactNode } from "react";
import { BellOff, BellRing, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { ActionMenu, type MenuAction } from "@/components/dashboard-ui/action-menu";
import { type NewsletterEntry, useResubscribeNewsletterEntry, useUnsubscribeNewsletterEntry } from "@/lib/api/hooks/newsletter";

interface NewsletterActionMenuProps {
  entry: NewsletterEntry;
  trigger: ReactNode;
}

export function NewsletterActionMenu( {
  entry,
  trigger,
}: NewsletterActionMenuProps ) {
  const t = useTranslations( "dashboard.admin" );
  const unsubscribeEntry = useUnsubscribeNewsletterEntry();
  const resubscribeEntry = useResubscribeNewsletterEntry();

  const actions = React.useMemo<MenuAction<NewsletterEntry>[]>( () => [
    {
      label: t( "newsletterPage.actions.resubscribe" ),
      icon: BellRing,
      condition: ( item ) => [ "unsubscribed", "inactive" ].includes( item.status?.toLowerCase() ?? "" ),
      action: ( item ) => {
        const email = item.email;

        if ( !email ) {
          toast.info( t( "newsletterPage.messages.unsubscribeEmailMissing" ) );
          return;
        }

        resubscribeEntry.mutate( {
          email,
          first_name: item.first_name ?? undefined,
          last_name: item.last_name ?? undefined,
        }, {
          onSuccess: () => {
            toast.success( t( "newsletterPage.messages.resubscribed" ) );
          },
          onError: ( error: Error ) => {
            toast.error( error.message || t( "newsletterPage.messages.resubscribeFailed" ) );
          },
        } );
      },
      disabled: () => resubscribeEntry.isPending,
    },
    {
      label: t( "newsletterPage.actions.unsubscribe" ),
      icon: BellOff,
      condition: ( item ) => ![ "unsubscribed", "inactive" ].includes( item.status?.toLowerCase() ?? "" ),
      action: ( item ) => {
        const email = item.email;

        if ( !email ) {
          toast.info( t( "newsletterPage.messages.unsubscribeEmailMissing" ) );
          return;
        }

        unsubscribeEntry.mutate( email, {
          onSuccess: () => {
            toast.success( t( "newsletterPage.messages.unsubscribed" ) );
          },
          onError: ( error: Error ) => {
            toast.error( error.message || t( "newsletterPage.messages.unsubscribeFailed" ) );
          },
        } );
      },
      disabled: () => unsubscribeEntry.isPending,
    },
    {
      label: t( "newsletterPage.actions.delete" ),
      icon: Trash2,
      separator: true,
      variant: "destructive",
      action: () => {
        toast.info( t( "newsletterPage.messages.endpointMissing" ) );
      },
    },
  ], [ t, unsubscribeEntry ] );

  return (
    <ActionMenu
      actions={ actions }
      data={ entry }
      trigger={ trigger }
      label={ t( "newsletterPage.actions.more" ) }
    />
  );
}
