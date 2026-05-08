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
import type { HelpRole, LocalizedValue } from './help-routing';

export const iconMap: Record<string, HugeIcon> = {
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
};

export type HugeIcon = Parameters<typeof HugeiconsIcon>[ 0 ][ 'icon' ];

export type HelpTopic = {
  id: string;
  title: string;
  description: string;
};

export type HelpNavSection = 'home' | 'faq' | 'tickets';

export const baseHelpPathByRole: Record<HelpRole, string> = {
  admin: '/admin/help',
  brand: '/brand/help',
  creator: '/creator/help',
};

export const supportTicketsPathByRole: Record<HelpRole, string> = {
  admin: '/admin/support-tickets',
  brand: '/brand/support-tickets',
  creator: '/creator/support-tickets',
};

export const cardIcons: Record<HelpRole, HugeIcon[]> = {
  brand: [ ChartLineData01Icon, UserGroupIcon, WalletDone01Icon ],
  creator: [ Task02Icon, ImageUpload01Icon, WalletDone01Icon ],
  admin: [ UserMultiple02Icon, CustomerSupportIcon, Settings01Icon ],
};

export const navItems: Array<{ section: HelpNavSection; labelKey: string; icon: HugeIcon; }> = [
  { section: 'home', labelKey: 'helpSheet.nav.home', icon: Home01Icon },
  { section: 'faq', labelKey: 'helpSheet.nav.faq', icon: QuestionIcon },
  { section: 'tickets', labelKey: 'helpSheet.nav.tickets', icon: CustomerSupportIcon },
];

export function getLocalizedValue( value: LocalizedValue | undefined, locale: string, fallback = '' ) {
  return value?.[ locale ] || value?.en || fallback;
}
