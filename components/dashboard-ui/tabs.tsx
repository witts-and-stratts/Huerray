"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "@/lib/dashboard-utils";

function Tabs( {
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props ) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={ orientation }
      className={ cn(
        "gap-2 group/tabs flex data-[orientation=horizontal]:flex-col",
        className
      ) }
      { ...props }
    />
  );
}

const tabsListVariants = cva(
  "rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList( {
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants> ) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={ variant }
      className={ cn( tabsListVariants( { variant } ), className ) }
      { ...props }
    />
  );
}

function TabsTrigger( { className, ...props }: TabsPrimitive.Tab.Props ) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={ cn(
        "gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background dark:data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 data-active:text-foreground",
        "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      ) }
      { ...props }
    />
  );
}

function TabsContent( { className, ...props }: TabsPrimitive.Panel.Props ) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={ cn( "text-sm flex-1 outline-none", className ) }
      { ...props }
    />
  );
}

function AnimatedTabsList( {
  className,
  ...props
}: TabsPrimitive.List.Props ) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={ cn(
        "relative inline-flex w-full items-center justify-center rounded-lg bg-muted p-[3px] h-9",
        className
      ) }
      { ...props }
    />
  );
}

interface AnimatedTabsTriggerProps extends TabsPrimitive.Tab.Props {
  isActive?: boolean;
}

function AnimatedTabsTrigger( { className, isActive, children, ...props }: AnimatedTabsTriggerProps ) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={ cn(
        "relative inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50 z-10",
        isActive && "text-foreground",
        className
      ) }
      { ...props }
    >
      { isActive && (
        <motion.span
          layoutId="animated-tab-indicator"
          className="absolute inset-0 rounded-md bg-background shadow-sm dark:bg-input/30 dark:border dark:border-input"
          transition={ { type: "spring", bounce: 0.2, duration: 0.35 } }
        />
      ) }
      <span className="relative z-10">{ children }</span>
    </TabsPrimitive.Tab>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, AnimatedTabsList, AnimatedTabsTrigger };
