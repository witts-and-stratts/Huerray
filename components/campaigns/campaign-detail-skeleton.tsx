'use client';

import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Separator } from '@/components/dashboard-ui/separator';

// ── Helpers ───────────────────────────────────────────────────────────────────

const VALID_TABS = [ 'overview', 'applications', 'submissions', 'invitations', 'gigs', 'comments' ] as const;
type TabValue = typeof VALID_TABS[ number ];

function getInitialTab(): TabValue {
  if ( typeof window === 'undefined' ) return 'overview';
  const hash = window.location.hash.replace( '#', '' );
  return ( VALID_TABS as readonly string[] ).includes( hash ) ? ( hash as TabValue ) : 'overview';
}

// ── Shared primitives ─────────────────────────────────────────────────────────

/** Mirrors the frosted-glass bottom panel used by ApplicationCard / InvitationCard */
function PhotoCardOverlayPanel( { children }: { children: React.ReactNode } ) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">
      { children }
    </div>
  );
}

/** Mirrors the shared CardShell used by ApplicationCard / InvitationCard */
function PhotoCardSkeleton( { children }: { children: React.ReactNode } ) {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
      <Skeleton className="absolute inset-0 rounded-2xl" />
      { /* top row */ }
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <Skeleton className="h-4 w-16 rounded-full" />  { /* status badge */ }
        <Skeleton className="size-6 rounded-md" />       { /* action menu */ }
      </div>
      { children }
    </div>
  );
}

// ── Overview tab ──────────────────────────────────────────────────────────────

/** Mirrors KpiMetricCard: Card > CardContent p-3, label+icon, big value, progress bar */
function KpiCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-3 w-24" />   { /* label */ }
        <Skeleton className="size-3.5" />    { /* icon */ }
      </div>
      <Skeleton className="h-8 w-20" />    { /* text-[2rem] value */ }
      <div className="h-1.5 w-full rounded-full bg-muted">
        <Skeleton className="h-1.5 w-2/5 rounded-full" />
      </div>
    </div>
  );
}

/** Mirrors CampaignProgressBar: Card flex row, 5 chevron segments */
function PipelineBarSkeleton() {
  return (
    <div className="flex w-full overflow-hidden rounded-md h-9">
      { Array.from( { length: 5 } ).map( ( _, i ) => (
        <Skeleton
          key={ i }
          className={ `flex-1 h-full rounded-none ${ i === 0 ? 'rounded-l-md' : '' } ${ i === 4 ? 'rounded-r-md' : '' }` }
          style={ { opacity: 1 - i * 0.15 } }
        />
      ) ) }
    </div>
  );
}

/** Mirrors WrappedCard: titled section with flush content */
function WrappedCardSkeleton( { titleWidth = 'w-20', lines = 3 }: { titleWidth?: string; lines?: number; } ) {
  return (
    <div className="space-y-2">
      <Skeleton className={ `h-3 ${ titleWidth }` } />
      <div className="rounded-md bg-muted/30 p-3 space-y-1.5">
        { Array.from( { length: lines } ).map( ( _, i ) => (
          <Skeleton key={ i } className="h-3" style={ { width: i === lines - 1 ? '60%' : '100%' } } />
        ) ) }
      </div>
    </div>
  );
}

