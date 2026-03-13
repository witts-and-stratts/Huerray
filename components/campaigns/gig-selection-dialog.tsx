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
            <div className="gig-selection-dialog__empty">
              <p>No gigs found for this campaign.</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={ () => onOpenChange( false ) }
              >
                Close
              </Button>
            </div>
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
