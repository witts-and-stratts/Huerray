export type HelpRole = 'admin' | 'brand' | 'creator';
export type HelpSection = 'home' | 'faq' | 'tickets' | 'submit' | 'topic';

export interface SanityFaq {
  _id: string;
  question: Record<string, string>;
  answer: Record<string, any>;
  category?: { title: string };
}
export type HelpTopicId =
  | 'admin-users'
  | 'admin-cases'
  | 'admin-platform'
  | 'brand-start'
  | 'brand-creators'
  | 'brand-billing'
  | 'creator-start'
  | 'creator-submit'
  | 'creator-earnings';

export type HelpRoute =
  | { section: 'home' | 'faq' | 'tickets' | 'submit' }
  | { section: 'topic'; topicId: HelpTopicId };

export const TOPIC_IDS_BY_ROLE: Record<HelpRole, HelpTopicId[]> = {
  admin: [ 'admin-users', 'admin-cases', 'admin-platform' ],
  brand: [ 'brand-start', 'brand-creators', 'brand-billing' ],
  creator: [ 'creator-start', 'creator-submit', 'creator-earnings' ],
};

export const TOPIC_SLUG_BY_ID: Record<HelpTopicId, string> = {
  'admin-users': 'user-management',
  'admin-cases': 'support-cases',
  'admin-platform': 'platform-settings',
  'brand-start': 'getting-started',
  'brand-creators': 'managing-creators',
  'brand-billing': 'billing-payments',
  'creator-start': 'getting-started',
  'creator-submit': 'submitting-content',
  'creator-earnings': 'earnings-payouts',
};

const topicIdBySlug = Object.fromEntries(
  Object.entries( TOPIC_SLUG_BY_ID ).map( ( [ id, slug ] ) => [ slug, id ] )
) as Record<string, HelpTopicId>;

export function resolveHelpRoute( role: HelpRole, slugSegments?: string[] ): HelpRoute | null {
  if ( !slugSegments || slugSegments.length === 0 ) {
    return { section: 'home' };
  }

  if ( slugSegments.length > 1 ) {
    return null;
  }

  const slug = decodeURIComponent( slugSegments[ 0 ] ).toLowerCase();

  if ( slug === 'faq' ) return { section: 'faq' };
  if ( slug === 'tickets' ) return { section: 'tickets' };
  if ( slug === 'submit' ) return { section: 'submit' };

  const topicId = topicIdBySlug[ slug ];
  if ( topicId && TOPIC_IDS_BY_ROLE[ role ].includes( topicId ) ) {
    return { section: 'topic', topicId };
  }

  return null;
}
