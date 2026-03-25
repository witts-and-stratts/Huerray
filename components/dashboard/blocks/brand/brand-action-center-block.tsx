import { BriefcaseBusiness, CirclePlus, UsersRound } from 'lucide-react';
import { ActionCenterCard, type ActionItem } from '@/components/dashboard/blocks/shared/action-center-card';
import { useTranslations } from 'next-intl';

export function BrandActionCenterBlock() {
  const t = useTranslations( 'dashboard.brand.landing.actionCenter' );
  const actions: ActionItem[] = [
    {
      label: t( 'createCampaign.label' ),
      href: '/brand/campaigns/new',
      detail: t( 'createCampaign.detail' ),
      icon: CirclePlus,
      priority: 'high',
    },
    {
      label: t( 'findCreators.label' ),
      href: '/brand/creators',
      detail: t( 'findCreators.detail' ),
      icon: UsersRound,
      priority: 'medium',
    },
    {
      label: t( 'manageGigs.label' ),
      href: '/brand/campaigns',
      detail: t( 'manageGigs.detail' ),
      icon: BriefcaseBusiness,
      priority: 'medium',
    },
  ];

  return (
    <ActionCenterCard
      actions={ actions }
      description={ t( 'description' ) }
    />
  );
}
