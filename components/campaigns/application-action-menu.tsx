"use client";

import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { UtilsGigApplicationStatus } from '@/lib/api/generated/models/utils-gig-application-status';
import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useExpireGigApplication, useUpdateApplicationStatus } from '@/lib/api/hooks/gigs';
import { MoreVertical } from 'lucide-react';
import React, { ReactNode } from 'react';
import { toast } from 'sonner';
import { SentenceCase } from '../text-case';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const updateStatus = useUpdateApplicationStatus();
  const expireApplication = useExpireGigApplication();
  const [ acceptDialogOpen, setAcceptDialogOpen ] = React.useState( false );
  const [ declineDialogOpen, setDeclineDialogOpen ] = React.useState( false );
  const [ expireDialogOpen, setExpireDialogOpen ] = React.useState( false );

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
              ? t( 'applicationAccepted' )
              : t( 'applicationDeclined' ),
            { richColors: true }
          );
          setAcceptDialogOpen( false );
          setDeclineDialogOpen( false );
        },
        onError: ( error ) => {
          console.log( "Error", error );
          toast.error( t( 'applicationStatusUpdateFailed' ), {
            description: <SentenceCase>{ error.response?.data?.error?.message! }</SentenceCase>,
            richColors: true,
          } );
        },
      }
    );
  };

  const isPending = application.status === 'pending';
  const isAccepted = application.status === 'accepted';

  const handleExpire = () => {
    if ( !application.id ) return;

    expireApplication.mutate(
      { applicationId: application.id },
      {
        onSuccess: () => {
          toast.success( t( 'applicationExpired' ), { richColors: true } );
          setExpireDialogOpen( false );
        },
        onError: ( error: any ) => {
          toast.error( t( 'applicationExpireFailed' ), {
            description: <SentenceCase>{ error.response?.data?.error?.message! }</SentenceCase>,
            richColors: true,
          } );
        },
      }
    );
  };

  const actions: MenuAction<ModelsGigApplicationResponse>[] = [
    {
      label: t( 'accept' ),
      action: () => setAcceptDialogOpen( true ),
      condition: () => isPending,
      allowedRoles: [ "brand" ],
    },
    {
      label: t( 'decline' ),
      action: () => setDeclineDialogOpen( true ),
      condition: () => isPending,
      allowedRoles: [ "brand" ],
      className: "text-destructive focus:text-destructive",
    },
    {
      label: t( 'expireApplication' ),
      action: () => setExpireDialogOpen( true ),
      condition: () => isAccepted,
      allowedRoles: [ "admin" ],
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
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white">
              <span className="sr-only">{ t( 'openMenu' ) }</span>
              <MoreVertical className="size-5" strokeWidth={ 1 } />
            </Button>
          )
        }
      />

      <ConfirmDialog
        open={ acceptDialogOpen }
        onOpenChange={ setAcceptDialogOpen }
        title={ t( 'acceptApplicationTitle' ) }
        description={ t( 'acceptApplicationDescription' ) }
        confirmLabel={ t( 'accept' ) }
        onConfirm={ () => handleUpdateStatus( UtilsGigApplicationStatus.ApplicationStatusAccepted ) }
        isLoading={ updateStatus.isPending }
        loadingText={ t( 'accepting' ) }
      />

      <ConfirmDialog
        open={ declineDialogOpen }
        onOpenChange={ setDeclineDialogOpen }
        title={ t( 'declineApplicationTitle' ) }
        description={ t( 'declineApplicationDescription' ) }
        confirmLabel={ t( 'decline' ) }
        onConfirm={ () => handleUpdateStatus( UtilsGigApplicationStatus.ApplicationStatusDeclined ) }
        isLoading={ updateStatus.isPending }
        loadingText={ t( 'declining' ) }
        variant="destructive"
      />

      <ConfirmDialog
        open={ expireDialogOpen }
        onOpenChange={ setExpireDialogOpen }
        title={ t( 'expireApplicationTitle' ) }
        description={ t( 'expireApplicationDescription' ) }
        confirmLabel={ t( 'expireApplication' ) }
        onConfirm={ handleExpire }
        isLoading={ expireApplication.isPending }
        loadingText={ t( 'expiringApplication' ) }
        variant="destructive"
      />
    </>
  );
}
