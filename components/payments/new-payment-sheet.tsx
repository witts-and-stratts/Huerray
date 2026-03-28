'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { X, Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
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
import { usePaymentItems, useCreatePayment, useCreatePaymentItem } from '@/lib/api/hooks/payments';
import { useGigs } from '@/lib/api/hooks/gigs';
import {
  ModelsCreatePaymentItemRequest,
  ModelsCreatorResponse,
  ModelsPaymentItemResponse,
  UtilsCurrency,
  UtilsPaymentItemStatus,
} from '@/lib/api/generated/models';
import { type SelectOption } from '@/components/dashboard-ui/superfield/types';
import { cn } from '@/lib/dashboard-utils';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { useLocale, useTranslations } from 'next-intl';

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

function isSelectObject( option: SelectOption | undefined ): option is Extract<SelectOption, { value: string; }> {
  return typeof option === 'object' && option !== null && 'value' in option;
}

// ── Draft item type ────────────────────────────────────────────────────────────

interface DraftPaymentItem {
  localId: string;
  gig_id: string;
  gig_title: string;
  item_count: number;
  cost_per_item: { value: number; currency: string; };
  description: string;
}

const EMPTY_ADD_FORM = {
  gigId: '',
  itemCount: '1',
  costValue: '',
  costCurrency: 'USD',
  description: '',
};

const CURRENCY_OPTIONS: SelectOption[] = Object.values( UtilsCurrency ).map( c => ( { value: c, label: c } ) );

// ── Payment item row ──────────────────────────────────────────────────────────

function PaymentItemRow( {
  item,
  selected,
  onToggle,
  formatMoney,
}: {
  item: ModelsPaymentItemResponse;
  selected: boolean;
  onToggle: () => void;
  formatMoney: ( amount: number, currency?: string ) => string;
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
            { item.item_count } × { formatMoney( item.cost_per_item.value, item.cost_per_item.currency ) }
          </p>
        ) }
      </div>
      { amount != null && (
        <span className="text-base font-primary font-normal shrink-0">{ formatMoney( amount, item?.amount?.currency ) }</span>
      ) }
    </div>
  );
}

// ── Draft item row ─────────────────────────────────────────────────────────────

