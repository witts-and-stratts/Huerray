'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { SubHeader } from '@/components/subheader';
import { CasesShell } from '@/components/admin/cases/cases-shell';

export default function AdminCasesLayout( { children }: { children: ReactNode; } ) {
  const t = useTranslations( 'dashboard.admin.casesPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <CasesShell listHref="/admin/cases">
        { children }
      </CasesShell>
    </>
  );
}
