import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';

export function CreatorSettingsSkeleton({ activeTab, tabItems, handleTabChange, currentDetails }: any) {
  const t = useTranslations( 'dashboard.creator.breadcrumbs' );
  return (
    <>
      <SubHeader
        breadcrumbs={[
          { label: t( 'dashboard' ), href: '/creator' },
          { label: t( 'settings' ), href: '/creator/settings' },
          { label: t( 'loading' ) },
        ]}
        title={currentDetails.title}
        description={currentDetails.description}
        tabs={
          <SubHeaderTabs
            value={activeTab}
            onChange={handleTabChange}
            tabItems={tabItems}
          />
        }
      />
      <div className='p-6 space-y-6 bg-slate-50/50 h-full'>
        <div className="space-y-8 animate-pulse">
           <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                 </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                 <Skeleton className="h-4 w-24" />
                 <Skeleton className="h-32 w-full" />
              </div>
           </div>

           <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid gap-4 md:grid-cols-3">
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                 </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                 </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
