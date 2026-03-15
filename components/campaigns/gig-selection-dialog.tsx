"use client";

import { useGigsByCampaign } from "@/lib/api/hooks/gigs";
import { ModelsGigResponse } from "@/lib/api/generated/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { Button } from "@/components/dashboard-ui/button";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";
import { Loader2 } from "lucide-react";
import { GigSelectionItem } from "./gig-selection/gig-selection-item";
import { FolderVideoIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function EmptyGigsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <HugeiconsIcon
          icon={ FolderVideoIcon }
          className="w-8 h-8 text-muted-foreground/50"
        />
      </div>
      <h3 className="text-base font-medium text-foreground mb-1">
        No gigs yet
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-[320px] mb-4">
        This campaign doesn't have any gigs yet. Create a gig first before inviting creators.
      </p>
    </div>
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
  const { data: gigsData, isLoading } = useGigsByCampaign( campaignId, "brand" );
  const gigs = ( gigsData?.data || [] ) as ModelsGigResponse[];

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="dialog__title">Select a Gig</DialogTitle>
          <DialogDescription className="dialog__description">
            Choose a gig to invite creators to.
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
