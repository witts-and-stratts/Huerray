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

// Inline Table View Component (extracted from previous gigs-table.tsx)
function GigsTableView( { table }: { table: TanstackTable<ModelsGigResponse>; } ) {
  return (
    <Table className='overflow-auto'>
      <TableHeader sticky>
        { table.getHeaderGroups().map( ( headerGroup ) => (
          <TableRow key={ headerGroup.id }>
            { headerGroup.headers.map( ( header ) => {
              return (
                <TableHead key={ header.id } className='bg-accent/50'>
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
                No results.
              </TableCell>
            </TableRow>
          ) }
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}

interface GigsViewProps {
  table: TanstackTable<ModelsGigResponse>;
  view: 'table' | 'cards';
  onViewGig: ( gig: ModelsGigResponse ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
}

export function GigsView( { table, view, onViewGig, onCreateSubmission }: GigsViewProps ) {
  return (
    <div className='mt-1'>
      { view === 'table' ? (
        <GigsTableView table={ table } />
      ) : (
        <GigsCardsView table={ table } onViewGig={ onViewGig } onCreateSubmission={ onCreateSubmission } />
      ) }
    </div>
  );
}
