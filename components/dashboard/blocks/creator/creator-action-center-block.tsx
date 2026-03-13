import { BriefcaseBusiness, Film, Inbox, Settings } from 'lucide-react';
import { ActionCenterCard, type ActionItem } from '@/components/dashboard/blocks/shared/action-center-card';

const actions: ActionItem[] = [
  {
    label: 'Browse Gigs',
    href: '/creator/gigs',
    detail: 'Discover new gig opportunities that match your profile',
    icon: BriefcaseBusiness,
    priority: 'high',
  },
  {
    label: 'View Invitations',
    href: '/creator/invitations',
    detail: 'Review invitations from brands and accept or decline',
    icon: Inbox,
    priority: 'medium',
  },
  {
    label: 'My Submissions',
    href: '/creator/my-gigs',
    detail: 'Track your video submissions and approval status',
    icon: Film,
    priority: 'medium',
  },
  {
    label: 'Update Profile',
    href: '/creator/settings',
    detail: 'Keep your profile up-to-date for better gig matches',
    icon: Settings,
    priority: 'low',
  },
];

export function CreatorActionCenterBlock() {
  return (
    <ActionCenterCard
      actions={ actions }
      description="Quick actions for your creator workflow"
    />
  );
}
