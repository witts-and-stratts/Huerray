import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/dashboard-ui/card';
import { SubHeader } from '@/components/subheader';
import { Separator } from '@/components/dashboard-ui/separator';

function RowSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5">
      <div className="flex items-start justify-between gap-10">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function CreatorAccountSkeleton() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title="Account Settings"
        description="Manage your account preferences and banking information"
        breadcrumbs={ [
          { label: 'Dashboard', href: '/creator' },
          { label: 'Account' },
        ] }
      />

      <div className="ad-shell p-4 bg-slate-50/50 mt-0 flex-1">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-6 md:sticky md:top-24 md:self-start h-full">
            <Card className="ad-summary-card border-primary/20 bg-burgundy-50 grow-0 h-full animate-pulse">
              <CardHeader className="py-3">
                <div className="flex flex-col items-center text-center gap-3">
                  <Skeleton className="size-48 rounded-full" />
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 md:space-y-2">
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                </div>
                <Separator />
                <div className="space-y-2">
                   <div className="flex items-start justify-between gap-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                   </div>
                </div>
                <div className="pt-4 border-t border-border/40">
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4 md:col-span-6 h-full">
            <div className="flex flex-col gap-4 h-full">
              <Card className="pt-4 flex-1">
                <CardHeader>
                   <Skeleton className="h-6 w-32 mb-2" />
                   <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                </CardContent>
                <div className="p-4 pt-0 border-t-0 mt-auto">
                   <Skeleton className="h-10 w-full" />
                </div>
              </Card>

              <Card className="pt-4 flex-1">
                <CardHeader>
                   <Skeleton className="h-6 w-32 mb-2" />
                   <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <div className="mt-4 p-3 rounded-lg bg-amber-50/50 border border-amber-100/30">
                     <Skeleton className="h-3 w-full" />
                  </div>
                </CardContent>
                <div className="p-4 pt-0 border-t-0 mt-auto">
                   <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
