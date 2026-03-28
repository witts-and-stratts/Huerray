import { SubHeader } from '@/components/subheader';
import { NewPaymentButton } from '@/components/payments/new-payment-sheet';
import { getTranslations } from 'next-intl/server';
import { AdminPaymentsClient } from './admin-payments-client';

export default async function AdminPaymentsPage() {
  const t = await getTranslations( 'dashboard.admin.paymentsPage' );

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <NewPaymentButton />
      </SubHeader>
      <div className='bg-slate-50/50 flex flex-col flex-1 min-h-0 overflow-hidden'>
        <AdminPaymentsClient />
      </div>
    </div>
  );
}
