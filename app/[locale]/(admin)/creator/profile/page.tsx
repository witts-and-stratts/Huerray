'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Loader2, Pencil } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { Button } from '@/components/dashboard-ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { useCreatorProfile } from '@/lib/api/hooks/creators';
import {
  CreatorProfileBlock,
  CreatorBioBlock,
  CreatorVideoBlock,
  CreatorPortfolioBlock,
  CreatorSocialBlock,
} from '@/components/admin/creators/dashboard';

export default function CreatorProfilePage() {
  const { user } = useAuth();

  const { data: creatorData, isLoading: isCreatorLoading, error: creatorError } = useCreatorProfile();

  const creator = creatorData;

  if ( isCreatorLoading ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
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
          { label: 'Profile', href: '/creator/profile' },
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
            <CreatorProfileBlock creator={ creator as any } creatorName={ creatorName } creatorAvatar={ creatorAvatar } />
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
