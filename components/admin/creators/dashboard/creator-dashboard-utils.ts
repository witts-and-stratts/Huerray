export interface CreatorStatRow {
  label: string;
  value: string;
  numeric: number;
}

// export function toCurrency(amount?: number | null, currency = 'USD'): string {
//   if (amount === undefined || amount === null) return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(0);
//   return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
// }

// export function toDateLabel(dateString?: string): string {
//   if (!dateString) return 'N/A';
//   try {
//     const d = new Date(dateString);
//     if (isNaN(d.getTime())) return 'N/A';
//     return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
//   } catch {
//     return 'N/A';
//   }
// }
