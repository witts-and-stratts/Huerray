'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/dashboard-ui/button';
import { useCase } from '@/lib/api/hooks/cases';
import { CaseDetail } from './case-detail';
import { CaseDetailSkeleton } from './cases-skeleton';

interface CasePageProps {
  caseId: string;
}

export function CasePage( { caseId }: CasePageProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage' );
  const { data, isLoading, error, refetch } = useCase( caseId );

  if ( isLoading ) {
    return (
      <div className="flex h-full flex-1 overflow-hidden">
        <CaseDetailSkeleton />
      </div>
    );
  }

  const caseData = data?.data;

  if ( error || !caseData ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <p className="text-destructive font-medium">{ t( 'title' ) }</p>
        <p className="text-muted-foreground text-sm">{ error?.message || t( 'empty' ) }</p>
        <Button variant="outline" onClick={ () => refetch() }>Retry</Button>
      </div>
    );
  }

  const caseTitle = caseData.title || t( 'details.untitled' );

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <CaseDetail case_={ { ...caseData, title: caseTitle } } />
    </div>
  );
}
