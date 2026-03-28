"use client";

import * as React from 'react';
import { Table as TanstackTable, flexRender } from '@tanstack/react-table';
import { AnimatePresence } from 'motion/react';
import { MotionTableRow } from '../dashboard-ui/motion-table';
import { GigsCardsView } from './gigs-cards-view';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { EmptyGigs } from '@/components/admin/empty-states/empty-gigs';

// Inline Table View Component (extracted from previous gigs-table.tsx)
function GigsTableView( { table }: { table: TanstackTable<ModelsGigResponse>; } ) {
  const t = useTranslations( 'dashboard.brand.gigsPage' );
  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <Table className='overflow-auto'>
        <TableHeader sticky>
          { table.getHeaderGroups().map( ( headerGroup ) => (
            <TableRow key={ headerGroup.id }>
              { headerGroup.headers.map( ( header ) => {
                return (
                  <TableHead key={ header.id } className='bg-slate-50/80'>
                    { header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) }
                  </TableHead>
                );
              } ) }
            </TableRow>
          ) ) }
        </TableHeader>
        <TableBody>
          <AnimatePresence mode='popLayout'>
            { table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map( ( row ) => (
                <MotionTableRow
                  key={ row.id }
                  data-state={ row.getIsSelected() && 'selected' }
                  layout
                  initial={ {
                    opacity: 0,
                    y: 20,
                    borderColor: 'transparent',
                  } }
                  animate={ { opacity: 1, y: 0, borderColor: 'inherit' } }
                  exit={ { opacity: 0, y: 20, transition: { duration: 0.1 } } }
                  transition={ {
                    duration: 0.4,
                    delay: row.index * 0.05,
                    layout: { duration: 0.3 },
                  } }
                  className='bg-background'
                >
                  { row.getVisibleCells().map( ( cell ) => (
                    <TableCell key={ cell.id } className='align-top py-4'>
                      { flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      ) }
                    </TableCell>
                  ) ) }
                </MotionTableRow>
              ) )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ table.getVisibleLeafColumns().length }
                  className='h-24 text-center'
                >
                  { t( 'noResults' ) }
                </TableCell>
              </TableRow>
            ) }
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}

interface GigsViewProps {
  table: TanstackTable<ModelsGigResponse>;
  view: 'table' | 'cards';
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
}


export function GigsView( { table, view, onViewGig, onCreateSubmission, actionButtons }: GigsViewProps ) {
  return (
    <div className='px-2 md:px-5 flex flex-col flex-1 h-full'>
      { table.getRowModel().rows.length === 0 ? (
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
