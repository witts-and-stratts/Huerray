'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useLocale, useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import {
  ModelsCreatePaymentItemRequest,
  ModelsPaymentItemResponse,
  ModelsPaymentResponse,
  ModelsUpdatePaymentRequest,
  UtilsCurrency,
  UtilsPaymentItemStatus,
} from '@/lib/api/generated/models';
import { useCreator } from '@/lib/api/hooks/creators';
import { useGigs } from '@/lib/api/hooks/gigs';
import { useCreatePaymentItem, usePayment, usePaymentItems } from '@/lib/api/hooks/payments';
import { imgpresets } from '@/lib/utils/imgproxy';
import { type SelectOption } from '@/components/dashboard-ui/superfield/types';

interface PaymentUpdateSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  payment: ModelsPaymentResponse;
  onSubmit: ( request: ModelsUpdatePaymentRequest ) => void;
  isSubmitting: boolean;
}

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

const CURRENCY_OPTIONS: SelectOption[] = Object.values( UtilsCurrency ).map( ( currency ) => ( { value: currency, label: currency } ) );

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( ( word ) => word[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

function PaymentItemSelectionRow( {
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
    <button
      type="button"
      onClick={ onToggle }
      className={ `w-full flex items-start gap-3 px-3 py-3 rounded-lg border text-left transition-colors ${ selected
        ? 'border-primary bg-primary/5'
        : 'border-border bg-background hover:bg-muted/40'
        }` }
    >
      <span
        className={ `mt-0.5 size-4 shrink-0 rounded border flex items-center justify-center transition-colors ${ selected ? 'bg-primary border-primary' : 'border-muted-foreground/40'
          }` }
      >
        { selected && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) }
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-base font-primary font-medium truncate text-primary -mt-1">{ item.gig_title || item.description || '—' }</p>
        { item.description && item.gig_title && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">{ item.description }</p>
        ) }
        { item.item_count != null && item.cost_per_item?.value != null && (
          <p className="text-sm text-muted-foreground mt-0.5">
            { item.item_count } × { formatMoney( item.cost_per_item.value, item.cost_per_item.currency ) }
          </p>
        ) }
      </div>
      <div className="flex flex-col items-end shrink-0 gap-1">
        { amount != null && (
          <span className="text-base font-primary font-normal">{ formatMoney( amount, item.amount?.currency ) }</span>
        ) }
        <span className="text-xs text-muted-foreground">
          { item.payment_id ? 'Included' : 'Pending' }
        </span>
      </div>
    </button>
  );
}

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
          X
        </button>
      </div>
    </div>
  );
}

