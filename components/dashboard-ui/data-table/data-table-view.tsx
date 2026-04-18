'use client';

import * as React from 'react';
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table';
import { AnimatePresence } from 'motion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import { MotionTableRow } from '@/components/dashboard-ui/motion-table';
import { cn } from '@/lib/dashboard-utils';
import { useTableScrollBorder } from '@/lib/hooks/use-table-scroll-border';
import { useTranslations } from 'next-intl';

interface DataTableViewProps<T> {
  table: TanstackTable<T>;
  emptyState?: React.ReactNode;
}

export function DataTableView<T>( { table, emptyState }: DataTableViewProps<T> ) {
  const t = useTranslations( 'dashboard.common' );
  const { scrollRef, isScrolled, lastPinnedId } = useTableScrollBorder( table );

  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <Table wrapperRef={ scrollRef }>
        <TableHeader sticky>
          { table.getHeaderGroups().map( ( headerGroup ) => (
            <TableRow key={ headerGroup.id }>
              { headerGroup.headers.map( ( header ) => {
                const isPinned = header.column.getIsPinned();
                const isLastPinned = isPinned === 'left' && header.column.id === lastPinnedId;
                return (
                  <TableHead
                    key={ header.id }
                    className={ cn( 'bg-slate-50/95', isLastPinned && isScrolled && 'dt-pinned-border' ) }
                    style={ isPinned ? {
                      position: 'sticky',
                      left: header.column.getStart( 'left' ),
                      zIndex: 2,
                    } : undefined }
                  >
                    { header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext() ) }
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
                  initial={ { opacity: 0, y: 20, borderColor: 'transparent' } }
                  animate={ { opacity: 1, y: 0, borderColor: 'inherit' } }
                  exit={ { opacity: 0, y: 20, transition: { duration: 0.1 } } }
                  transition={ { duration: 0.4, delay: row.index * 0.05, layout: { duration: 0.3 } } }
                  className='bg-background group'
                >
                  { row.getVisibleCells().map( ( cell ) => {
                    const isPinned = cell.column.getIsPinned();
                    const isLastPinned = isPinned === 'left' && cell.column.id === lastPinnedId;
                    return (
                      <TableCell
                        key={ cell.id }
                        className={ cn(
                          'align-top py-4 group-hover:bg-muted',
                          isPinned && 'bg-background',
                          isLastPinned && isScrolled && 'dt-pinned-border'
                        ) }
                        style={ isPinned ? {
                          position: 'sticky',
                          left: cell.column.getStart( 'left' ),
                          zIndex: 1,
                        } : undefined }
                      >
                        { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                      </TableCell>
                    );
                  } ) }
                </MotionTableRow>
              ) )
            ) : (
              <TableRow>
                <TableCell colSpan={ table.getVisibleLeafColumns().length } className='h-24 text-center py-10'>
                  { emptyState ?? t( 'noResultsFound' ) }
                </TableCell>
              </TableRow>
            ) }
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
