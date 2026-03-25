'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { type SearchGroup, type SearchResult } from '@/lib/api/hooks/search';
import { SearchResultRow } from './search-result-row';

interface ResultGroupProps {
  group: SearchGroup;
  groupIndex: number;
  onSelect: ( result: SearchResult ) => void;
}

const rowListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export function ResultGroup( { group, groupIndex, onSelect }: ResultGroupProps ) {
  const t = useTranslations( 'dashboard.common' );

  const handleSubmissionKeyDown = ( event: ReactKeyboardEvent<HTMLDivElement>, item: SearchResult ) => {
    if ( event.key !== 'Enter' && event.key !== ' ' ) return;

    event.preventDefault();
    onSelect( item );
  };

  if ( group.items.length === 0 ) return null;

  return (
    <motion.div
      className="px-2"
      initial={ { opacity: 0, y: 8 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.22, delay: groupIndex * 0.06, ease: 'easeOut' } }
    >
      <p className="mb-1 px-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        { t( `searchEntities.${ group.type }` ) }
      </p>

      { group.type === 'submissions' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          { group.items.map( ( item ) =>
            item.rawSubmission ? (
              <div
                key={ item.id }
                role="button"
                tabIndex={ 0 }
                onClick={ () => onSelect( item ) }
                onKeyDown={ ( event ) => handleSubmissionKeyDown( event, item ) }
                className="w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <SubmissionCard
                  submission={ item.rawSubmission }
                  showActions={ false }
                  layout="mini"
                />
              </div>
            ) : null,
          ) }
        </div>
      ) : (
        <motion.div variants={ rowListVariants } initial="hidden" animate="show">
          { group.items.map( ( item, i ) => (
            <SearchResultRow key={ item.id } result={ item } onSelect={ onSelect } />
          ) ) }
        </motion.div>
      ) }
    </motion.div>
  );
}
