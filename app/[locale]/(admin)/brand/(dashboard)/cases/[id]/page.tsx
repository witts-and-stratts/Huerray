'use client';

import { useParams } from 'next/navigation';
import { CasePage } from '@/components/admin/cases/case-page';

export default function BrandCasePage() {
  const params = useParams<{ id: string; }>();

  return <CasePage caseId={ params.id } />;
}
