"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { ModelsGigResponse } from "@/lib/api/generated/models";
import { UtilsGigStatus } from "@/lib/api/generated/models/utils-gig-status";
import { useDeleteGig, useUpdateGigStatus } from "@/lib/api/hooks/gigs";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { useBasePath } from "@/lib/providers/path-provider";

interface GigActionMenuProps {
  gig: ModelsGigResponse;
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void;
  trigger?: 'icon' | 'button' | React.ReactNode;
  onEditGig?: ( gig: ModelsGigResponse ) => void;
}

export function GigActionMenu( {
  gig,
  onViewGig,
  trigger = 'button',
  onEditGig,
}: GigActionMenuProps ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  const basePath = useBasePath();
  const router = useRouter();
  const { mutate: updateStatus } = useUpdateGigStatus();
  const { mutate: deleteGig, isPending: isDeleting } = useDeleteGig();
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );
  const [ confirmName, setConfirmName ] = useState( '' );

  const handleConfirmDelete = () => {
    if ( !gig.id || confirmName !== gig.title ) return;
    deleteGig( gig.id, {
      onSuccess: () => {
        toast.success( t( 'actions.deletedGig' ), {
          richColors: true,
        } );
        setIsDeleteDialogOpen( false );
      },
      onError: ( error ) => {
        toast.error( t( 'actions.deleteFailed' ), { richColors: true } );
        console.error( error );
      },
    } );
  };

  const handleApproveGig = () => {
    if ( !gig.id ) {
      toast.error( t( 'actions.missingId' ) );
      return;
    }
    updateStatus(
      { id: gig.id, status: { gig_status: UtilsGigStatus.GigStatusOpen } },
      {
        onSuccess: () => toast.success( t( 'actions.approvedGig' ) ),
        onError: ( error ) => {
          toast.error( t( 'actions.approveFailed' ) );
          console.error( error );
        },
      }
    );
  };

  const handleValidateGig = () => {
    if ( !gig.id ) {
      toast.error( t( 'actions.missingId' ) );
      return;
    }
    updateStatus(
      { id: gig.id, status: { gig_status: UtilsGigStatus.GigStatusValidated } },
      {
        onSuccess: () => toast.success( t( 'actions.validatedGig' ) ),
        onError: ( error ) => {
          toast.error( t( 'actions.validateFailed' ) );
          console.error( error );
        },
      }
    );
  };

  const actions: MenuAction<ModelsGigResponse>[] = [
    {
      label: t( 'actions.viewGig' ),
      action: () => onViewGig( gig ),
    },
    {
      label: t( 'actions.editGig' ),
      action: () => onEditGig
        ? onEditGig( gig )
        : router.push( `${ basePath }/campaigns/${ gig.campaign_id }/gigs/${ gig.id }/edit` ),
      allowedRoles: [ 'admin' ],
    },
    // {
    //   label: "Approve Gig",
    //   action: handleApproveGig,
    //   allowedRoles: [ 'admin' ],
    //   condition: () => gig.gig_status === UtilsGigStatus.GigStatusDraft || gig.gig_status === UtilsGigStatus.GigStatusInProgress,
    // },
    {
      label: t( 'actions.validateGig' ),
      action: handleValidateGig,
      allowedRoles: [ 'admin' ],
      condition: () => gig.gig_status === UtilsGigStatus.GigStatusDraft
    },
    {
      label: t( 'actions.submissions' ),
      action: () => onViewGig( gig, 'submissions' ),
      allowedRoles: [ 'admin', 'brand' ],
      condition: () => gig.gig_status === UtilsGigStatus.GigStatusOpen
    },
    {
      label: t( 'actions.mySubmissions' ),
      action: () => onViewGig( gig, 'submissions' ),
      allowedRoles: [ 'creator' ],
      condition: () => gig.gig_status === UtilsGigStatus.GigStatusOpen
    },
    {
      label: t( 'actions.deleteGig' ),
      action: () => { setIsDeleteDialogOpen( true ); setConfirmName( '' ); },
      allowedRoles: [ 'admin' ],
      variant: 'destructive',
      separator: true,
    },
  ];

  const triggerNode =
    trigger === 'icon' ? (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
        <EllipsisVertical className="size-5" strokeWidth={ 1 } />
        <span className="sr-only">{ t( 'actions.openMenu' ) }</span>
      </Button>
    ) : trigger === 'button' ? (
      <Button variant="outline" size="sm" className="font-regular">
        <ChevronDown className="h-4 w-4" />
      </Button>
    ) : (
      trigger as React.ReactNode
    );

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ gig }
        trigger={ triggerNode }
      />

      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        title={ t( 'actions.deleteGigTitle' ) }
        description={
          <>
            { t( 'actions.deleteGigDescription' ) } <strong>{ gig.title }</strong> { t( 'actions.deleteGigDescriptionSuffix' ) }
          </>
        }
        confirmLabel={ isDeleting ? t( 'actions.deletingGig' ) : t( 'actions.deleteGig' ) }
        onConfirm={ handleConfirmDelete }
        confirmDisabled={ confirmName !== gig.title }
        isLoading={ isDeleting }
        variant="destructive"
      >
        <div className="grid gap-2">
          <SuperField
            type="text"
            name="confirm-name"
            value={ confirmName }
            onChange={ ( e ) => setConfirmName( e.target.value ) }
            placeholder={ t( 'actions.confirmGigName' ) }
          />
        </div>
      </ConfirmDialog>
    </>
  );
}
