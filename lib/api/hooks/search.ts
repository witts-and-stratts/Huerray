/**
 * Global Search Hook
 *
 * Runs parallel search queries across multiple entity types,
 * adapting the endpoints and results based on the user's role.
 */

'use client';

import { useQueries } from '@tanstack/react-query';
import {
  BrandApi,
  CampaignsApi,
  CreatorApi,
  GigsApi,
  InvoiceApi,
  PaymentApi,
  VideoSubmissionsApi,
} from '../generated/api';
import { apiClient, apiConfiguration } from '../client';

// ─── Types ───────────────────────────────────────────────────────────────────

export type EntityType =
  | 'brands'
  | 'campaigns'
  | 'creators'
  | 'gigs'
  | 'invoices'
  | 'payments'
  | 'submissions';

export interface SearchFilters {
  createdAfter?: string;
  createdBefore?: string;
  status?: string;
}

export interface SearchResult {
  id: string;
  type: EntityType;
  title: string;
  subtitle?: string;
  status?: string;
  createdAt?: string;
  /** Extra context shown as small tags */
  tags?: { label: string; value: string }[];
  /** Used for navigation – e.g. campaignId on a submission */
  meta?: Record<string, string | undefined>;
}

export interface SearchGroup {
  type: EntityType;
  items: SearchResult[];
  isLoading: boolean;
  isError: boolean;
}

// ─── Entity type configs per role ────────────────────────────────────────────

export const ENTITY_LABELS: Record<EntityType, string> = {
  brands: 'Brands',
  campaigns: 'Campaigns',
  creators: 'Creators',
  gigs: 'Gigs',
  invoices: 'Invoices',
  payments: 'Payments',
  submissions: 'Submissions',
};

export const ENTITIES_BY_ROLE: Record<string, EntityType[]> = {
  admin: ['brands', 'campaigns', 'creators', 'gigs', 'invoices', 'payments', 'submissions'],
  brand: ['campaigns', 'creators', 'gigs', 'submissions', 'invoices'],
  creator: ['gigs', 'submissions', 'payments'],
};

// ─── API instances ────────────────────────────────────────────────────────────

