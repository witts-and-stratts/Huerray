import { useLocale } from "next-intl";
import { useCallback } from "react";
import { formatDate } from "../utils/format";
import { formatCurrency } from "../utils/format";
import { timeAgo } from "../utils";

export const useFormatCurrency = () => {
  const locale = useLocale();
  return ( amount: number, currency: string = 'EUR' ) => formatCurrency( amount, currency, locale );
};

export const useFormatDate = ( dateString: string ) => {
  const locale = useLocale();
  return formatDate( dateString, locale );
};

export const useTimeAgo = () => {
  const locale = useLocale();
  return useCallback( ( dateString: string ) => timeAgo( dateString, locale ), [ locale ] );
};
