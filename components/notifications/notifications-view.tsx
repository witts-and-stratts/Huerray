"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui/select";
import { Sheet, SheetContent } from "@/components/dashboard-ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/dashboard-ui/tabs";
import { useDeleteNotification, useMarkNotificationAsRead, useNotifications } from "@/lib/api/hooks/notifications";
import { config } from "@/lib/config";
import { keepPreviousData } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { SuperField } from "../dashboard-ui/super-field";
import { NotificationDetail } from "./notification-detail";
import { NotificationRow } from "./notification-row";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { NotificationsSkeleton } from "./notifications-skeleton";

export function NotificationsView() {
  const t = useTranslations( "dashboard.notifications" );

  const [ page, setPage ] = useState( 1 );
  const [ perPage, setPerPage ] = useState( 20 );
  const [ filter, setFilter ] = useState<"all" | "read" | "unread">( "all" );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ selectedId, setSelectedId ] = useState<string | null>( null );
  const [ mobileDetailOpen, setMobileDetailOpen ] = useState( false );

  const { data: response, isLoading, isPlaceholderData } = useNotifications( page, perPage, false, {
    placeholderData: keepPreviousData,
    refetchInterval: config.polling.notificationsInterval,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  } );

  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = useMemo( () => response?.data?.notifications || [], [ response?.data?.notifications ] );
  const unreadCount = response?.data?.unread_count || 0;
  const totalCount = response?.data?.total || notifications.length;
  const currentPage = response?.data?.page || page;
  const currentPerPage = response?.data?.per_page || perPage;
  const totalPages = Math.max( Math.ceil( totalCount / currentPerPage ), 1 );
  const startItem = totalCount === 0 ? 0 : ( currentPage - 1 ) * currentPerPage + 1;
  const endItem = totalCount === 0 ? 0 : Math.min( currentPage * currentPerPage, totalCount );
  const readCount = Math.max( totalCount - unreadCount, 0 );

  const filteredByStatus = useMemo( () => {
    if ( filter === "unread" ) return notifications.filter( n => !n.is_read );
    if ( filter === "read" ) return notifications.filter( n => n.is_read );
    return notifications;
  }, [ filter, notifications ] );

  const filtered = useMemo( () => {
    const query = searchTerm.trim().toLowerCase();
    if ( !query ) return filteredByStatus;
    return filteredByStatus.filter( n => {
      const title = n.title?.toLowerCase() ?? "";
      const message = n.message?.toLowerCase() ?? "";
      const eventType = n.event_type?.replace( /_/g, " " ).toLowerCase() ?? "";
      return title.includes( query ) || message.includes( query ) || eventType.includes( query );
    } );
  }, [ filteredByStatus, searchTerm ] );

  const selectedNotification = useMemo(
    () => filtered.find( n => n.id === selectedId ) ?? null,
    [ filtered, selectedId ]
  );

  const handleMarkAsRead = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    markAsRead.mutate( id );
  };

  const handleDelete = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    deleteNotification.mutate( id );
    if ( selectedId === id ) setSelectedId( null );
  };

  const handleSelect = ( id: string ) => {
    setSelectedId( id );
    if ( typeof window !== "undefined" && window.innerWidth < 768 ) {
      setMobileDetailOpen( true );
    }
    if ( id === selectedId ) return;
    const notification = notifications.find( n => n.id === id );
    if ( notification && !notification.is_read ) {
      markAsRead.mutate( id );
    }
  };

  if ( isLoading ) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Two-panel inbox */ }
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Mobile sheet — detail */ }
        <Sheet open={ mobileDetailOpen } onOpenChange={ setMobileDetailOpen }>
          <SheetContent side="right" className="w-full sm:max-w-full p-0 gap-0" showCloseButton={ false }>
            <NotificationDetail
              notification={ selectedNotification }
              onMarkAsRead={ handleMarkAsRead }
              onDelete={ ( id ) => { handleDelete( id ); setMobileDetailOpen( false ); } }
              onBack={ () => setMobileDetailOpen( false ) }
            />
          </SheetContent>
        </Sheet>

        {/* Left panel — list */ }
        <div className="flex flex-col w-full md:w-80 xl:w-96 shrink-0 border-r border-border/60 overflow-hidden">

          {/* Tabs */ }
          <div className="px-3 pt-3 pb-2 shrink-0">
            <Tabs
              value={ filter }
              onValueChange={ ( value ) => {
                setFilter( value as "all" | "read" | "unread" );
                setPage( 1 );
                setSelectedId( null );
              } }
            >
              <TabsList variant="default" className="border w-full">
                <TabsTrigger value="all" className="font-normal gap-1.5 flex-1">
                  { t( "tabs.all" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ totalCount }</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="font-normal gap-1.5 flex-1">
                  { t( "tabs.unread" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ unreadCount }</Badge>
                </TabsTrigger>
                <TabsTrigger value="read" className="font-normal gap-1.5 flex-1">
                  { t( "tabs.read" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ readCount }</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search */ }
          <div className="pb-2 shrink-0 px-3">
            <SuperField
              name="search"
              type="search"
              placeholder={ t.has( "search.placeholder" ) ? t( "search.placeholder" ) : "Search notifications" }
              prefix={ <Search className="size-4" /> }
              value={ searchTerm }
              onChange={ ( e ) => {
                setSearchTerm( e.target.value );
                setPage( 1 );
                setSelectedId( null );
              } }
            />
          </div>

          <div className="flex-1 relative overflow-hidden">
            { isPlaceholderData && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) }
          <ScrollArea className="h-full" scrollbar={ {
            className: "w-3 p-1",
          } }>
            { filtered.length === 0 ? (
              searchTerm.trim()
                ? (
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    { t.has( "search.noResults" ) ? t( "search.noResults" ) : "No notifications match your search." }
                  </div>
                )
                : <NotificationsEmptyState />
            ) : (
              <AnimatePresence initial={ false } mode="popLayout">
                { filtered.map( ( notification, index ) => (
                  <motion.div
                    key={ notification.id }
                    layout
                    initial={ { opacity: 0, x: -8 } }
                    animate={ { opacity: 1, x: 0 } }
                    exit={ { opacity: 0, x: -8 } }
                    transition={ { duration: 0.15, ease: "easeOut", delay: Math.min( index * 0.02, 0.1 ) } }
                  >
                    <NotificationRow
                      notification={ notification }
                      isSelected={ selectedId === notification.id }
                      onClick={ () => handleSelect( notification.id! ) }
                    />
                  </motion.div>
                ) ) }
              </AnimatePresence>
            ) }
          </ScrollArea>
          </div>

          {/* Pagination */ }
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/60 shrink-0 bg-muted/20">
            <span className="text-xs text-muted-foreground">
              { startItem }–{ endItem } / { totalCount }
            </span>
            <div className="flex items-center gap-1.5">
              <Select
                value={ String( currentPerPage ) }
                onValueChange={ ( v ) => { setPerPage( Number( v ) ); setPage( 1 ); } }
              >
                <SelectTrigger className="h-7 w-16 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  { [ 10, 20, 30, 50 ].map( size => (
                    <SelectItem key={ size } value={ String( size ) } className="text-xs">{ size }</SelectItem>
                  ) ) }
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                disabled={ currentPage <= 1 }
                onClick={ () => setPage( p => Math.max( p - 1, 1 ) ) }
              >
                <ChevronLeft className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                disabled={ currentPage >= totalPages }
                onClick={ () => setPage( p => Math.min( p + 1, totalPages ) ) }
              >
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right panel — detail (desktop only) */ }
        <div className="hidden md:flex flex-1 overflow-hidden bg-background w-full">
          <NotificationDetail
            notification={ selectedNotification }
            onMarkAsRead={ handleMarkAsRead }
            onDelete={ handleDelete }
          />
        </div>
      </div>
    </div>
  );
}
