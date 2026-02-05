"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { Input } from "@/components/dashboard-ui/input";
import { useDeleteCampaign, useReplicateCampaign } from "@/lib/api/hooks/campaigns";
import { EllipsisVertical, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CampaignRenameDialog } from "./campaign-rename-dialog";
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
  basePath = "/brand-admin",
  className,
  trigger,
  align = "end",
  extraActions = [],
  hideViewDetails = false,
}: CampaignActionMenuProps ) {
  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();
  const replicateCampaign = useReplicateCampaign();
  const [ deleteDialogOpen, setDeleteDialogOpen ] = React.useState( false );
  const [ renameDialogOpen, setRenameDialogOpen ] = React.useState( false );

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
      label: "Edit",
      action: () => router.push( `${ basePath }/campaigns/${ campaign.campaign_id }/edit` ),
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
        if ( campaign.campaign_id ) {
          replicateCampaign.mutate( campaign.campaign_id, {
            onSuccess: () => toast.success( "Campaign replicated successfully" ),
            onError: () => toast.error( "Failed to replicate campaign" ),
          } );
        }
      },
    },
    {
      label: "Delete",
      action: () => setDeleteDialogOpen( true ),
      className: "text-destructive focus:text-destructive",
      allowedRoles: [ "admin" ]
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
      { campaign.campaign_id && (
        <CampaignRenameDialog
          open={ renameDialogOpen }
          onOpenChange={ setRenameDialogOpen }
          campaignId={ campaign.campaign_id }
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
    </>
  );
}
