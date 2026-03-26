"use client";

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { RoleGuard } from '@/components/auth/role-guard';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';

import { ApplicationActionMenu } from './application-action-menu';
import { ApplicationCard } from './application-card';

interface ApplicationDetailsSheetProps {
  application: ModelsGigApplicationResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function ApplicationDetailsSheet( { application, open, onOpenChange }: ApplicationDetailsSheetProps ) {
  const t = useTranslations( 'dashboard.common.cards' );
  const tc = useTranslations( 'dashboard.common' );

  if ( !application ) return null;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className='w-[90%]! max-w-[420px]! overflow-y-auto'>
        <SheetHeader className='mb-4'>
          <SheetTitle className='font-normal text-primary font-primary'>{ t( 'application' ) }</SheetTitle>
        </SheetHeader>

        <ApplicationCard application={ application } />

        <RoleGuard allowedRoles={ [ 'brand' ] }>
          <SheetFooter className="sticky bottom-0 px-0 pb-0 pt-3 shrink-0 border-t border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
            <ApplicationActionMenu
              application={ application }
              trigger={
                <ButtonGroup className="self-start">
                  <Button variant="outline" size="sm" className="font-regular flex-1">
                    { tc( 'actions' ) }
                  </Button>
                  <Button variant="outline" size="sm" className="font-regular shrink-0">
                    <ChevronDown className="size-4" />
                  </Button>
                </ButtonGroup>
              }
            />
          </SheetFooter>
        </RoleGuard>
      </SheetContent>
    </Sheet>
  );
}
