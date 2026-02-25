"use client";

import { Badge } from "@/components/dashboard-ui/badge";
import { Button } from "@/components/dashboard-ui/button";
import { Card, CardContent } from "@/components/dashboard-ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/dashboard-ui/tabs";
import { useDeleteNotification, useMarkNotificationAsRead, useNotifications } from "@/lib/api/hooks/notifications";
import NumberFlow from "@number-flow/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { SuperField } from "../dashboard-ui/super-field";
import { NotificationItem } from "./notification-item";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { NotificationsSkeleton } from "./notifications-skeleton";

export function NotificationsView() {
  const t = useTranslations( "dashboard.notifications" );
  const searchPlaceholder = t.has( "search.placeholder" ) ? t( "search.placeholder" ) : "Search notifications";
  const searchNoResults = t.has( "search.noResults" ) ? t( "search.noResults" ) : "No notifications match your search.";
  const paginationRowsPerPage = t.has( "pagination.rowsPerPage" ) ? t( "pagination.rowsPerPage" ) : "Rows per page";
  const paginationPage = t.has( "pagination.page" ) ? t( "pagination.page" ) : "Page";
  const paginationOf = t.has( "pagination.of" ) ? t( "pagination.of" ) : "of";
  const paginationPrevious = t.has( "pagination.previous" ) ? t( "pagination.previous" ) : "Previous";
  const paginationNext = t.has( "pagination.next" ) ? t( "pagination.next" ) : "Next";
  const [ page, setPage ] = useState( 1 );
  const [ perPage, setPerPage ] = useState( 10 );
  const [ filter, setFilter ] = useState<"all" | "read" | "unread">( "all" );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const { data: response, isLoading } = useNotifications( page, perPage, false, {
    refetchInterval: 30000,
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

  const startOfToday = new Date();
  startOfToday.setHours( 0, 0, 0, 0 );
  const newToday = notifications.filter( ( notification ) => {
    if ( !notification.created_at ) return false;
    return new Date( notification.created_at ).getTime() >= startOfToday.getTime();
  } ).length;

  const filteredByStatus = useMemo(
    () => {
      if ( filter === "unread" ) return notifications.filter( ( notification ) => !notification.is_read );
      if ( filter === "read" ) return notifications.filter( ( notification ) => notification.is_read );
      return notifications;
    },
    [ filter, notifications ]
  );
  const filtered = useMemo(
    () => {
      const query = searchTerm.trim().toLowerCase();
      if ( !query ) return filteredByStatus;
      return filteredByStatus.filter( ( notification ) => {
        const title = notification.title?.toLowerCase() ?? "";
        const message = notification.message?.toLowerCase() ?? "";
        const eventType = notification.event_type?.replace( /_/g, " " ).toLowerCase() ?? "";
        return title.includes( query ) || message.includes( query ) || eventType.includes( query );
      } );
    },
    [ filteredByStatus, searchTerm ]
  );
  const readCount = Math.max( totalCount - unreadCount, 0 );

  const handleMarkAsRead = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    markAsRead.mutate( id );
  };

  const handleDelete = ( id: string, e?: React.MouseEvent ) => {
    e?.stopPropagation();
    deleteNotification.mutate( id );
  };

  if ( isLoading ) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="px-5 w-full mx-auto flex-1 py-5 bg-slate-50/30">
      <div className="space-y-5 h-full">
        <section className="ad-kpi-grid grid grid-cols-3">
          <Card className="ad-summary-card py-3">
            <CardContent className="space-y-1">
              <p className="ad-stat-label">{ t( "stats.total" ) }</p>
              <p className="ad-stat-value">
                <NumberFlow value={ totalCount } className="font-medium" />
              </p>
            </CardContent>
          </Card>
          <Card className="ad-summary-card py-3">
            <CardContent className="space-y-1">
              <p className="ad-stat-label">{ t( "stats.unread" ) }</p>
              <p className="ad-stat-value">
                <NumberFlow value={ unreadCount } className="font-medium" />
              </p>
            </CardContent>
          </Card>
          <Card className="ad-summary-card py-3">
            <CardContent className="space-y-1">
              <p className="ad-stat-label">{ t( "stats.today" ) }</p>
              <p className="ad-stat-value">
                <NumberFlow value={ newToday } className="font-medium" />
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="w-full max-w-3xl mx-auto">
          <Tabs
            value={ filter }
            onValueChange={ ( value ) => {
              setFilter( value as "all" | "read" | "unread" );
              setPage( 1 );
            } }
          >
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <TabsList variant="default" className="w-full border md:w-auto">
                <TabsTrigger value="all" className="font-normal gap-1.5">
                  { t( "tabs.all" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ totalCount }</Badge>
                </TabsTrigger>
                <TabsTrigger value="read" className="font-normal gap-1.5">
                  { t( "tabs.read" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ readCount }</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="font-normal gap-1.5">
                  { t( "tabs.unread" ) }
                  <Badge variant="outline" className="h-4 px-1 text-[10px]">{ unreadCount }</Badge>
                </TabsTrigger>
              </TabsList>
              <div className="relative w-full md:max-w-xs">
                <SuperField
                  name="search"
                  type="search"
                  placeholder={ searchPlaceholder }
                  prefix={ <Search className="size-4" /> }
                  className="pl-9"
                  value={ searchTerm }
                  onChange={ ( event ) => {
                    setSearchTerm( event.target.value );
                    setPage( 1 );
                  } }
                />
              </div>
            </div>
          </Tabs>
        </section>

        <section className="w-full max-w-3xl mx-auto">
          { filtered.length === 0 ? (
            searchTerm.trim() ? (
              <Card className="py-0">
                <CardContent className="px-6 py-8 text-center text-sm text-muted-foreground">
                  { searchNoResults }
                </CardContent>
              </Card>
            ) : (
              <NotificationsEmptyState />
            )
          ) : (
            <section className="space-y-3">
              <AnimatePresence initial={ false } mode="popLayout">
                { filtered.map( ( notification, index ) => (
                  <motion.div
                    key={ notification.id }
                    layout
                    initial={ { opacity: 0, y: 10 } }
                    animate={ { opacity: 1, y: 0 } }
                    exit={ { opacity: 0, y: -10 } }
                    transition={ { duration: 0.2, ease: "easeOut", delay: Math.min( index * 0.02, 0.12 ) } }
                  >
                    <NotificationItem
                      notification={ notification }
                      onMarkAsRead={ handleMarkAsRead }
                      onDelete={ handleDelete }
                    />
                  </motion.div>
                ) ) }
              </AnimatePresence>
            </section>
          ) }
        </section>

        <section className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 rounded-xl border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              { startItem }-{ endItem } { paginationOf } { totalCount }
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm text-muted-foreground">{ paginationRowsPerPage }</span>
              <Select
                value={ String( currentPerPage ) }
                onValueChange={ ( value ) => {
                  setPerPage( Number( value ) );
                  setPage( 1 );
                } }
              >
                <SelectTrigger className="h-8 w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  { [ 10, 20, 30, 50 ].map( ( size ) => (
                    <SelectItem key={ size } value={ String( size ) }>
                      { size }
                    </SelectItem>
                  ) ) }
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                { paginationPage } { currentPage } { paginationOf } { totalPages }
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={ currentPage <= 1 }
                  onClick={ () => setPage( ( previous ) => Math.max( previous - 1, 1 ) ) }
                >
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">{ paginationPrevious }</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={ currentPage >= totalPages }
                  onClick={ () => setPage( ( previous ) => Math.min( previous + 1, totalPages ) ) }
                >
                  <ChevronRight className="size-4" />
                  <span className="sr-only">{ paginationNext }</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
