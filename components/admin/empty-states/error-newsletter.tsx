import { useTranslations } from "next-intl";

import { Button } from "@/components/dashboard-ui/button";
import { EmptyState, EmptyStateProps } from "./empty-state";

type ErrorNewsletterProps = Omit<EmptyStateProps, "imageSrc"> & {
  message?: string;
  onRetry?: () => void;
};

export function ErrorNewsletter( {
  imageWidth = 240,
  imageHeight = 240,
  title,
  description,
  fill = false,
  children,
  message,
  onRetry,
  className
}: ErrorNewsletterProps ) {
  const t = useTranslations( "dashboard.admin" );

  return (
    <EmptyState
      imageSrc="/svg/mailbox-guy.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( "newsletterPage.error.title" ) }
      description={ description || message || t( "newsletterPage.error.description" ) }
      fill={ fill }
      className={ className }
    >
      { children }
      <Button variant="outline" onClick={ onRetry || ( () => window.location.reload() ) }>
        { t( "newsletterPage.error.retry" ) }
      </Button>
    </EmptyState>
  );
}
