"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import "@/app/styles/components/data-table.css";
import { Button } from "@/components/dashboard-ui/button";
import { Table } from "@tanstack/react-table";
import { exportNewsletterEntries } from "./newsletter-table-utils";
import { ModelsNewsletterSubscriptionResponse } from "@/lib/api/generated";
import { SuperField } from "@/components/dashboard-ui/super-field";

interface NewsletterTableToolbarProps {
  entries: ModelsNewsletterSubscriptionResponse[];
  selectedEntries: ModelsNewsletterSubscriptionResponse[];
  currentSearch: string;
  onSearchCommit: ( value: string ) => void;
  t: ( key: string ) => string;
  table: Table<ModelsNewsletterSubscriptionResponse>;
}

export const NewsletterTableToolbar = React.memo( function NewsletterTableToolbar( {
  entries,
  selectedEntries,
  currentSearch,
  onSearchCommit,
  table,
  t,
}: NewsletterTableToolbarProps ) {
  const [ localSearch, setLocalSearch ] = React.useState( currentSearch );

  React.useEffect( () => {
    setLocalSearch( currentSearch );
  }, [ currentSearch ] );

  React.useEffect( () => {
    const timeoutId = window.setTimeout( () => {
      React.startTransition( () => {
        onSearchCommit( localSearch.trim() );
      } );
    }, 200 );

    return () => window.clearTimeout( timeoutId );
  }, [ localSearch, onSearchCommit ] );

  return (
    <div className="dt-toolbar">
      <div className="flex flex-1 items-center space-x-2">
        <SuperField
          type="search"
          placeholder={ t( "newsletterPage.filters.searchPlaceholder" ) }
          prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
          fieldClassName="placeholder:text-gray-400 font-regular"
          value={ localSearch }
          onChange={ ( event ) => setLocalSearch( event.target.value ) }
          className="h-8 max-w-sm bg-background"
          autoComplete="off"
        />
      </div>
      <div className="flex items-center gap-2 overflow-x-auto">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={ () => exportNewsletterEntries( entries, "newsletter-bulk.csv" ) }
        >
          <Download className="size-4" strokeWidth={ 1 } />
          { t( "newsletterPage.actions.exportFiltered" ) }
        </Button>
        <Button
          size="sm"
          className="gap-2"
          onClick={ () => exportNewsletterEntries( selectedEntries, "newsletter-selected.csv" ) }
          disabled={ selectedEntries.length === 0 }
        >
          <Download className="size-4" strokeWidth={ 1 } />
          { t( "newsletterPage.actions.exportSelected" ) }
        </Button>
      </div>
    </div>
  );
} );
