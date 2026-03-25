import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptySubmissionProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptySubmission( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptySubmissionProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/creator-submission.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.submissions.title' ) }
      description={ description || t( 'emptyStates.submissions.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}