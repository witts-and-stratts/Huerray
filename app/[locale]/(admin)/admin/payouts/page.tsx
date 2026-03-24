import { SubHeader } from '@/components/subheader';
import { NewBatchPaymentButton } from '@/components/payments/new-batch-payment-sheet';
import { getTranslations } from 'next-intl/server';
import { AdminPaymentsClient } from './admin-payments-client';

export default async function AdminPaymentsPage() {
  const t = await getTranslations( 'dashboard.admin.paymentsPage' );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <NewBatchPaymentButton />
      </SubHeader>
      <div className='bg-slate-50/50 flex-1'>
        <AdminPaymentsClient />
      </div>
    </>
  );
}
