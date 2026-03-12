import { useLocale } from "next-intl";

export const useFormatCurrency = ( amount: number, currency: string = 'USD' ) => {
  const locale = useLocale();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};