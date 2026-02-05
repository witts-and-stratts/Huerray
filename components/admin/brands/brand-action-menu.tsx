"use client";

import { ActionMenu, MenuAction } from "@/components/dashboard-ui/action-menu";
import { Button } from "@/components/dashboard-ui/button";
import { MoreVertical, SquareArrowOutUpRight, Copy } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Brand } from "./brands-data";
import { BrandStatusDialog } from "./brand-status-dialog";
import { toast } from "sonner";

interface BrandActionMenuProps {
  brand: Brand;
  className?: string;
  trigger?: ReactNode;
  align?: "center" | "start" | "end";
}

export function BrandActionMenu( {
  brand,
  className,
  trigger,
  align = "end",
}: BrandActionMenuProps ) {
  const [ isStatusDialogOpen, setIsStatusDialogOpen ] = useState( false );

  const handleReviewProfile = () => {
    if ( !brand.id ) {
      toast.error( "Brand profile not found" );
      return;
    }
    setIsStatusDialogOpen( true );
  };

  const actions: MenuAction<Brand>[] = [
    {
      label: "Copy Brand ID",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText( brand.id );
        toast.success( "Brand ID copied to clipboard" );
      },
    },
    {
      label: (
        <Link
          href={ brand.website }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full"
        >
          Visit Website
        </Link>
      ),
      icon: SquareArrowOutUpRight,
      separator: true,
      condition: ( data ) => !!data.website,
    },
    {
      label: "View Details",
      action: () => console.log( "View Details clicked" ),
      separator: true,
    },
    {
      label: "Review Profile",
      action: handleReviewProfile,
    },
    {
      label: "Delete Brand",
      variant: "destructive",
      className: "text-destructive",
      action: () => console.log( "Delete Brand clicked" ),
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
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-4" />
            </Button>
          )
        }
      />
      <BrandStatusDialog
        open={ isStatusDialogOpen }
        onOpenChange={ setIsStatusDialogOpen }
        brandId={ brand.id }
        currentStatus={ brand.status }
      />
    </>
  );
}
