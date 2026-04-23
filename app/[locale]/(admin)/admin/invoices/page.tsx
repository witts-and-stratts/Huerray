import type { Metadata } from 'next';
import { SubHeader } from '@/components/subheader';
import { getTranslations } from 'next-intl/server';
import { AdminInvoicesClient } from './admin-invoices-client';
import { NewInvoiceDialog } from '@/components/invoices/new-invoice-dialog';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'admin.invoices' ),
  };
}

export default async function AdminInvoicesPage() {
  const t = await getTranslations( 'dashboard.admin.invoicesPage' );

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <NewInvoiceDialog />
      </SubHeader>
      <div className='bg-slate-50/50 flex flex-col flex-1 min-h-0 overflow-hidden'>
        <AdminInvoicesClient />
      </div>
    </div>
  );
}
