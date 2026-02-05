"use client";

import * as React from 'react';
import { ModelsGigResponse } from '@/lib/api/generated';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { GigStatusBadge } from './gig-status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Video01Icon, Clock01Icon } from '@hugeicons/core-free-icons';

interface GigDetailsSheetProps {
  gig: ModelsGigResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function GigDetailsSheet( { gig, open, onOpenChange }: GigDetailsSheetProps ) {
  if ( !gig ) return null;

  const {
    title,
    gig_status,
    posting_start_date,
    posting_end_date,
    compensation,
    number_of_videos,
    video_duration_in_seconds,
    requirements,
    content_guidelines,
    ambience,
    gender_requirement,
    age_min,
    age_max,
  } = gig;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2 mb-2">
            <GigStatusBadge status={ gig_status } />
          </div>
          <SheetTitle className="text-xl">{ title }</SheetTitle>
          <SheetDescription>
            Review the details for this gig below.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4 pt-0">

          {/* Key Stats */ }
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase">Compensation</span>
              <div className="text-lg font-semibold">{ formatCurrency( compensation! ) }</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase">Videos</span>
              <div className="flex items-center gap-2 font-medium">
                { number_of_videos } ({ video_duration_in_seconds }s)
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Dates */ }
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Timeline</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Start Date</span>
                  { formatDate( posting_start_date! ) }
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">End Date</span>
                  { formatDate( posting_end_date! ) }
                </div>
              </div>
            </div>

            {/* Requirements */ }
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Requirements</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                { requirements ? <p>{ requirements }</p> : <p className="italic">No specific requirements.</p> }
                <div className="flex flex-wrap gap-2 mt-2">
                  { gender_requirement && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs capitalize">
                      { gender_requirement }
                    </span>
                  ) }
                  { ( age_min || age_max ) && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs">
                      Age: { age_min ?? '?' } - { age_max ?? '?' }
                    </span>
                  ) }
                  { ambience && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs capitalize">
                      { ambience }
                    </span>
                  ) }
                </div>
              </div>
            </div>

            {/* Content Guidelines */ }
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Content Guidelines</h4>
              <div className="text-sm text-muted-foreground">
                { content_guidelines ? <p>{ content_guidelines }</p> : <p className="italic">No specific guidelines.</p> }
              </div>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
