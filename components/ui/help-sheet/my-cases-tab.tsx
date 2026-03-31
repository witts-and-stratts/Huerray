'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { useCases, useCaseMessages, useCase, useAddCaseMessage } from '@/lib/api/hooks/cases';
import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { CaseRow } from '@/components/admin/cases/case-row';
import { CaseStatusBadge } from '@/components/admin/cases/case-status-badge';
import { CasePriorityBadge } from '@/components/admin/cases/case-priority-badge';
import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { timeAgo } from '@/lib/utils';

interface MyCasesTabProps {
  role: 'admin' | 'brand' | 'creator';
}

const casesPageUrl: Record<MyCasesTabProps['role'], string> = {
  admin: '/admin/cases',
  brand: '/brand/cases',
  creator: '/creator/cases',
};

function CaseInlineDetail( { case_, onBack }: { case_: ModelsCaseResponse; onBack: () => void } ) {
  const t = useTranslations( 'dashboard.common' );
  const { data: caseDetails } = useCase( case_.id! );
  const { data: messagesData } = useCaseMessages( case_.id! );
  const { mutate: addMessage, isPending: isSending } = useAddCaseMessage();
  const [ messageText, setMessageText ] = useState( '' );
  const messagesEndRef = useRef<HTMLDivElement>( null );

  const profile = caseDetails?.data || case_;
  const messages = ( messagesData as any )?.data || [];

  useEffect( () => {
    messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [ messages ] );

  const handleSend = () => {
    if ( !messageText.trim() || !case_.id ) return;
    addMessage(
      { id: case_.id, request: { message: messageText.trim() } },
      {
        onSuccess: () => setMessageText( '' ),
        onError: () => toast.error( 'Failed to send message' ),
      }
    );
  };

  return (
    <div className="flex flex-col h-full">
      { /* Header */ }
      <div className="flex items-start gap-2 pb-3 border-b border-border/60 mb-3">
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 -ml-1" onClick={ onBack }>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1 min-w-0">
          { profile.case_number && (
            <p className="text-[11px] text-muted-foreground font-mono mb-0.5">{ profile.case_number }</p>
          ) }
          <p className="text-sm font-medium leading-snug truncate">{ profile.title || 'Untitled Case' }</p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <CaseStatusBadge status={ profile.status || 'open' } />
            <CasePriorityBadge priority={ profile.priority || 'normal' } />
            { profile.created_at && (
              <span className="text-[11px] text-muted-foreground">{ timeAgo( profile.created_at ) }</span>
            ) }
          </div>
        </div>
      </div>

      { /* Description */ }
      { profile.description && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 pb-3 border-b border-border/40">
          { profile.description }
        </p>
      ) }

      { /* Messages */ }
      <ScrollArea className="flex-1 -mx-1 px-1">
        { messages.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            { t( 'helpSheet.myCases.noMessages' ) }
          </p>
        ) : (
          <div className="flex flex-col gap-3 pb-2">
            { messages.map( ( msg: any ) => {
              const name = msg.sender
                ? `${ msg.sender.first_name || '' } ${ msg.sender.last_name || '' }`.trim() || msg.sender.email || 'Unknown'
                : 'Unknown';
              return (
                <div key={ msg.id } className="flex flex-col gap-0.5 max-w-[90%]">
                  <span className="text-[11px] text-muted-foreground px-1">{ name }</span>
                  <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 text-sm leading-relaxed">
                    { msg.content || '' }
                  </div>
                  { msg.created_at && (
                    <span className="text-[10px] text-muted-foreground px-1">{ timeAgo( msg.created_at ) }</span>
                  ) }
                </div>
              );
            } ) }
            <div ref={ messagesEndRef } />
          </div>
        ) }
      </ScrollArea>

      { /* Reply */ }
      <div className="flex gap-2 items-end pt-3 border-t border-border/60 mt-2">
        <textarea
          value={ messageText }
          onChange={ ( e ) => setMessageText( e.target.value ) }
          onKeyDown={ ( e ) => {
            if ( e.key === 'Enter' && !e.shiftKey ) {
              e.preventDefault();
              handleSend();
            }
          } }
          placeholder={ t( 'helpSheet.myCases.replyPlaceholder' ) }
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

function MyCasesListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      { [ 1, 2, 3 ].map( ( i ) => (
        <div key={ i } className="px-3 py-2.5 border-b border-border/40">
          <Skeleton className="h-3.5 w-40 mb-1.5" />
          <Skeleton className="h-3 w-full mb-1" />
          <div className="flex gap-1.5 mt-1">
            <Skeleton className="h-4 w-14 rounded-full" />
            <Skeleton className="h-4 w-11 rounded-full" />
          </div>
        </div>
      ) ) }
    </div>
  );
}

export function MyCasesTab( { role }: MyCasesTabProps ) {
  const t = useTranslations( 'dashboard.common' );
  const params = useParams();
  const locale = ( params?.locale as string ) || 'en';
  const [ selectedCase, setSelectedCase ] = useState<ModelsCaseResponse | null>( null );

  const { data: response, isLoading } = useCases( { limit: 10 } );
  const cases: ModelsCaseResponse[] = response?.data || [];

  if ( selectedCase ) {
    return <CaseInlineDetail case_={ selectedCase } onBack={ () => setSelectedCase( null ) } />;
  }

  return (
    <div className="flex flex-col gap-3">
      { isLoading ? (
        <MyCasesListSkeleton />
      ) : cases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
          <p className="text-sm font-medium">{ t( 'helpSheet.myCases.empty' ) }</p>
          <p className="text-xs text-center">{ t( 'helpSheet.myCases.emptyDesc' ) }</p>
        </div>
      ) : (
        <div className="border border-border/60 rounded-lg overflow-hidden">
          { cases.map( ( case_ ) => (
            <CaseRow
              key={ case_.id }
              case_={ case_ }
              isSelected={ false }
              onClick={ () => setSelectedCase( case_ ) }
            />
          ) ) }
        </div>
      ) }

      <Link
        href={ `/${ locale }${ casesPageUrl[ role ] }` }
        className="text-xs text-primary hover:underline text-center mt-1"
      >
        { t( 'helpSheet.myCases.viewAll' ) } →
      </Link>
    </div>
  );
}
