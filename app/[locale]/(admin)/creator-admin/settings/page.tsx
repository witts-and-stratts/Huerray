'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { CreatorBioSection } from '@/components/settings/creator-bio-section';
import { CreatorProfileSection } from '@/components/settings/creator-profile-section';
import { CreatorSettings } from '@/components/settings/creator-settings-schema';
import { CreatorSocialSection } from '@/components/settings/creator-social-section';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { apiClient } from '@/lib/api/client';
import { ModelsUpdateCreatorRequest, ModelsUpdateCreatorRequestGenderEnum, UtilsCountryCode } from '@/lib/api/generated';
import { CreatorApi } from '@/lib/api/generated/api/creator-api';
import { useForm } from '@tanstack/react-form';
import { ChevronDown } from 'lucide-react';
import { Activity, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/lib/redux/hooks';
import { fetchCreatorProfile } from '@/lib/redux/features/creator/creatorSlice';

export default function CreatorSettingsPage() {
  const [ activeTab, setActiveTab ] = useState( 'profile' );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ currentProfile, setCurrentProfile ] = useState<any>( null );
  const [ isReviewConfirmOpen, setIsReviewConfirmOpen ] = useState( false );
  const dispatch = useAppDispatch();

  const form = useForm( {
    defaultValues: {
      // Profile
      bio: '',
      preferredCategories: [],
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
      profileImageUrl: '',
    } as CreatorSettings,
    onSubmit: async ( { value } ) => {
      setIsSaving( true );
      try {
        const creatorApi = new CreatorApi( undefined, undefined, apiClient );

        // 1. Update Profile (includes Social)
        // Parse portfolio again
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
          gender: value.gender as ModelsUpdateCreatorRequestGenderEnum,
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
          application_video: value.applicationVideo,
          profile_image_url: value.profileImageUrl,
          // However, safety:
          // However, safety:
          preferred_categories: value.preferredCategories || [],
        };

        if ( currentProfile ) {
          await creatorApi.creatorsProfilePut( { request: profileRequest as any } );
        } else {
          // If no profile, use POST to create
          // Note: profileRequest type (ModelsUpdateCreatorRequest) should be compatible with Post request or mapped.
          // Let's assume schema matches for now or cast if necessary, usually generated clients share models or have similar ones.
          // Checking typical generated API pattern: creatorsProfilePost probably takes ModelsCreateCreatorRequest or similar.
          // Safe bet: The structure is likely identical for this resource.
          await creatorApi.creatorsProfilePost( { request: profileRequest as any } );
        }

        // Refetch and update the cached creator profile in Redux
        dispatch( fetchCreatorProfile() );

        toast.success( 'Settings updated successfully', {
          richColors: true,
        } );
      } catch ( error: any ) {
        console.error( 'Failed to update settings', error );
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to update settings';
        toast.error( `Failed to update settings: ${ errorMessage }` );
      } finally {
        setIsSaving( false );
      }
    }
  } );

  useEffect( () => {
    // Hash handling
    const handleHashChange = () => {
      if ( typeof window !== 'undefined' ) {
        const hash = window.location.hash.replace( '#', '' );
        if ( [ 'profile', 'bio', 'social-media' ].includes( hash ) ) {
          setActiveTab( hash );
        } else if ( !hash ) {
          setActiveTab( 'profile' ); // Default
        }
      }
    };
    handleHashChange();
    window.addEventListener( 'hashchange', handleHashChange );
    return () => window.removeEventListener( 'hashchange', handleHashChange );
  }, [] );

  // Fetch Data
  useEffect( () => {
    const fetchData = async () => {
      try {
        const creatorApi = new CreatorApi( undefined, undefined, apiClient );
        const profileRes = await creatorApi.creatorsProfileGet();

        // Handle Profile
        if ( profileRes.data ) {
          // Check if response is wrapped in 'data' even if not typed that way
          const rawProfile = profileRes.data as any;
          const p = rawProfile.data || rawProfile;

          setCurrentProfile( p );

          console.log( "Current Profile", p );

          // Set form values for profile
          form.setFieldValue( 'bio', p.bio || '' );
          form.setFieldValue( 'preferredCategories', p.preferred_categories || [] );
          form.setFieldValue( 'dateOfBirth', p.date_of_birth || '' );
          form.setFieldValue( 'gender', p.gender || '' );
          form.setFieldValue( 'phoneNumber', p.phone_number || '' );
          form.setFieldValue( 'street', p.street || '' );
          form.setFieldValue( 'city', p.city || '' );
          form.setFieldValue( 'state', p.state || '' );
          form.setFieldValue( 'zipcode', p.zipcode || '' );
          form.setFieldValue( 'country', p.country || '' );
          form.setFieldValue( 'instagramHandle', p.instagram_handle || '' );
          form.setFieldValue( 'tiktokHandle', p.tiktok_handle || '' );
          form.setFieldValue( 'youtubeHandle', p.youtube_handle || '' );
          form.setFieldValue( 'twitterHandle', p.twitter_handle || '' );

          let portfolioDisplay = '';
          if ( p.portfolio ) {
            try {
              const parsed = JSON.parse( p.portfolio );
              if ( Array.isArray( parsed ) ) {
                portfolioDisplay = parsed.join( ', ' );
              } else {
                portfolioDisplay = p.portfolio;
              }
            } catch ( e ) {
              portfolioDisplay = p.portfolio;
            }
          }
          form.setFieldValue( 'portfolio', portfolioDisplay );
          form.setFieldValue( 'applicationVideo', ( p as any ).application_video || '' );
          form.setFieldValue( 'profileImageUrl', ( p as any ).profile_image_url || '' );
        }

      } catch ( e: any ) {
        // If 404, it means the profile doesn't exist yet (new user)
        if ( e?.response?.status === 404 ) {
          return;
        }
        console.error( 'Error fetching settings', e );
        toast.error( 'Failed to load some settings' );
      } finally {
        setIsLoading( false );
      }
    };
    fetchData();
  }, [] );

  const handleTabChange = ( value: string ) => {
    // If value is a link (for Bank Details page), navigate
    if ( value.startsWith( '/' ) ) {
      window.location.href = value;
      return;
    }
    setActiveTab( value );
    window.location.hash = value;
  };

  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();

    const status = currentProfile?.creator_status?.toLowerCase();
    if ( status === 'approved' ) {
      setIsReviewConfirmOpen( true );
      return;
    }

    form.handleSubmit();
  }, [ currentProfile, form ] );

  const handleConfirmSave = useCallback( () => {
    setIsReviewConfirmOpen( false );
    form.handleSubmit();
  }, [ form ] );

  const tabItems = [
    { value: 'profile', label: 'Profile' },
    { value: 'bio', label: 'Bio' },
    { value: 'social-media', label: 'Social Media' },
    { value: '/creator-admin/settings/bank', label: 'Bank Details' },
  ];

  const pageDetails: Record<string, { title: string; description: string; }> = {
    profile: {
      title: 'Profile Settings',
      description: 'Manage your personal information and profile details.',
    },
    bio: {
      title: 'Biography',
      description: 'Tell us about yourself.',
    },
    'social-media': {
      title: 'Social Media Settings',
      description: 'Connect and manage your social media accounts.',
    },
  };

  // Safe fallback if activeTab is not in pageDetails (e.g. if we somehow landed here with #bank-details)
  const currentDetails = pageDetails[ activeTab ] || pageDetails.profile;
  const activeLabel = tabItems.find( t => t.value === activeTab )?.label || 'Profile';

  const breadcrumbs = [
    { label: 'Dashboard', href: '/creator-admin' },
    { label: 'Settings', href: '/creator-admin/settings' },
    { label: activeLabel },
  ];

  const handleDiscard = useCallback( () => {
    if ( !currentProfile ) return;

    const p = currentProfile;
    form.setFieldValue( 'bio', p.bio || '' );
    form.setFieldValue( 'preferredCategories', p.preferred_categories || [] );
    form.setFieldValue( 'dateOfBirth', ( p as any ).date_of_birth || '' );
    form.setFieldValue( 'gender', p.gender || '' );
    form.setFieldValue( 'phoneNumber', p.phone_number || '' );
    form.setFieldValue( 'street', p.street || '' );
    form.setFieldValue( 'city', p.city || '' );
    form.setFieldValue( 'state', p.state || '' );
    form.setFieldValue( 'zipcode', p.zipcode || '' );
    form.setFieldValue( 'country', p.country || '' );
    form.setFieldValue( 'instagramHandle', p.instagram_handle || '' );
    form.setFieldValue( 'tiktokHandle', p.tiktok_handle || '' );
    form.setFieldValue( 'youtubeHandle', p.youtube_handle || '' );
    form.setFieldValue( 'twitterHandle', p.twitter_handle || '' );

    let portfolioDisplay = '';
    if ( p.portfolio ) {
      try {
        const parsed = JSON.parse( p.portfolio );
        if ( Array.isArray( parsed ) ) {
          portfolioDisplay = parsed.join( ', ' );
        } else {
          portfolioDisplay = p.portfolio;
        }
      } catch ( e ) {
        portfolioDisplay = p.portfolio;
      }
    }
    form.setFieldValue( 'portfolio', portfolioDisplay );
    form.setFieldValue( 'applicationVideo', ( p as any ).application_video || '' );
    form.setFieldValue( 'profileImageUrl', ( p as any ).profile_image_url || '' );

    toast.info( 'Changes discarded' );
  }, [ currentProfile, form ] );

  if ( isLoading ) {
    return (
      <>
        <SubHeader
          breadcrumbs={ breadcrumbs }
          title={ currentDetails.title }
          description={ currentDetails.description }
          tabs={
            <SubHeaderTabs
              value={ activeTab }
              onChange={ handleTabChange }
              tabItems={ tabItems }
            />
          }
        />
        <div className="h-full flex items-center justify-center -mt-5 bg-slate-50/50 p-6">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={ handleFormSubmit } className="contents">
      <SubHeader
        breadcrumbs={ breadcrumbs }
        title={ currentDetails.title }
        description={ currentDetails.description }
        tabs={
          <SubHeaderTabs
            value={ activeTab }
            onChange={ handleTabChange }
            tabItems={ tabItems }
          />
        }
      >
        <form.Subscribe
          selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
          children={ ( [ canSubmit, isSubmitting ] ) => (
            <ButtonGroup>
              <Button type='submit' disabled={ isSubmitting || isSaving }>
                { isSubmitting || isSaving ? 'Saving...' : 'Save Changes' }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" className="px-2" disabled={ isSubmitting || isSaving }>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={ 'min-w-40' }>
                  <DropdownMenuItem onClick={ handleDiscard }>
                    Discard Changes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          ) }
        />
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/50 h-full -mt-5'>
        <Activity mode={ activeTab === 'profile' ? 'visible' : 'hidden' }>
          <CreatorProfileSection form={ form } />
        </Activity>
        <Activity mode={ activeTab === 'bio' ? 'visible' : 'hidden' }>
          <CreatorBioSection form={ form } />
        </Activity>
        <Activity mode={ activeTab === 'social-media' ? 'visible' : 'hidden' }>
          <CreatorSocialSection form={ form } />
        </Activity>
      </div>

      <ConfirmDialog
        open={ isReviewConfirmOpen }
        onOpenChange={ setIsReviewConfirmOpen }
        title="Confirm profile update"
        description="Saving your profile will require review and approval before you can perform certain tasks."
        confirmLabel="Continue and save"
        onConfirm={ handleConfirmSave }
        isLoading={ isSaving }
        loadingText="Saving..."
      />
    </form>
  );
}
