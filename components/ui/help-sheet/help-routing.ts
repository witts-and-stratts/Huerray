export type HelpRole = 'admin' | 'brand' | 'creator';
export type HelpSection = 'home' | 'faq' | 'tickets' | 'submit' | 'topic';

export interface SanityFaq {
  _id: string;
  question: Record<string, string>;
  answer: Record<string, any>;
  category?: { title: string };
}

export interface LocalizedValue {
  en?: string;
  de?: string;
  es?: string;
  fr?: string;
  [key: string]: string | undefined;
}

export interface SanityHelpTopic {
  _id?: string;
  audience?: HelpRole;
  topicId: HelpTopicId;
  orderRank?: string;
  slug?: string;
  title?: LocalizedValue;
  description?: LocalizedValue;
  icon?: string;
  actionItems?: Array<{ text?: LocalizedValue }>;
  quickLinks?: Array<{ label?: LocalizedValue; href?: string }>;
  relatedFaqs?: SanityFaq[];
}

export interface SanityHelpCenterData {
  _id: string;
  audience: HelpRole;
  heroTitle?: LocalizedValue;
  heroSubtitle?: LocalizedValue;
  topics?: SanityHelpTopic[];
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
  | { section: 'home' | 'faq' | 'submit' }
  | { section: 'tickets'; ticketId?: string }
  | { section: 'topic'; topicId: HelpTopicId };

export function resolveHelpRoute( role: HelpRole, slugSegments?: string[], helpData?: SanityHelpCenterData | null ): HelpRoute | null {
  if ( !slugSegments || slugSegments.length === 0 ) {
    return { section: 'home' };
  }

  const slug = decodeURIComponent( slugSegments[ 0 ] ).toLowerCase();

  if ( slug === 'faq' ) {
    return slugSegments.length === 1 ? { section: 'faq' } : null;
  }

  if ( slug === 'tickets' ) {
    if ( slugSegments.length === 1 ) return { section: 'tickets' };
    if ( slugSegments.length === 2 ) {
      return { section: 'tickets', ticketId: decodeURIComponent( slugSegments[ 1 ] ) };
    }
    return null;
  }

  if ( slug === 'submit' ) return slugSegments.length === 1 ? { section: 'submit' } : null;

  if ( slugSegments.length > 1 ) {
    return null;
  }

  const topic = helpData?.topics?.find(
    ( item ) => item.slug === slug && (!item.audience || item.audience === role)
  );

  if ( topic ) {
    return { section: 'topic', topicId: topic.topicId };
  }

  return null;
}
