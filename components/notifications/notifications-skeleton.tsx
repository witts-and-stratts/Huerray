import { Skeleton } from '@/components/dashboard-ui/skeleton';

export function NotificationsSkeleton() {
  return (
    <div className="px-5 w-full mx-auto flex-1 py-5 bg-slate-50/30">
      <div className="space-y-5 h-full">
        <section className="ad-kpi-grid grid grid-cols-3">
        { Array.from( { length: 3 } ).map( ( _, index ) => (
          <div key={ `summary-skeleton-${ index }` } className="ad-summary-card rounded-xl border py-3 px-4 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-8 w-16" />
          </div>
        ) ) }
        </section>

        <section className="w-full max-w-3xl mx-auto">
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-9 w-full md:w-[340px] rounded-md" />
            <Skeleton className="h-9 w-full md:w-[320px] rounded-md" />
          </div>
        </section>

        <section className="w-full max-w-3xl mx-auto space-y-3">
          { [ 1, 2, 3, 4 ].map( ( i ) => (
            <div key={ i } className="rounded-xl border bg-card px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-2 w-2 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-[92%]" />
                  <Skeleton className="h-4 w-[72%]" />
                  <div className="pt-2 flex items-center gap-2">
                    <Skeleton className="h-5 w-24 rounded-md" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          ) ) }
        </section>

        <section className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 rounded-xl border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-4 w-28" />
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-[72px] rounded-md" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
