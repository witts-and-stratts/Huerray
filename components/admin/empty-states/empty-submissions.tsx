import { EmptyState, EmptyStateProps } from "./empty-state";

type EmptySubmissionProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptySubmission( { imageWidth = 200, imageHeight = 200, title = 'No submissions found.', description = 'No submissions found.', fill = false, children }: EmptySubmissionProps ) {
  return (
    <EmptyState
      imageSrc="/svg/creator-submission.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      children={ children }
    />
  );
}