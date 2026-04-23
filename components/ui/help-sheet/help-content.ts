import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChartLineData01Icon,
  UserGroupIcon,
  WalletDone01Icon,
  Task02Icon,
  ImageUpload01Icon,
  UserMultiple02Icon,
  CustomerSupportIcon,
  Settings01Icon,
  Home01Icon,
  QuestionIcon,
} from '@hugeicons/core-free-icons';
import { TOPIC_IDS_BY_ROLE, TOPIC_SLUG_BY_ID } from './help-routing';
import type { HelpRole, HelpTopicId } from './help-routing';

export type HugeIcon = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export type HelpTopic = {
  id: HelpTopicId;
  title: string;
  description: string;
};

export type HelpNavSection = 'home' | 'faq' | 'tickets';

export const baseHelpPathByRole: Record<HelpRole, string> = {
  admin: '/admin/help',
  brand: '/brand/help',
  creator: '/creator/help',
};

export const cardIcons: Record<HelpRole, HugeIcon[]> = {
  brand: [ ChartLineData01Icon, UserGroupIcon, WalletDone01Icon ],
  creator: [ Task02Icon, ImageUpload01Icon, WalletDone01Icon ],
  admin: [ UserMultiple02Icon, CustomerSupportIcon, Settings01Icon ],
};

export const topicFaqIndexes: Record<HelpTopicId, number[]> = {
  'admin-users': [ 0, 1 ],
  'admin-cases': [ 2 ],
  'admin-platform': [ 3, 4 ],
  'brand-start': [ 0, 4 ],
  'brand-creators': [ 1, 3 ],
  'brand-billing': [ 2 ],
  'creator-start': [ 0, 4 ],
  'creator-submit': [ 2, 3 ],
  'creator-earnings': [ 1 ],
};

export const topicLinks: Record<HelpTopicId, Array<{ label: string; href: string; }>> = {
  'admin-users': [
    { label: 'Users', href: '/admin/users' },
    { label: 'Creators', href: '/admin/creators' },
    { label: 'Brands', href: '/admin/brands' },
  ],
  'admin-cases': [
    { label: 'Support Cases', href: '/admin/cases' },
    { label: 'Campaign Cases', href: '/admin/cases' },
    { label: 'Open Tickets', href: '/admin/cases' },
  ],
  'admin-platform': [
    { label: 'Admin Settings', href: '/admin/settings' },
    { label: 'Notifications', href: '/admin/notifications' },
    { label: 'Newsletter', href: '/admin/newsletter' },
  ],
  'brand-start': [
    { label: 'Campaigns', href: '/brand/campaigns' },
    { label: 'New Campaign', href: '/brand/campaigns/new' },
    { label: 'Dashboard', href: '/brand' },
  ],
  'brand-creators': [
    { label: 'Creators', href: '/brand/creators' },
    { label: 'Campaigns', href: '/brand/campaigns' },
    { label: 'Cases', href: '/brand/cases' },
  ],
  'brand-billing': [
    { label: 'Invoices', href: '/brand/invoices' },
    { label: 'Billing Settings', href: '/brand/settings/billing' },
    { label: 'Cases', href: '/brand/cases' },
  ],
  'creator-start': [
    { label: 'Invitations', href: '/creator/invitations' },
    { label: 'Gigs', href: '/creator/gigs' },
    { label: 'Dashboard', href: '/creator' },
  ],
  'creator-submit': [
    { label: 'Active Gigs', href: '/creator/gigs?tab=active' },
    { label: 'My Gigs', href: '/creator/gigs?tab=my-gigs' },
    { label: 'Cases', href: '/creator/cases' },
  ],
  'creator-earnings': [
    { label: 'Earnings', href: '/creator/earnings' },
    { label: 'Bank Settings', href: '/creator/settings/bank' },
    { label: 'Security', href: '/creator/settings/security' },
  ],
};

export const topicActionCopy: Record<HelpTopicId, string[]> = {
  'admin-users': [
    'Review user verification status and account completeness.',
    'Use the profile views to update status, notes, or approvals.',
    'Escalate edge cases via support tickets when data is incomplete.',
  ],
  'admin-cases': [
    'Open new cases and triage by priority and status.',
    'Assign cases to the right admin owner.',
    'Track replies and close only after confirmed resolution.',
  ],
  'admin-platform': [
    'Configure account-level and platform-level preferences.',
    'Use notifications for targeted operational announcements.',
    'Keep operational messaging aligned across newsletters and notifications.',
  ],
  'brand-start': [
    'Create a campaign and define goals, budget, and requirements.',
    'Invite relevant creators or review incoming applications.',
    'Track submissions and approvals directly from campaign views.',
  ],
  'brand-creators': [
    'Filter creators by fit before inviting to campaigns.',
    'Review submissions against brief requirements.',
    'Use case threads for revisions and issue resolution.',
  ],
  'brand-billing': [
    'Review invoice status and payment history regularly.',
    'Keep billing details updated in settings.',
    'Contact support through cases for invoice disputes.',
  ],
  'creator-start': [
    'Review invitations and accept relevant gigs quickly.',
    'Check requirements before applying to avoid rework.',
    'Keep profile and portfolio details current for better matching.',
  ],
  'creator-submit': [
    'Follow brief requirements exactly before uploading content.',
    'Submit through the active gig workflow for tracking.',
    'Use case messages for clarification when feedback is unclear.',
  ],
  'creator-earnings': [
    'Monitor payout status from your earnings page.',
    'Ensure bank details are complete and accurate.',
    'Use support cases for delayed payout investigations.',
  ],
};

export const navItems: Array<{ section: HelpNavSection; labelKey: string; icon: HugeIcon; }> = [
  { section: 'home', labelKey: 'helpSheet.nav.home', icon: Home01Icon },
  { section: 'faq', labelKey: 'helpSheet.nav.faq', icon: QuestionIcon },
  { section: 'tickets', labelKey: 'helpSheet.nav.tickets', icon: CustomerSupportIcon },
];

export function getTopicForRole(
  role: HelpRole,
  topicId: HelpTopicId,
  cards: Array<{ title: string; description: string; }>
): HelpTopic {
  const topicIndex = TOPIC_IDS_BY_ROLE[ role ].indexOf( topicId );
  const fallback = cards[ 0 ] ?? { title: '', description: '' };
  const card = cards[ topicIndex ] ?? fallback;

  return {
    id: topicId,
    title: card.title,
    description: card.description,
  };
}

export function getTopicHref( role: HelpRole, topicId: HelpTopicId ) {
  return `${ baseHelpPathByRole[ role ] }/${ TOPIC_SLUG_BY_ID[ topicId ] }`;
}
