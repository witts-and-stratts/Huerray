import { BriefcaseBusiness, CirclePlus, UsersRound } from 'lucide-react';
import { ActionCenterCard, type ActionItem } from '@/components/dashboard/blocks/shared/action-center-card';

const actions: ActionItem[] = [
  {
    label: 'Create Campaign',
    href: '/brand/campaigns/new',
    detail: 'Launch a new campaign briefing and approval request',
    icon: CirclePlus,
    priority: 'high',
  },
  {
    label: 'Find Creators',
    href: '/brand/creators',
    detail: 'Search creators that match your campaign goals',
    icon: UsersRound,
    priority: 'medium',
  },
  {
    label: 'Manage Gigs',
    href: '/brand/campaigns',
    detail: 'Track gig setup, status, and creator activity',
    icon: BriefcaseBusiness,
    priority: 'medium',
  },
];

export function BrandActionCenterBlock() {
  return (
    <ActionCenterCard
      actions={ actions }
      description="Common actions for campaign operations"
    />
  );
}
