'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqTabProps {
  role: 'admin' | 'brand' | 'creator';
}

export function FaqTab( { role }: FaqTabProps ) {
  const t = useTranslations( 'dashboard.common' );
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string }>;

  return (
    <Accordion type="single" collapsible className="w-full">
      { faqs.map( ( item, index ) => (
        <AccordionItem key={ index } value={ `faq-${ index }` }>
          <AccordionTrigger className="text-sm text-left">
            { item.q }
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            { item.a }
          </AccordionContent>
        </AccordionItem>
      ) ) }
    </Accordion>
  );
}
