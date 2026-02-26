"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Input } from "@/components/dashboard-ui/input";
import { useDeleteCampaign, useReplicateCampaign, useAdminCampaignApproval } from "@/lib/api/hooks/campaigns";
import { useCreateInvoice } from "@/lib/api/hooks/invoices";
import { ModelsAdminCampaignApprovalRequestCampaignStatusEnum } from "@/lib/api/generated/models";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CampaignRenameDialog } from "./campaign-rename-dialog";
import { CampaignDecisionDialog } from "./campaign-decision-dialog";
import { toast } from "sonner";
import React, { ReactNode } from "react";
import { ModelCampaign } from "./types";

interface CampaignActionMenuProps {
  campaign: ModelCampaign;
  basePath?: string;
  className?: string;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
  extraActions?: MenuAction<ModelCampaign>[];
  hideViewDetails?: boolean;
}

export function CampaignActionMenu( {
  campaign,
  basePath = "/brand",
  className,
  trigger,
  align = "end",
  extraActions = [],
  hideViewDetails = false,
}: CampaignActionMenuProps ) {
  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();
  const replicateCampaign = useReplicateCampaign();
  const approveCampaign = useAdminCampaignApproval();
  const createInvoice = useCreateInvoice();
  const [ approveDialogOpen, setApproveDialogOpen ] = React.useState( false );
  const [ adminComment, setAdminComment ] = React.useState( '' );
  const [ adminDecision, setAdminDecision ] = React.useState<'approve' | 'reject'>( 'approve' );
  const [ deleteDialogOpen, setDeleteDialogOpen ] = React.useState( false );
  const [ renameDialogOpen, setRenameDialogOpen ] = React.useState( false );
  const [ decisionDialogOpen, setDecisionDialogOpen ] = React.useState( false );
  const [ initialDecision, setInitialDecision ] = React.useState<'yes' | 'no'>( 'yes' );
  const [ invoiceDialogOpen, setInvoiceDialogOpen ] = React.useState( false );

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
    if ( campaign.id ) {
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
          if ( !hideViewDetails ) {
            router.refresh(); // Or handle navigation if needed
          } else {
            router.refresh();
          }
        },
        onError: () => {
          toast.error( isApprove ? "Failed to approve campaign" : "Failed to reject campaign" );
        }
      } );
    }
  };

  const openAdminDecisionDialog = ( decision: 'approve' | 'reject' ) => {
    setAdminDecision( decision );
    setApproveDialogOpen( true );
  };

  const handleDecision = ( decision: 'yes' | 'no' ) => {
    setInitialDecision( decision );
    setDecisionDialogOpen( true );
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
          onError: () => {
            toast.error( "Failed to create invoice", {
              description: "Please try again later.",
              richColors: true,
            } );
          },
        }
      );
    }
  };

  const defaultActions: MenuAction<ModelCampaign>[] = [
    {
      label: (
        <Link
          href={ `${ basePath }/campaigns/${ campaign.id }` }
          className="w-full"
        >
          View Details
        </Link>
      ),
      condition: () => !hideViewDetails,
    },
    {
      label: (
        <Link href={ `${ basePath }/campaigns/${ campaign.id }/gigs/new` } className='w-full'>
          Create Gig
        </Link>
      ),
      allowedRoles: [ 'admin' ],
    },
    {
      label: "Edit",
      action: () => router.push( `${ basePath }/campaigns/${ campaign.id }/edit` ),
      allowedRoles: [ "brand" ],
    },
    {
      label: "Rename",
      action: () => setRenameDialogOpen( true ),
      allowedRoles: [ "brand" ],
    },
    {
      label: "Replicate",
      allowedRoles: [ "brand" ],
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
      condition: () => campaign.campaign_status !== ModelsAdminCampaignApprovalRequestCampaignStatusEnum.GigsApproved && ( campaign.campaign_status === "running" || campaign.campaign_status === "pending_approval" )
    },
    {
      label: "Reject Campaign",
      action: () => openAdminDecisionDialog( 'reject' ),
      allowedRoles: [ "admin" ],
      condition: () => campaign.campaign_status !== ModelsAdminCampaignApprovalRequestCampaignStatusEnum.Returned && campaign.campaign_status === "running"
    },
    {
      label: 'Approve Campaign',
      action: () => handleDecision( 'yes' ),
      allowedRoles: [ 'brand' ],
    },
    {
      label: 'Reject Campaign',
      action: () => handleDecision( 'no' ),
      allowedRoles: [ 'brand' ],
    },
    {
      label: "Create Invoice",
      action: () => setInvoiceDialogOpen( true ),
      allowedRoles: [ "admin" ],
    },
    {
      label: "Delete",
      action: () => setDeleteDialogOpen( true ),
      className: "text-destructive focus:text-destructive",
      allowedRoles: [ "admin" ],
      separator: true,
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
              className={ className }
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
        title={ adminDecision === 'approve' ? "Approve Campaign" : "Reject Campaign" }
        description={
          adminDecision === 'approve'
            ? "Are you sure you want to approve this campaign? This will make it active and visible to creators."
            : "Are you sure you want to reject this campaign? The campaign will be returned to the brand."
        }
        confirmLabel={ adminDecision === 'approve' ? "Approve" : "Reject" }
        onConfirm={ handleAdminApproval }
        isLoading={ approveCampaign.isPending }
        loadingText={ adminDecision === 'approve' ? "Approving..." : "Rejecting..." }
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
    </>
  );
}