const brandApi = new BrandApi(apiConfiguration, undefined, apiClient);
const campaignsApi = new CampaignsApi(apiConfiguration, undefined, apiClient);
const creatorApi = new CreatorApi(apiConfiguration, undefined, apiClient);
const gigsApi = new GigsApi(apiConfiguration, undefined, apiClient);
const invoiceApi = new InvoiceApi(apiConfiguration, undefined, apiClient);
const paymentApi = new PaymentApi(apiConfiguration, undefined, apiClient);
const videoApi = new VideoSubmissionsApi(apiConfiguration, undefined, apiClient);

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGlobalSearch({
  role,
  query,
  entityTypes,
  filters = {},
  enabled = true,
}: {
  role: 'admin' | 'brand' | 'creator';
  query: string;
  entityTypes: Set<EntityType>;
  filters?: SearchFilters;
  enabled?: boolean;
}): { groups: SearchGroup[]; isAnyLoading: boolean; hasResults: boolean } {
  const isEnabled = enabled && query.trim().length >= 2;
  const { createdAfter, createdBefore, status } = filters;
  const LIMIT = 6;

  const hasType = (t: EntityType) => entityTypes.has(t);
  const canSearch = (t: EntityType) => isEnabled && hasType(t);

  const queries = useQueries({
    queries: [
      // ── Brands (admin only) ───────────────────────────────────────────────
      {
        queryKey: ['gsearch', 'brands', query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          const res = await brandApi.brandsSearchGet({
            q: query,
            limit: LIMIT,
            createdAfter,
            createdBefore,
            status: status as never,
          });
          return (res.data?.data ?? []).map((b) => ({
            id: b.id ?? b.brand_id ?? '',
            type: 'brands',
            title: b.company_name ?? 'Unknown Brand',
            subtitle: b.category ?? undefined,
            status: b.brand_status ?? undefined,
            createdAt: b.created_at ?? undefined,
            tags: b.country ? [{ label: 'Country', value: String(b.country) }] : [],
          }));
        },
        enabled: canSearch('brands') && role === 'admin',
        staleTime: 20_000,
      },

      // ── Campaigns (admin → /campaigns/search, brand → /brands/search/campaigns) ──
      {
        queryKey: ['gsearch', 'campaigns', role, query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          const items =
            role === 'admin'
              ? (
                  await campaignsApi.campaignsSearchGet({
                    q: query,
                    limit: LIMIT,
                    createdAfter,
                    createdBefore,
                    status: status as never,
                  })
                ).data?.data ?? []
              : (
                  await brandApi.brandsSearchCampaignsGet({
                    q: query,
                    limit: LIMIT,
                    createdAfter,
                    createdBefore,
                    status: status as never,
                  })
                ).data?.data ?? [];

          return items.map((c) => ({
            id: c.id ?? c.campaign_id ?? '',
            type: 'campaigns',
            title: c.campaign_name ?? 'Unknown Campaign',
            subtitle: c.brand_name ?? undefined,
            status: c.campaign_status ?? undefined,
            createdAt: c.created_at ?? undefined,
            tags: c.category ? [{ label: 'Category', value: String(c.category) }] : [],
          }));
        },
        enabled: canSearch('campaigns') && (role === 'admin' || role === 'brand'),
        staleTime: 20_000,
      },

      // ── Creators (admin → /creators/search, brand → /brands/search/creators) ──
      {
        queryKey: ['gsearch', 'creators', role, query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          const items =
            role === 'admin'
              ? (
                  await creatorApi.creatorsSearchGet({
                    q: query,
                    limit: LIMIT,
                    createdAfter,
                    createdBefore,
                    status: status as never,
                  })
                ).data?.data ?? []
              : (
                  await brandApi.brandsSearchCreatorsGet({ q: query, limit: LIMIT })
                ).data?.data ?? [];

          return items.map((c) => ({
            id: c.id ?? c.creator_id ?? '',
            type: 'creators',
            title: [c.first_name, c.last_name].filter(Boolean).join(' ') || c.email || 'Unknown Creator',
            subtitle: c.email ?? undefined,
            status: c.creator_status ?? undefined,
            createdAt: (c as any).created_at ?? undefined,
            tags: c.country ? [{ label: 'Country', value: String(c.country) }] : [],
          }));
        },
        enabled: canSearch('creators') && (role === 'admin' || role === 'brand'),
        staleTime: 20_000,
      },

      // ── Gigs (admin → /gigs/search, brand → /brands/gigs, creator → /creators/search/gigs) ──
      {
        queryKey: ['gsearch', 'gigs', role, query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          let items: any[] = [];
          if (role === 'admin') {
            items =
              (
                await gigsApi.gigsSearchGet({
                  q: query,
                  limit: LIMIT,
                  startDate: createdAfter,
                  endDate: createdBefore,
                  status: status as never,
                })
              ).data?.data ?? [];
          } else if (role === 'brand') {
            items =
              (
                await brandApi.brandsGigsGet({
                  q: query,
                  limit: LIMIT,
                  status: status as never,
                })
              ).data?.data ?? [];
          } else {
            items =
              (
                await creatorApi.creatorsSearchGigsGet({
                  q: query,
                  limit: LIMIT,
                  status: status as never,
                })
              ).data?.data ?? [];
          }
          return items.map((g) => ({
            id: g.id ?? '',
            type: 'gigs',
            title: g.title ?? g.campaign_name ?? 'Unknown Gig',
            subtitle: g.campaign_name ?? undefined,
            status: g.gig_status ?? g.status ?? undefined,
            createdAt: g.created_at ?? undefined,
            meta: { campaignId: g.campaign_id ?? undefined },
          }));
        },
        enabled: canSearch('gigs'),
        staleTime: 20_000,
      },

      // ── Invoices (admin & brand → /invoices/search) ───────────────────────
      {
        queryKey: ['gsearch', 'invoices', query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          const res = await invoiceApi.invoicesSearchGet({
            search: query,
            limit: LIMIT,
            createdAfter,
            createdBefore,
            invoiceStatus: status as never,
          });
          return (res.data?.data ?? []).map((inv) => ({
            id: inv.id ?? '',
            type: 'invoices',
            title: inv.invoice_number ? `#${inv.invoice_number}` : `Invoice ${(inv.id ?? '').slice(0, 8)}`,
            subtitle: inv.brand_name ?? inv.campaign_name ?? undefined,
            status: inv.invoice_status ?? undefined,
            createdAt: inv.created_at ?? undefined,
            tags:
              inv.total_amount != null
                ? [{ label: 'Amount', value: `$${inv.total_amount.toFixed(2)}` }]
                : [],
          }));
        },
        enabled: canSearch('invoices') && (role === 'admin' || role === 'brand'),
        staleTime: 20_000,
      },

      // ── Payments (admin → /payments/search, creator → /creators/payments/search) ──
      {
        queryKey: ['gsearch', 'payments', role, query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          const items =
            role === 'admin'
              ? (
                  await paymentApi.paymentsSearchGet({
                    search: query,
                    limit: LIMIT,
                    createdAfter,
                    createdBefore,
                    paymentStatus: status as never,
                  })
                ).data?.data ?? []
              : (
                  await creatorApi.creatorsPaymentsSearchGet({
                    search: query,
                    limit: LIMIT,
                    createdAfter,
                    createdBefore,
                    paymentStatus: status as never,
                  })
                ).data?.data ?? [];

          return items.map((p) => ({
            id: p.id ?? '',
            type: 'payments',
            title: p.creator_name ?? p.reference ?? `Payment ${(p.id ?? '').slice(0, 8)}`,
            subtitle: p.reference ?? undefined,
            status: p.payment_status ?? undefined,
            createdAt: p.created_at ?? undefined,
            tags:
              p.total_amount != null
                ? [{ label: 'Amount', value: `$${p.total_amount.toFixed(2)}` }]
                : [],
          }));
        },
        enabled: canSearch('payments') && (role === 'admin' || role === 'creator'),
        staleTime: 20_000,
      },

      // ── Submissions (admin → /videos/search, brand → /brands/search/video-submissions, creator → /creators/search/video-submissions) ──
      {
        queryKey: ['gsearch', 'submissions', role, query, filters],
        queryFn: async (): Promise<SearchResult[]> => {
          let items: any[] = [];
          if (role === 'admin') {
            items =
              (
                await videoApi.videosSearchGet({
                  q: query,
                  limit: LIMIT,
                  createdAfter,
                  createdBefore,
                  status: status as never,
                })
              ).data?.data ?? [];
          } else if (role === 'brand') {
            items =
              (
                await brandApi.brandsSearchVideoSubmissionsGet({
                  q: query,
                  limit: LIMIT,
                  createdAfter,
                  createdBefore,
                  status: status as never,
                })
              ).data?.data ?? [];
          } else {
            items =
              (
                await creatorApi.creatorsSearchVideoSubmissionsGet({
                  q: query,
                  limit: LIMIT,
                  createdAfter,
                  createdBefore,
                  status: status as never,
                })
              ).data?.data ?? [];
          }
          return items.map((s) => ({
            id: s.id ?? '',
            type: 'submissions',
            title: s.title ?? `Submission ${(s.id ?? '').slice(0, 8)}`,
            subtitle: (s as any).campaign_name ?? undefined,
            status: s.status ?? undefined,
            createdAt: s.created_at ?? undefined,
            meta: {
              gigId: s.gig_id ?? undefined,
              campaignId: (s as any).campaign_id ?? undefined,
            },
          }));
        },
        enabled: canSearch('submissions'),
        staleTime: 20_000,
      },
    ],
  });

  // Map queries to groups
  const entityOrder = ENTITIES_BY_ROLE[role] ?? [];
  const queryIndexMap: Record<EntityType, number> = {
    brands: 0,
    campaigns: 1,
    creators: 2,
    gigs: 3,
    invoices: 4,
    payments: 5,
    submissions: 6,
  };

  const groups: SearchGroup[] = entityOrder
    .filter((type) => entityTypes.has(type))
    .map((type) => {
      const q = queries[queryIndexMap[type]];
      return {
        type,
        items: (q?.data as SearchResult[] | undefined) ?? [],
        isLoading: q?.isLoading ?? false,
        isError: q?.isError ?? false,
      };
    });

  const isAnyLoading = queries.some((q) => q.isLoading || q.isFetching);
  const hasResults = groups.some((g) => g.items.length > 0);

  return { groups, isAnyLoading, hasResults };
}