"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Input } from "@/components/dashboard-ui/input";
import { ModelsCampaignResponse } from "@/lib/api/generated";
import { ModelsAdminCampaignApprovalRequestCampaignStatusEnum, ModelsCampaignStatusUpdateRequestCampaignStatusEnum, UtilsCampaignStatus } from "@/lib/api/generated/models";
import { useAdminCampaignApproval, useDeleteCampaign, useReplicateCampaign, useSubmitCampaign, useUpdateCampaignStatus } from "@/lib/api/hooks/campaigns";
import { useCreateInvoice } from "@/lib/api/hooks/invoices";
import { ApiError } from "@/lib/api/hooks/types";
import { cn } from "@/lib/dashboard-utils";
import { useBasePath } from "@/lib/providers/path-provider";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { toast } from "sonner";
import { SentenceCase } from "../text-case";
import { CampaignDecisionDialog } from "./campaign-decision-dialog";
import { CampaignRenameDialog } from "./campaign-rename-dialog";
import { useTranslations } from "next-intl";

interface CampaignActionMenuProps {
  campaign: ModelsCampaignResponse;
  className?: string;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
  extraActions?: MenuAction<ModelsCampaignResponse>[];
  hideViewDetails?: boolean;
}

export function CampaignActionMenu( {
  campaign,
  className,
  trigger,
  align = "end",
  extraActions = [],
  hideViewDetails = false,
}: CampaignActionMenuProps ) {
  const actionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const pageT = useTranslations( 'dashboard.brand.campaignsPage' );
  const t = ( key: string, values?: Record<string, any> ) => (
    actionsT.has( key ) ? actionsT( key, values ) : pageT.has( key ) ? pageT( key, values ) : key
  );
  const basePath = useBasePath();
  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();
  const replicateCampaign = useReplicateCampaign();
  const approveCampaign = useAdminCampaignApproval();
  const submitCampaign = useSubmitCampaign();
  const updateCampaignStatus = useUpdateCampaignStatus();
  const createInvoice = useCreateInvoice();
  const [ approveDialogOpen, setApproveDialogOpen ] = React.useState( false );
  const [ adminComment, setAdminComment ] = React.useState( '' );
  const [ adminDecision, setAdminDecision ] = React.useState<'approve' | 'reject' | 'complete'>( 'approve' );
  const [ deleteDialogOpen, setDeleteDialogOpen ] = React.useState( false );
  const [ renameDialogOpen, setRenameDialogOpen ] = React.useState( false );
  const [ decisionDialogOpen, setDecisionDialogOpen ] = React.useState( false );
  const [ initialDecision, setInitialDecision ] = React.useState<'yes' | 'no'>( 'yes' );
  const [ invoiceDialogOpen, setInvoiceDialogOpen ] = React.useState( false );
  const [ deactivateDialogOpen, setDeactivateDialogOpen ] = React.useState( false );
  const [ reactivateDialogOpen, setReactivateDialogOpen ] = React.useState( false );
  const [ publishDialogOpen, setPublishDialogOpen ] = React.useState( false );

  const [ deleteConfirmation, setDeleteConfirmation ] = React.useState( '' );

  React.useEffect( () => {
    if ( !deleteDialogOpen ) {
      setDeleteConfirmation( '' );
    }
  }, [ deleteDialogOpen ] );

  const handleDelete = () => {
    if ( campaign.id && deleteConfirmation === campaign.campaign_name ) {
      deleteCampaign.mutate( campaign.id, {
        onSuccess: () => {
          toast.success( t( 'deletedCampaign' ) );
          setDeleteDialogOpen( false );
          if ( !hideViewDetails ) {
            router.push( basePath + "/campaigns" );
          } else {
            router.refresh();
          }
        },
        onError: () => {
          toast.error( t( 'deleteFailed' ), {
            description: t( 'tryAgainLater' ),
            richColors: true,
          } );
        }
      } );
    }
  };

  const handleAdminApproval = () => {
    if ( !campaign.id ) return;

    if ( adminDecision === 'complete' ) {
      updateCampaignStatus.mutate( {
        id: campaign.id,
        request: {
          campaign_status: ModelsCampaignStatusUpdateRequestCampaignStatusEnum.Completed,
        }
      }, {
        onSuccess: () => {
          toast.success( t( 'completedCampaign' ) );
          setApproveDialogOpen( false );
        },
        onError: () => {
          toast.error( t( 'completeFailed' ) );
        }
      } );
      return;
    }

    const isApprove = adminDecision === 'approve';
    approveCampaign.mutate( {
      id: campaign.id,
      request: {
        campaign_status: isApprove
          ? ModelsAdminCampaignApprovalRequestCampaignStatusEnum.GigsApproved
          : ModelsAdminCampaignApprovalRequestCampaignStatusEnum.Returned,
        admin_comments: adminComment || ( isApprove ? t( 'approvedByAdmin' ) : t( 'rejectedByAdmin' ) ),
        number_of_gigs_validated: isApprove ? true : undefined,
      }
    }, {
      onSuccess: () => {
        toast.success( isApprove ? t( 'approvedCampaign' ) : t( 'rejectedCampaign' ) );
        setApproveDialogOpen( false );
        setAdminComment( '' );
      },
      onError: ( err ) => {
        const error = err as ApiError;
        toast.error( isApprove ? t( 'approveFailed' ) : t( 'rejectFailed' ), {
          description: <SentenceCase>{ error.response?.data?.error?.message || t( 'tryAgainLater' ) }</SentenceCase>,
          richColors: true,
        } );
      }
    } );
  };

  const openAdminDecisionDialog = ( decision: 'approve' | 'reject' | 'complete' ) => {
    setAdminDecision( decision );
    setApproveDialogOpen( true );
  };

  const handleDecision = ( decision: 'yes' | 'no' ) => {
    setInitialDecision( decision );
    setDecisionDialogOpen( true );
  };

  const handleDeactivate = () => {
    if ( !campaign.id ) return;

    updateCampaignStatus.mutate( {
      id: campaign.id,
      request: {
        campaign_status: ModelsCampaignStatusUpdateRequestCampaignStatusEnum.Deactivated,
      }
    }, {
      onSuccess: () => {
        toast.success( t( 'deactivatedCampaign' ) );
        setDeactivateDialogOpen( false );
      },
      onError: () => {
        toast.error( t( 'deactivateFailed' ), {
          description: t( 'tryAgainLater' ),
          richColors: true,
        } );
      }
    } );
  };

  const handleReactivate = () => {
    if ( !campaign.id ) return;

    updateCampaignStatus.mutate( {
      id: campaign.id,
      request: {
        campaign_status: ModelsCampaignStatusUpdateRequestCampaignStatusEnum.Running,
      }
    }, {
      onSuccess: () => {
        toast.success( t( 'reactivatedCampaign' ) );
        setReactivateDialogOpen( false );
      },
      onError: () => {
        toast.error( t( 'reactivateFailed' ), {
          description: t( 'tryAgainLater' ),
          richColors: true,
        } );
      }
    } );
  };

  const handleCreateInvoice = () => {
    if ( campaign.id ) {
      createInvoice.mutate(
        { campaign_id: campaign.id },
        {
          onSuccess: () => {
            toast.success( t( 'invoiceCreated' ), {
              richColors: true,
            } );
            setInvoiceDialogOpen( false );
          },
          onError: ( err ) => {
            const error = err as ApiError;
            toast.error( t( 'invoiceFailed' ), {
              description: <SentenceCase>{ error.response?.data?.error?.message || t( 'tryAgainLater' ) }</SentenceCase>,
              richColors: true,
            } );
          },
        }
      );
    }
  };

  const handlePublishCampaign = async () => {
    if ( !campaign.id ) return;

    try {
      await submitCampaign.mutateAsync( campaign.id );
      toast.success( t( 'campaignPublished' ) );
      setPublishDialogOpen( false );
    } catch {
      toast.error( t( 'publishCampaignFailed' ) );
    }
  };

  const isCompleted = campaign.campaign_status === 'completed';
  const campaignStatus = campaign.campaign_status;

  const defaultActions: MenuAction<ModelsCampaignResponse>[] = [
    {
      label: t( 'viewDetails' ),
      href: `${ basePath }/campaigns/${ campaign.id }`,
      condition: () => !hideViewDetails,
    },
    {
      label: t( 'createGig' ),
      href: `${ basePath }/campaigns/${ campaign.id }/gigs/new`,
      allowedRoles: [ 'admin' ],
      condition: () => campaignStatus === 'pending_approval',
    },
    {
      label: t( 'edit' ),
      action: () => router.push( `${ basePath }/campaigns/${ campaign.id }/edit` ),
      allowedRoles: [ "brand" ],
      condition: () => !isCompleted && ( campaignStatus === "draft" || campaignStatus === "returned" ),
    },
    {
      label: t( 'publishCampaign' ),
      action: () => setPublishDialogOpen( true ),
      allowedRoles: [ "brand" ],
      condition: () => !isCompleted && ( campaignStatus === UtilsCampaignStatus.CampaignStatusDraft || campaignStatus === UtilsCampaignStatus.CampaignStatusReturned ),
    },
    {
      label: t( 'rename' ),
      action: () => setRenameDialogOpen( true ),
      allowedRoles: [ "brand" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusDraft || campaignStatus === UtilsCampaignStatus.CampaignStatusReturned,
    },
    {
      label: t( 'replicate' ),
      allowedRoles: [ "brand" ],
      condition: () => isCompleted,
      action: () => {
        if ( campaign.id ) {
          replicateCampaign.mutate( campaign.id, {
            onSuccess: () => toast.success( t( 'replicatedCampaign' ) ),
            onError: () => toast.error( t( 'replicateFailed' ) ),
          } );
        }
      },
    },
    {
      label: t( 'approveCampaign' ),
      action: () => openAdminDecisionDialog( 'approve' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted &&
        campaignStatus === UtilsCampaignStatus.CampaignStatusPendingApproval,
    },
    {
      label: t( 'rejectCampaign' ),
      action: () => openAdminDecisionDialog( 'reject' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted &&
        campaignStatus === UtilsCampaignStatus.CampaignStatusPendingApproval,
    },
    {
      label: t( 'completeCampaign' ),
      action: () => openAdminDecisionDialog( 'complete' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusRunning,
    },
    {
      label: t( 'acceptCampaign' ),
      action: () => handleDecision( 'yes' ),
      allowedRoles: [ 'brand' ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusGigsApproved,
    },
    {
      label: t( 'rejectCampaign' ),
      action: () => handleDecision( 'no' ),
      allowedRoles: [ 'brand' ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusGigsApproved,
    },
    {
      label: t( 'reactivate' ),
      action: () => setReactivateDialogOpen( true ),
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusDeactivated,
    },
    {
      label: t( 'createInvoice' ),
      action: () => setInvoiceDialogOpen( true ),
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusCompleted
    },
    {
      label: t( 'deactivate' ),
      action: () => setDeactivateDialogOpen( true ),
      className: "text-destructive focus:text-destructive",
      separator: true,
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus !== UtilsCampaignStatus.CampaignStatusDeactivated,
    },
    {
      label: t( 'delete' ),
      action: () => setDeleteDialogOpen( true ),
      className: "text-destructive focus:text-destructive",
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted,
    },
  ];

  const actions = [ ...extraActions, ...defaultActions ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ campaign }
        align={ align }
        trigger={
          trigger || (
            <Button
              variant="ghost"
              className={ cn( className, "px-1" ) }
              size="sm"
            >
              <span className="sr-only">{ t( 'openMenu' ) }</span>
              <MoreVertical className="size-5" strokeWidth={ 1 } />
            </Button>
          )
        }
      />
      { campaign.id && (
        <CampaignRenameDialog
          open={ renameDialogOpen }
          onOpenChange={ setRenameDialogOpen }
          campaignId={ campaign.id }
          currentName={ campaign.campaign_name || '' }
          onSuccess={ () => router.refresh() }
        />
      ) }
      <ConfirmDialog
        open={ publishDialogOpen }
        onOpenChange={ setPublishDialogOpen }
        title={ t( 'publishCampaignTitle' ) }
        description={ t( 'publishCampaignDescription' ) }
        confirmLabel={ t( 'publishCampaign' ) }
        cancelLabel={ t( 'cancel' ) }
        onConfirm={ handlePublishCampaign }
        isLoading={ submitCampaign.isPending }
        loadingText={ t( 'publishing' ) }
        variant="default"
      />

      <ConfirmDialog
        open={ deleteDialogOpen }
        onOpenChange={ setDeleteDialogOpen }
        title={ t( 'deleteCampaignTitle' ) }
        description={ <> { t( 'deleteCampaignDescription' ) } <span className="font-semibold text-foreground">{ campaign.campaign_name }</span> { t( 'deleteCampaignDescriptionSuffix' ) }</> }
        confirmLabel={ t( 'delete' ) }
        variant="destructive"
        onConfirm={ handleDelete }
        isLoading={ deleteCampaign.isPending }
        loadingText={ t( 'deleting' ) }
        confirmDisabled={ deleteConfirmation !== campaign.campaign_name }
      >
        <div className="flex flex-col gap-2 py-2">
          <Input
            value={ deleteConfirmation }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setDeleteConfirmation( e.target.value ) }
            placeholder={ t( 'confirmCampaignName' ) }
            aria-label={ t( 'confirmCampaignName' ) }
          />
        </div>
      </ConfirmDialog>

      <ConfirmDialog
        open={ approveDialogOpen }
        onOpenChange={ setApproveDialogOpen }
        title={ adminDecision === 'approve' ? t( 'approveCampaign' ) : ( adminDecision === 'complete' ? t( 'completeCampaign' ) : t( 'rejectCampaign' ) ) }
        description={
          adminDecision === 'approve'
            ? t( 'approveCampaignDescription' )
            : ( adminDecision === 'complete' ? t( 'completeCampaignDescription' ) : t( 'rejectCampaignDescription' ) )
        }
        confirmLabel={ adminDecision === 'approve' ? t( 'approve' ) : ( adminDecision === 'complete' ? t( 'complete' ) : t( 'reject' ) ) }
        onConfirm={ handleAdminApproval }
        isLoading={ approveCampaign.isPending || updateCampaignStatus.isPending }
        loadingText={ adminDecision === 'approve' ? t( 'approving' ) : ( adminDecision === 'complete' ? t( 'completing' ) : t( 'rejecting' ) ) }
      >
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="admin-comment" className="text-sm font-medium">
            { t( 'adminCommentsOptional' ) }
          </label>
          <Input
            id="admin-comment"
            value={ adminComment }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setAdminComment( e.target.value ) }
            placeholder={ t( 'adminCommentPlaceholder' ) }
          />
        </div>
      </ConfirmDialog>
      { campaign.id && (
        <CampaignDecisionDialog
          open={ decisionDialogOpen }
          onOpenChange={ setDecisionDialogOpen }
          campaignId={ campaign.id }
          initialDecision={ initialDecision }
          onSuccess={ () => router.refresh() }
        />
      ) }

      <ConfirmDialog
        open={ invoiceDialogOpen }
        onOpenChange={ setInvoiceDialogOpen }
        title={ t( 'createInvoice' ) }
        description={ <> { t( 'createInvoiceDescription' ) } <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>?</> }
        confirmLabel={ t( 'createInvoice' ) }
        onConfirm={ handleCreateInvoice }
        isLoading={ createInvoice.isPending }
        loadingText={ t( 'creating' ) }
      />

      <ConfirmDialog
        open={ deactivateDialogOpen }
        onOpenChange={ setDeactivateDialogOpen }
        title={ t( 'deactivateCampaign' ) }
        description={ <> { t( 'deactivateCampaignDescription' ) } <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>? { t( 'deactivateCampaignDescriptionSuffix' ) }</> }
        confirmLabel={ t( 'deactivate' ) }
        variant="destructive"
        onConfirm={ handleDeactivate }
        isLoading={ updateCampaignStatus.isPending }
        loadingText={ t( 'deactivating' ) }
      />

      <ConfirmDialog
        open={ reactivateDialogOpen }
        onOpenChange={ setReactivateDialogOpen }
        title={ t( 'reactivateCampaignTitle' ) }
        description={ <> { t( 'reactivateCampaignDescription' ) } <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>? { t( 'reactivateCampaignDescriptionSuffix' ) }</> }
        confirmLabel={ t( 'reactivate' ) }
        onConfirm={ handleReactivate }
        isLoading={ updateCampaignStatus.isPending }
        loadingText={ t( 'reactivating' ) }
      />
    </>
  );
}
