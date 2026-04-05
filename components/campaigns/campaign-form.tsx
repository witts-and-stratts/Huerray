import { ReactNode, useEffect, useEffectEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useStore } from '@tanstack/react-form';
import { Brain, ChevronDown, Eye, Loader2, SlashIcon, Trash2, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/dashboard-ui/alert-dialog';
import { ActionMenu, type MenuAction } from '@/components/dashboard-ui/action-menu';
import { Badge } from '@/components/dashboard-ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/dashboard-ui/breadcrumb';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { useDeleteCampaign } from '@/lib/api/hooks/campaigns';
import { resetCampaign, updateCampaign } from '@/lib/redux/features/campaign/campaignSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';

import { CampaignSummaryDialog } from './campaign-summary-dialog';
import { CampaignFormApi, createTranslatedCampaignSchema, type CreateCampaignSchema } from './schema';
import { CampaignBasicInfo } from './sections/campaign-basic-info';
import { CampaignDocumentsSection } from './sections/campaign-documents-section';
import { CampaignImagesSection } from './sections/campaign-images-section';
import { useCampaignFiles } from './sections/documents/use-campaign-files';
import type { UploadedFile } from './sections/documents/types';
import { CampaignProductSection } from './sections/campaign-product-section';
import { CampaignCreatorRequirements } from './sections/campaign-requirements';
import { CampaignVideosSection } from './sections/campaign-videos-section';

type CampaignTab = 'overview' | 'instructions' | 'documents' | 'images' | 'videos';
type ValidationErrorState = { title: string; message: string; tab: CampaignTab };

const fieldToTab: Record<string, CampaignTab> = {
  campaign_name: 'overview',
  description: 'overview',
  category: 'overview',
  keywords: 'overview',
  product_url: 'overview',
  product_image: 'overview',
  number_of_creators_wanted: 'overview',
  number_of_videos_wanted: 'overview',
  content_type: 'overview',
  video_duration_in_seconds: 'overview',
  video_format: 'overview',
  allow_multiple_videos: 'overview',
  dos: 'instructions',
  donts: 'instructions',
  tone_of_voice: 'instructions',
  documents: 'documents',
  images: 'images',
  videos: 'videos',
};

function TabPanel({ active, children }: { active: boolean; children: ReactNode }) {
  return <div className={active ? '' : 'hidden'}>{children}</div>;
}

function validateFileState(
  items: UploadedFile[],
  tab: CampaignTab,
  label: string,
  t: ReturnType<typeof useTranslations>
): ValidationErrorState | null {
  const uploadingCount = items.filter((item) => item.status === 'uploading').length;
  const errorCount = items.filter((item) => item.status === 'error').length;

  if (uploadingCount > 0) {
    return {
      title: t('validation.uploadsInProgressTitle'),
      message: t('validation.uploadsInProgressMessage', { count: uploadingCount, label }),
      tab,
    };
  }

  if (errorCount > 0) {
    return {
      title: t('validation.uploadErrorsTitle'),
      message: t('validation.uploadErrorsMessage', { count: errorCount, label }),
      tab,
    };
  }

  return null;
}

function findFirstErrorField(fieldMeta: Record<string, any>) {
  return Object.keys(fieldMeta).find((key) => {
    const meta = fieldMeta[key as keyof typeof fieldMeta];
    return !!(meta?.errors && meta.errors.length > 0);
  });
}

function CampaignInstructionsSection({ form }: { form: CampaignFormApi }) {
  const t = useTranslations('dashboard.brand.newCampaignPage');

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>{t('instructionsTitle')}</CardTitle>
          <CardDescription>{t('instructionsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form.Field name="dos">
            {(field) => (
              <SuperField
                label={t('dos')}
                type="editor"
                placeholder={t('dosPlaceholder')}
                value={field.state.value}
                onChange={(value: string) => field.handleChange(value)}
              />
            )}
          </form.Field>
          <form.Field name="donts">
            {(field) => (
              <SuperField
                label={t('donts')}
                type="editor"
                placeholder={t('dontsPlaceholder')}
                value={field.state.value}
                onChange={(value: string) => field.handleChange(value)}
              />
            )}
          </form.Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>{t('toneTitle')}</CardTitle>
          <CardDescription>{t('toneDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field name="tone_of_voice">
            {(field) => (
              <SuperField
                label={t('toneLabel')}
                type="editor"
                placeholder={t('tonePlaceholder')}
                value={field.state.value}
                onChange={(value: string) => field.handleChange(value)}
                className='min-h-[300px]'
              />
            )}
          </form.Field>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignOverviewSection({ form }: { form: CampaignFormApi }) {
  const t = useTranslations('dashboard.brand.newCampaignPage');

  return (
    <div className='grid gap-4 md:grid-cols-5'>
      <Card className='md:col-span-3'>
        <CardContent>
          <CampaignBasicInfo form={form} />
          <CampaignProductSection form={form} />
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>{t('creatorRequirementsTitle')}</CardTitle>
          <CardDescription>{t('creatorRequirementsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignCreatorRequirements form={form} />
        </CardContent>
      </Card>
    </div>
  );
}

interface CampaignFormHeaderProps {
  mode: 'create' | 'edit';
  isSubmitting: boolean;
  submitIntent: 'draft' | 'publish';
  activeTab: CampaignTab;
  campaignId?: string;
  contentType?: string;
  onTabChange: (tab: CampaignTab) => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onDiscardChanges: () => void;
  onPreviewChanges: () => void;
  onDelete: () => void;
}

function CampaignFormHeader({
  mode,
  isSubmitting,
  submitIntent,
  activeTab,
  campaignId,
  contentType,
  onTabChange,
  onPublish,
  onSaveDraft,
  onDiscardChanges,
  onPreviewChanges,
  onDelete,
}: CampaignFormHeaderProps) {
  const t = useTranslations('dashboard.brand.newCampaignPage');

  const actions: MenuAction<null>[] = [
    {
      label: t('discardChanges'),
      icon: Undo2,
      action: onDiscardChanges,
    },
    {
      label: t('previewChanges'),
      icon: Eye,
      action: onPreviewChanges,
    },
    {
      label: t('delete'),
      icon: Trash2,
      variant: 'destructive',
      separator: true,
      condition: () => !!campaignId,
      action: onDelete,
    },
  ];

  return (
    <SubHeader
      title={
        <span className="flex items-center gap-2">
          <span className='font-normal'>{mode === 'edit' ? t('editCampaign') : t('newCampaign')}</span>
          {contentType === UtilsContentType.ContentTypeAIGenerated && (
            <Badge variant="outline" className="mt-2 gap-1.5 border-maroon-400 bg-maroon-50 text-maroon-500">
              <Brain className="size-4" />
              {t('aiBadge')}
            </Badge>
          )}
        </span>
      }
      pre={
        <Breadcrumb className='mb-4 flex items-center gap-4'>
          <BreadcrumbList>
            <BreadcrumbItem className='text-sm text-muted-foreground/70'>
              <BreadcrumbLink href="/brand/campaigns">
                {t('campaigns')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-muted-foreground/40'>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem className='text-sm text-muted-foreground/40'>
              {mode === 'edit' ? t('editCampaign') : t('newCampaign')}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      tabs={
        <SubHeaderTabs
          value={activeTab}
          onChange={(value) => onTabChange(value as CampaignTab)}
          tabItems={[
            { value: 'overview', label: t('tabs.overview') },
            { value: 'instructions', label: t('tabs.instructions') },
            { value: 'documents', label: t('tabs.documents') },
            { value: 'images', label: t('tabs.images') },
            { value: 'videos', label: t('tabs.videos') },
          ]}
        />
      }
    >
      <div className="flex items-center gap-2">
        <ButtonGroup>
          {mode === 'create' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              className="w-full md:w-40"
              onClick={onPublish}
            >
              {isSubmitting && submitIntent === 'publish' ? t('publishing') : t('publish')}
            </Button>
          )}

          <Button
            type="button"
            size="sm"
            disabled={isSubmitting}
            onClick={onSaveDraft}
          >
            {isSubmitting && submitIntent === 'draft' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {mode === 'edit' ? t('savingChanges') : t('savingDraft')}
              </>
            ) : (
              mode === 'edit' ? t('saveChanges') : t('saveDraft')
            )}
          </Button>

          <ActionMenu
            data={null}
            label={t('actions')}
            trigger={
              <Button variant="default" size="icon-sm" disabled={isSubmitting}>
                <ChevronDown className="size-4" />
              </Button>
            }
            actions={actions}
          />
        </ButtonGroup>
      </div>
    </SubHeader>
  );
}

export interface CampaignFileItems {
  documents: UploadedFile[];
  videos: UploadedFile[];
}

export type CampaignSubmitSource = 'button' | 'shortcut';

interface CampaignFormProps {
  onSubmit?: (
    values: CreateCampaignSchema,
    fileItems: CampaignFileItems,
    intent: 'draft' | 'publish',
    source: CampaignSubmitSource
  ) => Promise<void>;
  initialValues?: Partial<CreateCampaignSchema>;
  initialDocuments?: UploadedFile[];
  initialVideos?: UploadedFile[];
  mode?: 'create' | 'edit';
  campaignId?: string;
}

export function CampaignForm({
  onSubmit,
  initialValues,
  initialDocuments,
  initialVideos,
  mode = 'create',
  campaignId,
}: CampaignFormProps) {
  const t = useTranslations('dashboard.brand.newCampaignPage');
  const campaignSchema = createTranslatedCampaignSchema(t);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteCampaign = useDeleteCampaign();
  const reduxCampaign = useAppSelector((state: { campaign: CreateCampaignSchema }) => state.campaign);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitIntent, setSubmitIntent] = useState<'draft' | 'publish'>('draft');
  const [submitSource, setSubmitSource] = useState<CampaignSubmitSource>('button');
  const [activeTab, setActiveTab] = useState<CampaignTab>('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [validationError, setValidationError] = useState<ValidationErrorState | null>(null);

  useEffect(() => {
    if (mode === 'create') {
      console.debug('[CampaignForm] [TRACE] reduxCampaign state in Redux:', reduxCampaign);
    }
  }, [mode, reduxCampaign]);

  const documentsState = useCampaignFiles(initialDocuments ?? initialValues?.documents);
  const imagesState = useCampaignFiles(initialValues?.images);
  const videosState = useCampaignFiles(initialVideos ?? initialValues?.videos);

  const defaultValues = initialValues ? { ...reduxCampaign, ...initialValues } : reduxCampaign;

  const form = useForm({
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onSubmit: campaignSchema as any },
    onSubmit: async ({ value }) => {
      const fileValidationError =
        validateFileState(documentsState.items, 'documents', 'documents', t) ||
        validateFileState(imagesState.items, 'images', 'images', t) ||
        validateFileState(videosState.items, 'videos', 'videos', t);

      if (fileValidationError) {
        setValidationError(fileValidationError);
        setActiveTab(fileValidationError.tab);
        return;
      }

      if (mode === 'edit') {
        await submitCampaign(value as CreateCampaignSchema, 'draft');
        return;
      }

      if (submitIntent === 'draft') {
        await submitCampaign(value as CreateCampaignSchema, 'draft');
        toast.success(t('draftSaved'));
        return;
      }

      setShowSummary(true);
    },
    onSubmitInvalid: ({ formApi }) => {
      const firstErrorField = findFirstErrorField(formApi.state.fieldMeta);

      if (!firstErrorField) {
        return;
      }

      const nextTab = fieldToTab[firstErrorField] ?? 'overview';
      const firstFieldError = formApi.state.fieldMeta[firstErrorField as keyof typeof formApi.state.fieldMeta]?.errors?.[0];

      setActiveTab(nextTab);
      toast.error(typeof firstFieldError === 'string' ? firstFieldError : t('validation.fixErrors'));
    },
  });

  const formValues = useStore(form.store, (state) => state.values);

  useEffect(() => {
    if (mode !== 'create') {
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(updateCampaign(formValues as CreateCampaignSchema));
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [dispatch, formValues, mode]);

  async function submitCampaign(values: CreateCampaignSchema, intent: 'draft' | 'publish') {
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(
          values,
          {
            documents: documentsState.items,
            videos: videosState.items
          },
          intent,
          submitSource
        );
      }

      dispatch(resetCampaign());
    } catch (error) {
      console.error(t('validation.submissionFailed'), error);

      if (intent === 'draft' && mode === 'create') {
        toast.error(t('draftSaveFailed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function submitWithIntent(intent: 'draft' | 'publish', source: CampaignSubmitSource = 'button') {
    setSubmitSource(source);
    setSubmitIntent(intent);
    form.handleSubmit();
  }

  const handleSaveShortcut = useEffectEvent((event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== 's' || !(event.metaKey || event.ctrlKey)) {
      return;
    }

    event.preventDefault();

    if (!isSubmitting) {
      submitWithIntent('draft', 'shortcut');
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleSaveShortcut);
    return () => document.removeEventListener('keydown', handleSaveShortcut);
  }, []);

  const handleDiscardChanges = () => {
    dispatch(resetCampaign());
    router.push('/brand/campaigns');
  };

  const handleDelete = async () => {
    if (!campaignId) {
      return;
    }

    try {
      await deleteCampaign.mutateAsync(campaignId);
      toast.success(t('campaignDeleted'));
      dispatch(resetCampaign());
      router.push('/brand/campaigns');
    } catch {
      toast.error(t('campaignDeleteFailed'));
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleConfirmSubmit = async () => {
    await submitCampaign(form.state.values as CreateCampaignSchema, 'publish');
    setShowSummary(false);
  };

  const handleSaveDraftFromSummary = async () => {
    setShowSummary(false);
    submitWithIntent('draft');
  };

  return (
    <>
      <CampaignFormHeader
        mode={mode}
        isSubmitting={isSubmitting}
        submitIntent={submitIntent}
        activeTab={activeTab}
        campaignId={campaignId}
        contentType={form.state.values.content_type}
        onTabChange={setActiveTab}
        onPublish={() => submitWithIntent('publish')}
        onSaveDraft={() => submitWithIntent('draft')}
        onDiscardChanges={handleDiscardChanges}
        onPreviewChanges={() => setShowPreview(true)}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      <form.Field name="content_type">
        {(field) => (
          <input
            type="hidden"
            name={field.name}
            value={field.state.value}
            readOnly
          />
        )}
      </form.Field>

      <div className='flex-1 p-5'>
        <TabPanel active={activeTab === 'overview'}>
          <CampaignOverviewSection form={form} />
        </TabPanel>

        <TabPanel active={activeTab === 'instructions'}>
          <CampaignInstructionsSection form={form} />
        </TabPanel>

        <TabPanel active={activeTab === 'documents'}>
          <CampaignDocumentsSection form={form} fileState={documentsState} />
        </TabPanel>

        <TabPanel active={activeTab === 'images'}>
          <CampaignImagesSection form={form} fileState={imagesState} />
        </TabPanel>

        <TabPanel active={activeTab === 'videos'}>
          <CampaignVideosSection form={form} fileState={videosState} />
        </TabPanel>
      </div>

      <AlertDialog open={!!validationError} onOpenChange={(open) => !open && setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{validationError?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {validationError?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                if (validationError?.tab) {
                  setActiveTab(validationError.tab);
                }
                setValidationError(null);
              }}
            >
              {t('goToTab', { tab: validationError?.tab || '' })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={t('deleteConfirmTitle')}
        description={t('deleteConfirmDescription')}
        confirmLabel={t('deleteCampaign')}
        cancelLabel={t('cancel')}
        onConfirm={handleDelete}
        isLoading={deleteCampaign.isPending}
        loadingText={t('deleting')}
        variant="destructive"
      />

      <CampaignSummaryDialog
        open={showSummary || showPreview}
        onOpenChange={(open) => {
          setShowSummary(open && showSummary);
          setShowPreview(open && showPreview);
        }}
        onConfirm={handleConfirmSubmit}
        onSaveDraft={handleSaveDraftFromSummary}
        isConfirming={isSubmitting && submitIntent === 'publish'}
        isSavingDraft={isSubmitting && submitIntent === 'draft'}
        data={form.state.values}
        documents={documentsState.items}
        images={imagesState.items}
        videos={videosState.items}
        previewOnly={showPreview}
      />
    </>
  );
}
