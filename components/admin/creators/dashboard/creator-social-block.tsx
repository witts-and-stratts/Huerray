import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ExternalLink } from 'lucide-react';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';

interface CreatorSocialBlockProps {
  creator: ModelsCreatorResponse;
}

const stripHandle = ( handle: string ) => handle.replace( /^@/, '' );

function SocialRow( { label, handle, href, icon }: { label: string; handle: string; href: string; icon: string; } ) {
  return (
    <a
      key={ label }
      href={ href }
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-border/60 bg-white pl-1.5 pr-3 py-1 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary group"
    >
      <div className="flex size-7 shrink-0 items-center justify-center bg-muted/20 group-hover:bg-primary/10 transition-colors">
        <img src={ icon } alt={ label } className="size-8 opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex flex-col pl-2 min-w-0">
        <span className="truncate font-regular leading-none">@{ stripHandle( handle ) }</span>
      </div>
    </a>
  );
}

export function CreatorSocialBlock( { creator }: CreatorSocialBlockProps ) {

  const socials = [
    {
      label: 'Instagram',
      handle: creator.instagram_handle,
      href: creator.instagram_handle ? `https://instagram.com/${ stripHandle( creator.instagram_handle ) }` : null,
      icon: "/svg/instagram.svg",
    },
    {
      label: 'TikTok',
      handle: creator.tiktok_handle,
      href: creator.tiktok_handle ? `https://tiktok.com/@${ stripHandle( creator.tiktok_handle ) }` : null,
      icon: "/svg/tiktok.svg",
    },
    {
      label: 'YouTube',
      handle: creator.youtube_handle,
      href: creator.youtube_handle ? ( creator.youtube_handle.startsWith( 'http' ) ? creator.youtube_handle : `https://youtube.com/@${ stripHandle( creator.youtube_handle ) }` ) : null,
      icon: "/svg/youtube.svg",
    },
    {
      label: 'Twitter',
      handle: creator.twitter_handle,
      href: creator.twitter_handle ? `https://twitter.com/${ stripHandle( creator.twitter_handle ) }` : null,
      icon: "/svg/x.svg",
    },
  ].filter( ( s ): s is { label: string; handle: string; href: string; icon: string; } => Boolean( s.handle ) );

  return (
    <Card className='pt-4'>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connected accounts</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        { socials.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            { socials.map( ( social ) => (
              <SocialRow key={ social.label } { ...social } />
            ) ) }
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 py-4 text-muted-foreground">
            <p className="text-xs italic">No social accounts connected</p>
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
