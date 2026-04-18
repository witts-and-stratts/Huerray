"use client";

import * as React from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { GigsCardsView } from './gigs-cards-view';
import { DataTableView } from '@/components/dashboard-ui/data-table/data-table-view';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { EmptyGigs } from '@/components/admin/empty-states/empty-gigs';

function GigsTableView( { table }: { table: TanstackTable<ModelsGigResponse>; } ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  return <DataTableView table={ table } emptyState={ t( 'noResults' ) } />;
}

interface GigsViewProps {
  table: TanstackTable<ModelsGigResponse>;
  view: 'table' | 'cards';
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
  isLoading?: boolean;
  showGigsEmptyState?: boolean;
}


export function GigsView( {
  table,
  view,
  onViewGig,
  onCreateSubmission,
  actionButtons,
  isLoading = false,
  showGigsEmptyState = true,
}: GigsViewProps ) {
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className='p-2 md:p-4'>
      { isLoading ? (
        view === 'table' ? (
          <DataTableSkeleton
            showToolbar={ false }
            rowCount={ Math.min( pageSize, 10 ) }
            className="px-0 pt-0"
          />
        ) : (
          <CardGridSkeleton
            count={ Math.min( pageSize, 8 ) }
            cardHeight="h-[250px]"
            columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        )
      ) : table.getRowModel().rows.length === 0 && showGigsEmptyState ? (
        <EmptyGigs>
          { actionButtons }
        </EmptyGigs>
      ) : view === 'table' ? (
        <GigsTableView table={ table } />
      ) : (
        <GigsCardsView table={ table } onViewGig={ onViewGig } onCreateSubmission={ onCreateSubmission } />
      ) }
    </div>
  );
}
