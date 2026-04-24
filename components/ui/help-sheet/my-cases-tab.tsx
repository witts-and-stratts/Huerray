'use client';

import { CasesShell } from '@/components/admin/cases/cases-shell';

interface MyCasesTabProps {
  selectedCaseId?: string;
  listHref: string;
}

export function MyCasesTab( { selectedCaseId, listHref }: MyCasesTabProps ) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden rounded-lg border border-border/60">
      <CasesShell listHref={ listHref } selectedId={ selectedCaseId } />
    </div>
  );
}
