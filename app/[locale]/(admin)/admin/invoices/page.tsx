import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminInvoicesClient } from './admin-invoices-client';

export default async function AdminInvoicesPage() {
  const t = await getTranslations( 'dashboard.admin.invoicesPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <AdminInvoicesClient />
    </>
  );
}
