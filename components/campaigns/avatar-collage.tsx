'use client';

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

export const AvatarCollage = ( { people, onPersonClick }: { people: Person[]; onPersonClick?: ( index: number ) => void; } ) => {
  const limit = 4;
  const shownPeople = people?.slice( 0, limit ) || [];
  const remainingCount = people?.length > limit ? people.length - limit : 0;

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
            key={ person.avatar || index }
            onClick={ () => onPersonClick?.( index ) }
            className={ onPersonClick ? 'cursor-pointer' : undefined }
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className='border-2 border-white'>
                  <AvatarImage src={ person.avatar } />
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
          <Dialog modal>
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
                <span className='font-regular'>Show all { people.length } contributors</span>
              </TooltipContent>
            </Tooltip>

            <DialogContent className='max-w-xs py-4'>
              <DialogHeader>
                <DialogTitle className={ 'text-primary text-lg font-secondary' }>All Contributors</DialogTitle>
              </DialogHeader>
              <ScrollArea className='h-[300px] pr-4'>
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
                  { people.map( ( person ) => (
                    <motion.div
                      key={ person.avatar + person.first_name }
                      className='flex items-center gap-3 p-1 rounded-md'
                      variants={ {
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      } }
                    >
                      <Avatar className='border border-border/50'>
                        <AvatarImage src={ person.avatar } />
                        <AvatarFallback className='text-xs'>
                          { person.first_name[ 0 ] }
                          { person.last_name[ 0 ] }
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <h5 className='text-base font-medium'>
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
