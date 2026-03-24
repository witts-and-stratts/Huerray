'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Add01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '@/components/dashboard-ui/button';
import { Separator } from '@/components/dashboard-ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { imgpresets } from '@/lib/utils/imgproxy';
import { useCreators } from '@/lib/api/hooks/creators';
import { usePaymentItems, useCreatePayment } from '@/lib/api/hooks/payments';
import { ModelsCreatorResponse, ModelsPaymentItemResponse, UtilsPaymentStatus } from '@/lib/api/generated/models';
import { type SelectOption } from '@/components/dashboard-ui/superfield/types';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/dashboard-utils';
import { Check } from 'lucide-react';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { useFormatCurrency } from '@/lib/hooks/format';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Payment item row ──────────────────────────────────────────────────────────

function PaymentItemRow( {
  item,
  selected,
  onToggle,
}: {
  item: ModelsPaymentItemResponse;
  selected: boolean;
  onToggle: () => void;
} ) {
  const amount = item.amount?.value;

  return (
    <div
      onClick={ onToggle }
      className={ cn(
        'w-full flex items-start gap-3 px-3 py-3 rounded-lg border text-left transition-colors cursor-pointer',
        selected ? 'border-primary bg-primary/5' : 'border-border bg-background hover:bg-muted/40'
      ) }
    >
      <span className={ cn(
        'mt-0.5 size-4 shrink-0 rounded border flex items-center justify-center transition-colors',
        selected ? 'bg-primary border-primary' : 'border-muted-foreground/40'
      ) }>
        { selected && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) }
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-base font-primary font-medium truncate text-primary -mt-1">{ item.gig_title || item.description || '—' }</p>
        { item.description && item.gig_title && (
          <p className="text-sm font-regular text-muted-foreground truncate mt-0.5">{ item.description }</p>
        ) }
        { item.item_count != null && item.cost_per_item?.value != null && (
          <p className="text-sm font-regular text-muted-foreground mt-0.5">
            { item.item_count } × { useFormatCurrency( item.cost_per_item.value, item.cost_per_item.currency ) }
          </p>
        ) }
      </div>
      { amount != null && (
        <span className="text-base font-primary font-normal shrink-0">{ useFormatCurrency( amount, item?.amount?.currency ) }</span>
      ) }
    </div>
  );
}

// ── Main sheet ────────────────────────────────────────────────────────────────

interface NewBatchPaymentSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function NewBatchPaymentSheet( { open, onOpenChange }: NewBatchPaymentSheetProps ) {
  const [ selectedCreatorId, setSelectedCreatorId ] = React.useState<string>( '' );
  const [ selectedItemIds, setSelectedItemIds ] = React.useState<Set<string>>( new Set() );
  const [ paymentMethod, setPaymentMethod ] = React.useState( '' );
  const [ notes, setNotes ] = React.useState( '' );

  React.useEffect( () => {
    if ( !open ) {
      setSelectedCreatorId( '' );
      setSelectedItemIds( new Set() );
      setPaymentMethod( '' );
      setNotes( '' );
    }
  }, [ open ] );

  const { data: creatorsData, isLoading: creatorsLoading } = useCreators(
    { limit: 100 },
    { enabled: open }
  );
  const creators = creatorsData?.data || [];

  const creatorMap = React.useMemo( () => {
    const map = new Map<string, ModelsCreatorResponse>();
    creators.forEach( ( c ) => { if ( c.id ) map.set( c.id, c ); } );
    return map;
  }, [ creators ] );

  const creatorOptions: SelectOption[] = React.useMemo( () =>
    creators.map( ( c ) => ( {
      value: c.id || '',
      label: [ c.first_name, c.last_name ].filter( Boolean ).join( ' ' ) || c.id || '—',
    } ) ),
    [ creators ]
  );

  const { data: itemsData, isLoading: itemsLoading } = usePaymentItems(
    { creatorId: selectedCreatorId, limit: 100 },
    { enabled: !!selectedCreatorId }
  );
  const paymentItems = itemsData?.data || [];

