"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import { Button } from "@/components/dashboard-ui/button";
import { SubHeader } from "@/components/subheader";
import { useAuth } from "@/lib/auth/auth-context";
import { useMyVideoSubmissions } from "@/lib/api/hooks/video-submissions";
import type { ModelsVideoSubmissionResponse } from "@/lib/api/generated/models";
import {
  CreatorKpiOverviewBlock,
  CreatorActiveGigsBlock,
  CreatorProfileSnapshotBlock,
  CreatorInvitationsBlock,
  CreatorSubmissionsBlock,
  CreatorEarningsBlock,
  CreatorNotificationsBlock,
  CreatorActionCenterBlock,
} from "@/components/dashboard/blocks/creator";
import '@/app/styles/components/dashboard-stats.css';

export function CreatorDashboard() {
  const { user } = useAuth();

  // Submissions data is lifted here because the profile snapshot needs the counts
  const submissionsQuery = useMyVideoSubmissions();

  const submissions = useMemo<ModelsVideoSubmissionResponse[]>(
    () => ( submissionsQuery.data?.data || [] ) as ModelsVideoSubmissionResponse[],
    [ submissionsQuery.data?.data ]
  );

  const approvedCount = useMemo(
    () => submissions.filter( ( s ) => ( s.status || "" ).toLowerCase() === "approved" ).length,
    [ submissions ]
  );

  const creatorName = `${ user?.firstName || "" } ${ user?.lastName || "" }`.trim() || user?.email || "Creator";

  return (
    <>
      <SubHeader
        title="Dashboard"
        description="Track invitations, gigs, submissions, and projected earnings."
      >
        <Link href="/creator/gigs">
          <Button className="gap-2">
            <CirclePlus className="size-4" />
            Browse Gigs
          </Button>
        </Link>
        <Link href="/creator/gigs">
          <Button variant="outline" className="gap-2">
            View Gigs
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <section>
          <CreatorKpiOverviewBlock />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CreatorActiveGigsBlock />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CreatorInvitationsBlock />
          <CreatorSubmissionsBlock />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CreatorEarningsBlock />
          <CreatorNotificationsBlock />
          <CreatorActionCenterBlock />
        </section>
      </div>
    </>
  );
}
