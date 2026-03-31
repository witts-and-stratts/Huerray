"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { Checkbox } from "@/components/dashboard-ui/checkbox";
import { type NewsletterEntry } from "@/lib/api/hooks/newsletter";

import {
  getNewsletterStatusBadgeClassName,
} from "./newsletter-table-utils";
import { NewsletterActionMenu } from "./newsletter-action-menu";
import { useFormatDate } from "@/lib/hooks/format";

export function getNewsletterColumns( {
  t,
  tc,
}: {
  t: ( key: string ) => string;
  tc: ( key: string ) => string;
} ): ColumnDef<NewsletterEntry>[] {
  const formatDate = useFormatDate;

  return [
    {
      id: "select",
      header: ( { table } ) => (
        <Checkbox
          checked={ table.getIsAllPageRowsSelected() }
          onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( Boolean( value ) ) }
          aria-label="Select all newsletter entries"
        />
      ),
      cell: ( { row } ) => (
        <Checkbox
          checked={ row.getIsSelected() }
          onCheckedChange={ ( value ) => row.toggleSelected( Boolean( value ) ) }
          aria-label={ `Select ${ row.original.email }` }
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 32,
    },
    {
      accessorKey: "email",
      header: ( { column } ) => (
        <Button variant="ghost" onClick={ () => column.toggleSorting( column.getIsSorted() === "asc" ) }>
          { t( "newsletterPage.columns.email" ) }
          <ArrowUpDown className="ml-2 size-4" strokeWidth={ 1.5 } />
        </Button>
      ),
      cell: ( { row } ) => <div className="min-w-[220px] font-medium">{ row.original.email }</div>,
    },
    {
      id: "name",
      accessorFn: ( row ) => `${ row.first_name ?? "" } ${ row.last_name ?? "" }`.trim(),
      header: t( "newsletterPage.columns.name" ),
      cell: ( { row } ) => {
        const fullName = `${ row.original.first_name ?? "" } ${ row.original.last_name ?? "" }`.trim();
        return <div>{ fullName || "—" }</div>;
      },
    },
    {
      accessorKey: "status",
      header: t( "newsletterPage.columns.status" ),
      cell: ( { row } ) => (
        <Badge variant="outline" className={ getNewsletterStatusBadgeClassName( row.original.status ) }>
          { row.original.status ?? "unknown" }
        </Badge>
      ),
    },
    {
      accessorKey: "source",
      header: t( "newsletterPage.columns.source" ),
      cell: ( { row } ) => row.original.source || "—",
    },
    {
      accessorKey: "subscribed_at",
      header: t( "newsletterPage.columns.subscribedAt" ),
      cell: ( { row } ) => <span className="max-md:whitespace-nowrap">{ formatDate( row.original.subscribed_at! ) }</span>,
    },
    {
      accessorKey: "updated_at",
      header: t( "newsletterPage.columns.updatedAt" ),
      cell: ( { row } ) => <span className="max-md:whitespace-nowrap">{ formatDate( row.original.updated_at! ) }</span>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">{ tc( "actions" ) }</div>,
      enableHiding: false,
      cell: ( { row } ) => (
        <div className="flex justify-end">
          <NewsletterActionMenu
            entry={ row.original }
            trigger={
              <Button variant="outline" size="icon-sm" className="font-regular" aria-label={ t( "newsletterPage.actions.more" ) }>
                <ChevronDown />
              </Button>
            }
          />
        </div>
      ),
    },
  ];
}
