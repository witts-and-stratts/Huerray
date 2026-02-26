import { ReactNode } from 'react';
import { cn } from '@/lib/dashboard-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

interface WrappedCardProps {
  children: ReactNode;
  title: string;
  className?: string;
  titleClass?: string;
  contentClass?: string;
}

export function WrappedCard( { children, title, className, titleClass, contentClass }: WrappedCardProps ) {
  return (
    <Card className={ cn( 'p-0 gap-0 bg-background/20', className ) }>
      <CardHeader className={ cn( 'px-2 pt-2', titleClass ) }>
        <CardTitle className="card__title font-normal text-sm">{ title }</CardTitle>
      </CardHeader>
      <CardContent className={ cn( 'space-y-2 flex flex-col gap-1 border rounded-lg p-4 m-1 bg-background', contentClass ) }>
        { children }
      </CardContent>
    </Card>
  );
}
