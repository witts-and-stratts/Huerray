import { EmptyStateProps } from "./empty-state";
import { AdminNetworkErrorState } from "./admin-network-error-state";

type ErrorNewsletterProps = Omit<EmptyStateProps, "imageSrc"> & {
  message?: string;
  onRetry?: () => void;
};

export function ErrorNewsletter( {
  imageWidth,
  imageHeight,
  title,
  description,
  fill,
  children,
  message,
  onRetry,
  className,
}: ErrorNewsletterProps ) {
  return (
    <AdminNetworkErrorState
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title }
      description={ description }
      fill={ fill }
      className={ className }
      message={ message }
      onRetry={ onRetry }
    >
      { children }
    </AdminNetworkErrorState>
  );
}
