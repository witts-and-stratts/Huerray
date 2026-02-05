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

export const calculateAge = (dobString?: string) => {
  if (!dobString) return null;
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};
