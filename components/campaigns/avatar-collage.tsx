'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/dashboard-ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/dashboard-ui/dialog';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/dashboard-ui/tooltip';
import { motion } from 'motion/react';
import { Person } from './types';
import { imgpresets } from '@/lib/utils/imgproxy';

export const AvatarCollage = ( { people, onPersonClick, title, size = 'default' }: { people: Person[]; onPersonClick?: ( index: number ) => void; title: string; size?: 'sm' | 'default' | 'lg'; } ) => {
  const limit = 4;
  const shownPeople = people?.slice( 0, limit ) || [];
  const remainingCount = people?.length > limit ? people.length - limit : 0;

  const [ open, setOpen ] = useState( false );

  return (
    <div className='flex items-center'>
      <AvatarGroup>
        { shownPeople.map( ( person, index ) => (
          <motion.div
            initial={ { opacity: 0, x: 10 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: -10 } }
            transition={ {
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut',
            } }
            key={ `${ person.avatar }-${ index }` }
            onClick={ () => onPersonClick?.( index ) }
            className={ onPersonClick ? 'cursor-pointer' : undefined }
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar size={ size } className='border-2 border-white'>
                  <AvatarImage src={ imgpresets.avatar( person.avatar ) } />
                  <AvatarFallback className='text-xs'>
                    { person.first_name[ 0 ] }
                    { person.last_name[ 0 ] }
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <span className='font-regular'>
                  { person.first_name } { person.last_name }
                </span>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        ) ) }

        { remainingCount > 0 && (
          <Dialog modal open={ open } onOpenChange={ setOpen }>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger>
                  <button className='hover:opacity-80 transition-opacity focus:outline-none'>
                    <AvatarGroupCount className='cursor-pointer text-xs'>
                      +{ remainingCount }
                    </AvatarGroupCount>
                  </button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <span className='font-regular'>Show all { people.length } { title }</span>
              </TooltipContent>
            </Tooltip>

            <DialogContent className='max-w-xs w-[500px] py-4'>
              <DialogHeader>
                <DialogTitle className={ 'dialog__title' }>{ title }</DialogTitle>
              </DialogHeader>
              <ScrollArea className='h-[300px] pr-4'
                scrollbar={ {
                  style: {
                    width: '6px',
                  }
                } }
              >
                <motion.div
                  className='flex flex-col gap-3'
                  initial='hidden'
                  animate='visible'
                  variants={ {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  } }
                >
                  { people.map( ( person, index ) => (
                    <motion.div
                      key={ `${ person.avatar }-${ person.first_name }-${ index }` }
                      className={ `flex items-center gap-3 p-1 rounded-md ${ onPersonClick ? 'cursor-pointer hover:bg-muted/50 transition-colors duration-200' : '' }` }
                      onClick={ () => {
                        if ( onPersonClick ) {
                          onPersonClick( index );
                          setOpen( false );
                        }
                      } }
                      variants={ {
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      } }
                      transition={ { duration: 0.6, ease: 'easeOut' } }
                    >
                      <Avatar className='border border-border/50'>
                        <AvatarImage src={ imgpresets.avatar( person.avatar ) } />
                        <AvatarFallback className='text-xs'>
                          { person.first_name[ 0 ] }
                          { person.last_name[ 0 ] }
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <h5 className='text-base font-normal'>
                          { person.first_name } { person.last_name }
                        </h5>
                        { person.email && (
                          <span className='text-xs text-muted-foreground'>
                            { person.email }
                          </span>
                        ) }
                      </div>
                    </motion.div>
                  ) ) }
                </motion.div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ) }
      </AvatarGroup>
    </div>
  );
};
