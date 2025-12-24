import { Button } from './dashboard-ui/button';
import { Separator } from './dashboard-ui/separator';
import SubpageHeading from './subpage-header';

interface SubHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
export function SubHeader( { title, description, children }: SubHeaderProps ) {
  return (
    <div className='px-5 pt-4 sticky top-0 bg-background z-50'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <SubpageHeading title={ title } description={ description || '' } />
        <div className='flex gap-2'>
          { children }
        </div>
      </div>
      <Separator className={ 'mt-4' } />
    </div>
  );
}
