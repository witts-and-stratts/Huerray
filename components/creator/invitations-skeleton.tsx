import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';

export function InvitationsSkeleton() {
  const t = useTranslations( 'dashboard.creator' );
  return (
    <div className="flex flex-col flex-1 h-full bg-slate-50/50">
      <SubHeader
        title={ t( 'invitations.title' ) }
        description={ t( 'invitations.description' ) }
      />
      <div className="ad-shell p-5 space-y-6 flex-1 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-white rounded-xl border border-border/60 p-5 space-y-4 shadow-sm">
                <div className="flex justify-between items-start gap-4">
                   <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full" />
                   </div>
                   <Skeleton className="size-12 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                   <Skeleton className="h-4 w-16" />
                   <Skeleton className="h-4 w-16" />
                </div>
                <div className="pt-4 flex gap-2">
                   <Skeleton className="h-9 flex-1" />
                   <Skeleton className="h-9 w-24" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
