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
  order?: number;
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
  | { section: 'home' | 'faq' | 'tickets' | 'submit' }
  | { section: 'topic'; topicId: HelpTopicId };

export function resolveHelpRoute( role: HelpRole, slugSegments?: string[], helpData?: SanityHelpCenterData | null ): HelpRoute | null {
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

  const topic = helpData?.topics?.find(
    ( item ) => item.slug === slug && (!item.audience || item.audience === role)
  );

  if ( topic ) {
    return { section: 'topic', topicId: topic.topicId };
  }

  return null;
}
