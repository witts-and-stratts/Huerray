'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/dashboard-ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Link01Icon,
  Task01Icon,
  Image01Icon
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/dashboard-utils';

type Step = 1 | 2 | 3;

export function CampaignForm() {
  const [ step, setStep ] = React.useState<Step | 4>( 1 );
  const [ isSubmitting, setIsSubmitting ] = React.useState( false );
  const [ formData, setFormData ] = React.useState( {
    campaign_name: '',
    description: '',
    category: '',
    product_url: '',
    number_of_creators_wanted: 1,
    number_of_videos_wanted: 1,
    content_type: 'video',
    video_duration_in_seconds: 15,
    product_image: '',
  } );

  const updateField = ( field: string, value: any ) => {
    setFormData( ( prev ) => ( { ...prev, [ field ]: value } ) );
  };

  const nextStep = () => setStep( ( prev ) => ( prev + 1 ) as any );
  const prevStep = () => setStep( ( prev ) => ( prev - 1 ) as any );

  const handleSubmit = async () => {
    setIsSubmitting( true );
    // Simulate API call
    await new Promise( resolve => setTimeout( resolve, 1500 ) );
    setIsSubmitting( false );
    setStep( 4 );
  };

  const steps = [
    { title: 'Basics', icon: InformationCircleIcon },
    { title: 'Requirements', icon: Task01Icon },
    { title: 'Review', icon: CheckmarkCircle01Icon },
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      { steps.map( ( s, i ) => {
        const stepNumber = i + 1;
        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <div key={ i } className="flex items-center gap-2">
            <div
              className={ cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" :
                  isCompleted ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              ) }
            >
              { isCompleted ? <HugeiconsIcon icon={ CheckmarkCircle01Icon } className="w-5 h-5" /> : stepNumber }
            </div>
            <span className={ cn( "text-sm hidden sm:block", isActive ? "font-bold" : "text-muted-foreground" ) }>
              { s.title }
            </span>
            { i < steps.length - 1 && (
              <div className="w-8 h-px bg-muted mx-2 sm:w-16" />
            ) }
          </div>
        );
      } ) }
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto shadow-none border-0 bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Create New Campaign</CardTitle>
        <CardDescription>Fill in the details below to launch your campaign.</CardDescription>
      </CardHeader>

      { renderStepIndicator() }

      <CardContent className="px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={ step }
            initial={ { opacity: 0, x: 20 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: -20 } }
            transition={ { duration: 0.2 } }
            className="space-y-6"
          >
            { step === 1 && (
              <div className="space-y-4">
                <SuperField
                  label="Campaign Name"
                  placeholder="e.g. Summer Collection 2025"
                  value={ formData.campaign_name }
                  onChange={ ( e ) => updateField( 'campaign_name', e.target.value ) }
                  type="text"
                  required
                />
                <SuperField
                  label="Description"
                  placeholder="Tell us about your campaign goals..."
                  value={ formData.description }
                  onChange={ ( e ) => updateField( 'description', e.target.value ) }
                  type="textarea"
                  className="min-h-[120px]"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SuperField
                    label="Category"
                    type="select"
                    placeholder="Select category"
                    value={ formData.category }
                    onValueChange={ ( val ) => updateField( 'category', val ) }
                    options={ [ 'Fashion', 'Beauty', 'Tech', 'Food', 'Travel', 'Pets', 'Gaming' ] }
                    required
                  />
                  <SuperField
                    label="Product Link"
                    placeholder="https://yourstore.com/product"
                    prefix={ <HugeiconsIcon icon={ Link01Icon } /> }
                    value={ formData.product_url }
                    onChange={ ( e ) => updateField( 'product_url', e.target.value ) }
                    type="url"
                  />
                </div>
              </div>
            ) }

            { step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SuperField
                    label="Creators Needed"
                    placeholder="1"
                    value={ formData.number_of_creators_wanted || '' }
                    onChange={ ( e ) => updateField( 'number_of_creators_wanted', e.target.value === '' ? 0 : parseInt( e.target.value ) ) }
                    type="number"
                    min={ 1 }
                    required
                  />
                  <SuperField
                    label="Videos per Creator"
                    placeholder="1"
                    value={ formData.number_of_videos_wanted || '' }
                    onChange={ ( e ) => updateField( 'number_of_videos_wanted', e.target.value === '' ? 0 : parseInt( e.target.value ) ) }
                    type="number"
                    min={ 1 }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SuperField
                    label="Content Type"
                    type="select"
                    value={ formData.content_type }
                    onValueChange={ ( val ) => updateField( 'content_type', val ) }
                    options={ [
                      { label: 'UGC Video', value: 'video' },
                      { label: 'Photo Shoot', value: 'photo' },
                      { label: 'Unboxing', value: 'unboxing' }
                    ] }
                    required
                  />
                  <SuperField
                    label="Video Duration (sec)"
                    type="select"
                    value={ formData.video_duration_in_seconds.toString() }
                    onValueChange={ ( val ) => updateField( 'video_duration_in_seconds', parseInt( val || '15' ) ) }
                    options={ [
                      { label: '15 seconds', value: '15' },
                      { label: '30 seconds', value: '30' },
                      { label: '60 seconds', value: '60' },
                      { label: '90+ seconds', value: '90' }
                    ] }
                  />
                </div>
              </div>
            ) }

            { step === 3 && (
              <div className="space-y-6">
                <SuperField
                  label="Product Image URL"
                  placeholder="https://example.com/image.jpg"
                  prefix={ <HugeiconsIcon icon={ Image01Icon } /> }
                  value={ formData.product_image }
                  onChange={ ( e ) => updateField( 'product_image', e.target.value ) }
                  type="url"
                />
                <div className="bg-muted/50 rounded-lg p-6 space-y-4 border">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <HugeiconsIcon icon={ Task01Icon } className="w-5 h-5 text-primary" />
                    Review Details
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-muted-foreground font-medium">Campaign:</span>
                    <span className="font-bold">{ formData.campaign_name || 'N/A' }</span>

                    <span className="text-muted-foreground font-medium">Category:</span>
                    <span>{ formData.category || 'N/A' }</span>

                    <span className="text-muted-foreground font-medium">Creators:</span>
                    <span>{ formData.number_of_creators_wanted }</span>

                    <span className="text-muted-foreground font-medium">Type:</span>
                    <span className="capitalize">{ formData.content_type }</span>
                  </div>
                </div>
              </div>
            ) }

            { step === 4 && (
              <motion.div
                initial={ { opacity: 0, scale: 0.95 } }
                animate={ { opacity: 1, scale: 1 } }
                className="text-center py-12 space-y-4"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <HugeiconsIcon icon={ CheckmarkCircle01Icon } className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Campaign Launched!</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Your campaign "{ formData.campaign_name }" has been successfully created. Creators will start seeing it soon.
                </p>
                <div className="pt-6">
                  <Link href="/brand-admin/campaigns" className={ cn( buttonVariants( { variant: 'outline' } ) ) }>
                    View All Campaigns
                  </Link>
                </div>
              </motion.div>
            ) }
          </motion.div>
        </AnimatePresence>
      </CardContent>

      { step < 4 && (
        <CardFooter className="flex justify-between px-0 pt-6">
          <Button
            variant="outline"
            onClick={ prevStep }
            disabled={ step === 1 || isSubmitting }
            className="gap-2"
          >
            <HugeiconsIcon icon={ ArrowLeftIcon } className="w-4 h-4" />
            Back
          </Button>
          { step < 3 ? (
            <Button onClick={ nextStep } className="gap-2">
              Next
              <HugeiconsIcon icon={ ArrowRightIcon } className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={ handleSubmit }
              loading={ isSubmitting }
              className="gap-2 bg-primary"
            >
              Launch Campaign
              <HugeiconsIcon icon={ CheckmarkCircle01Icon } className="w-4 h-4" />
            </Button>
          ) }
        </CardFooter>
      ) }
    </Card>
  );
}
