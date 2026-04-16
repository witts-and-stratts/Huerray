
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
import { MotionTableRow } from '../dashboard-ui/motion-table';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useTranslations } from 'next-intl';

export function CamapignsTableView( {
  table,
}: {
  table: TanstackTable<ModelsCampaignResponse>;
} ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return <div className='border border-border rounded-lg overflow-hidden'>
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
        <AnimatePresence initial={ false }>
          { table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map( ( row ) => (
              <MotionTableRow
                key={ row.id }
                data-state={ row.getIsSelected() && 'selected' }
                initial={ { opacity: 0 } }
                animate={ {
                  opacity: row.original.campaign_status === 'deactivated' ? 0.45 : 1,
                  filter: row.original.campaign_status === 'deactivated' ? 'grayscale(1)' : 'grayscale(0)',
                } }
                exit={ { opacity: 0 } }
                transition={ { duration: 0.2, ease: 'easeOut' } }
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
  </div>;
}
