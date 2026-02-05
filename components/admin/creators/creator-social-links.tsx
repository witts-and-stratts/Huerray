import { Separator } from "@/components/dashboard-ui/separator";
import Link from "next/link";

interface CreatorSocialLinksProps {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export function CreatorSocialLinks( { instagram, tiktok, youtube }: CreatorSocialLinksProps ) {
  const stripHandle = ( handle: string ) => handle.replace( /^@/, '' );

  const links = [
    instagram && {
      href: `https://instagram.com/${ stripHandle( instagram ) }`,
      icon: "/svg/instagram.svg",
      alt: instagram
    },
    tiktok && {
      href: `https://tiktok.com/${ stripHandle( tiktok ) }`,
      icon: "/svg/tiktok.svg",
      alt: tiktok
    },
    youtube && {
      href: `https://youtube.com/${ stripHandle( youtube ) }`,
      icon: "/svg/youtube.svg",
      alt: youtube
    }
  ].filter( ( link ): link is { href: string; icon: string; alt: string; } => Boolean( link ) );

  if ( links.length === 0 ) return null;

  return (
    <div className="flex items-center gap-2 pt-1">
      { links.map( ( social, index ) => (
        <div key={ social.href } className="flex items-center gap-2">
          <Link href={ social.href } target="_blank">
            <img src={ social.icon } alt={ social.alt } className="h-4 w-auto" />
          </Link>
          { index < links.length - 1 && <Separator orientation="vertical" className="h-4" /> }
        </div>
      ) ) }
    </div>
  );
}
