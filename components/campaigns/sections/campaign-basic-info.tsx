
import { memo } from 'react';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { useFilterLabel } from '@/lib/hooks/use-filter-label';
import { CampaignFormApi, createCampaignSchema } from '../schema';
import { useTranslations } from 'next-intl';

interface CampaignBasicInfoProps {
  form: CampaignFormApi;
}

export const CampaignBasicInfo = memo( function CampaignBasicInfo( { form }: CampaignBasicInfoProps ) {
  const t = useTranslations( 'dashboard.brand.newCampaignPage' );
  const getFilterLabel = useFilterLabel();

  return (
    <FieldGroup>
      <form.Field name="campaign_name" validators={ { onChange: createCampaignSchema.shape.campaign_name, onBlur: createCampaignSchema.shape.campaign_name } }>
        { ( field ) => (
          <SuperField
            label={ t( 'campaignName' ) }
            placeholder={ t( 'campaignNamePlaceholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
            type="text"
            required
          />
        ) }
      </form.Field>
      <form.Field name="description" validators={ { onChange: createCampaignSchema.shape.description, onBlur: createCampaignSchema.shape.description } }>
        { ( field ) => (
          <SuperField
            label={ t( 'description' ) }
            type="editor"
            placeholder={ t( 'descriptionPlaceholder' ) }
            value={ field.state.value }
            onChange={ ( e: string ) => field.handleChange( e ) }
            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
            fieldClassName='min-h-[300px]'
            required
          />
        ) }
      </form.Field>
      <div className='flex gap-4'>
        <form.Field name="category" validators={ { onChange: createCampaignSchema.shape.category, onBlur: createCampaignSchema.shape.category } }>
          { ( field ) => (
            <SuperField
              label={ t( 'category' ) }
              type="select"
              placeholder={ t( 'selectCategory' ) }
              value={ field.state.value }
              onValueChange={ ( val ) => { field.handleChange( val as UtilsCampaignCategory ); field.handleBlur(); } }
              options={ Object.values( UtilsCampaignCategory ).map( ( val ) => ( {
                label: getFilterLabel( val ),
                value: val
              } ) ) }
              error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
              required
            />
          ) }
        </form.Field>
      </div>
      <form.Field name="keywords" validators={ { onChange: createCampaignSchema.shape.keywords as any, onBlur: createCampaignSchema.shape.keywords as any } }>
        { ( field ) => (
          <SuperField
            label={ t( 'keywords' ) }
            type="tags"
            value={ field.state.value }
            onChange={ field.handleChange }
            onBlur={ field.handleBlur }
            error={ field.state.meta.errors?.length ? field.state.meta.errors.map( ( e ) => e.message ).join( ', ' ) : undefined }
            placeholder={ t( 'keywordsPlaceholder' ) }
            expand={ false }
          />
        ) }
      </form.Field>
    </FieldGroup>
  );
} );