function DraftItemRow( {
  item,
  onRemove,
  formatMoney,
}: {
  item: DraftPaymentItem;
  onRemove: () => void;
  formatMoney: ( amount: number, currency?: string ) => string;
} ) {
  const total = item.item_count * item.cost_per_item.value;

  return (
    <div className="w-full flex items-start gap-3 px-3 py-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-left">
      <div className="flex-1 min-w-0">
        <p className="text-base font-primary font-medium truncate text-primary -mt-1">{ item.gig_title || '—' }</p>
        { item.description && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">{ item.description }</p>
        ) }
        <p className="text-sm text-muted-foreground mt-0.5">
          { item.item_count } × { formatMoney( item.cost_per_item.value, item.cost_per_item.currency ) }
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-base font-primary font-normal">{ formatMoney( total, item.cost_per_item.currency ) }</span>
        <button
          type="button"
          onClick={ onRemove }
          className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Main sheet ────────────────────────────────────────────────────────────────

interface NewPaymentSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function NewPaymentSheet( { open, onOpenChange }: NewPaymentSheetProps ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();

  const [ selectedCreatorId, setSelectedCreatorId ] = React.useState<string>( '' );
  const [ selectedItemIds, setSelectedItemIds ] = React.useState<Set<string>>( new Set() );
  const [ paymentMethod, setPaymentMethod ] = React.useState( '' );
  const [ notes, setNotes ] = React.useState( '' );
  const [ draftItems, setDraftItems ] = React.useState<DraftPaymentItem[]>( [] );
  const [ showAddForm, setShowAddForm ] = React.useState( false );
  const [ addForm, setAddForm ] = React.useState( EMPTY_ADD_FORM );
  const [ isSubmitting, setIsSubmitting ] = React.useState( false );

  React.useEffect( () => {
    if ( !open ) {
      setSelectedCreatorId( '' );
      setSelectedItemIds( new Set() );
      setPaymentMethod( '' );
      setNotes( '' );
      setDraftItems( [] );
      setShowAddForm( false );
      setAddForm( EMPTY_ADD_FORM );
    }
  }, [ open ] );

  // ── Data fetching ─────────────────────────────────────────────────────────

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
    { creatorId: selectedCreatorId, itemStatus: 'pending', limit: 100 },
    { enabled: !!selectedCreatorId }
  );
  const paymentItems = itemsData?.data || [];

  const { data: gigsData, isLoading: gigsLoading } = useGigs(
    { creatorId: selectedCreatorId, limit: 100 },
    { enabled: !!selectedCreatorId }
  );
  const gigs = gigsData?.data || [];
  const gigMap = React.useMemo( () => {
    const map = new Map<string, { title: string; compensationValue?: number; compensationCurrency?: string; }>();
    gigs.forEach( ( gig ) => {
      if ( gig.id ) {
        map.set( gig.id, {
          title: gig.title || gig.id,
          compensationValue: gig.compensation?.value,
          compensationCurrency: gig.compensation?.currency,
        } );
      }
    } );
    return map;
  }, [ gigs ] );
  const gigOptions: SelectOption[] = React.useMemo( () =>
    gigs.map( ( g ) => ( {
      value: g.id || '',
      label: g.title || g.id || '—',
    } ) ),
    [ gigs ]
  );

  // ── Mutations ─────────────────────────────────────────────────────────────

  const { mutateAsync: createPaymentItemAsync } = useCreatePaymentItem();
  const { mutateAsync: createPaymentAsync } = useCreatePayment();

  // ── Helpers ───────────────────────────────────────────────────────────────

  const formatMoney = React.useCallback( ( amount: number, currencyCode?: string ) => {
    return new Intl.NumberFormat( locale, {
      style: 'currency',
      currency: currencyCode || 'USD',
    } ).format( amount );
  }, [ locale ] );

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

  const totalExisting = React.useMemo( () =>
    paymentItems
      .filter( ( i ) => i.id && selectedItemIds.has( i.id ) )
      .reduce( ( sum, i ) => sum + ( i.amount?.value || 0 ), 0 ),
    [ paymentItems, selectedItemIds ]
  );

  const totalDraft = React.useMemo( () =>
    draftItems.reduce( ( sum, i ) => sum + ( i.item_count * i.cost_per_item.value ), 0 ),
    [ draftItems ]
  );

  const totalAmount = totalExisting + totalDraft;
  const totalCount = selectedItemIds.size + draftItems.length;
  const currency = paymentItems.find( ( i ) => i.id && selectedItemIds.has( i.id ) )?.amount?.currency
    || draftItems[ 0 ]?.cost_per_item.currency;

  // ── Add item form handlers ────────────────────────────────────────────────

  const handleAddDraftItem = () => {
    const gig = gigMap.get( addForm.gigId );
    const count = parseInt( addForm.itemCount, 10 );
    const cost = parseFloat( addForm.costValue );
    if ( !addForm.gigId || !count || count < 1 || !addForm.costValue || isNaN( cost ) ) return;

    setDraftItems( prev => [ ...prev, {
      localId: crypto.randomUUID(),
      gig_id: addForm.gigId,
      gig_title: gig?.title || '',
      item_count: count,
      cost_per_item: { value: cost, currency: addForm.costCurrency },
      description: addForm.description,
    } ] );
    setAddForm( EMPTY_ADD_FORM );
    setShowAddForm( false );
  };

  const removeDraftItem = ( localId: string ) => {
    setDraftItems( prev => prev.filter( i => i.localId !== localId ) );
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    if ( !selectedCreatorId ) return;
    if ( selectedItemIds.size === 0 && draftItems.length === 0 ) {
      toast.error( t( 'batchPayment.selectAtLeastOne' ) );
      return;
    }

    setIsSubmitting( true );
    try {
      // 1. POST draft payment items in parallel and collect the new IDs
      const createdItems = await Promise.all( draftItems.map( ( draft ) =>
        createPaymentItemAsync( {
          creator_id: selectedCreatorId,
          gig_id: draft.gig_id,
          item_count: draft.item_count,
          cost_per_item: { value: draft.cost_per_item.value, currency: draft.cost_per_item.currency as never },
          description: draft.description || undefined,
          item_status: UtilsPaymentItemStatus.PaymentItemStatusPending,
        } as ModelsCreatePaymentItemRequest & { item_status: typeof UtilsPaymentItemStatus.PaymentItemStatusPending } )
      ) );
      const newItemIds = createdItems
        .map( ( res ) => res.data?.id )
        .filter( ( id ): id is string => !!id );

      // 2. POST the payment with all item IDs
      await createPaymentAsync( {
        creator_id: selectedCreatorId,
        payment_item_ids: [ ...Array.from( selectedItemIds ), ...newItemIds ],
        payment_method: paymentMethod || undefined,
        notes: notes || undefined,
      } );

      toast.success( t( 'batchPayment.successTitle' ), {
        description: t( 'batchPayment.successDesc' ),
        richColors: true,
      } );
      onOpenChange( false );
    } catch {
      toast.error( t( 'batchPayment.errorDesc' ), { richColors: true } );
    } finally {
      setIsSubmitting( false );
    }
  };

  // ── Creator combobox renderers ────────────────────────────────────────────

  const renderCreatorTrigger = ( selected: SelectOption | undefined ) => {
    if ( !selected || typeof selected !== 'object' ) {
      return <span className="text-muted-foreground">{ t( 'batchPayment.creatorPlaceholder' ) }</span>;
    }
    if ( !isSelectObject( selected ) ) {
      return <span className="text-muted-foreground">{ t( 'batchPayment.creatorPlaceholder' ) }</span>;
    }
    const creator = creatorMap.get( selected.value );
    const photoUrl = creator?.profile_image?.asset;
    const name = typeof selected.label === 'string' ? selected.label : [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || selected.value;
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
    if ( !isSelectObject( option ) ) return <span className="px-2 py-1.5">{ option }</span>;
    const creator = creatorMap.get( option.value );
    const photoUrl = creator?.profile_image?.asset;
    const name = typeof option.label === 'string' ? option.label : [ creator?.first_name, creator?.last_name ].filter( Boolean ).join( ' ' ) || option.value;
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

  const canSubmit = !!selectedCreatorId && ( selectedItemIds.size > 0 || draftItems.length > 0 ) && !isSubmitting;
  const addFormValid = !!addForm.gigId && !!addForm.itemCount && parseInt( addForm.itemCount, 10 ) > 0
    && !!addForm.costValue && !isNaN( parseFloat( addForm.costValue ) );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange } modal>
      <SheetContent className="w-[90%]! max-w-[520px]! flex flex-col overflow-hidden p-0!">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-background/80">
          <SheetTitle className="dialog__title text-primary">{ t( 'batchPayment.title' ) }</SheetTitle>
          <SheetDescription className="text-base">{ t( 'batchPayment.description' ) }</SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit } className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            { /* Creator combobox */ }
            <SuperField
              type="searchable-select"
              label={ t( 'batchPayment.creatorLabel' ) }
              placeholder={ t( 'batchPayment.creatorPlaceholder' ) }
              required
              options={ creatorOptions }
              value={ selectedCreatorId }
              onValueChange={ ( v ) => {
                setSelectedCreatorId( v || '' );
                setSelectedItemIds( new Set() );
                setDraftItems( [] );
                setShowAddForm( false );
                setAddForm( EMPTY_ADD_FORM );
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
                title={
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-medium">
                      { t( 'batchPayment.pendingItems' ) }
                      { !itemsLoading && (
                        <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                          ({ paymentItems.length })
                        </span>
                      ) }
                    </p>
                  </div>
                }
              >
                { /* Existing pending items */ }
                { paymentItems.length > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <button type="button" onClick={ toggleAll } className="text-xs text-primary hover:underline">
                      { selectedItemIds.size === paymentItems.length ? t( 'batchPayment.deselectAll' ) : t( 'batchPayment.selectAll' ) }
                    </button>
                  </div>
                ) }

                { itemsLoading ? (
                  <div className="space-y-2">
                    { [ 1, 2, 3 ].map( ( i ) => (
                      <div key={ i } className="h-16 rounded-lg border bg-muted/30 animate-pulse" />
                    ) ) }
                  </div>
                ) : paymentItems.length === 0 && draftItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg">
                    { t( 'batchPayment.noItems' ) }
                  </p>
                ) : (
                  <div className="space-y-2">
                    { paymentItems.map( ( item ) => (
                      <PaymentItemRow
                        key={ item.id }
                        item={ item }
                        selected={ !!item.id && selectedItemIds.has( item.id ) }
                        onToggle={ () => item.id && toggleItem( item.id ) }
                        formatMoney={ formatMoney }
                      />
                    ) ) }
                    { draftItems.map( ( item ) => (
                      <DraftItemRow
                        key={ item.localId }
                        item={ item }
                        onRemove={ () => removeDraftItem( item.localId ) }
                        formatMoney={ formatMoney }
                      />
                    ) ) }
                  </div>
                ) }

                { /* Add item form */ }
                { showAddForm ? (
                  <div className="mt-3 p-3 rounded-lg border bg-white space-y-3">
                    <SuperField
                      type="searchable-select"
                      label="Gig"
                      placeholder={ gigsLoading ? 'Loading…' : 'Select gig' }
                      options={ gigOptions }
                      value={ addForm.gigId }
                      onValueChange={ ( v ) => setAddForm( f => {
                        const selectedGig = v ? gigMap.get( v ) : undefined;
                        return {
                          ...f,
                          gigId: v || '',
                          costValue: selectedGig?.compensationValue != null ? String( selectedGig.compensationValue ) : '',
                          costCurrency: selectedGig?.compensationCurrency || f.costCurrency,
                        };
                      } ) }
                      disabled={ gigsLoading }
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <SuperField
                        type="text"
                        label="Item count"
                        placeholder="1"
                        value={ addForm.itemCount }
                        onChange={ ( e ) => setAddForm( f => ( { ...f, itemCount: e.target.value } ) ) }
                      />
                      <SuperField
                        type="text"
                        label="Cost per item"
                        placeholder="0.00"
                        value={ addForm.costValue }
                        onChange={ ( e ) => setAddForm( f => ( { ...f, costValue: e.target.value } ) ) }
                      />
                    </div>
                    <SuperField
                      type="select"
                      label="Currency"
                      options={ CURRENCY_OPTIONS }
                      value={ addForm.costCurrency }
                      onValueChange={ ( v ) => setAddForm( f => ( { ...f, costCurrency: v || 'USD' } ) ) }
                    />
                    <SuperField
                      type="text"
                      label="Description (optional)"
                      placeholder="e.g. Instagram Reel"
                      value={ addForm.description }
                      onChange={ ( e ) => setAddForm( f => ( { ...f, description: e.target.value } ) ) }
                    />
                    <div className="flex gap-2 justify-end pt-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={ () => { setShowAddForm( false ); setAddForm( EMPTY_ADD_FORM ); } }
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={ !addFormValid }
                        onClick={ handleAddDraftItem }
                      >
                        Add item
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={ () => setShowAddForm( true ) }
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <HugeiconsIcon icon={ Add01Icon } className="size-3.5" />
                    Add new item
                  </button>
                ) }
              </WrappedCard>
            ) }

            { /* Optional fields */ }
            { ( selectedItemIds.size > 0 || draftItems.length > 0 ) && (
              <>
                <SuperField
                  type="text"
                  label={ t( 'batchPayment.methodLabel' ) }
                  placeholder={ t( 'batchPayment.methodPlaceholder' ) }
                  value={ paymentMethod }
                  onChange={ ( e ) => setPaymentMethod( e.target.value ) }
                />
                <SuperField
                  type="textarea"
                  label={ t( 'batchPayment.notesLabel' ) }
                  placeholder={ t( 'batchPayment.notesPlaceholder' ) }
                  value={ notes }
                  onChange={ ( e ) => setNotes( e.target.value ) }
                />
              </>
            ) }
          </div>

          { /* Footer */ }
          <div className="shrink-0 border-t px-6 py-4 flex items-center justify-between gap-3 bg-background">
            <div className="text-sm">
              { totalCount > 0 ? (
                <span>
                  <span className="font-semibold">{ totalCount }</span>
                  <span className="text-muted-foreground"> item{ totalCount !== 1 ? 's' : '' } · </span>
                  <span className="font-normal font-primary text-primary text-xl">{ formatMoney( totalAmount, currency ) }</span>
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">{ t( 'batchPayment.noItemsSelected' ) }</span>
              ) }
            </div>
            <Button type="submit" size="sm" disabled={ !canSubmit }>
              { isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" /> }
              { isSubmitting ? t( 'batchPayment.creating' ) : t( 'batchPayment.create' ) }
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// ── Trigger button ────────────────────────────────────────────────────────────

export function NewPaymentButton() {
  const t = useTranslations( 'dashboard.common' );
  const [ open, setOpen ] = React.useState( false );

  return (
    <>
      <Button size="sm" onClick={ () => setOpen( true ) }>
        <HugeiconsIcon icon={ Add01Icon } className="size-4" />
        { t( 'batchPayment.title' ) }
      </Button>
      <NewPaymentSheet open={ open } onOpenChange={ setOpen } />
    </>
  );
}