/** Mirrors CampaignBriefCard: Card grow, header (title+desc+avatar), content sections */
function BriefCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card flex flex-col flex-1">
      { /* CardHeader pb-2 */ }
      <div className="flex items-start justify-between gap-3 p-6 pb-2">
        <div className="space-y-1.5 min-w-0 flex-1">
          <Skeleton className="h-4 w-32" />   { /* CardTitle */ }
          <Skeleton className="h-3 w-48" />   { /* CardDescription */ }
        </div>
        <Skeleton className="size-10 rounded-full shrink-0" /> { /* Brand avatar */ }
      </div>
      { /* CardContent space-y-4 text-sm */ }
      <div className="px-6 pb-6 space-y-4">
        <WrappedCardSkeleton titleWidth="w-24" lines={ 4 } />
        <div className="grid grid-cols-1 gap-4">
          <WrappedCardSkeleton titleWidth="w-10" lines={ 2 } />
          <WrappedCardSkeleton titleWidth="w-14" lines={ 2 } />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <WrappedCardSkeleton titleWidth="w-16" lines={ 1 } />
          <WrappedCardSkeleton titleWidth="w-24" lines={ 1 } />
        </div>
        { /* Keywords */ }
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <div className="flex flex-wrap gap-1.5 mt-2">
            { [ 56, 72, 48, 64, 80, 52 ].map( ( w, i ) => (
              <Skeleton key={ i } className="h-5 rounded-md" style={ { width: w } } />
            ) ) }
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mirrors CampaignMetadataCard: Card pt-0, image, header, 5 MetaRows */
function MetadataCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      { /* Product image: aspect-4/3 */ }
      <Skeleton className="w-full aspect-[4/3]" />
      { /* CardHeader py-4 */ }
      <div className="px-6 py-4 space-y-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
      { /* CardContent: MetaRows *:py-2 *:border-b */ }
      <div className="px-6 pb-4">
        { Array.from( { length: 5 } ).map( ( _, i ) => (
          <div key={ i } className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 shrink-0" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        ) ) }
      </div>
    </div>
  );
}

/** Mirrors CampaignAssetsCard / CampaignWorkflowCard: Card py-4, header, 3-tab list */
function TabCardSkeleton( { tabs }: { tabs: string[]; } ) {
  return (
    <div className="rounded-lg border bg-card py-4">
      <div className="px-6 pb-2 space-y-1.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-44" />
      </div>
      <div className="px-6 space-y-3">
        { /* TabsList */ }
        <div className="flex rounded-md bg-muted/50 p-0.5 gap-0.5">
          { tabs.map( ( _, i ) => (
            <Skeleton key={ i } className={ `h-7 flex-1 rounded-sm ${ i === 0 ? 'opacity-100' : 'opacity-40' }` } />
          ) ) }
        </div>
        { /* Tab content placeholder */ }
        <div className="grid grid-cols-3 gap-2 pt-1">
          { Array.from( { length: 3 } ).map( ( _, i ) => (
            <Skeleton key={ i } className="aspect-square rounded-md" />
          ) ) }
        </div>
      </div>
    </div>
  );
}

function OverviewTabSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      { /* Left — 8 cols */ }
      <div className="space-y-4 lg:col-span-8 flex flex-col">
        { /* 3 KPI cards: grid-cols-2 gap-3 lg:grid-cols-3 */ }
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
        </div>
        <PipelineBarSkeleton />
        <BriefCardSkeleton />
      </div>

      { /* Right — 4 cols */ }
      <div className="space-y-4 lg:col-span-4">
        <MetadataCardSkeleton />
        <TabCardSkeleton tabs={ [ 'Images', 'Documents', 'Videos' ] } />
        <TabCardSkeleton tabs={ [ 'Submissions', 'Applications', 'Invitations' ] } />
      </div>
    </div>
  );
}

// ── Applications tab ──────────────────────────────────────────────────────────
// Mirrors ApplicationCard: aspect-[3/4] CardShell, frosted bottom panel

function ApplicationCardSkeleton() {
  return (
    <PhotoCardSkeleton>
      <PhotoCardOverlayPanel>
        <Skeleton className="h-4 w-40 bg-white/20" />   { /* gig title */ }
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded bg-white/20" />
          <Skeleton className="h-3 w-16 bg-white/20" />
          <Skeleton className="h-3 w-px bg-white/20" />
          <Skeleton className="h-3 w-8 bg-white/20" />
        </div>
        { /* Reward */ }
        <div className="flex flex-col mt-1 gap-0.5">
          <Skeleton className="h-2 w-12 bg-white/20" />
          <Skeleton className="h-4 w-20 bg-white/20" />
        </div>
        { /* Creator */ }
        <div className="flex items-center gap-1.5 mt-0.5">
          <Skeleton className="size-4 rounded-full bg-white/20" />
          <Skeleton className="h-3 w-24 bg-white/20" />
        </div>
        <Skeleton className="h-2.5 w-32 bg-white/20" /> { /* applied date */ }
      </PhotoCardOverlayPanel>
    </PhotoCardSkeleton>
  );
}

function ApplicationsTabSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      { Array.from( { length: 6 } ).map( ( _, i ) => <ApplicationCardSkeleton key={ i } /> ) }
    </div>
  );
}

// ── Submissions tab ───────────────────────────────────────────────────────────
// Mirrors SubmissionCard (media-overlay layout): Card bg-black, aspect-video player,
// overlay gradient, bottom: avatar + creator name + meta

function SubmissionCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/60 bg-black">
      { /* OverlayVideoPlayer: aspect-video */ }
      <Skeleton className="w-full aspect-video rounded-none bg-white/10" />
      { /* Right-side controls (play, expand, comments) */ }
      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <Skeleton className="size-8 rounded-full bg-white/20" />
        <Skeleton className="size-8 rounded-full bg-white/20" />
        <Skeleton className="w-8 h-10 rounded-full bg-white/20" />
      </div>
      { /* Bottom overlay: submission-card__content--standard p-3 */ }
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 p-3">
        <div className="flex justify-between items-end gap-3">
          <Skeleton className="size-8 rounded-full bg-white/30 shrink-0" /> { /* avatar */ }
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-28 bg-white/30" />  { /* creator name */ }
            <div className="flex items-center gap-1">
              <Skeleton className="h-2.5 w-20 bg-white/20" />
              <Skeleton className="h-2.5 w-1 bg-white/20" />
              <Skeleton className="h-2.5 w-16 bg-white/20" />
            </div>
          </div>
          { /* Status badge + action menu */ }
          <div className="flex items-end gap-1 shrink-0">
            <Skeleton className="h-5 w-16 rounded-full bg-white/20" />
            <Skeleton className="size-6 rounded-md bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmissionsTabSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { Array.from( { length: 6 } ).map( ( _, i ) => <SubmissionCardSkeleton key={ i } /> ) }
    </div>
  );
}

// ── Invitations tab ───────────────────────────────────────────────────────────
// Mirrors InvitationCard (AdminBrandInvitationCard): same aspect-[3/4] CardShell.
// Bottom frosted panel: creator name + gig title row w/ info icon

function InvitationCardSkeleton() {
  return (
    <PhotoCardSkeleton>
      <PhotoCardOverlayPanel>
        <Skeleton className="h-4 w-36 bg-white/20" />  { /* creator name */ }
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 flex-1 bg-white/20" />  { /* gig title */ }
          <Skeleton className="size-3.5 bg-white/20 shrink-0" /> { /* info icon */ }
        </div>
      </PhotoCardOverlayPanel>
    </PhotoCardSkeleton>
  );
}

function InvitationsTabSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { Array.from( { length: 6 } ).map( ( _, i ) => <InvitationCardSkeleton key={ i } /> ) }
    </div>
  );
}

// ── Gigs tab ──────────────────────────────────────────────────────────────────
// Mirrors GigCard: Card flex-col gap-0 p-0 h-full
// Header (flex items-start px-4 pt-4 pb-0 gap-3): title+desc | cover circle+brand | btn+menu
// CardContent (px-4 pt-4 pb-4, flex-col gap-3):
//   - grid-cols-2: GigTaskBlock (TASK label + 2 icon rows) | GigRewardBlock (REWARD label + price)
//   - GigDeadlineRow (border-t pt-2): deadline label+date | status badge

function GigCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card flex flex-col overflow-hidden gap-0 p-0 h-full">
      { /* GigCardHeader: flex items-start px-4 pt-4 pb-0 gap-3 */ }
      <div className="flex items-start px-4 pt-4 pb-0 gap-3">
        <div className="flex flex-col flex-1 min-w-0 space-y-1.5">
          <Skeleton className="h-4 w-40" />   { /* title */ }
          <Skeleton className="h-3 w-32" />   { /* description / campaign name */ }
        </div>
        { /* Cover image circle + brand avatar overlay */ }
        <div className="relative size-12 shrink-0">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="absolute -right-1 -bottom-0.5 size-6 rounded-full border-2 border-background" />
        </div>
        { /* Submissions btn + action menu */ }
        <div className="flex items-center gap-1 -mr-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      </div>

      { /* CardContent: px-4 pt-4 pb-4 flex flex-col gap-3 flex-1 */ }
      <div className="px-4 pt-4 pb-4 flex flex-col gap-3 flex-1">
        { /* Task / Reward 2-col block */ }
        <div className="grid grid-cols-2 gap-3">
          { /* GigTaskBlock: TASK label + 2 rows */ }
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-8" />  { /* TASK label (10px uppercase) */ }
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 shrink-0" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 shrink-0" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          { /* GigRewardBlock: text-right, REWARD label + big price */ }
          <div className="flex flex-col gap-1.5 items-end">
            <Skeleton className="h-2.5 w-14" />  { /* REWARD label */ }
            <Skeleton className="h-6 w-20" />     { /* text-xl price */ }
          </div>
        </div>

        { /* GigDeadlineRow: border-t mt-auto pt-2, deadline + status badge */ }
        <div className="flex items-center justify-between border-t border-border/50 mt-auto pt-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-3.5 shrink-0" />
            <Skeleton className="h-2.5 w-16" />  { /* DEADLINE label */ }
            <Skeleton className="h-3 w-20" />     { /* date */ }
          </div>
          <Skeleton className="h-5 w-16 rounded-full" /> { /* GigStatusBadge */ }
        </div>
      </div>
    </div>
  );
}

function GigsTabSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
      { Array.from( { length: 6 } ).map( ( _, i ) => <GigCardSkeleton key={ i } /> ) }
    </div>
  );
}

// ── Comments tab ──────────────────────────────────────────────────────────────
// Mirrors CommentsThread: flex-col, ScrollArea with MessageGroupItems, input bar

function CommentsTabSkeleton() {
  const groups = [
    { own: false, messages: 1, nameWidth: 80 },
    { own: true,  messages: 2, nameWidth: 64 },
    { own: false, messages: 1, nameWidth: 96 },
    { own: true,  messages: 1, nameWidth: 64 },
    { own: false, messages: 2, nameWidth: 72 },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-lg border bg-card overflow-hidden">
      { /* Scrollable message area */ }
      <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-[360px]">
        { groups.map( ( g, gi ) => (
          <div key={ gi } className={ `flex items-end gap-2 ${ g.own ? 'flex-row-reverse' : '' }` }>
            { /* Avatar */ }
            <Skeleton className="size-8 rounded-full shrink-0" />
            <div className={ `flex flex-col gap-1 max-w-[70%] ${ g.own ? 'items-end' : 'items-start' }` }>
              { /* Sender name + time */ }
              <div className={ `flex items-center gap-2 ${ g.own ? 'flex-row-reverse' : '' }` }>
                <Skeleton style={ { width: g.nameWidth } } className="h-3" />
                <Skeleton className="h-3 w-12" />
              </div>
              { /* Message bubbles */ }
              { Array.from( { length: g.messages } ).map( ( _, mi ) => (
                <Skeleton
                  key={ mi }
                  className="h-9 rounded-2xl"
                  style={ { width: 120 + ( ( gi + mi ) % 3 ) * 40 } }
                />
              ) ) }
            </div>
          </div>
        ) ) }
      </div>

      { /* Input bar: SuperField + Send button */ }
      <div className="border-t p-3 flex items-end gap-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md shrink-0" />
      </div>
    </div>
  );
}

// ── Tab dispatcher ────────────────────────────────────────────────────────────

function TabContentSkeleton( { tab }: { tab: TabValue; } ) {
  switch ( tab ) {
    case 'applications': return <ApplicationsTabSkeleton />;
    case 'submissions':  return <SubmissionsTabSkeleton />;
    case 'invitations':  return <InvitationsTabSkeleton />;
    case 'gigs':         return <GigsTabSkeleton />;
    case 'comments':     return <CommentsTabSkeleton />;
    default:             return <OverviewTabSkeleton />;
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

const TAB_WIDTHS: Record<TabValue, number> = {
  overview:     72,
  applications: 100,
  submissions:  96,
  invitations:  90,
  gigs:         46,
  comments:     82,
};

export function CampaignDetailSkeleton() {
  const activeTab = getInitialTab();

  return (
    <>
      { /* SubHeader skeleton — mirrors SubHeader exactly */ }
      <div className="pt-4 sticky top-0 bg-background z-50">
        { /* Breadcrumbs: mb-8 px-5 */ }
        <div className="flex items-center gap-2 mb-8 px-5">
          <Skeleton className="h-3.5 w-20" />
          <span className="text-muted-foreground/30 text-xs">/</span>
          <Skeleton className="h-3.5 w-36" />
        </div>

        { /* Title row: px-5 pb-4 */ }
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />           { /* pre: "Campaign" */ }
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-52" />         { /* campaign name */ }
              <Skeleton className="h-5 w-20 rounded-full" /> { /* StatusBadge */ }
            </div>
          </div>
          { /* ButtonGroup: primary action + chevron menu */ }
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>

        { /* SubHeaderTabs */ }
        <div className="flex items-center gap-1 px-5 pb-0">
          { ( VALID_TABS as readonly TabValue[] ).map( ( tab ) => (
            <Skeleton
              key={ tab }
              className="h-8 rounded-md"
              style={ {
                width: TAB_WIDTHS[ tab ],
                opacity: tab === activeTab ? 1 : 0.45,
              } }
            />
          ) ) }
        </div>

        <Separator className="mt-0" />
      </div>

      { /* Tab content: mirrors the p-2 md:p-6 bg-slate-50/80 wrapper */ }
      <div className="p-2 md:p-6 bg-slate-50/80 flex flex-col flex-1 min-h-0 overflow-y-auto">
        <TabContentSkeleton tab={ activeTab } />
      </div>
    </>
  );
}
