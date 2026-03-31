'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dashboard-ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/dashboard-ui/sheet';
import { CreatorBioSection } from '@/components/settings/creator-bio-section';
import { CreatorProfileSection } from '@/components/settings/creator-profile-section';
import { CreatorSettings } from '@/components/settings/creator-settings-schema';
import { CreatorSocialSection } from '@/components/settings/creator-social-section';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { useComments } from '@/lib/api/hooks/comments';
import { apiClient } from '@/lib/api/client';
import { ModelsUpdateCreatorRequestGenderEnum, UtilsCountryCode, UtilsEntityType } from '@/lib/api/generated';
import { CreatorApi } from '@/lib/api/generated/api/creator-api';
import { useForm } from '@tanstack/react-form';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/dashboard-utils';
import { Activity, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/lib/redux/hooks';
import { fetchCreatorProfile } from '@/lib/redux/features/creator/creatorSlice';
import { CreatorSettingsSkeleton } from '@/components/settings/creator-settings-skeleton';
import { useTranslations } from 'next-intl';

export default function CreatorSettingsPage() {
  const t = useTranslations( 'dashboard.creator.settingsPage' );
  const tTabs = useTranslations( 'dashboard.creator.settingsTabs' );
  const [ activeTab, setActiveTab ] = useState( 'profile' );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ isSaving, setIsSaving ] = useState( false );
  const [ currentProfile, setCurrentProfile ] = useState<any>( null );
  const [ isReviewConfirmOpen, setIsReviewConfirmOpen ] = useState( false );
  const [ isCommentsSheetOpen, setIsCommentsSheetOpen ] = useState( false );
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
      applicationVideoThumbnail: '',
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
          ...( value.gender ? { gender: value.gender as ModelsUpdateCreatorRequestGenderEnum } : {} ),
          phone_number: value.phoneNumber,
          street: value.street,
          city: value.city,
          state: value.state,
          zipcode: value.zipcode,
          ...( value.country ? { country: value.country as UtilsCountryCode } : {} ),
          instagram_handle: value.instagramHandle,
          tiktok_handle: value.tiktokHandle,
          youtube_handle: value.youtubeHandle,
          twitter_handle: value.twitterHandle,
          portfolio: portfolioJson,
          ...( value.applicationVideo ? { application_video: { asset: value.applicationVideo, thumbnail: value.applicationVideoThumbnail || undefined } } : {} ),
          profile_image: value.profileImageUrl ? { asset: value.profileImageUrl } : undefined,
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

        toast.success( t( 'successUpdated' ), {
          richColors: true,
        } );
      } catch ( error: any ) {
        console.error( t( 'errorUpdateFailed' ), error );
        console.error( t( 'errorResponseData' ), JSON.stringify( error.response?.data ) );
        const rawError = error.response?.data?.error;
        const errorMessage = ( typeof rawError === 'string' ? rawError : rawError?.message ) || error.response?.data?.message || error.message || t( 'errorUpdateFailed' );
        toast.error( t( 'errorUpdateFailed' ), {
          description: errorMessage,
          richColors: true,
        } );
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
          form.setFieldValue( 'applicationVideo', ( p as any ).application_video?.asset || '' );
          form.setFieldValue( 'applicationVideoThumbnail', ( p as any ).application_video?.thumbnail || '' );
          form.setFieldValue( 'profileImageUrl', ( p as any ).profile_image?.asset || '' );
        }

      } catch ( e: any ) {
        // If 404, it means the profile doesn't exist yet (new user)
        if ( e?.response?.status === 404 ) {
          return;
        }
        console.error( t( 'errorFetchFailed' ), e );
        toast.error( t( 'errorLoadFailed' ) );
      } finally {
        setIsLoading( false );
      }
    };
    fetchData();
  }, [] );

  const handleTabChange = ( value: string ) => {
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
    { value: 'profile', label: tTabs( 'profile' ) },
    { value: 'bio', label: tTabs( 'bio' ) },
    { value: 'social-media', label: tTabs( 'socialMedia' ) },
    { value: '/creator/settings/bank', label: tTabs( 'bankDetails' ) },
  ];

  const pageDetails: Record<string, { title: string; description: string; }> = {
    profile: {
      title: t( 'profileTitle' ),
      description: t( 'profileDescription' ),
    },
    bio: {
      title: t( 'bioTitle' ),
      description: t( 'bioDescription' ),
    },
    'social-media': {
      title: t( 'socialMediaTitle' ),
      description: t( 'socialMediaDescription' ),
    },
  };

  // Safe fallback if activeTab is not in pageDetails (e.g. if we somehow landed here with #bank-details)
  const currentDetails = pageDetails[ activeTab ] || pageDetails.profile;
  const tNav = useTranslations( 'dashboard.creator.breadcrumbs' );
  const activeLabel = tabItems.find( t => t.value === activeTab )?.label || tTabs( 'profile' );
  const normalizedStatus = currentProfile?.creator_status?.toLowerCase();
  const showReturnedComments = normalizedStatus === 'returned';
  const creatorProfileId = currentProfile?.id || '';
  const creatorComments = useComments( UtilsEntityType.EntityTypeCreator, creatorProfileId );
  const returnedCommentCount = creatorComments.data?.data?.length ?? 0;

  const breadcrumbs = [
    { label: tNav( 'dashboard' ), href: '/creator' },
    { label: tNav( 'settings' ), href: '/creator/settings' },
    { label: activeTab === 'profile' ? tNav( 'profile' ) : activeTab === 'bio' ? tNav( 'bio' ) : tNav( 'socialMedia' ) },
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
    form.setFieldValue( 'applicationVideo', ( p as any ).application_video?.asset || '' );
    form.setFieldValue( 'applicationVideoThumbnail', ( p as any ).application_video?.thumbnail || '' );
    form.setFieldValue( 'profileImageUrl', ( p as any ).profile_image?.asset || '' );

    toast.info( 'Changes discarded' );
  }, [ currentProfile, form ] );

  if ( isLoading ) {
    return (
      <CreatorSettingsSkeleton
        activeTab={ activeTab }
        tabItems={ tabItems }
        handleTabChange={ handleTabChange }
        currentDetails={ currentDetails }
      />
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
          children={ ( [ , isSubmitting ] ) => (
            <div className="flex items-center gap-2">
              { showReturnedComments && (
                <button
                  type="button"
                  onClick={ () => setIsCommentsSheetOpen( true ) }
                  aria-label={ t( 'returnedComments.openAriaLabel' ) }
                  className={ cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full shrink-0 transition-colors cursor-pointer hover:bg-primary/20",
                    returnedCommentCount > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                    isCommentsSheetOpen && "bg-primary text-primary-foreground hover:bg-primary/90"
                  ) }
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ returnedCommentCount > 0 ? returnedCommentCount : t( 'returnedComments.fallbackLabel' ) }</span>
                </button>
              ) }

              <ButtonGroup>
                <Button type='submit' disabled={ isSubmitting || isSaving }>
                  { isSubmitting || isSaving ? t( 'saving' ) : t( 'saveChanges' ) }
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="px-2" disabled={ isSubmitting || isSaving }>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={ 'min-w-40' }>
                    <DropdownMenuItem onClick={ handleDiscard }>
                      { t( 'discardChanges' ) }
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </div>
          ) }
        />
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/50 h-full'>
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
        title={ t( 'confirmTitle' ) }
        description={ t( 'confirmDescription' ) }
        confirmLabel={ t( 'continueAndSave' ) }
        onConfirm={ handleConfirmSave }
        isLoading={ isSaving }
        loadingText={ t( 'saving' ) }
      />

      <Sheet open={ isCommentsSheetOpen } onOpenChange={ setIsCommentsSheetOpen }>
        <SheetContent className="w-[92%]! max-w-[420px]! p-0 pb-4 flex-1 h-full" side="right">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className={ 'dialog__title text-primary' }>{ t( 'returnedComments.title' ) }</SheetTitle>
            <SheetDescription className={ 'dialog__description' }>{ t( 'returnedComments.description' ) }</SheetDescription>
          </SheetHeader>

          <div className="px-6 h-full">
            { showReturnedComments && creatorProfileId && (
              <div className="flex-1 h-full">
                <CommentsThread
                  entities={ [ {
                    entityType: UtilsEntityType.EntityTypeCreator,
                    entityId: creatorProfileId,
                  } ] }
                  disableComment
                  className='flex-1'

                />
              </div>
            ) }
          </div>
        </SheetContent>
      </Sheet>
    </form>
  );
}
