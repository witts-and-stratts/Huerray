import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptyInvoicesProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyInvoices( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyInvoicesProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/content-creator-invoice.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.invoices.title' ) }
      description={ description || t( 'emptyStates.invoices.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}