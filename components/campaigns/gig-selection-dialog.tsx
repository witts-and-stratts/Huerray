"use client";

import { useGigsByCampaign } from "@/lib/api/hooks/gigs";
import { ModelsGigResponse, UtilsGigStatus } from "@/lib/api/generated/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";
import { Loader2 } from "lucide-react";
import { GigSelectionItem } from "./gig-selection/gig-selection-item";
import { FolderVideoIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "../dashboard-ui/empty";

function EmptyGigsState() {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  return (
    <Empty className="flex flex-col items-center justify-center px-4 gap-2">
      <EmptyMedia>
        <HugeiconsIcon
          icon={ FolderVideoIcon }
          className="w-12 h-12 text-muted-foreground/50"
          strokeWidth={ 1 }
        />
      </EmptyMedia>
      <EmptyHeader className="text-base font-medium font-primary">
        { t( 'noGigsYet' ) }
      </EmptyHeader>
      <EmptyDescription className="text-sm">
        { t( 'noGigsYetDescription' ) }
      </EmptyDescription>
    </Empty>
  );
}

interface GigSelectionDialogProps {
  campaignId: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onSelect: ( gigId: string ) => void;
}

export function GigSelectionDialog( {
  campaignId,
  open,
  onOpenChange,
  onSelect,
}: GigSelectionDialogProps ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  const { data: gigsData, isLoading } = useGigsByCampaign( campaignId, "brand" );
  const gigs = ( ( gigsData?.data || [] ) as ModelsGigResponse[] ).filter(
    ( gig ) => gig.gig_status !== UtilsGigStatus.GigStatusCompleted
  );

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="dialog__title">{ t( 'selectGigTitle' ) }</DialogTitle>
          <DialogDescription className="dialog__description">
            { t( 'selectGigDescription' ) }
          </DialogDescription>
        </DialogHeader>

        <div className="gig-selection-dialog__container">
          { isLoading ? (
            <div className="gig-selection-dialog__loading">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : gigs.length === 0 ? (
            <EmptyGigsState />
          ) : (
            <ScrollArea className="gig-selection-dialog__scroll-area">
              <div className="gig-selection-dialog__list">
                { gigs.map( ( gig ) => (
                  <GigSelectionItem
                    key={ gig.id }
                    gig={ gig }
                    onSelect={ onSelect }
                  />
                ) ) }
              </div>
            </ScrollArea>
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}
