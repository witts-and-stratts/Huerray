import { Skeleton } from '@/components/dashboard-ui/skeleton';

function SkeletonRow( { short }: { short?: boolean } ) {
  return (
    <div className="px-4 py-3 border-b border-border/50">
      <div className="flex items-start gap-3">
        <Skeleton className="mt-1.5 size-2 rounded-full shrink-0" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className={ short ? "h-3.5 w-28" : "h-3.5 w-40" } />
            <Skeleton className="h-3 w-10 shrink-0" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-4 w-16 rounded-full mt-0.5" />
        </div>
      </div>
    </div>
  );
}

export function NotificationDetailSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */ }
      <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60">
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-56" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      {/* Body */ }
      <div className="px-6 py-5 space-y-3">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-[92%]" />
        <Skeleton className="h-3.5 w-[85%]" />
        <Skeleton className="h-3.5 w-[78%]" />
        <Skeleton className="h-3.5 w-[60%]" />
      </div>
    </div>
  );
}

export function NotificationsSkeleton() {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left panel */ }
        <div className="flex flex-col w-full md:w-80 xl:w-96 shrink-0 border-r border-border/60 overflow-hidden">

          {/* Tabs */ }
          <div className="px-3 pt-3 pb-2 shrink-0">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          {/* Search */ }
          <div className="pb-2 shrink-0 px-3">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          {/* Rows */ }
          <div className="flex-1">
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
          </div>

          {/* Pagination */ }
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/60 shrink-0 bg-muted/20">
            <Skeleton className="h-3 w-16" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          </div>
        </div>

        {/* Right panel — desktop only */ }
        <div className="hidden md:flex flex-1 overflow-hidden bg-background flex-col">

          {/* Detail header */ }
          <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60">
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-64" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Skeleton className="h-8 w-28 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>

          {/* Detail body */ }
          <div className="px-6 py-5 space-y-3">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[92%]" />
            <Skeleton className="h-3.5 w-[85%]" />
            <Skeleton className="h-3.5 w-[78%]" />
            <Skeleton className="h-3.5 w-[60%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
