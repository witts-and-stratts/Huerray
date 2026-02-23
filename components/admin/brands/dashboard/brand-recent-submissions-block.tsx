'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { VideoSubmissionsApi } from '@/lib/api/generated/api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { toDateLabel } from './brand-dashboard-utils';

interface BrandRecentSubmissionsBlockProps {
  brandId: string;
  campaignIds: string[];
}

function statusVariant(status?: string) {
  if (status === 'approved') return 'secondary' as const;
  if (status === 'returned' || status === 'rejected') return 'destructive' as const;
  return 'outline' as const;
}

export function BrandRecentSubmissionsBlock({ brandId, campaignIds }: BrandRecentSubmissionsBlockProps) {
  const {
    data: recentSubmissions = [],
    isLoading: isRecentSubmissionsLoading,
    isError: isRecentSubmissionsError,
  } = useQuery({
    queryKey: [ 'brand-recent-submissions', brandId, campaignIds ],
    enabled: campaignIds.length > 0,
    queryFn: async () => {
      const videoSubmissionsApi = new VideoSubmissionsApi(apiConfiguration, undefined, apiClient);
      const responses = await Promise.all(
        campaignIds.slice(0, 10).map(async (campaignId) => {
          try {
            const response = await videoSubmissionsApi.videosCampaignCampaignIdGet({ campaignId });
            return response.data?.data || [];
          } catch {
            return [];
          }
        })
      );

      const merged = responses.flat() as ModelsVideoSubmissionResponse[];
      const byId = new Map<string, ModelsVideoSubmissionResponse>();

      for (const submission of merged) {
        if (submission.id) byId.set(submission.id, submission);
      }

      return [ ...byId.values() ]
        .sort((a, b) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
          return bTime - aTime;
        })
        .slice(0, 6);
    },
  });

  return (
    <Card className="ad-summary-card xl:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
        <CardDescription className="ad-card-description">Latest video submissions from brand campaigns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {isRecentSubmissionsLoading && (
          <p className="py-8 text-center text-xs text-muted-foreground">Loading recent submissions...</p>
        )}

        {isRecentSubmissionsError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p>
        )}

        {!isRecentSubmissionsLoading && !isRecentSubmissionsError && recentSubmissions.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">No submissions yet.</p>
        )}

        {!isRecentSubmissionsLoading && !isRecentSubmissionsError && recentSubmissions.map((submission) => {
          const creatorName = submission.creator?.first_name || submission.creator?.last_name
            ? `${submission.creator?.first_name || ''} ${submission.creator?.last_name || ''}`.trim()
            : 'Creator';

          return (
            <div key={submission.id || `${submission.title}-${submission.created_at}`} className="rounded-lg border border-border/60 bg-white p-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={submission.id ? `/admin/submissions/${submission.id}` : '/admin/submissions'}
                    className="text-sm font-medium text-primary hover:underline underline-offset-2"
                  >
                    {submission.title || 'Untitled Submission'}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">Creator: {creatorName}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Submitted: {toDateLabel(submission.created_at)}</p>
                </div>
                <Badge variant={statusVariant(submission.status)} className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
                  {(submission.status || 'pending_approval').replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
