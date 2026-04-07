import { useLocale } from "next-intl";
import { formatDate } from "../utils/format";
import { formatCurrency } from "../utils/format";

export const useFormatCurrency = ( amount: number, currency: string = 'EUR' ) => {
  const locale = useLocale();
  return formatCurrency( amount, currency, locale );
};

export const useFormatDate = ( dateString: string ) => {
  const locale = useLocale();
  return formatDate( dateString, locale );
};