  const { mutate: createPayment, isPending: isSubmitting } = useCreatePayment( {
    onSuccess: () => {
      toast.success( 'Batch payment created successfully.', {
        description: 'The batch payment has been created successfully.',
        richColors: true,
      } );
      onOpenChange( false );
    },
    onError: () => {
      toast.error( 'Failed to create batch payment. Please try again.', {
        richColors: true,
      } );
    },
  } );

  const toggleItem = ( id: string ) => {
    setSelectedItemIds( ( prev ) => {
      const next = new Set( prev );
      next.has( id ) ? next.delete( id ) : next.add( id );
      return next;
    } );
  };

  const toggleAll = () => {
    setSelectedItemIds(
      selectedItemIds.size === paymentItems.length
        ? new Set()
        : new Set( paymentItems.map( ( i ) => i.id! ).filter( Boolean ) )
    );
  };

  const totalSelected = React.useMemo( () =>
    paymentItems
      .filter( ( i ) => i.id && selectedItemIds.has( i.id ) )
      .reduce( ( sum, i ) => sum + ( i.amount?.value || 0 ), 0 ),
    [ paymentItems, selectedItemIds ]
  );

  const currency = paymentItems.find( ( i ) => i.id && selectedItemIds.has( i.id ) )?.amount?.currency;

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    if ( !selectedCreatorId ) return;
    if ( selectedItemIds.size === 0 ) {
      toast.error( 'Select at least one payment item.' );
      return;
    }
    createPayment( {
      creator_id: selectedCreatorId,
      payment_item_ids: Array.from( selectedItemIds ),
      payment_method: paymentMethod || undefined,
      notes: notes || undefined,
    } );
  };

  // ── Render helpers for the creator combobox ──────────────────────────────

  const renderCreatorTrigger = ( selected: SelectOption | undefined ) => {
    if ( !selected || typeof selected !== 'object' ) {
      return <span className="text-muted-foreground">Select a creator...</span>;
    }
    const creator = creatorMap.get( selected.value );
    const photoUrl = creator?.profile_image?.asset;
    const name = selected.label as string;
    return (
      <div className="flex items-center gap-2 min-w-0 py-8">
        <Avatar className="size-8 shrink-0">
          { photoUrl && <AvatarImage src={ imgpresets.avatar( photoUrl ) } alt={ name } /> }
          <AvatarFallback className="text-[9px]">{ getInitials( name ) }</AvatarFallback>
        </Avatar>
        <span className="truncate">{ name }</span>
      </div>
    );
  };

  const renderCreatorOption = ( option: SelectOption, isSelected: boolean ) => {
    if ( typeof option !== 'object' ) return <span className="px-2 py-1.5">{ option }</span>;
    const creator = creatorMap.get( option.value );
    const photoUrl = creator?.profile_image?.asset;
    const name = option.label as string;
    return (
      <div className={ cn(
        'flex items-center gap-2.5 w-full px-2 py-2 transition-colors rounded-lg group/option',
        isSelected
          ? 'bg-primary/10 ring-1 ring-inset ring-primary/30'
          : 'hover:bg-primary/8 hover:ring-1 hover:ring-inset hover:ring-primary/20'
      ) }>
        <Avatar className="size-8 shrink-0">
          { photoUrl && <AvatarImage src={ imgpresets.avatar( photoUrl ) } alt={ name } /> }
          <AvatarFallback className="text-[10px]">{ getInitials( name ) }</AvatarFallback>
        </Avatar>
        <span className="flex-1 min-w-0">
          <span className="block text-sm truncate">{ name }</span>
        </span>
        <span className={ cn( 'opacity-0 size-5 rounded-full bg-white border border-primary/30 shadow-sm shrink-0 flex items-center justify-center group-hover/option:bg-primary group-hover/option:opacity-100 transition-all duration-100', isSelected && 'opacity-100 bg-white' ) }>
          <Check className="size-3 text-primary group-hover/option:text-white!" />
        </span>
      </div>
    );
  };

  const canSubmit = !!selectedCreatorId && selectedItemIds.size > 0 && !isSubmitting;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[520px]! flex flex-col overflow-hidden p-0!">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-background/80">
          <SheetTitle className="dialog__title text-primary">New batch payment</SheetTitle>
          <SheetDescription className="text-base">Select a creator and their pending payment items.</SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit } className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            { /* Creator combobox */ }
            <SuperField
              type="searchable-select"
              label="Creator"
              placeholder="Select a creator..."
              required
              options={ creatorOptions }
              value={ selectedCreatorId }
              onValueChange={ ( v ) => {
                setSelectedCreatorId( v || '' );
                setSelectedItemIds( new Set() );
              } }
              disabled={ creatorsLoading }
              renderOption={ renderCreatorOption }
              renderTrigger={ renderCreatorTrigger }
              fieldClassName='h-12'
            />

            { /* Payment items */ }
            { selectedCreatorId && (
              <WrappedCard
                variant='flush'
                title={ <p className="text-sm font-medium">
                  Pending items
                  { !itemsLoading && (
                    <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                      ({ paymentItems.length })
                    </span>
                  ) }
                </p> }>
                <div className="flex items-center justify-between">
                  { paymentItems.length > 0 && (
                    <button type="button" onClick={ toggleAll } className="text-xs text-primary hover:underline">
                      { selectedItemIds.size === paymentItems.length ? 'Deselect all' : 'Select all' }
                    </button>
                  ) }
                </div>

                { itemsLoading ? (
                  <div className="space-y-2">
                    { [ 1, 2, 3 ].map( ( i ) => (
                      <div key={ i } className="h-16 rounded-lg border bg-muted/30 animate-pulse" />
                    ) ) }
                  </div>
                ) : paymentItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center border rounded-lg">
                    No pending payment items for this creator.
                  </p>
                ) : (
                  <div className="space-y-2">
                    { paymentItems.map( ( item ) => (
                      <PaymentItemRow
                        key={ item.id }
                        item={ item }
                        selected={ !!item.id && selectedItemIds.has( item.id ) }
                        onToggle={ () => item.id && toggleItem( item.id ) }
                      />
                    ) ) }
                  </div>
                ) }
              </WrappedCard>
            ) }

            { /* Optional fields */ }
            { selectedItemIds.size > 0 && (
              <>
                <SuperField
                  type="text"
                  label="Payment method"
                  placeholder="e.g. bank transfer, PayPal..."
                  value={ paymentMethod }
                  onChange={ ( e ) => setPaymentMethod( e.target.value ) }
                />
                <SuperField
                  type="textarea"
                  label="Notes"
                  placeholder="Optional notes..."
                  value={ notes }
                  onChange={ ( e ) => setNotes( e.target.value ) }
                />
              </>
            ) }
          </div>

          { /* Footer */ }
          <div className="shrink-0 border-t px-6 py-4 flex items-center justify-between gap-3 bg-background">
            <div className="text-sm">
              { selectedItemIds.size > 0 ? (
                <span>
                  <span className="font-semibold">{ selectedItemIds.size }</span>
                  <span className="text-muted-foreground"> item{ selectedItemIds.size !== 1 ? 's' : '' } · </span>
                  <span className="font-normal font-primary text-primary text-xl">{ useFormatCurrency( totalSelected, currency ) }</span>
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">No items selected</span>
              ) }
            </div>
            <Button type="submit" size="sm" disabled={ !canSubmit }>
              { isSubmitting ? 'Creating...' : 'Create payment' }
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// ── Trigger button ────────────────────────────────────────────────────────────

export function NewBatchPaymentButton() {
  const [ open, setOpen ] = React.useState( false );

  return (
    <>
      <Button size="sm" onClick={ () => setOpen( true ) }>
        <HugeiconsIcon icon={ Add01Icon } className="size-4" />
        New batch payment
      </Button>
      <NewBatchPaymentSheet open={ open } onOpenChange={ setOpen } />
    </>
  );
}
