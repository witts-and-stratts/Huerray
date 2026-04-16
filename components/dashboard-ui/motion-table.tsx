'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/dashboard-utils';

const MotionTable = React.forwardRef<
  HTMLTableElement,
  HTMLMotionProps<'table'>
>( ( { className, ...props }, ref ) => (
  <div className='relative w-full overflow-auto'>
    <motion.table
      ref={ ref }
      className={ cn( 'w-full caption-bottom text-sm', className ) }
      { ...props }
    />
  </div>
) );
MotionTable.displayName = 'MotionTable';

const MotionTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<'thead'>
>( ( { className, ...props }, ref ) => (
  <motion.thead
    ref={ ref }
    className={ cn( '[&_tr]:border-b', className ) }
    { ...props }
  />
) );
MotionTableHeader.displayName = 'MotionTableHeader';

const MotionTableBody = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<'tbody'>
>( ( { className, ...props }, ref ) => (
  <motion.tbody
    ref={ ref }
    className={ cn( '[&_tr:last-child]:border-0', className ) }
    { ...props }
  />
) );
MotionTableBody.displayName = 'MotionTableBody';

const MotionTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<'tfoot'>
>( ( { className, ...props }, ref ) => (
  <motion.tfoot
    ref={ ref }
    className={ cn(
      'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
      className
    ) }
    { ...props }
  />
) );
MotionTableFooter.displayName = 'MotionTableFooter';

const MotionTableRow = React.forwardRef<
  HTMLTableRowElement,
  HTMLMotionProps<'tr'>
>( ( { className, ...props }, ref ) => (
  <motion.tr
    ref={ ref }
    className={ cn(
      'border-b hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    ) }
    { ...props }
  />
) );
MotionTableRow.displayName = 'MotionTableRow';

const MotionTableHead = React.forwardRef<
  HTMLTableCellElement,
  HTMLMotionProps<'th'>
>( ( { className, ...props }, ref ) => (
  <motion.th
    ref={ ref }
    className={ cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    ) }
    { ...props }
  />
) );
MotionTableHead.displayName = 'MotionTableHead';

const MotionTableCell = React.forwardRef<
  HTMLTableCellElement,
  HTMLMotionProps<'td'>
>( ( { className, ...props }, ref ) => (
  <motion.td
    ref={ ref }
    className={ cn( 'p-2 align-middle [&:has([role=checkbox])]:pr-0', className ) }
    { ...props }
  />
) );
MotionTableCell.displayName = 'MotionTableCell';

const MotionTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  HTMLMotionProps<'caption'>
>( ( { className, ...props }, ref ) => (
  <motion.caption
    ref={ ref }
    className={ cn( 'mt-4 text-sm text-muted-foreground', className ) }
    { ...props }
  />
) );
MotionTableCaption.displayName = 'MotionTableCaption';

export {
  MotionTable,
  MotionTableHeader,
  MotionTableBody,
  MotionTableFooter,
  MotionTableHead,
  MotionTableRow,
  MotionTableCell,
  MotionTableCaption,
};
