import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';

export function InvitationsSkeleton() {
  const t = useTranslations( 'dashboard.creator' );
  return (
    <div className="flex flex-col flex-1 h-full bg-slate-50">
      <SubHeader
        title={ t( 'invitations.title' ) }
        description={ t( 'invitations.description' ) }
      />
      <div className="flex-1 h-full ad-shell p-0">
        <div className='@container'>
          <div className='grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 gap-4 p-5'>
            { Array.from( { length: 8 } ).map( ( _, i ) => (
              <div key={ i } className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                {/* Background */ }
                <Skeleton className="absolute inset-0 w-full h-full" />

                {/* Top row: status badge + action menu */ }
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="size-5 rounded-md" />
                </div>

                {/* Bottom frosted block */ }
                <div className="absolute bottom-0 left-0 right-0 m-2 rounded-2xl px-3 py-2.5 flex flex-col gap-1.5 bg-slate-50">
                  {/* Title (2 lines) */ }
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                  <Skeleton className="h-4 w-3/5 rounded-md" />

                  {/* Meta row: video count + duration */ }
                  <div className="flex items-center gap-2 mt-0.5">
                    <Skeleton className="h-3 w-12 rounded-sm" />
                    <Skeleton className="h-3 w-8 rounded-sm" />
                  </div>

                  {/* Compensation */ }
                  <div className="flex flex-col gap-1 mt-1">
                    <Skeleton className="h-2 w-14 rounded-sm" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>

                  {/* Brand row */ }
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Skeleton className="size-4 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-24 rounded-sm" />
                  </div>

                  {/* CTA buttons */ }
                  <div className="flex gap-2 mt-1">
                    <Skeleton className="h-7 flex-1 rounded-md" />
                    <Skeleton className="h-7 flex-1 rounded-md" />
                  </div>
                </div>
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </div>
  );
}
