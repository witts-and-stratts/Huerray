"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertTriangle, ArrowDown, Check, Edit3, Equal, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/dashboard-ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard-ui/sheet";
import { SuperField } from "@/components/dashboard-ui/super-field";
import type { SelectOption } from "@/components/dashboard-ui/superfield/types";
import type { EntityMeta } from "@/components/dashboard-ui/superfield/entity-select";
import { useCreateNotification } from "@/lib/api/hooks/notifications";
import { useBrands } from "@/lib/api/hooks/brands";
import { useCampaigns } from "@/lib/api/hooks/campaigns";
import { useCases } from "@/lib/api/hooks/cases";
import { useCreators } from "@/lib/api/hooks/creators";
import { useGigs } from "@/lib/api/hooks/gigs";
import { useInvoices } from "@/lib/api/hooks/invoices";
import { useUsers } from "@/lib/api/hooks/users";
import { useVideoSubmissionsSearch } from "@/lib/api/hooks/video-submissions";
import {
  UtilsEventType,
  UtilsNotificationEntityType,
  UtilsPriority,
  type ModelsCreateNotificationRequest,
} from "@/lib/api/generated/models";
import { imgpresets } from "@/lib/utils/imgproxy";
import { useTranslations } from "next-intl";
import { Separator } from "../dashboard-ui/separator";

interface CreateNotificationSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

function isSelectObject( option: SelectOption | undefined ): option is Extract<SelectOption, { value: string; }> {
  return typeof option === "object" && option !== null && "value" in option;
}

function getInitials( value?: string ) {
  if ( !value ) return "?";
  return value
    .split( " " )
    .map( ( word ) => word[ 0 ] )
    .join( "" )
    .toUpperCase()
    .slice( 0, 2 );
}

function formatUserTypeLabel( userType?: string ) {
  if ( !userType ) return undefined;
  const normalized = userType === "admin_user"
    ? "admin"
    : userType === "brand_user"
      ? "brand"
      : userType.replace( /_/g, " " );

  return normalized.charAt( 0 ).toUpperCase() + normalized.slice( 1 );
}

function buildNotificationActionUrl( entityType: string, entityId: string ): string {
  if ( !entityType || !entityId ) return "";

  switch ( entityType ) {
    case UtilsNotificationEntityType.EntityCreator:
      return `/creators/${ entityId }`;
    case UtilsNotificationEntityType.EntityBrand:
      return `/brands/${ entityId }`;
    case UtilsNotificationEntityType.EntityCampaign:
      return `/campaigns/${ entityId }`;
    case UtilsNotificationEntityType.EntityGig:
      return `/gigs/${ entityId }`;
    case UtilsNotificationEntityType.EntityVideoSubmission:
      return `/videos/${ entityId }`;
    case UtilsNotificationEntityType.EntityInvoice:
      return `/invoices/${ entityId }`;
    default:
      return "";
  }
}

type CreateNotificationFormValues = {
  user_id: string;
  title: string;
  message: string;
  event_name: string;
  event_type: UtilsEventType;
  entity_id: string;
  entity_type: string;
  priority?: UtilsPriority;
  action_url?: string;
  metadata?: string;
};

type EntityTypeValue = CreateNotificationFormValues[ "entity_type" ];

