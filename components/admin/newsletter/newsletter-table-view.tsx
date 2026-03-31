"use client";

import { type Table as TanstackTable } from "@tanstack/react-table";

import { EmptyNewsletter } from "@/components/admin/empty-states/empty-newsletter";
import { DataTableView } from "@/components/dashboard-ui/data-table/data-table-view";
import { type NewsletterEntry } from "@/lib/api/hooks/newsletter";

interface NewsletterTableViewProps {
  table: TanstackTable<NewsletterEntry>;
}

export function NewsletterTableView( { table }: NewsletterTableViewProps ) {
  return <DataTableView table={ table } emptyState={ <EmptyNewsletter fill /> } />;
}
