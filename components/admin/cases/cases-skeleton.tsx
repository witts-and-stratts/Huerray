import { Skeleton } from '@/components/dashboard-ui/skeleton';

function SkeletonRow( { short }: { short?: boolean } ) {
  return (
    <div className="px-4 py-3 border-b border-border/50">
      <div className="flex items-start gap-3">
        <Skeleton className="mt-1.5 size-2 rounded-full shrink-0" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className={ short ? 'h-3.5 w-32' : 'h-3.5 w-48' } />
            <Skeleton className="h-3 w-10 shrink-0" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <div className="flex items-center gap-1.5 mt-1">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-full" />
            <Skeleton className="h-3 w-20 ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseDetailSkeleton() {
  return (
    <div className="flex flex-col h-full">
      { /* Header */ }
      <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60">
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      { /* Body */ }
      <div className="px-6 py-5 space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-[85%]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          { Array.from( { length: 4 } ).map( ( _, i ) => (
            <div key={ i } className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          ) ) }
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <div className="space-y-4 pt-2">
            { [ '72%', '85%', '60%' ].map( ( w, i ) => (
              <div key={ i } className="flex flex-col gap-1 max-w-[85%]">
                <Skeleton className="h-3 w-16" />
                <Skeleton className={ `h-16 rounded-2xl rounded-bl-sm` } style={ { width: w } } />
                <Skeleton className="h-2.5 w-12" />
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </div>
  );
}

export function CasesSkeleton() {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-1 overflow-hidden min-h-0">

        { /* Left panel */ }
        <div className="flex flex-col w-full md:w-80 xl:w-96 shrink-0 border-r border-border/60 overflow-hidden">

          { /* Tabs */ }
          <div className="px-3 pt-3 pb-2 shrink-0">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          { /* Search */ }
          <div className="pb-2 shrink-0 px-3">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          { /* Rows */ }
          <div className="flex-1">
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
            <SkeletonRow short />
            <SkeletonRow />
          </div>

          { /* Pagination */ }
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/60 shrink-0 bg-muted/20">
            <Skeleton className="h-3 w-16" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          </div>
        </div>

        { /* Right panel — desktop only */ }
        <div className="hidden md:flex flex-1 overflow-hidden bg-background flex-col">
          <CaseDetailSkeleton />
        </div>

      </div>
    </div>
  );
}
