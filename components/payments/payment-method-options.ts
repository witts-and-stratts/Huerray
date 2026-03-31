import { type SelectOption } from '@/components/dashboard-ui/superfield/types';
import { UtilsPaymentMethod } from '@/lib/api/generated/models';

export function getPaymentMethodOptions(
  t: ( key: string ) => string
): SelectOption[] {
  return [
    {
      value: UtilsPaymentMethod.PaymentMethodBankTransfer,
      label: t( 'batchPayment.paymentMethods.bankTransfer' ),
    },
    {
      value: UtilsPaymentMethod.PaymentMethodPayPal,
      label: t( 'batchPayment.paymentMethods.paypal' ),
    },
    {
      value: UtilsPaymentMethod.PaymentMethodOther,
      label: t( 'batchPayment.paymentMethods.other' ),
    },
  ];
}
