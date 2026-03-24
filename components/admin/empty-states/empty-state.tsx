import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/dashboard-ui/empty";
import { cn } from "@/lib/dashboard-utils";

export interface EmptyStateProps {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  description?: string;
  fill?: boolean;
  children?: React.ReactNode;
}

export function EmptyState( { imageSrc, imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyStateProps ) {
  return (
    <Empty className={ cn( { 'border py-10 flex-1 bg-white': fill } ) }>
      <EmptyContent>
        <EmptyMedia>
          <img src={ imageSrc } width={ imageWidth } height={ imageHeight } alt={ title } />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className='text-lg font-normal'>
            { title }
          </EmptyTitle>
          { description &&
            <EmptyDescription>{ description }</EmptyDescription>
          }
        </EmptyHeader>
        { children }
      </EmptyContent>
    </Empty>
  );
}