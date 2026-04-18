"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { Button } from "@/components/dashboard-ui/button";
import { EmptyState, EmptyStateProps } from "./empty-state";

type AdminNetworkErrorStateProps = Omit<EmptyStateProps, "imageSrc"> & {
  message?: string;
  onRetry?: () => void | Promise<unknown>;
  imageSrc?: string;
};

export function AdminNetworkErrorState( {
  imageWidth = 240,
  imageHeight = 240,
  title,
  description,
  fill = false,
  children,
  message,
  imageSrc = "/svg/mailbox-guy.svg",
  onRetry,
  className,
}: AdminNetworkErrorStateProps ) {
  const t = useTranslations( "dashboard.admin" );
  const queryClient = useQueryClient();
  const handleRetry = onRetry ?? ( () => queryClient.refetchQueries( { type: "active" } ) );

  return (
    <EmptyState
      imageSrc={ imageSrc }
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( "general.error.network.title" ) }
      description={ description || message || t( "general.error.network.description" ) }
      fill={ fill }
      className={ className }
    >
      { children }
      <Button variant="outline" onClick={ () => { void handleRetry(); } }>
        { t( "general.error.network.retry" ) }
      </Button>
    </EmptyState>
  );
}
