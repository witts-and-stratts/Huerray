"use client";

import { ModelsGigResponse } from "@/lib/api/generated/models";
import { Video } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/dashboard-ui/separator";
import { useTranslations } from "next-intl";

interface GigSelectionItemProps {
  gig: ModelsGigResponse;
  onSelect: ( gigId: string ) => void;
}

export function GigSelectionItem( { gig, onSelect }: GigSelectionItemProps ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  return (
    <div
      className="gig-selection-item"
      onClick={ () => {
        if ( gig.id ) {
          onSelect( gig.id );
        }
      } }
    >
      <div className="gig-selection-item__header">
        <h4 className="gig-selection-item__title card__title">
          { gig.title }
        </h4>
        <span className="gig-selection-item__status">
          { gig.gig_status?.replace( "_", " " ) }
        </span>
      </div>

      <div className="gig-selection-item__meta">
        <div className="gig-selection-item__meta-item">
          <Video className="size-4" strokeWidth={ 1 } />
          { t( 'videoCount', { count: gig.number_of_videos || 0 } ) }
        </div>
        <Separator orientation="vertical" />
        <div className="gig-selection-item__meta-item">
          { t( 'duration', { seconds: gig.video_duration_in_seconds || 0 } ) }
        </div>
        <div className="gig-selection-item__price">
          { formatCurrency( gig.gig_cost?.value || 0 ) }
        </div>
      </div>
    </div>
  );
}
