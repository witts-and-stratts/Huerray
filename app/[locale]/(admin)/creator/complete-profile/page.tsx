'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import '@/app/styles/components/complete-profile.css';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@/components/animate-ui/components/base/tabs';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CreatorBioSection } from '@/components/settings/creator-bio-section';
import { CreatorProfileSection } from '@/components/settings/creator-profile-section';
import { CreatorSettings, creatorSettingsSchema } from '@/components/settings/creator-settings-schema';
import { CreatorSocialSection } from '@/components/settings/creator-social-section';
import { apiClient } from '@/lib/api/client';
import { ModelsCreateCreatorRequestGenderEnum, UtilsCountryCode } from '@/lib/api/generated';
import { CreatorApi } from '@/lib/api/generated/api/creator-api';
import { fetchCreatorProfile } from '@/lib/redux/features/creator/creatorSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { useForm } from '@tanstack/react-form';
import { Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CompleteProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';
  const [ activeTab, setActiveTab ] = useState( 'profile' );
  const [ isSaving, setIsSaving ] = useState( false );
  const dispatch = useAppDispatch();

  const form = useForm( {
    defaultValues: {
      // Profile
      bio: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      // Social
      instagramHandle: '',
      tiktokHandle: '',
      youtubeHandle: '',
      twitterHandle: '',
      portfolio: '',
      applicationVideo: '',
      applicationVideoThumbnail: '',
      profileImageUrl: '',
    } as CreatorSettings,
    validators: {
      onChange: creatorSettingsSchema,
    },
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const creatorApi = new CreatorApi( undefined, undefined, apiClient );

        // Parse portfolio
        let portfolioJson = value.portfolio;
        if ( value.portfolio ) {
          try {
            JSON.parse( value.portfolio );
          } catch ( e ) {
            const urls = value.portfolio.split( ',' ).map( s => s.trim() ).filter( Boolean );
            portfolioJson = JSON.stringify( urls );
          }
        }

        const profileRequest = {
          bio: value.bio,
          date_of_birth: value.dateOfBirth,
          gender: value.gender as ModelsCreateCreatorRequestGenderEnum,
          phone_number: value.phoneNumber,
          street: value.street,
          city: value.city,
          state: value.state,
          zipcode: value.zipcode,
          country: value.country as UtilsCountryCode,
          instagram_handle: value.instagramHandle,
          tiktok_handle: value.tiktokHandle,
          youtube_handle: value.youtubeHandle,
          twitter_handle: value.twitterHandle,
          portfolio: portfolioJson,
          application_video: { asset: value.applicationVideo, thumbnail: value.applicationVideoThumbnail || undefined },
          profile_image: value.profileImageUrl ? { asset: value.profileImageUrl } : undefined,
        };

        // Pass as any to bypass strict type check if the field is missing in generated SDK
        await creatorApi.creatorsProfilePost( { request: profileRequest as any } );

        // Fetch and cache the newly created profile in Redux
        await dispatch( fetchCreatorProfile() );

        toast.success( 'Profile created successfully!', { richColors: true } );
        // After success, redirect to dashboard
        router.push( `/${ locale }/creator` );
      } catch ( error: any ) {
        console.error( 'Failed to create profile', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to create profile';
        toast.error( `Failed to create profile: ${ errorMessage }`, { richColors: true } );
      } finally {
        setIsSaving( false );
      }
    },
    onSubmitInvalid: ( { formApi } ) => {
      // Map fields to their respective tabs
      const fieldToTab: Record<string, string> = {
        // Profile tab fields
        dateOfBirth: 'profile',
        gender: 'profile',
        phoneNumber: 'profile',
        street: 'profile',
        city: 'profile',
        state: 'profile',
        zipcode: 'profile',
        country: 'profile',
        profileImageUrl: 'profile',
        // Social tab fields
        instagramHandle: 'social',
        tiktokHandle: 'social',
        youtubeHandle: 'social',
        twitterHandle: 'social',
        portfolio: 'social',
        // Bio tab fields
        bio: 'bio',
        applicationVideo: 'bio',
      };

      const errors = formApi.state.fieldMeta;
      const firstErrorField = Object.keys( errors ).find( ( key ) => {
        const meta = errors[ key as keyof typeof errors ];
        return meta?.errors && meta.errors.length > 0;
      } );

      if ( firstErrorField ) {
        const targetTab = fieldToTab[ firstErrorField ] || 'profile';
        setActiveTab( targetTab );

        // Get the first error message
        const fieldMeta = errors[ firstErrorField as keyof typeof errors ];
        const errorMessages = fieldMeta?.errors || [];
        const firstError = errorMessages[ 0 ];
        const errorMessage = typeof firstError === 'string' ? firstError : ( firstError as any )?.message || 'Please fix the validation errors';

        toast.error( `Validation error: ${ errorMessage }`, { richColors: true } );
      }
    }
  } );

  const tabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'social', label: 'Social Media' },
    { value: 'bio', label: 'Bio & Intro' },
  ];

  const handleTabChange = ( value: string ) => {
    setActiveTab( value );
    window.scrollTo( 0, 0 );
  };

  const nextTab = () => {
    const currentIndex = tabs.findIndex( t => t.value === activeTab );
    if ( currentIndex < tabs.length - 1 ) {
      handleTabChange( tabs[ currentIndex + 1 ].value );
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex( t => t.value === activeTab );
    if ( currentIndex > 0 ) {
      handleTabChange( tabs[ currentIndex - 1 ].value );
    }
  };

  return (
    <div className="complete-profile__layout">
      <div className="complete-profile__image-col">
        <Image src="/images/content/lifestyle-4.webp" alt="Huerray Lifestyle" width={ 1920 } height={ 1080 } className="complete-profile__image" />
      </div>
      <div className="complete-profile__right-col">
        <div className="complete-profile__lang-selector">
          <LanguageSelector showLabel={ false } />
        </div>

        <Card className="complete-profile__outer-card">
          <CardContent className="complete-profile__outer-card-content">
            <CardHeader className="complete-profile__header">
              <div className="flex justify-center py-2 md:py-4 mb-2">
                <Image
                  src="/images/huerray-symbol.svg"
                  alt="Huerray"
                  width={ 60 }
                  height={ 60 }
                  className="complete-profile__logo"
                />
              </div>
              <CardTitle className="complete-profile__title">Complete Your Profile</CardTitle>
              <CardDescription>
                Let&apos;s get you set up to start working with brands.
              </CardDescription>
            </CardHeader>

            <Tabs value={ activeTab } onValueChange={ handleTabChange } className="complete-profile__tabs">
              <Card className="complete-profile__inner-card">
                <CardHeader className="complete-profile__inner-card-header">
                  <div className="flex justify-center w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      { tabs.map( ( tab ) => (
                        <TabsTab key={ tab.value } value={ tab.value } className="max-md:text-xs">{ tab.label }</TabsTab>
                      ) ) }
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent className="complete-profile__inner-card-content">
                  <form onSubmit={ ( e ) => { e.preventDefault(); form.handleSubmit(); } }>
                    <TabsPanel value="profile">
                      <div className="space-y-6">
                        <CreatorProfileSection form={ form } />
                      </div>
                    </TabsPanel>

                    <TabsPanel value="social">
                      <div className="space-y-8">
                        <CreatorSocialSection form={ form } />
                      </div>
                    </TabsPanel>

                    <TabsPanel value="bio">
                      <div className="space-y-8">
                        <CreatorBioSection form={ form } />
                      </div>
                    </TabsPanel>
                  </form>
                </CardContent>
                <CardFooter className="complete-profile__inner-card-footer">
                  <div className="complete-profile__footer-actions">
                    <div>
                      { activeTab !== 'profile' && (
                        <Button type="button" variant="outline" onClick={ prevTab } size="lg">
                          Back
                        </Button>
                      ) }
                    </div>
                    <div>
                      { activeTab !== 'bio' ? (
                        <Button type="button" onClick={ nextTab } size="lg" className="gap-2">
                          Next Step <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <form.Subscribe
                          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                          children={ ( [ , isSubmitting ] ) => (
                            <Button type="submit" size="lg" disabled={ isSubmitting || isSaving } className="gap-2" onClick={ () => form.handleSubmit() }>
                              { isSubmitting || isSaving ? 'Creating Profile...' : 'Complete Profile' }
                              { !isSubmitting && !isSaving && <Check className="w-4 h-4" /> }
                            </Button>
                          ) }
                        />
                      ) }
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
