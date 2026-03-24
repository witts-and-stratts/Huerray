import { useLocale } from "next-intl";
import { formatDate } from "../utils/format";

export const useFormatCurrency = ( amount: number, currency: string = 'USD' ) => {
  const locale = useLocale();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const useFormatDate = ( dateString: string ) => {
  const locale = useLocale();
  
  return formatDate( dateString, locale );
};