'use client';

import { useParams } from 'next/navigation';
import { CasePage } from '@/components/admin/cases/case-page';

export default function AdminCasePage() {
  const params = useParams<{ id: string; }>();

  return <CasePage caseId={ params.id } />;
}