export function PaymentUpdateSheet( {
  open,
  onOpenChange,
  payment,
  onSubmit,
  isSubmitting,
}: PaymentUpdateSheetProps ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();

  const [ editMethod, setEditMethod ] = useState( '' );
  const [ editNotes, setEditNotes ] = useState( '' );
  const [ selectedItemIds, setSelectedItemIds ] = useState<Set<string>>( new Set() );
  const [ draftItems, setDraftItems ] = useState<DraftPaymentItem[]>( [] );
  const [ showAddForm, setShowAddForm ] = useState( false );
  const [ addForm, setAddForm ] = useState( EMPTY_ADD_FORM );

  const paymentId = payment.id || '';
  const { data: paymentDetailResponse, isLoading: isLoadingPayment } = usePayment( paymentId, {
    enabled: open && !!paymentId,
  } );
  const resolvedPayment = paymentDetailResponse?.data || payment;

  const currentPaymentItemIds = useMemo(
    () => new Set( ( resolvedPayment.payment_items || [] ).map( ( item ) => item.id ).filter( Boolean ) as string[] ),
    [ resolvedPayment.payment_items ]
  );

  const { data: updateItemsData, isLoading: isLoadingUpdateItems } = usePaymentItems(
    { creatorId: resolvedPayment.creator_id, itemStatus: 'pending', limit: 100 },
    { enabled: open && !!resolvedPayment.creator_id }
  );

  const { data: creator } = useCreator( resolvedPayment.creator_id || '', {
    enabled: open && !!resolvedPayment.creator_id,
  } );
  const { data: gigsData, isLoading: gigsLoading } = useGigs(
    { creatorId: resolvedPayment.creator_id, limit: 100 },
    { enabled: open && !!resolvedPayment.creator_id }
  );
  const { mutateAsync: createPaymentItemAsync } = useCreatePaymentItem();

  const gigs = gigsData?.data || [];
  const gigMap = useMemo( () => {
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
  const gigOptions: SelectOption[] = useMemo(
    () => gigs.map( ( gig ) => ( {
      value: gig.id || '',
      label: gig.title || gig.id || '—',
    } ) ),
    [ gigs ]
  );

  const selectableItems = useMemo( () => {
    const items = new Map<string, ModelsPaymentItemResponse>();

    ( resolvedPayment.payment_items || [] ).forEach( ( item ) => {
      if ( item.id ) {
        items.set( item.id, item );
      }
    } );

    ( updateItemsData?.data || [] ).forEach( ( item ) => {
      if ( item.id && !items.has( item.id ) ) {
        items.set( item.id, item );
      }
    } );

    return Array.from( items.values() );
  }, [ resolvedPayment.payment_items, updateItemsData?.data ] );

  useEffect( () => {
    if ( !open ) {
      setDraftItems( [] );
      setShowAddForm( false );
      setAddForm( EMPTY_ADD_FORM );
      return;
    }

    setEditMethod( resolvedPayment.payment_method || '' );
    setEditNotes( resolvedPayment.notes || '' );
    setSelectedItemIds( new Set( currentPaymentItemIds ) );
    setDraftItems( [] );
    setShowAddForm( false );
    setAddForm( EMPTY_ADD_FORM );
  }, [ currentPaymentItemIds, open, resolvedPayment.notes, resolvedPayment.payment_method ] );

  const totalExistingAmount = useMemo(
    () => selectableItems
      .filter( ( item ) => item.id && selectedItemIds.has( item.id ) )
      .reduce( ( sum, item ) => sum + ( item.amount?.value || 0 ), 0 ),
    [ selectableItems, selectedItemIds ]
  );

  const totalDraftAmount = useMemo(
    () => draftItems.reduce( ( sum, item ) => sum + ( item.item_count * item.cost_per_item.value ), 0 ),
    [ draftItems ]
  );

  const totalAmount = totalExistingAmount + totalDraftAmount;
  const totalItemCount = selectedItemIds.size + draftItems.length;

  const currency = useMemo(
    () => selectableItems.find( ( item ) => item.id && selectedItemIds.has( item.id ) )?.amount?.currency,
    [ selectableItems, selectedItemIds ]
  ) || draftItems[ 0 ]?.cost_per_item.currency;

  const formatMoney = ( amount: number, currencyCode?: string ) => new Intl.NumberFormat( locale, {
    style: 'currency',
    currency: currencyCode || 'USD',
  } ).format( amount );

  const toggleItem = ( id: string ) => {
    setSelectedItemIds( ( prev ) => {
      const next = new Set( prev );
      if ( next.has( id ) ) {
        next.delete( id );
      } else {
        next.add( id );
      }
      return next;
    } );
  };

  const handleAddDraftItem = () => {
    const gig = gigMap.get( addForm.gigId );
    const count = parseInt( addForm.itemCount, 10 );
    const cost = parseFloat( addForm.costValue );

    if ( !addForm.gigId || !count || count < 1 || !addForm.costValue || Number.isNaN( cost ) ) return;

    setDraftItems( ( previous ) => [ ...previous, {
      localId: crypto.randomUUID(),
      gig_id: addForm.gigId,
      gig_title: gig?.title || '',
      item_count: count,
      cost_per_item: { value: cost, currency: addForm.costCurrency },
      description: addForm.description,
    } ] );
    setShowAddForm( false );
    setAddForm( EMPTY_ADD_FORM );
  };

  const removeDraftItem = ( localId: string ) => {
    setDraftItems( ( previous ) => previous.filter( ( item ) => item.localId !== localId ) );
  };

  const handleSubmit = async () => {
    if ( !resolvedPayment.creator_id ) return;

    const nextItemIds = Array.from( selectedItemIds );
    let createdPaymentItemIds: string[] = [];

    if ( draftItems.length > 0 ) {
      try {
        const createdItems = await Promise.all( draftItems.map( ( draft ) => createPaymentItemAsync( {
          creator_id: resolvedPayment.creator_id || '',
          gig_id: draft.gig_id,
          item_count: draft.item_count,
          cost_per_item: {
            value: draft.cost_per_item.value,
            currency: draft.cost_per_item.currency as never,
          },
          description: draft.description || undefined,
          item_status: UtilsPaymentItemStatus.PaymentItemStatusPending,
        } as ModelsCreatePaymentItemRequest & { item_status: typeof UtilsPaymentItemStatus.PaymentItemStatusPending; } ) ) );

        createdPaymentItemIds = createdItems
          .map( ( response ) => response.data?.id )
          .filter( ( id ): id is string => !!id );
      } catch {
        toast.error( t( 'batchPayment.errorDesc' ), {
          description: t( 'batchPayment.errorDesc' ),
        } );
        return;
      }
    }

    const addPaymentItemIds = nextItemIds.filter( ( id ) => !currentPaymentItemIds.has( id ) );
    const removePaymentItemIds = Array.from( currentPaymentItemIds ).filter( ( id ) => !selectedItemIds.has( id ) );

    onSubmit( {
      add_payment_item_ids: [ ...addPaymentItemIds, ...createdPaymentItemIds ],
      payment_method: editMethod.trim() || undefined,
      notes: editNotes.trim() || undefined,
      remove_payment_item_ids: removePaymentItemIds,
    } );
  };

  const addFormValid = !!addForm.gigId
    && !!addForm.itemCount
    && parseInt( addForm.itemCount, 10 ) > 0
    && !!addForm.costValue
    && !Number.isNaN( parseFloat( addForm.costValue ) );

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[90%]! max-w-[520px]! flex flex-col overflow-hidden p-0!">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-background/80">
          <SheetTitle className="dialog__title text-primary">
            { t( 'payments.actions.update' ) }
          </SheetTitle>
          <SheetDescription className="text-base">{ t( 'payments.actions.updateDescription' ) }</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <WrappedCard
              variant="flush"
              title={ t( 'payments.table.creator' ) }
            >
              <div className="flex items-center gap-3 rounded-lg border px-3 py-3 bg-background">
                { isLoadingPayment ? (
                  <>
                    <div className="size-10 rounded-full bg-muted/50 animate-pulse shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-40 rounded bg-muted/50 animate-pulse" />
                      <div className="h-3 w-28 rounded bg-muted/40 animate-pulse" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar className="size-10 shrink-0">
                      { creator?.profile_image?.asset && (
                        <AvatarImage
                          src={ imgpresets.avatar( creator.profile_image.asset ) }
                          alt={ resolvedPayment.creator_name || '' }
                        />
                      ) }
                      <AvatarFallback className="text-[10px]">
                        { getInitials( resolvedPayment.creator_name ) }
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{ resolvedPayment.creator_name || '—' }</p>
                      <p className="text-xs text-muted-foreground truncate">{ resolvedPayment.creator_id || '—' }</p>
                    </div>
                  </>
                ) }
              </div>
            </WrappedCard>

            <WrappedCard
              variant="flush"
              title={
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm font-medium">
                    { t( 'payments.actions.paymentItems' ) }
                    <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                      ({ selectableItems.length + draftItems.length })
                    </span>
                  </p>
                </div>
              }
            >
              { isLoadingUpdateItems ? (
                <div className="space-y-2">
                  { [ 1, 2, 3 ].map( ( index ) => (
                    <div key={ index } className="h-16 rounded-lg border bg-muted/30 animate-pulse" />
                  ) ) }
                </div>
              ) : selectableItems.length === 0 && draftItems.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg">
                  { t( 'payments.actions.noEditableItems' ) }
                </p>
              ) : (
                <div className="space-y-2">
                  { selectableItems.map( ( item ) => (
                    <PaymentItemSelectionRow
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

              { showAddForm ? (
                <div className="mt-3 p-3 rounded-lg border bg-white space-y-3">
                  <SuperField
                    type="searchable-select"
                    label="Gig"
                    placeholder={ gigsLoading ? 'Loading…' : 'Select gig' }
                    options={ gigOptions }
                    value={ addForm.gigId }
                    onValueChange={ ( value ) => setAddForm( ( form ) => {
                      const selectedGig = value ? gigMap.get( value ) : undefined;
                      return {
                        ...form,
                        gigId: value || '',
                        costValue: selectedGig?.compensationValue != null ? String( selectedGig.compensationValue ) : '',
                        costCurrency: selectedGig?.compensationCurrency || form.costCurrency,
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
                      onChange={ ( e ) => setAddForm( ( form ) => ( { ...form, itemCount: e.target.value } ) ) }
                    />
                    <SuperField
                      type="text"
                      label="Cost per item"
                      placeholder="0.00"
                      value={ addForm.costValue }
                      onChange={ ( e ) => setAddForm( ( form ) => ( { ...form, costValue: e.target.value } ) ) }
                    />
                  </div>
                  <SuperField
                    type="select"
                    label="Currency"
                    options={ CURRENCY_OPTIONS }
                    value={ addForm.costCurrency }
                    onValueChange={ ( value ) => setAddForm( ( form ) => ( { ...form, costCurrency: value || 'USD' } ) ) }
                  />
                  <SuperField
                    type="text"
                    label="Description (optional)"
                    placeholder="e.g. Instagram Reel"
                    value={ addForm.description }
                    onChange={ ( e ) => setAddForm( ( form ) => ( { ...form, description: e.target.value } ) ) }
                  />
                  <div className="flex gap-2 justify-end pt-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={ () => {
                        setShowAddForm( false );
                        setAddForm( EMPTY_ADD_FORM );
                      } }
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

            <SuperField
              type="text"
              label={ t( 'payments.table.method' ) }
              value={ editMethod }
              onChange={ ( e ) => setEditMethod( e.target.value ) }
              placeholder={ t( 'payments.actions.methodPlaceholder' ) }
            />
            <SuperField
              type="textarea"
              label={ t( 'payments.details.notes' ) }
              value={ editNotes }
              onChange={ ( e ) => setEditNotes( e.target.value ) }
              placeholder={ t( 'payments.actions.notesPlaceholder' ) }
            />
          </div>

          <div className="shrink-0 border-t px-6 py-4 flex items-center justify-between gap-3 bg-background">
            <div className="text-sm">
              { totalItemCount > 0 ? (
                <span>
                  <span className="font-semibold">{ totalItemCount }</span>
                  <span className="text-muted-foreground"> item{ totalItemCount !== 1 ? 's' : '' } · </span>
                  <span className="font-normal font-primary text-primary text-xl">{ formatMoney( totalAmount, currency ) }</span>
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">{ t( 'payments.actions.noItemsSelected' ) }</span>
              ) }
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={ () => onOpenChange( false ) } disabled={ isSubmitting }>
                { t( 'cancel' ) }
              </Button>
              <Button onClick={ handleSubmit } disabled={ isSubmitting || ( selectedItemIds.size === 0 && draftItems.length === 0 ) }>
                { isSubmitting ? t( 'payments.actions.updating' ) : t( 'payments.actions.update' ) }
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