export function CreateNotificationSheet( { open, onOpenChange }: CreateNotificationSheetProps ) {
  const t = useTranslations( "dashboard.notifications.compose" );
  const tNotifications = useTranslations( "dashboard.notifications" );
  const tc = useTranslations( "dashboard.common" );
  const createNotification = useCreateNotification();
  const [ isEditingActionUrl, setIsEditingActionUrl ] = useState( false );

  const createNotificationSchema = useMemo( () => z.object( {
    user_id: z.string().min( 1, t( "validation.recipientRequired" ) ),
    title: z.string().min( 1, t( "validation.titleRequired" ) ),
    message: z.string().min( 1, t( "validation.messageRequired" ) ),
    event_name: z.string().min( 1, t( "validation.eventNameRequired" ) ),
    event_type: z.nativeEnum( UtilsEventType ),
    entity_id: z.string(),
    entity_type: z.string().min( 1, t( "validation.entityTypeRequired" ) ).refine(
      ( value ): value is UtilsNotificationEntityType => Object.values( UtilsNotificationEntityType ).includes( value as UtilsNotificationEntityType ),
      t( "validation.entityTypeRequired" )
    ),
    priority: z.nativeEnum( UtilsPriority ).optional(),
    action_url: z.string().trim().optional().or( z.literal( "" ) ),
    metadata: z.string().trim().optional().or( z.literal( "" ) ),
  } ).superRefine( ( data, ctx ) => {
    if ( !data.entity_id.trim() ) {
      const entityLabel = data.entity_type === UtilsNotificationEntityType.EntityVideoSubmission
        ? t( "entityLabels.videoSubmission" )
        : data.entity_type || t( "entityLabels.entity" );

      ctx.addIssue( {
        code: z.ZodIssueCode.custom,
        path: [ "entity_id" ],
        message: t( "validation.entityRequired", { entity: entityLabel } ),
      } );
    }

    if ( data.metadata ) {
      try {
        JSON.parse( data.metadata );
      } catch {
        ctx.addIssue( {
          code: z.ZodIssueCode.custom,
          path: [ "metadata" ],
          message: t( "validation.metadataJson" ),
        } );
      }
    }
  } ), [ t ] );

  const defaultValues = useMemo<CreateNotificationFormValues>( () => ( {
    user_id: "",
    title: "",
    message: "",
    event_name: "",
    event_type: UtilsEventType.EventTypeGeneric,
    entity_id: "",
    entity_type: "",
    priority: UtilsPriority.PriorityNormal,
    action_url: "",
    metadata: "",
  } ), [] );

  const priorityOptions = useMemo( () => Object.values( UtilsPriority ).map( ( value ) => ( {
    label: t( `priority.${ value }.label` ),
    value,
    icon: value === UtilsPriority.PriorityLow
      ? <ArrowDown className="size-4" />
      : value === UtilsPriority.PriorityHigh || value === UtilsPriority.PriorityUrgent
        ? <AlertTriangle className="size-4" />
        : <Equal className="size-4" />,
    description: t( `priority.${ value }.description` ),
  } ) ), [ t ] );

  const entityTypeOptions = useMemo( () => Object.values( UtilsNotificationEntityType ).map( ( value ) => {
    const labelKey =
      value === UtilsNotificationEntityType.EntityVideoSubmission
        ? "videoSubmission"
        : value.toLowerCase();

    return {
      label: t( `entityLabels.${ labelKey }` ),
      value,
    };
  } ), [ t ] );

  const eventTypeOptions = useMemo( () => Object.values( UtilsEventType ).map( ( value ) => ( {
    label: tNotifications( `eventTypes.${ value }` ),
    value,
  } ) ), [ tNotifications ] );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateNotificationFormValues>( {
    resolver: zodResolver( createNotificationSchema ),
    defaultValues,
  } );

  const selectedEntityType = watch( "entity_type" );
  const selectedEntityId = watch( "entity_id" );
  const selectedUserId = watch( "user_id" );

  const { data: creatorsData, isLoading: creatorsLoading } = useCreators(
    { limit: 100 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityCreator }
  );
  const { data: brandsData, isLoading: brandsLoading } = useBrands(
    { limit: 100 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityBrand }
  );
  const { data: usersResponse, isLoading: usersLoading } = useUsers(
    { limit: 100, page: 1 }
  );
  const { data: campaignsData, isLoading: campaignsLoading } = useCampaigns(
    { limit: 100, page: 1 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityCampaign }
  );
  const { data: gigsData, isLoading: gigsLoading } = useGigs(
    { limit: 100, page: 1 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityGig }
  );
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices(
    { limit: 100, page: 1 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityInvoice }
  );
  const { data: casesData, isLoading: casesLoading } = useCases(
    { limit: 100, page: 1 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityCase }
  );
  const { data: submissionsData, isLoading: submissionsLoading } = useVideoSubmissionsSearch(
    { limit: 100, page: 1 },
    { enabled: open && selectedEntityType === UtilsNotificationEntityType.EntityVideoSubmission }
  );

  const users = useMemo( () => ( usersResponse?.data?.data ?? [] ) as Array<{
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    user_type?: string;
  }>, [ usersResponse ] );

  const creators = creatorsData?.data ?? [];
  const brands = brandsData?.data ?? [];
  const campaigns = campaignsData?.data ?? [];
  const gigs = gigsData?.data ?? [];
  const invoices = invoicesData?.data ?? [];
  const cases = casesData?.data ?? [];
  const submissions = submissionsData?.data ?? [];

  const entityOptions = useMemo<SelectOption[]>( () => {
    switch ( selectedEntityType ) {
      case UtilsNotificationEntityType.EntityCreator:
        return creators.map( ( creator ) => ( {
          value: creator.id || "",
          label: [ creator.first_name, creator.last_name ].filter( Boolean ).join( " " ) || creator.email || creator.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityBrand:
        return brands.map( ( brand ) => ( {
          value: brand.id || "",
          label: brand.company_name || brand.preferred_contact_email || brand.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityUser:
        return users.map( ( user ) => ( {
          value: user.id || "",
          label: [ user.first_name, user.last_name ].filter( Boolean ).join( " " ) || user.email || user.username || user.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityCampaign:
        return campaigns.map( ( campaign ) => ( {
          value: campaign.id || "",
          label: campaign.campaign_name || campaign.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityGig:
        return gigs.map( ( gig ) => ( {
          value: gig.id || "",
          label: gig.title || gig.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityInvoice:
        return invoices.map( ( invoice ) => ( {
          value: invoice.id || "",
          label: invoice.invoice_number || invoice.invoice_id || invoice.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityCase:
        return cases.map( ( caseItem ) => ( {
          value: caseItem.id || "",
          label: caseItem.case_number || caseItem.title || caseItem.id || "—",
        } ) );
      case UtilsNotificationEntityType.EntityVideoSubmission:
        return submissions.map( ( submission ) => ( {
          value: submission.id || "",
          label: submission.title || submission.video_filename || submission.id || "—",
        } ) );
      default:
        return [];
    }
  }, [ brands, campaigns, cases, creators, gigs, invoices, selectedEntityType, submissions, users ] );

  const entityLoading = (
    selectedEntityType === UtilsNotificationEntityType.EntityCreator ? creatorsLoading :
      selectedEntityType === UtilsNotificationEntityType.EntityBrand ? brandsLoading :
        selectedEntityType === UtilsNotificationEntityType.EntityUser ? usersLoading :
          selectedEntityType === UtilsNotificationEntityType.EntityCampaign ? campaignsLoading :
            selectedEntityType === UtilsNotificationEntityType.EntityGig ? gigsLoading :
              selectedEntityType === UtilsNotificationEntityType.EntityInvoice ? invoicesLoading :
                selectedEntityType === UtilsNotificationEntityType.EntityCase ? casesLoading :
                  selectedEntityType === UtilsNotificationEntityType.EntityVideoSubmission ? submissionsLoading :
                    false
  );

  const selectedEntityOption = useMemo(
    () => entityOptions.find( ( option ) => isSelectObject( option ) && option.value === selectedEntityId ),
    [ entityOptions, selectedEntityId ]
  );
  const hasSelectedEntityType = Boolean( selectedEntityType );
  const generatedActionUrl = useMemo(
    () => buildNotificationActionUrl( selectedEntityType, selectedEntityId ),
    [ selectedEntityId, selectedEntityType ]
  );

  const creatorsById = useMemo( () => new Map(
    creators
      .filter( ( creator ) => Boolean( creator.id ) )
      .map( ( creator ) => [ creator.id!, creator ] )
  ), [ creators ] );

  const brandsById = useMemo( () => new Map(
    brands
      .filter( ( brand ) => Boolean( brand.id ) )
      .map( ( brand ) => [ brand.id!, brand ] )
  ), [ brands ] );

  const campaignsById = useMemo( () => new Map(
    campaigns
      .filter( ( campaign ) => Boolean( campaign.id ) )
      .map( ( campaign ) => [ campaign.id!, campaign ] )
  ), [ campaigns ] );

  const submissionsById = useMemo( () => new Map(
    submissions
      .filter( ( submission ) => Boolean( submission.id ) )
      .map( ( submission ) => [ submission.id!, submission ] )
  ), [ submissions ] );

  const userOptions = useMemo<SelectOption[]>( () =>
    users.map( ( user ) => ( {
      value: user.id || "",
      label: [ user.first_name, user.last_name ].filter( Boolean ).join( " " ) || user.email || user.username || user.id || "—",
    } ) ),
    [ users ]
  );

  const entityTypeLabel = useMemo( () => {
    switch ( selectedEntityType ) {
      case UtilsNotificationEntityType.EntityCreator:
        return t( "entityLabels.creator" );
      case UtilsNotificationEntityType.EntityBrand:
        return t( "entityLabels.brand" );
      case UtilsNotificationEntityType.EntityUser:
        return t( "entityLabels.user" );
      case UtilsNotificationEntityType.EntityCampaign:
        return t( "entityLabels.campaign" );
      case UtilsNotificationEntityType.EntityGig:
        return t( "entityLabels.gig" );
      case UtilsNotificationEntityType.EntityInvoice:
        return t( "entityLabels.invoice" );
      case UtilsNotificationEntityType.EntityCase:
        return t( "entityLabels.case" );
      case UtilsNotificationEntityType.EntityVideoSubmission:
        return t( "entityLabels.videoSubmission" );
      case UtilsNotificationEntityType.EntityPayment:
        return t( "entityLabels.payment" );
      default:
        return t( "entityLabels.entity" );
    }
  }, [ selectedEntityType, t ] );

  const usersById = useMemo( () => new Map(
    users
      .filter( ( user ) => Boolean( user.id ) )
      .map( ( user ) => [ user.id!, user ] )
  ), [ users ] );

  useEffect( () => {
    if ( !open ) return;
    setValue( "entity_id", "", { shouldValidate: true } );
    setValue( "user_id", "", { shouldValidate: true } );
  }, [ open, selectedEntityType, setValue ] );

  useEffect( () => {
    if ( isEditingActionUrl ) return;
    setValue( "action_url", generatedActionUrl, { shouldValidate: true } );
  }, [ generatedActionUrl, isEditingActionUrl, setValue ] );

  const getEntityMeta = ( value: string ): EntityMeta | undefined => {
    if ( selectedEntityType === UtilsNotificationEntityType.EntityCreator ) {
      const creator = creatorsById.get( value );
      if ( !creator ) return undefined;
      return {
        avatarUrl: creator.profile_image?.asset ? imgpresets.avatar( creator.profile_image.asset ) : undefined,
        name: [ creator.first_name, creator.last_name ].filter( Boolean ).join( " " ) || creator.email || creator.id,
        // subtitle: creator.email || creator.id,
      };
    }

    if ( selectedEntityType === UtilsNotificationEntityType.EntityBrand ) {
      const brand = brandsById.get( value );
      if ( !brand ) return undefined;
      return {
        avatarUrl: brand.profile_photo?.asset ? imgpresets.avatar( brand.profile_photo.asset ) : undefined,
        name: brand.company_name || brand.preferred_contact_email || brand.id,
        subtitle: brand.preferred_contact_email || brand.id,
      };
    }

    if ( selectedEntityType === UtilsNotificationEntityType.EntityCampaign ) {
      const campaign = campaignsById.get( value );
      if ( !campaign ) return undefined;

      const brandImage = campaign.brand?.profile_photo?.asset
        ? imgpresets.avatar( campaign.brand.profile_photo.asset )
        : undefined;

      const productImage = campaign.product_image?.asset
        ? imgpresets.avatar( campaign.product_image.asset )
        : undefined;

      return {
        avatarUrl: productImage || brandImage,
        name: campaign.campaign_name || campaign.id,
        subtitle: campaign.brand_name || campaign.id,
      };
    }

    if ( selectedEntityType === UtilsNotificationEntityType.EntityVideoSubmission ) {
      const submission = submissionsById.get( value );
      if ( !submission ) return undefined;
      return {
        avatarUrl: submission.creator?.profile_image?.asset ? imgpresets.avatar( submission.creator.profile_image.asset ) : undefined,
        name: submission.title || submission.video_filename || submission.id,
        subtitle: submission.creator?.email || submission.id,
      };
    }

    return undefined;
  };

  const getUserMeta = ( value: string ): EntityMeta | undefined => {
    const user = usersById.get( value );
    if ( !user ) return undefined;

    return {
      name: [ user.first_name, user.last_name ].filter( Boolean ).join( " " ) || user.email || user.username || user.id,
      subtitle: formatUserTypeLabel( user.user_type ),
    };
  };

  useEffect( () => {
    if ( !open ) {
      setIsEditingActionUrl( false );
      reset( defaultValues );
    }
  }, [ defaultValues, open, reset ] );

  const onSubmit = ( data: CreateNotificationFormValues ) => {
    const payload: ModelsCreateNotificationRequest = {
      user_id: data.user_id,
      title: data.title,
      message: data.message,
      event_name: data.event_name,
      event_type: data.event_type,
      entity_id: data.entity_id,
      entity_type: data.entity_type as UtilsNotificationEntityType,
      priority: data.priority || undefined,
      action_url: data.action_url || undefined,
      metadata: data.metadata || undefined,
    };

    createNotification.mutate( payload, {
      onSuccess: () => {
        toast.success( t( "toast.success" ) );
        onOpenChange( false );
      },
      onError: () => {
        toast.error( t( "toast.error" ) );
      },
    } );
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[90%]! max-w-[560px]! flex flex-col overflow-hidden p-0!">
        <SheetHeader className="px-6 pt-6 pb-4 shrink-0 border-b bg-background/80">
          <SheetTitle className="dialog__title text-primary">{ t( "title" ) }</SheetTitle>
          <SheetDescription className="text-base">
            { t( "description" ) }
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit( onSubmit ) } className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <SuperField
              type="select"
              label={ t( "fields.entityType" ) }
              options={ entityTypeOptions }
              value={ selectedEntityType }
              onValueChange={ ( value ) => setValue( "entity_type", value as EntityTypeValue, { shouldValidate: true } ) }
              error={ errors.entity_type?.message }
            />

            { hasSelectedEntityType && (
              <div className="space-y-4 bg-slate-50/30 p-3 rounded-lg border border-slate-50">
                <SuperField
                  type={
                    selectedEntityType === UtilsNotificationEntityType.EntityBrand
                      || selectedEntityType === UtilsNotificationEntityType.EntityCreator
                      || selectedEntityType === UtilsNotificationEntityType.EntityCampaign
                      || selectedEntityType === UtilsNotificationEntityType.EntityVideoSubmission
                      ? "entity-select"
                      : "searchable-select"
                  }
                  label={ t( "fields.chooseEntity", { entity: entityTypeLabel } ) }
                  placeholder={ entityLoading ? t( "fields.loadingEntity", { entity: entityTypeLabel.toLowerCase() } ) : t( "fields.selectEntity", { entity: entityTypeLabel.toLowerCase() } ) }
                  options={ entityOptions }
                  value={ selectedEntityId }
                  onValueChange={ ( value: string | null ) => setValue( "entity_id", value || "", { shouldValidate: true } ) }
                  disabled={ entityLoading || entityOptions.length === 0 }
                  getEntityMeta={ getEntityMeta }
                  getInitials={ getInitials }
                  avatarClassName="size-8"
                  error={ errors.entity_id?.message }
                  fieldClassName="h-12 bg-background"
                />

                <SuperField
                  type="entity-select"
                  label={ t( "fields.notificationRecipient" ) }
                  placeholder={ usersLoading ? t( "fields.loadingUsers" ) : t( "fields.selectRecipient" ) }
                  options={ userOptions }
                  value={ selectedUserId }
                  onValueChange={ ( value ) => setValue( "user_id", value || "", { shouldValidate: true } ) }
                  disabled={ usersLoading || userOptions.length === 0 }
                  getEntityMeta={ getUserMeta }
                  getInitials={ getInitials }
                  description={ t( "fields.recipientDescription" ) }
                  error={ errors.user_id?.message }
                  fieldClassName="h-12 bg-background"
                />

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SuperField
                    type="text"
                    label={ t( "fields.eventName" ) }
                    placeholder={ t( "fields.eventNamePlaceholder" ) }
                    { ...register( "event_name" ) }
                    error={ errors.event_name?.message }
                    fieldClassName="bg-background"
                  />
                  <SuperField
                    type="select"
                    label={ t( "fields.eventType" ) }
                    options={ eventTypeOptions }
                    value={ watch( "event_type" ) }
                    onValueChange={ ( value ) => setValue( "event_type", value as CreateNotificationFormValues[ "event_type" ], { shouldValidate: true } ) }
                    error={ errors.event_type?.message }
                    fieldClassName="bg-background"
                  />
                </div>

                <Separator />

                <SuperField
                  type="text"
                  label={ t( "fields.title" ) }
                  placeholder={ t( "fields.titlePlaceholder" ) }
                  { ...register( "title" ) }
                  error={ errors.title?.message }
                  fieldClassName="bg-background"
                />

                <SuperField
                  type="textarea"
                  label={ t( "fields.message" ) }
                  placeholder={ t( "fields.messagePlaceholder" ) }
                  fieldClassName="min-h-40 bg-background"
                  rows={ 5 }
                  { ...register( "message" ) }
                  error={ errors.message?.message }
                />

                <div className="grid grid-cols-1 gap-4">
                  <SuperField
                    type="choice-card"
                    label={ t( "fields.priority" ) }
                    options={ priorityOptions }
                    value={ watch( "priority" ) }
                    onValueChange={ ( value ) => setValue( "priority", value as CreateNotificationFormValues[ "priority" ], { shouldValidate: true } ) }
                    error={ errors.priority?.message }
                    containerClassName="grid grid-cols-1 gap-2 sm:grid-cols-2"
                  />
                </div>

                <Separator />

                <SuperField
                  type={ isEditingActionUrl ? "url" : "text" }
                  label={ t( "fields.actionUrl" ) }
                  placeholder={ t( "fields.actionUrlPlaceholder" ) }
                  value={ isEditingActionUrl ? watch( "action_url" ) || "" : generatedActionUrl }
                  readOnly={ !isEditingActionUrl }
                  disabled={ !isEditingActionUrl }
                  description={
                    generatedActionUrl
                      ? t( "fields.actionUrlGenerated" )
                      : t( "fields.actionUrlUnavailable" )
                  }
                  suffix={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={ () => {
                        if ( isEditingActionUrl ) {
                          setValue( "action_url", generatedActionUrl, { shouldValidate: true } );
                        }
                        setIsEditingActionUrl( ( current ) => !current );
                      } }
                      title={ isEditingActionUrl ? t( "actions.useGeneratedUrl" ) : t( "actions.editActionUrl" ) }
                    >
                      { isEditingActionUrl ? <Check className="size-3.5" /> : <Edit3 className="size-3.5" /> }
                    </Button>
                  }
                  { ...register( "action_url" ) }
                  error={ errors.action_url?.message }
                />

                <input type="hidden" value={ watch( "action_url" ) || "" } { ...register( "action_url" ) } />

                <SuperField
                  type="textarea"
                  label={ t( "fields.metadata" ) }
                  description={ t( "fields.metadataDescription" ) }
                  placeholder={ t( "fields.metadataPlaceholder" ) }
                  rows={ 4 }
                  { ...register( "metadata" ) }
                  error={ errors.metadata?.message }
                  fieldClassName="bg-background"
                />
              </div>
            ) }
          </div>

          <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-3 bg-background">
            <Button type="button" variant="outline" onClick={ () => onOpenChange( false ) }>
              { tc( "cancel" ) }
            </Button>
            <Button type="submit" disabled={ isSubmitting || createNotification.isPending } className="min-w-[120px]">
              { createNotification.isPending ? <Loader2 className="size-4 animate-spin" /> : t( "submit" ) }
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
