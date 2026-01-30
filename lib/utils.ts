import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = ( dateString: string ) => {
  if ( !dateString ) return 'N/A';
  const date = new Date( dateString );
  if ( isNaN( date.getTime() ) ) return 'Invalid Date';
  return new Intl.DateTimeFormat( 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  } ).format( date );
};

export const formatCurrency = ( amount: number ) => {
  return new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
  } ).format( amount );
};
