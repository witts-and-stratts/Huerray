import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminPaymentsClient } from './admin-payments-client';

export default async function AdminPaymentsPage() {
  const t = await getTranslations( 'dashboard.admin.paymentsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <AdminPaymentsClient />
    </>
  );
}
