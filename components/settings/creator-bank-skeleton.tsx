import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';

export function CreatorBankSkeleton() {
  const t = useTranslations( 'dashboard.creator.breadcrumbs' );
  const tPage = useTranslations( 'dashboard.creator.bankPage' );
  const tTabs = useTranslations( 'dashboard.creator.settingsTabs' );
  const breadcrumbs = [
    { label: t( 'dashboard' ), href: '/creator' },
    { label: t( 'settings' ), href: '/creator/settings' },
    { label: t( 'bankDetails' ) },
  ];
  const tabItems = [
    { value: '/creator/settings#profile', label: tTabs( 'profile' ) },
    { value: '/creator/settings#bio', label: tTabs( 'bio' ) },
    { value: '/creator/settings#social-media', label: tTabs( 'socialMedia' ) },
    { value: '/creator/settings/bank', label: tTabs( 'bankDetails' ) },
    { value: '/creator/settings/security', label: tTabs( 'security' ) },
  ];

  return (
    <>
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title={ tPage( 'title' ) }
        description={ tPage( 'description' ) }
        tabs={
          <SubHeaderTabs
            value="/creator/settings/bank"
            onChange={ () => {} }
            tabItems={ tabItems }
          />
        }
      />
      <div className='p-6 space-y-6 bg-slate-50/50 h-full'>
        <div className="space-y-8 animate-pulse">
           <div className="space-y-6">
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
              <div className="space-y-2">
                 <Skeleton className="h-4 w-24" />
                 <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                 <Skeleton className="h-4 w-24" />
                 <Skeleton className="h-32 w-full" />
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
