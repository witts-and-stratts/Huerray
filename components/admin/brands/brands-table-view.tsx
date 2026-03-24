import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';

import {
  flexRender,
  type Table as TanstackTable
} from '@tanstack/react-table';
import { AnimatePresence } from 'motion/react';
import { MotionTableRow } from '@/components/dashboard-ui/motion-table';
import { Brand } from './brands-data';

export function BrandsTableView( {
  table,
}: {
  table: TanstackTable<Brand>;
} ) {
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
