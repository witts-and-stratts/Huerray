import { EmptyState, EmptyStateProps } from "./empty-state";
import { useTranslations } from "next-intl";

type EmptyInvitationProps = Omit<EmptyStateProps, 'imageSrc'>;

export function EmptyInvitations( { imageWidth = 200, imageHeight = 200, title, description, fill = false, children }: EmptyInvitationProps ) {
  const t = useTranslations( 'dashboard.common' );
  return (
    <EmptyState
      imageSrc="/svg/creator-invitation.svg"
      imageWidth={ imageWidth }
      imageHeight={ imageHeight }
      title={ title || t( 'emptyStates.invitations.title' ) }
      description={ description || t( 'emptyStates.invitations.description' ) }
      fill={ fill }
      children={ children }
    />
  );
}