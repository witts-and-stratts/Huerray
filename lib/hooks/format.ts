import { formatDate } from "../utils/format";
import { formatCurrency } from "../utils/format";

export const useFormatCurrency = ( amount: number, currency: string = 'USD' ) => {
  return formatCurrency( amount, currency );
};

export const useFormatDate = ( dateString: string ) => {
  return formatDate( dateString );
};
