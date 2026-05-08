'use client';

import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { CopyText } from '@/components/dashboard-ui/copy-text';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Separator } from '@/components/dashboard-ui/separator';
import { GigDetailsSheet } from '@/components/campaigns/gig-details-sheet';
import { PaymentDetailsSheet } from '@/components/payments/payment-details-sheet';
import { ModelsCaseResponse, ModelsCaseUserSummary, ModelsPaymentResponse, UtilsNotificationEntityType } from '@/lib/api/generated/models';
import { useAddCaseMessage, useCase, useCaseMessages } from '@/lib/api/hooks/cases';
import { useGig } from '@/lib/api/hooks/gigs';
import { useAuth } from '@/lib/auth/auth-context';
import { useTimeAgo } from '@/lib/hooks/format';
import { ArrowLeft, ChevronDown, HeadphonesIcon, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'sonner';
import { CaseActionMenu } from './case-action-menu';
import { CasePriorityBadge } from './case-priority-badge';
import { CaseStatusBadge } from './case-status-badge';
import { UserRole } from '@/lib/constants';

function getEntityHref(
  entityType: string | undefined,
  entityId: string | undefined,
  role: UserRole | undefined,
): string | null {
  if ( !entityType || !entityId || !role ) return null;
  if ( role === 'admin' ) {
    switch ( entityType ) {
      case UtilsNotificationEntityType.EntityBrand: return `/admin/brands/${ entityId }`;
      case UtilsNotificationEntityType.EntityCreator: return `/admin/creators/${ entityId }`;
      case UtilsNotificationEntityType.EntityCampaign: return `/admin/campaigns/${ entityId }`;
      case UtilsNotificationEntityType.EntityCase: return `/admin/support-tickets/${ entityId }`;
      case UtilsNotificationEntityType.EntityInvoice: return `/admin/invoice/${ entityId }`;
      default: return null;
    }
  }
  if ( role === 'brand' ) {
    switch ( entityType ) {
      case UtilsNotificationEntityType.EntityCampaign: return `/brand/campaigns/${ entityId }`;
      case UtilsNotificationEntityType.EntityCase: return `/brand/support-tickets/${ entityId }`;
      case UtilsNotificationEntityType.EntityInvoice: return '/brand/invoices';
      default: return null;
    }
  }
  if ( role === 'creator' ) {
    switch ( entityType ) {
      case UtilsNotificationEntityType.EntityCase: return `/creator/support-tickets/${ entityId }`;
      default: return null;
    }
  }
  return null;
}

function getReporterHref( reporter: ModelsCaseUserSummary | undefined, role: UserRole | undefined ): string | null {
  if ( role !== 'admin' || !reporter?.id ) return null;
  const userType = reporter.user_type?.toLowerCase();
  if ( userType === 'brand' || userType === 'brand_user' ) return `/admin/brands/${ reporter.id }`;
  if ( userType === 'creator' ) return `/admin/creators/${ reporter.id }`;
  return null;
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function CaseDetailEmpty() {
  const t = useTranslations( 'dashboard.admin.casesPage' );

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground select-none w-full">
      <HeadphonesIcon className="size-12 opacity-20" strokeWidth={ 1 } />
      <p className="text-sm">{ t( 'details.selectPrompt' ) }</p>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble( { content, senderName, sentAt }: { content: string; senderName: string; sentAt: string; } ) {
  return (
    <div className="flex flex-col gap-1 border-b border-b-border pb-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground px-1">{ senderName }</span>
        <span className="text-[11px] text-muted-foreground px-1 mt-1">{ sentAt }</span>
      </div>
      <div className="bg-muted rounded-sm px-3.5 py-2.5 text-base leading-relaxed">
        { content }
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

interface CaseDetailHeaderProps {
  case_: ModelsCaseResponse;
  onBack?: () => void;
}

function CaseDetailHeader( { case_, onBack }: CaseDetailHeaderProps ) {
  const tc = useTranslations( 'dashboard.common' );
  const formatTimeAgo = useTimeAgo();

  return (
    <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60 shrink-0 bg-slate-50/50">
      { onBack && (
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -ml-2" onClick={ onBack }>
          <ArrowLeft className="size-4" />
        </Button>
      ) }

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          { case_.case_number && (
            <CopyText text={ case_.case_number }>
              <Badge variant='outline'>
                <span className="text-xs text-muted-foreground/70 font-mono py-1">
                  { case_.case_number }</span>
              </Badge>
            </CopyText>
          ) }
        </div>
        <h2 className="text-lg font-primary font-medium text-foreground leading-snug truncate">
          { case_.title }
        </h2>
        <div className="flex items-center gap-0.25 mt-1.5 flex-wrap">
          <CaseStatusBadge status={ case_.status || 'open' } />
          <CasePriorityBadge priority={ case_.priority || 'medium' } />
          { case_.created_at && (
            <span className="text-xs text-muted-foreground">{ formatTimeAgo( case_.created_at ) }</span>
          ) }
        </div>
      </div>

      <CaseActionMenu
        case_={ case_ }
        trigger={
          <ButtonGroup className="shrink-0">
            <Button variant="outline" size="sm" className="font-regular">
              { tc( 'actions' ) }
            </Button>
            <Button variant="outline" size="sm" className="font-regular">
              <ChevronDown className="size-4" />
            </Button>
          </ButtonGroup>
        }
      />
    </div>
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

function CaseDetailBody( { case_ }: { case_: ModelsCaseResponse; } ) {
  const t = useTranslations( 'dashboard.admin.casesPage' );
  const locale = useLocale();
  const { user } = useAuth();
  const role = user?.role as UserRole | undefined;
  const caseId = case_.id || '';
  const { data: caseDetails } = useCase( caseId );
  const { data: messagesData } = useCaseMessages( caseId );
  const { mutate: addMessage, isPending: isSending } = useAddCaseMessage();
  const [ messageText, setMessageText ] = React.useState( '' );
  const messagesEndRef = React.useRef<HTMLDivElement>( null );

  const profile = caseDetails?.data || case_;
  const messages = ( messagesData )?.data || [];

  const reporterHref = getReporterHref( profile?.reporter, role );
  const relatedEntityHref = getEntityHref(
    profile?.related_entity_type,
    profile?.related_entity_id,
    role,
  );
  const isPaymentEntity = profile?.related_entity_type === UtilsNotificationEntityType.EntityPayment
    && !!profile?.related_entity_id;
  const isGigEntity = profile?.related_entity_type === UtilsNotificationEntityType.EntityGig
    && !!profile?.related_entity_id;
  const [ paymentSheetOpen, setPaymentSheetOpen ] = React.useState( false );
  const [ gigSheetOpen, setGigSheetOpen ] = React.useState( false );
  const { data: gigResponse } = useGig(
    profile?.related_entity_id || '',
    { enabled: isGigEntity && gigSheetOpen },
  );
  const gigData = gigResponse?.data;

  React.useEffect( () => {
    console.log( "Messages", messages );
    messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [ messages ] );

  const reporterName = profile?.reporter
    ? `${ profile.reporter.first_name || '' } ${ profile.reporter.last_name || '' }`.trim() || profile.reporter.email || t( 'details.unknown' )
    : t( 'details.unknown' );

  const assigneeName = profile?.assignee
    ? `${ profile.assignee.first_name || '' } ${ profile.assignee.last_name || '' }`.trim() || profile.assignee.email || t( 'details.unassigned' )
    : t( 'details.unassigned' );

  const handleSend = () => {
    if ( !messageText.trim() || !caseId ) return;
    addMessage(
      { id: caseId, request: { message: messageText.trim() } },
      {
        onSuccess: () => {
          setMessageText( '' );
          toast.success( t( 'messages.sent' ) );
        },
        onError: () => toast.error( t( 'messages.sendError' ) ),
      }
    );
  };

  const handleKeyDown = ( e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
    if ( e.key === 'Enter' && !e.shiftKey ) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1">
        <div className="px-6 py-5 space-y-5">

          { /* Case meta */ }
          { profile?.description && (
            <>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  { t( 'details.descriptionLabel' ) }
                </p>
                <p className="text-foreground/80 leading-relaxed">{ profile.description }</p>
              </div>
              <Separator />
            </>
          ) }

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm bg-slate-50/30 rounded-md px-4 py-4 border border-slate-50/80">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.reporter' ) }</p>
              { reporterHref ? (
                <Link href={ reporterHref } className="font-medium truncate block hover:underline text-primary">
                  { reporterName }
                </Link>
              ) : (
                <p className="font-medium truncate">{ reporterName }</p>
              ) }
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.assignee' ) }</p>
              <p className="font-medium truncate">{ assigneeName }</p>
            </div>
            { profile?.related_entity_type && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.relatedEntity' ) }</p>
                { isPaymentEntity ? (
                  <button
                    type="button"
                    onClick={ () => setPaymentSheetOpen( true ) }
                    className="font-medium capitalize block hover:underline text-primary text-left"
                  >
                    { profile.related_entity_type.replace( /_/g, ' ' ) }
                  </button>
                ) : isGigEntity ? (
                  <button
                    type="button"
                    onClick={ () => setGigSheetOpen( true ) }
                    className="font-medium capitalize block hover:underline text-primary text-left"
                  >
                    { profile.related_entity_type.replace( /_/g, ' ' ) }
                  </button>
                ) : relatedEntityHref ? (
                  <Link href={ relatedEntityHref } className="font-medium capitalize block hover:underline text-primary">
                    { profile.related_entity_type.replace( /_/g, ' ' ) }
                  </Link>
                ) : (
                  <p className="font-medium capitalize">{ profile.related_entity_type.replace( /_/g, ' ' ) }</p>
                ) }
              </div>
            ) }
            { profile?.created_at && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.created' ) }</p>
                <p className="font-medium">
                  { new Date( profile.created_at ).toLocaleDateString( locale, { year: 'numeric', month: 'short', day: 'numeric' } ) }
                </p>
              </div>
            ) }
          </div>

          <Separator />

          { /* Message thread */ }
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
              { t( 'messages.tab' ) }
            </p>

            { messages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">{ t( 'messages.empty' ) }</p>
            ) : (
              <div className="flex flex-col gap-4">
                { messages.map( ( msg ) => {
                  const name = msg.sender
                    ? `${ msg.sender.first_name || '' } ${ msg.sender.last_name || '' }`.trim() || msg.sender.email || t( 'details.unknown' )
                    : t( 'details.unknown' );
                  return (
                    <MessageBubble
                      key={ msg.id }
                      content={ msg.message || '' }
                      senderName={ name }
                      sentAt={ msg.created_at
                        ? new Date( msg.created_at ).toLocaleString( locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' } )
                        : '' }
                    />
                  );
                } ) }
                <div ref={ messagesEndRef } />
              </div>
            ) }
          </div>
        </div>
      </ScrollArea>

      { /* Reply input */ }
      <div className="px-6 py-4 border-t border-border/60 shrink-0 flex gap-2 items-end">
        <textarea
          value={ messageText }
          onChange={ ( e ) => setMessageText( e.target.value ) }
          onKeyDown={ handleKeyDown }
          placeholder={ t( 'messages.placeholder' ) }
          rows={ 2 }
          className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={ handleSend }
          disabled={ !messageText.trim() || isSending }
          className="shrink-0"
        >
          <Send className="size-4" />
        </Button>
      </div>

      { isPaymentEntity && (
        <PaymentDetailsSheet
          payment={ { id: profile.related_entity_id } as ModelsPaymentResponse }
          open={ paymentSheetOpen }
          onOpenChange={ setPaymentSheetOpen }
          isAdmin={ role === 'admin' }
        />
      ) }
      { isGigEntity && gigSheetOpen && gigData && (
        <GigDetailsSheet
          gig={ gigData }
          open={ gigSheetOpen }
          onOpenChange={ setGigSheetOpen }
        />
      ) }
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface CaseDetailProps {
  case_: ModelsCaseResponse | null;
  onBack?: () => void;
}

export function CaseDetail( { case_, onBack }: CaseDetailProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage' );

  if ( !case_ ) return <CaseDetailEmpty />;

  return (
    <div className="flex flex-col h-full flex-1">
      <CaseDetailHeader
        case_={ {
          ...case_,
          title: case_.title || t( 'details.untitled' ),
        } }
        onBack={ onBack }
      />
      <CaseDetailBody
        case_={ {
          ...case_,
          title: case_.title || t( 'details.untitled' ),
        } }
      />
    </div>
  );
}
