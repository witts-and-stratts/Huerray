'use client';

import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';
import { CasesView } from '@/components/admin/cases/cases-view';

export default function CreatorCasesPage() {
  const t = useTranslations( 'dashboard.admin.casesPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <CasesView />
    </>
  );
}
