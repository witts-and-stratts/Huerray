"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { MoreVertical, SquareArrowOutUpRight, Copy } from "lucide-react";
import { ReactNode, useState } from "react";
import { Brand } from "./brands-data";
import { toast } from "sonner";
import { useDeleteBrand, useUpdateBrandStatus } from "@/lib/api/hooks/brands";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { useTranslations } from "next-intl";

type BrandActionStatus = "approved" | "rejected" | "returned";

interface BrandActionMenuProps {
  brand: Brand;
  className?: string;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
  onViewDetails?: ( brand: Brand ) => void;
}

export function BrandActionMenu( {
  brand,
  trigger,
  align = "end",
  onViewDetails,
}: BrandActionMenuProps ) {
  const menuT = useTranslations( 'dashboard.admin.brandActionMenu' );
  const t = useTranslations( 'dashboard.admin' );
  const updateStatus = useUpdateBrandStatus( brand.id );
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );
  const [ pendingAction, setPendingAction ] = useState<{
    status: BrandActionStatus;
    comments: string;
  } | null>( null );
  const deleteBrand = useDeleteBrand();

  const handleDelete = () => {
    setIsDeleteDialogOpen( true );
  };

  const resolveBrandStatusMessage = ( key: string, fallback: string, values?: Record<string, string> ) => (
    t.has( key ) ? t( key, values ) : fallback
  );

  const confirmDelete = () => {
    if ( !brand.id ) return;

    deleteBrand.mutate( brand.id, {
      onSuccess: () => {
        toast.success( menuT( 'brandDeletedSuccessfully' ) );
        setIsDeleteDialogOpen( false );
      },
      onError: () => {
        toast.error( menuT( 'failedToDeleteBrand' ) );
      },
    } );
  };

  const handleStatusAction = ( status: BrandActionStatus ) => {
    if ( !brand.id ) {
      toast.error( t( 'brandStatus.missingId' ) );
      return;
    }
    setPendingAction( { status, comments: "" } );
  };

  const confirmStatusAction = () => {
    if ( !brand.id || !pendingAction ) return;

    updateStatus.mutate(
      {
        brand_status: pendingAction.status,
        status_change_comments: pendingAction.comments,
      },
      {
        onSuccess: () => {
          const brandName = brand.name || 'Brand';
          setPendingAction( null );

          if ( pendingAction.status === "approved" ) {
            toast.success( t( 'brandStatus.approvedToast', { name: brandName } ) );
            return;
          }

          if ( pendingAction.status === "returned" ) {
            toast.success( t( 'brandStatus.returnedToast', { name: brandName } ) );
            return;
          }

          toast.success( t( 'brandStatus.rejectedToast', { name: brandName } ) );
        },
        onError: () => {
          setPendingAction( null );
          toast.error( t( 'brandStatus.errorToast' ) );
        },
      }
    );
  };

  const actions: MenuAction<Brand>[] = [
    {
      label: menuT( 'copyBrandId' ),
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText( brand.id );
        toast.success( menuT( 'brandIdCopiedToClipboard' ), { richColors: true } );
      },
    },
    {
      label: menuT( 'visitWebsite' ),
      href: brand.website,
      external: true,
      icon: SquareArrowOutUpRight,
      separator: true,
      condition: ( data ) => !!data.website,
    },
    ...( onViewDetails ? [ {
      label: menuT( 'viewDetails' ),
      action: () => onViewDetails?.( brand ),
      separator: true,
    } ] : [] ),
    {
      label: t( 'brandStatus.approve' ),
      action: () => handleStatusAction( "approved" ),
      condition: ( data ) => data.brand_status !== "approved",
    },
    {
      label: t( 'brandStatus.reject' ),
      action: () => handleStatusAction( "rejected" ),
      condition: ( data ) => data.brand_status !== "rejected",
    },
    {
      label: t( 'brandStatus.return' ),
      action: () => handleStatusAction( "returned" ),
      condition: ( data ) => data.brand_status !== "returned",
    },
    {
      label: menuT( 'deleteBrand' ),
      variant: "destructive",
      className: "text-destructive",
      action: handleDelete,
    },
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ brand }
        align={ align }
        trigger={
          trigger || (
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">{ menuT( 'openMenu' ) }</span>
              <MoreVertical className="size-4" />
            </Button>
          )
        }
      />
      <ConfirmDialog
        open={ !!pendingAction }
        onOpenChange={ ( open ) => {
          if ( !open ) setPendingAction( null );
        } }
        title={
          pendingAction?.status === "approved"
            ? resolveBrandStatusMessage( 'brandStatus.confirmApproveTitle', 'Approve brand profile?' )
            : pendingAction?.status === "returned"
              ? resolveBrandStatusMessage( 'brandStatus.confirmReturnTitle', 'Return brand profile?' )
              : resolveBrandStatusMessage( 'brandStatus.confirmRejectTitle', 'Reject brand profile?' )
        }
        description={
          pendingAction?.status === "approved"
            ? resolveBrandStatusMessage(
              'brandStatus.confirmApproveDesc',
              `${ brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }'s profile will be approved and they will be notified.`,
              { name: brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }
            )
            : pendingAction?.status === "returned"
              ? resolveBrandStatusMessage(
                'brandStatus.confirmReturnDesc',
                `${ brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }'s profile will be returned and they will be notified.`,
                { name: brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }
              )
              : resolveBrandStatusMessage(
                'brandStatus.confirmRejectDesc',
                `${ brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }'s profile will be rejected and they will be notified.`,
                { name: brand.name || resolveBrandStatusMessage( 'brandStatus.thisBrand', 'This brand' ) }
              )
        }
        confirmLabel={
          pendingAction?.status === "approved"
            ? t( 'brandStatus.approve' )
            : pendingAction?.status === "returned"
              ? t( 'brandStatus.return' )
              : t( 'brandStatus.reject' )
        }
        variant={ pendingAction?.status === "approved" ? "default" : "destructive" }
        onConfirm={ confirmStatusAction }
        isLoading={ updateStatus.isPending }
        loadingText={
          pendingAction?.status === "approved"
            ? resolveBrandStatusMessage( 'brandStatus.approving', 'Approving...' )
            : pendingAction?.status === "returned"
              ? resolveBrandStatusMessage( 'brandStatus.returning', 'Returning...' )
              : resolveBrandStatusMessage( 'brandStatus.rejecting', 'Rejecting...' )
        }
        className="w-[560px]"
      >
        <SuperField
          type="textarea"
          label={ resolveBrandStatusMessage( 'brandStatus.commentLabel', 'Comment' ) }
          placeholder={ resolveBrandStatusMessage( 'brandStatus.commentPlaceholder', 'Add a comment' ) }
          value={ pendingAction?.comments || "" }
          onChange={ ( e ) => {
            setPendingAction( current => current ? { ...current, comments: e.target.value } : current );
          } }
          fieldClassName="min-h-40"
        />
      </ConfirmDialog>
      <ConfirmDialog
        open={ isDeleteDialogOpen }
        onOpenChange={ setIsDeleteDialogOpen }
        title={ menuT( 'deleteBrand' ) }
        description={
          <span>
            { menuT( 'areYouSureYou' ) }<span className="font-semibold">{ brand.name }</span>{ menuT( 'ThisActionCannot' ) }</span>
        }
        confirmLabel={ menuT( 'confirmDelete' ) }
        variant="destructive"
        onConfirm={ confirmDelete }
        isLoading={ deleteBrand.isPending }
      />
    </>
  );
}
