"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { MoreVertical, SquareArrowOutUpRight, Copy } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Brand } from "./brands-data";
import { BrandStatusDialog } from "./brand-status-dialog";
import { toast } from "sonner";
import { useDeleteBrand } from "@/lib/api/hooks/brands";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { useTranslations } from "next-intl";

interface BrandActionMenuProps {
  brand: Brand;
  className?: string;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
  onViewDetails?: ( brand: Brand ) => void;
}

export function BrandActionMenu( {
  brand,
  className,
  trigger,
  align = "end",
  onViewDetails,
}: BrandActionMenuProps ) {
  const t = useTranslations('dashboard.admin');
  const menuT = useTranslations('dashboard.admin.brandActionMenu');
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );
  const deleteBrand = useDeleteBrand();

  const handleDelete = () => {
    setIsDeleteDialogOpen( true );
  };

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

  const handleReviewProfile = () => {
    if ( !brand.id ) {
      toast.error( menuT( 'brandProfileNotFound' ) );
      return;
    }
    setIsStatusDialogOpen( true );
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
    {
      label: menuT( 'viewDetails' ),
      action: () => onViewDetails?.( brand ),
      separator: true,
    },
    {
      label: menuT( 'reviewProfile' ),
      action: handleReviewProfile,
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
      <BrandStatusDialog
        open={ isStatusDialogOpen }
        onOpenChange={ setIsStatusDialogOpen }
        brandId={ brand.id }
        currentStatus={ brand.brand_status }
      />
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
