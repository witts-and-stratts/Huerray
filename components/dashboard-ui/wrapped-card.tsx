import { ReactNode } from 'react';
import { cn } from '@/lib/dashboard-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

interface WrappedCardProps {
  children: ReactNode;
  title: string;
  className?: string;
  titleClass?: string;
  contentClass?: string;
  variant?: 'default' | 'flush';
}

export function WrappedCard( { children, title, className, titleClass, contentClass, variant = 'default' }: WrappedCardProps ) {
  return (
    <Card className={ cn( 'p-0 gap-0 bg-background/20', className ) }>
      <CardHeader className={ cn( 'px-2 pt-2', titleClass ) }>
        <CardTitle className={ cn( "card__title font-normal text-sm", titleClass ) }>{ title }</CardTitle>
      </CardHeader>
      <CardContent className={ cn( 'space-y-2 flex flex-col gap-1 border p-4 m-1 bg-background', { 'rounded-lg': variant === 'default', 'm-0 border-0 bg-slate-50/40 rounded-tl-0 rounded-tr-0 border-t mt-1': variant === 'flush' }, contentClass ) }>
        { children }
      </CardContent>
    </Card>
  );
}
