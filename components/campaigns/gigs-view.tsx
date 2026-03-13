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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from '@/components/dashboard-ui/empty';

// Inline Table View Component (extracted from previous gigs-table.tsx)
function GigsTableView( { table }: { table: TanstackTable<ModelsGigResponse>; } ) {
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
                No results.
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
  onViewGig: ( gig: ModelsGigResponse ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
}

export function GigsView( { table, view, onViewGig, onCreateSubmission, actionButtons }: GigsViewProps ) {
  return (
    <div className='px-5 mt-1 grow flex-1'>
      { table.getRowModel().rows.length === 0 ? (
        <Empty className='border py-20 my-6 flex-1 bg-white'>
          <EmptyHeader>
            <EmptyMedia>
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </EmptyMedia>
            <EmptyTitle className='font-normal font-primary text-primary'>No gigs yet</EmptyTitle>
            <EmptyDescription>
              There are no gigs yet for this campaign.
            </EmptyDescription>
          </EmptyHeader>
          { actionButtons && (
            <EmptyContent>
              { actionButtons }
            </EmptyContent>
          ) }
        </Empty>
      ) : view === 'table' ? (
        <GigsTableView table={ table } />
      ) : (
        <GigsCardsView table={ table } onViewGig={ onViewGig } onCreateSubmission={ onCreateSubmission } />
      ) }
    </div>
  );
}
