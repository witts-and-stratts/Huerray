"use client";

import { usePersistor } from "@/lib/redux/store-provider";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useCallback } from "react";

const AUTH_COOKIES = [ "userData", "authToken", "refreshToken" ];

export function useClearPersistedData() {
  const persistor = usePersistor();
  const queryClient = useQueryClient();

  return useCallback( async () => {
    await persistor?.purge();
    queryClient.clear();
    AUTH_COOKIES.forEach( ( name ) => Cookies.remove( name, { path: "/" } ) );
  }, [ persistor, queryClient ] );
}
