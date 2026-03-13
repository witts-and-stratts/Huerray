import { cn } from '@/lib/dashboard-utils';
import { Button } from './dashboard-ui/button';
import { Separator } from './dashboard-ui/separator';
import { Tabs, TabsList, TabsTrigger } from './dashboard-ui/tabs';
import SubpageHeading from './subpage-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './dashboard-ui/breadcrumb';
import React from 'react';
import { ScrollArea } from './dashboard-ui/scroll-area';

interface SubHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  pre?: React.ReactNode;
  tabs?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string; }[];
  status?: React.ReactNode;
  className?: string;
}
export function SubHeader( { title, description, children, pre, tabs, breadcrumbs, status, className }: SubHeaderProps ) {
  return (
    <div className={ cn( 'pt-4 sticky top-0 bg-background z-50' ) }>
      { breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-8 px-5">
          <BreadcrumbList>
            { breadcrumbs.map( ( crumb, index ) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={ crumb.label }>
                  <BreadcrumbItem>
                    { !isLast && crumb.href ? (
                      <BreadcrumbLink href={ crumb.href } className='text-muted-foreground/80'>{ crumb.label }</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className='text-muted-foreground/50'>{ crumb.label }</BreadcrumbPage>
                    ) }
                  </BreadcrumbItem>
                  { !isLast && <BreadcrumbSeparator className='text-muted-foreground/80' /> }
                </React.Fragment>
              );
            } ) }
          </BreadcrumbList>
        </Breadcrumb>
      ) }
      <div className='px-5'>{ pre }</div>
      <div className={ cn( 'flex flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between', className ) }>
        <SubpageHeading title={ title } description={ description || '' }>
          { status }
        </SubpageHeading>
        <div className='flex gap-2'>
          { children }
        </div>
      </div>
      <div className='px-5'>{ tabs }</div>
      <Separator className={ 'mt-4' } />
    </div>
  );
}

interface SubHeaderTabsProps {
  value: string;
  onChange: ( value: string ) => void;
  tabItems: { value: string; label: React.ReactNode; }[];
}


export function SubHeaderTabs( { value, onChange, tabItems }: SubHeaderTabsProps ) {
  return (
    <div className={ 'mt-4 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-5' }>
      <Tabs value={ value } onValueChange={ onChange } className='h-fit'>
        <TabsList className='bg-transparent gap-4'>
          { tabItems.map( ( item ) => (
            <TabsTrigger key={ item.value } value={ item.value } className={ cn( 'font-normal shadow-none! rounded-none! pb-3 text-primary border-b border-b-transparent px-0! transition-all duration-600 ease-out bg-transparent',
              {
                'text-primary! border-b-dark-burgundy': value === item.value,
                'text-gray-500!': value !== item.value,
              } ) }>{ item.label }</TabsTrigger>
          ) ) }
        </TabsList>
      </Tabs>
    </div>
  );
};