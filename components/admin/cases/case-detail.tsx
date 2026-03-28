'use client';

import * as React from 'react';
import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { useCase, useCaseMessages, useAddCaseMessage } from '@/lib/api/hooks/cases';
import { CaseStatusBadge } from './case-status-badge';
import { CasePriorityBadge } from './case-priority-badge';
import { CaseActionMenu } from './case-action-menu';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Separator } from '@/components/dashboard-ui/separator';
import { cn } from '@/lib/dashboard-utils';
import { timeAgo } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ChevronDown, HeadphonesIcon, Send } from 'lucide-react';
import { toast } from 'sonner';

// ─── Empty state ──────────────────────────────────────────────────────────────

function CaseDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground select-none w-full">
      <HeadphonesIcon className="size-12 opacity-20" strokeWidth={ 1 } />
      <p className="text-sm">Select a case to view details</p>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble( { content, senderName, sentAt }: { content: string; senderName: string; sentAt: string; } ) {
  return (
    <div className="flex flex-col gap-1 max-w-[85%]">
      <span className="text-xs text-muted-foreground px-1">{ senderName }</span>
      <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed">
        { content }
      </div>
      <span className="text-[10px] text-muted-foreground px-1">{ sentAt }</span>
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

  return (
    <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/60 shrink-0">
      { onBack && (
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -ml-2" onClick={ onBack }>
          <ArrowLeft className="size-4" />
        </Button>
      ) }

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          { case_.case_number && (
            <span className="text-xs text-muted-foreground font-mono">{ case_.case_number }</span>
          ) }
        </div>
        <h2 className="text-base font-medium text-foreground leading-snug truncate">
          { case_.title || 'Untitled Case' }
        </h2>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <CaseStatusBadge status={ case_.status || 'open' } />
          <CasePriorityBadge priority={ case_.priority || 'medium' } />
          { case_.created_at && (
            <span className="text-xs text-muted-foreground">{ timeAgo( case_.created_at ) }</span>
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
  const caseId = case_.id || '';
  const { data: caseDetails } = useCase( caseId );
  const { data: messagesData } = useCaseMessages( caseId );
  const { mutate: addMessage, isPending: isSending } = useAddCaseMessage();
  const [ messageText, setMessageText ] = React.useState( '' );
  const messagesEndRef = React.useRef<HTMLDivElement>( null );

  const profile = caseDetails?.data || case_;
  const messages = ( messagesData as any )?.data || [];

  React.useEffect( () => {
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
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                { t( 'details.descriptionLabel' ) }
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">{ profile.description }</p>
            </div>
          ) }

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.reporter' ) }</p>
              <p className="font-medium truncate">{ reporterName }</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.assignee' ) }</p>
              <p className="font-medium truncate">{ assigneeName }</p>
            </div>
            { profile?.related_entity_type && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.relatedEntity' ) }</p>
                <p className="font-medium capitalize">{ profile.related_entity_type.replace( /_/g, ' ' ) }</p>
              </div>
            ) }
            { profile?.created_at && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{ t( 'details.created' ) }</p>
                <p className="font-medium">
                  { new Date( profile.created_at ).toLocaleDateString( 'en-US', { year: 'numeric', month: 'short', day: 'numeric' } ) }
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
                { messages.map( ( msg: any ) => {
                  const name = msg.sender
                    ? `${ msg.sender.first_name || '' } ${ msg.sender.last_name || '' }`.trim() || msg.sender.email || t( 'details.unknown' )
                    : t( 'details.unknown' );
                  return (
                    <MessageBubble
                      key={ msg.id }
                      content={ msg.content || '' }
                      senderName={ name }
                      sentAt={ msg.created_at
                        ? new Date( msg.created_at ).toLocaleString( 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' } )
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
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface CaseDetailProps {
  case_: ModelsCaseResponse | null;
  onBack?: () => void;
}

export function CaseDetail( { case_, onBack }: CaseDetailProps ) {
  if ( !case_ ) return <CaseDetailEmpty />;

  return (
    <div className="flex flex-col h-full flex-1">
      <CaseDetailHeader case_={ case_ } onBack={ onBack } />
      <CaseDetailBody case_={ case_ } />
    </div>
  );
}
