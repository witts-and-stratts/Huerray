import { cn } from '@/lib/dashboard-utils';
import { Button } from './dashboard-ui/button';
import { Separator } from './dashboard-ui/separator';
import { Tabs, TabsList, TabsTrigger } from './dashboard-ui/tabs';
import SubpageHeading from './subpage-header';

interface SubHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  pre?: React.ReactNode;
  tabs?: React.ReactNode;
}
export function SubHeader( { title, description, children, pre, tabs }: SubHeaderProps ) {
  return (
    <div className='px-5 pt-4 sticky top-0 bg-background z-50'>
      { pre }
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <SubpageHeading title={ title } description={ description || '' } />
        <div className='flex gap-2'>
          { children }
        </div>
      </div>
      { tabs }
      <Separator className={ 'mt-4' } />
    </div>
  );
}

interface SubHeaderTabsProps {
  value: string;
  onChange: ( value: string ) => void;
  tabItems: { value: string; label: string; }[];
}


export function SubHeaderTabs( { value, onChange, tabItems }: SubHeaderTabsProps ) {
  return (
    <Tabs className={ 'mt-4' } value={ value } onValueChange={ onChange }>
      <TabsList className='bg-background gap-4'>
        { tabItems.map( ( item ) => (
          <TabsTrigger key={ item.value } value={ item.value } className={ cn( 'font-normal shadow-none! rounded-none! pb-3 text-primary border-b border-b-transparent -mb-5 px-0! transition-all duration-600 ease-out',
            {
              'text-primary! border-b-dark-burgundy': value === item.value,
              'text-gray-500!': value !== item.value,
            } ) }>{ item.label }</TabsTrigger>
        ) ) }
      </TabsList>
    </Tabs>
  );
};