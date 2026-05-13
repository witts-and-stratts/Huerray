'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { useLocale, useTranslations } from 'next-intl';
import type { OpenPosition } from '@/sanity/lib/careers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';

type CareerOpportunityDialogProps = {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  opportunity: OpenPosition | null;
};

function getLocalizedValue<T>(
  value: Record<string, T | undefined> | undefined,
  locale: string,
  fallback: T,
) {
  if ( !value ) return fallback;

  return value[ locale ] ?? value.en ?? Object.values( value ).find( ( item ): item is T => item !== undefined ) ?? fallback;
}

function getPortableTextValue(
  value: Record<string, unknown[] | undefined> | undefined,
  locale: string,
): unknown[] {
  if ( !value ) return [];

  return value[ locale ] ?? value.en ?? Object.values( value ).find( ( item ): item is unknown[] => Array.isArray( item ) ) ?? [];
}

const careerPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ( { children } ) => <p className="career-opportunity-dialog__paragraph">{ children }</p>,
    h2: ( { children } ) => <h3 className="career-opportunity-dialog__heading">{ children }</h3>,
    h3: ( { children } ) => <h4 className="career-opportunity-dialog__subheading">{ children }</h4>,
    blockquote: ( { children } ) => <blockquote className="career-opportunity-dialog__quote">{ children }</blockquote>,
  },
  list: {
    bullet: ( { children } ) => <ul className="career-opportunity-dialog__list career-opportunity-dialog__list--bullet">{ children }</ul>,
    number: ( { children } ) => <ol className="career-opportunity-dialog__list career-opportunity-dialog__list--number">{ children }</ol>,
  },
  listItem: {
    bullet: ( { children } ) => <li className="career-opportunity-dialog__list-item">{ children }</li>,
    number: ( { children } ) => <li className="career-opportunity-dialog__list-item">{ children }</li>,
  },
};

export function CareerOpportunityDialog( { open, onOpenChange, opportunity }: CareerOpportunityDialogProps ) {
  const t = useTranslations( 'career.opportunities' );
  const locale = useLocale();

  if ( !opportunity ) return null;

  const title = getLocalizedValue( opportunity.title, locale, t( 'title' ) );
  const category = getLocalizedValue<string>( opportunity.department, locale, '' );
  const location = getLocalizedValue<string>( opportunity.location, locale, '' );
  const body = getPortableTextValue( opportunity.body, locale );
  const applyButton = t( 'applyButton' );

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent
        className="career-opportunity-dialog__content"
        style={ {
          width: 'min(92vw, 860px)',
          maxWidth: 'none',
        } }
      >
        <DialogHeader className="career-opportunity-dialog__header">
          <DialogTitle className="career-opportunity-dialog__title gradient-text">
            { title }
          </DialogTitle>
          { ( category || location ) && (
            <DialogDescription className="career-opportunity-dialog__meta">
              { category }
              { category && location ? <span className="career-opportunity-dialog__meta-divider">•</span> : null }
              { location }
            </DialogDescription>
          ) }
        </DialogHeader>

        <div className="career-opportunity-dialog__body">
          <PortableText value={ body as any } components={ careerPortableTextComponents } />
        </div>

        <DialogFooter className="career-opportunity-dialog__footer min-h-0 mt-5 justify-start sm:justify-start">
          <Button variant="heroAlt" asChild className='min-w-80 scale-80 translate-x-[-10%]'>
            <a href={ opportunity.applyUrl ?? '#' }>{ applyButton }</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
