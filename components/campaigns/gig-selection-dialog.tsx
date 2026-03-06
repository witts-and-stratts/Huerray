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
import { Loader2, Music, Video, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
          <DialogTitle className={ 'dialog__title' }>Select a Gig</DialogTitle>
          <DialogDescription className={ 'dialog__description' }>
            Choose a gig to invite creators to.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-[200px] max-h-[60vh] flex flex-col">
          { isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : gigs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
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
            <ScrollArea className="flex-1 -mr-4 pr-4">
              <div className="space-y-3">
                { gigs.map( ( gig ) => (
                  <div
                    key={ gig.id }
                    className="flex flex-col gap-1 p-4 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    onClick={ () => {
                      if ( gig.id ) {
                        onSelect( gig.id );
                      }
                    } }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm line-clamp-1">
                        { gig.title }
                      </h4>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full capitalize">
                        { gig.gig_status?.replace( "_", " " ) }
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Video className="size-3" />
                        { gig.number_of_videos } Video{ gig.number_of_videos !== 1 ? 's' : '' }
                      </div>
                      <div className="flex items-center gap-1">
                        Duration: { gig.video_duration_in_seconds }s
                      </div>
                      <div className="flex items-center gap-1 ml-auto font-medium text-foreground">
                        { formatCurrency( gig.gig_cost || 0 ) }
                      </div>
                    </div>
                  </div>
                ) ) }
              </div>
            </ScrollArea>
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}
