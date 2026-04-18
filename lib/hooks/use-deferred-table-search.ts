import * as React from "react";

export function useDeferredTableSearch() {
  const [ searchValue, setSearchValue ] = React.useState( "" );
  const deferredSearchValue = React.useDeferredValue( searchValue.trim() );
  const isSearchPending = searchValue.trim() !== deferredSearchValue;

  return {
    searchValue,
    setSearchValue,
    deferredSearchValue,
    isSearchPending,
  };
}
