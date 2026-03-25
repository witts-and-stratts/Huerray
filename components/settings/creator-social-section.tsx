'use client';

import { SuperField } from '@/components/dashboard-ui/super-field';
import { creatorSettingsSchema, CreatorSettings, ReactFormApi } from './creator-settings-schema';
import { Card, CardContent } from '@/components/dashboard-ui/card';
import { useTranslations } from 'next-intl';

// Social media brand icons as SVG components
const InstagramIcon = ( { className }: { className?: string; } ) => (
  <img src="/svg/instagram.svg" className={ className } />
);

const TikTokIcon = ( { className }: { className?: string; } ) => (
  <img src="/svg/tiktok.svg" className={ className } />
);

const YouTubeIcon = ( { className }: { className?: string; } ) => (
  <img src="/svg/youtube.svg" className={ className } />
);

const XIcon = ( { className }: { className?: string; } ) => (
  <img src="/svg/x.svg" className={ className } />
);

const LinkIcon = ( { className }: { className?: string; } ) => (
  <img src="/svg/link.svg" className={ className } />
);

interface SocialCardProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SocialCard = ( { icon, children }: SocialCardProps ) => (
  <Card className='py-4 h-fit'>
    <CardContent className="flex items-start gap-4">
      <div className={ `shrink-0 rounded-lg flex items-center justify-center` }>
        <div className={ `size-10` }>
          { icon }
        </div>
      </div>
      <div className="flex-1 min-w-0">
        { children }
      </div>
    </CardContent>
  </Card>
);

export function CreatorSocialSection( { form }: { form: ReactFormApi<CreatorSettings>; } ) {
  const t = useTranslations( 'dashboard.creator.settings.social' );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl md:m-px max-md:m-2">
      {/* Instagram */ }
      <SocialCard
        icon={ <InstagramIcon className="w-full h-full" /> }
      >
        <form.Field
          name="instagramHandle"
          validators={ {
            onBlur: creatorSettingsSchema.shape.instagramHandle,
          } }
          children={ ( field: any ) => (
            <SuperField
              label={ t( 'instagram' ) }
              type="text"
              value={ field.state.value }
              onChange={ ( e: any ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              placeholder={ t( 'handlePlaceholder' ) }
              error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
            />
          ) }
        />
      </SocialCard>

      {/* TikTok */ }
      <SocialCard
        icon={ <TikTokIcon className="w-full h-full" /> }
      >
        <form.Field
          name="tiktokHandle"
          validators={ {
            onBlur: creatorSettingsSchema.shape.tiktokHandle,
          } }
          children={ ( field: any ) => (
            <SuperField
              label={ t( 'tiktok' ) }
              type="text"
              value={ field.state.value }
              onChange={ ( e: any ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              placeholder={ t( 'handlePlaceholder' ) }
              error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
            />
          ) }
        />
      </SocialCard>

      {/* YouTube */ }
      <SocialCard
        icon={ <YouTubeIcon className="w-full h-full" /> }
      >
        <form.Field
          name="youtubeHandle"
          validators={ {
            onBlur: creatorSettingsSchema.shape.youtubeHandle,
          } }
          children={ ( field: any ) => (
            <SuperField
              label={ t( 'youtube' ) }
              type="text"
              value={ field.state.value }
              onChange={ ( e: any ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              placeholder={ t( 'channelPlaceholder' ) }
              error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
            />
          ) }
        />
      </SocialCard>

      {/* Twitter/X */ }
      <SocialCard
        icon={ <XIcon className="w-full h-full" /> }
      >
        <form.Field
          name="twitterHandle"
          validators={ {
            onBlur: creatorSettingsSchema.shape.twitterHandle,
          } }
          children={ ( field: any ) => (
            <SuperField
              label={ t( 'twitter' ) }
              type="text"
              value={ field.state.value }
              onChange={ ( e: any ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              placeholder={ t( 'handlePlaceholder' ) }
              error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
            />
          ) }
        />
      </SocialCard>

      {/* Portfolio - Full Width */ }
      <div className="md:col-span-2">
        <SocialCard
          icon={ <LinkIcon className="w-full h-full" /> }
        >
          <form.Field
            name="portfolio"
            validators={ {
              onBlur: creatorSettingsSchema.shape.portfolio,
            } }
            children={ ( field: any ) => (
              <SuperField
                label={ t( 'portfolioUrls' ) }
                type="textarea"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                placeholder={ t( 'portfolioPlaceholder' ) }
                description={ t( 'portfolioDescription' ) }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />
        </SocialCard>
      </div>
    </div>
  );
}
