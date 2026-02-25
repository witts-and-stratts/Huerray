import type { ModelsCampaignResponse, ModelsGigBrandResponse, ModelsGigResponse } from '@/lib/api/generated/models';

export interface BrandDashboardSummary {
  pending: number;
  approved: number;
  returned: number;
  running: number;
  totalSpend: number;
  avgGigSpend: number;
  thisMonthSpend: number;
}

export type BrandGigLike = ModelsGigResponse | ModelsGigBrandResponse;

export type CampaignStatusVariant = 'secondary' | 'destructive' | 'outline';

export function toMoney( value: number ) {
  return new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  } ).format( value );
}

export function toShortDate( date?: string ) {
  if ( !date ) return 'N/A';
  return new Date( date ).toLocaleDateString( 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } );
}

export function campaignStatusVariant( status: string ): CampaignStatusVariant {
  const normalized = status.toLowerCase();
  if ( [ 'gigs_approved', 'running', 'completed' ].includes( normalized ) ) {
    return 'secondary';
  }
  if ( [ 'returned', 'deactivated' ].includes( normalized ) ) {
    return 'destructive';
  }
  return 'outline';
}

export function calculateGigSpend( gig: BrandGigLike ) {
  if ( typeof gig.gig_cost === 'number' ) return gig.gig_cost;
  if ( typeof gig.compensation === 'number' && typeof gig.number_of_videos === 'number' ) {
    return gig.compensation * gig.number_of_videos;
  }
  if ( typeof gig.compensation === 'number' ) return gig.compensation;
  return 0;
}

export function buildSummary( campaigns: ModelsCampaignResponse[], gigs: BrandGigLike[] ): BrandDashboardSummary {
  const pending = campaigns.filter( ( campaign ) => campaign.campaign_status === 'pending_approval' ).length;
  const approved = campaigns.filter( ( campaign ) =>
    [ 'gigs_approved', 'running', 'completed' ].includes( String( campaign.campaign_status ) )
  ).length;
  const returned = campaigns.filter( ( campaign ) => campaign.campaign_status === 'returned' ).length;
  const running = campaigns.filter( ( campaign ) => campaign.campaign_status === 'running' ).length;

  const totalSpend = gigs.reduce( ( sum, gig ) => sum + calculateGigSpend( gig ), 0 );
  const avgGigSpend = gigs.length > 0 ? totalSpend / gigs.length : 0;

  const now = new Date();
  const thisMonthSpend = gigs.reduce( ( sum, gig ) => {
    if ( !gig.created_at ) return sum;
    const created = new Date( gig.created_at );
    if ( created.getFullYear() !== now.getFullYear() || created.getMonth() !== now.getMonth() ) return sum;
    return sum + calculateGigSpend( gig );
  }, 0 );

  return {
    pending,
    approved,
    returned,
    running,
    totalSpend,
    avgGigSpend,
    thisMonthSpend,
  };
}
