'use client';

import Link from 'next/link';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Progress } from '@/components/dashboard-ui/progress';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useBrands } from '@/lib/api/hooks/brands';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import { useCreators } from '@/lib/api/hooks/creators';
import { CampaignsSearchGetStatusEnum } from '@/lib/api/generated/api/campaigns-api';
import { useUsers } from '@/lib/api/hooks/users';
import { useVideoSubmissionsSearch } from '@/lib/api/hooks/video-submissions';
import { useMemo } from 'react';

export function ApprovalQueuesBlock() {
  const { data: usersPendingResponse, isLoading: isUsersPendingLoading } = useUsers( { status: 'pending_approval', page: 1, limit: 1 } );
  const { data: brandsPendingResponse, isLoading: isBrandsPendingLoading } = useBrands( { status: 'pending_approval', page: 1, limit: 1 } );
  const { data: creatorsPendingResponse, isLoading: isCreatorsPendingLoading } = useCreators( { status: 'pending_approval', page: 1, limit: 1 } );
  const { data: campaignsPendingResponse, isLoading: isCampaignsPendingLoading } = useCampaigns( {
    status: CampaignsSearchGetStatusEnum.CampaignStatusPendingApproval,
    page: 1,
    limit: 1,
  } );
  const { data: submissionsPendingResponse, isLoading: isSubmissionsPendingLoading } = useVideoSubmissionsSearch( { status: 'pending_approval', page: 1, limit: 1 } );

  const approvalQueues = useMemo( () => {
    const usersPending = usersPendingResponse?.data?.pagination?.total ?? ( usersPendingResponse?.data?.data?.length || 0 );
    const brandsPending = brandsPendingResponse?.pagination?.total ?? ( brandsPendingResponse?.data?.length || 0 );
    const creatorsPending = creatorsPendingResponse?.pagination?.total ?? ( creatorsPendingResponse?.data?.length || 0 );
    const campaignsPending = campaignsPendingResponse?.pagination?.total ?? ( campaignsPendingResponse?.data?.length || 0 );
    const submissionsPending = submissionsPendingResponse?.pagination?.total ?? ( submissionsPendingResponse?.data?.length || 0 );

    return [
      { label: 'Users Awaiting Approval', count: usersPending, slaHours: 18, href: '/admin/users' },
      { label: 'Brand Profiles Awaiting Approval', count: brandsPending, slaHours: 24, href: '/admin/brands' },
      { label: 'Creator Profiles Awaiting Approval', count: creatorsPending, slaHours: 24, href: '/admin/creators' },
      { label: 'Campaigns Pending Admin Review', count: campaignsPending, slaHours: 12, href: '/admin/campaigns' },
      { label: 'Video Submissions Pending Decision', count: submissionsPending, slaHours: 8, href: '/admin/submissions' },
    ];
  }, [
    brandsPendingResponse?.data?.length,
    brandsPendingResponse?.pagination?.total,
    campaignsPendingResponse?.data?.length,
    campaignsPendingResponse?.pagination?.total,
    creatorsPendingResponse?.data?.length,
    creatorsPendingResponse?.pagination?.total,
    submissionsPendingResponse?.data?.length,
    submissionsPendingResponse?.pagination?.total,
    usersPendingResponse?.data?.data?.length,
    usersPendingResponse?.data?.pagination?.total,
  ] );

  const isLoading = isUsersPendingLoading
    || isBrandsPendingLoading
    || isCreatorsPendingLoading
    || isCampaignsPendingLoading
    || isSubmissionsPendingLoading;

  const maxQueue = Math.max( ...approvalQueues.map( ( q ) => q.count ) );

  return (
    <Card className="ad-card">
      <CardHeader className="ad-queue-header">
        <div>
          <CardTitle className="ad-card-title">Approval Queues</CardTitle>
          <CardDescription className="ad-card-description">Prioritize review queues to avoid blocking marketplace operations</CardDescription>
        </div>
        <Button variant="outline" size="xs" render={ <Link href="/admin/notifications" /> }>View All Queues</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[420px] pr-2" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
          <div className="ad-queue-list">
            { isLoading && Array.from( { length: 4 } ).map( ( _, index ) => (
              <div key={ `approval-queue-skeleton-${ index }` } className="ad-queue-item">
                <div className="ad-queue-top">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="mb-3 h-2 w-full" />
                <div className="ad-queue-bottom">
                  <Skeleton className="h-8 w-10" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>
            ) ) }

            { !isLoading && approvalQueues.map( ( queue ) => (
              <div key={ queue.label } className="ad-queue-item">
                <div className="ad-queue-top">
                  <p className="text-sm font-medium">{ queue.label }</p>
                  <Badge variant={ queue.slaHours <= 12 ? 'destructive' : queue.slaHours <= 24 ? 'secondary' : 'outline' }>
                    SLA: { queue.slaHours }h
                  </Badge>
                </div>
                <Progress
                  value={ maxQueue > 0 ? Math.round( ( queue.count / maxQueue ) * 100 ) : 0 }
                  className="mb-3"
                />
                <div className="ad-queue-bottom">
                  <p className="ad-queue-count">{ queue.count }</p>
                  <Button variant="ghost" size="sm" render={ <Link href={ queue.href } /> }>Review Queue</Button>
                </div>
              </div>
            ) ) }
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
