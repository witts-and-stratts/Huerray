import { useTranslations } from "next-intl";

import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptyNewsletterProps = Omit<EmptyStateProps, "imageSrc">;

export function EmptyNewsletter( {
  imageWidth = 220,
  imageHeight = 220,
  title,
  description,
  fill = false,
  children,
}: EmptyNewsletterProps ) {
  const t = useTranslations( "dashboard.admin" );

  return (
    <EmptyState
      imageSrc="/svg/content-creator-at-work.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( "newsletterPage.empty" ) }
      description={ description || t( "newsletterPage.emptyDescription" ) }
      fill={ fill }
      children={ children }
    />
  );
}
