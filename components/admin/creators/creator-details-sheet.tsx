'use client';

import { RoleGuard } from '@/components/auth/role-guard';
import { AdminCreatorDetailsSheet } from './details-sheet/admin-creator-details-sheet';
import { BrandCreatorDetailsSheet } from './details-sheet/brand-creator-details-sheet';
import { CreatorDetailsSheetProps } from './details-sheet/creator-details-shared';

// Re-export shared components and props for backward compatibility
export { ExpandableCategories, MetaBadge, Row, SOCIAL_PLATFORMS, SocialLink } from './details-sheet/creator-details-shared';
export { AdminCreatorDetailsSheet, BrandCreatorDetailsSheet };
export type { CreatorDetailsSheetProps };

export function CreatorDetailsSheet( props: CreatorDetailsSheetProps ) {
  if ( !props.creator ) return null;

  return (
    <>
      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <AdminCreatorDetailsSheet { ...props } />
      </RoleGuard>
      <RoleGuard excludedRoles={ [ 'admin' ] }>
        <BrandCreatorDetailsSheet { ...props } />
      </RoleGuard>
    </>
  );
}
