'use client';

import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';

export function WorkflowSubmissionsSkeleton() {
  return (
    <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
      <div className="flex w-max gap-2 p-0.5">
        { Array.from( { length: 3 } ).map( ( _, index ) => (
          <div key={ `workflow-submission-skeleton-${ index }` } className="w-[180px] shrink-0 overflow-hidden rounded-md border border-border/60 bg-black/80">
            <Skeleton className="h-[102px] w-full rounded-none bg-white/10" />
            <div className="p-1">
              <div className="flex items-center justify-between gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded-full bg-white/15" />
                <Skeleton className="h-2 w-10 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        ) ) }
      </div>
    </ScrollArea>
  );
}

export function WorkflowListSkeleton() {
  return (
    <div className="space-y-1.5">
      { Array.from( { length: 3 } ).map( ( _, index ) => (
        <div key={ `workflow-list-skeleton-${ index }` } className="rounded-md border border-border/60 bg-white p-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="min-w-0 space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-4 w-20 rounded-sm" />
            <Skeleton className="h-4 w-14 rounded-sm" />
          </div>
        </div>
      ) ) }
    </div>
  );
}
