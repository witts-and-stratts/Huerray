"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Input } from "@/components/dashboard-ui/input";
import { ModelsCampaignResponse } from "@/lib/api/generated";
import { ModelsAdminCampaignApprovalRequestCampaignStatusEnum, ModelsCampaignStatusUpdateRequestCampaignStatusEnum, UtilsCampaignStatus } from "@/lib/api/generated/models";
import { useAdminCampaignApproval, useDeleteCampaign, useReplicateCampaign, useUpdateCampaignStatus } from "@/lib/api/hooks/campaigns";
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
  const basePath = useBasePath();
  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();
  const replicateCampaign = useReplicateCampaign();
  const approveCampaign = useAdminCampaignApproval();
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
          toast.success( "Campaign deleted successfully" );
          setDeleteDialogOpen( false );
          if ( !hideViewDetails ) {
            router.push( basePath + "/campaigns" );
          } else {
            router.refresh();
          }
        },
        onError: () => {
          toast.error( "Failed to delete campaign", {
            description: "Please try again later.",
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
          toast.success( "Campaign completed successfully" );
          setApproveDialogOpen( false );
        },
        onError: () => {
          toast.error( "Failed to complete campaign" );
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
        admin_comments: adminComment || ( isApprove ? "Approved by admin" : "Rejected by admin" ),
        number_of_gigs_validated: isApprove ? true : undefined,
      }
    }, {
      onSuccess: () => {
        toast.success( isApprove ? "Campaign approved successfully" : "Campaign rejected successfully" );
        setApproveDialogOpen( false );
        setAdminComment( '' );
      },
      onError: ( err ) => {
        const error = err as ApiError;
        toast.error( isApprove ? "Failed to approve campaign" : "Failed to reject campaign", {
          description: <SentenceCase>{ error.response?.data?.error?.message || "Please try again later." }</SentenceCase>,
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
        toast.success( "Campaign deactivated successfully" );
        setDeactivateDialogOpen( false );
      },
      onError: () => {
        toast.error( "Failed to deactivate campaign", {
          description: "Please try again later.",
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
        toast.success( "Campaign re-activated successfully" );
        setReactivateDialogOpen( false );
      },
      onError: () => {
        toast.error( "Failed to re-activate campaign", {
          description: "Please try again later.",
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
            toast.success( "Invoice created successfully", {
              richColors: true,
            } );
            setInvoiceDialogOpen( false );
          },
          onError: ( err ) => {
            const error = err as ApiError;
            toast.error( "Failed to create invoice", {
              description: <SentenceCase>{ error.response?.data?.error?.message || "Please try again later." }</SentenceCase>,
              richColors: true,
            } );
          },
        }
      );
    }
  };

  const isCompleted = campaign.campaign_status === 'completed';
  const campaignStatus = campaign.campaign_status;

  const defaultActions: MenuAction<ModelsCampaignResponse>[] = [
    {
      label: "View Details",
      href: `${ basePath }/campaigns/${ campaign.id }`,
      condition: () => !hideViewDetails,
    },
    {
      label: "Create Gig",
      href: `${ basePath }/campaigns/${ campaign.id }/gigs/new`,
      allowedRoles: [ 'admin' ],
      condition: () => campaignStatus === 'pending_approval',
    },
    {
      label: "Edit",
      action: () => router.push( `${ basePath }/campaigns/${ campaign.id }/edit` ),
      allowedRoles: [ "brand" ],
      condition: () => !isCompleted && ( campaignStatus === "draft" || campaignStatus === "returned" ),
    },
    {
      label: "Rename",
      action: () => setRenameDialogOpen( true ),
      allowedRoles: [ "brand" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusDraft || campaignStatus === UtilsCampaignStatus.CampaignStatusReturned,
    },
    {
      label: "Replicate",
      allowedRoles: [ "brand" ],
      condition: () => isCompleted,
      action: () => {
        if ( campaign.id ) {
          replicateCampaign.mutate( campaign.id, {
            onSuccess: () => toast.success( "Campaign replicated successfully" ),
            onError: () => toast.error( "Failed to replicate campaign" ),
          } );
        }
      },
    },
    {
      label: "Approve Campaign",
      action: () => openAdminDecisionDialog( 'approve' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted &&
        campaignStatus === UtilsCampaignStatus.CampaignStatusPendingApproval,
    },
    {
      label: "Reject Campaign",
      action: () => openAdminDecisionDialog( 'reject' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted &&
        campaignStatus === UtilsCampaignStatus.CampaignStatusPendingApproval,
    },
    {
      label: "Complete Campaign",
      action: () => openAdminDecisionDialog( 'complete' ),
      allowedRoles: [ "admin" ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusRunning,
    },
    {
      label: 'Accept Campaign',
      action: () => handleDecision( 'yes' ),
      allowedRoles: [ 'brand' ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusGigsApproved,
    },
    {
      label: 'Reject Campaign',
      action: () => handleDecision( 'no' ),
      allowedRoles: [ 'brand' ],
      condition: () => !isCompleted && campaignStatus === UtilsCampaignStatus.CampaignStatusGigsApproved,
    },
    {
      label: "Re-activate",
      action: () => setReactivateDialogOpen( true ),
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusDeactivated,
    },
    {
      label: "Create Invoice",
      action: () => setInvoiceDialogOpen( true ),
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus === UtilsCampaignStatus.CampaignStatusCompleted
    },
    {
      label: "Deactivate",
      action: () => setDeactivateDialogOpen( true ),
      className: "text-destructive focus:text-destructive",
      separator: true,
      allowedRoles: [ "admin" ],
      condition: () => campaignStatus !== UtilsCampaignStatus.CampaignStatusDeactivated,
    },
    {
      label: "Delete",
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
              <span className="sr-only">Open menu</span>
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
        open={ deleteDialogOpen }
        onOpenChange={ setDeleteDialogOpen }
        title="Delete Campaign"
        description={ <>Are you sure you want to delete this campaign? This action cannot be undone. Type the campaign name: <span className="font-semibold text-foreground">{ campaign.campaign_name }</span> to confirm.</> }
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={ handleDelete }
        isLoading={ deleteCampaign.isPending }
        loadingText="Deleting..."
        confirmDisabled={ deleteConfirmation !== campaign.campaign_name }
      >
        <div className="flex flex-col gap-2 py-2">
          <Input
            value={ deleteConfirmation }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setDeleteConfirmation( e.target.value ) }
            placeholder="Type campaign name"
            aria-label="Confirm campaign name"
          />
        </div>
      </ConfirmDialog>

      <ConfirmDialog
        open={ approveDialogOpen }
        onOpenChange={ setApproveDialogOpen }
        title={ adminDecision === 'approve' ? "Approve Campaign" : ( adminDecision === 'complete' ? "Complete Campaign" : "Reject Campaign" ) }
        description={
          adminDecision === 'approve'
            ? "Are you sure you want to approve this campaign? This will make it active and visible to creators."
            : ( adminDecision === 'complete' ? "Are you sure you want to complete this campaign? This will make it inactive and visible to creators." : "Are you sure you want to reject this campaign? The campaign will be returned to the brand." )
        }
        confirmLabel={ adminDecision === 'approve' ? "Approve" : ( adminDecision === 'complete' ? "Complete" : "Reject" ) }
        onConfirm={ handleAdminApproval }
        isLoading={ approveCampaign.isPending || updateCampaignStatus.isPending }
        loadingText={ adminDecision === 'approve' ? "Approving..." : ( adminDecision === 'complete' ? "Completing..." : "Rejecting..." ) }
      >
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="admin-comment" className="text-sm font-medium">
            Admin Comments (Optional)
          </label>
          <Input
            id="admin-comment"
            value={ adminComment }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setAdminComment( e.target.value ) }
            placeholder="e.g. Approved for launch"
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
        title="Create Invoice"
        description={ <>Are you sure you want to create an invoice for <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>?</> }
        confirmLabel="Create Invoice"
        onConfirm={ handleCreateInvoice }
        isLoading={ createInvoice.isPending }
        loadingText="Creating..."
      />

      <ConfirmDialog
        open={ deactivateDialogOpen }
        onOpenChange={ setDeactivateDialogOpen }
        title="Deactivate Campaign"
        description={ <>Are you sure you want to deactivate <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>? This will make it inactive.</> }
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={ handleDeactivate }
        isLoading={ updateCampaignStatus.isPending }
        loadingText="Deactivating..."
      />

      <ConfirmDialog
        open={ reactivateDialogOpen }
        onOpenChange={ setReactivateDialogOpen }
        title="Re-activate Campaign"
        description={ <>Are you sure you want to re-activate <span className="font-semibold text-foreground">{ campaign.campaign_name }</span>? This will make it active again.</> }
        confirmLabel="Re-activate"
        onConfirm={ handleReactivate }
        isLoading={ updateCampaignStatus.isPending }
        loadingText="Re-activating..."
      />
    </>
  );
}
