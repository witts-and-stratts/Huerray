"use client";

import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { UtilsGigApplicationStatus } from '@/lib/api/generated/models/utils-gig-application-status';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useUpdateApplicationStatus } from '@/lib/api/hooks/gigs';
import { MoreVertical } from 'lucide-react';
import React, { ReactNode } from 'react';
import { toast } from 'sonner';
import { SentenceCase } from '../text-case';

interface ApplicationActionMenuProps {
  application: ModelsGigApplicationResponse;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
}

export function ApplicationActionMenu( {
  application,
  trigger,
  align = "end",
}: ApplicationActionMenuProps ) {
  const updateStatus = useUpdateApplicationStatus();
  const [ acceptDialogOpen, setAcceptDialogOpen ] = React.useState( false );
  const [ declineDialogOpen, setDeclineDialogOpen ] = React.useState( false );

  const handleUpdateStatus = ( status: UtilsGigApplicationStatus ) => {
    if ( !application.id ) return;

    updateStatus.mutate(
      {
        applicationId: application.id,
        request: { application_status: status },
      },
      {
        onSuccess: () => {
          toast.success(
            status === UtilsGigApplicationStatus.ApplicationStatusAccepted
              ? "Application accepted"
              : "Application declined",
            { richColors: true }
          );
          setAcceptDialogOpen( false );
          setDeclineDialogOpen( false );
        },
        onError: ( error ) => {
          console.log( "Error", error );
          toast.error( "Failed to update application status", {
            description: <SentenceCase>{ error.response?.data?.error?.message! }</SentenceCase>,
            richColors: true,
          } );
        },
      }
    );
  };

  const isPending = application.status === 'pending';

  const actions: MenuAction<ModelsGigApplicationResponse>[] = [
    {
      label: "Accept",
      action: () => setAcceptDialogOpen( true ),
      condition: () => isPending,
      allowedRoles: [ "brand" ],
    },
    {
      label: "Decline",
      action: () => setDeclineDialogOpen( true ),
      condition: () => isPending,
      allowedRoles: [ "brand" ],
      className: "text-destructive focus:text-destructive",
    },
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ application }
        align={ align }
        trigger={
          trigger || (
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-5" strokeWidth={ 1 } />
            </Button>
          )
        }
      />

      <ConfirmDialog
        open={ acceptDialogOpen }
        onOpenChange={ setAcceptDialogOpen }
        title="Accept Application"
        description="Are you sure you want to accept this application? The creator will be notified and can start working on the gig."
        confirmLabel="Accept"
        onConfirm={ () => handleUpdateStatus( UtilsGigApplicationStatus.ApplicationStatusAccepted ) }
        isLoading={ updateStatus.isPending }
        loadingText="Accepting..."
      />

      <ConfirmDialog
        open={ declineDialogOpen }
        onOpenChange={ setDeclineDialogOpen }
        title="Decline Application"
        description="Are you sure you want to decline this application? This action cannot be undone."
        confirmLabel="Decline"
        onConfirm={ () => handleUpdateStatus( UtilsGigApplicationStatus.ApplicationStatusDeclined ) }
        isLoading={ updateStatus.isPending }
        loadingText="Declining..."
        variant="destructive"
      />
    </>
  );
}
