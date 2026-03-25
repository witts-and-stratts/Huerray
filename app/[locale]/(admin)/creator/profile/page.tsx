'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { Button } from '@/components/dashboard-ui/button';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/dashboard-ui/card';
import { useAuth } from '@/lib/auth/auth-context';
import { useCreatorProfile } from '@/lib/api/hooks/creators';
import {
  CreatorProfileBlock,
  CreatorBioBlock,
  CreatorVideoBlock,
  CreatorPortfolioBlock,
  CreatorSocialBlock,
} from '@/components/admin/creators/dashboard';

function CreatorProfileSkeleton() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="ad-shell p-4 bg-slate-50/50 mt-0 flex-1">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          {/* Left: profile card skeleton */}
          <aside className="space-y-4 md:col-span-6">
            <Card className="ad-summary-card border-primary/20 bg-burgundy-50 h-full">
              <CardHeader className="py-3">
                <div className="flex flex-col items-center text-center gap-3">
                  <Skeleton className="size-48 rounded-full" />
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-20 mt-1" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-4 space-y-3">
                <Skeleton className="h-8 w-full" />
                {[ ...Array( 4 ) ].map( ( _, i ) => (
                  <div key={ i } className="flex justify-between gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ) )}
              </CardContent>
            </Card>
          </aside>

          {/* Right: content blocks skeleton */}
          <section className="space-y-4 md:col-span-6">
            {/* Video block */}
            <Card className="pt-4">
              <CardHeader>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56 mt-1" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full aspect-video rounded-lg" />
              </CardContent>
            </Card>

            {/* Bio block */}
            <Card className="pt-4">
              <CardHeader>
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
            </Card>

            {/* Social block */}
            <Card className="pt-4">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[ ...Array( 3 ) ].map( ( _, i ) => (
                    <Skeleton key={ i } className="h-10 w-36 rounded-lg" />
                  ) )}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio block */}
            <Card className="pt-4">
              <CardHeader>
                <Skeleton className="h-5 w-24" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[ ...Array( 2 ) ].map( ( _, i ) => (
                    <Skeleton key={ i } className="h-12 rounded-lg" />
                  ) )}
                </div>
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </div>
  );
}

export default function CreatorProfilePage() {
  const tNav = useTranslations('dashboard.creator.breadcrumbs');
  const { user } = useAuth();

  const { data: creatorData, isLoading: isCreatorLoading, error: creatorError } = useCreatorProfile();

  const creator = creatorData;

  if ( isCreatorLoading ) {
    return <CreatorProfileSkeleton />;
  }

  if ( creatorError || ( !isCreatorLoading && !creator ) ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-medium text-red-800">Failed to load profile</h3>
        <p className="text-sm text-red-600">{ ( creatorError as Error )?.message || 'Profile not found' }</p>
      </div>
    );
  }

  const creatorName = [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || user?.firstName || 'My Profile';
  const creatorAvatar = ( creator as any )?.profile_image?.asset || ( creator as any )?.avatar_url || user?.avatar || '';

  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title={ creatorName }
        description="Your profile overview and details"
        breadcrumbs={ [
          { label: tNav('profile'), href: '/creator/profile' },
        ] }
      >
        <Link href="/creator/settings">
          <Button variant="outline" size="sm" className="gap-2 font-normal">
            <Pencil className="size-3.5" />
            Edit Profile
          </Button>
        </Link>
      </SubHeader>

      <div className="ad-shell p-4 bg-slate-50/50 mt-0 flex-1">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-6 md:sticky md:top-24 md:self-start h-full">
            <CreatorProfileBlock creator={ creator as any } creatorName={ creatorName } creatorAvatar={ creatorAvatar } useProfileEndpoint />
          </aside>

          <section className="space-y-4 md:col-span-6">
            <div className="flex flex-col gap-4">
              <CreatorVideoBlock creator={ creator! } />
              <CreatorBioBlock creator={ creator! } />
              <CreatorSocialBlock creator={ creator! } />
              <CreatorPortfolioBlock creator={ creator! } />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
