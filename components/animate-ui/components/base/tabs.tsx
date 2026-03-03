import * as React from 'react';
import { createContext, useContext } from 'react';

import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTab as TabsTabPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsPanels as TabsPanelsPrimitive,
  TabsHighlight as TabsHighlightPrimitive,
  TabsHighlightItem as TabsHighlightItemPrimitive,
  type TabsProps as TabsPrimitiveProps,
  type TabsListProps as TabsListPrimitiveProps,
  type TabsTabProps as TabsTabPrimitiveProps,
  type TabsPanelProps as TabsPanelPrimitiveProps,
  type TabsPanelsProps as TabsPanelsPrimitiveProps,
} from '@/components/animate-ui/primitives/base/tabs';
import { cn } from '@/lib/dashboard-utils';
import { cva, VariantProps } from 'class-variance-authority';

type TabsProps = TabsPrimitiveProps;

function Tabs( { className, ...props }: TabsProps ) {
  return (
    <TabsPrimitive
      className={ cn( 'gap-2 group/tabs flex data-[orientation=horizontal]:flex-col', className ) }
      { ...props }
    />
  );
}

const TabsListVariantContext = createContext<'default' | 'line'>( 'default' );

type TabsListProps = TabsListPrimitiveProps;

const tabsListVariants = cva(
  "rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-4 bg-transparent px-0 justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tabsHighlightVariants = cva(
  "absolute z-0 inset-0 border border-transparent rounded-md bg-background dark:border-input dark:bg-input/30 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-background",
        line: "gap-1 bg-transparent border-b border-b-primary rounded-none shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList( { className, variant = 'default', ...props }: TabsListProps & VariantProps<typeof tabsListVariants> ) {
  return (
    <TabsListVariantContext.Provider value={ variant ?? 'default' }>
      <TabsHighlightPrimitive className={ tabsHighlightVariants( { variant } ) }>
        <TabsListPrimitive
          className={ cn( tabsListVariants( { variant } ), className ) }
          { ...props }
        />
      </TabsHighlightPrimitive>
    </TabsListVariantContext.Provider>
  );
}

type TabsTabProps = TabsTabPrimitiveProps;

function TabsTab( { className, ...props }: TabsTabProps ) {
  const variant = useContext( TabsListVariantContext );

  return (
    <TabsHighlightItemPrimitive value={ props.value } className={ variant === 'default' ? 'flex-1' : undefined }>
      <TabsTabPrimitive
        className={ cn(
          "data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          variant === 'default' ? 'px-2' : 'px-0',
          className,
        ) }
        { ...props }
      />
    </TabsHighlightItemPrimitive>
  );
}

type TabsPanelsProps = TabsPanelsPrimitiveProps;

function TabsPanels( props: TabsPanelsProps ) {
  return <TabsPanelsPrimitive { ...props } />;
}

type TabsPanelProps = TabsPanelPrimitiveProps;

function TabsPanel( { className, ...props }: TabsPanelProps ) {
  return (
    <TabsPanelPrimitive
      className={ cn( 'flex-1 outline-none', className ) }
      { ...props }
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanels,
  TabsPanel,
  type TabsProps,
  type TabsListProps,
  type TabsTabProps,
  type TabsPanelsProps,
  type TabsPanelProps,
};
