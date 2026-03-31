import { toast } from "sonner";

import { type NewsletterEntry } from "@/lib/api/hooks/newsletter";

function escapeCsvValue( value: string ) {
  if ( /[",\n]/.test( value ) ) {
    return `"${value.replaceAll( '"', '""' )}"`;
  }

  return value;
}

export function exportNewsletterEntries( entries: NewsletterEntry[], filename: string ) {
  if ( entries.length === 0 ) {
    toast.error( "No newsletter entries available for export." );
    return;
  }

  const rows = [
    [ "id", "email", "first_name", "last_name", "status", "source", "subscribed_at", "updated_at" ],
    ...entries.map( ( entry ) => [
      entry.id,
      entry.email,
      entry.first_name ?? "",
      entry.last_name ?? "",
      entry.status ?? "",
      entry.source ?? "",
      entry.subscribed_at ?? "",
      entry.updated_at ?? "",
    ] ),
  ];

  const csv = rows.map( ( row ) => row.map( ( value ) => escapeCsvValue( value ?? "" ) ).join( "," ) ).join( "\n" );
  const blob = new Blob( [ csv ], { type: "text/csv;charset=utf-8;" } );
  const url = URL.createObjectURL( blob );
  const link = document.createElement( "a" );
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL( url );
}

export function getNewsletterStatusBadgeClassName( status?: string | null ) {
  switch ( status?.toLowerCase() ) {
    case "subscribed":
    case "active":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
    case "unsubscribed":
    case "inactive":
      return "bg-red-500/10 text-red-700 border-red-500/20";
    default:
      return "bg-slate-500/10 text-slate-700 border-slate-500/20";
  }
}
