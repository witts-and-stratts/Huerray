'use client';

import { SubmissionCard } from '@/components/campaigns/submission-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import { EmptySubmission } from '../../empty-states/empty-submissions';
import { useTranslations } from "next-intl";

interface BrandRecentSubmissionsBlockProps {
  brandId: string;
}

function RecentSubmissionItemSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-white p-2.5">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function BrandRecentSubmissionsBlock( { brandId: _brandId }: BrandRecentSubmissionsBlockProps ) {
  const t = useTranslations('dashboard.admin');
  const { data, isLoading, isError } = useBrandVideoSubmissions( { page: 1, limit: 8 } );
  const recentSubmissions = data?.data ?? [];

  return (
    <Card className="ad-summary-card xl:col-span-2 grow">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{t('brandRecentSubmissionsBlock.recentSubmissions')}</CardTitle>
        <CardDescription className="ad-card-description">{t('brandRecentSubmissionsBlock.latestVideoSubmissionsAcross')}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        { isLoading && (
          <div className="space-y-2">
            { Array.from( { length: 4 } ).map( ( _, index ) => (
              <RecentSubmissionItemSkeleton key={ `recent-submission-skeleton-${ index }` } />
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">{t('brandRecentSubmissionsBlock.unableToLoadRecent')}</p>
        ) }

        { !isLoading && !isError && recentSubmissions.length === 0 && (
          <EmptySubmission imageWidth={ 150 } />
        ) }

        { !isLoading && !isError && recentSubmissions.length > 0 && (
          <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
            <div className="flex w-max gap-2 p-0.5">
              { recentSubmissions.map( ( submission ) => (
                <div
                  key={ submission.id || `${ submission.title }-${ submission.created_at }` }
                  className="w-[320px] md:w-[360px] shrink-0"
                >
                  <SubmissionCard submission={ submission } layout="media-overlay" />
                </div>
              ) ) }
            </div>
          </ScrollArea>
        ) }
      </CardContent>
    </Card>
  );
}
