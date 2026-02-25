"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight, BriefcaseBusiness, CirclePlus, Film, Inbox, MapPin, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-ui/avatar";
import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-ui/card";
import { Skeleton } from "@/components/dashboard-ui/skeleton";
import { SubHeader } from "@/components/subheader";
import { useActiveGigs, useMatchingGigs } from "@/lib/api/hooks/creators";
import { useCreatorInvitations } from "@/lib/api/hooks/gigs";
import { useMyVideoSubmissions } from "@/lib/api/hooks/video-submissions";
import { useAuth } from "@/lib/auth/auth-context";
import type { ModelsGigCreatorResponse, ModelsGigInvitationResponse, ModelsVideoSubmissionResponse } from "@/lib/api/generated/models";

function toDate( value?: string ) {
  if ( !value ) return "N/A";
  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return "N/A";
  return date.toLocaleDateString( "en-US", { month: "short", day: "numeric", year: "numeric" } );
}

function toMoney( value: number ) {
  return new Intl.NumberFormat( "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  } ).format( value );
}

function projectedGigEarning( gig: ModelsGigCreatorResponse ) {
  if ( typeof gig.compensation !== "number" ) return 0;
  if ( typeof gig.number_of_videos === "number" && gig.number_of_videos > 0 ) {
    return gig.compensation * gig.number_of_videos;
  }
  return gig.compensation;
}

function statusVariant( status?: string ): "secondary" | "outline" | "destructive" {
  const value = ( status || "" ).toLowerCase();
  if ( [ "accepted", "approved", "active", "running", "submitted" ].includes( value ) ) return "secondary";
  if ( [ "rejected", "declined", "cancelled" ].includes( value ) ) return "destructive";
  return "outline";
}

function KpiCard( {
  title,
  value,
  caption,
  icon: Icon,
  isLoading = false,
}: {
  title: string;
  value: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
  isLoading?: boolean;
} ) {
  return (
    <Card className="ad-kpi-card h-full">
      <CardHeader className="pb-2 min-h-24">
        <CardTitle className="ad-card-title flex items-center gap-2 leading-tight">
          <Icon className="size-4" />
          { title }
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        { isLoading ? (
          <>
            <Skeleton className="h-9 w-24" />
            <Skeleton className="mt-2 h-4 w-44" />
          </>
        ) : (
          <>
            <p className="ad-stat-value">{ value }</p>
            <p className="mt-1 text-xs text-muted-foreground">{ caption }</p>
          </>
        ) }
      </CardContent>
    </Card>
  );
}

export function CreatorDashboard() {
  const { user } = useAuth();

  const matchingQuery = useMatchingGigs( { page: 1, limit: 6 } );
  const activeQuery = useActiveGigs();
  const invitationsQuery = useCreatorInvitations();
  const submissionsQuery = useMyVideoSubmissions();

  const availableGigs = useMemo<ModelsGigCreatorResponse[]>(
    () => ( matchingQuery.data?.data || [] ) as ModelsGigCreatorResponse[],
    [ matchingQuery.data?.data ]
  );

  const activeGigs = useMemo<ModelsGigCreatorResponse[]>(
    () => ( activeQuery.data?.data?.gigs || [] ) as ModelsGigCreatorResponse[],
    [ activeQuery.data?.data?.gigs ]
  );

  const invitations = useMemo<ModelsGigInvitationResponse[]>(
    () => ( invitationsQuery.data?.data || [] ) as ModelsGigInvitationResponse[],
    [ invitationsQuery.data?.data ]
  );

  const submissions = useMemo<ModelsVideoSubmissionResponse[]>(
    () => ( submissionsQuery.data?.data || [] ) as ModelsVideoSubmissionResponse[],
    [ submissionsQuery.data?.data ]
  );

  const totalProjectedEarnings = useMemo(
    () => activeGigs.reduce( ( sum, gig ) => sum + projectedGigEarning( gig ), 0 ),
    [ activeGigs ]
  );

  const approvedCount = useMemo(
    () => submissions.filter( ( submission ) => ( submission.status || "" ).toLowerCase() === "approved" ).length,
    [ submissions ]
  );

  const reviewableCount = useMemo(
    () => submissions.filter( ( submission ) => [ "approved", "rejected" ].includes( ( submission.status || "" ).toLowerCase() ) ).length,
    [ submissions ]
  );

  const completionRate = reviewableCount > 0 ? Math.round( ( approvedCount / reviewableCount ) * 100 ) : 0;

  const creatorName = `${ user?.firstName || "" } ${ user?.lastName || "" }`.trim() || user?.email || "Creator";
  const creatorLocation = "Creator account";

  const recentActiveGigs = activeGigs.slice( 0, 4 );
  const recentInvitations = invitations.slice( 0, 4 );
  const recentSubmissions = [ ...submissions ]
    .sort( ( a, b ) => {
      const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
      const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
      return bTime - aTime;
    } )
    .slice( 0, 4 );

  return (
    <>
      <SubHeader
        title="Dashboard"
        description="Track invitations, gigs, submissions, and projected earnings."
      >
        <Link href="/creator-admin/gigs">
          <Button className="gap-2">
            <CirclePlus className="size-4" />
            Browse Gigs
          </Button>
        </Link>
        <Link href="/creator-admin/my-gigs">
          <Button variant="outline" className="gap-2">
            View My Gigs
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Available Gigs"
            value={ `${ matchingQuery.data?.pagination?.total ?? availableGigs.length }` }
            caption="Open opportunities matching your profile."
            icon={ BriefcaseBusiness }
            isLoading={ matchingQuery.isLoading }
          />
          <KpiCard
            title="Active Gigs"
            value={ `${ activeGigs.length }` }
            caption="Gigs currently assigned to you."
            icon={ Film }
            isLoading={ activeQuery.isLoading }
          />
          <KpiCard
            title="Pending Invitations"
            value={ `${ invitations.filter( ( invitation ) => ( invitation.status || "" ).toLowerCase() === "pending" ).length }` }
            caption="Invitations awaiting your response."
            icon={ Inbox }
            isLoading={ invitationsQuery.isLoading }
          />
          <KpiCard
            title="Projected Earnings"
            value={ toMoney( totalProjectedEarnings ) }
            caption={`Completion rate: ${ completionRate }%`}
            icon={ Wallet }
            isLoading={ activeQuery.isLoading || submissionsQuery.isLoading }
          />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Card className="ad-summary-card lg:col-span-8">
            <CardHeader className="pb-2">
              <CardTitle className="ad-card-title">Active Gigs</CardTitle>
              <CardDescription className="ad-card-description">Current commitments and next deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              { activeQuery.isLoading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : recentActiveGigs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No active gigs yet.</p>
              ) : (
                recentActiveGigs.map( ( gig ) => (
                  <div key={ gig.id || `${ gig.title }-${ gig.created_at }` } className="rounded-lg border border-border/60 bg-white p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{ gig.title || "Untitled gig" }</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          { gig.brand?.company_name || gig.campaign_name || "Unknown brand" }
                        </p>
                      </div>
                      <Badge variant={ statusVariant( gig.gig_status ) }>
                        { ( gig.gig_status || "pending" ).replace( /_/g, " " ) }
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{ toMoney( projectedGigEarning( gig ) ) }</span>
                      <span>Ends { toDate( gig.posting_end_date ) }</span>
                    </div>
                  </div>
                ) )
              ) }
            </CardContent>
          </Card>

          <Card className="ad-summary-card lg:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="ad-card-title">Creator Snapshot</CardTitle>
              <CardDescription className="ad-card-description">Profile context and quick totals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-border/60 bg-white p-4 text-center">
                <Avatar className="mx-auto size-20 border border-border/60">
                  <AvatarImage src={ user?.avatar || "" } alt={ creatorName } />
                  <AvatarFallback>{ creatorName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                </Avatar>
                <p className="mt-3 text-sm font-medium">{ creatorName }</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  { creatorLocation }
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border border-border/60 bg-white p-2.5">
                  <p className="ad-stat-label">Submissions</p>
                  <p className="font-medium">{ submissions.length }</p>
                </div>
                <div className="rounded-lg border border-border/60 bg-white p-2.5">
                  <p className="ad-stat-label">Approved</p>
                  <p className="font-medium">{ approvedCount }</p>
                </div>
              </div>
              <Link href="/creator-admin/settings" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Update Profile
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="ad-summary-card">
            <CardHeader className="pb-2">
              <CardTitle className="ad-card-title">Invitations</CardTitle>
              <CardDescription className="ad-card-description">Latest invitations from brands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              { invitationsQuery.isLoading ? (
                <>
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </>
              ) : recentInvitations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No invitations yet.</p>
              ) : (
                recentInvitations.map( ( invitation ) => (
                  <div key={ invitation.id || `${ invitation.gig_id }-${ invitation.invited_at }` } className="rounded-lg border border-border/60 bg-white p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{ invitation.gig?.title || "Untitled gig" }</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          Invited { toDate( invitation.invited_at ) }
                        </p>
                      </div>
                      <Badge variant={ statusVariant( invitation.status ) }>
                        { ( invitation.status || "pending" ).replace( /_/g, " " ) }
                      </Badge>
                    </div>
                  </div>
                ) )
              ) }
            </CardContent>
          </Card>

          <Card className="ad-summary-card">
            <CardHeader className="pb-2">
              <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
              <CardDescription className="ad-card-description">Your latest delivered videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              { submissionsQuery.isLoading ? (
                <>
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </>
              ) : recentSubmissions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No submissions yet.</p>
              ) : (
                recentSubmissions.map( ( submission ) => (
                  <div key={ submission.id || `${ submission.title }-${ submission.created_at }` } className="rounded-lg border border-border/60 bg-white p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{ submission.title || submission.video_filename || "Untitled submission" }</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          Submitted { toDate( submission.created_at ) }
                        </p>
                      </div>
                      <Badge variant={ statusVariant( submission.status ) }>
                        { ( submission.status || "pending" ).replace( /_/g, " " ) }
                      </Badge>
                    </div>
                  </div>
                ) )
              ) }
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
